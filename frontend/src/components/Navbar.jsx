// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('uwezo_token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold">
            U
          </div>
          <span className="text-2xl font-semibold tracking-tighter text-slate-900 dark:text-white">
            UWEZO
          </span>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'text-emerald-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) =>
              isActive
                ? 'text-emerald-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }
          >
            Learn
          </NavLink>
          <NavLink
            to="/invest"
            className={({ isActive }) =>
              isActive
                ? 'text-emerald-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }
          >
            Invest
          </NavLink>
          <NavLink
            to="/simulator"
            className={({ isActive }) =>
              isActive
                ? 'text-emerald-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }
          >
            Simulator
          </NavLink>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSelector />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>

          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}