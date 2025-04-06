import http from '@/utils/http'

export const authService = {
  async login(credentials) {
    const response = await http.post('/auth/login', credentials)
    return response.data
  },

  async register(userData) {
    const response = await http.post('/auth/register', userData)
    return response.data
  },

  async logout() {
    await http.post('/auth/logout')
  },

  async getCurrentUser() {
    const response = await http.get('/auth/user')
    return response.data
  },

  async forgotPassword(email) {
    const response = await http.post('/auth/forgot-password', { email })
    return response.data
  },

  async resetPassword(data) {
    const response = await http.post('/auth/reset-password', data)
    return response.data
  }
} 