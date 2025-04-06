<template>
  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Login
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <form @submit.prevent="handleSubmit">
              <!-- Email -->
              <div>
                <label for="email" class="block font-medium text-sm text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                  autofocus
                />
                <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</div>
              </div>

              <!-- Password -->
              <div class="mt-4">
                <label for="password" class="block font-medium text-sm text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                <div v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</div>
              </div>

              <!-- Remember Me -->
              <div class="block mt-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="form.remember"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              <div class="flex items-center justify-end mt-4">
                <router-link
                  :to="{ name: 'register' }"
                  class="underline text-sm text-gray-600 hover:text-gray-900"
                >
                  Need an account?
                </router-link>

                <button
                  type="submit"
                  class="ml-4 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                  :disabled="loading"
                >
                  Login
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
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const errors = ref({})

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleSubmit = async () => {
  loading.value = true
  errors.value = {}

  try {
    await authStore.login(form)
    router.push({ name: 'dashboard' })
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      errors.value = { email: 'Invalid credentials' }
    }
  } finally {
    loading.value = false
  }
}
</script> 