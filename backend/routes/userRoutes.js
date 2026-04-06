/**
 * =============================================
 * FILE: backend/routes/userRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: All user authentication and profile routes
 * =============================================
 */

const express = require('express');
const router = express.Router();
const { registerUser, getUserProfile } = require('../controllers/userController');
const authenticate = require('../middleware/auth');

// Public route - User Registration
router.post('/register', registerUser);

// Protected route - Get User Profile + Reputation
router.get('/profile', authenticate, getUserProfile);

module.exports = router;