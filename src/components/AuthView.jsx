import React, { useState } from 'react';

export default function AuthView({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // लॉगिन किंवा रजिस्ट्रेशन यशस्वी झाल्यावर युझरला थेट मुख्य डॅशबोर्डवर पाठवणे
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#0F141C] text-gray-200 p-6 select-none h-full">
      <div className="w-full max-w-md bg-[#131B2A] border border-[#1E2638] rounded-2xl p-8 shadow-2xl">
        
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg shadow-purple-600/30">
            α
          </div>
          <h1 className="text-xl font-bold text-white">
            {authMode === 'login' && 'Login to AlphaTrade Pro'}
            {authMode === 'register' && 'Create Your Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {authMode === 'login' && 'Enter your credentials to access your trading dashboard'}
            {authMode === 'register' && 'Join AlphaTrade Pro for seamless paper trading simulation'}
            {authMode === 'forgot' && 'Enter your registered email to receive reset instructions'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prashant Kamble"
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {authMode !== 'forgot' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="text-xs text-purple-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-sm transition shadow-lg shadow-purple-600/20"
          >
            {authMode === 'login' && 'Sign In'}
            {authMode === 'register' && 'Register Account'}
            {authMode === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Switches */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {authMode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('register')} className="text-purple-400 font-medium hover:underline">
                Sign Up
              </button>
            </p>
          )}
          {authMode === 'register' && (
            <p>
              Already have an account?{' '}
              <button onClick={() => setAuthMode('login')} className="text-purple-400 font-medium hover:underline">
                Sign In
              </button>
            </p>
          )}
          {authMode === 'forgot' && (
            <p>
              Remembered your password?{' '}
              <button onClick={() => setAuthMode('login')} className="text-purple-400 font-medium hover:underline">
                Back to Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}