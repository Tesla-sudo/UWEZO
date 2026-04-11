// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { userApi } from '../api/userApi';
import { TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    userApi.getProfile().then(res => setUser(res.data.data));
  }, []);

  if (!user)
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Loading dashboard...
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Good morning, {user.name}
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Here's an overview of your financial growth and learning progress.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Reputation Score */}
        <div className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          p-6
          shadow-sm
          transition-all
        ">
          <div className="flex items-center justify-between">

            <div>
              <div className="text-xs font-semibold tracking-wide text-emerald-600">
                REPUTATION SCORE
              </div>

              <div className="text-4xl font-semibold mt-3 text-slate-900 dark:text-white">
                {user.reputationScore || 0}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+15 this month</span>
              </div>
            </div>

          </div>
        </div>

        {/* Learning Streak */}
        <div className="
          bg-gradient-to-br from-amber-500 to-orange-500
          text-white
          rounded-2xl
          p-6
          shadow-sm
        ">
          <div className="flex items-center justify-between">

            <div>
              <div className="text-xs font-medium opacity-80 tracking-wide">
                LEARNING STREAK
              </div>

              <div className="text-4xl font-semibold mt-3">
                {user.learningStreak || 0}
              </div>

              <div className="flex items-center gap-1.5 text-xs opacity-90 mt-3">
                <Award className="w-3.5 h-3.5" />
                <span>Consistency builds financial trust</span>
              </div>
            </div>

          </div>
        </div>

        {/* Total Invested */}
        <div className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          p-6
          shadow-sm
          transition-all
        ">
          <div>

            <div className="text-xs font-semibold tracking-wide text-slate-500">
              TOTAL INVESTED
            </div>

            <div className="text-3xl font-semibold mt-3 text-slate-900 dark:text-white">
              KES {user.totalInvested || 0}
            </div>

            <div className="text-xs text-slate-400 mt-3">
              Across all investment opportunities
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}