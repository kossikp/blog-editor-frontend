import { useAuthStore } from '@/stores'

export const auth = (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
} 