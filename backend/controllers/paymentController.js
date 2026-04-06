/**
 * =============================================
 * FILE: backend/controllers/paymentController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Handle all PayHero payment flows
 * =============================================
 */

const { initiateSTKPush } = require('../services/payheroService');
const Transaction = require('../models/Transaction');   // ← Make sure this path is correct
const User = require('../models/User');

const stkPush = async (req, res) => {
  const { phoneNumber, amount, userId, customerName } = req.body;

  if (!phoneNumber || !amount || !userId) {
    return res.status(400).json({ 
      success: false, 
      message: 'phoneNumber, amount, and userId are required' 
    });
  }

  const externalReference = `UWEZO-${Date.now()}-${userId}`;

  try {
    const paymentResult = await initiateSTKPush(
      phoneNumber, 
      amount, 
      externalReference, 
      customerName || ''
    );

    if (!paymentResult.success) {
      return res.status(400).json({ 
        success: false, 
        message: paymentResult.error || 'Failed to initiate payment' 
      });
    }

    // Create pending transaction
    const transaction = new Transaction({
      userId,
      amount: Number(amount),
      type: 'investment',
      status: 'pending',
      payheroTransactionId: paymentResult.transactionId
    });

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'STK Push sent successfully. Check your phone for M-PESA prompt.',
      data: transaction
    });

  } catch (error) {
    console.error('Payment Controller Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error while processing payment',
      error: error.message 
    });
  }
};

const paymentCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('📥 PayHero Callback Received:', callbackData);
    
    // TODO: Update transaction status and user reputation here later
    res.status(200).send('Callback received');
  } catch (error) {
    console.error('Callback Error:', error);
    res.status(500).send('Error processing callback');
  }
};

module.exports = { stkPush, paymentCallback };