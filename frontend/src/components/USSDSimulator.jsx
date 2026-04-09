// src/components/USSDSimulator.js
import React, { useState } from 'react';

export default function USSDSimulator() {
  const [display, setDisplay] = useState(`Welcome to UWEZO\n1. Learn to invest\n2. Check reputation\n3. Invest now\n4. Make payment\n99. Exit`);

  const handleInput = (input) => {
    if (input === '3') {
      setDisplay('Choose amount:\n1. KES 100\n2. KES 500\n3. KES 1000');
    } else if (input === '4') {
      setDisplay('M-PESA STK Push sent...\nEnter PIN on your phone to confirm KES 500');
      setTimeout(() => setDisplay('✅ Payment Confirmed! Thank you.'), 2500);
    } else {
      setDisplay('Invalid option. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-black rounded-3xl p-4 shadow-2xl">
      <div className="bg-black text-emerald-400 h-[420px] rounded-3xl p-6 font-mono text-sm leading-relaxed overflow-hidden flex flex-col border border-emerald-900">
        <div className="text-center text-xs opacity-40 mb-6">*789#   UWEZO</div>
        <div className="flex-1 whitespace-pre-line">{display}</div>
        <input
          type="text"
          className="bg-transparent outline-none text-emerald-400 text-center text-xl mt-6"
          placeholder="Enter option"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleInput(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
      <p className="text-center text-xs text-slate-400 mt-4">Realistic USSD simulator for low-connectivity demo</p>
    </div>
  );
}