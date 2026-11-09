import React, { useState, useEffect } from 'react';
import Header from './components/Header';
// जर तुमच्या प्रोजेक्टमध्ये इतर कंपोनंट्स वेगळ्या फोल्डरमध्ये असतील तर त्यांचे पाथ चेक करून घ्या

export default function App() {
  const [activeTab, setActiveTab] = useState('chart');
  const [isConnected, setIsConnected] = useState(true);

  // सिम्युलेटेड डेटा किंवा स्टेट्स
  const [funds, setFunds] = useState(481019.62);
  const [positions, setPositions] = useState([
    { id: 1, instrument: 'NIFTY 50 24890 PE', qty: 25, avgPrice: 50, ltp: 49.91, pnl: -2.25 }
  ]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans">
      {/* Header with Paper Trading Disclaimer */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} isConnected={isConnected} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'chart' && (
          <div className="flex flex-col items-center justify-center h-[75vh] bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-purple-400">📈 Advanced Chart & Live TBT</h2>
            <p className="text-gray-400 text-sm mb-4">NIFTY 50 & BankNifty Live Fluctuating Chart Mode</p>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg w-full max-w-2xl text-center">
              <span className="text-yellow-400 font-medium">⚠️ Paper Trading Mode Active: All trades executed here use virtual funds.</span>
            </div>
          </div>
        )}

        {activeTab === 'optionChain' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">📊 Option Chain & Strike Prices</h2>
            <p className="text-gray-300 text-sm">All expiry option chains with Call (CE) & Put (PE) live data are loaded successfully.</p>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-400">💼 Portfolio & Virtual Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <span className="text-gray-400 text-xs">Available Funds (Paper)</span>
                <h3 className="text-2xl font-bold text-green-400">₹{funds.toLocaleString('en-IN')}</h3>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <span className="text-gray-400 text-xs">Total Un-realized P&L</span>
                <h3 className="text-2xl font-bold text-red-400">-₹2.25</h3>
              </div>
            </div>

            <h3 className="text-md font-semibold mb-3 text-gray-200">Active Positions ({positions.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-gray-900 text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="p-3">Instrument</th>
                    <th className="p-3">Qty / Lots</th>
                    <th className="p-3">Avg. Price</th>
                    <th className="p-3">LTP (Live)</th>
                    <th className="p-3">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos) => (
                    <tr key={pos.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="p-3 font-medium text-white">
                        <span className="bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-[10px] mr-2">BUY</span>
                        {pos.instrument}
                      </td>
                      <td className="p-3">{pos.qty}</td>
                      <td className="p-3">₹{pos.avgPrice}</td>
                      <td className="p-3">₹{pos.ltp}</td>
                      <td className="p-3 text-red-400">-₹2.25</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}