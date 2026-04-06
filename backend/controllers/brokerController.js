/**
 * =============================================
 * FILE: backend/controllers/brokerController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Broker verification against CMA list
 * =============================================
 */

const Broker = require('../models/Broker');

const verifyBroker = async (req, res) => {
  const { licenseNumber } = req.params;
  try {
    const broker = await Broker.findOne({ licenseNumber });
    if (!broker) return res.json({ success: true, isValid: false, message: 'Not a licensed broker' });

    res.json({ success: true, isValid: broker.isActive, data: broker });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { verifyBroker };