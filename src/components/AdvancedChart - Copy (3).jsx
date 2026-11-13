import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMaximize2, FiSettings, FiCamera } from 'react-icons/fi';

export default function AdvancedChart({ symbol, ltp, onBuy, onSell }) {
  // Generate realistic TradingView style candlestick bars based on current LTP
  const baseVal = ltp || 100;
  const candles = [
    { o: baseVal * 0.992, h: baseVal * 1.005, l: baseVal * 0.990, c: baseVal * 1.002, isGreen: true },
    { o: baseVal * 1.002, h: baseVal * 1.008, l: baseVal * 0.998, c: baseVal * 0.999, isGreen: false },
    { o: baseVal * 0.999, h: baseVal * 1.003, l: baseVal * 0.995, c: baseVal * 0.997, isGreen: false },
    { o: baseVal * 0.997, h: baseVal * 1.004, l: baseVal * 0.996, c: baseVal * 1.003, isGreen: true },
    { o: baseVal * 1.003, h: baseVal * 1.010, l: baseVal * 1.001, c: baseVal * 1.008, isGreen: true },
    { o: baseVal * 1.008, h: baseVal * 1.012, l: baseVal * 1.004, c: baseVal * 1.005, isGreen: false },
    { o: baseVal * 1.005, h: baseVal * 1.009, l: baseVal * 1.002, c: baseVal * 1.007, isGreen: true },
    { o: baseVal * 1.007, h: baseVal * 1.015, l: baseVal * 1.005, c: baseVal * 1.012, isGreen: true },
    { o: baseVal * 1.012, h: baseVal * 1.014, l: baseVal * 1.008, c: baseVal * 1.010, isGreen: false },
    { o: baseVal * 1.010, h: baseVal * 1.016, l: baseVal * 1.009, c: baseVal * 1.015, isGreen: true },
    { o: baseVal * 1.015, h: baseVal * 1.018, l: baseVal * 1.011, c: baseVal * 1.013, isGreen: false },
    { o: baseVal * 1.013, h: baseVal * 1.020, l: baseVal * 1.012, c: baseVal, isGreen: (ltp >= baseVal) }
  ];

  return (
    <div className="flex-1 bg-[#12141c] border border-gray-800 rounded-xl flex flex-col overflow-hidden relative shadow-2xl font-sans">
      
      {/* Chart Top Header */}
      <div className="bg-[#0b0e14] px-4 py-2.5 border-b border-gray-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white text-sm">{symbol}</span>
          <span className="text-gray-400 font-mono">NSE • 15m • LTP: <strong className="text-amber-400">₹{ltp ? ltp.toFixed(2) : '0.00'}</strong></span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-950/60 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded text-[10px] font-bold">Tradingview Live Chart</span>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="flex-1 relative bg-[#0b0e14] flex flex-col justify-between p-6 overflow-hidden">
        
        {/* Floating Upstox Style Buy & Sell Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-[#181b25]/90 backdrop-blur border border-gray-800 p-1.5 rounded-lg shadow-xl">
          <button 
            onClick={onBuy}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1 cursor-pointer shadow transition-all"
          >
            <span>BUY</span> <span className="font-mono font-normal opacity-90">₹{ltp ? ltp.toFixed(2) : ''}</span>
          </button>
          <button 
            onClick={onSell}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1 cursor-pointer shadow transition-all"
          >
            <span>SELL</span> <span className="font-mono font-normal opacity-90">₹{ltp ? ltp.toFixed(2) : ''}</span>
          </button>
        </div>

        {/* Price Grid Lines on Right */}
        <div className="absolute right-4 top-16 bottom-12 flex flex-col justify-between text-[10px] text-gray-500 font-mono pointer-events-none text-right">
          <span>{(baseVal * 1.025).toFixed(2)}</span>
          <span>{(baseVal * 1.015).toFixed(2)}</span>
          <span className="text-amber-400 font-bold bg-gray-900 px-1 rounded">{(baseVal).toFixed(2)}</span>
          <span>{(baseVal * 0.985).toFixed(2)}</span>
          <span>{(baseVal * 0.975).toFixed(2)}</span>
        </div>

        {/* TradingView Style Candlestick Render Area */}
        <div className="flex-1 flex items-end justify-around px-2 space-x-4 my-auto">
          {candles.map((c, i) => {
            const heightPct = Math.min(85, Math.max(15, ((c.c - (baseVal * 0.97)) / (baseVal * 0.05)) * 100));
            return (
              <div key={i} className="flex flex-col items-center h-full justify-end relative group w-6">
                {/* Wick (High to Low line) */}
                <div className={`w-[1.5px] absolute ${c.isGreen ? 'bg-green-500' : 'bg-red-500'}`} style={{ height: '75%', top: '10%' }}></div>
                {/* Candlestick Body */}
                <div 
                  className={`w-4 z-10 rounded-[2px] transition-all duration-300 ${c.isGreen ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`} 
                  style={{ height: `${Math.max(12, heightPct)}%` }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Time Axis */}
        <div className="flex justify-between text-[10px] text-gray-500 font-mono border-t border-gray-900/80 pt-2">
          <span>11:15</span><span>11:30</span><span>11:45</span><span>12:00</span><span>12:15</span><span>12:30</span><span>12:45</span><span>LIVE</span>
        </div>

      </div>

      {/* Chart Bottom Toolbar */}
      <div className="bg-[#0b0e14] px-4 py-1.5 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center space-x-3">
          <span className="hover:text-white cursor-pointer font-semibold">15m</span>
          <span className="hover:text-white cursor-pointer">1h</span>
          <span className="hover:text-white cursor-pointer">D</span>
          <span className="text-purple-400 font-bold">Indicators (MA, RSI, MACD)</span>
        </div>
        <div className="flex items-center space-x-3 font-mono">
          <span className="text-green-400 font-bold">LTP Fluctuation Active</span>
          <span className="text-gray-500">TradingView Webhook TBT</span>
        </div>
      </div>

    </div>
  );
}