import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chart');

  // थेट खात्रीशीर लॉगआउट फंक्शन (क्लिक केल्यावर पेज रीलोड होऊन युजर बाहेर पडेल)
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to Logout from AlphaTrade Pro?");
    if (confirmLogout) {
      alert("Logged out successfully!");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative">
      
      {/* ⚠️ Paper Trading Warning Banner (सर्वात वर स्पष्ट पिवळी पट्टी) */}
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2.5 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      {/* Header */}
      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
        </div>

        <nav className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 Chart
          </button>
          <button
            onClick={() => setActiveTab('optionChain')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Option Chain
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Portfolio
          </button>
        </nav>

        {/* Upstox Style Profile & Direct Logout Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800 text-xs">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-gray-300 font-medium">Upstox Connected</span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide shadow-md flex items-center space-x-1.5 cursor-pointer transition-all"
            title="Click to Logout"
          >
            <span>PK</span>
            <span className="text-[10px] text-red-300">🚪 Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'chart' && (
          <div className="flex flex-col items-center justify-center h-[70vh] bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-purple-400">📈 Advanced Chart & Live TBT</h2>
            <p className="text-gray-400 text-sm">NIFTY 50 & BankNifty Live Fluctuating Chart Mode</p>
          </div>
        )}

        {activeTab === 'optionChain' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">📊 Option Chain</h2>
            <p className="text-gray-300 text-sm">Live Call (CE) & Put (PE) strike prices.</p>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">💼 Portfolio & Virtual Funds</h2>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 w-64">
              <span className="text-gray-400 text-xs">Available Virtual Cash</span>
              <h3 className="text-2xl font-bold text-green-400">₹10,00,000.00</h3>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}