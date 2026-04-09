// src/components/InvestmentPage.js
import React from 'react';
import PaymentButton from './PaymentButton';

const opportunities = [
  { id: 1, title: "Safaricom Sacco Fund", min: "KES 100", returns: "8.2% p.a.", risk: "Low", investors: "4,821" },
  { id: 2, title: "M-PESA Youth Bond", min: "KES 200", returns: "18.4% p.a.", risk: "Medium", investors: "1,294" },
  { id: 3, title: "Mama Mboga Farm Trust", min: "KES 50", returns: "12.7% p.a.", risk: "Low", investors: "892" },
];

export default function InvestmentPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold tracking-tighter heading-font">Micro-investments for everyone</h1>
        <p className="text-slate-500 mt-2">Start with as little as KES 50 • Real growth • Safe & transparent</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 hover:-translate-y-1 transition-all shadow-sm border border-emerald-100">
            <div className="flex justify-between items-start">
              <span className="px-4 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-3xl">{opp.risk} risk</span>
              <span className="text-xs text-slate-400">{opp.returns}</span>
            </div>
            
            <h3 className="text-2xl font-semibold mt-8 mb-1">{opp.title}</h3>
            
            <div className="flex justify-between text-sm mt-10">
              <div>Min. {opp.min}</div>
              <div className="text-emerald-600">{opp.investors} investors</div>
            </div>

            <div className="mt-8">
              <PaymentButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}