import React, { useState } from 'react';
import { FiTrendingUp, FiBarChart2, FiSliders } from 'react-icons/fi';

export default function AdvancedChart({ symbol = 'NIFTY 50', ltp = 24804.90 }) {
  const [timeframe, setTimeframe] = useState('5m');
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);

  // Simulated Candlestick Data
  const candles = [
    { time: '09:15', open: 24750, high: 24780, low: 24740, close: 24775, type: 'up' },
    { time: '09:30', open: 24775, high: 24810, low: 24760, close: 24790, type: 'up' },
    { time: '09:45', open: 24790, high: 24795, low: 24755, close: 24765, type: 'down' },
    { time: '10:00', open: 24765, high: 24820, low: 24760, close: 24815, type: 'up' },
    { time: '10:15', open: 24815, high: 24830, low: 24790, close: 24805, type: 'down' },
    { time: '10:30', open: 24805, high: 24850, low: 24800, close: 24840, type: 'up' },
  ];

  return (
    <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl flex flex-col h-full overflow-hidden text-white select-none">
      {/* Chart Control Toolbar */}
      <div className="p-3 border-b border-[#1E2638] flex justify-between items-center bg-[#0F141C]/60 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm text-purple-400 flex items-center space-x-1">
            <FiBarChart2 className="inline mr-1" /> {symbol} Advanced Chart
          </span>
          <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
            ₹{ltp.toFixed(2)}
          </span>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center space-x-1 bg-[#131B2A] p-1 rounded-lg border border-[#1E2638] text-xs">
          {['1m', '5m', '15m', '1H', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded transition ${
                timeframe === tf ? 'bg-purple-600 font-bold text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicator Toggles */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setShowRSI(!showRSI)}
            className={`px-2.5 py-1 rounded border transition flex items-center space-x-1 ${
              showRSI 
                ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-semibold' 
                : 'bg-[#0F141C] border-[#1E2638] text-gray-400'
            }`}
          >
            <FiSliders size={12} />
            <span>RSI (14)</span>
          </button>

          <button
            onClick={() => setShowMACD(!showMACD)}
            className={`px-2.5 py-1 rounded border transition flex items-center space-x-1 ${
              showMACD 
                ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold' 
                : 'bg-[#0F141C] border-[#1E2638] text-gray-400'
            }`}
          >
            <FiTrendingUp size={12} />
            <span>MACD</span>
          </button>
        </div>
      </div>

      {/* Main Candlestick Visualizer */}
      <div className="flex-1 p-4 flex flex-col justify-between relative bg-gradient-to-b from-[#131B2A] to-[#0F141C]">
        {/* Simulated Candlestick Grid */}
        <div className="flex-1 border-b border-[#1E2638]/50 flex items-end justify-around pb-4 px-6 relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
            <div className="border-b border-dashed border-white"></div>
            <div className="border-b border-dashed border-white"></div>
            <div className="border-b border-dashed border-white"></div>
          </div>

          {candles.map((c, i) => (
            <div key={i} className="flex flex-col items-center group relative cursor-pointer">
              <div className="absolute -top-10 hidden group-hover:flex bg-[#0F141C] border border-[#1E2638] px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap z-20">
                O:{c.open} H:{c.high} L:{c.low} C:{c.close}
              </div>

              <div 
                className={`w-[2px] ${c.type === 'up' ? 'bg-green-400' : 'bg-red-400'}`}
                style={{ height: '90px' }}
              ></div>

              <div
                className={`w-4 rounded-sm absolute bottom-4 ${
                  c.type === 'up' ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-red-500 shadow-lg shadow-red-500/20'
                }`}
                style={{ height: `${Math.abs(c.close - c.open) * 1.5 + 20}px` }}
              ></div>

              <span className="text-[10px] text-gray-500 mt-2 font-mono">{c.time}</span>
            </div>
          ))}
        </div>

        {/* RSI Sub-Chart */}
        {showRSI && (
          <div className="h-20 border-b border-[#1E2638]/50 p-2 flex flex-col justify-between bg-[#0F141C]/40 mt-2 rounded-lg">
            <div className="flex justify-between items-center text-[10px] text-purple-400 font-mono font-bold">
              <span>RSI (14): 64.20</span>
              <span className="text-gray-500">Overbought: 70 | Oversold: 30</span>
            </div>
            <div className="h-8 flex items-center">
              <svg className="w-full h-full stroke-purple-400 fill-none" viewBox="0 0 100 20">
                <path d="M 0 15 Q 20 5, 40 12 T 80 4 T 100 8" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}

        {/* MACD Sub-Chart */}
        {showMACD && (
          <div className="h-20 p-2 flex flex-col justify-between bg-[#0F141C]/40 mt-2 rounded-lg">
            <div className="flex justify-between items-center text-[10px] text-blue-400 font-mono font-bold">
              <span>MACD (12, 26, 9): +14.80 (Bullish Crossover)</span>
            </div>
            <div className="h-8 flex items-end justify-around space-x-1">
              {[4, 8, 12, 16, 10, 6, -4, -8, 8, 14].map((v, idx) => (
                <div
                  key={idx}
                  className={`w-2 rounded-t ${v >= 0 ? 'bg-green-400/80' : 'bg-red-400/80'}`}
                  style={{ height: `${Math.abs(v) * 2}px` }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}