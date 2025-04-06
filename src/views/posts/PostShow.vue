<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

// Dummy posts data (same as in Home.vue)
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

const route = useRoute()
const postId = computed(() => parseInt(route.params.id))

// Find the current post
const currentPost = computed(() => {
  return posts.value.find(post => post.id === postId.value)
})

// Find similar posts based on title, content, and tags
const similarPosts = computed(() => {
  if (!currentPost.value) return []

  const currentTags = new Set(currentPost.value.tags)
  const currentTitleWords = new Set(currentPost.value.title.toLowerCase().split(' '))
  const currentContentWords = new Set(currentPost.value.content.toLowerCase().split(' '))

  return posts.value
    .filter(post => post.id !== postId.value)
    .map(post => {
      const score = {
        title: 0,
        content: 0,
        tags: 0
      }

      // Check title similarity
      post.title.toLowerCase().split(' ').forEach(word => {
        if (currentTitleWords.has(word)) score.title++
      })

      // Check content similarity
      post.content.toLowerCase().split(' ').forEach(word => {
        if (currentContentWords.has(word)) score.content++
      })

      // Check tag similarity
      post.tags.forEach(tag => {
        if (currentTags.has(tag)) score.tags++
      })

      return {
        ...post,
        similarityScore: score.title + score.content + (score.tags * 2) // Tags weighted more heavily
      }
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3) // Get top 3 similar posts
})

// Format date using date-fns
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Watch for route changes to update the current post
watch(() => route.params.id, () => {
  // The computed properties will automatically update
  // when the route params change
})
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
        <!-- Main Post -->
        <div v-if="currentPost" class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
          <div class="p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ currentPost.title }}</h1>
            
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in currentPost.tags"
                :key="tag"
                class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="prose max-w-none mb-8">
              <p class="text-gray-700 whitespace-pre-line">{{ currentPost.content }}</p>
            </div>
            
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>By {{ currentPost.author }}</span>
              <span>{{ formatDate(currentPost.created_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Similar Posts -->
        <div v-if="similarPosts.length > 0" class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Similar Posts</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <router-link
                v-for="post in similarPosts"
                :key="post.id"
                :to="{ name: 'post-show', params: { id: post.id }}"
                class="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <h3 class="text-lg font-medium text-gray-900 mb-2">{{ post.title }}</h3>
                <p class="text-gray-600 mb-4">{{ post.content.substring(0, 100) }}...</p>
                
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
              </router-link>
            </div>
          </div>
        </div>

        <!-- Post Not Found -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">Post not found!</p>
        </div>
      </div>
    </div>
  </div>
</template> 