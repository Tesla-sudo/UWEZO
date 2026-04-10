// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api';
import LanguageSelector from './LanguageSelector';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await userApi.register({
        phoneNumber: `254${phone}`,
        name: name || 'Investor',
        language: 'swahili'
      });

      if (res.data.token) {
        localStorage.setItem('uwezo_token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side - Brand */}
        <div className="text-white space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-emerald-600">U</div>
            <h1 className="text-6xl font-semibold tracking-tighter">UWEZO</h1>
          </div>
          <h2 className="text-6xl leading-tight font-semibold tracking-tighter">
            Invest with confidence.<br />Grow with knowledge.
          </h2>
          <p className="text-xl text-slate-300 max-w-md">
            The safest way for Kenyans to learn, verify, and start investing — even on feature phones.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-2xl">
          <LanguageSelector />

          <h3 className="text-3xl font-semibold mt-10 mb-2">Welcome to UWEZO</h3>
          <p className="text-slate-500 mb-8">Enter your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-600"
                placeholder="Amina Chebet"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">PHONE NUMBER</label>
              <div className="flex border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden focus-within:border-emerald-600">
                <div className="bg-slate-100 dark:bg-slate-800 px-6 flex items-center text-slate-600 font-medium">+254</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-6 py-4 bg-transparent outline-none text-lg"
                  placeholder="712 345 678"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !phone}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-3xl font-semibold text-lg transition-all"
            >
              {loading ? 'Connecting...' : 'Continue to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}