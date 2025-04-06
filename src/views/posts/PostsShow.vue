<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ post.title }}
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <div class="text-sm text-gray-500">
                By {{ post.author.name }} on {{ formatDate(post.created_at) }}
              </div>
              <div v-if="canEdit" class="flex space-x-2">
                <router-link
                  :to="{ name: 'posts.edit', params: { id: post.id }}"
                  class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  Edit
                </router-link>
                <button
                  @click="confirmDelete"
                  class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="prose max-w-none">
              {{ post.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmDialog
      :show="showDeleteModal"
      @update:show="showDeleteModal = $event"
      title="Delete Post"
      message="Are you sure you want to delete this post?"
      variant="danger"
      @confirm="handleDelete"
    />
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import AppLayout from '@/components/layout/AppLayout.vue'
import { ConfirmDialog } from '@/components'
import { formatDate } from '@/utils'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()
const showDeleteModal = ref(false)

const post = computed(() => postsStore.currentPost)
const canEdit = computed(() => postsStore.canEditPost(post.value))

onMounted(async () => {
  await postsStore.fetchPost(route.params.id)
})

const confirmDelete = () => {
  showDeleteModal.value = true
}

const handleDelete = async () => {
  try {
    await postsStore.deletePost(post.value.id)
    router.push({ name: 'posts.index' })
  } catch (error) {
    console.error('Error deleting post:', error)
  }
  showDeleteModal.value = false
}
</script> 