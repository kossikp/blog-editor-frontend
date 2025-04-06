import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { postsService } from '@/services/posts'
import { useAuthStore } from './auth'

export const usePostsStore = defineStore('posts', () => {
  const authStore = useAuthStore()
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedTag = ref('')

  const filteredPosts = computed(() => {
    return posts.value.filter(post => {
      const matchesSearch = searchQuery.value === '' || 
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesTag = selectedTag.value === '' || 
        post.tags?.includes(selectedTag.value)

      return matchesSearch && matchesTag
    })
  })

  const canEditPost = (post) => {
    return authStore.isAuthenticated && post.author.id === authStore.user.id
  }

  const fetchPosts = async () => {
    loading.value = true
    try {
      const response = await postsService.getPosts()
      posts.value = response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  }

  const fetchPost = async (id) => {
    loading.value = true
    try {
      const response = await postsService.getPost(id)
      currentPost.value = response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  }

  const createPost = async (postData) => {
    loading.value = true
    try {
      const response = await postsService.createPost(postData)
      posts.value.unshift(response)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id, postData) => {
    loading.value = true
    try {
      const response = await postsService.updatePost(id, postData)
      const index = posts.value.findIndex(post => post.id === id)
      if (index !== -1) {
        posts.value[index] = response
      }
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id) => {
    loading.value = true
    try {
      await postsService.deletePost(id)
      posts.value = posts.value.filter(post => post.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePostsByTag = async (tag) => {
    loading.value = true
    try {
      await postsService.deletePostsByTag(tag)
      posts.value = posts.value.filter(post => !post.tags?.includes(tag))
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setSelectedTag = (tag) => {
    selectedTag.value = tag
  }

  return {
    posts,
    currentPost,
    loading,
    error,
    searchQuery,
    selectedTag,
    filteredPosts,
    canEditPost,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    deletePostsByTag,
    setSearchQuery,
    setSelectedTag
  }
}) 