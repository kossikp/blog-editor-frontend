<template>
  <div v-if="loading" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
</template>

<script setup>
import { ref, provide, inject } from 'vue'

const loading = ref(false)

const setLoading = (value) => {
  loading.value = value
}

provide('loading', {
  setLoading
})
</script> 