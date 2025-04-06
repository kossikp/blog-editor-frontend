<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Recent Posts -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Recent Posts
                  </h3>
                  <div class="mt-4">
                    <ul class="divide-y divide-gray-200">
                      <li v-for="post in recentPosts" :key="post.id" class="py-4">
                        <div class="flex space-x-3">
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900">
                              {{ post.title }}
                            </p>
                            <p class="text-sm text-gray-500">
                              {{ formatDate(post.created_at) }}
                            </p>
                          </div>
                          <div class="flex-shrink-0">
                            <router-link
                              :to="{ name: 'posts.show', params: { id: post.id }}"
                              class="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </router-link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Statistics -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Statistics
                  </h3>
                  <div class="mt-4">
                    <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div class="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Total Posts
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-gray-900">
                          {{ statistics.totalPosts }}
                        </dd>
                      </div>
                      <div class="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Your Posts
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-gray-900">
                          {{ statistics.yourPosts }}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Quick Actions
                  </h3>
                  <div class="mt-4">
                    <div class="space-y-4">
                      <router-link
                        :to="{ name: 'posts.create' }"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create New Post
                      </router-link>
                      <router-link
                        :to="{ name: 'posts.index' }"
                        class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Browse Posts
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'

// Dummy data - replace with actual API calls
const recentPosts = ref([
  {
    id: 1,
    title: 'First Post',
    created_at: '2024-04-01T12:00:00Z'
  },
  {
    id: 2,
    title: 'Second Post',
    created_at: '2024-04-02T12:00:00Z'
  }
])

const statistics = ref({
  totalPosts: 10,
  yourPosts: 5
})

onMounted(() => {
  // Replace with actual API calls
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script> 