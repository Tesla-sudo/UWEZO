// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { userApi } from '../api';
import { TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Hero Greeting */}
      <div className="mb-12">
        <h1 className="text-5xl font-semibold tracking-tighter text-slate-900 dark:text-white">
          Good morning, {user?.name || 'Investor'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Your financial reputation is growing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reputation Score */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="text-xs font-semibold tracking-widest text-emerald-600">REPUTATION SCORE</div>
          <div className="text-7xl font-bold mt-4 text-slate-900 dark:text-white">
            {user?.reputationScore || 0}
          </div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm mt-4">
            <TrendingUp className="w-4 h-4" />
            <span>+12 this month</span>
          </div>
        </div>

        {/* Learning Streak & Total Invested */}
        {/* ... similar real-data cards ... */}
      </div>
    </div>
  );
}