import React from 'react';

export default function Header({ activeTab, setActiveTab, isConnected }) {
  return (
    <header className="bg-[#12141c] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo & Paper Trading Disclaimer Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-600 text-white font-bold px-2.5 py-1 rounded-lg text-sm tracking-wide">
            AlphaTrade
          </span>
          <span className="text-gray-300 font-semibold text-sm">Pro</span>
        </div>

        {/* Paper Trading Disclaimer Tag */}
        <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
          ⚠️ Paper Trading (Virtual Funds Only)
        </span>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => setActiveTab && setActiveTab('chart')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'chart'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          📈 Advanced Chart
        </button>

        <button
          onClick={() => setActiveTab && setActiveTab('optionChain')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'optionChain'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          📊 Option Chain
        </button>

        <button
          onClick={() => setActiveTab && setActiveTab('portfolio')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'portfolio'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          💼 Portfolio & Funds
        </button>
      </nav>

      {/* Status & Actions */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 bg-gray-900 px-3 py-1 rounded-full border border-gray-800 text-xs">
          <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="text-gray-300 font-medium">
            {isConnected ? 'Upstox Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </header>
  );
}