/**
 * =============================================
 * FILE: backend/config/db.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: MongoDB connection
 * =============================================
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      console.error('MONGO_URI is not defined in .env file');
      console.error('Please create a .env file with MONGO_URI variable');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to UWEZO database');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;