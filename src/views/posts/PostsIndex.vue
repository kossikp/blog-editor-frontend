<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Posts
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <!-- Search and Filter -->
            <div class="mb-4 flex gap-4">
              <div class="flex-1">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearch"
                  placeholder="Search posts..."
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div class="w-48">
                <select
                  v-model="selectedTag"
                  @change="handleTagChange"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">All Tags</option>
                  <option v-for="tag in allTags" :key="tag" :value="tag">
                    {{ tag }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Create Post Button -->
            <div v-if="isAuthenticated" class="mb-4">
              <router-link
                :to="{ name: 'posts.create' }"
                class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
                Create Post
              </router-link>
            </div>

            <!-- Bulk Delete Button -->
            <div v-if="isAuthenticated && selectedTag" class="mb-4">
              <button
                @click="showBulkDeleteModal = true"
                class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
                Delete All Posts with Tag: {{ selectedTag }}
              </button>
            </div>

            <!-- Posts Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th v-if="isAuthenticated" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="post in filteredPosts" :key="post.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <router-link
                        :to="{ name: 'posts.show', params: { id: post.id } }"
                        class="text-indigo-600 hover:text-indigo-900"
                      >
                        {{ post.title }}
                      </router-link>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ post.author.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        v-for="tag in post.tags"
                        :key="tag"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-1"
                      >
                        {{ tag }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(post.created_at) }}</td>
                    <td v-if="isAuthenticated" class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <router-link
                        v-if="canEditPost(post)"
                        :to="{ name: 'posts.edit', params: { id: post.id } }"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </router-link>
                      <button
                        v-if="canEditPost(post)"
                        @click="confirmDelete(post)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
      @confirm="handleDelete"
    />

    <!-- Bulk Delete Confirmation Modal -->
    <ConfirmDialog
      :show="showBulkDeleteModal"
      @update:show="showBulkDeleteModal = $event"
      title="Delete Posts by Tag"
      :message="'Are you sure you want to delete all posts with the tag \'' + selectedTag + '\'?'"
      @confirm="handleBulkDelete"
    />
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils'
import AppLayout from '@/components/layout/AppLayout.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const postsStore = usePostsStore()
const authStore = useAuthStore()
const showDeleteModal = ref(false)
const showBulkDeleteModal = ref(false)
const postToDelete = ref(null)
const searchQuery = ref('')
const selectedTag = ref('')

const isAuthenticated = computed(() => authStore.isAuthenticated)
const allTags = computed(() => postsStore.allTags)
const filteredPosts = computed(() => postsStore.filteredPosts)

const canEditPost = (post) => {
  return postsStore.canEditPost(post)
}

const handleSearch = () => {
  postsStore.setSearchQuery(searchQuery.value)
}

const handleTagChange = () => {
  postsStore.setSelectedTag(selectedTag.value)
}

const confirmDelete = (post) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (postToDelete.value) {
    await postsStore.deletePost(postToDelete.value.id)
    postToDelete.value = null
  }
  showDeleteModal.value = false
}

const handleBulkDelete = async () => {
  if (selectedTag.value) {
    await postsStore.deletePostsByTag(selectedTag.value)
    selectedTag.value = ''
  }
  showBulkDeleteModal.value = false
}

onMounted(async () => {
  await postsStore.fetchPosts()
})
</script> 