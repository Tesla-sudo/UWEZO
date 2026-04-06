/**
 * =============================================
 * FILE: backend/routes/brokerRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Broker verification routes (supports reputation & trust)
 * =============================================
 */

const express = require('express');
const router = express.Router();
const { verifyBroker } = require('../controllers/brokerController');
const authenticate = require('../middleware/auth');

// Verify a broker by license number
router.get('/verify/:licenseNumber', authenticate, verifyBroker);

// Search brokers (future use)
router.get('/search', authenticate, async (req, res) => {
  res.json({ 
    success: true, 
    message: "Broker search endpoint ready. Implement as needed." 
  });
});

module.exports = router;