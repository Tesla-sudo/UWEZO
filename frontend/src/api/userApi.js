/**
 * =============================================
 * FILE: frontend/src/api/userApi.js
 * PURPOSE: All user-related API calls
 * =============================================
 */

import apiClient from './client';

export const userApi = {
  register: async (data) => {
    return apiClient.post('/users/register', data);
  },

  getProfile: async () => {
    return apiClient.get('/users/profile');
  },
};