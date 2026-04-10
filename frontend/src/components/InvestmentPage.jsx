// src/components/InvestmentPage.js
import React from 'react';
import PaymentButton from './PaymentButton';

const opportunities = [
  { 
    id: 1, 
    title: "Safaricom Sacco Fund", 
    min: 100, 
    returns: "8.2% p.a.", 
    risk: "Low" 
  },
  { 
    id: 2, 
    title: "M-PESA Youth Bond", 
    min: 200, 
    returns: "18.4% p.a.", 
    risk: "Medium" 
  },
  { 
    id: 3, 
    title: "Mama Mboga Farm Trust", 
    min: 50, 
    returns: "12.7% p.a.", 
    risk: "Low" 
  },
];

export default function InvestmentPage() {
  // In future, fetch real opportunities from backend
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-semibold tracking-tighter text-slate-900 dark:text-white">
          Micro-Investments
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
          Start with as little as KES 50. Grow your wealth safely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunities.map((opp) => (
          <div 
            key={opp.id} 
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-8">
              <span className={`px-4 py-1 text-xs font-medium rounded-full ${opp.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {opp.risk} Risk
              </span>
              <span className="text-emerald-600 font-medium">{opp.returns}</span>
            </div>

            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">{opp.title}</h3>

            <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Minimum investment: <span className="font-medium text-slate-900 dark:text-white">KES {opp.min}</span>
            </div>

            <PaymentButton 
              amount={opp.min} 
              userId="USER_ID_HERE"           // Will come from context later
              phoneNumber="2547XXXXXXXX"
              customerName="Current User"
            />
          </div>
        ))}
      </div>
    </div>
  );
}