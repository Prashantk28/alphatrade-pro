import React, { useState } from 'react';
import AdvancedChart from './components/AdvancedChart';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  // Connection & Interactive States
  const [isUpstoxConnected, setIsUpstoxConnected] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBasketPanel, setShowBasketPanel] = useState(false);
  const [showQuickTradeModal, setShowQuickTradeModal] = useState(false);
  const [upstoxToken, setUpstoxToken] = useState('');

  // Portfolio & Positions State
  const [portfolioSubTab, setPortfolioSubTab] = useState('positions');
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [virtualFunds, setVirtualFunds] = useState(485240.00);

  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('••••••••');

  const stocks = [
    { name: 'NIFTY 50', price: 24893.03, change: '+1.26 (+0.01%)', isUp: true },
    { name: 'BANKNIFTY', price: 47595.12, change: '-0.81 (-0.01%)', isUp: false },
    { name: 'RELIANCE', price: 2973.10, change: '+0.02 (+0.00%)', isUp: true },
    { name: 'TCS', price: 3942.49, change: '+0.41 (+0.00%)', isUp: true },
    { name: 'INFY', price: 1624.84, change: '+0.03 (+0.00%)', isUp: true },
    { name: 'HDFCBANK', price: 1466.97, change: '+0.24 (+0.00%)', isUp: true },
    { name: 'TATAMOTORS', price: 989.40, change: '+0.64 (+0.01%)', isUp: true },
  ];

  const currentStockObj = stocks.find(s => s.name === selectedStock) || stocks[0];

  const handleSaveToken = () => {
    if (upstoxToken.trim() !== '') {
      setIsUpstoxConnected(true);
      setShowTokenModal(false);
      alert("Upstox Access Token Validated & Connected Successfully!");
    } else {
      alert("Please enter a valid Upstox Access Token.");
    }
  };

  const executeTrade = (instrumentName, price, type, category = 'position') => {
    const newTrade = {
      id: Date.now(),
      instrument: instrumentName,
      qty: category === 'position' ? '1 Lot (25 Qty)' : '10 Qty',
      avgPrice: price,
      ltp: price,
      pnl: '+₹0.00',
      type: type
    };

    if (category === 'position') {
      setPositions([newTrade, ...positions]);
      alert(`Successfully ${type}ed ${instrumentName} Position! Check Portfolio.`);
    } else {
      setHoldings([newTrade, ...holdings]);
      alert(`Successfully added ${instrumentName} to Holdings!`);
    }
  };

  // 1. Initial Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col items-center justify-center font-sans p-4">
        <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="mb-6">
            <span className="bg-purple-600 text-white font-bold px-4 py-1.5 rounded-lg text-base tracking-wide shadow-md">
              AlphaTrade Pro
            </span>
            <p className="text-gray-400 text-xs mt-2">Login to your trading terminal</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-left">
            <div>
              <label className="block text-xs text-gray-400 mb-1">EMAIL ADDRESS</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600"
                required
              />
            </div>
            <div className="text-right">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions sent."); }} className="text-[11px] text-purple-400 hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2"
            >
              Login to Terminal &rarr;
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-6">
            Don't have an account? <span className="text-purple-400 cursor-pointer font-semibold" onClick={() => alert("Registration is restricted.")}>Sign Up</span>
          </p>
        </div>
      </div>
    );
  }

  // 2. Main Dashboard Layout
  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative">
      
      {/* ⚠️ Paper Trading Warning Banner */}
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      {/* Top Header */}
      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
          <div className="hidden md:flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">
            <span className="text-xs text-gray-400">Search eg: infy, bse</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 Chart
          </button>
          <button
            onClick={() => setActiveTab('optionChain')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Option Chain
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Portfolio
          </button>
        </nav>

        {/* Action Buttons & Status */}
        <div className="flex items-center space-x-2 relative">
          
          {isUpstoxConnected ? (
            <div className="flex items-center space-x-1.5 bg-green-950/60 border border-green-500/40 px-3 py-1 rounded-lg text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 font-bold">Upstox Connected</span>
            </div>
          ) : (
            <button 
              onClick={() => setShowTokenModal(true)} 
              className="bg-amber-600/20 border border-amber-600/50 text-amber-300 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-600/30 transition-all cursor-pointer"
            >
              🔑 Set Upstox Token
            </button>
          )}

          <button 
            onClick={() => setShowBasketPanel(!showBasketPanel)} 
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              showBasketPanel ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            🛒 Basket
          </button>
          <button 
            onClick={() => setShowQuickTradeModal(true)} 
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all cursor-pointer"
          >
            ⚡ Quick Trade
          </button>

          {/* Profile Dropdown */}
          <div className="relative ml-1">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="bg-purple-700 hover:bg-purple-600 text-white font-bold w-8 h-8 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer transition-all"
            >
              PK
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 font-sans text-xs">
                <div className="px-4 py-2.5 border-b border-gray-800">
                  <p className="text-gray-200 font-bold">My Account | User ID 122758</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">pkamble.kvic@hokvic.gov.in</p>
                </div>
                <div className="py-1">
                  <button onClick={() => setShowProfileMenu(false)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center space-x-2">
                    <span>📊 Activate F&O, MCX</span>
                  </button>
                  <button onClick={() => setShowProfileMenu(false)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center space-x-2">
                    <span>🎁 Refer & Earn</span>
                  </button>
                  <button onClick={() => setShowProfileMenu(false)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center justify-between">
                    <span>📈 My Reports</span>
                    <span className="text-gray-500">&gt;</span>
                  </button>
                  <button onClick={() => setShowProfileMenu(false)} className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 flex items-center justify-between">
                    <span>⚙️ Settings</span>
                    <span className="text-gray-500">&gt;</span>
                  </button>
                </div>
                <div className="border-t border-gray-800 px-4 py-2 flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Plus Plan</span>
                  <span className="bg-purple-900/60 text-purple-300 text-[10px] px-2 py-0.5 rounded font-bold border border-purple-700/50">Enabled</span>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <button
                    onClick={() => { setShowProfileMenu(false); setIsLoggedIn(false); }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold transition-all cursor-pointer"
                  >
                    <span>🚪 Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Watchlist Sidebar */}
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
                  <p className="text-xs font-semibold text-gray-200">₹{stock.price.toFixed(2)}</p>
                  <p className={`text-[10px] font-medium ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#0b0e14] relative flex flex-col">
          {activeTab === 'chart' && (
            <div className="flex-1 flex flex-col h-full min-h-[550px]">
              <AdvancedChart symbol={currentStockObj.name} ltp={currentStockObj.price} />
            </div>
          )}

          {/* Option Chain View with Buy [B] & Sell [S] triggers */}
          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
                <h2 className="text-lg font-bold text-purple-400">📊 Option Chain Analytics [{selectedStock}]</h2>
                <span className="text-xs text-gray-400">Expiry: 13-Nov-2026 | Click [B] to Buy or [S] to Sell</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300 border-collapse">
                  <thead>
                    <tr className="bg-gray-900 border-b border-gray-800 text-gray-400">
                      <th className="p-2.5">CALLS OI</th>
                      <th className="p-2.5">CHG %</th>
                      <th className="p-2.5 text-center">CALL ACTION</th>
                      <th className="p-2.5 text-center">STRIKE PRICE</th>
                      <th className="p-2.5 text-center">PUT ACTION</th>
                      <th className="p-2.5">PUTS OI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-gray-800/40">
                      <td className="p-2.5 text-blue-400">1,25,400</td>
                      <td className="p-2.5 text-green-400">+12.4%</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => executeTrade(`${selectedStock} 24640 CE`, 305.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">B</button>
                        <button onClick={() => executeTrade(`${selectedStock} 24640 CE`, 305.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">S</button>
                      </td>
                      <td className="p-2.5 text-center font-bold text-amber-400 bg-gray-900/50">24640</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => executeTrade(`${selectedStock} 24640 PE`, 45.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">B</button>
                        <button onClick={() => executeTrade(`${selectedStock} 24640 PE`, 45.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">S</button>
                      </td>
                      <td className="p-2.5 text-red-400">98,400</td>
                    </tr>
                    <tr className="hover:bg-gray-800/40">
                      <td className="p-2.5 text-blue-400">1,87,900</td>
                      <td className="p-2.5 text-green-400 font-bold">+17.4%</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => executeTrade(`${selectedStock} 24890 ATM CE`, 55.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">B</button>
                        <button onClick={() => executeTrade(`${selectedStock} 24890 ATM CE`, 55.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">S</button>
                      </td>
                      <td className="p-2.5 text-center font-bold text-white bg-purple-900/40">24890 [ATM]</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => executeTrade(`${selectedStock} 24890 ATM PE`, 50.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">B</button>
                        <button onClick={() => executeTrade(`${selectedStock} 24890 ATM PE`, 50.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-[10px]">S</button>
                      </td>
                      <td className="p-2.5 text-red-400">1,50,900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Portfolio View with Positions & Holdings */}
          {activeTab === 'portfolio' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-xs">Total Un-realized P&L</span>
                  <h3 className="text-2xl font-bold text-green-400 mt-1">+₹0.00</h3>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs">Available Funds (Paper)</span>
                    <h3 className="text-2xl font-bold text-green-400 mt-1">₹{virtualFunds.toLocaleString('en-IN')}</h3>
                  </div>
                  <button onClick={() => setVirtualFunds(prev => prev + 100000)} className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded text-xs font-bold">+ Add Funds</button>
                </div>
              </div>

              {/* Portfolio Sub Tabs */}
              <div className="flex space-x-4 border-b border-gray-800 pb-3 mb-4 text-xs font-semibold">
                <button 
                  onClick={() => setPortfolioSubTab('positions')} 
                  className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'positions' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}
                >
                  Positions ({positions.length})
                </button>
                <button 
                  onClick={() => setPortfolioSubTab('holdings')} 
                  className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'holdings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}
                >
                  Holdings ({holdings.length})
                </button>
              </div>

              {/* Positions Table */}
              {portfolioSubTab === 'positions' && (
                <div className="flex-1">
                  {positions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">
                      No open positions available. Place trade from Option Chain or Watchlist.[cite: 7]
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400">
                          <th className="py-2">Instrument</th>
                          <th className="py-2">Type</th>
                          <th className="py-2">Qty</th>
                          <th className="py-2">Avg. Price</th>
                          <th className="py-2">P&L</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {positions.map(p => (
                          <tr key={p.id}>
                            <td className="py-3 font-bold text-white">{p.instrument}</td>
                            <td className={`py-3 font-bold ${p.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{p.type}</td>
                            <td className="py-3">{p.qty}</td>
                            <td className="py-3">₹{p.avgPrice}</td>
                            <td className="py-3 text-green-400">{p.pnl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Holdings Table */}
              {portfolioSubTab === 'holdings' && (
                <div className="flex-1">
                  {holdings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">
                      No holdings available. Buy stocks from watchlist to see here.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400">
                          <th className="py-2">Stock Name</th>
                          <th className="py-2">Qty</th>
                          <th className="py-2">Buy Price</th>
                          <th className="py-2">Current Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {holdings.map(h => (
                          <tr key={h.id}>
                            <td className="py-3 font-bold text-white">{h.instrument}</td>
                            <td className="py-3">{h.qty}</td>
                            <td className="py-3">₹{h.avgPrice}</td>
                            <td className="py-3 text-green-400">₹{h.avgPrice * 10}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}
        </main>

        {/* 🛒 Basket Drawer */}
        {showBasketPanel && (
          <div className="w-80 bg-[#12141c] border-l border-gray-800 p-4 flex flex-col justify-between shadow-2xl z-30">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <h3 className="font-bold text-sm text-purple-400">🛒 Order Basket</h3>
                <button onClick={() => setShowBasketPanel(false)} className="text-gray-400 hover:text-white text-xs font-bold">✕</button>
              </div>
              <div className="mt-4 text-xs text-gray-400 text-center py-8 border border-dashed border-gray-800 rounded-lg">
                No active orders in basket.
              </div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded text-xs">
              Execute Basket Orders
            </button>
          </div>
        )}
      </div>

      {/* 🔑 Upstox Access Token Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-amber-400 mb-2">🔑 Set Upstox Access Token</h3>
            <p className="text-xs text-gray-400 mb-4">Paste your daily Upstox API v2 Access Token for live feed connection.</p>
            <input 
              type="text" 
              placeholder="Paste Upstox Access Token..." 
              value={upstoxToken}
              onChange={(e) => setUpstoxToken(e.target.value)}
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2.5 text-xs text-gray-200 mb-4 focus:outline-none focus:border-purple-600"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowTokenModal(false)} className="px-4 py-1.5 rounded text-xs bg-gray-800 hover:bg-gray-700 text-gray-300">Cancel</button>
              <button onClick={handleSaveToken} className="px-4 py-1.5 rounded text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold">Save & Connect</button>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ Quick Trade Modal */}
      {showQuickTradeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <h3 className="text-sm font-bold text-blue-400">⚡ Quick Order Execution</h3>
              <button onClick={() => setShowQuickTradeModal(false)} className="text-gray-400 hover:text-white text-xs font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Symbol:</span>
                <span className="font-bold text-white">{selectedStock}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>LTP:</span>
                <span className="font-bold text-green-400">₹{currentStockObj.price.toFixed(2)}</span>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Quantity</label>
                <input type="number" defaultValue={50} className="w-full bg-[#0b0e14] border border-gray-800 rounded p-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => { executeTrade(selectedStock, currentStockObj.price, 'BUY', 'holding'); setShowQuickTradeModal(false); }} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded text-xs">BUY (Holding)</button>
                <button onClick={() => { executeTrade(selectedStock, currentStockObj.price, 'SELL', 'holding'); setShowQuickTradeModal(false); }} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded text-xs">SELL</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}