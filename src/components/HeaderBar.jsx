import React from 'react';

export default function Header({ activeTab, setActiveTab, isConnected }) {
  return (
    <header className="bg-[#12141c] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo & Paper Trading Disclaimer Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm tracking-wide">
            AlphaTrade Pro
          </span>
        </div>

        {/* Paper Trading Disclaimer Tag */}
        <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
          ⚠️ Paper Trading (Virtual Funds Only)
        </span>
      </div>

      {/* Navigation Tabs (जसे जुन्या स्क्रीनशॉटमध्ये होते) */}
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab && setActiveTab('chart')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
            activeTab === 'chart'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span className="bg-purple-500 text-white p-0.5 rounded text-[10px]">📊</span>
          <span>Chart</span>
        </button>

        <button
          onClick={() => setActiveTab && setActiveTab('optionChain')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
            activeTab === 'optionChain'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Option Chain</span>
        </button>

        <button
          onClick={() => setActiveTab && setActiveTab('portfolio')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
            activeTab === 'portfolio'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Portfolio</span>
        </button>
      </nav>

      {/* Right Side Actions (Upstox Status, Basket, Quick Trade, PnL) */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800 text-xs">
          <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-gray-300 font-medium">
            {isConnected ? 'Upstox Connected' : 'Disconnected'}
          </span>
        </div>

        <button className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 transition-all">
          Basket
        </button>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md transition-all">
          + Quick Trade
        </button>

        <button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
          Share PnL
        </button>
      </div>
    </header>
  );
}