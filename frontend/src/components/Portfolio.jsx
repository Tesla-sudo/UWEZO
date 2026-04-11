// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { investmentApi } from '../api';
import { Wallet, ArrowDownCircle } from 'lucide-react';

export default function Portfolio() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    investmentApi.getHistory().then(res => {
      setInvestments(res.data.data || []);
      setLoading(false);
    });
  }, []);

  const handleWithdraw = (inv) => {
    alert(
      `Withdrawal request for KES ${inv.amount} has been submitted.\nFunds will be sent to your M-PESA within 24 hours.`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          My Portfolio
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Track your active investments and manage withdrawals.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-sm text-slate-500">
          Loading your investments...
        </div>
      ) : investments.length === 0 ? (

        /* Empty State */
        <div className="
          text-center
          py-16
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          shadow-sm
        ">

          <div className="flex justify-center mb-4">
            <Wallet className="w-6 h-6 text-slate-400" />
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            You have not made any investments yet.
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Start investing to build your financial reputation.
          </p>

        </div>

      ) : (

        /* Portfolio List */
        <div className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          divide-y divide-slate-200 dark:divide-slate-800
          shadow-sm
        ">

          {investments.map(inv => (

            <div
              key={inv._id}
              className="
                px-6 py-5
                flex
                items-center
                justify-between
                transition-all
                hover:bg-slate-50 dark:hover:bg-slate-800
              "
            >

              {/* Left */}
              <div>

                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {inv.title || 'Investment'}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  KES {inv.amount}
                </p>

              </div>

              {/* Right */}
              <div className="flex items-center gap-4">

                {/* Status */}
                <span className="
                  text-xs
                  font-medium
                  px-3 py-1
                  rounded-lg
                  bg-emerald-50
                  text-emerald-700
                ">
                  Active
                </span>

                {/* Withdraw */}
                <button
                  onClick={() => handleWithdraw(inv)}
                  className="
                    flex items-center gap-1.5
                    text-sm
                    font-medium
                    text-emerald-600
                    hover:text-emerald-700
                    transition-colors
                  "
                >
                  <ArrowDownCircle className="w-4 h-4" />
                  Withdraw
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}