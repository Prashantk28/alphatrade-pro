import React, { useState } from 'react';
import { FiActivity, FiTrendingUp, FiPackage, FiBarChart2 } from 'react-icons/fi';

export default function CommoditiesView({ onOpenModal }) {
  // 1. Commodities Expiring Soon
  const expiringSoon = [
    { name: 'GOLDM FUT', mcx: 'MCX 05NOV26', ltp: '1,43,793.00', chg: '+1.30%', status: 'Expires today' },
    { name: 'CRUDEOILM FUT', mcx: 'MCX 19NOV26', ltp: '8,325.00', chg: '-0.42%', status: 'Expires on 19 Nov 26' },
    { name: 'CRUDEOIL FUT', mcx: 'MCX 19NOV26', ltp: '8,323.00', chg: '-0.49%', status: 'Expires on 19 Nov 26' },
    { name: 'NATGASMINI FUT', mcx: 'MCX 24NOV26', ltp: '278.30', chg: '-1.42%', status: 'Expires on 24 Nov 26' },
    { name: 'NATURALGAS FUT', mcx: 'MCX 24NOV26', ltp: '278.10', chg: '-1.49%', status: 'Expires on 24 Nov 26' },
  ];

  // 2. Commodity Options
  const commodityOptions = [
    { symbol: 'GOLDM 27 NOV M 145000 CE', ltp: '3,086.00', chg: '+860.50 (38.67%)', value: '54.21 Cr' },
    { symbol: 'GOLDM 27 NOV M 145000 PE', ltp: '2,933.00', chg: '-970.00 (24.85%)', value: '36.38 Cr' },
    { symbol: 'GOLD 27 NOV M 150000 CE', ltp: '1,310.00', chg: '+414.50 (46.29%)', value: '29.86 Cr' },
    { symbol: 'GOLD 27 NOV M 145000 CE', ltp: '3,080.00', chg: '+838.00 (37.38%)', value: '27.26 Cr' },
    { symbol: 'GOLDM 27 NOV M 150000 CE', ltp: '1,275.00', chg: '+406.50 (46.80%)', value: '27.00 Cr' },
  ];

  // 3. Commodity Futures
  const commodityFutures = [
    { symbol: 'GOLD 04 DEC M FUT', ltp: '1,45,118.00', chg: '+1,884.00 (1.32%)', value: '6,013.23 Cr' },
    { symbol: 'GOLDM 04 DEC M FUT', ltp: '1,45,131.00', chg: '+1,863.00 (1.30%)', value: '3,622.15 Cr' },
    { symbol: 'GOLDTEN 30 NOV M FUT', ltp: '1,45,600.00', chg: '+1,950.00 (1.36%)', value: '2,612.35 Cr' },
    { symbol: 'SILVERMIC 30 NOV M FUT', ltp: '1,90,750.00', chg: '+1,227.00 (0.65%)', value: '1,230.45 Cr' },
    { symbol: 'GOLDTEN 31 DEC M FUT', ltp: '1,47,092.00', chg: '+1,977.00 (1.36%)', value: '665.54 Cr' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-amber-400" />
            <span>Commodities & MCX Derivatives</span>
          </h1>
          <p className="text-xs text-gray-400">MCX commodity options, futures, and upcoming expiries</p>
        </div>
        <span className="text-xs bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-mono">
          MCX Live
        </span>
      </div>

      {/* Expiring Soon Section */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
          <FiPackage className="text-red-400" />
          <span>Commodities Expiring Soon</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {expiringSoon.map((exp, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] flex flex-col justify-between space-y-2">
              <div>
                <div className="font-bold text-gray-100">{exp.name}</div>
                <div className="text-[10px] text-gray-400">{exp.mcx}</div>
                <div className="text-[10px] text-amber-400 font-semibold mt-1">{exp.status}</div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-[#1E2638]">
                <div>
                  <div className="text-sm font-mono font-bold text-white">₹{exp.ltp}</div>
                  <div className={`text-[10px] ${exp.chg.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{exp.chg}</div>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-[#1E2638] hover:bg-[#2A344A] text-purple-300 px-2 py-0.5 rounded text-[10px] border border-purple-500/30">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Commodity Options & Futures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Commodity Options */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiTrendingUp className="text-emerald-400" />
            <span>Commodity Options (Movers)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {commodityOptions.map((opt, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{opt.symbol}</div>
                  <div className="text-[10px] text-gray-400">Traded Value: {opt.value}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-mono text-white">₹{opt.ltp}</div>
                    <div className={`text-[10px] ${opt.chg.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{opt.chg}</div>
                  </div>
                  <div className="space-x-1">
                    <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold">BUY</button>
                    <button onClick={() => onOpenModal && onOpenModal('SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold">SELL</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodity Futures */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiBarChart2 className="text-blue-400" />
            <span>Commodity Futures</span>
          </h2>
          <div className="space-y-2 text-xs">
            {commodityFutures.map((fut, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{fut.symbol}</div>
                  <div className="text-[10px] text-gray-400">Traded Value: {fut.value}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-mono text-white">₹{fut.ltp}</div>
                    <div className="text-emerald-400 text-[10px]">{fut.chg}</div>
                  </div>
                  <div className="space-x-1">
                    <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold">BUY</button>
                    <button onClick={() => onOpenModal && onOpenModal('SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold">SELL</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}