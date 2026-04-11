// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner">
            🌱
          </div>
          <h1 className="text-3xl font-semibold tracking-tighter heading-font text-slate-900 dark:text-white">
            UWEZO
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/dashboard' ? 'text-emerald-600 font-semibold' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/invest')}
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/invest' ? 'text-emerald-600 font-semibold' : ''}`}
          >
            Invest
          </button>
          <button 
            onClick={() => navigate('/learn')}
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/learn' ? 'text-emerald-600 font-semibold' : ''}`}
          >
            Learn
          </button>
          <button 
            onClick={() => navigate('/simulator')}
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/simulator' ? 'text-emerald-600 font-semibold' : ''}`}
          >
            Simulator
          </button>
          <button 
            onClick={() => navigate('/investments')}
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/investments' ? 'text-emerald-600 font-semibold' : ''}`}
          >
            Investments
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          aria-label="Toggle dark mode"
        >
          <Sun className="w-5 h-5 hidden dark:block text-amber-400" />
          <Moon className="w-5 h-5 block dark:hidden text-slate-700" />
        </button>
      </div>
    </nav>
  );
}