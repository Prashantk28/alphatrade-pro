import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderBar from './components/HeaderBar';
import WatchlistPanel from './components/WatchlistPanel';
import PositionsDock from './components/PositionsDock';
import { FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

export default function App() {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [chartType, setChartType] = useState('candlestick');
  const [showMA, setShowMA] = useState(true);

  return (
    <div className="flex h-screen bg-[#0F141C] text-gray-200 overflow-hidden font-sans select-none">
      {/* 1. Left Icon Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 2. Top Header & Indices Bar */}
        <HeaderBar />

        {/* Workspace: Watchlist + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* 3. Left Watchlist Panel */}
          <div className="w-80 border-r border-[#1E2638] bg-[#131B2A]">
            <WatchlistPanel onSelectStock={setSelectedStock} selectedStock={selectedStock} />
          </div>

          {/* Center Chart & Bottom Dock Area */}
          <div className="flex flex-col flex-1 bg-[#0F141C]">
            {/* Chart Header Controls */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#131B2A]/40 border-b border-[#1E2638] text-xs">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-sm text-gray-100">{selectedStock}</span>
                <span className="text-emerald-400 font-mono">₹2,971.74 <span className="text-xs">+15.54 (+0.53%)</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setChartType('candlestick')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${chartType === 'candlestick' ? 'bg-purple-600 text-white' : 'bg-[#1E2638] text-gray-400 hover:text-gray-200'}`}
                >
                  Candlestick
                </button>
                <button 
                  onClick={() => setChartType('line')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${chartType === 'line' ? 'bg-purple-600 text-white' : 'bg-[#1E2638] text-gray-400 hover:text-gray-200'}`}
                >
                  Line Chart
                </button>
                <label className="flex items-center space-x-1.5 cursor-pointer text-gray-300 pl-2 border-l border-[#1E2638]">
                  <input 
                    type="checkbox" 
                    checked={showMA} 
                    onChange={() => setShowMA(!showMA)}
                    className="rounded bg-[#0F141C] border-[#1E2638] text-purple-600 focus:ring-0"
                  />
                  <span>MA (10)</span>
                </label>
              </div>
            </div>

            {/* Main Chart Canvas Area */}
            <div className="flex-1 relative flex flex-col items-center justify-center p-4 bg-[#0F141C]">
              <div className="absolute inset-4 border border-dashed border-[#1E2638]/60 rounded-lg flex flex-col items-center justify-center text-center p-6">
                <FiBarChart2 className="text-purple-500 mb-2 animate-bounce" size={36} />
                <h3 className="text-sm font-semibold text-gray-300">Advanced TradingView Chart for {selectedStock}</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">
                  Displaying live market candles, volume indicators, and moving average trends for <span className="text-purple-400">{selectedStock}</span>.
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-xs font-semibold shadow">
                    BUY {selectedStock}
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded text-xs font-semibold shadow">
                    SELL {selectedStock}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Bottom Positions & Orders Dock */}
            <div className="h-44 border-t border-[#1E2638] bg-[#131B2A]">
              <PositionsDock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}