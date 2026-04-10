// src/components/PaymentButton.js
import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { paymentApi } from '../api';

export default function PaymentButton({ amount = 500, userId, phoneNumber, customerName }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await paymentApi.initiateSTKPush({
        phoneNumber,
        amount,
        userId,
        customerName,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      alert(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader className="animate-spin w-5 h-5" />
          Sending STK Push...
        </>
      ) : success ? (
        '✅ STK Push Sent – Check your phone'
      ) : (
        `Pay with M-PESA • KES ${amount}`
      )}
    </button>
  );
}