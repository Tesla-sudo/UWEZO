// src/components/Simulator.js
import React, { useState } from 'react';

export default function Simulator() {
  const [balance, setBalance] = useState(5000);
  const [action, setAction] = useState('');

  const fakeTrade = (type) => {
    const change = type === 'buy' ? Math.floor(Math.random() * 800) + 200 : -Math.floor(Math.random() * 600);
    setBalance(prev => Math.max(0, prev + change));
    setAction(type === 'buy' ? 'Bought Safaricom shares (+KES 420)' : 'Sold shares (-KES 180)');
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-3xl p-10">
      <h2 className="text-3xl font-semibold mb-2">Risk-Free Trading Simulator</h2>
      <p className="text-slate-500 mb-10">Practice with fake money • No real loss</p>

      <div className="text-center mb-12">
        <div className="text-xs text-slate-400">YOUR BALANCE</div>
        <div className="text-6xl font-bold text-emerald-600">KES {balance.toLocaleString()}</div>
      </div>

      {action && <div className="text-center text-sm mb-8 bg-emerald-50 dark:bg-emerald-950 py-3 rounded-2xl">{action}</div>}

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => fakeTrade('buy')} className="h-14 bg-emerald-600 text-white rounded-3xl font-medium">Buy (Safaricom)</button>
        <button onClick={() => fakeTrade('sell')} className="h-14 border border-slate-300 dark:border-slate-600 rounded-3xl font-medium">Sell</button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-10">Market data updates every 5 seconds (mock)</p>
    </div>
  );
}