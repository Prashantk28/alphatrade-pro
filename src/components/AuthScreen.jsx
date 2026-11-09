import React, { useState } from 'react';
import { FiLock, FiMail, FiUser, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function AuthScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Prashant Kamble');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      setMessage('✅ Login Successful! Opening AlphaTrade Pro...');
      setTimeout(() => onLoginSuccess({ name, email }), 1000);
    } else if (authMode === 'register') {
      setMessage('🎉 Account Created Successfully! Welcome to AlphaTrade.');
      setTimeout(() => onLoginSuccess({ name, email }), 1000);
    } else if (authMode === 'forgot') {
      setMessage('📧 Password Reset Link sent to your registered email!');
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0F141C] text-white flex items-center justify-center select-none font-mono p-4">
      <div className="bg-[#131B2A] border border-[#1E2638] w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="font-extrabold text-lg bg-purple-600 text-white px-3 py-1 rounded-xl shadow-lg shadow-purple-600/30">
            AlphaTrade Pro
          </span>
          <p className="text-xs text-gray-400 mt-2">
            {authMode === 'login' && 'Login to your trading terminal'}
            {authMode === 'register' && 'Create your new trading account'}
            {authMode === 'forgot' && 'Reset your account password'}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs rounded-xl text-center font-bold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">FULL NAME</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prashant Kamble"
                  required
                  className="w-full bg-[#0F141C] border border-[#1E2638] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] text-gray-400 block mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-500" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">PASSWORD</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0F141C] border border-[#1E2638] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          )}

          {authMode === 'login' && (
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setAuthMode('forgot')}
                className="text-[11px] text-purple-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2"
          >
            <span>
              {authMode === 'login' && 'Login to Terminal'}
              {authMode === 'register' && 'Register Account'}
              {authMode === 'forgot' && 'Send Reset Link'}
            </span>
            <FiArrowRight size={14} />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="mt-6 text-center text-xs text-gray-400 border-t border-[#1E2638] pt-4">
          {authMode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('register')} className="text-purple-400 font-bold hover:underline">
                Sign Up
              </button>
            </p>
          )}
          {authMode === 'register' && (
            <p>
              Already have an account?{' '}
              <button onClick={() => setAuthMode('login')} className="text-purple-400 font-bold hover:underline">
                Login
              </button>
            </p>
          )}
          {authMode === 'forgot' && (
            <p>
              Remember your password?{' '}
              <button onClick={() => setAuthMode('login')} className="text-purple-400 font-bold hover:underline">
                Back to Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}