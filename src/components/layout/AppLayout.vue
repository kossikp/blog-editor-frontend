<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/">
                <img src="@/assets/logo.svg" class="h-10 w-auto" alt="Blog Editor Logo" />
              </router-link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <router-link 
                to="/dashboard" 
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                active-class="border-indigo-400 text-gray-900"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/posts/create" 
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                active-class="border-indigo-400 text-gray-900"
              >
                Create A Post
              </router-link>
              <router-link 
                to="/posts" 
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                active-class="border-indigo-400 text-gray-900"
              >
                Browse Posts
              </router-link>
            </div>
          </div>

          <!-- Settings Dropdown -->
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="relative">
              <button 
                @click="isOpen = !isOpen"
                class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <div>{{ user.name }}</div>
                <div class="ml-1">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </button>

              <div 
                v-show="isOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
              >
                <div class="py-1 rounded-md bg-white shadow-xs">
                  <a 
                    href="#" 
                    @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Hamburger -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path 
                  :class="{'hidden': isMobileMenuOpen, 'inline-flex': !isMobileMenuOpen }" 
                  class="inline-flex" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
                <path 
                  :class="{'hidden': !isMobileMenuOpen, 'inline-flex': isMobileMenuOpen }" 
                  class="hidden" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        :class="{'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen}" 
        class="hidden sm:hidden"
      >
        <div class="pt-2 pb-3 space-y-1">
          <router-link 
            to="/dashboard" 
            class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
            active-class="border-indigo-400 text-indigo-700 bg-indigo-50"
          >
            Dashboard
          </router-link>
        </div>

        <div class="pt-4 pb-1 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <svg class="h-10 w-10 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <div class="ml-3">
              <div class="font-medium text-base text-gray-800">{{ user.name }}</div>
              <div class="font-medium text-sm text-gray-500">{{ user.email }}</div>
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <a 
              href="#" 
              @click="logout"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Heading -->
    <header class="bg-white shadow" v-if="$slots.header">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header"></slot>
      </div>
    </header>

    <!-- Page Content -->
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const isMobileMenuOpen = ref(false)

// Dummy user data - replace with actual user data from your auth store
const user = ref({
  name: 'John Doe',
  email: 'john@example.com'
})

const logout = () => {
  // Add your logout logic here
  router.push('/login')
}
</script> 