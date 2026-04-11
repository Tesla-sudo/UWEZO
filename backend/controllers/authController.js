/**
 * =============================================
 * FILE: backend/controllers/authController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Handle user registration and PIN-based login
 * =============================================
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User with Name, Phone & 4-digit PIN
const registerUser = async (req, res) => {
  const { name, phoneNumber, pin } = req.body;

  if (!name || !phoneNumber || !pin) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone number and PIN are required'
    });
  }

  if (pin.length !== 4 || isNaN(pin)) {
    return res.status(400).json({
      success: false,
      message: 'PIN must be exactly 4 digits'
    });
  }

  try {
    let user = await User.findOne({ phoneNumber });

    if (user) {
      return res.status(409).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }

    // Hash the PIN before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    user = new User({
      name,
      phoneNumber,
      pin: hashedPin,
      language: 'swahili',
      reputationScore: 0,
      learningStreak: 0,
      totalInvested: 0
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        reputationScore: user.reputationScore
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating account'
    });
  }
};

// Login with Phone + PIN
const loginWithPin = async (req, res) => {
  const { phoneNumber, pin } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect PIN'
      });
    }

    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
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
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

module.exports = { registerUser, loginWithPin };