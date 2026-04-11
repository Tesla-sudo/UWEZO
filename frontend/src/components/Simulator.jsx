// src/components/Simulator.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Simulator() {
  // Generate initial data safely inside useState initializer
  const [priceHistory, setPriceHistory] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      price: 142 + Math.random() * 18,
    }))
  );

  const [balance, setBalance] = useState(12500);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        if (prev.length === 0) return prev;

        const lastPrice = prev[prev.length - 1].price;
        const newPrice = Math.max(130, Math.min(165, lastPrice + (Math.random() - 0.48) * 2.5));

        return [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          price: newPrice
        }];
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const executeTrade = (type) => {
    const tradeAmount = 800;
    const change = type === 'buy' ? tradeAmount : -tradeAmount * 0.96;
    setBalance(prev => Math.max(1000, prev + change));
  };

  // Current price
  const currentPrice = priceHistory.length > 0 
    ? priceHistory[priceHistory.length - 1].price.toFixed(2) 
    : '142.50';

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tighter">Trading Simulator</h1>
        <p className="text-slate-500 mt-2">Practice trading with virtual money. Learn without risk.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
        {/* Balance & Current Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">YOUR VIRTUAL BALANCE</div>
            <div className="text-5xl font-bold text-emerald-600">KES {balance.toLocaleString()}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-500 dark:text-slate-400">CURRENT PRICE (SAFARICOM)</div>
            <div className="text-4xl font-semibold">KES {currentPrice}</div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="h-96 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-10 relative overflow-hidden">
          {priceHistory.length > 0 && (
            <svg width="100%" height="100%" viewBox="0 0 680 280" className="overflow-visible">
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <g stroke="#e2e8f0" strokeWidth="1" opacity="0.6">
                {[140, 160, 180, 200, 220, 240, 260].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="680" y2={y} />
                ))}
              </g>

              {/* Price Line */}
              <polyline
                points={priceHistory.map((point, i) => 
                  `${i * 34},${280 - (point.price - 130) * 8}`
                ).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradient fill under line */}
              <polyline
                points={`${priceHistory.map((point, i) => 
                  `${i * 34},${280 - (point.price - 130) * 8}`
                ).join(' ')} 680,280 0,280`}
                fill="url(#priceGradient)"
              />
            </svg>
          )}
        </div>

        {/* Trade Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => executeTrade('buy')}
            className="h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <TrendingUp className="w-6 h-6" />
            BUY SHARES
          </button>

          <button 
            onClick={() => executeTrade('sell')}
            className="h-16 border-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <TrendingDown className="w-6 h-6" />
            SELL SHARES
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">
          This is a simulation for learning purposes. No real money is used.
        </p>
      </div>
    </div>
  );
}