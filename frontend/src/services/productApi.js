import { apiClient } from './apiClient.js';

export const productApi = {
  list: (params) => apiClient.get('/products', { params }),
  details: (productId) => apiClient.get(`/products/${productId}`),
  create: (payload) => apiClient.post('/products', payload),
  update: (productId, payload) => apiClient.patch(`/products/${productId}`, payload),
  remove: (productId) => apiClient.delete(`/products/${productId}`)
};
