import api from './api';

export const getUsers = () => api.get('/users').then(({ data }) => data);
export const getUser = (id) => api.get(`/users/${encodeURIComponent(id)}`).then(({ data }) => data);
