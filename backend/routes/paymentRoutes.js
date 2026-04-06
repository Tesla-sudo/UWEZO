/**
 * =============================================
 * FILE: backend/routes/paymentRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: All M-PESA / PayHero payment-related routes
 * =============================================
 */

const express = require('express');
const router = express.Router();
const { stkPush, paymentCallback } = require('../controllers/paymentController');
const authenticate = require('../middleware/auth');

// Protected route - Initiate STK Push (from Web or WhatsApp)
router.post('/stk-push', authenticate, stkPush);

// Public route - PayHero Webhook Callback (NO authentication)
router.post('/callback', paymentCallback);

// Optional: Check payment status
router.get('/status/:transactionId', authenticate, async (req, res) => {
  // You can implement this later
  res.json({ success: true, message: "Payment status endpoint ready" });
});

module.exports = router;