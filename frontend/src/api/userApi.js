/**
 * =============================================
 * FILE: frontend/src/api/userApi.js
 * PURPOSE: All user-related API calls
 * =============================================
 */

// import apiClient from './client';

// export const userApi = {
//   register: async (data) => {
//     return apiClient.post('/users/register', data);
//   },

//   getProfile: async () => {
//     return apiClient.get('/users/profile');
//   },
// };

// src/api/userApi.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';   // ← Change this if your backend runs on different port

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const userApi = {
//   // Register new user
//   register: async (userData) => {
//     return await api.post('/auth/register', userData);
//   },

//   // Login user
//   login: async (credentials) => {
//     return await api.post('/auth/login', credentials);
//   }
// };

// export default userApi;

// src/api/userApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';   // ← Make sure this is 5000

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const userApi = {
  register: async (userData) => await api.post('/auth/register', userData),
  login: async (credentials) => await api.post('/auth/login', credentials),
};

export default userApi;