import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // सुरुवातीला लॉगिन स्क्रीन दाखवण्यासाठी false ठेवले आहे (तुम्हाला हवे असल्यास true करू शकता)
  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('********');
  
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
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

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg text-sm shadow-lg transition-all"
            >
              Login to Terminal →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative">
      
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

        {/* Upstox Style Profile & Logout Button at Top Right */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide shadow-md flex items-center space-x-1 hover:bg-purple-600 transition-all"
          >
            <span>PK</span>
            <span className="text-[10px]">▼</span>
          </button>

          {/* Dropdown Menu (Upstox Style) */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-800">
                <p className="text-xs text-gray-300 font-semibold">Prashant Kamble</p>
                <p className="text-[10px] text-gray-500">ID: PKVICKVC</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-medium transition-all"
              >
                <span>🚪 Logout</span>
              </button>
            </div>
          )}
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