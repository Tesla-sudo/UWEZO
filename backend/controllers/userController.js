/**
 * =============================================
 * FILE: backend/controllers/userController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: User registration, auth, profile & reputation
 * =============================================
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { phoneNumber, name, language = 'swahili' } = req.body;
  try {
    let user = await User.findOne({ phoneNumber });
    if (user) return res.status(200).json({ success: true, message: 'User already exists', data: user });

    user = new User({ phoneNumber, name, language });
    await user.save();

    const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ success: true, token, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.user.phoneNumber });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, getUserProfile };