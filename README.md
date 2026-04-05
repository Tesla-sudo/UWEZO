# UWEZO – Learn. Verify. Invest.

A multilingual, low-connectivity platform that helps Kenyans safely learn investing, build a trusted financial reputation, and access micro-investments — even on feature phones.

> WhatsApp • USSD (*789#) • Web • M-PESA  
> Built for first-time investors, informal workers, and feature-phone users.

---

# Project Vision
UWEZO solves the real barriers to investing in Kenya: fear of scams, lack of knowledge, language barriers, and low connectivity.

**Core Promise**: Learn → Verify → Build Reputation → Invest safely with KES 50+.

---

# Team Roles & Ownership
- **Backend & Payments Engineer** → Owns everything under `backend/`
- **Frontend Engineer** → Owns everything under `frontend/src/components/`
- **AI & WhatsApp Integration Engineer** → Owns WhatsApp + AI logic
- **Product Manager / QA** → Owns `docs/` and GitHub

---

# API ENDPOINTS REFERENCE (Frontend ↔ Backend Connection)

**Base URL**: `http://localhost:5000/api` 

### User Management
- `POST /api/users/register` → Create new user (phone + language)
- `GET /api/users/:phoneNumber` → Get user profile + reputation score
- `PUT /api/users/:phoneNumber` → Update reputation / streak

### Broker Verification
- `GET /api/brokers/verify/:licenseNumber` → Check if broker is CMA-licensed
- `GET /api/brokers/search` → Search licensed brokers

### Investment & Simulator
- `POST /api/investments/practice` → Start risk-free simulation
- `GET /api/investments/history/:userId` → Get user’s investment history

### Payments (PayHero M-PESA)
- `POST /api/payments/stk-push` → Trigger STK Push (WhatsApp + Web)
- `POST /api/payments/callback` → PayHero webhook (backend only)
- `GET /api/payments/status/:transactionId` → Check payment status

### WhatsApp Bot
- `POST /api/whatsapp/webhook` → WhatsApp Cloud API incoming messages
- `POST /api/whatsapp/send` → Send message from backend to user

**Frontend team**: Use Axios/Fetch to call these endpoints. All responses include `success` and `data` fields.

---

# COMPLETE PROJECT STRUCTURE + FILE-BY-FILE GUIDE

Every file below already contains the **standard header comment** (from the previous starter files).  
The comment **beside each file** tells you exactly what to implement next.

UWEZO/
├── frontend/                  # ← Frontend Engineer starts here
│   └── src/
│       └── components/
│           ├── Dashboard.js
│           │   # Build main user dashboard: reputation score, learning streak, total invested, quick actions
│           ├── LanguageSelector.js
│           │   # Dropdown + auto-detect for English, Swahili, Sheng, local languages
│           ├── LearningModule.js
│           │   # Voice + text lessons, progress tracker, quiz
│           ├── BrokerCheck.js
│           │   # Input field → calls /api/brokers/verify → shows green/red status
│           ├── Simulator.js
│           │   # Risk-free trading simulator with fake market data
│           ├── USSDSimulator.js
│           │   # Web-based USSD menu simulator (*789# look & feel) for demo
│           ├── PaymentButton.js
│           │   # Button that calls /api/payments/stk-push and shows M-PESA prompt
│           └── ChatbotWidget.js
│               # Embedded WhatsApp-like chat for web testing
│
├── backend/                   # ← Backend & Payments Engineer starts here
│   ├── controllers/
│   │   ├── userController.js
│   │   │   # Handle register, get profile, update reputation score
│   │   ├── brokerController.js
│   │   │   # Verify broker against CMA list + search
│   │   ├── investmentController.js
│   │   │   # Practice simulator logic + real investment record
│   │   ├── paymentController.js
│   │   │   # STK push trigger + callback handler
│   │   ├── aiController.js
│   │   │   # AI response generation + language translation
│   │   ├── whatsappController.js
│   │   │   # Process incoming WhatsApp messages and route to flows
│   │   └── ussdController.js
│   │       # Simulate USSD menu responses (for feature phone flow)
│   │
│   ├── services/
│   │   ├── payheroService.js
│   │   │   # All PayHero STK Push + callback logic (axios calls)
│   │   ├── aiService.js
│   │   │   # AI model calls (OpenAI/Groq) + multilingual translation
│   │   ├── whatsappService.js
│   │   │   # Send/receive WhatsApp messages via official API
│   │   └── ussdService.js
│   │       # USSD session management (in-memory for demo)
│   │
│   ├── models/
│   │   ├── User.js
│   │   │   # Schema: phone, language, reputationScore, streak, totalInvested
│   │   ├── Broker.js
│   │   │   # Schema: name, licenseNumber, regulatedBy (CMA)
│   │   └── Transaction.js
│   │       # Schema: userId, amount, type, status, payheroId
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   │   # Express router for all /api/users endpoints
│   │   ├── brokerRoutes.js
│   │   │   # Express router for broker verification
│   │   ├── investmentRoutes.js
│   │   │   # Practice + real investment routes
│   │   ├── paymentRoutes.js
│   │   │   # STK push and callback routes
│   │   └── whatsappRoutes.js
│   │       # Webhook route for WhatsApp
│   │
│   ├── config/
│   │   └── db.js
│   │       # MongoDB connection + event handlers
│   └── server.js
│       # Main Express app, middleware, route mounting, health check
│
├── docs/                      # ← Product Manager / QA owns this folder
│   ├── architecture.md
│   │   # High-level diagrams, data flow, security, USSD flow
│   ├── api-docs.md
│   │   # Full Swagger-style documentation of every endpoint
│   └── user-guide.md
│       # End-user instructions for WhatsApp, USSD, Web
│
├── .env.example
├── .gitignore
├── README.md                  # ← You are reading this file
└── package.json
text---

# Tech Stack Reminder
- Backend: Node.js + Express + MongoDB + Mongoose
- Frontend: React + Vite + Tailwind
- Payments: PayHero
- WhatsApp: Official Cloud API
- AI: OpenAI / Groq / Gemini

---

# Development Workflow
1. Pull latest `develop` branch
2. Create feature branch: `feature/role-task-name`
3. Implement **only** the part described in the file comment
4. Update the file header with today’s date
5. Submit PR → Product Manager reviews

