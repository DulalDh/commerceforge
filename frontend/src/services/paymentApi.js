import { apiClient } from './apiClient.js';

export const paymentApi = {
  methods: () => apiClient.get('/payments/methods'),
  adminList: (params) => apiClient.get('/payments/admin', { params }),
  verify: (paymentId, payload) => apiClient.patch(`/payments/admin/${paymentId}/verify`, payload)
};
