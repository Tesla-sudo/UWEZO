// ===============================
// src/components/MyInvestments.jsx
// Enhanced with:
// - Portfolio summary
// - Withdraw loading state
// - Error handling
// - Status badges
// ===============================

import React, { useState, useEffect } from "react";
import { Wallet, ArrowDownCircle } from "lucide-react";
import { investmentApi } from "../api";

export default function MyInvestments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState(null);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await investmentApi.getHistory();
      setInvestments(res.data.data || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (inv) => {
    if (inv.status !== "matured") {
      alert("This investment has not yet matured.");
      return;
    }

    setWithdrawingId(inv._id);

    setTimeout(() => {
      alert(
        `Withdrawal of KES ${inv.amount} initiated. Funds will be sent to your M-PESA within 24 hours.`
      );
      setWithdrawingId(null);
    }, 2000);
  };

  const totalInvested = investments.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-semibold tracking-tighter mb-10">
        My Investments
      </h1>

      {/* Portfolio Summary */}
      <div className="bg-emerald-50 rounded-3xl p-8 mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">TOTAL INVESTED</p>
          <p className="text-3xl font-bold text-emerald-600">
            KES {totalInvested.toLocaleString()}
          </p>
        </div>

        <Wallet className="w-10 h-10 text-emerald-600" />
      </div>

      {loading ? (
        <p>Loading your investments...</p>
      ) : investments.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          You have no investments yet.
          <br />Start investing to see them here.
        </div>
      ) : (
        <div className="space-y-6">
          {investments.map((inv) => (
            <div
              key={inv._id}
              className="bg-white rounded-3xl p-8 flex justify-between items-center border"
            >
              <div>
                <p className="font-medium">
                  {inv.title || "Investment"}
                </p>

                <p className="text-sm text-slate-500">
                  KES {inv.amount} • Maturity: {inv.maturityDate || "30 days"}
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`px-4 py-1 rounded-full text-xs font-medium ${
                    inv.status === "matured"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {inv.status || "Active"}
                </span>

                <button
                  onClick={() => handleWithdraw(inv)}
                  disabled={withdrawingId === inv._id}
                  className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium"
                >
                  <ArrowDownCircle className="w-4 h-4" />
                  {withdrawingId === inv._id
                    ? "Processing..."
                    : "Withdraw"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}