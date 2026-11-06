import React from 'react';
import { FiDollarSign, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

export default function FundsView() {
  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 p-6 flex flex-col overflow-y-auto select-none">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Funds</h1>
        <p className="text-xs text-gray-400">Manage your paper trading margin and account balance</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Equity Section */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
              <span className="font-bold text-white text-sm">Equity Margin</span>
              <span className="text-xs bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20">Active</span>
            </div>
            
            <div className="py-6 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Available margin</span>
                <span className="text-white font-semibold">₹50,450.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Used margin</span>
                <span className="text-white font-semibold">₹12,250.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Opening balance</span>
                <span className="text-white font-semibold">₹62,700.00</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1E2638]">
            <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-purple-600/20">
              <FiArrowUpRight size={14} />
              <span>Add Funds</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#0F141C] hover:bg-[#1E2638] text-gray-300 font-bold py-2.5 rounded-xl text-xs border border-[#1E2638] transition">
              <FiArrowDownLeft size={14} />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Commodity Section */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
              <span className="font-bold text-white text-sm">Commodity Margin (MCX)</span>
              <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full border border-yellow-500/20">Inactive</span>
            </div>
            
            <div className="py-6 space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Available margin</span>
                <span className="text-white font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Used margin</span>
                <span className="text-white font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Opening balance</span>
                <span className="text-white font-semibold">₹0.00</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E2638]">
            <button className="w-full flex items-center justify-center space-x-2 bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/20 font-bold py-2.5 rounded-xl text-xs transition">
              <span>Activate Commodity Segment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}