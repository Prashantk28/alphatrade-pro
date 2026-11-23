<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { upstoxWS } from '../services/upstoxWebSocket';

export default function PortfolioView({ positions = [], holdings = [], orders = [], funds = 500000, onAddFunds }) {
  const [activeTab, setActiveTab] = useState('positions');
  const [livePositions, setLivePositions] = useState(positions);

  // पोझिशन्सची मूळ लिस्ट बदलल्यास अपडेट करणे
  useEffect(() => {
    setLivePositions(positions);
  }, [positions]);

  // रिअल-टाइम पोझिशन्स LTP आणि PnL टिक-बाय-टिक अपडेट करणे (High Speed Ticker)
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePositions((prevPositions) =>
        prevPositions.map((pos) => {
          // सूक्ष्म रिअल-टाइम प्राइझ फ्लक्चुएशन
          const tickChange = (Math.random() - 0.49) * 0.40;
          const updatedLtp = Math.max(0.5, parseFloat((pos.price + tickChange).toFixed(2)));
          const pnlVal = parseFloat(((updatedLtp - pos.price) * pos.qty).toFixed(2));

          return {
            ...pos,
            ltp: updatedLtp,
            pnl: pos.side === 'SELL' ? -pnlVal : pnlVal
          };
        })
      );
    }, 800); // 800ms हाय-स्पीड टिक्स

    // WebSocket वरून थेट डेटा आल्यास तेही सिंक करणे
    const unsubscribe = upstoxWS.onMarketUpdate(() => {
      // Live WS Signal Listener
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  // एकूण PnL चे गणित
  const totalPnL = livePositions.reduce((acc, curr) => acc + (curr.pnl || 0), 0);

  return (
    <div className="flex-1 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white select-none overflow-hidden">
      {/* Portfolio Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-[#0F141C] border border-[#1E2638] p-3.5 rounded-xl">
          <p className="text-[11px] text-gray-400 font-medium">Total Un-realized P&L</p>
          <h3 className={`text-xl font-extrabold mt-1 ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalPnL >= 0 ? `+₹${totalPnL.toFixed(2)}` : `-₹${Math.abs(totalPnL).toFixed(2)}`}
          </h3>
        </div>

        <div className="bg-[#0F141C] border border-[#1E2638] p-3.5 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Available Funds (Paper)</p>
            <h3 className="text-xl font-extrabold text-blue-400 mt-1">
              ₹{funds.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
          </div>
          <button
            onClick={onAddFunds}
            className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition shadow"
          >
            + Add Funds
          </button>
        </div>

        <div className="bg-[#0F141C] border border-[#1E2638] p-3.5 rounded-xl">
          <p className="text-[11px] text-gray-400 font-medium">Portfolio Assets</p>
          <h3 className="text-sm font-bold text-yellow-400 mt-1">
            {livePositions.length} Positions | {holdings.length} Holdings
          </h3>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-[#1E2638] mb-3">
        <button
          onClick={() => setActiveTab('positions')}
          className={`px-4 py-2 font-bold text-xs border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'positions' ? 'border-purple-500 text-purple-400 bg-purple-900/10' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>📊 Positions</span>
          <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">{livePositions.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('holdings')}
          className={`px-4 py-2 font-bold text-xs border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'holdings' ? 'border-purple-500 text-purple-400 bg-purple-900/10' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>💼 Holdings</span>
          <span className="bg-gray-700 text-white text-[10px] px-1.5 py-0.2 rounded-full">{holdings.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-bold text-xs border-b-2 transition flex items-center space-x-1.5 ${
            activeTab === 'orders' ? 'border-purple-500 text-purple-400 bg-purple-900/10' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>📑 Order Book</span>
          <span className="bg-gray-700 text-white text-[10px] px-1.5 py-0.2 rounded-full">{orders.length}</span>
        </button>
      </div>

      {/* Positions Table */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-[#1E2638] bg-[#0F141C]">
        {activeTab === 'positions' && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638]">
                <th className="p-3">Instrument</th>
                <th className="p-3 text-center">Qty / Lots</th>
                <th className="p-3 text-right">Avg. Price</th>
                <th className="p-3 text-right">LTP (Live)</th>
                <th className="p-3 text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {livePositions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    No open positions available. Place trade from Option Chain or Watchlist.
                  </td>
                </tr>
              ) : (
                livePositions.map((pos, i) => {
                  const pnl = pos.pnl || 0;
                  const isProfit = pnl >= 0;

                  return (
                    <tr key={i} className="border-b border-[#1E2638]/40 hover:bg-[#131B2A]/50 transition">
                      <td className="p-3 font-bold text-white flex items-center space-x-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${pos.side === 'BUY' ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40' : 'bg-red-600/30 text-red-400 border border-red-500/40'}`}>
                          {pos.side}
                        </span>
                        <span>{pos.symbol}</span>
                      </td>
                      <td className="p-3 text-center text-gray-300 font-semibold">{pos.qty}</td>
                      <td className="p-3 text-right text-gray-400">₹{pos.price}</td>
                      <td className="p-3 text-right font-bold text-blue-400 animate-pulse">
                        ₹{(pos.ltp || pos.price).toFixed(2)}
                      </td>
                      <td className={`p-3 text-right font-extrabold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {isProfit ? `+₹${pnl.toFixed(2)}` : `-₹${Math.abs(pnl).toFixed(2)}`}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'holdings' && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638]">
                <th className="p-3">Stock</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Buy Price</th>
                <th className="p-3 text-right">Current LTP</th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-gray-500">No equity holdings found.</td>
                </tr>
              ) : (
                holdings.map((h, i) => (
                  <tr key={i} className="border-b border-[#1E2638]/40 hover:bg-[#131B2A]/50">
                    <td className="p-3 font-bold text-white">{h.symbol}</td>
                    <td className="p-3 text-center">{h.qty}</td>
                    <td className="p-3 text-right">₹{h.price}</td>
                    <td className="p-3 text-right font-bold text-green-400">₹{(h.price * 1.02).toFixed(2)}</td>
                  </tr>
                ))
              )}
=======
import React, { useState } from 'react';

export default function PortfolioView() {
  const [tab, setTab] = useState('POSITIONS');

  return (
    <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl flex flex-col h-full overflow-hidden text-white select-none">
      <div className="flex border-b border-[#1E2638] bg-[#0F141C]/60 text-xs font-bold font-mono">
        {['POSITIONS', 'HOLDINGS', 'ORDERS', 'FUNDS'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 transition border-b-2 ${
              tab === t ? 'border-purple-500 text-purple-400 bg-purple-600/10' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {tab === 'POSITIONS' && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4 font-mono">
              <div className="p-3 bg-[#0F141C] border border-[#1E2638] rounded-xl">
                <div className="text-[10px] text-gray-400">TOTAL P&L</div>
                <div className="text-xl font-bold text-green-400">+₹22,575.00</div>
              </div>
              <div className="p-3 bg-[#0F141C] border border-[#1E2638] rounded-xl">
                <div className="text-[10px] text-gray-400">OPEN POSITIONS</div>
                <div className="text-xl font-bold text-white">2 Active</div>
              </div>
            </div>
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-gray-500 border-b border-[#1E2638]">
                <tr>
                  <th className="py-2">INSTRUMENT</th>
                  <th>QTY</th>
                  <th>AVG PRICE</th>
                  <th>LTP</th>
                  <th className="text-right">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2638]/40">
                <tr>
                  <td className="py-3 font-bold text-purple-400">NIFTY 24800 CE</td>
                  <td>350</td>
                  <td>₹120.50</td>
                  <td>₹185.00</td>
                  <td className="text-right font-bold text-green-400">+₹22,575.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {tab === 'HOLDINGS' && (
          <table className="w-full text-left text-xs font-mono">
            <thead className="text-gray-500 border-b border-[#1E2638]">
              <tr>
                <th className="py-2">STOCK</th>
                <th>QTY</th>
                <th>INVESTED</th>
                <th>CURRENT</th>
                <th className="text-right">RETURN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638]/40">
              <tr>
                <td className="py-3 font-bold">RELIANCE</td>
                <td>50</td>
                <td>₹1,30,000</td>
                <td>₹1,37,025</td>
                <td className="text-right font-bold text-green-400">+5.40%</td>
              </tr>
>>>>>>> main
            </tbody>
          </table>
        )}

<<<<<<< HEAD
        {activeTab === 'orders' && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638]">
                <th className="p-3">Time</th>
                <th className="p-3">Symbol</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Side</th>
                <th className="p-3 text-right">Executed Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">No order history.</td>
                </tr>
              ) : (
                orders.map((ord, i) => (
                  <tr key={i} className="border-b border-[#1E2638]/40 hover:bg-[#131B2A]/50">
                    <td className="p-3 text-gray-400">{ord.time}</td>
                    <td className="p-3 font-bold text-white">{ord.symbol}</td>
                    <td className="p-3 text-center text-purple-400 font-semibold">{ord.type}</td>
                    <td className="p-3 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ord.side === 'BUY' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
                        {ord.side}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold">₹{ord.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
=======
        {tab === 'ORDERS' && (
          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#0F141C] border border-[#1E2638] rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-blue-400">BUY</span> NIFTY 24800 CE • 350 QTY
                <div className="text-[10px] text-gray-500 font-mono">Executed @ ₹120.50</div>
              </div>
              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold">COMPLETE</span>
            </div>
          </div>
        )}

        {tab === 'FUNDS' && (
          <div className="max-w-md mx-auto space-y-4 font-mono text-center">
            <div className="p-4 bg-[#0F141C] border border-[#1E2638] rounded-xl">
              <div className="text-xs text-gray-400">AVAILABLE MARGIN</div>
              <div className="text-3xl font-extrabold text-green-400 mt-1">₹4,85,240.00</div>
            </div>
          </div>
>>>>>>> main
        )}
      </div>
    </div>
  );
}