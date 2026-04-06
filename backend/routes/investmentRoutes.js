/**
 * =============================================
 * FILE: backend/routes/investmentRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Routes for investment simulation and real micro-investments
 * =============================================
 */

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');

// Import controllers
const { 
  startPractice, 
  recordInvestment, 
  getInvestmentHistory 
} = require('../controllers/investmentController');

// Practice Trading Simulator (Risk-free)
router.post('/practice', authenticate, startPractice);

// Record real investment (called after successful payment)
router.post('/record', authenticate, recordInvestment);

// Get user's investment history
router.get('/history', authenticate, getInvestmentHistory);

module.exports = router;