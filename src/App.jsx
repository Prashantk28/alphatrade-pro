import React, { useState, useEffect, useRef } from 'react';
import { FiMaximize2, FiSettings, FiSearch, FiUser, FiHelpCircle, FiMessageSquare, FiLogOut, FiFileText } from 'react-icons/fi';
import PlaceOrderPanel from './components/PlaceOrderPanel';
import ProfileModal from './components/ProfileModal';
import FeedbackModal from './components/FeedbackModal';
import AdvancedChart from './components/AdvancedChart';

const stockBasePrices = {
  'NIFTY 50': 24893.03,
  'BANKNIFTY': 47595.12,
  'RELIANCE': 2973.10,
  'TCS': 3942.49,
  'INFY': 1624.84,
  'HDFCBANK': 1466.97,
  'TATAMOTORS': 989.40,
  'WIPRO': 480.20,
  'ITC': 430.50,
  'SBIN': 790.15
};

export default function App() {
  // localStorage मधून डेटा वाचणे जेणेकरून रिफ्रेश झाल्यावर काहीही डिलीट होणार नाही
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('alpha_isLoggedIn') === 'true';
  });
  
  const [authMode, setAuthMode] = useState('login'); 
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  const [watchlistSearch, setWatchlistSearch] = useState('');
  const [newStockInput, setNewStockInput] = useState('');
  const [selectedOptionSymbol, setSelectedOptionSymbol] = useState('NIFTY');

  // Upstox Token localStorage मध्ये सेव्ह राहणे
  const [isUpstoxConnected, setIsUpstoxConnected] = useState(() => {
    return localStorage.getItem('alpha_upstoxConnected') === 'true';
  });
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBasketPanel, setShowBasketPanel] = useState(false);
  const [showQuickTradeModal, setShowQuickTradeModal] = useState(false);
  const [upstoxToken, setUpstoxToken] = useState('');

  const [selectedOrderStock, setSelectedOrderStock] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [portfolioSubTab, setPortfolioSubTab] = useState('positions');
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [virtualFunds, setVirtualFunds] = useState(485240.00);

  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // वॉचलिस्ट स्टॉक्स localStorage मधून लोड करणे
  const [stocks, setStocks] = useState(() => {
    const savedStocks = localStorage.getItem('alpha_watchlist');
    if (savedStocks) {
      try { return JSON.parse(savedStocks); } catch (e) { }
    }
    return [
      { name: 'NIFTY 50', price: 24893.03, change: '+1.26 (+0.01%)', isUp: true },
      { name: 'BANKNIFTY', price: 47595.12, change: '-0.81 (-0.01%)', isUp: false },
      { name: 'RELIANCE', price: 2973.10, change: '+0.02 (+0.00%)', isUp: true },
      { name: 'TCS', price: 3942.49, change: '+0.41 (+0.00%)', isUp: true },
      { name: 'INFY', price: 1624.84, change: '+0.03 (+0.00%)', isUp: true },
      { name: 'HDFCBANK', price: 1466.97, change: '+0.24 (+0.00%)', isUp: true },
      { name: 'TATAMOTORS', price: 989.40, change: '+0.64 (+0.01%)', isUp: true },
    ];
  });

  // स्टेट बदलल्यावर localStorage मध्ये डेटा सेव्ह करणे
  useEffect(() => {
    localStorage.setItem('alpha_isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('alpha_upstoxConnected', isUpstoxConnected);
  }, [isUpstoxConnected]);

  useEffect(() => {
    localStorage.setItem('alpha_watchlist', JSON.stringify(stocks));
  }, [stocks]);

  const optionSymbols = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'];
  const currentStockObj = stocks.find(s => s.name === selectedStock) || stocks[0];

  const symbolBasePrices = {
    'NIFTY': 24900,
    'SENSEX': 81200,
    'BANKNIFTY': 52100,
    'FINNIFTY': 23400,
    'MIDCPNIFTY': 12500,
    'CRUDEOIL': 6150,
    'NATURALGAS': 245,
    'GOLD': 76500,
    'SILVER': 91200
  };

  const getDynamicOptionRows = (sym) => {
    const base = symbolBasePrices[sym] || 10000;
    const step = sym === 'GOLD' ? 500 : sym === 'SILVER' ? 1000 : sym === 'CRUDEOIL' ? 100 : sym === 'NATURALGAS' ? 10 : sym === 'SENSEX' ? 200 : 100;
    
    return [-2, -1, 0, 1, 2].map((offset) => {
      const strike = base + (offset * step);
      return {
        strike,
        callVol: `${(15 + Math.abs(offset) * 3).toFixed(2)} L`,
        callIV: (18.5 + offset * 0.2).toFixed(2),
        callVega: '27.45',
        callGamma: '0.0003',
        callTheta: '-85.20',
        callDelta: '0.55',
        callOIChg: `+${12000 + offset * 1500}`,
        callOILakhs: (2.4 + offset * 0.3).toFixed(2),
        callLTP: parseFloat((250 - offset * 35).toFixed(2)),
        putLTP: parseFloat((210 + offset * 35).toFixed(2)),
        putOILakhs: (2.1 - offset * 0.2).toFixed(2),
        putOIChg: `+${10000 - offset * 1200}`,
        putDelta: '-0.45',
        putTheta: '-92.10',
        putGamma: '0.0003',
        putVega: '28.10',
        putIV: '20.40',
        putVol: `${(18 + Math.abs(offset) * 2).toFixed(2)} L`
      };
    });
  };

  const [optionRows, setOptionRows] = useState(() => getDynamicOptionRows('NIFTY'));

  useEffect(() => {
    setOptionRows(getDynamicOptionRows(selectedOptionSymbol));
  }, [selectedOptionSymbol]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const changeVal = (Math.random() - 0.48) * (stock.price * 0.001);
          const newPrice = parseFloat((stock.price + changeVal).toFixed(2));
          return { ...stock, price: newPrice, isUp: changeVal >= 0 };
        })
      );

      setOptionRows(prevRows =>
        prevRows.map(row => ({
          ...row,
          callLTP: Math.max(5, parseFloat((row.callLTP + (Math.random() - 0.48) * 3).toFixed(2))),
          putLTP: Math.max(5, parseFloat((row.putLTP + (Math.random() - 0.48) * 3).toFixed(2))),
        }))
      );

      setPositions(prevPos =>
        prevPos.map(pos => {
          const priceChange = (Math.random() - 0.48) * 4;
          const newLtp = parseFloat((pos.ltp + priceChange).toFixed(2));
          const diff = pos.type === 'BUY' ? (newLtp - pos.avgPrice) : (pos.avgPrice - newLtp);
          const totalPnlVal = parseFloat((diff * 25).toFixed(2));
          return {
            ...pos,
            ltp: newLtp,
            pnlVal: totalPnlVal,
            pnl: `${totalPnlVal >= 0 ? '+' : ''}₹${totalPnlVal}`
          };
        })
      );

      setHoldings(prevHold =>
        prevHold.map(h => {
          const currStock = stocks.find(s => s.name === h.instrument);
          const currentVal = currStock ? currStock.price * 10 : h.avgPrice * 10;
          const pnlVal = currentVal - (h.avgPrice * 10);
          return {
            ...h,
            currentVal: parseFloat(currentVal.toFixed(2)),
            pnlVal: parseFloat(pnlVal.toFixed(2)),
            pnl: `${pnlVal >= 0 ? '+' : ''}₹${pnlVal.toFixed(2)}`
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoggedIn, stocks]);

  const handleSaveToken = () => {
    if (upstoxToken.trim() !== '') {
      setIsUpstoxConnected(true);
      setShowTokenModal(false);
      alert("Upstox Access Token Validated & Connected Successfully!");
    } else {
      alert("Please enter a valid Upstox Access Token.");
    }
  };

  const handleAddStockToWatchlist = (e) => {
    e.preventDefault();
    const sym = newStockInput.trim().toUpperCase();
    if (!sym) return;

    if (stocks.some(s => s.name === sym)) {
      alert(`${sym} आधीपासूनच वॉचलिस्टमध्ये आहे.`);
      return;
    }

    const baseP = stockBasePrices[sym] || 1500.00;
    setStocks([...stocks, { name: sym, price: baseP, change: '+0.50 (+0.03%)', isUp: true }]);
    setNewStockInput('');
    alert(`${sym} वॉचलिस्टमध्ये यशस्वीरीत्या जोडला गेला!`);
  };

  const executeTrade = (instrumentName, price, type, category = 'position', quantity = 1) => {
    const tradeTime = new Date().toLocaleTimeString();
    const newTrade = {
      id: Date.now(),
      instrument: instrumentName,
      qty: category === 'position' ? `${quantity} Lot (${quantity * 25} Qty)` : `${quantity * 10} Qty`,
      avgPrice: price,
      ltp: price,
      pnlVal: 0.00,
      pnl: '+₹0.00',
      type: type,
      time: tradeTime,
      status: 'COMPLETE',
      currentVal: price * 10
    };

    setOrderHistory([newTrade, ...orderHistory]);

    if (category === 'position') {
      setPositions([newTrade, ...positions]);
      alert(`Successfully ${type}ed ${instrumentName} at ₹${price}! Added to Positions.`);
    } else {
      setHoldings([newTrade, ...holdings]);
      alert(`Successfully ${type}ed ${instrumentName} at ₹${price}! Added to Holdings.`);
    }
  };

  const totalUnrealizedPnL = positions.reduce((acc, curr) => acc + (curr.pnlVal || 0), 0);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col items-center justify-center font-sans p-4">
        <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="mb-6">
            <span className="bg-purple-600 text-white font-bold px-4 py-1.5 rounded-lg text-base tracking-wide shadow-md">
              AlphaTrade Pro
            </span>
            <p className="text-gray-400 text-xs mt-2">
              {authMode === 'login' && 'Login to your trading terminal'}
              {authMode === 'register' && 'Create a new Paper Trading account'}
              {authMode === 'forgot' && 'Password Recovery via Email'}
              {authMode === 'resetNew' && 'Set New Password'}
            </p>
          </div>

          {authMode === 'login' && (
            <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-gray-400 mb-1">EMAIL ADDRESS</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>
              
              <div className="flex justify-end text-xs">
                <button type="button" onClick={() => { setAuthMode('forgot'); setResetSent(false); }} className="text-purple-400 hover:underline cursor-pointer">
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2">
                Login to Terminal &rarr;
              </button>

              <div className="text-center pt-3 border-t border-gray-800 text-xs text-gray-400">
                Don't have an account?{' '}
                <button type="button" onClick={() => setAuthMode('register')} className="text-purple-400 font-bold hover:underline cursor-pointer">
                  Register Now
                </button>
              </div>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={(e) => { e.preventDefault(); alert("Registration successful! Please login."); setAuthMode('login'); }} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-gray-400 mb-1">FULL NAME</label>
                <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">EMAIL ADDRESS</label>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">CREATE PASSWORD</label>
                <input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2">
                Create Account &rarr;
              </button>

              <div className="text-center pt-3 border-t border-gray-800 text-xs text-gray-400">
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthMode('login')} className="text-purple-400 font-bold hover:underline cursor-pointer">
                  Login Here
                </button>
              </div>
            </form>
          )}

          {authMode === 'forgot' && (
            <div className="space-y-4 text-left">
              {!resetSent ? (
                <form onSubmit={(e) => { e.preventDefault(); setResetSent(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">ENTER REGISTERED EMAIL</label>
                    <input type="email" placeholder="name@hokvic.gov.in" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2">
                    Send Reset Link to Email &rarr;
                  </button>
                </form>
              ) : (
                <div className="bg-green-950/40 border border-green-500/40 p-4 rounded-xl text-center space-y-3">
                  <p className="text-green-400 text-xs font-bold">✓ Password Reset Link Sent Successfully!</p>
                  <p className="text-gray-300 text-[11px]">We have sent a secure password reset link to <strong className="text-white">{email}</strong>.</p>
                  <button onClick={() => setAuthMode('resetNew')} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-xs cursor-pointer">
                    Click here to Set New Password &rarr;
                  </button>
                </div>
              )}

              <div className="text-center pt-3 border-t border-gray-800 text-xs text-gray-400">
                Remembered password?{' '}
                <button type="button" onClick={() => { setAuthMode('login'); setResetSent(false); }} className="text-purple-400 font-bold hover:underline cursor-pointer">
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {authMode === 'resetNew' && (
            <form onSubmit={(e) => { e.preventDefault(); setPassword(newPassword); alert("Password updated successfully! Please login with your new password."); setAuthMode('login'); setResetSent(false); }} className="space-y-4 text-left">
              <div>
                <label className="block text-xs text-gray-400 mb-1">NEW PASSWORD</label>
                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2">
                Update Password & Login &rarr;
              </button>

              <div className="text-center pt-3 border-t border-gray-800 text-xs text-gray-400">
                <button type="button" onClick={() => setAuthMode('login')} className="text-purple-400 font-bold hover:underline cursor-pointer">
                  Cancel & Back to Login
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative overflow-hidden">
      
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
        </div>

        <nav className="flex items-center space-x-1">
          <button onClick={() => setActiveTab('chart')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>📊 Chart</button>
          <button onClick={() => setActiveTab('optionChain')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Option Chain</button>
          <button onClick={() => setActiveTab('portfolio')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Portfolio & History</button>
        </nav>

        {/* Upstox Connection & Profile Dropdown */}
        <div className="flex items-center space-x-3 relative">
          {isUpstoxConnected ? (
            <div className="flex items-center space-x-1.5 bg-green-950/60 border border-green-500/40 px-3 py-1 rounded-lg text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 font-bold">Upstox Connected</span>
            </div>
          ) : (
            <button onClick={() => setShowTokenModal(true)} className="bg-amber-600/20 border border-amber-600/50 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-amber-600/30 transition-all cursor-pointer">🔑 Set Upstox Token</button>
          )}

          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="bg-purple-700 hover:bg-purple-600 text-white font-bold w-8 h-8 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer transition-all">PK</button>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-64 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 font-sans text-xs">
              <div className="px-4 py-3 border-b border-gray-800">
                <p className="text-gray-200 font-bold flex items-center gap-1.5"><FiUser size={14}/> Prashant Kamble</p>
                <p className="text-[10px] text-gray-400 mt-0.5">User ID: 122758</p>
              </div>
              <div className="py-1 text-gray-300">
                <button onClick={() => { setShowProfileMenu(false); setShowProfileModal(true); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><span>👤 My Account | ID 122758</span></button>
                <button onClick={() => { setShowProfileMenu(false); alert("F&O and MCX segments are active for Paper Trading."); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer text-green-400"><span>⚡ Activate F&O, MCX</span></button>
                <button onClick={() => { setShowProfileMenu(false); alert("Opening My Reports..."); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><FiFileText size={13}/><span>My Reports</span></button>
                <button onClick={() => { setShowProfileMenu(false); alert("Settings panel open."); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><FiSettings size={13}/><span>Settings</span></button>
                <button onClick={() => { setShowProfileMenu(false); setShowFeedbackModal(true); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer text-purple-400"><FiMessageSquare size={13}/><span>Send Feedback</span></button>
                <button onClick={() => { setShowProfileMenu(false); alert("Help & Support: support@hokvic.gov.in"); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><FiHelpCircle size={13}/><span>Help & Support</span></button>
              </div>
              <div className="border-t border-gray-800 pt-1">
                <button onClick={() => { setShowProfileMenu(false); setIsLoggedIn(false); setAuthMode('login'); localStorage.removeItem('alpha_isLoggedIn'); }} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold cursor-pointer"><FiLogOut size={13}/><span>Logout</span></button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <aside className="w-80 bg-[#12141c] border-r border-gray-800 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
              <span>Watchlist (Live TBT)</span>
              <span className="text-purple-400 font-bold">{stocks.length} Stocks</span>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500"><FiSearch size={13} /></span>
              <input 
                type="text" 
                placeholder="Search stock eg: INFY, TCS..." 
                value={watchlistSearch}
                onChange={(e) => setWatchlistSearch(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <form onSubmit={handleAddStockToWatchlist} className="flex space-x-1 pt-1">
              <input 
                type="text" 
                placeholder="Add Symbol (e.g. WIPRO)" 
                value={newStockInput}
                onChange={(e) => setNewStockInput(e.target.value)}
                className="flex-1 bg-[#0b0e14] border border-gray-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-600"
              />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer">+</button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
            {stocks
              .filter(stock => stock.name.toLowerCase().includes(watchlistSearch.toLowerCase()))
              .map((stock, idx) => (
                <div key={idx} className={`p-3 hover:bg-gray-800/60 transition-all flex items-center justify-between cursor-pointer ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`} onClick={() => setSelectedStock(stock.name)}>
                  <div>
                    <p className="text-xs font-bold text-white">{stock.name}</p>
                    <span className="text-[10px] text-gray-400">NSE</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    <span className={`text-[10px] font-semibold ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>{stock.change}</span>
                  </div>
                </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-[#0b0e14] p-4 flex flex-col overflow-y-auto">
          {activeTab === 'chart' && (
            <div className="w-full h-full flex flex-col">
              <AdvancedChart symbol={selectedStock} ltp={currentStockObj.price} />
            </div>
          )}

          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-2xl flex-1 flex flex-col font-sans text-gray-100 overflow-hidden">
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-400 mr-2">Option Chain:</span>
                {optionSymbols.map((sym) => (
                  <button key={sym} onClick={() => setSelectedOptionSymbol(sym)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedOptionSymbol === sym ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'}`}>{sym}</button>
                ))}
              </div>

              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="font-bold text-purple-400">📊 Upstox Pro Style Option Chain - {selectedOptionSymbol}</span>
                <span className="text-gray-400">Click <strong className="text-blue-400">[B]</strong> to Buy or <strong className="text-red-400">[S]</strong> to Sell</span>
              </div>

              <div className="overflow-x-auto flex-1 border border-gray-800 rounded-lg">
                <table className="w-full text-left text-[11px] text-gray-300 border-collapse whitespace-nowrap font-mono">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-center uppercase tracking-wider text-[10px]">
                      <th className="p-2.5 border-r border-gray-800/60 bg-blue-950/20" colSpan="10">Calls (CE)</th>
                      <th className="p-2.5 bg-gray-900 font-bold text-amber-400">STRIKE</th>
                      <th className="p-2.5 border-l border-gray-800/60 bg-red-950/20" colSpan="10">Puts (PE)</th>
                    </tr>
                    <tr className="bg-gray-900/90 text-gray-400 border-b border-gray-800 text-[10px]">
                      <th className="p-2">Volume</th><th className="p-2">IV</th><th className="p-2">Vega</th><th className="p-2">Gamma</th><th className="p-2">Theta</th><th className="p-2">Delta</th><th className="p-2">OI (chg)</th><th className="p-2">OI (Lakhs)</th><th className="p-2">LTP</th><th className="p-2 border-r border-gray-800">Action</th>
                      <th className="p-2 text-center bg-gray-900 font-bold text-amber-400">PRICE</th>
                      <th className="p-2 border-l border-gray-800">Action</th><th className="p-2">LTP</th><th className="p-2">OI (Lakhs)</th><th className="p-2">OI (chg)</th><th className="p-2">Delta</th><th className="p-2">Theta</th><th className="p-2">Gamma</th><th className="p-2">Vega</th><th className="p-2">IV</th><th className="p-2">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {optionRows.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/45 transition-colors text-center">
                        <td className="p-2 text-gray-400">{r.callVol}</td><td className="p-2 text-gray-400">{r.callIV}</td><td className="p-2 text-gray-400">{r.callVega}</td><td className="p-2 text-gray-400">{r.callGamma}</td><td className="p-2 text-gray-400">{r.callTheta}</td><td className="p-2 text-gray-400">{r.callDelta}</td><td className="p-2 text-green-400">{r.callOIChg}</td><td className="p-2 text-blue-400 font-bold">{r.callOILakhs}</td>
                        <td className="p-2 text-amber-400 font-bold animate-pulse">₹{r.callLTP.toFixed(2)}</td>
                        <td className="p-2 border-r border-gray-800 space-x-1">
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} CE`, price: r.callLTP, actionType: 'BUY', category: 'position' })} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} CE`, price: r.callLTP, actionType: 'SELL', category: 'position' })} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                        </td>

                        <td className="p-2 font-bold text-white bg-gray-900/80 border-x border-gray-800 text-xs">{r.strike}</td>

                        <td className="p-2 border-l border-gray-800 space-x-1">
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} PE`, price: r.putLTP, actionType: 'BUY', category: 'position' })} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} PE`, price: r.putLTP, actionType: 'SELL', category: 'position' })} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                        </td>
                        <td className="p-2 text-amber-400 font-bold animate-pulse">₹{r.putLTP.toFixed(2)}</td>
                        <td className="p-2 text-blue-400 font-bold">{r.putOILakhs}</td><td className="p-2 text-green-400">{r.putOIChg}</td><td className="p-2 text-gray-400">{r.putDelta}</td><td className="p-2 text-gray-400">{r.putTheta}</td><td className="p-2 text-gray-400">{r.putGamma}</td><td className="p-2 text-gray-400">{r.putVega}</td><td className="p-2 text-gray-400">{r.putIV}</td><td className="p-2 text-gray-400">{r.putVol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="flex-1 bg-[#12141c] border border-gray-800 rounded-xl p-4 flex flex-col text-xs text-white">
              <h2 className="text-sm font-bold mb-3">Portfolio & Order History Log</h2>
              <div className="flex space-x-4 border-b border-gray-800 pb-2 mb-3">
                <button onClick={() => setPortfolioSubTab('positions')} className={`font-bold cursor-pointer ${portfolioSubTab === 'positions' ? 'text-purple-400' : 'text-gray-400'}`}>Positions ({positions.length})</button>
                <button onClick={() => setPortfolioSubTab('holdings')} className={`font-bold cursor-pointer ${portfolioSubTab === 'holdings' ? 'text-purple-400' : 'text-gray-400'}`}>Holdings ({holdings.length})</button>
                <button onClick={() => setPortfolioSubTab('history')} className={`font-bold cursor-pointer ${portfolioSubTab === 'history' ? 'text-purple-400' : 'text-gray-400'}`}>Order History ({orderHistory.length})</button>
              </div>

              {portfolioSubTab === 'positions' && (
                <div className="overflow-x-auto flex-1">
                  {positions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No open positions.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Instrument</th><th className="p-2">Type</th><th className="p-2">Qty</th><th className="p-2">Avg Price</th><th className="p-2">P&L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map(p => (
                          <tr key={p.id} className="border-b border-gray-800">
                            <td className="p-2 font-bold">{p.instrument}</td>
                            <td className={`p-2 font-bold ${p.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{p.type}</td>
                            <td className="p-2">{p.qty}</td>
                            <td className="p-2">₹{p.avgPrice}</td>
                            <td className={`p-2 font-bold ${p.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{p.pnl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'holdings' && (
                <div className="overflow-x-auto flex-1">
                  {holdings.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No holdings available.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Stock Name</th><th className="p-2">Qty</th><th className="p-2">Buy Price</th><th className="p-2">Current Value</th><th className="p-2">P&L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map(h => (
                          <tr key={h.id} className="border-b border-gray-800">
                            <td className="p-2 font-bold">{h.instrument}</td>
                            <td className="p-2">{h.qty}</td>
                            <td className="p-2">₹{h.avgPrice}</td>
                            <td className="p-2 text-amber-400">₹{h.currentVal}</td>
                            <td className={`p-2 font-bold ${h.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{h.pnl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'history' && (
                <div className="overflow-x-auto flex-1">
                  {orderHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No order history available.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Time</th><th className="p-2">Instrument</th><th className="p-2">Type</th><th className="p-2">Qty</th><th className="p-2">Price</th><th className="p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderHistory.map(ord => (
                          <tr key={ord.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                            <td className="p-2 text-gray-400">{ord.time}</td>
                            <td className="p-2 font-bold text-white">{ord.instrument}</td>
                            <td className={`p-2 font-bold ${ord.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{ord.type}</td>
                            <td className="p-2">{ord.qty}</td>
                            <td className="p-2 text-amber-400">₹{ord.avgPrice}</td>
                            <td className="p-2 text-green-400 font-bold">{ord.status}</td>
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
      </div>

      {/* Modals */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-amber-400 mb-2">🔑 Set Upstox Access Token</h3>
            <input type="text" placeholder="Paste Upstox Access Token..." value={upstoxToken} onChange={(e) => setUpstoxToken(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2.5 text-xs text-gray-200 mb-4 focus:outline-none focus:border-purple-600" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowTokenModal(false)} className="px-4 py-1.5 rounded text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 cursor-pointer">Cancel</button>
              <button onClick={handleSaveToken} className="px-4 py-1.5 rounded text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer">Save & Connect</button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <ProfileModal 
          email={email} 
          onClose={() => setShowProfileModal(false)} 
          onLogout={() => { setIsLoggedIn(false); setShowProfileModal(false); localStorage.removeItem('alpha_isLoggedIn'); }} 
        />
      )}

      {showFeedbackModal && (
        <FeedbackModal 
          onClose={() => setShowFeedbackModal(false)} 
        />
      )}

      {selectedOrderStock && (
        <div className="absolute right-0 top-0 h-full z-50 shadow-2xl">
          <PlaceOrderPanel 
            stock={{ symbol: selectedOrderStock.symbol, price: selectedOrderStock.price, exchange: 'NSE' }}
            actionType={selectedOrderStock.actionType}
            onClose={() => setSelectedOrderStock(null)}
            onPlaceOrder={(orderDetails) => {
              executeTrade(orderDetails.symbol, orderDetails.price, orderDetails.action, 'position', orderDetails.quantity);
              setSelectedOrderStock(null);
            }}
          />
        </div>
      )}
    </div>
  );
}