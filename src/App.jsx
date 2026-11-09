import React, { useState } from 'react';
import Header from './components/Header';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('********');
  
  const [activeTab, setActiveTab] = useState('chart');
  const [isConnected, setIsConnected] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex items-center justify-center font-sans">
        <div className="bg-[#12141c] border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <span className="bg-purple-600 text-white font-bold px-3.5 py-1.5 rounded-lg text-sm tracking-wide shadow-md">
              AlphaTrade Pro
            </span>
            <p className="text-gray-400 text-xs mt-2">Login to your trading terminal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-600"
                required
              />
            </div>

            <div className="flex justify-end">
              <span className="text-xs text-purple-400 hover:underline cursor-pointer">Forgot Password?</span>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg text-sm shadow-lg transition-all"
            >
              Login to Terminal →
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-xs text-gray-400">Don't have an account? <span className="text-purple-400 cursor-pointer">Sign Up</span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isConnected={isConnected} />

      {/* ⚠️ Paper Trading Warning Banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2 flex items-center justify-center space-x-2 text-amber-400 text-xs font-medium">
        <span>⚠️</span>
        <span>Paper Trading Mode Active — Virtual Funds Only (No Real Money Involved)</span>
      </div>

      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'chart' && (
          <div className="flex flex-col items-center justify-center h-[72vh] bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-purple-400">📈 Advanced Chart & Live TBT</h2>
            <p className="text-gray-400 text-sm mb-4">NIFTY 50 & BankNifty Live Fluctuating Chart Mode</p>
          </div>
        )}

        {activeTab === 'optionChain' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">📊 Option Chain & Strike Prices</h2>
            <p className="text-gray-300 text-sm">All expiry option chains with Call (CE) & Put (PE) live data are loaded successfully.</p>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">💼 Portfolio & Virtual Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <span className="text-gray-400 text-xs">Available Funds</span>
                <h3 className="text-2xl font-bold text-green-400">₹4,81,019.62</h3>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <span className="text-gray-400 text-xs">Total P&L</span>
                <h3 className="text-2xl font-bold text-red-400">-₹2.25</h3>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}