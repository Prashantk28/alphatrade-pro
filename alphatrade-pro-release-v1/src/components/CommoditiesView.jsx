import React from 'react';

export default function CommoditiesView({ onOpenModal }) {
  // Movers & Shakers / Commodity Options Data
  const commodityOptions = [
    { symbol: 'GOLDM 27 NOV 145000 CE', ltp: '2,952.50', chg: '+32.67%', value: '59.01 Cr', isBuy: true },
    { symbol: 'GOLDM 27 NOV 145000 PE', ltp: '2,990.00', chg: '-23.39%', value: '41.49 Cr', isBuy: false },
    { symbol: 'GOLD 27 NOV 150000 CE', ltp: '1,242.50', chg: '+38.75%', value: '31.58 Cr', isBuy: true },
    { symbol: 'GOLDM 27 NOV 150000 CE', ltp: '1,218.50', chg: '+40.30%', value: '29.63 Cr', isBuy: true },
    { symbol: 'GOLD 27 NOV 145000 CE', ltp: '2,939.00', chg: '+31.09%', value: '27.85 Cr', isBuy: true },
  ];

  // Commodities Expiring Soon Data
  const expiringSoon = [
    { name: 'GOLDM FUT', expiry: 'MCX 05NOV26', price: '1,43,645.00', chg: '+1.20%', status: 'Expires today' },
    { name: 'CRUDEOILM FUT', expiry: 'MCX 19NOV26', price: '8,376.00', chg: '+0.19%', status: 'Expires on 19 Nov 26' },
    { name: 'CRUDEOIL FUT', expiry: 'MCX 19NOV26', price: '8,378.00', chg: '+0.17%', status: 'Expires on 19 Nov 26' },
    { name: 'NATGASMINI FUT', expiry: 'MCX 24NOV26', price: '279.20', chg: '-1.10%', status: 'Expires on 24 Nov 26' },
    { name: 'NATURALGAS FUT', expiry: 'MCX 24NOV26', price: '279.00', chg: '-1.17%', status: 'Expires on 24 Nov 26' },
  ];

  // Commodity Futures Data
  const commodityFutures = [
    { symbol: 'GOLD 04 DEC FUT', ltp: '1,44,890.00', chg: '+1.16%', value: '6,321.02 Cr' },
    { symbol: 'GOLDM 04 DEC FUT', ltp: '1,44,918.00', chg: '+1.15%', value: '3,834.85 Cr' },
    { symbol: 'GOLDTEN 30 NOV FUT', ltp: '1,45,344.00', chg: '+1.18%', value: '2,723.77 Cr' },
    { symbol: 'SILVERMIC 30 NOV FUT', ltp: '1,90,478.00', chg: '+0.50%', value: '1,321.17 Cr' },
    { symbol: 'GOLDTEN 31 DEC FUT', ltp: '1,46,876.00', chg: '+1.21%', value: '711.83 Cr' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#0F141C] text-gray-200 overflow-y-auto p-6 space-y-6 select-none">
      
      {/* Top Header Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            📦 MCX Commodities & Derivatives
          </h1>
          <p className="text-xs text-gray-400">Track gold, silver, crude oil options, futures, and expiries in real-time</p>
        </div>
      </div>

      {/* Section 1: Commodities Expiring Soon */}
      <div>
        <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Commodities Expiring Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {expiringSoon.map((item, index) => (
            <div key={index} className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition">
              <div>
                <span className="text-xs text-purple-400 font-medium">{item.expiry}</span>
                <h3 className="text-sm font-bold text-white mt-1">{item.name}</h3>
                <div className="text-lg font-bold text-white mt-2">₹{item.price}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs font-semibold ${item.chg.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {item.chg}
                </span>
                <span className="text-[10px] bg-[#1E2638] text-gray-300 px-2 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout for Options & Futures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Section 2: Commodity Options (Movers & Shakers) */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-white">Commodity Options (Movers & Shakers)</h2>
            <span className="text-xs text-gray-400">MCX 27 Nov 26</span>
          </div>
          <div className="space-y-3">
            {commodityOptions.map((opt, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0F141C] border border-[#1E2638] rounded-lg hover:border-gray-600 transition">
                <div>
                  <div className="text-xs font-bold text-white">{opt.symbol}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Value: {opt.value}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">₹{opt.ltp}</div>
                    <div className={`text-xs font-medium ${opt.chg.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {opt.chg}
                    </div>
                  </div>
                  <button 
                    onClick={() => onOpenModal(opt.isBuy ? 'BUY' : 'SELL')}
                    className={`px-3 py-1 rounded text-xs font-bold text-white transition ${opt.isBuy ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
                  >
                    {opt.isBuy ? 'BUY' : 'SELL'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Commodity Futures */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-white">Commodity Futures (Active Contracts)</h2>
            <span className="text-xs text-gray-400">MCX Spot & Futures</span>
          </div>
          <div className="space-y-3">
            {commodityFutures.map((fut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0F141C] border border-[#1E2638] rounded-lg hover:border-gray-600 transition">
                <div>
                  <div className="text-xs font-bold text-white">{fut.symbol}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Traded Value: {fut.value}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">₹{fut.ltp}</div>
                    <div className="text-xs font-medium text-green-400">{fut.chg}</div>
                  </div>
                  <button 
                    onClick={() => onOpenModal('BUY')}
                    className="px-3 py-1 rounded text-xs font-bold text-white bg-green-600 hover:bg-green-500 transition"
                  >
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}