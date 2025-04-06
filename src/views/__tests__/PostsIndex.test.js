import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import PostsIndex from '../posts/PostsIndex.vue'
import AppLayout from '@/components/layout/AppLayout.vue'

const mockPosts = [
  {
    id: 1,
    title: 'Test Post 1',
    content: 'Test content 1',
    author: { name: 'John Doe' },
    tags: ['tag1', 'tag2'],
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Test Post 2',
    content: 'Test content 2',
    author: { name: 'Jane Doe' },
    tags: ['tag2', 'tag3'],
    created_at: '2024-01-02T00:00:00.000Z'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/posts',
      name: 'posts.index',
      component: PostsIndex
    }
  ]
})

describe('PostsIndex', () => {
  let wrapper
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePostsStore()
    store.posts = mockPosts

    wrapper = mount(PostsIndex, {
      global: {
        plugins: [router],
        components: {
          AppLayout
        }
      }
    })
  })

  it('renders posts list', () => {
    expect(wrapper.text()).toContain('Test Post 1')
    expect(wrapper.text()).toContain('Test Post 2')
  })

  it('filters posts by search query', async () => {
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Test Post 1')

    expect(wrapper.text()).toContain('Test Post 1')
    expect(wrapper.text()).not.toContain('Test Post 2')
  })

  it('filters posts by tag', async () => {
    const tagSelect = wrapper.find('select')
    await tagSelect.setValue('tag1')

    expect(wrapper.text()).toContain('Test Post 1')
    expect(wrapper.text()).not.toContain('Test Post 2')
  })

  it('shows create post button for authenticated users', async () => {
    const authStore = useAuthStore()
    authStore.isAuthenticated = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('a[href="/posts/create"]').exists()).toBe(true)
  })

  it('hides create post button for guests', () => {
    expect(wrapper.find('a[href="/posts/create"]').exists()).toBe(false)
  })

  it('shows delete confirmation modal', async () => {
    const deleteButton = wrapper.find('button.text-red-600')
    await deleteButton.trigger('click')

    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('deletes post when confirmed', async () => {
    const deleteButton = wrapper.find('button.text-red-600')
    await deleteButton.trigger('click')

    const confirmButton = wrapper.find('button[type="submit"]')
    await confirmButton.trigger('click')

    expect(store.deletePost).toHaveBeenCalled()
  })
}) 