<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Create Post
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <form @submit.prevent="handleSubmit">
              <!-- Title -->
              <div>
                <label for="title" class="block font-medium text-sm text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  v-model="form.title"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  autofocus
                />
                <div v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</div>
              </div>

              <!-- Content -->
              <div class="mt-4">
                <label for="content" class="block font-medium text-sm text-gray-700">Content</label>
                <textarea
                  id="content"
                  v-model="form.content"
                  rows="10"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                ></textarea>
                <div v-if="errors.content" class="text-red-500 text-xs mt-1">{{ errors.content }}</div>
              </div>

              <!-- Tags -->
              <div class="mt-4">
                <label for="tags" class="block font-medium text-sm text-gray-700">Tags (comma-separated)</label>
                <input
                  id="tags"
                  type="text"
                  v-model="form.tags"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="tag1, tag2, tag3"
                />
                <div v-if="errors.tags" class="text-red-500 text-xs mt-1">{{ errors.tags }}</div>
              </div>

              <div class="flex items-center justify-end mt-4">
                <router-link
                  :to="{ name: 'posts.index' }"
                  class="underline text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </router-link>

                <button
                  type="submit"
                  class="ml-4 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                  :disabled="loading"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()
const postsStore = usePostsStore()
const loading = ref(false)
const errors = ref({})

const form = reactive({
  title: '',
  content: '',
  tags: ''
})

const handleSubmit = async () => {
  loading.value = true
  errors.value = {}

  try {
    const postData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }
    await postsStore.createPost(postData)
    router.push({ name: 'posts.index' })
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    }
  } finally {
    loading.value = false
  }
}
</script> 