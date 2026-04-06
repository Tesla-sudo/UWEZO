/**
 * =============================================
 * FILE: backend/controllers/ussdController.js
 * OWNER: Backend & Payments Engineer
 * PURPOSE: Handle USSD menu logic for feature phone users (*789#)
 * =============================================
 */

const User = require('../models/User');

/**
 * Main USSD Handler - Processes all menu navigation
 */
const handleUSSD = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  try {
    // Find or create user
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber, language: 'swahili' });
      await user.save();
    }

    // USSD Menu Logic
    if (!text || text === "") {
      // Welcome Menu (*789#)
      response = `CON Welcome to UWEZO - Learn. Verify. Invest.\n\n1. Learn Investing\n2. Check Broker\n3. Practice Investing\n4. Invest Now\n5. My Reputation Score\n0. Exit`;
    } 
    else if (text === "1") {
      response = `CON Investment Lessons\n\n1. What is the Stock Market?\n2. How to invest with KES 50\n3. How to avoid scams\n4. Voice Lesson\n0. Back to Main Menu`;
    } 
    else if (text === "2") {
      response = `CON Broker Verification\n\nEnter Broker License Number:\n(Example: CMA12345)`;
    } 
    else if (text === "3") {
      response = `CON Practice Investing\n\n1. Start Simulator\n0. Back`;
    } 
    else if (text === "4") {
      response = `CON Invest Now\n\nEnter amount (min KES 50):\nExample: 100`;
    } 
    else if (text === "5") {
      response = `CON Your Reputation Score: ${user.reputationScore}/100\n\nLearning Streak: ${user.learningStreak} days\nTotal Invested: KES ${user.totalInvested}\n\n0. Back to Main Menu`;
    } 
    else if (text.startsWith("4*")) {
      // User entered amount to invest (e.g., 4*100)
      const amount = text.split("*")[1];
      if (Number(amount) >= 50) {
        response = `CON Confirm investment of KES ${amount}?\n1. Yes\n2. No`;
      } else {
        response = `CON Minimum investment is KES 50. Try again:`;
      }
    } 
    else {
      response = `END Invalid option. Thank you for using UWEZO.`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);

  } catch (error) {
    console.error('USSD Error:', error);
    res.send(`END System error. Please try again later.`);
  }
};

module.exports = {
  handleUSSD
};