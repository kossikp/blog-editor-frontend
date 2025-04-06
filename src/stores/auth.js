import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref(null)

  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      setToken(response.token)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      const response = await authService.register(userData)
      setUser(response.user)
      setToken(response.token)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await authService.logout()
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      setUser(null)
      setToken(null)
      loading.value = false
    }
  }

  const getCurrentUser = async () => {
    loading.value = true
    try {
      const response = await authService.getCurrentUser()
      setUser(response)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const forgotPassword = async (email) => {
    loading.value = true
    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (data) => {
    loading.value = true
    try {
      const response = await authService.resetPassword(data)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const isAuthenticated = () => {
    return !!token.value
  }

  return {
    user,
    token,
    loading,
    error,
    setUser,
    setToken,
    login,
    register,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    isAuthenticated
  }
}) 