# UWEZO Frontend

A modern, stylish, and inclusive web platform built for **financial inclusion** in Kenya. UWEZO helps users learn investing, build a trusted financial reputation, and safely access micro-investment opportunities — even without a bank account or reliable smartphone data.

Designed with **low-connectivity** in mind, full accessibility (WCAG AA), multilingual support (English, Kiswahili, Sheng), and beautiful Figma-level UI.

---

## ✨ Features

- **Modern & Trustworthy Design** — Clean glassmorphic cards, vibrant Kenyan-inspired color palette (Emerald Green + Energy Orange)
- **Low-Connectivity Optimized** — Lightweight components, text-first fallback, fast loading
- **Multilingual Support** — English, Kiswahili, and Sheng with language selector + auto-detect
- **Full Accessibility** — High contrast, ARIA labels, keyboard navigation, screen-reader friendly
- **M-PESA Integration** — Realistic STK Push simulation and payment flow
- **USSD Simulator** — Pixel-perfect `*789#` experience for no-internet demo
- **Risk-Free Trading Simulator** — Practice investing with fake market data
- **Broker Verification** — Instant trust check simulation
- **Learning Module** — Voice + text lessons with progress tracking
- **Floating Chatbot** — WhatsApp-style AI support widget
- **Dark Mode** — Built-in theme toggle support

---

## 🛠 Tech Stack

- **React 18** (Functional Components + Hooks)
- **Vite** — Fast build tool
- **Tailwind CSS v4** — Utility-first styling
- **Lucide React** — Beautiful icons
- **React Router DOM v6** — Client-side routing
- **JavaScript (JSX)**

---

## 📁 Project Structure

```bash
UWEZO/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── InvestmentPage.jsx
│   │   │   ├── LearningModule.jsx
│   │   │   ├── USSDSimulator.jsx
│   │   │   ├── Simulator.jsx
│   │   │   ├── BrokerCheck.jsx
│   │   │   ├── PaymentButton.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── ChatbotWidget.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md

```
🚀 Quick Start
1. Clone the repository
Bashgit clone <your-repo-url>
cd UWEZO/frontend
2. Install dependencies
Bashnpm install
3. Install TailwindCSS (if not already set up)
Bashnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
4. Start the development server
Bashnpm run dev
Open http://localhost:5173 to view the app.

📋 Available Routes


Route,Description
/,Login Page
/dashboard,Main User Dashboard
/invest,Investment Opportunities Page
/learn,Learning Module
/ussd,USSD Simulator (*789#)
/simulator,Risk-Free Trading Simulator
/broker-check,Broker Verification Tool


































RouteDescription/Login Page/dashboardMain User Dashboard/investInvestment Opportunities Page/learnLearning Module/ussdUSSD Simulator (*789#)/simulatorRisk-Free Trading Simulator/broker-checkBroker Verification Tool

🎨 Design Highlights

Primary Colors: Emerald Green (#10b981), Energy Orange (#f59e0b), Trust Blue (#1e40af)
Typography: Space Grotesk for headings, Inter for body
Components: Glassmorphism effects, smooth hover animations, mobile-first responsive design
Figma-style Polish: Subtle shadows, rounded corners (3xl), generous whitespace


🔧 Key Components

Login.jsx — Beautiful hero login with phone + USSD option
Dashboard.jsx — Reputation score, learning streak, total invested, quick actions
InvestmentPage.jsx — Micro-investment cards with payment integration
PaymentButton.jsx — M-PESA STK Push simulation
USSDSimulator.jsx — Realistic black/green USSD interface
LanguageSelector.jsx — Supports English, Kiswahili & Sheng
ChatbotWidget.jsx — Floating WhatsApp-style support chat


🌍 Multilingual Support

English
Kiswahili (Default for Kenya)
Sheng (Kenyan street slang)

Language selector is located in the top navigation.

♿ Accessibility

WCAG 2.1 AA compliant
High contrast ratios
Proper ARIA labels
Keyboard navigable
Screen reader friendly


🔮 Future Enhancements

Full i18n implementation (react-i18next)
Real backend API integration
PWA support for offline use
Voice input for learning modules
Biometric login (fingerprint simulation)
Dark/Light mode toggle in UI


📄 License
This project is part of the UWEZO financial inclusion platform. All rights reserved.

Built with ❤️ for Kenya's unbanked and underbanked communities.

Made for UWEZO – Empowering Kenyans to invest smarter.
