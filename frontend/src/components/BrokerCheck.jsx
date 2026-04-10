// src/components/BrokerCheck.js
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Loader } from 'lucide-react';
import { brokerApi } from '../api';

export default function BrokerCheck() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyBroker = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await brokerApi.verify(query.trim());
      setResult(res.data.data || res.data);
    } catch (err) {
      setError(err.message || 'Unable to verify broker at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-7 h-7 text-emerald-600" />
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Broker Verification</h3>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter broker name or CMA license number"
          className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-600 transition-colors"
        />
        <button 
          onClick={verifyBroker}
          disabled={loading || !query.trim()}
          className="px-10 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-3xl font-medium transition-all"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Verify'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-2xl text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className={`mt-8 p-8 rounded-3xl ${result.isValid ? 'bg-emerald-50 dark:bg-emerald-950 border border-emerald-100' : 'bg-red-50 dark:bg-red-950 border border-red-100'}`}>
          <div className="flex items-start gap-4">
            {result.isValid ? (
              <ShieldCheck className="w-8 h-8 text-emerald-600 mt-1" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-600 mt-1" />
            )}
            <div>
              <div className="font-semibold text-lg text-slate-900 dark:text-white">{result.name || query}</div>
              <div className="text-sm mt-1 text-slate-600 dark:text-slate-400">
                {result.isValid ? 'Licensed by Capital Markets Authority (CMA)' : 'Not found or unlicensed broker'}
              </div>
              {result.regulatedBy && (
                <div className="text-xs mt-3 text-slate-500">Regulated by: {result.regulatedBy}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}