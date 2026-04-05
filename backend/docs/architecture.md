# UWEZO System Architecture

**Learn. Verify. Invest.**  
A multilingual, low-connectivity investment platform for Kenya.

**Version:** 1.0  
**Last Updated:** April 05, 2026  
**Status:** MVP Architecture

---

# Project Overview

UWEZO is an inclusive digital investment platform designed for first-time investors, informal sector workers, rural citizens, and feature phone users in Kenya. 

The platform removes traditional barriers by offering:
- Multilingual support (English, Swahili, Sheng, local languages)
- Voice-based learning
- USSD fallback for zero internet
- Behavior-based reputation scoring
- Scam protection via licensed broker verification
- Micro-investments starting at KES 50 via M-PESA

**Core Philosophy**: **Learn → Build Trust → Verify → Invest Safely**

---

# High-Level Architecture


graph TD
    subgraph "User Channels"
        A[WhatsApp Chatbot] 
        B[USSD *789#]
        C[Web Dashboard]
    end

    subgraph "UWEZO Backend"
        D[API Layer - Express.js]
        E[AI Multilingual Engine]
        F[Business Services]
        G[Database - MongoDB]
        H[Payment Gateway - PayHero]
    end

    subgraph "External Systems"
        I[WhatsApp Cloud API]
        J[Capital Markets Authority Data]
        K[M-PESA via PayHero]
        L[AI Provider - Groq/OpenAI]
    end

    A <--> D
    B <--> D
    C <--> D
    D <--> E
    D <--> F
    F <--> G
    F <--> H
    D <--> I
    E <--> L
    H <--> K
    F <--> J

Key User Flows
1. WhatsApp Primary Flow

User sends message → WhatsApp Webhook
AI detects language & intent
System checks/creates User profile
Reputation score evaluated
Responds in user’s preferred language
Investment request → STK Push → Callback → Update reputation

2. USSD Flow (*789#)

Menu-driven interaction (no internet required)
Sessions maintained temporarily in backend
Limited features compared to WhatsApp

3. Web Flow

Full visual experience
Practice simulator with charts
Detailed reputation dashboard


Reputation Intelligence Score (Core Innovation)
Formula (v1.0):
textReputation Score = (LearningConsistency × 0.35) + 
                   (SavingBehavior × 0.25) + 
                   (Engagement × 0.20) + 
                   (SuccessfulTransactions × 0.20)

Updated after every lesson completion, practice session, and successful investment
Visible to user and used to unlock higher investment limits


Security & Compliance

Phone number as primary identifier (no emails)
OTP / PIN authentication where needed
All financial transactions via PayHero (PCI-DSS compliant)
Broker data validated against CMA licensed list
Rate limiting and input sanitization on all endpoints
HTTPS + CORS protection
Data minimization (only collect what is necessary)


Low-Connectivity & Inclusion Strategy

Offline-first design: Core features work on USSD
Progressive enhancement: USSD → WhatsApp → Web
Voice support: Text-to-Speech for lessons
Lightweight frontend: Minimal bundle size
Graceful degradation: Works even on 2G networks


Database Schema Overview

User: phoneNumber, language, reputationScore, streak, totalInvested
Transaction: userId, amount, type, status, payheroId
Broker: name, licenseNumber, regulatedBy, isActive


API Layer Design
All endpoints follow REST principles and return consistent JSON format:
JSON{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "error": null
}

Scalability & Future Considerations

Designed to support 100,000+ users
MongoDB Atlas for horizontal scaling
Containerization (Docker) ready
Microservices-ready architecture (can split later)
Easy addition of new languages and dialects


Technology Stack Summary
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React 18, Vite, TailwindCSS
Payments: PayHero API
Messaging: WhatsApp Cloud API
AI: Groq / OpenAI API
USSD: Custom simulator + potential Africa's Talking integration

Development Environment

Local: Node.js 20+, MongoDB
Version Control: Git + GitHub
Branching: develop + feature branches
Documentation: This file + api-docs.md


Architecture Principles

Simplicity over complexity
Inclusion-first design
Mobile-money native
Trust through transparency
Measurable behavior over credit score
