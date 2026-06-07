import { apiClient } from './apiClient.js';

export const orderApi = {
  create: (payload) => apiClient.post('/orders', payload),
  mine: () => apiClient.get('/orders/me'),
  detail: (orderId) => apiClient.get(`/orders/me/${orderId}`),
  adminList: (params) => apiClient.get('/orders/admin', { params }),
  updateStatus: (orderId, status) => apiClient.patch(`/orders/admin/${orderId}/status`, { status }),
  updateCourier: (orderId, payload) => apiClient.patch(`/orders/admin/${orderId}/courier`, payload),
  updateDeliveryStatus: (orderId, payload) =>
    apiClient.patch(`/orders/admin/${orderId}/delivery-status`, payload)
};
