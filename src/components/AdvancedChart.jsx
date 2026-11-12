import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMaximize2, FiSettings, FiCamera } from 'react-icons/fi';

export default function AdvancedChart({ symbol, ltp, onBuy, onSell }) {
  return (
    <div className="flex-1 bg-[#12141c] border border-gray-800 rounded-xl flex flex-col overflow-hidden relative shadow-2xl font-sans">
      
      {/* Chart Top Header */}
      <div className="bg-[#0b0e14] px-4 py-2.5 border-b border-gray-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white text-sm">{symbol}</span>
          <span className="text-gray-400 font-mono">NSE • 15m • LTP: <strong className="text-amber-400">₹{ltp ? ltp.toFixed(2) : '0.00'}</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="bg-purple-950/60 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded text-[10px] font-bold">Tradingview Platform</span>
        </div>
      </div>

      {/* Chart Canvas Area with Upstox Style Floating Buy/Sell Buttons */}
      <div className="flex-1 relative bg-[#0b0e14] flex flex-col items-center justify-center p-4">
        
        {/* **UPSTOX STYLE FLOATING BUY & SELL BUTTONS ON CHART** */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-[#181b25]/90 backdrop-blur border border-gray-800 p-1.5 rounded-lg shadow-xl">
          <button 
            onClick={onSell}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1 cursor-pointer shadow transition-all"
          >
            <span>SELL</span> <span className="font-mono font-normal opacity-90">₹{ltp ? ltp.toFixed(2) : ''}</span>
          </button>
          <button 
            onClick={onBuy}
            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1 cursor-pointer shadow transition-all"
          >
            <span>BUY</span> <span className="font-mono font-normal opacity-90">₹{ltp ? ltp.toFixed(2) : ''}</span>
          </button>
        </div>

        {/* Mock Candlestick Chart Grid representation */}
        <div className="w-full h-full flex flex-col justify-between opacity-80 pointer-events-none select-none p-6">
          <div className="flex justify-between text-[10px] text-gray-600 font-mono border-b border-gray-900 pb-1">
            <span>404.00</span><span>396.00</span><span>388.00</span><span>380.00</span><span>372.00</span>
          </div>

          <div className="flex-1 flex items-end justify-around px-4 space-x-3 py-10">
            {[45, 60, 30, 75, 50, 85, 65, 90, 70, 95, 80, 110, 85, 125, 100, 140, 115, 160].map((h, i) => (
              <div key={i} className="flex flex-col items-center h-full justify-end">
                <div className={`w-1.5 ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} rounded-sm`} style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-gray-600 font-mono border-t border-gray-900 pt-1">
            <span>12:00</span><span>08</span><span>10</span><span>11</span><span>12</span><span>12:00</span>
          </div>
        </div>

      </div>

      {/* Chart Bottom Toolbar */}
      <div className="bg-[#0b0e14] px-4 py-1.5 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center space-x-3">
          <span className="hover:text-white cursor-pointer">5Y</span>
          <span className="hover:text-white cursor-pointer">1Y</span>
          <span className="hover:text-white cursor-pointer">6M</span>
          <span className="hover:text-white cursor-pointer">1M</span>
          <span className="hover:text-white cursor-pointer">1D</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-green-400 font-mono font-bold">Volume: 4.685K</span>
          <span className="text-gray-500">Powered by TBT</span>
        </div>
      </div>

    </div>
  );
}