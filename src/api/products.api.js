import { api, buildQuery } from './client';

export const fetchProducts = (params = {}) => api.get(`/api/products${buildQuery(params)}`);

export const fetchProduct = (id) => api.get(`/api/products/${id}`);

export const createProduct = (data) => api.post('/api/products', data);

export const updateProduct = (id, data) => api.patch(`/api/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

export const fetchCategories = () => api.get('/api/categories');

export const createCategory = (data) => api.post('/api/categories', data);

export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);

// Called after sign-in so the server can create the user record and return the
// role. The role always comes from the server — never from the client.
export const syncUser = () => api.post('/api/users/sync', {});

export const fetchMe = () => api.getAuthed('/api/users/me');
