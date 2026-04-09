// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InvestmentPage from './components/InvestmentPage';
import LearningModule from './components/LearningModule';
import USSDSimulator from './components/USSDSimulator';
import Simulator from './components/Simulator';
import BrokerCheck from './components/BrokerCheck';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/invest" element={<InvestmentPage toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/learn" element={<LearningModule toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/ussd" element={<USSDSimulator toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/simulator" element={<Simulator toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/broker-check" element={<BrokerCheck toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;