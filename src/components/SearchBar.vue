<script setup>
import { ref, watch } from 'vue'
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
const searchQuery = ref('')

// Watch for changes in the search query and update the store
watch(searchQuery, (newValue) => {
  postsStore.setSearchQuery(newValue)
})

// Clear search and reset the store
const clearSearch = () => {
  searchQuery.value = ''
  postsStore.setSearchQuery('')
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search posts..."
      class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    />
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template> 