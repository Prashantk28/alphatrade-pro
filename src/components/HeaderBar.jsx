import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

export default function HeaderBar() {
  return (
    <header className="h-12 bg-[#131B2A] border-b border-[#1E2638] flex items-center justify-between px-4 text-sm select-none">
      {/* Left: Indices Ticker */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 border-r border-[#1E2638] pr-4">
          <span className="font-semibold text-gray-300">NIFTY 50</span>
          <span className="text-emerald-400 font-mono font-medium">22,488.95</span>
          <span className="text-xs text-emerald-400 font-mono">+158.65 (+0.71%)</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-300">BANKNIFTY</span>
          <span className="text-red-400 font-mono font-medium">47,595.71</span>
          <span className="text-xs text-red-400 font-mono">-404.79 (-0.84%)</span>
        </div>
      </div>

      {/* Right: Search, Notifications & User */}
      <div className="flex items-center space-x-4">
        {/* Quick Search */}
        <div className="relative">
          <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search (eg. RELIANCE, INF...)"
            className="bg-[#0F141C] border border-[#1E2638] rounded-md pl-8 pr-3 py-1 text-xs text-gray-200 focus:outline-none focus:border-purple-500 w-56"
          />
        </div>

        {/* Live Badge */}
        <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>LIVE</span>
        </div>

        {/* Notification & User Icons */}
        <button className="p-1.5 hover:bg-[#1E2638] rounded text-gray-400 hover:text-gray-200">
          <FiBell size={16} />
        </button>
        <div className="w-7 h-7 bg-purple-600/30 border border-purple-500 text-purple-300 rounded-full flex items-center justify-center font-bold text-xs">
          PK
        </div>
      </div>
    </header>
  );
}