import api from './api';

export const getPosts = (userId) => api.get('/posts', { params: { userId } }).then(({ data }) => data);
export const getAllPosts = () => api.get('/posts').then(({ data }) => data);
export const createPost = (payload) => api.post('/posts', payload);
export const updatePost = (id, payload) => api.patch(`/posts/${encodeURIComponent(id)}`, payload);
