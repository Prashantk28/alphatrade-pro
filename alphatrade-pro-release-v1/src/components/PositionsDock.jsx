import React, { useState } from 'react';

export default function PositionsDock({ positions = [] }) {
  const [activeTab, setActiveTab] = useState('positions');

  // डमी ऑर्डर्स आणि होल्डिंग्स डाटा
  const ordersList = [
    { symbol: 'RELIANCE', type: 'BUY', qty: 15, price: 2955.00, status: 'COMPLETE', time: '10:15:22' },
    { symbol: 'TCS', type: 'SELL', qty: 10, price: 3950.00, status: 'PENDING', time: '10:12:05' },
    { symbol: 'INFY', type: 'BUY', qty: 25, price: 1620.50, status: 'COMPLETE', time: '09:45:10' }
  ];

  const holdingsList = [
    { symbol: 'TATASTEEL', qty: 50, avgPrice: 145.50, ltp: 152.00, pnl: 325.00, chg: '+4.47%' },
    { symbol: 'SBIN', qty: 30, avgPrice: 750.20, ltp: 765.40, pnl: 456.00, chg: '+2.03%' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#131B2A] text-gray-300 text-xs font-sans">
      {/* Dock Header / Tabs */}
      <div className="flex items-center px-4 border-b border-[#1E2638] space-x-6 bg-[#0F141C]">
        <button
          onClick={() => setActiveTab('positions')}
          className={`py-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'positions' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Positions ({positions.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'orders' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Orders ({ordersList.length})
        </button>
        <button
          onClick={() => setActiveTab('holdings')}
          className={`py-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'holdings' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Holdings ({holdingsList.length})
        </button>
        <button
          onClick={() => setActiveTab('funds')}
          className={`py-2.5 font-medium border-b-2 transition-colors ${
            activeTab === 'funds' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          Funds
        </button>
      </div>

      {/* Dock Content Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Positions Tab */}
        {activeTab === 'positions' && (
          <div>
            <div className="grid grid-cols-6 text-gray-400 pb-2 border-b border-[#1E2638] font-medium">
              <span>Instrument</span>
              <span>Qty.</span>
              <span>Avg. Price</span>
              <span>LTP</span>
              <span>P&L</span>
              <span>Chg.</span>
            </div>
            {positions.map((pos, index) => (
              <div key={index} className="grid grid-cols-6 py-2.5 border-b border-[#1E2638]/30 items-center">
                <span className="font-medium text-gray-200">{pos.symbol}</span>
                <span>{pos.qty}</span>
                <span>₹{pos.avgPrice.toLocaleString()}</span>
                <span>₹{pos.ltp.toLocaleString()}</span>
                <span className={`font-semibold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pos.pnl >= 0 ? `+₹${pos.pnl}` : `-₹{Math.abs(pos.pnl)}`}
                </span>
                <span className={pos.isBuy ? 'text-emerald-400' : 'text-red-400'}>{pos.chg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <div className="grid grid-cols-6 text-gray-400 pb-2 border-b border-[#1E2638] font-medium">
              <span>Instrument</span>
              <span>Type</span>
              <span>Qty.</span>
              <span>Price</span>
              <span>Status</span>
              <span>Time</span>
            </div>
            {ordersList.map((ord, index) => (
              <div key={index} className="grid grid-cols-6 py-2.5 border-b border-[#1E2638]/30 items-center">
                <span className="font-medium text-gray-200">{ord.symbol}</span>
                <span className={`font-semibold ${ord.type === 'BUY' ? 'text-emerald-400' : 'text-red-400'}`}>{ord.type}</span>
                <span>{ord.qty}</span>
                <span>₹{ord.price.toLocaleString()}</span>
                <span className="text-amber-400 font-medium">{ord.status}</span>
                <span className="text-gray-400">{ord.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Holdings Tab */}
        {activeTab === 'holdings' && (
          <div>
            <div className="grid grid-cols-6 text-gray-400 pb-2 border-b border-[#1E2638] font-medium">
              <span>Instrument</span>
              <span>Qty.</span>
              <span>Avg. Cost</span>
              <span>LTP</span>
              <span>P&L</span>
              <span>Net Chg.</span>
            </div>
            {holdingsList.map((hold, index) => (
              <div key={index} className="grid grid-cols-6 py-2.5 border-b border-[#1E2638]/30 items-center">
                <span className="font-medium text-gray-200">{hold.symbol}</span>
                <span>{hold.qty}</span>
                <span>₹{hold.avgPrice.toLocaleString()}</span>
                <span>₹{hold.ltp.toLocaleString()}</span>
                <span className="text-emerald-400 font-semibold">+₹{hold.pnl}</span>
                <span className="text-emerald-400">{hold.chg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Funds Tab */}
        {activeTab === 'funds' && (
          <div className="flex items-center justify-around py-4 bg-[#0F141C] rounded-lg border border-[#1E2638]">
            <div className="text-center">
              <p className="text-gray-400">Available Margin</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">₹1,50,430.25</p>
            </div>
            <div className="h-8 w-[1px] bg-[#1E2638]"></div>
            <div className="text-center">
              <p className="text-gray-400">Used Margin</p>
              <p className="text-lg font-bold text-purple-400 mt-1">₹24,569.75</p>
            </div>
            <div className="h-8 w-[1px] bg-[#1E2638]"></div>
            <div className="text-center">
              <p className="text-gray-400">Total Balance</p>
              <p className="text-lg font-bold text-gray-200 mt-1">₹1,75,000.00</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}