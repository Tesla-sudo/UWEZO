// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Dashboard({ toggleTheme, currentTheme }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
              🌱
            </div>
            <h1 className="text-3xl font-semibold tracking-tighter heading-font text-slate-900 dark:text-white">
              UWEZO
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              aria-label="Toggle dark mode"
            >
              {currentTheme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter heading-font text-slate-900 dark:text-white">
              Habari ya asubuhi, Juma! 🌱
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Your financial reputation is growing strong
            </p>
          </div>

          <div className="flex gap-4 mt-8 md:mt-0">
            <button
              onClick={() => navigate('/invest')}
              className="px-8 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl flex items-center font-medium hover:shadow transition-all"
            >
              Explore Investments
            </button>
            <button
              onClick={() => navigate('/learn')}
              className="px-8 h-12 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl flex items-center font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Continue Learning
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Reputation Score */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-semibold tracking-widest text-emerald-600 dark:text-emerald-400">REPUTATION SCORE</div>
                <div className="text-7xl font-bold mt-4 text-slate-900 dark:text-white">872</div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm mt-3">
                  <TrendingUp className="w-4 h-4" /> +38 this month
                </div>
              </div>
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-12" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="94" strokeDashoffset="18" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-5xl">🏆</div>
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="md:col-span-4 bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-3xl p-8 shadow-sm flex flex-col">
            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-75">LEARNING STREAK</div>
                <div className="text-7xl font-bold mt-3">21 🔥</div>
              </div>
            </div>
            <div className="mt-auto text-sm opacity-90">
              You're on fire! 3 more days to unlock KES 500 bonus
            </div>
          </div>

          {/* Total Invested */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">TOTAL INVESTED</div>
            <div className="text-6xl font-bold mt-4 text-slate-900 dark:text-white">KES 14,800</div>
            <div className="mt-8 flex items-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" /> 12% returns • 3 active investments
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <QuickAction icon="💰" title="Quick Invest" desc="KES 500 via M-PESA" onClick={() => navigate('/invest')} />
            <QuickAction icon="🔍" title="Verify Broker" desc="Instant check" onClick={() => navigate('/broker-check')} />
            <QuickAction icon="🎮" title="Trading Simulator" desc="Risk-free practice" onClick={() => navigate('/simulator')} />
            <QuickAction icon="📱" title="USSD Demo" desc="*789# experience" onClick={() => navigate('/ussd')} />
          </div>
        </div>
      </div>
    </>
  );
}

function QuickAction({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-3xl p-7 hover:-translate-y-1 cursor-pointer transition-all shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col group"
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="font-semibold text-lg text-slate-900 dark:text-white">{title}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex-1">{desc}</div>
      <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-6 group-hover:translate-x-1 transition-transform" />
    </div>
  );
}