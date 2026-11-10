import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  const stocks = [
    { name: 'NIFTY 50', price: '₹24,893.03', change: '+1.26 (+0.01%)', isUp: true },
    { name: 'BANKNIFTY', price: '₹47,595.12', change: '-0.81 (-0.01%)', isUp: false },
    { name: 'RELIANCE', price: '₹2,973.1', change: '+0.02 (+0.00%)', isUp: true },
    { name: 'TCS', price: '₹3,942.49', change: '+0.41 (+0.00%)', isUp: true },
    { name: 'INFY', price: '₹1,624.84', change: '+0.03 (+0.00%)', isUp: true },
    { name: 'HDFCBANK', price: '₹1,466.97', change: '+0.24 (+0.00%)', isUp: true },
    { name: 'TATAMOTORS', price: '₹989.4', change: '+0.64 (+0.01%)', isUp: true },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to Logout from AlphaTrade Pro?")) {
      alert("Logged out successfully!");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative">
      
      {/* ⚠️ Paper Trading Warning Banner */}
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      {/* Header */}
      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
          <div className="hidden md:flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-400">Search eg: infy, bse</span>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
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

        {/* Right Side: Action Buttons & PK Profile Dropdown */}
        <div className="flex items-center space-x-2 relative">
          <button onClick={() => alert("Set Upstox Token clicked")} className="bg-amber-600/20 border border-amber-600/50 text-amber-300 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-600/30 transition-all">
            🔑 Set Upstox Token
          </button>
          <button onClick={() => alert("Basket clicked")} className="bg-gray-800 text-gray-200 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-700 transition-all">
            🛒 Basket
          </button>
          <button onClick={() => alert("Quick Trade clicked")} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all">
            ⚡ Quick Trade
          </button>

          {/* PK Profile Button & Upstox Style Dropdown */}
          <div className="relative ml-1">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-bold w-8 h-8 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer transition-all"
            >
              PK
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 font-sans text-xs">
                <div className="px-4 py-2.5 border-b border-gray-800">
                  <p className="text-gray-200 font-bold">My Account | User ID 122758</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">pkamble.kvic@hokvic.gov.in</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { setShowProfileMenu(false); alert("Activate F&O, MCX clicked"); }} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center space-x-2">
                    <span>📊 Activate F&O, MCX</span>
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); alert("Refer & Earn clicked"); }} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center space-x-2">
                    <span>🎁 Refer & Earn</span>
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); alert("My Reports clicked"); }} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center justify-between">
                    <span>📈 My Reports</span>
                    <span className="text-gray-500">&gt;</span>
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); alert("Settings clicked"); }} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center justify-between">
                    <span>⚙️ Settings</span>
                    <span className="text-gray-500">&gt;</span>
                  </button>
                  <button onClick={() => { setShowProfileMenu(false); alert("Help clicked"); }} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center justify-between">
                    <span>❓ Help</span>
                    <span className="text-gray-500">&gt;</span>
                  </button>
                </div>
                <div className="border-t border-gray-800 px-4 py-2 flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Plus Plan</span>
                  <span className="bg-purple-900/60 text-purple-300 text-[10px] px-2 py-0.5 rounded font-bold border border-purple-700/50">Enabled</span>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <button
                    onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold transition-all"
                  >
                    <span>🚪 Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout with Watchlist */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Watchlist Sidebar */}
        <aside className="w-72 bg-[#12141c] border-r border-gray-800 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Watchlist (1 / 50)</span>
            <span>NSE</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
            {stocks.map((stock, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedStock(stock.name)}
                className={`p-3 hover:bg-gray-800/60 cursor-pointer transition-all flex items-center justify-between ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-200">{stock.name}</p>
                  <p className="text-[10px] text-gray-500">NSE</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-200">{stock.price}</p>
                  <p className={`text-[10px] font-medium ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#0b0e14]">
          {activeTab === 'chart' && (
            <div className="flex flex-col h-full bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-bold text-white">{selectedStock}</h2>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded font-medium">LIVE TBT</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">1m</span>
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">5m</span>
                  <span className="bg-purple-600 text-white px-2.5 py-1 rounded font-medium">15m</span>
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">1h</span>
                </div>
              </div>

              {/* Chart View */}
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-lg p-6 bg-[#0e1117] min-h-[50vh]">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">📈</span>
                  <h3 className="text-lg font-bold text-purple-400">Advanced Candlestick Chart View</h3>
                  <p className="text-gray-400 text-xs mt-1">Real-time market feed connected for {selectedStock}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-3 text-purple-400">📊 Option Chain Analytics</h2>
              <p className="text-gray-300 text-xs mb-4">Live Call (CE) & Put (PE) strike prices.</p>
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
    </div>
  );
}