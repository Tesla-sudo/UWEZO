/**
 * =============================================
 * FILE: backend/server.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Main server entry point for UWEZO Backend
 * =============================================
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Optional: Fix for some DNS issues in newer Node.js
require('node:dns').setDefaultResultOrder('ipv4first');

const app = express();

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================== ROUTES ======================
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/brokers', require('./routes/brokerRoutes'));
app.use('/api/investments', require('./routes/investmentRoutes'));
app.use('/api/ussd', require('./routes/ussdRoutes'));
app.use('/api/whatsapp', require('./routes/whatsappRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// ====================== HEALTH CHECK ======================
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 UWEZO Backend is running successfully',
    owner: 'Backend & Payments Engineer'
  });
});

// ====================== 404 CATCH-ALL ======================
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route not found: ${req.method} ${req.originalUrl}` 
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 UWEZO Backend Server running on http://localhost:${PORT}`);
      console.log(`✅ Routes active → /api/users, /api/payments, /api/brokers, /api/investments, /api/ussd, /api/whatsapp`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;