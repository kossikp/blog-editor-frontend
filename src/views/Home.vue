<script setup>
import { ref, computed, watch } from 'vue'
import { usePostsStore } from '@/stores/posts'
import SearchBar from '@/components/SearchBar.vue'

const postsStore = usePostsStore()
const searchQuery = ref('')
const isSearching = ref(false)

// Dummy posts data
const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue.js',
    content: 'Vue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases.',
    author: 'John Doe',
    tags: ['vue', 'javascript', 'frontend'],
    created_at: '2024-03-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Understanding Pinia State Management',
    content: 'Pinia is the new official state management library for Vue. It offers a simpler API and better TypeScript support compared to Vuex.',
    author: 'Jane Smith',
    tags: ['vue', 'pinia', 'state-management'],
    created_at: '2024-03-14T15:30:00Z'
  },
  {
    id: 3,
    title: 'Building RESTful APIs with Laravel',
    content: 'Laravel provides a clean and elegant way to build RESTful APIs. With features like resource controllers and API resources, it makes API development a breeze.',
    author: 'Mike Johnson',
    tags: ['laravel', 'php', 'backend', 'api'],
    created_at: '2024-03-13T09:15:00Z'
  },
  {
    id: 4,
    title: 'Modern CSS with Tailwind',
    content: 'Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.',
    author: 'Sarah Wilson',
    tags: ['css', 'tailwind', 'frontend'],
    created_at: '2024-03-12T14:45:00Z'
  }
])

// Filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => {
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })
})

// Watch for changes in the store's search query
watch(() => postsStore.searchQuery, (newValue) => {
  searchQuery.value = newValue
  isSearching.value = !!newValue
})

// Format date using date-fns
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation Links -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link :to="{ name: 'home' }" class="flex items-center">
              <img src="@/assets/logo.svg" class="h-10 w-auto" alt="Blog Editor Logo" />
            </router-link>
          </div>
          <div class="flex items-center space-x-8">
            <router-link
              :to="{ name: 'home' }"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Home
            </router-link>
            <router-link
              :to="{ name: 'dashboard' }"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Dashboard
            </router-link>
            <router-link
              :to="{ name: 'posts.create' }"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Create A Post
            </router-link>
            <router-link
              :to="{ name: 'posts' }"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Browse Posts
            </router-link>
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex justify-center">
              <img src="@/assets/logo.svg" class="w-20 h-20" alt="Blog Editor Logo" />
            </div>
            <h1 class="text-3xl font-bold text-center mt-4">Welcome to Blog Editor</h1>
            <p class="text-center mt-2 text-gray-600">
              Create, edit, and manage your blog posts with ease.
            </p>
            <div class="mt-8 flex justify-center space-x-4">
              <router-link
                :to="{ name: 'login' }"
                class="btn btn-primary"
              >
                Login
              </router-link>
              <router-link
                :to="{ name: 'register' }"
                class="btn btn-secondary"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>

        <!-- Posts Grid -->
        <div v-if="!isSearching || filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <router-link
            v-for="post in filteredPosts"
            :key="post.id"
            :to="{ name: 'post-show', params: { id: post.id }}"
            class="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ post.title }}</h2>
              <p class="text-gray-600 mb-4">{{ post.content.substring(0, 150) }}...</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>By {{ post.author }}</span>
                <span>{{ formatDate(post.created_at) }}</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- No Results Message -->
        <div v-else-if="isSearching && filteredPosts.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No posts found!</p>
        </div>
      </div>
    </div>
  </div>
</template>
