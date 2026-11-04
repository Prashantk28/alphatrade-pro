import React, { useState } from 'react';

export default function PositionsDock() {
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div className="flex flex-col h-full bg-[#131B2A] text-gray-200 select-none text-xs">
      {/* Dock Tabs Header */}
      <div className="flex items-center justify-between px-4 border-b border-[#1E2638] bg-[#0F141C]/50">
        <div className="flex space-x-6 font-medium">
          <button
            onClick={() => setActiveTab('positions')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'positions' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Positions (1)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'orders' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Orders (3)
          </button>
          <button
            onClick={() => setActiveTab('holdings')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'holdings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Holdings (2)
          </button>
          <button
            onClick={() => setActiveTab('funds')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'funds' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Funds
          </button>
        </div>

        {/* Total P&L Summary Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Total P&L:</span>
          <span className="font-mono font-semibold text-emerald-400">+₹1,240.50</span>
        </div>
      </div>

      {/* Dock Content Area */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px]">
        {activeTab === 'positions' && (
          <div className="w-full">
            <div className="grid grid-cols-6 text-gray-400 pb-2 border-b border-[#1E2638] font-sans font-medium">
              <span>Instrument</span>
              <span>Qty.</span>
              <span>Avg. Price</span>
              <span>LTP</span>
              <span>P&L</span>
              <span>Chg.</span>
            </div>
            <div className="grid grid-cols-6 py-2 border-b border-[#1E2638]/30 items-center">
              <span className="font-sans font-medium text-gray-200">RELIANCE</span>
              <span>15</span>
              <span>₹2,955.00</span>
              <span>₹2,971.74</span>
              <span className="text-emerald-400 font-semibold">+₹251.10</span>
              <span className="text-emerald-400">+0.53%</span>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="text-gray-400 text-center py-4 font-sans">
            No active open orders. All executed orders are updated.
          </div>
        )}

        {activeTab === 'holdings' && (
          <div className="text-gray-400 text-center py-4 font-sans">
            Long term holdings loaded successfully (2 stocks in portfolio).
          </div>
        )}

        {activeTab === 'funds' && (
          <div className="flex items-center justify-between max-w-md font-sans">
            <div>
              <div className="text-gray-400">Available Margin</div>
              <div className="text-base font-mono font-bold text-gray-100">₹50,000.00</div>
            </div>
            <div>
              <div className="text-gray-400">Used Margin</div>
              <div className="text-base font-mono font-bold text-gray-300">₹14,425.00</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}