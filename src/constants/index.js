export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  POSTS: {
    INDEX: '/posts',
    CREATE: '/posts/create',
    SHOW: '/posts/:id',
    EDIT: '/posts/:id/edit'
  }
}

export const VALIDATION_RULES = {
  EMAIL: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is invalid' }
  ],
  PASSWORD: [
    { required: true, message: 'Password is required' },
    { minLength: 8, message: 'Password must be at least 8 characters' }
  ],
  NAME: [
    { required: true, message: 'Name is required' },
    { minLength: 2, message: 'Name must be at least 2 characters' }
  ],
  TITLE: [
    { required: true, message: 'Title is required' },
    { minLength: 3, message: 'Title must be at least 3 characters' }
  ],
  CONTENT: [
    { required: true, message: 'Content is required' },
    { minLength: 10, message: 'Content must be at least 10 characters' }
  ]
}

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user'
}

export const PAGINATION = {
  PER_PAGE: 10
} 