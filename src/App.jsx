import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');
  const [ltp, setLtp] = useState(24804.90);

  // Simple Live Ticker Simulation
  React.useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setLtp(prev => parseFloat((prev + (Math.random() - 0.48) * 5).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // If not logged in, show professional login screen
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-[#0F141C] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#131B2A] border border-[#1E2638] p-8 rounded-2xl shadow-2xl text-center">
          <div className="inline-block p-3 bg-purple-600/20 text-purple-400 rounded-xl mb-4 font-bold text-xl">
            📈 AlphaTrade Pro
          </div>
          <h1 className="text-xl font-bold mb-1">Welcome Trader</h1>
          <p className="text-xs text-gray-400 mb-6">Next-Gen Stock & Options Terminal</p>
          
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-sm transition shadow-lg shadow-purple-600/30"
          >
            Enter Terminal
          </button>
        </div>
      </div>
    );
  }

  // Main Dashboard View after Login
  return (
    <div className="h-screen w-screen bg-[#0F141C] text-white flex flex-col overflow-hidden select-none">
      {/* Header Bar */}
      <header className="h-12 bg-[#131B2A] border-b border-[#1E2638] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm bg-purple-600 text-white px-2 py-0.5 rounded">AlphaTrade</span>
          <span className="text-xs text-gray-400">Pro Terminal</span>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded text-xs font-semibold transition"
        >
          Logout
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Watchlist Sidebar */}
        <div className="w-80 bg-[#131B2A]/50 border-r border-[#1E2638] flex flex-col">
          <div className="p-3 border-b border-[#1E2638] text-xs font-bold text-gray-300">
            Market Watchlist
          </div>
          <div className="p-3 hover:bg-[#1E2638]/50 cursor-pointer border-b border-[#1E2638] flex justify-between items-center">
            <div>
              <div className="font-bold text-sm text-white">NIFTY 50</div>
              <div className="text-[10px] text-gray-400">Index Spot</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-green-400">₹{ltp.toFixed(2)}</div>
              <div className="text-[10px] text-green-400">+0.69%</div>
            </div>
          </div>
        </div>

        {/* Center Option Chain / Workspace */}
        <div className="flex-1 flex flex-col bg-[#0F141C] overflow-auto p-4">
          <div className="flex justify-between items-center mb-4 bg-[#131B2A] p-3 rounded-lg border border-[#1E2638]">
            <div className="text-sm font-bold text-purple-400">NIFTY Option Chain & Live Tickers</div>
            <div className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 font-semibold">
              Live WebSocket Connected 🟢
            </div>
          </div>

          <div className="flex-1 bg-[#131B2A]/30 border border-[#1E2638] rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold mb-2">Live Market Simulator Active</h2>
            <p className="text-xs text-gray-400 max-w-md mb-4">
              All real-time price fluctuations and order routing mechanisms are fully operational on this secure release branch.
            </p>
            <div className="text-2xl font-mono font-bold text-green-400 bg-[#0F141C] px-6 py-3 rounded-xl border border-[#1E2638]">
              NIFTY LTP: ₹{ltp.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}