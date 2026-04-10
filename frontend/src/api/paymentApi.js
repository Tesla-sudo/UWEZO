/**
 * =============================================
 * FILE: frontend/src/api/paymentApi.js
 * PURPOSE: All payment-related API calls (M-PESA STK Push)
 * =============================================
 */

import apiClient from './client';

export const paymentApi = {
  /**
   * Trigger M-PESA STK Push via PayHero
   * @param {Object} payload
   * @param {string} payload.phoneNumber
   * @param {number} payload.amount
   * @param {string} payload.userId
   * @param {string} payload.customerName
   */
  initiateSTKPush: async (payload) => {
    try {
      const response = await apiClient.post('/payments/stk-push', payload);
      return response;
    } catch (error) {
      console.error('Payment API Error:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Get payment status (optional for future use)
   */
  getPaymentStatus: async (transactionId) => {
    const response = await apiClient.get(`/payments/status/${transactionId}`);
    return response;
  }
};