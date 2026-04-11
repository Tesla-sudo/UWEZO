// src/components/MyInvestments.jsx
import React, { useState, useEffect } from 'react';
import { investmentApi } from '../api';

export default function MyInvestments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    investmentApi.getHistory().then(res => {
      setInvestments(res.data.data || []);
      setLoading(false);
    });
  }, []);

  const handleWithdraw = (inv) => {
    if (inv.status === 'matured') {
      alert(`Withdrawal of KES ${inv.amount} initiated. Funds will be sent to your M-PESA within 24 hours.`);
      // In real backend this would call a withdrawal endpoint
    } else {
      alert('This investment has not yet matured.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-semibold tracking-tighter mb-10">My Investments</h1>

      {loading ? (
        <p>Loading your investments...</p>
      ) : investments.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          You have no investments yet.<br />Start investing to see them here.
        </div>
      ) : (
        <div className="space-y-6">
          {investments.map(inv => (
            <div key={inv._id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 flex justify-between items-center border border-slate-100">
              <div>
                <p className="font-medium">{inv.title || 'Investment'}</p>
                <p className="text-sm text-slate-500">KES {inv.amount} • Maturity: {inv.maturityDate || '30 days'}</p>
              </div>
              <div className="text-right">
                <span className={`px-4 py-1 rounded-full text-xs ${inv.status === 'matured' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {inv.status || 'Active'}
                </span>
                <button
                  onClick={() => handleWithdraw(inv)}
                  className="mt-4 block text-emerald-600 text-sm font-medium"
                >
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