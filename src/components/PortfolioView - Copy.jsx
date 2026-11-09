import React, { useState } from 'react';
import { FiTrendingUp, FiBriefcase, FiList, FiDollarSign, FiPlus } from 'react-icons/fi';

export default function PortfolioView({ positions = [], orders = [], funds = 485240, onAddFunds }) {
  const [activeSubTab, setActiveSubTab] = useState('positions');

  // Calculate total PnL
  const totalPnL = positions.reduce((acc, curr) => acc + (curr.pnl || (Math.random() * 1200 - 500)), 0);

  return (
    <div className="flex-1 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white select-none overflow-hidden">
      {/* Top Header Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-[#1E2638]">
        <div className="bg-[#0F141C] p-3.5 rounded-xl border border-[#1E2638] flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Total P&L</p>
            <h3 className={`text-lg font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
          </div>
          <FiTrendingUp size={24} className={totalPnL >= 0 ? 'text-green-400' : 'text-red-400'} />
        </div>

        <div className="bg-[#0F141C] p-3.5 rounded-xl border border-[#1E2638] flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Available Funds (Virtual)</p>
            <h3 className="text-lg font-bold text-blue-400">₹{funds.toLocaleString('en-IN')}</h3>
          </div>
          <button 
            onClick={onAddFunds}
            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1"
          >
            <FiPlus size={12} />
            <span>Add Funds</span>
          </button>
        </div>

        <div className="bg-[#0F141C] p-3.5 rounded-xl border border-[#1E2638] flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Active Positions Count</p>
            <h3 className="text-lg font-bold text-yellow-400">{positions.length} Trades</h3>
          </div>
          <FiBriefcase size={22} className="text-yellow-400" />
        </div>
      </div>

      {/* Sub-Tabs: Positions, Orders, Holdings */}
      <div className="flex items-center space-x-2 py-3 border-b border-[#1E2638]">
        <button
          onClick={() => setActiveSubTab('positions')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
            activeSubTab === 'positions' ? 'bg-purple-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-white'
          }`}
        >
          📊 Positions ({positions.length})
        </button>
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
            activeSubTab === 'orders' ? 'bg-purple-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-white'
          }`}
        >
          📝 Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveSubTab('holdings')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
            activeSubTab === 'holdings' ? 'bg-purple-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-white'
          }`}
        >
          💼 Holdings (0)
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 mt-3 overflow-y-auto rounded-xl border border-[#1E2638] bg-[#0F141C]">
        {activeSubTab === 'positions' && (
          positions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-16">
              <FiBriefcase size={40} className="mb-2 opacity-40" />
              <p className="text-sm font-semibold">No Active Positions</p>
              <p className="text-xs text-gray-600 mt-1">Go to Option Chain or Quick Trade to place your first paper trade!</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638]">
                  <th className="p-3">Instrument</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Avg. Price</th>
                  <th className="p-3 text-right">LTP</th>
                  <th className="p-3 text-right">P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, idx) => (
                  <tr key={idx} className="border-b border-[#1E2638]/40 hover:bg-[#131B2A]/60 transition">
                    <td className="p-3 font-bold text-white flex items-center space-x-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${pos.side === 'SELL' ? 'bg-red-600/30 text-red-400' : 'bg-blue-600/30 text-blue-400'}`}>
                        {pos.side || 'BUY'}
                      </span>
                      <span>{pos.symbol}</span>
                    </td>
                    <td className="p-3 text-center text-gray-300">{pos.qty}</td>
                    <td className="p-3 text-right text-gray-300">₹{pos.price}</td>
                    <td className="p-3 text-right text-green-400">₹{(pos.price * 1.02).toFixed(2)}</td>
                    <td className="p-3 text-right font-bold text-green-400">+₹{(pos.qty * pos.price * 0.02).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {activeSubTab === 'orders' && (
          orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-16">
              <FiList size={40} className="mb-2 opacity-40" />
              <p className="text-sm font-semibold">No Orders Placed Yet</p>
              <p className="text-xs text-gray-600 mt-1">Your executed and pending orders will appear here.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638]">
                  <th className="p-3">Time</th>
                  <th className="p-3">Instrument</th>
                  <th className="p-3 text-center">Type</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord, idx) => (
                  <tr key={idx} className="border-b border-[#1E2638]/40 hover:bg-[#131B2A]/60 transition">
                    <td className="p-3 text-gray-400">{ord.time || 'Just now'}</td>
                    <td className="p-3 font-bold text-white">{ord.symbol}</td>
                    <td className="p-3 text-center text-blue-400 font-semibold">{ord.side || 'BUY'}</td>
                    <td className="p-3 text-center text-gray-300">{ord.qty}</td>
                    <td className="p-3 text-right text-gray-300">₹{ord.price}</td>
                    <td className="p-3 text-center"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold">COMPLETE</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {activeSubTab === 'holdings' && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 py-16">
            <FiBriefcase size={40} className="mb-2 opacity-40" />
            <p className="text-sm font-semibold">No Long-term Holdings</p>
            <p className="text-xs text-gray-600 mt-1">Delivery-based equity purchases will be shown in holdings.</p>
          </div>
        )}
      </div>
    </div>
  );
}