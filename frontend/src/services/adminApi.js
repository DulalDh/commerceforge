import { apiClient } from './apiClient.js';

export const adminApi = {
  stats: () => apiClient.get('/admin/stats'),
  customers: (params) => apiClient.get('/admin/customers', { params }),
  categories: (params) => apiClient.get('/admin/categories', { params }),
  createCategory: (payload) => apiClient.post('/admin/categories', payload),
  updateCategory: (categoryId, payload) => apiClient.patch(`/admin/categories/${categoryId}`, payload),
  deleteCategory: (categoryId) => apiClient.delete(`/admin/categories/${categoryId}`),
  coupons: (params) => apiClient.get('/admin/coupons', { params }),
  createCoupon: (payload) => apiClient.post('/admin/coupons', payload),
  updateCoupon: (couponId, payload) => apiClient.patch(`/admin/coupons/${couponId}`, payload),
  deleteCoupon: (couponId) => apiClient.delete(`/admin/coupons/${couponId}`),
  reviews: (params) => apiClient.get('/admin/reviews', { params }),
  moderateReview: (productId, reviewId, payload) =>
    apiClient.patch(`/admin/products/${productId}/reviews/${reviewId}`, payload)
};
