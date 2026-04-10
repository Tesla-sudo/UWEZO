/**
 * =============================================
 * FILE: frontend/src/api/investmentApi.js
 * PURPOSE: Investment and simulator API calls
 * =============================================
 */

import apiClient from './client';

export const investmentApi = {
  startPractice: async (userId) => {
    return apiClient.post('/investments/practice', { userId });
  },

  getHistory: async () => {
    return apiClient.get('/investments/history');
  },
};