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
            </tbody>
          </table>
        )}

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
        )}
      </div>
    </div>
  );
}