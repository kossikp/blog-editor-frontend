import http from '@/utils/http'

export const postsService = {
  async getPosts() {
    const response = await http.get('/posts')
    return response.data
  },

  async getPost(id) {
    const response = await http.get(`/posts/${id}`)
    return response.data
  },

  async createPost(postData) {
    const response = await http.post('/posts', postData)
    return response.data
  },

  async updatePost(id, postData) {
    const response = await http.put(`/posts/${id}`, postData)
    return response.data
  },

  async deletePost(id) {
    await http.delete(`/posts/${id}`)
  },

  async deletePostsByTag(tag) {
    await http.delete(`/posts/tag/${tag}`)
  },

  async searchPosts(query) {
    const response = await http.get('/posts/search', { params: { q: query } })
    return response.data
  },

  async getPostsByTag(tag) {
    const response = await http.get(`/posts/tag/${tag}`)
    return response.data
  },

  async getMyPosts() {
    const response = await http.get('/posts/my')
    return response.data
  }
} 