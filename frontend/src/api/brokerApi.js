/**
 * =============================================
 * FILE: frontend/src/api/brokerApi.js
 * PURPOSE: Broker verification API
 * =============================================
 */

import apiClient from './client';

export const brokerApi = {
  verify: async (licenseNumber) => {
    return apiClient.get(`/brokers/verify/${licenseNumber}`);
  },
};