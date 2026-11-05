import React, { useState } from 'react';
import { FiTrendingUp, FiBarChart2, FiActivity, FiLayers } from 'react-icons/fi';

export default function FuturesView({ onOpenModal }) {
  // 1. Smartlists Futures Data
  const smartlists = [
    { symbol: 'JIOFIN', expiry: '29 DEC M FUT', spot: '229.40', premium: '+2.68', ltp: '232.00', chg: '+3.40%', isUp: true },
    { symbol: 'IDEA', expiry: '23 NOV M FUT', spot: '12.91', premium: '+0.13', ltp: '12.99', chg: '+3.42%', isUp: true },
    { symbol: 'RELIANCE', expiry: '29 DEC M FUT', spot: '1,315.70', premium: '+13.20', ltp: '1,328.60', chg: '+0.15%', isUp: true },
    { symbol: 'MAHABANK', expiry: '23 NOV M FUT', spot: '85.20', premium: '+0.77', ltp: '85.58', chg: '+6.89%', isUp: true },
    { symbol: 'ICICIBANK', expiry: '29 DEC M FUT', spot: '1,496.80', premium: '+12.80', ltp: '1,508.20', chg: '+5.11%', isUp: true },
  ];

  // 2. OI Scanners Data
  const oiScanners = [
    { symbol: 'PRESTIGE', expiry: '25 JAN M FUT', oiChange: '0.02', ltp: '1,615.00', chg: '+10.62%' },
    { symbol: 'NAM-INDIA', expiry: '29 DEC M FUT', oiChange: '3.06', ltp: '1,073.50', chg: '+6.85%' },
    { symbol: 'COROMANDEL', expiry: '29 DEC M FUT', oiChange: '0.02', ltp: '1,875.50', chg: '+1.38%' },
    { symbol: 'BANKINDIA', expiry: '25 JAN M FUT', oiChange: '3.38', ltp: '140.52', chg: '+2.76%' },
    { symbol: 'MANAPPURAM', expiry: '25 JAN M FUT', oiChange: '0.54', ltp: '331.70', chg: '+4.08%' },
  ];

  // 3. Futures Heatmap (Long / Short Buildup)
  const heatmap = [
    { symbol: 'BAJFINANCE', price: '1,068.80', chg: '+7.48%', type: 'L', label: 'Long' },
    { symbol: 'SHRIRAMFIN', price: '971.05', chg: '+6.83%', type: 'L', label: 'Long' },
    { symbol: 'BSE', price: '3,815.80', chg: '+5.89%', type: 'SC', label: 'S Cover' },
    { symbol: 'INDIGO', price: '5,448.20', chg: '+5.36%', type: 'SC', label: 'S Cover' },
    { symbol: 'TMPV', price: '295.10', chg: '+5.37%', type: 'SC', label: 'S Cover' },
    { symbol: 'MARUTI', price: '12,605.00', chg: '+5.10%', type: 'L', label: 'Long' },
    { symbol: 'ICICIBANK', price: '1,498.90', chg: '+5.13%', type: 'L', label: 'Long' },
    { symbol: 'M&M', price: '3,102.10', chg: '+4.68%', type: 'L', label: 'Long' },
    { symbol: 'BAJAJFINSV', price: '1,846.90', chg: '+5.02%', type: 'L', label: 'Long' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-cyan-400" />
            <span>Futures Dashboard & Scanners</span>
          </h1>
          <p className="text-xs text-gray-400">Smartlists, Open Interest (OI) scanners, and buildup heatmap</p>
        </div>
        <div className="text-right">
          <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-full font-mono">
            Expiry: 23 Nov 2026
          </span>
          <div className="text-[10px] text-gray-400 mt-1">05 Nov 2026, 02:34 PM</div>
        </div>
      </div>

      {/* Grid Layout 1: Smartlists & OI Scanners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Smartlists */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiTrendingUp className="text-emerald-400" />
            <span>Smartlists (Futures Spotlight)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {smartlists.map((s, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{s.symbol} <span className="text-[10px] text-gray-400 font-normal">({s.expiry})</span></div>
                  <div className="text-[10px] text-gray-400">Spot: ₹{s.spot} | Premium: {s.premium}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-mono text-white">₹{s.ltp}</div>
                    <div className="text-emerald-400 text-[10px]">{s.chg}</div>
                  </div>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold">BUY</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OI Scanners */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiBarChart2 className="text-purple-400" />
            <span>OI Scanners (Open Interest Builders)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {oiScanners.map((oi, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{oi.symbol} <span className="text-[10px] text-gray-400 font-normal">({oi.expiry})</span></div>
                  <div className="text-[10px] text-purple-400">OI Change: {oi.oiChange}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-mono text-white">₹{oi.ltp}</div>
                    <div className="text-emerald-400 text-[10px]">{oi.chg}</div>
                  </div>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold">BUY</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout 2: Futures Heatmap */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
            <FiLayers className="text-amber-400" />
            <span>Futures Heatmap (Long / Short Buildup)</span>
          </h2>
          <div className="flex space-x-3 text-[11px] text-gray-400">
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span> Long (L)</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span> Short Cover (SC)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {heatmap.map((h, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] flex flex-col justify-between space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-gray-100 text-sm">{h.symbol}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${h.type === 'L' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'}`}>
                  {h.label}
                </span>
              </div>
              <div className="flex justify-between items-end pt-1">
                <div>
                  <div className="text-sm font-mono font-bold text-white">₹{h.price}</div>
                  <div className="text-[10px] text-emerald-400">{h.chg}</div>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold text-[10px]">
                  BUY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}