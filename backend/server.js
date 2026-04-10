const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// 🛠️ ADD THIS LINE RIGHT HERE TO FIX THE FETCH ERROR:
require('node:dns').setDefaultResultOrder('ipv4first'); 

const app = express();
// ... the rest of your server.js code continues below

// ====================== MIDDLEWARE ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ====================== ALL ROUTES ======================
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/brokers', require('./routes/brokerRoutes'));
app.use('/api/investments', require('./routes/investmentRoutes'));
app.use('/api/ussd', require('./routes/ussdRoutes'));
app.use('/api/whatsapp', require('./routes/whatsappRoutes'));

// ====================== HEALTH CHECK ======================
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'UWEZO Backend is running successfully',
    owner: 'Backend & Payments Engineer'
  });
});

// ====================== 404 CATCH-ALL (Fixed Version) ======================
app.use((req, res, next) => {
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
      console.log(`UWEZO Backend Server running on http://localhost:${PORT}`);
      // <-- UPDATED THE CONSOLE LOG TO INCLUDE WHATSAPP
      console.log(`Routes active → /api/users, /api/payments, /api/brokers, /api/investments, /api/ussd, /api/whatsapp`); 
    });
  } catch (error) {
    console.error('Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;