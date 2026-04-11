// src/components/PaymentButton.jsx
import React, { useState } from 'react';
import { Loader, CheckCircle } from 'lucide-react';
import { paymentApi } from '../api';

export default function PaymentButton({
  amount,
  userId,
  phoneNumber,
  customerName,
  onSuccess
}) {
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

        // Simulate successful callback after 4 seconds
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
      disabled={loading || success}
      className="
        w-full
        h-11
        rounded-xl
        font-medium
        text-sm
        flex
        items-center
        justify-center
        gap-2
        transition-all

        bg-emerald-600
        hover:bg-emerald-700
        text-white

        disabled:opacity-60
        disabled:cursor-not-allowed

        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500
      "
    >

      {loading ? (
        <>
          <Loader className="animate-spin w-4 h-4" />
          Processing payment...
        </>
      ) : success ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Payment confirmed
        </>
      ) : (
        `Pay KES ${amount} with M-PESA`
      )}

    </button>
  );
}