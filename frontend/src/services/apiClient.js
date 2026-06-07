import axios from 'axios';
import { env } from '../config/env.js';

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  timeout: 15000
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
