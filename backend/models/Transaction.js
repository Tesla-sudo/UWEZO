/**
 * =============================================
 * FILE: backend/models/Transaction.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: MongoDB schema for all transactions
 * =============================================
 */

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  amount: {
    type: Number,
    required: true,
    min: 50
  },

  type: {
    type: String,
    enum: ['investment', 'practice'],
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  payheroTransactionId: {
    type: String,
    sparse: true,
    index: true
  },

  externalReference: {
    type: String,
    sparse: true,
    unique: true
  },

  phoneNumber: String,

  investmentType: {
    type: String,
    enum: ['stocks', 'sacco', 'treasury', 'fund', 'other'],
    default: 'other'
  },

  metadata: {
    type: Object,
    default: {}
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Correct pre-save middleware (MUST use regular function, not arrow)
transactionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);