// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pin: '',
    confirmPin: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.pin !== formData.confirmPin) {
      setError("PINs do not match");
      return;
    }
    if (formData.pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await userApi.register({
        phoneNumber: `254${formData.phone}`,
        name: formData.name,
        pin: formData.pin,
        language: 'swahili'
      });

      if (res.data.success) {
        alert("Account created successfully! Please log in.");
        navigate('/'); // Redirect to Login as requested
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-2">Create Account</h2>
        <p className="text-slate-500 text-center mb-8">Join thousands of Kenyans growing their wealth</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">FULL NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 px-6 py-4 bg-transparent outline-none text-lg"
                placeholder="712 345 678"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">CREATE 4-DIGIT PIN</label>
            <input
              type="password"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              maxLength={4}
              className="w-full px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-600"
              placeholder="••••"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-2">CONFIRM PIN</label>
            <input
              type="password"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={handleChange}
              maxLength={4}
              className="w-full px-6 py-4 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-600"
              placeholder="••••"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-3xl font-semibold text-lg transition-all"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <span onClick={() => navigate('/')} className="text-emerald-600 cursor-pointer hover:underline">Log in</span>
          </p>
        </form>
      </div>
    </div>
  );
}