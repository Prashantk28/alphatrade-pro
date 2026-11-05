import React from 'react';
import { FiTrendingUp, FiSettings, FiMaximize2, FiCamera } from 'react-icons/fi';

export default function TradingViewChart({ stockSymbol, timeframe }) {
  const candles = [
    { time: '10:00', open: 24380, high: 24420, low: 24360, close: 24400, isGreen: true, h: 'h-16' },
    { time: '10:30', open: 24400, high: 24410, low: 24350, close: 24365, isGreen: false, h: 'h-12' },
    { time: '11:00', open: 24365, high: 24440, low: 24360, close: 24430, isGreen: true, h: 'h-24' },
    { time: '11:30', open: 24430, high: 24450, low: 24400, close: 24410, isGreen: false, h: 'h-16' },
    { time: '12:00', open: 24410, high: 24425, low: 24390, close: 24420, isGreen: true, h: 'h-14' },
    { time: '12:30', open: 24420, high: 24435, low: 24405, close: 24415, isGreen: false, h: 'h-10' },
    { time: '13:00', open: 24415, high: 24460, low: 24410, close: 24450, isGreen: true, h: 'h-28' },
    { time: '13:30', open: 24450, high: 24470, low: 24430, close: 24440, isGreen: false, h: 'h-16' },
    { time: '14:00', open: 24440, high: 24480, low: 24435, close: 24475, isGreen: true, h: 'h-32' },
    { time: '14:30', open: 24475, high: 24490, low: 24450, close: 24460, isGreen: false, h: 'h-14' },
    { time: '15:00', open: 24460, high: 24520, low: 24455, close: 24510, isGreen: true, h: 'h-36' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#121722] text-gray-300 font-sans select-none overflow-hidden relative border-r border-[#1E2638]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0F141C] border-b border-[#1E2638] text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-gray-100">{stockSymbol} 5 · 5 · NSE</span>
          <span className="text-emerald-400">O24,410.85 H24,420.95 L24,399.00 C24,401.10 -10.25 (-0.04%)</span>
          <span className="text-gray-400 text-[11px]">Volume SMA</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-400">
          <button className="hover:text-white flex items-center space-x-1 bg-[#1A2234] px-2 py-0.5 rounded border border-[#2A344A]">
            <FiTrendingUp size={13} className="text-purple-400" />
            <span>Indicators</span>
          </button>
          <button className="hover:text-white"><FiSettings size={14} /></button>
          <button className="hover:text-white"><FiCamera size={14} /></button>
          <button className="hover:text-white"><FiMaximize2 size={14} /></button>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Drawing Toolbar */}
        <div className="w-10 bg-[#0F141C] border-r border-[#1E2638] flex flex-col items-center py-3 space-y-4 text-gray-400 text-xs z-10">
          <span className="hover:text-white cursor-pointer">✏️</span>
          <span className="hover:text-white cursor-pointer">📈</span>
          <span className="hover:text-white cursor-pointer">📐</span>
          <span className="hover:text-white cursor-pointer">🖌️</span>
          <span className="hover:text-white cursor-pointer">📝</span>
          <span className="hover:text-white cursor-pointer">📏</span>
          <span className="hover:text-white cursor-pointer">🔍</span>
          <div className="w-6 h-[1px] bg-[#1E2638] my-1"></div>
          <span className="hover:text-white cursor-pointer text-red-400">🗑️</span>
        </div>

        {/* Candlestick Graph Area */}
        <div className="flex-1 relative flex flex-col justify-between p-4 bg-[#121722]">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-6 py-6 opacity-10">
            <div className="border-b border-gray-400 w-full"></div>
            <div className="border-b border-gray-400 w-full"></div>
            <div className="border-b border-gray-400 w-full"></div>
            <div className="border-b border-gray-400 w-full"></div>
          </div>

          {/* Live Price Line */}
          <div className="absolute top-[45%] left-0 right-16 border-b border-dashed border-red-500 z-20 flex items-center justify-end pr-1">
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono shadow">24,401.10 01:34</span>
          </div>

          {/* Candlesticks Render */}
          <div className="flex-1 flex items-end justify-around px-4 z-10 pb-2">
            {candles.map((c, i) => (
              <div key={i} className="flex flex-col items-center justify-end relative group cursor-pointer h-44">
                {/* Fixed Wick */}
                <div className={`w-[1.5px] ${c.isGreen ? 'bg-emerald-500' : 'bg-red-500'} absolute top-2 bottom-2 opacity-80`}></div>
                {/* Body */}
                <div className={`w-3.5 ${c.h} ${c.isGreen ? 'bg-emerald-500' : 'bg-red-500'} rounded-xs relative z-10 shadow-md group-hover:scale-110 transition-transform`}></div>
              </div>
            ))}
          </div>

          {/* Bottom Time Axis */}
          <div className="flex justify-between text-[11px] text-gray-500 border-t border-[#1E2638] pt-1 px-4 font-mono">
            {candles.map((c, i) => (
              <span key={i}>{c.time}</span>
            ))}
          </div>
        </div>

        {/* Right Price Scale Axis */}
        <div className="w-16 bg-[#0F141C] border-l border-[#1E2638] flex flex-col justify-between py-4 px-2 text-[10px] text-gray-400 font-mono text-right z-10">
          <span>24,520.00</span>
          <span>24,480.00</span>
          <span>24,440.00</span>
          <span className="text-red-400 font-bold bg-red-950/60 px-1 rounded">24,401.10</span>
          <span>24,360.00</span>
          <span>24,320.00</span>
          <span>24,280.00</span>
        </div>
      </div>

      {/* Bottom Chart Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0F141C] border-t border-[#1E2638] text-[11px] text-gray-400">
        <div className="flex space-x-3">
          {['5Y', '1Y', '6M', '3M', '1M', '5D', '1D'].map((tf) => (
            <button key={tf} className="hover:text-white px-1.5 py-0.5 rounded hover:bg-[#1E2638]">{tf}</button>
          ))}
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>11:38:25 (UTC+5:30)</span>
          <span className="text-gray-400">% log auto</span>
        </div>
      </div>
    </div>
  );
}