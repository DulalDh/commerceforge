import { apiClient } from './apiClient.js';

export const cartApi = {
  get: () => apiClient.get('/cart'),
  addItem: (payload) => apiClient.post('/cart/items', payload),
  updateItem: (itemId, payload) => apiClient.patch(`/cart/items/${itemId}`, payload),
  removeItem: (itemId) => apiClient.delete(`/cart/items/${itemId}`),
  clear: () => apiClient.delete('/cart')
};
