// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Landmark } from 'lucide-react';

export default function Navbar({ toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Invest', path: '/invest' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Learn', path: '/learn' },
    { label: 'Simulator', path: '/simulator' },
    { label: 'Investments', path: '/investments' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Landmark className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            UWEZO
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  relative transition-colors duration-200
                  hover:text-emerald-600
                  ${isActive ? 'text-emerald-600 font-semibold' : ''}
                `}
              >
                {item.label}

                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            w-9 h-9 flex items-center justify-center
            rounded-xl
            border border-slate-200 dark:border-slate-700
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition-all duration-200
          "
          aria-label="Toggle dark mode"
        >
          <Sun className="w-4 h-4 hidden dark:block text-amber-400" />
          <Moon className="w-4 h-4 block dark:hidden text-slate-700" />
        </button>

      </div>
    </nav>
  );
}