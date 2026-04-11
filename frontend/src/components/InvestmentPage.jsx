// src/components/InvestmentPage.jsx
import React, { useState } from 'react';
import PaymentButton from './PaymentButton';
import { userApi } from '../api/userApi';

const opportunities = [
  { id: 1, title: "Safaricom Sacco Fund", min: 100, returns: "8.2% p.a.", risk: "Low", partner: "Licensed Sacco" },
  { id: 2, title: "M-PESA Youth Bond", min: 200, returns: "18.4% p.a.", risk: "Medium", partner: "Licensed Bond Fund" },
  { id: 3, title: "Mama Mboga Farm Trust", min: 50, returns: "12.7% p.a.", risk: "Low", partner: "Licensed Agri-Fund" },
];

export default function InvestmentPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    userApi.getProfile().then(res => setUser(res.data.data));
  }, []);

  const openModal = (opp) => {
    setSelectedOpp(opp);
    setAmount(opp.min);
    setShowModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleInvestmentSuccess = (transaction) => {
    alert(`✅ Investment Confirmed!\n\nAmount: KES ${amount}\nOpportunity: ${selectedOpp.title}\nPlatform Fee: KES 10\nStatus: Linked to licensed partner`);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-5xl font-semibold tracking-tighter mb-2">Micro-Investments</h1>
      <p className="text-slate-500 mb-12">Safe • Transparent • Licensed partners</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunities.map(opp => (
          <div key={opp.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 transition-all">
            <div className="flex justify-between mb-6">
              <span className={`px-4 py-1 text-xs font-medium rounded-full ${opp.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {opp.risk} Risk
              </span>
              <span className="text-emerald-600">{opp.returns}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">{opp.title}</h3>
            <p className="text-sm text-slate-500 mb-8">Partner: {opp.partner}</p>

            <button
              onClick={() => openModal(opp)}
              className="w-full h-12 bg-emerald-600 text-white rounded-3xl font-medium"
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>

      {/* Investment Modal */}
      {showModal && selectedOpp && user && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-8">
            <h3 className="text-2xl font-semibold mb-6">Confirm Investment</h3>
            <p className="font-medium">{selectedOpp.title}</p>

            <div className="my-8">
              <label className="block text-sm text-slate-500 mb-2">Amount (KES)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-6 py-5 text-3xl font-semibold border rounded-3xl outline-none focus:border-emerald-600"
              />
            </div>

            <PaymentButton
              amount={Number(amount)}
              userId={user._id}
              phoneNumber={user.phoneNumber}
              customerName={user.name}
              onSuccess={handleInvestmentSuccess}
            />

            <button onClick={() => setShowModal(false)} className="w-full mt-4 h-12 border rounded-3xl">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}