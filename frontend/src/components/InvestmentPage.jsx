// src/components/InvestmentPage.jsx
import React, { useState } from 'react';
import PaymentButton from './PaymentButton';
import { userApi } from '../api/userApi';
import { TrendingUp, Shield, Banknote } from 'lucide-react';

const opportunities = [
  { id: 1, title: "Safaricom Sacco Fund", min: 100, returns: "8.2% p.a.", risk: "Low", partner: "Dyer & Blair" },
  { id: 2, title: "M-PESA Youth Bond", min: 200, returns: "18.4% p.a.", risk: "Medium", partner: "SBG Securities" },
  { id: 3, title: "Mama Mboga Farm Trust", min: 50, returns: "12.7% p.a.", risk: "Low", partner: "Kestrel Capital" },
];

export default function InvestmentPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    userApi.getProfile().then(res => setUser(res.data.data));
  }, []);

  const openModal = (opp) => {
    setSelectedOpp(opp);
    setAmount(opp.min);
    setShowModal(true);
  };

  const handleSuccess = () => {
    alert(
      `Order placed successfully.\nAmount: KES ${amount}\nType: ${orderType.toUpperCase()} Order\nLinked to licensed broker: ${selectedOpp.partner}`
    );
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Invest in the NSE Ecosystem
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Choose licensed partners. Start investing from as little as KES 50.
        </p>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {opportunities.map(opp => (
          <div
            key={opp.id}
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-2xl
              p-6
              shadow-sm
              transition-all
              hover:border-emerald-400
              hover:shadow-md
            "
          >

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {opp.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Via {opp.partner}
            </p>

            {/* Metrics */}
            <div className="mt-5 space-y-3 text-sm">

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <Banknote className="w-3.5 h-3.5" />
                  Minimum
                </span>

                <span className="font-medium text-slate-900 dark:text-white">
                  KES {opp.min}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Returns
                </span>

                <span className="font-medium text-emerald-600">
                  {opp.returns}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <Shield className="w-3.5 h-3.5" />
                  Risk
                </span>

                <span className={`
                  text-xs font-medium px-2 py-1 rounded-lg
                  ${opp.risk === 'Low'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'}
                `}>
                  {opp.risk}
                </span>
              </div>

            </div>

            {/* Action */}
            <button
              onClick={() => openModal(opp)}
              className="
                w-full mt-6 h-10
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                rounded-xl
                text-sm font-medium
                transition-colors
              "
            >
              Invest
            </button>

          </div>
        ))}

      </div>

      {/* Order Modal */}
      {showModal && selectedOpp && user && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            rounded-2xl
            w-full max-w-md
            p-6
            shadow-xl
          ">

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Place Order — {selectedOpp.title}
            </h3>

            {/* Order Type */}
            <div className="mb-6">

              <label className="block text-xs font-medium text-slate-500 mb-2">
                ORDER TYPE
              </label>

              <div className="flex gap-2">

                <button
                  onClick={() => setOrderType('market')}
                  className={`
                    flex-1 h-10 rounded-xl text-sm font-medium
                    transition-all
                    ${orderType === 'market'
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 dark:border-slate-700'}
                  `}
                >
                  Market
                </button>

                <button
                  onClick={() => setOrderType('limit')}
                  className={`
                    flex-1 h-10 rounded-xl text-sm font-medium
                    transition-all
                    ${orderType === 'limit'
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 dark:border-slate-700'}
                  `}
                >
                  Limit
                </button>

              </div>

            </div>

            {/* Amount */}
            <div className="mb-6">

              <label className="block text-xs font-medium text-slate-500 mb-2">
                INVESTMENT AMOUNT (KES)
              </label>

              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="
                  w-full
                  px-4 py-3
                  text-xl font-semibold
                  border border-slate-300 dark:border-slate-700
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-emerald-500
                "
              />

            </div>

            {/* Payment */}
            <PaymentButton
              amount={Number(amount)}
              userId={user._id}
              phoneNumber={user.phoneNumber}
              customerName={user.name}
              onSuccess={handleSuccess}
            />

            {/* Cancel */}
            <button
              onClick={() => setShowModal(false)}
              className="
                w-full mt-3 h-10
                border border-slate-300 dark:border-slate-700
                rounded-xl
                text-sm font-medium
                hover:bg-slate-50 dark:hover:bg-slate-800
                transition-colors
              "
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}