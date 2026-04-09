// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('712345678');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-600 to-amber-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Section */}
        <div className="text-white space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center text-4xl">🌱</div>
            <h1 className="text-5xl font-bold tracking-tighter heading-font">UWEZO</h1>
          </div>
          <h2 className="text-6xl leading-none tracking-tighter font-semibold">
            Your ability<br />to invest starts<br />here.
          </h2>
          <p className="text-xl text-white/90 max-w-md">
            Learn investing. Build reputation. Access micro-investments safely.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-2xl">
          <LanguageSelector />

          <h3 className="text-3xl font-semibold mt-10 mb-2 text-slate-900 dark:text-white">Karibu UWEZO 👋</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Enter your phone number to begin</p>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">PHONE NUMBER</label>
              <div className="flex border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl overflow-hidden focus-within:border-emerald-500">
                <div className="bg-emerald-50 dark:bg-slate-800 px-6 flex items-center text-emerald-600 font-medium">+254</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-6 py-5 bg-transparent outline-none text-lg text-slate-900 dark:text-white"
                  placeholder="712 345 678"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98] transition-all"
            >
              {loading ? 'Connecting...' : 'Continue with SMS'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>

            <button
              onClick={() => navigate('/ussd')}
              className="w-full h-14 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl flex items-center justify-center gap-3 hover:border-emerald-400 transition-colors text-slate-700 dark:text-slate-300"
            >
              <Smartphone className="w-5 h-5" />
              Or use USSD *789# (no internet)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}