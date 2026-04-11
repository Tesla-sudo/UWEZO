/**
 * =============================================
 * FILE: backend/routes/authRoutes.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Authentication routes - Register & Login with 4-digit PIN
 * =============================================
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, pin, language = 'swahili' } = req.body;

    if (!name || !phoneNumber || !pin) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, phone number and 4-digit PIN are required" 
      });
    }

    if (pin.length !== 4 || isNaN(pin)) {
      return res.status(400).json({ 
        success: false, 
        message: "PIN must be exactly 4 digits" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User with this phone number already exists" 
      });
    }

    // Hash the PIN
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    // Create new user
    const user = new User({
      name,
      phoneNumber,
      pin: hashedPin,
      language,
      reputationScore: 0,
      learningStreak: 0,
      totalInvested: 0
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        reputationScore: user.reputationScore
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during registration" 
    });
  }
});

// @desc    Login user with PIN
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, pin } = req.body;

    if (!phoneNumber || !pin) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone number and PIN are required" 
      });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone number or PIN" 
      });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone number or PIN" 
      });
    }

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        reputationScore: user.reputationScore
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during login" 
    });
  }
});

module.exports = router;