// src/components/Simulator.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function Simulator() {
  const [priceHistory, setPriceHistory] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      price: 142 + Math.random() * 18,
    }))
  );

  const [balance, setBalance] = useState(12500);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory(prev => {
        if (prev.length === 0) return prev;

        const lastPrice = prev[prev.length - 1].price;
        const newPrice = Math.max(
          130,
          Math.min(165, lastPrice + (Math.random() - 0.48) * 2.5)
        );

        return [
          ...prev.slice(1),
          {
            time: prev[prev.length - 1].time + 1,
            price: newPrice,
          },
        ];
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const executeTrade = (type) => {
    const tradeAmount = 800;
    const change = type === 'buy' ? tradeAmount : -tradeAmount * 0.96;
    setBalance(prev => Math.max(1000, prev + change));
  };

  const currentPrice =
    priceHistory.length > 0
      ? priceHistory[priceHistory.length - 1].price.toFixed(2)
      : '142.50';

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Trading Simulator
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Practice trading using virtual funds in a risk-free environment.
        </p>
      </div>

      <div
        className="
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-2xl
        shadow-sm
        p-6
      "
      >

        {/* Balance & Price */}
        <div
          className="
          flex flex-col md:flex-row
          justify-between
          items-start md:items-center
          mb-8
          gap-6
        "
        >
          <div>
            <div className="text-xs font-medium text-slate-500">
              YOUR VIRTUAL BALANCE
            </div>

            <div className="text-3xl font-semibold text-emerald-600 mt-2">
              KES {balance.toLocaleString()}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-medium text-slate-500">
              CURRENT PRICE (SAFARICOM)
            </div>

            <div className="text-2xl font-semibold text-slate-900 dark:text-white mt-2">
              KES {currentPrice}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div
          className="
          h-80
          bg-slate-50 dark:bg-slate-950
          border border-slate-200 dark:border-slate-800
          rounded-xl
          p-5
          mb-8
          relative
          overflow-hidden
        "
        >
          {priceHistory.length > 0 && (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 680 280"
              className="overflow-visible"
            >
              <defs>
                <linearGradient
                  id="priceGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid */}
              <g stroke="#e2e8f0" strokeWidth="1" opacity="0.5">
                {[140, 160, 180, 200, 220, 240, 260].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="680" y2={y} />
                ))}
              </g>

              {/* Line */}
              <polyline
                points={priceHistory
                  .map(
                    (point, i) =>
                      `${i * 34},${280 - (point.price - 130) * 8}`
                  )
                  .join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Area */}
              <polyline
                points={`${priceHistory
                  .map(
                    (point, i) =>
                      `${i * 34},${280 - (point.price - 130) * 8}`
                  )
                  .join(' ')} 680,280 0,280`}
                fill="url(#priceGradient)"
              />
            </svg>
          )}
        </div>

        {/* Trade Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <button
            onClick={() => executeTrade('buy')}
            className="
              h-11
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              rounded-xl
              text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition-all
              active:scale-[0.99]
            "
          >
            <TrendingUp className="w-4 h-4" />
            Buy Shares
          </button>

          <button
            onClick={() => executeTrade('sell')}
            className="
              h-11
              border border-red-500
              text-red-600
              hover:bg-red-50
              dark:hover:bg-red-950/30
              rounded-xl
              text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-2
              transition-all
              active:scale-[0.99]
            "
          >
            <TrendingDown className="w-4 h-4" />
            Sell Shares
          </button>

        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          This simulator is for educational purposes only. No real funds are used.
        </p>

      </div>
    </div>
  );
}