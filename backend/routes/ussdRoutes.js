/**
 * =============================================
 * FILE: backend/routes/ussdRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: USSD menu routes for feature phone users (*789#)
 * =============================================
 */

const express = require('express');
const router = express.Router();

// Import controller
const { handleUSSD } = require('../controllers/ussdController');

/**
 * Main USSD Endpoint
 * This handles all incoming USSD requests from gateways
 */
router.post('/handle', handleUSSD);

// Optional: Debug endpoint to check USSD session
router.get('/session/:sessionId', async (req, res) => {
  res.json({
    success: true,
    message: "USSD session check endpoint",
    sessionId: req.params.sessionId
  });
});

module.exports = router;