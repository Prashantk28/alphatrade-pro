import React, { useState } from 'react';
import { FiActivity, FiTrendingUp, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

export default function OptionChainView({ onOpenModal }) {
  // 1. Market Indices Option Chain Snapshot
  const indices = [
    { name: 'SENSEX', price: '78,960.32', chg: '+1,658.92 (2.15%)' },
    { name: 'NIFTY', price: '24,436.75', chg: '+476.15 (1.99%)' },
    { name: 'BANKNIFTY', price: '57,346.90', chg: '+1,433.30 (2.56%)' },
    { name: 'MIDCPNIFTY', price: '13,960.60', chg: '+247.95 (1.81%)' },
    { name: 'FINNIFTY', price: '26,450.90', chg: '+870.30 (3.40%)' },
    { name: 'NIFTYNXT50', price: '71,823.30', chg: '+1,028.30 (1.45%)' },
    { name: 'BANKEX', price: '64,593.98', chg: '+1,721.47 (2.74%)' },
    { name: 'SENSEX50', price: '25,677.74', chg: '+504.96 (2.01%)' },
  ];

  // 2. Trending Options Data
  const trendingOptions = [
    { symbol: 'SENSEX 05 NOV W 78800 CE', tag: 'ITM -2', ltp: '257.90', chg: '+238.85 (1253.81%)', oi: '29.60 L' },
    { symbol: 'SENSEX 05 NOV W 78700 CE', tag: 'ITM -3', ltp: '331.60', chg: '+308.00 (1305.08%)', oi: '20.57 L' },
    { symbol: 'SENSEX 05 NOV W 79000 CE', tag: 'ATM', ltp: '144.00', chg: '+131.25 (1029.41%)', oi: '84.48 L' },
    { symbol: 'SENSEX 05 NOV W 78900 CE', tag: 'ITM -1', ltp: '193.95', chg: '+178.25 (1135.35%)', oi: '45.02 L' },
    { symbol: 'SENSEX 05 NOV W 78600 CE', tag: 'ITM -4', ltp: '413.95', chg: '+384.50 (1305.60%)', oi: '9.15 L' },
  ];

  // 3. Momentum Gainers Options
  const momentumGainers = [
    { symbol: 'SENSEX 05 NOV W 78700 PE', ltp: '61.20', chg: '-1,326.25 (95.59%)', vol: '14.61 Cr', iv: '29.43' },
    { symbol: 'SENSEX 05 NOV W 78900 PE', ltp: '122.00', chg: '-1,428.00 (92.13%)', vol: '8.47 Cr', iv: '27.83' },
    { symbol: 'SENSEX 05 NOV W 78800 PE', ltp: '86.65', chg: '-1,473.35 (94.45%)', vol: '13.10 Cr', iv: '28.51' },
    { symbol: 'SENSEX 05 NOV W 79100 PE', ltp: '232.40', chg: '-1,545.15 (86.93%)', vol: '1.53 Cr', iv: '28.32' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-purple-500" />
            <span>Option Chain & Derivative Markets</span>
          </h1>
          <p className="text-xs text-gray-400">Live option chain indices, trending contracts, and momentum option gainers</p>
        </div>
        <span className="text-xs bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
          Spot: 78,947.91
        </span>
      </div>

      {/* Indices Bar */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-3 shadow-lg">
        <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Indices Option Chain</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
          {indices.map((idx, i) => (
            <div key={i} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638]">
              <div className="font-bold text-gray-300">{idx.name}</div>
              <div className="text-white font-mono mt-0.5 text-[11px]">₹{idx.price}</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">{idx.chg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Options Section */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
          <FiTrendingUp className="text-emerald-400" />
          <span>Trending Options (Calls & Puts)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {trendingOptions.map((opt, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] flex flex-col justify-between space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-100">{opt.symbol}</div>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800/50 mt-1 inline-block">
                    {opt.tag}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-white">₹{opt.ltp}</div>
                  <div className="text-[10px] text-emerald-400">{opt.chg}</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#1E2638] text-[11px]">
                <span className="text-gray-400">OI: <strong className="text-gray-200">{opt.oi}</strong></span>
                <div className="space-x-1">
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold text-[10px]">BUY</button>
                  <button onClick={() => onOpenModal && onOpenModal('SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded font-bold text-[10px]">SELL</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Momentum Gainers Options */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
          <FiBarChart2 className="text-cyan-400" />
          <span>Momentum Gainers (Options Volume & IV)</span>
        </h2>
        <div className="space-y-2 text-xs">
          {momentumGainers.map((mg, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-lg border border-[#1E2638] flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-100">{mg.symbol}</span>
                <div className="text-[10px] text-gray-400 mt-0.5">Volume: {mg.vol} | IV: {mg.iv}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-mono text-white">₹{mg.ltp}</div>
                  <div className="text-red-400 text-[10px]">{mg.chg}</div>
                </div>
                <div className="space-x-1">
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold">BUY</button>
                  <button onClick={() => onOpenModal && onOpenModal('SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded font-bold text-[10px]">SELL</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}