/**
 * =============================================
 * FILE: backend/services/payheroService.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: PayHero M-PESA STK Push integration using Basic Auth
 * UPDATED: Uses PAYHERO_USERNAME + PAYHERO_PASSWORD
 * =============================================
 */

const axios = require('axios');

/**
 * Generate Basic Auth Token from username and password
 */
const getBasicAuthToken = () => {
  const credentials = `${process.env.PAYHERO_USERNAME}:${process.env.PAYHERO_PASSWORD}`;
  return `Basic ${Buffer.from(credentials).toString('base64')}`;
};

/**
 * Initiate M-PESA STK Push via PayHero
 * @param {string} phoneNumber - Phone in format 07XXXXXXXX or 2547XXXXXXXX
 * @param {number} amount - Amount to charge (KES)
 * @param {string} externalReference - Unique reference (e.g., UWEZO-123456)
 * @param {string} customerName - Optional customer name
 * @returns {Promise<Object>}
 */
const initiateSTKPush = async (phoneNumber, amount, externalReference, customerName = '') => {
  try {
    const payload = {
      amount: Number(amount),
      phone_number: phoneNumber,
      channel_id: parseInt(process.env.PAYHERO_CHANNEL_ID),
      provider: "m-pesa",
      external_reference: externalReference,
      customer_name: customerName,
      callback_url: process.env.PAYHERO_CALLBACK_URL
    };

    const response = await axios.post(
      'https://backend.payhero.co.ke/api/v2/payments',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getBasicAuthToken()
        }
      }
    );

    console.log(`STK Push initiated successfully - Ref: ${externalReference}`);
    return {
      success: true,
      data: response.data,
      transactionId: response.data.transaction_id || externalReference
    };

  } catch (error) {
    console.error('PayHero STK Push Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

/**
 * Handle PayHero Callback (Webhook)
 * This will be called by PayHero after payment attempt
 */
const handleCallback = async (callbackData) => {
  console.log('PayHero Callback Received:', JSON.stringify(callbackData, null, 2));

  // TODO: You will update Transaction status + User reputation score here later
  // Example fields from PayHero: transaction_id, status, amount, phone_number, etc.

  return callbackData;
};

module.exports = {
  initiateSTKPush,
  handleCallback
};