import { api } from './client';

// axios drops undefined params, so optional filters can be passed straight
// through without building the query string by hand.
export const fetchProducts = (params = {}) => api.get('/api/products', params);

export const fetchProduct = (id) => api.get(`/api/products/${id}`);

export const createProduct = (data) => api.post('/api/products', data);

export const updateProduct = (id, data) => api.patch(`/api/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

export const fetchCategories = () => api.get('/api/categories');

export const createCategory = (data) => api.post('/api/categories', data);

export const updateCategory = (id, data) => api.patch(`/api/categories/${id}`, data);

export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);

// These hit /api/accounts, NOT /api/users. The shared host's firewall blocks
// any URL containing "/users" (it returns a bot-check HTML page instead of the
// API), which stopped sign-in from ever reading a role. "accounts" is the same
// backend routes under a name the firewall leaves alone.

// Called after sign-in so the server can create the user record and return the
// role. The role always comes from the server — never from the client.
export const syncUser = () => api.post('/api/accounts/sync', {});

export const fetchMe = () => api.getAuthed('/api/accounts/me');

// Admin-only user management. The role always comes from the server; these
// just drive the admin panel's Users table. Returns { users, callerRole } so
// the panel knows whether the viewer (a general admin) may act or only look.
export const fetchUsers = () => api.getAuthed('/api/accounts');

export const updateUserRole = (uid, role) => api.patch(`/api/accounts/${uid}/role`, { role });

// Removes the user's MongoDB record. Their Firebase Auth account is separate
// and untouched — on their next sign-in a fresh record is created and the
// ADMIN_EMAILS bootstrap runs again.
export const deleteUser = (uid) => api.delete(`/api/accounts/${uid}`);

/* --------------------------------- images -------------------------------- */

// Returns { url, id, contentType, size }. The url is relative — pass it
// through resolveImageUrl() before putting it in an <img src>.
export const uploadImage = (file, { onProgress } = {}) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.upload('/api/images', formData, { onProgress });
};

export const deleteImage = (id) => api.delete(`/api/images/${id}`);

/* ---------------------------------- sales -------------------------------- */

// Sales are recorded by the owner after a WhatsApp order, which is what moves
// stock — there is no separate stock-edit path that could drift out of step.
export const fetchSales = (params = {}) => api.getAuthed('/api/sales', params);

export const recordSale = (data) => api.post('/api/sales', data);

export const deleteSale = (id) => api.delete(`/api/sales/${id}`);
