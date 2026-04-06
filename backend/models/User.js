/**
 * =============================================
 * FILE: backend/models/User.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: User model with authentication + reputation scoring
 * =============================================
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true, index: true },
  pin: { type: String }, // Hashed 4-digit PIN for feature phone users
  name: { type: String },
  language: { type: String, default: 'swahili', enum: ['english', 'swahili', 'sheng'] },
  reputationScore: { type: Number, default: 0 },
  learningStreak: { type: Number, default: 0 },
  totalInvested: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);