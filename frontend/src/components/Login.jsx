// ===============================
// src/components/Login.jsx
// Production-ready Login Page
// Features:
// - Phone number validation
// - Show/Hide PIN toggle
// - Remember Me option
// - Loading spinner
// - Error handling
// - Clean fintech-grade UI
// ===============================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { userApi } from "../api/userApi";
import LanguageSelector from "./LanguageSelector";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (phone.length !== 9) {
      setError("Enter a valid 9-digit phone number");
      return false;
    }

    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);
    setError("");

    const fullPhone = `254${phone}`;

    try {
      const res = await userApi.login({
        phoneNumber: fullPhone,
        pin: pin,
      });

      if (res.data.token) {
        if (rememberMe) {
          localStorage.setItem("uwezo_token", res.data.token);
        } else {
          sessionStorage.setItem("uwezo_token", res.data.token);
        }

        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Invalid phone number or PIN. Please check your credentials.";

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Brand Section */}
        <div className="text-white space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-4xl font-bold text-emerald-600">
              U
            </div>

            <h1 className="text-6xl font-semibold tracking-tighter">
              UWEZO
            </h1>
          </div>

          <h2 className="text-5xl leading-tight font-semibold tracking-tighter">
            Invest with confidence
            <br />
            Grow with knowledge
          </h2>

          <p className="text-xl text-slate-300 max-w-md">
            The safest way to learn, verify, and start investing.
          </p>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-sm text-slate-200">
            🔒 Your data is encrypted and protected
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-2xl">
          <LanguageSelector />

          <h3 className="text-3xl font-semibold mt-10 mb-2">
            Welcome back
          </h3>

          <p className="text-slate-500 mb-8">
            Sign in with your phone number and PIN
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">
                PHONE NUMBER
              </label>

              <div className="flex border border-slate-200 rounded-3xl overflow-hidden focus-within:border-emerald-600">
                <div className="bg-slate-100 px-6 flex items-center text-slate-600 font-medium">
                  +254
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9)
                    )
                  }
                  className="flex-1 px-6 py-4 bg-transparent outline-none text-lg"
                  placeholder="712 345 678"
                  maxLength={9}
                  required
                />
              </div>
            </div>

            {/* PIN */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2">
                4-DIGIT PIN
              </label>

              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) =>
                    setPin(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    )
                  }
                  maxLength={4}
                  className="w-full px-6 py-4 border border-slate-200 rounded-3xl outline-none focus:border-emerald-600"
                  placeholder="••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPin ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <span
                onClick={() => alert("PIN reset feature coming soon")}
                className="text-emerald-600 cursor-pointer hover:underline"
              >
                Forgot PIN?
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || phone.length < 9 || pin.length !== 4}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-3xl font-semibold text-lg transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin w-5 h-5" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-sm text-slate-500">
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className="text-emerald-600 cursor-pointer hover:underline font-medium ml-1"
              >
                Create one here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
