// src/components/PaymentButton.js
import React, { useState } from 'react';
import { Loader } from 'lucide-react';

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1800);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.985] transition-all disabled:opacity-70"
    >
      {loading ? (
        <> <Loader className="animate-spin w-5 h-5" /> Processing STK Push... </>
      ) : success ? (
        '✅ Payment Successful!'
      ) : (
        'Pay with M-PESA • KES 500'
      )}
    </button>
  );
}