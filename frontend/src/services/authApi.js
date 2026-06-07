import { apiClient } from './apiClient.js';

export const authApi = {
  register: (payload) => apiClient.post('/auth/register', payload),
  login: (payload) => apiClient.post('/auth/login', payload),
  profile: () => apiClient.get('/users/me'),
  updateProfile: (payload) => apiClient.patch('/users/me', payload)
};
