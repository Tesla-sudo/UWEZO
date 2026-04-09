// src/components/BrokerCheck.js
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function BrokerCheck() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const verifyBroker = () => {
    if (!query) return;
    
    setTimeout(() => {
      const isValid = query.toLowerCase().includes('capital') || Math.random() > 0.3;
      setResult({
        valid: isValid,
        name: query || "ABC Capital Ltd",
        status: isValid ? "Licensed by CMA Kenya" : "Not found / Suspicious",
        score: isValid ? "4.9/5" : "N/A"
      });
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <ShieldCheck className="text-emerald-500" /> Broker Verification
      </h3>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Broker name or license number"
          className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-500"
        />
        <button 
          onClick={verifyBroker}
          className="px-8 bg-emerald-600 text-white rounded-3xl font-medium"
        >
          Verify
        </button>
      </div>

      {result && (
        <div className={`mt-8 p-6 rounded-3xl ${result.valid ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <div className="flex items-center gap-3">
            {result.valid ? <ShieldCheck className="text-emerald-500" /> : <AlertTriangle className="text-red-500" />}
            <div>
              <div className="font-semibold">{result.name}</div>
              <div className="text-sm">{result.status}</div>
              {result.score && <div className="text-xs mt-1">Trust score: {result.score}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}