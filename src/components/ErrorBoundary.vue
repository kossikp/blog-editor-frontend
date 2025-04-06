<template>
  <div v-if="error" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Error</h3>
        <button
          @click="clearError"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-2">
        <p class="text-sm text-gray-500">{{ error }}</p>
      </div>
      <div class="mt-4 flex justify-end">
        <button
          @click="clearError"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, inject } from 'vue'

const error = ref(null)

const setError = (err) => {
  error.value = err
}

const clearError = () => {
  error.value = null
}

provide('error', {
  setError,
  clearError
})
</script> 