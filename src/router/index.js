import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/middleware'
import { ROUTES } from '@/constants'

const routes = [
  {
    path: ROUTES.HOME,
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: ROUTES.LOGIN,
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: ROUTES.REGISTER,
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: ROUTES.DASHBOARD,
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTES.POSTS.INDEX,
    name: 'posts',
    component: () => import('@/views/posts/PostsIndex.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTES.POSTS.CREATE,
    name: 'posts.create',
    component: () => import('@/views/posts/PostsCreate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTES.POSTS.SHOW,
    name: 'posts.show',
    component: () => import('@/views/posts/PostsShow.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: ROUTES.POSTS.EDIT,
    name: 'posts.edit',
    component: () => import('@/views/posts/PostsEdit.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/posts/:id',
    name: 'post-show',
    component: () => import('@/views/posts/PostShow.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(auth)

export default router
