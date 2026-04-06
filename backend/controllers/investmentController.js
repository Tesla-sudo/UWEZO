/**
 * =============================================
 * FILE: backend/controllers/investmentController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Handle investment simulation and real micro-investments
 * =============================================
 */

const Transaction = require('../models/Transaction');
const User = require('../models/User');

/**
 * Start Risk-Free Practice Trading Session
 */
const startPractice = async (req, res) => {
  const { userId } = req.body;

  try {
    // In real implementation, you could save practice session if needed
    res.status(200).json({
      success: true,
      message: "Practice trading session started successfully",
      data: {
        sessionId: `practice_${Date.now()}`,
        balance: 10000, // Virtual KES 10,000 for practice
        message: "This is a simulation. No real money will be used."
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Record Real Investment (Called after successful PayHero payment)
 */
const recordInvestment = async (req, res) => {
  const { userId, amount, payheroTransactionId } = req.body;

  try {
    // Create transaction record
    const transaction = new Transaction({
      userId,
      amount: Number(amount),
      type: 'investment',
      status: 'success',
      payheroTransactionId
    });

    await transaction.save();

    // Update user's total invested and reputation score
    const user = await User.findById(userId);
    if (user) {
      user.totalInvested += Number(amount);
      user.reputationScore = Math.min(100, user.reputationScore + 10); // +10 points per investment
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Investment recorded successfully",
      data: transaction
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get User's Investment History
 */
const getInvestmentHistory = async (req, res) => {
  const { userId } = req.query; // or from req.user after auth

  try {
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  startPractice,
  recordInvestment,
  getInvestmentHistory
};