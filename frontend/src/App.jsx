// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import InvestmentPage from './components/InvestmentPage';
import LearningModule from './components/LearningModule';
import Simulator from './components/Simulator';
import USSDSimulator from './components/USSDSimulator';
import BrokerCheck from './components/BrokerCheck';
import ChatbotWidget from './components/ChatbotWidget';
import ProtectedRoute from './components/ProtectedRoute';
import MyInvestments from './components/MyInvestments';
import Portfolio from './components/Portfolio';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Navbar */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <InvestmentPage />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/investments"
          element={
            <ProtectedRoute>
              <Navbar toggleTheme={toggleTheme} />
              <MyInvestments />
            </ProtectedRoute>
          }/>
          <Route
  path="/portfolio"
  element={
    <ProtectedRoute>
      <Navbar toggleTheme={toggleTheme} />
      <Portfolio />
    </ProtectedRoute>
  }
/>
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <LearningModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulator"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <Simulator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ussd"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <USSDSimulator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/broker-check"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} />
                <BrokerCheck />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Floating Chatbot Widget - Always available but easy to close */}
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;