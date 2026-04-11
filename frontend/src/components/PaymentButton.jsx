// src/components/PaymentButton.jsx
import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { paymentApi } from '../api';

export default function PaymentButton({ amount, userId, phoneNumber, customerName, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await paymentApi.initiateSTKPush({
        phoneNumber,
        amount,
        userId,
        customerName,
      });

      if (res.data.success) {
        setSuccess(true);
        // Simulate successful callback after 4 seconds (in real app this comes from PayHero webhook)
        setTimeout(() => {
          if (onSuccess) onSuccess(res.data.data);
        }, 4000);
      }
    } catch (err) {
      alert(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl font-semibold flex items-center justify-center gap-3 transition-all"
    >
      {loading ? (
        <>
          <Loader className="animate-spin w-5 h-5" />
          Processing STK Push...
        </>
      ) : success ? (
        '✅ Investment Confirmed'
      ) : (
        `Pay KES ${amount} with M-PESA`
      )}
    </button>
  );
}