/**
 * =============================================
 * FILE: frontend/src/api/userApi.js
 * PURPOSE: User Authentication API calls
 * =============================================
 */

import apiClient from './client';

export const userApi = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    return await apiClient.post('/auth/register', userData);
  },

  /**
   * Login with phone number and PIN
   */
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },

  /**
   * Get current user profile (after login)
   */
  getProfile: async () => {
    return await apiClient.get('/users/profile');
  }
};