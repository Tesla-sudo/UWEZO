/**
 * =============================================
 * FILE: backend/routes/whatsappRoutes.js
 * OWNER: Backend & AI Engineer
 * PURPOSE: WhatsApp AI chatbot routes and logic combined
 * =============================================
 */

const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize API Clients (Make sure your .env is loaded in server.js)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory store for chat sessions (use a database like MongoDB/Redis for production)
const userSessions = {};

// UWEZO Pre-prompt
const systemInstruction = `
  You are the UWEZO Assistant for WhatsApp. Your goal is to help people learn investing, build a trusted financial reputation, and access micro-investments safely.
  Target audience: First-time investors, informal workers, small business owners, and rural citizens in Kenya.
  
  Key facts:
  - Users can start investing with KES 50, KES 100, or KES 200[cite: 105, 106, 107, 108].
  - Features include scam protection, broker verification via the Capital Markets Authority, and a practice trading simulator[cite: 109, 110, 111, 112, 113, 114].
  - Users build a Reputation Intelligence Score based on learning consistency, saving behavior, and engagement[cite: 95, 96, 97, 98, 99, 100].
  
  CRITICAL RULES FOR WHATSAPP:
  1. AUTO-DETECT LANGUAGE: The user might speak English, Swahili, Sheng, Luo, Kikuyu, Kalenjin, or Luhya. Identify their language and reply ONLY in that exact language.
  2. FORMATTING: Use WhatsApp formatting (*bold*, _italics_) and emojis to make it friendly.
  3. Keep answers very short and simple. Use line breaks to make it readable on small phones.
`;

const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest',
  systemInstruction: systemInstruction,
});

/**
 * Main WhatsApp Webhook Endpoint
 * This handles all incoming WhatsApp POST requests from Twilio
 */
router.post('/webhook', async (req, res) => {
  const incomingMsg = req.body.Body;
  const senderPhone = req.body.From;

  console.log(`[WhatsApp] Message from ${senderPhone}: ${incomingMsg}`);

  // 1. Create or retrieve the chat session for this user
  if (!userSessions[senderPhone]) {
    userSessions[senderPhone] = model.startChat({ history: [] });
  }

  try {
    // 2. Get AI Response
    const result = await userSessions[senderPhone].sendMessage(incomingMsg);
    const aiResponse = result.response.text();

    // 3. Send via Twilio
    await twilioClient.messages.create({
      body: aiResponse,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: senderPhone
    });

    // 4. Acknowledge receipt to Twilio
    const twiml = new twilio.twiml.MessagingResponse();
    res.type('text/xml').send(twiml.toString());

  } catch (error) {
    console.error("[WhatsApp] Error processing message:", error);
    
    // Send fallback error message
    await twilioClient.messages.create({
      body: "Pole sana! I am having a network issue right now. Please try again in a few minutes.",
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: senderPhone
    });
    
    res.status(500).end();
  }
});

// Optional: Debug endpoint to check status
router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: "WhatsApp webhook endpoint is active"
  });
});

module.exports = router;