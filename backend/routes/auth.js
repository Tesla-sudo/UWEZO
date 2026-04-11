// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// In-memory users (replace with MongoDB model later)
const users = [];

// @desc    Register user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, pin, language = 'swahili' } = req.body;

    if (!name || !phoneNumber || !pin) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, phone number and PIN are required" 
      });
    }

    // Check if user exists
    const existingUser = users.find(u => u.phoneNumber === phoneNumber);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this phone number already exists" 
      });
    }

    // Hash PIN
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    const newUser = {
      id: Date.now().toString(),
      name,
      phoneNumber,
      pin: hashedPin,
      language,
      createdAt: new Date()
    };

    users.push(newUser);

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, phoneNumber: newUser.phoneNumber },
      process.env.JWT_SECRET || 'your_very_strong_secret_key_here',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during registration" 
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, pin } = req.body;

    if (!phoneNumber || !pin) {
      return res.status(400).json({ 
        success: false, 
        message: "Phone number and PIN are required" 
      });
    }

    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone number or PIN" 
      });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid phone number or PIN" 
      });
    }

    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET || 'your_very_strong_secret_key_here',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during login" 
    });
  }
});

module.exports = router;