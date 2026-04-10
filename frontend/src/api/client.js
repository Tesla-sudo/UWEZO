/**
 * =============================================
 * FILE: frontend/src/api/client.js
 * PURPOSE: Axios instance with interceptors for UWEZO frontend
 * =============================================
 */

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('uwezo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('uwezo_token');
      window.location.href = '/login';
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;