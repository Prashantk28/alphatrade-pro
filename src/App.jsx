import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chart');
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  const stocks = [
    { name: 'NIFTY 50', price: '₹24,891.15', change: '-1.47 (-0.01%)', isUp: false },
    { name: 'BANKNIFTY', price: '₹47,597.37', change: '+0.14 (+0.01%)', isUp: true },
    { name: 'RELIANCE', price: '₹2,972.05', change: '-2.05 (-0.07%)', isUp: false },
    { name: 'TCS', price: '₹3,943.91', change: '+0.51 (+0.01%)', isUp: true },
    { name: 'INFY', price: '₹1,628.06', change: '+0.95 (0.01%)', isUp: true },
    { name: 'HDFCBANK', price: '₹1,465.1', change: '-0.96 (-0.01%)', isUp: false },
    { name: 'TATAMOTORS', price: '₹990.4', change: '-0.77 (-0.01%)', isUp: false },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative">
      
      {/* ⚠️ Paper Trading Warning Banner */}
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      {/* Header */}
      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
          <div className="hidden md:flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-400">Search eg: infy, bse</span>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 Chart
          </button>
          <button
            onClick={() => setActiveTab('optionChain')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Option Chain
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Portfolio
          </button>
        </nav>

        {/* Right Side: Upstox Status & Direct Logout Button */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1.5 bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800 text-xs">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-gray-300 font-medium">Upstox Connected</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to Logout?")) {
                alert("Logged out successfully!");
                window.location.reload();
              }
            }}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide shadow-md flex items-center space-x-1 cursor-pointer transition-all"
          >
            <span>PK</span>
            <span>🚪 Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout with Watchlist & Dashboard */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Watchlist Sidebar */}
        <aside className="w-72 bg-[#12141c] border-r border-gray-800 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Watchlist (1 / 50)</span>
            <span>NSE</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
            {stocks.map((stock, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedStock(stock.name)}
                className={`p-3 hover:bg-gray-800/60 cursor-pointer transition-all flex items-center justify-between ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-200">{stock.name}</p>
                  <p className="text-[10px] text-gray-500">NSE</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-200">{stock.price}</p>
                  <p className={`text-[10px] font-medium ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#0b0e14]">
          {activeTab === 'chart' && (
            <div className="flex flex-col h-full bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-bold text-white">{selectedStock}</h2>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded font-medium">LIVE TBT</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">1m</span>
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">5m</span>
                  <span className="bg-purple-600 text-white px-2.5 py-1 rounded font-medium">15m</span>
                  <span className="bg-gray-900 px-2.5 py-1 rounded border border-gray-800">1h</span>
                </div>
              </div>

              {/* Simulated Chart Container */}
              <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-gray-800 rounded-lg p-6 bg-[#0e1117] min-h-[50vh]">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">📈</span>
                  <h3 className="text-lg font-bold text-purple-400">Advanced Candlestick Chart</h3>
                  <p className="text-gray-400 text-xs mt-1">Live streaming feed active for {selectedStock}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-5 shadow-lg">
              <h2 className="text-lg font-bold mb-3 text-purple-400">📊 Option Chain Analytics</h2>
              <p className="text-gray-300 text-xs mb-4">NIFTY 50 Expiry: 13-Nov-2026 | Real-time Call (CE) & Put (PE) chain.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300 border-collapse">
                  <thead>
                    <tr className="bg-gray-900 border-b border-gray-800 text-gray-400">
                      <th className="p-2.5">CALLS OI</th>
                      <th className="p-2.5">CHG %</th>
                      <th className="p-2.5 text-center">STRIKE PRICE</th>
                      <th className="p-2.5">PUTS OI</th>
                      <th className="p-2.5">CHG %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-gray-800/40">
                      <td className="p-2.5 text-blue-400">1,25,400</td>
                      <td className="p-2.5 text-green-400">+12.4%</td>
                      <td className="p-2.5 text-center font-bold text-amber-400 bg-gray-900/50">24640</td>
                      <td className="p-2.5 text-red-400">98,400</td>
                      <td className="p-2.5 text-red-400">-8.2%</td>
                    </tr>
                    <tr className="hover:bg-gray-800/40">
                      <td className="p-2.5 text-blue-400">1,37,900</td>
                      <td className="p-2.5 text-green-400">+13.4%</td>
                      <td className="p-2.5 text-center font-bold text-amber-400 bg-gray-900/50">24690</td>
                      <td className="p-2.5 text-red-400">1,08,900</td>
                      <td className="p-2.5 text-red-400">-9.2%</td>
                    </tr>
                    <tr className="hover:bg-gray-800/40">
                      <td className="p-2.5 text-blue-400">1,87,900</td>
                      <td className="p-2.5 text-green-400 font-bold">+17.4%</td>
                      <td className="p-2.5 text-center font-bold text-white bg-purple-900/40">24890 [ATM]</td>
                      <td className="p-2.5 text-red-400">1,50,900</td>
                      <td className="p-2.5 text-red-400">-13.2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-purple-400">💼 Portfolio & Virtual Funds</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-xs">Available Virtual Cash</span>
                  <h3 className="text-2xl font-bold text-green-400 mt-1">₹10,00,000.00</h3>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-xs">Total P&L</span>
                  <h3 className="text-2xl font-bold text-green-400 mt-1">+₹14,580.00</h3>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-xs">Active Positions</span>
                  <h3 className="text-2xl font-bold text-blue-400 mt-1">3 Lots</h3>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}