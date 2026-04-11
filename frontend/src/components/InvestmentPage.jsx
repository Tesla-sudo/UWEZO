// src/components/InvestmentPage.jsx
import React, { useState } from 'react';
import PaymentButton from './PaymentButton';

const opportunities = [
  { id: 1, title: "Safaricom Sacco Fund", min: 100, returns: "8.2% p.a.", risk: "Low", investors: 4821 },
  { id: 2, title: "M-PESA Youth Bond", min: 200, returns: "18.4% p.a.", risk: "Medium", investors: 1294 },
  { id: 3, title: "Mama Mboga Farm Trust", min: 50, returns: "12.7% p.a.", risk: "Low", investors: 892 },
];

export default function InvestmentPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [amount, setAmount] = useState('');

  const openInvestmentModal = (opp) => {
    setSelectedOpp(opp);
    setAmount(opp.min);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-semibold tracking-tighter">Investments</h1>
          <p className="text-slate-500 mt-2">Safe micro-investments for every Kenyan</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 h-12 bg-emerald-600 text-white rounded-3xl font-medium hover:bg-emerald-700 transition-all"
        >
          + Create New Investment
        </button>
      </div>

      {/* My Investments Section */}
      <div className="mb-16">
        <h3 className="font-semibold text-lg mb-6">My Active Investments</h3>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center text-slate-500">
          You have no active investments yet. Start your first one above!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunities.map((opp) => (
          <div 
            key={opp.id}
            className="group bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex justify-between mb-6">
              <span className={`px-4 py-1 text-xs font-medium rounded-full ${opp.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {opp.risk} Risk
              </span>
              <span className="text-emerald-600 font-medium">{opp.returns}</span>
            </div>

            <h3 className="text-2xl font-semibold mb-8 group-hover:text-emerald-600 transition-colors">{opp.title}</h3>

            <div className="text-sm mb-8">
              Min: <span className="font-medium">KES {opp.min}</span> • {opp.investors} investors
            </div>

            <button 
              onClick={() => openInvestmentModal(opp)}
              className="w-full h-12 bg-emerald-600 text-white rounded-3xl font-medium hover:bg-emerald-700 transition-all"
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>

      {/* Create Investment Modal */}
      {showModal && selectedOpp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-8">
            <h3 className="text-2xl font-semibold mb-6">New Investment</h3>
            
            <div className="mb-8">
              <p className="text-slate-500">Opportunity</p>
              <p className="font-medium text-lg">{selectedOpp.title}</p>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-slate-500 mb-2">Amount (KES)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl text-2xl font-medium outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 border border-slate-300 dark:border-slate-600 rounded-3xl font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Investment of KES ${amount} in ${selectedOpp.title} confirmed!`);
                  setShowModal(false);
                }}
                className="flex-1 h-12 bg-emerald-600 text-white rounded-3xl font-medium"
              >
                Confirm with M-PESA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}