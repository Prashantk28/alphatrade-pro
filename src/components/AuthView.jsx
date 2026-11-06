import React, { useState } from 'react';
import { FiTrendingUp, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function AuthView({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // लॉगिन हँडलर कॉल करून युजरला डॅशबोर्डवर रिडायरेक्ट करतो
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className={`h-screen w-screen flex items-center justify-center p-4 transition-colors ${
      isDarkMode ? 'bg-[#0F141C] text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-2xl border shadow-2xl transition-colors ${
        isDarkMode ? 'bg-[#131B2A] border-[#1E2638]' : 'bg-white border-gray-200'
      }`}>
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600/20 rounded-xl text-purple-500 mb-3">
            <FiTrendingUp size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AlphaTrade Pro</h1>
          <p className="text-xs text-gray-400 mt-1">Next-Gen Stock & Options Trading Terminal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-400">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3 text-gray-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@alphatrade.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border outline-none transition ${
                  isDarkMode 
                    ? 'bg-[#0F141C] border-[#1E2638] text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-400">Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3 text-gray-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border outline-none transition ${
                  isDarkMode 
                    ? 'bg-[#0F141C] border-[#1E2638] text-white focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-600'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 active:scale-[0.98]"
          >
            <span>Enter Terminal</span>
            <FiArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Demo Mode: Click <span className="text-purple-400 font-semibold">Enter Terminal</span> to access live market dashboard.
        </div>
      </div>
    </div>
  );
}