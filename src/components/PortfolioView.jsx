import React, { useState } from 'react';
import { FiPieChart, FiTrendingUp, FiBox } from 'react-icons/fi';

export default function PortfolioView() {
  const [tab, setTab] = useState('holdings'); // 'holdings' or 'positions'

  const holdings = [
    { symbol: 'RELIANCE', qty: 15, avg: 2955.00, ltp: 2971.74, pnl: 251.10, chg: '+0.53%' },
    { symbol: 'TCS', qty: 10, avg: 3910.00, ltp: 3941.39, pnl: 313.90, chg: '+0.80%' },
    { symbol: 'INFY', qty: 25, avg: 1600.00, ltp: 1624.56, pnl: 614.00, chg: '+1.53%' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 p-6 flex flex-col overflow-y-auto select-none">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Portfolio</h1>
          <p className="text-xs text-gray-400">Manage your long-term investments and active holdings</p>
        </div>
        <div className="flex space-x-2 bg-[#131B2A] p-1 rounded-xl border border-[#1E2638]">
          <button
            onClick={() => setTab('holdings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${tab === 'holdings' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Holdings (3)
          </button>
          <button
            onClick={() => setTab('positions')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${tab === 'positions' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Positions (1)
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#131B2A] border border-[#1E2638] p-4 rounded-xl">
          <p className="text-xs text-gray-400">Total Investment</p>
          <p className="text-lg font-bold text-white mt-1">₹1,23,450.00</p>
        </div>
        <div className="bg-[#131B2A] border border-[#1E2638] p-4 rounded-xl">
          <p className="text-xs text-gray-400">Current Value</p>
          <p className="text-lg font-bold text-white mt-1">₹1,24,629.00</p>
        </div>
        <div className="bg-[#131B2A] border border-[#1E2638] p-4 rounded-xl">
          <p className="text-xs text-gray-400">Total P&L</p>
          <p className="text-lg font-bold text-green-400 mt-1">+₹1,179.00 (+0.95%)</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#1E2638] text-gray-400 bg-[#0F141C]/50">
              <th className="p-3">Instrument</th>
              <th className="p-3">Qty.</th>
              <th className="p-3">Avg. Price</th>
              <th className="p-3">LTP</th>
              <th className="p-3">P&L</th>
              <th className="p-3">Chg.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2638]">
            {holdings.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#1E2638]/40 transition">
                <td className="p-3 font-semibold text-white">{item.symbol}</td>
                <td className="p-3 text-gray-300">{item.qty}</td>
                <td className="p-3 text-gray-300">₹{item.avg.toFixed(2)}</td>
                <td className="p-3 text-white font-medium">₹{item.ltp.toFixed(2)}</td>
                <td className="p-3 text-green-400 font-semibold">+₹{item.pnl.toFixed(2)}</td>
                <td className="p-3 text-green-400">{item.chg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}