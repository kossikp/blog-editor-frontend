<template>
  <div
    v-if="loading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="flex flex-col items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-white">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script> 