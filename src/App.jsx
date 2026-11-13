import React, { useState, useEffect } from 'react';
import { FiSettings, FiSearch, FiUser, FiHelpCircle, FiMessageSquare, FiLogOut, FiFileText, FiShare2, FiPieChart, FiDollarSign, FiPlusCircle, FiAward, FiTrendingUp, FiTrendingDown, FiX, FiEdit2, FiPlus } from 'react-icons/fi';
import PlaceOrderPanel from './components/PlaceOrderPanel';
import ProfileModal from './components/ProfileModal';
import FeedbackModal from './components/FeedbackModal';
import AdvancedChart from './components/AdvancedChart';
import MarketOverview from './components/MarketOverview';

const stockBasePrices = {
  'EXIDEIND': 381.45,
  'DHANSAFAL': 105.50,
  'PVRINOX': 1597.70,
  'PNB': 139.83,
  'PCBL': 288.55,
  'GTLINFRA': 1.11,
  'ONGC': 226.18,
  'CIPLA': 1409.60,
  'IDFCFIRSTB': 81.80,
  'PNBHOUSING': 1149.70,
  'TECHM': 1779.10,
  'SPENCERS': 22.85,
  'COALINDIA': 403.35,
  'HINDZINC': 571.60,
  'NIFTY 50': 24893.03,
  'BANKNIFTY': 61104.90,
  'SENSEX': 81840.23,
  'RELIANCE': 2973.10,
  'TCS': 3942.49,
  'INFY': 1624.84,
  'HDFCBANK': 1466.97,
  'TATAMOTORS': 989.40,
  'WIPRO': 480.20
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [activeTab, setActiveTab] = useState('marketPulse');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('EXIDEIND');

  // **डायनॅमिक वॉचलिस्ट ग्रुप्स आणि नावे (Dynamic Watchlist Groups & Custom Names)**
  const [watchlistGroupKeys, setWatchlistGroupKeys] = useState(['1', '2', '3', '4', '5']);
  const [watchlistGroupNames, setWatchlistGroupNames] = useState({
    '1': 'Group 1',
    '2': 'Group 2',
    '3': 'Group 3',
    '4': 'Group 4',
    '5': 'Group 5'
  });
  const [activeWatchlistGroup, setActiveWatchlistGroup] = useState('1');
  const [editingGroupNameKey, setEditingGroupNameKey] = useState(null);
  const [tempGroupNameInput, setTempGroupNameInput] = useState('');

  const [watchlistSearch, setWatchlistSearch] = useState('');
  const [newStockInput, setNewStockInput] = useState('');
  const [selectedOptionSymbol, setSelectedOptionSymbol] = useState('SENSEX');
  const [selectedExpiry, setSelectedExpiry] = useState('12 Nov 2026');

  const [isUpstoxConnected, setIsUpstoxConnected] = useState(() => {
    return localStorage.getItem('upstox_connected') === 'true';
  });
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [upstoxToken, setUpstoxToken] = useState(() => {
    return localStorage.getItem('upstox_token') || '';
  });

  const [selectedOrderStock, setSelectedOrderStock] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [shareCardData, setShareCardData] = useState(null);
  const [exitModalData, setExitModalData] = useState(null);

  const [portfolioSubTab, setPortfolioSubTab] = useState('holdings');
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [gttOrders, setGttOrders] = useState([]);

  const [totalFunds, setTotalFunds] = useState(500000.00);
  const [usedMargin, setUsedMargin] = useState(14500.00);

  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [watchlistGroups, setWatchlistGroups] = useState({
    '1': [
      { name: 'DHANSAFAL', exchange: 'BSE X', price: 105.50, changeNum: -0.07, changePct: -0.55, isUp: false, high: 108.00, low: 104.00 },
      { name: 'EXIDEIND', exchange: 'NSE EQ', price: 382.00, changeNum: -3.95, changePct: -1.02, isUp: false, high: 384.00, low: 378.50 },
      { name: 'PVRINOX', exchange: 'NSE EQ', price: 1591.00, changeNum: 7.60, changePct: 0.48, isUp: true, high: 1610.00, low: 1580.00 },
      { name: 'PNB', exchange: 'NSE EQ', price: 139.60, changeNum: 1.12, changePct: 0.81, isUp: true, high: 142.00, low: 138.00 },
      { name: 'PCBL', exchange: 'NSE EQ', price: 286.30, changeNum: 5.75, changePct: 2.05, isUp: true, high: 292.00, low: 280.00 },
      { name: 'GTLINFRA', exchange: 'NSE EQ', price: 1.10, changeNum: -0.01, changePct: -0.90, isUp: false, high: 1.15, low: 1.10 },
      { name: 'ONGC', exchange: 'NSE EQ', price: 225.45, changeNum: -9.35, changePct: -3.98, isUp: false, high: 235.00, low: 224.00 },
      { name: 'CIPLA', exchange: 'NSE EQ', price: 1404.00, changeNum: -15.90, changePct: -1.12, isUp: false, high: 1425.00, low: 1400.00 },
      { name: 'IDFCFIRSTB', exchange: 'NSE EQ', price: 81.03, changeNum: 0.80, changePct: 1.00, isUp: true, high: 83.00, low: 80.00 },
      { name: 'PNBHOUSING', exchange: 'NSE EQ', price: 1149.40, changeNum: 27.70, changePct: 2.47, isUp: true, high: 1160.00, low: 1120.00 },
      { name: 'TECHM', exchange: 'NSE EQ', price: 1772.40, changeNum: -16.10, changePct: -0.90, isUp: false, high: 1795.00, low: 1770.00 },
      { name: 'SPENCERS', exchange: 'NSE EQ', price: 22.85, changeNum: 1.08, changePct: 4.96, isUp: true, high: 23.50, low: 21.50 },
      { name: 'COALINDIA', exchange: 'NSE EQ', price: 402.90, changeNum: -3.40, changePct: -0.84, isUp: false, high: 410.00, low: 400.00 },
      { name: 'HINDZINC', exchange: 'NSE EQ', price: 567.80, changeNum: -11.20, changePct: -1.93, isUp: false, high: 585.00, low: 568.00 }
    ],
    '2': [
      { name: 'NIFTY 50', exchange: 'NSE EQ', price: 24893.03, changeNum: 1.26, changePct: 0.01, isUp: true, high: 25050.00, low: 24780.00 },
      { name: 'BANKNIFTY', exchange: 'NSE EQ', price: 61104.90, changeNum: 312.50, changePct: 0.51, isUp: true, high: 61300.00, low: 60800.00 },
      { name: 'SENSEX', exchange: 'BSE X', price: 81840.23, changeNum: -39.17, changePct: -0.05, isUp: false, high: 82100.00, low: 81500.00 }
    ],
    '3': [
      { name: 'TCS', exchange: 'NSE EQ', price: 3942.49, changeNum: 0.41, changePct: 0.00, isUp: true, high: 3970.00, low: 3920.00 },
      { name: 'INFY', exchange: 'NSE EQ', price: 1624.84, changeNum: 0.03, changePct: 0.00, isUp: true, high: 1640.00, low: 1610.00 },
      { name: 'HDFCBANK', exchange: 'NSE EQ', price: 1466.97, changeNum: 0.24, changePct: 0.00, isUp: true, high: 1485.00, low: 1455.00 }
    ],
    '4': [],
    '5': []
  });

  const currentGroupStocks = watchlistGroups[activeWatchlistGroup] || [];
  const currentStockObj = currentGroupStocks.find(s => s.name === selectedStock) || currentGroupStocks[0] || { name: 'EXIDEIND', price: 381.45, high: 384, low: 378 };

  const optionSymbols = ['NIFTY 50', 'BANKNIFTY', 'SENSEX', 'FINNIFTY', 'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'];
  const expiryDates = ['12 Nov 2026', '19 Nov 2026', '26 Nov 2026', '03 Dec 2026', '10 Dec 2026', '17 Dec 2026', '24 Dec 2026'];

  const symbolBasePrices = {
    'NIFTY 50': 24900,
    'SENSEX': 81840,
    'BANKNIFTY': 61104,
    'FINNIFTY': 23400,
    'MIDCPNIFTY': 12500,
    'CRUDEOIL': 6150,
    'NATURALGAS': 245,
    'GOLD': 76500,
    'SILVER': 91200
  };

  const getDetailedOptionRows = (sym) => {
    const base = symbolBasePrices[sym] || 81840;
    const step = sym === 'GOLD' ? 500 : sym === 'SILVER' ? 1000 : sym === 'CRUDEOIL' ? 100 : sym === 'NATURALGAS' ? 10 : sym === 'SENSEX' ? 100 : 100;
    
    return [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((offset) => {
      const strike = base + (offset * step);
      return {
        strike,
        callVol: `${(8.98 + Math.abs(offset) * 2.5).toFixed(2)} L`,
        callIV: (30.48 + offset * 0.2).toFixed(2),
        callVega: (3.3767 + offset * 0.1).toFixed(4),
        callGamma: '0.0004',
        callTheta: (-372.2445 + offset * 10).toFixed(4),
        callDelta: (0.8696 - offset * 0.05).toFixed(4),
        callOIChg: `${-28641 + offset * 1500}`,
        callOILakhs: (21.4 + offset * 1.2).toFixed(2),
        callLTP: parseFloat((492.30 - offset * 70).toFixed(2)),
        putLTP: parseFloat((235.55 + offset * 70).toFixed(2)),
        putOILakhs: (31.69 - offset * 0.8).toFixed(2),
        putOIChg: `+${113440 + offset * 2500}`,
        putDelta: (-0.5425 + offset * 0.04).toFixed(4),
        putTheta: (-744.3559 - offset * 10).toFixed(4),
        putGamma: '0.0008',
        putVega: '6.3189',
        putIV: '32.57',
        putVolume: `${(8.18 + Math.abs(offset) * 1.5).toFixed(2)} Cr`
      };
    });
  };

  const [optionRows, setOptionRows] = useState(() => getDetailedOptionRows('SENSEX'));

  useEffect(() => {
    setOptionRows(getDetailedOptionRows(selectedOptionSymbol));
  }, [selectedOptionSymbol]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = setInterval(() => {
      setWatchlistGroups(prevGroups => {
        const updated = { ...prevGroups };
        Object.keys(updated).forEach(grpKey => {
          updated[grpKey] = updated[grpKey].map(stock => {
            const delta = (Math.random() - 0.48) * (stock.price * 0.0012);
            const newPrice = parseFloat((stock.price + delta).toFixed(2));
            const newChangeNum = parseFloat((stock.changeNum + delta).toFixed(2));
            const baseOrig = newPrice - newChangeNum;
            const newChangePct = baseOrig !== 0 ? parseFloat(((newChangeNum / baseOrig) * 100).toFixed(2)) : 0.00;
            return {
              ...stock,
              price: newPrice,
              changeNum: newChangeNum,
              changePct: newChangePct,
              isUp: delta >= 0,
              high: Math.max(stock.high || newPrice, newPrice),
              low: Math.min(stock.low || newPrice, newPrice)
            };
          });
        });
        return updated;
      });

      setOptionRows(prevRows =>
        prevRows.map(row => {
          const callDelta = (Math.random() - 0.47) * 3.5;
          const putDelta = (Math.random() - 0.47) * 3.5;
          const newCallLTP = Math.max(2.00, parseFloat((row.callLTP + callDelta).toFixed(2)));
          const newPutLTP = Math.max(2.00, parseFloat((row.putLTP + putDelta).toFixed(2)));
          return {
            ...row,
            callLTP: newCallLTP,
            putLTP: newPutLTP,
            callIsUp: callDelta >= 0,
            putIsUp: putDelta >= 0
          };
        })
      );

      setPositions(prevPos =>
        prevPos.map(pos => {
          const priceChange = (Math.random() - 0.48) * 3;
          const newLtp = parseFloat((pos.ltp + priceChange).toFixed(2));
          const diff = pos.type === 'BUY' ? (newLtp - pos.avgPrice) : (pos.avgPrice - newLtp);
          const totalPnlVal = parseFloat((diff * 10).toFixed(2));
          return {
            ...pos,
            ltp: newLtp,
            pnlVal: totalPnlVal,
            pnl: `${totalPnlVal >= 0 ? '+' : ''}₹${totalPnlVal.toFixed(2)}`
          };
        })
      );

      setHoldings(prevHold =>
        prevHold.map(h => {
          const priceChange = (Math.random() - 0.48) * 2;
          const newCurrVal = parseFloat((h.currentVal + priceChange).toFixed(2));
          const pnlVal = parseFloat((newCurrVal - (h.avgPrice * 10)).toFixed(2));
          return {
            ...h,
            currentVal: newCurrVal,
            pnlVal: pnlVal,
            pnl: `${pnlVal >= 0 ? '+' : ''}₹${pnlVal.toFixed(2)}`
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoggedIn]);

  const handleSaveToken = () => {
    if (upstoxToken.trim() !== '') {
      setIsUpstoxConnected(true);
      setShowTokenModal(false);
      localStorage.setItem('upstox_connected', 'true');
      localStorage.setItem('upstox_token', upstoxToken.trim());
      alert("Upstox Access Token Validated & Connected Successfully!");
    } else {
      alert("Please enter a valid Upstox Access Token.");
    }
  };

  const handleAddNewWatchlistGroup = () => {
    const newKey = `group_${Date.now()}`;
    const newName = `My Group ${watchlistGroupKeys.length + 1}`;
    setWatchlistGroupKeys([...watchlistGroupKeys, newKey]);
    setWatchlistGroupNames({ ...watchlistGroupNames, [newKey]: newName });
    setWatchlistGroups({ ...watchlistGroups, [newKey]: [] });
    setActiveWatchlistGroup(newKey);
    alert(`New Watchlist Group created successfully!`);
  };

  const handleSaveGroupName = (key) => {
    if (tempGroupNameInput.trim() !== '') {
      setWatchlistGroupNames({ ...watchlistGroupNames, [key]: tempGroupNameInput.trim() });
    }
    setEditingGroupNameKey(null);
    setTempGroupNameInput('');
  };

  const handleAddStockToWatchlist = (e) => {
    e.preventDefault();
    const sym = newStockInput.trim().toUpperCase();
    if (!sym) return;

    const currentList = watchlistGroups[activeWatchlistGroup] || [];
    if (currentList.some(s => s.name === sym)) {
      alert(`${sym} आधीपासूनच या वॉचलिस्ट ग्रुपमध्ये आहे.`);
      return;
    }

    const baseP = stockBasePrices[sym] || 1500.00;
    const newStockObj = {
      name: sym,
      exchange: 'NSE EQ',
      price: baseP,
      changeNum: 2.50,
      changePct: 0.15,
      isUp: true,
      high: baseP * 1.02,
      low: baseP * 0.98
    };

    setWatchlistGroups({
      ...watchlistGroups,
      [activeWatchlistGroup]: [...currentList, newStockObj]
    });
    setNewStockInput('');
    alert(`${sym} वॉचलिस्ट ग्रुपमध्ये यशस्वीरीत्या जोडला गेला!`);
  };

  const executeTrade = (instrumentName, price, type, category = 'holding', quantity = 1, orderType = 'REGULAR', gttDetails = null) => {
    const tradeTime = new Date().toLocaleTimeString();
    
    if (orderType === 'GTT' && gttDetails) {
      const gttItem = {
        id: Date.now(),
        instrument: instrumentName,
        stoploss: gttDetails.stoploss,
        target: gttDetails.target,
        qty: `${quantity * 10} Qty`,
        status: 'ACTIVE (TRIGGER PENDING)',
        time: tradeTime
      };
      setGttOrders([gttItem, ...gttOrders]);
      alert(`GTT OCO Order placed successfully for ${instrumentName}! Stoploss: ₹${gttDetails.stoploss}, Target: ₹${gttDetails.target}`);
      return;
    }

    const newTrade = {
      id: Date.now(),
      instrument: instrumentName,
      qty: `${quantity * 10} Qty`,
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
    setUsedMargin(prev => prev + (price * 10));

    const isOption = instrumentName.includes('CE') || instrumentName.includes('PE');

    if (isOption) {
      setPositions(prev => [newTrade, ...prev]);
      setPortfolioSubTab('positions');
      setActiveTab('portfolio');
      alert(`Successfully placed ${type} option order for ${instrumentName} at ₹${price}! Added to Positions.`);
    } else {
      setHoldings(prev => [newTrade, ...prev]);
      setPortfolioSubTab('holdings');
      setActiveTab('portfolio');
      alert(`Successfully bought stock ${instrumentName} at ₹${price}! Added to Holdings.`);
    }
  };

  const handleConfirmExit = () => {
    if (!exitModalData) return;
    const { type, item, orderType, limitPrice } = exitModalData;
    const finalPrice = orderType === 'Limit' ? parseFloat(limitPrice) || item.ltp : item.ltp;

    if (type === 'holding') {
      setHoldings(holdings.filter(h => h.id !== item.id));
      setTotalFunds(prev => prev + (finalPrice * 10) + (item.pnlVal || 0));
      setUsedMargin(prev => Math.max(0, prev - (item.avgPrice * 10)));
      alert(`Successfully sold holding ${item.instrument} at ₹${finalPrice}!`);
    } else {
      setPositions(positions.filter(p => p.id !== item.id));
      setTotalFunds(prev => prev + (finalPrice * 10) + item.pnlVal);
      setUsedMargin(prev => Math.max(0, prev - (item.avgPrice * 10)));
      alert(`Successfully squared off position ${item.instrument} at ₹${finalPrice}!`);
    }
    setExitModalData(null);
  };

  const allActiveTrades = [...holdings, ...positions];
  const totalTradesCount = orderHistory.length;
  const winsCount = allActiveTrades.filter(item => item.pnlVal > 0).length;
  const lossesCount = allActiveTrades.filter(item => item.pnlVal < 0).length;
  const totalNetPnL = allActiveTrades.reduce((acc, item) => acc + item.pnlVal, 0);
  const winRatePercentage = (winsCount + lossesCount) > 0 
    ? ((winsCount / (winsCount + lossesCount)) * 100).toFixed(1) 
    : (totalTradesCount > 0 ? '100.0' : '0.0');

  // **LOGIN / AUTH PAGE**
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

  // **MAIN TRADING DASHBOARD**
  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans relative overflow-hidden">
      
      <div className="bg-amber-500/25 border-b border-amber-500/50 px-4 py-2 flex items-center justify-center space-x-2 text-amber-300 text-xs md:text-sm font-bold tracking-wide shadow-md z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      <header className="bg-[#12141c] border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-3">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm tracking-wide shadow-md">
            AlphaTrade Pro
          </span>
          <button onClick={() => setShowFundsModal(true)} className="bg-gray-800 hover:bg-gray-700 border border-green-500/30 text-green-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
            <FiDollarSign size={13}/> Funds: ₹{(totalFunds - usedMargin).toLocaleString()}
          </button>
          <button onClick={() => { setActiveTab('portfolio'); setPortfolioSubTab('analytics'); }} className="bg-gray-800 hover:bg-gray-700 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
            <FiPieChart size={13}/> Analytics (Win: {winRatePercentage}%)
          </button>
        </div>

        <nav className="flex items-center space-x-1">
          <button onClick={() => setActiveTab('marketPulse')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'marketPulse' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>🔥 Market Pulse</button>
          <button onClick={() => setActiveTab('chart')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>📊 Chart</button>
          <button onClick={() => setActiveTab('optionChain')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Option Chain</button>
          <button onClick={() => setActiveTab('portfolio')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Portfolio & History</button>
        </nav>

        <div className="flex items-center space-x-3 relative z-50 pointer-events-auto">
          {isUpstoxConnected ? (
            <div className="flex items-center space-x-1.5 bg-green-950/60 border border-green-500/40 px-3 py-1 rounded-lg text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 font-bold">Upstox Connected</span>
            </div>
          ) : (
            <button 
              type="button"
              onClick={() => setShowTokenModal(true)} 
              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg transition-all cursor-pointer relative z-50"
            >
              🔑 Set Upstox Token
            </button>
          )}

          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="bg-purple-700 hover:bg-purple-600 text-white font-bold w-8 h-8 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer transition-all relative z-50">PK</button>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-64 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 font-sans text-xs">
              <div className="px-4 py-3 border-b border-gray-800">
                <p className="text-gray-200 font-bold flex items-center gap-1.5"><FiUser size={14}/> Prashant Kamble</p>
                <p className="text-[10px] text-gray-400 mt-0.5">User ID: 122758</p>
              </div>
              <div className="py-1 text-gray-300">
                <button onClick={() => { setShowProfileMenu(false); setShowProfileModal(true); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><span>👤 My Account | ID 122758</span></button>
                <button onClick={() => { setShowProfileMenu(false); setShowFundsModal(true); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer text-green-400"><FiDollarSign size={13}/><span>Funds & Margin</span></button>
                <button onClick={() => { setShowProfileMenu(false); setActiveTab('portfolio'); setPortfolioSubTab('analytics'); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer text-purple-400"><FiPieChart size={13}/><span>Trade Analytics Report</span></button>
                <button onClick={() => { setShowProfileMenu(false); setShowFeedbackModal(true); }} className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer"><FiMessageSquare size={13}/><span>Send Feedback</span></button>
              </div>
              <div className="border-t border-gray-800 pt-1">
                <button onClick={() => { setShowProfileMenu(false); setIsLoggedIn(false); setAuthMode('login'); }} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold cursor-pointer"><FiLogOut size={13}/><span>Logout</span></button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <aside className="w-80 bg-[#12141c] border-r border-gray-800 flex flex-col hidden md:flex">
          
          {/* Watchlist Group Tabs & Add Button */}
          <div className="bg-[#0b0e14] px-2 py-2 border-b border-gray-800 flex items-center justify-between gap-1 overflow-x-auto">
            <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
              {watchlistGroupKeys.map((grpKey, index) => (
                <button 
                  key={grpKey}
                  onClick={() => setActiveWatchlistGroup(grpKey)}
                  className={`px-2.5 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center whitespace-nowrap ${activeWatchlistGroup === grpKey ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'}`}
                  title={watchlistGroupNames[grpKey] || `Group ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={handleAddNewWatchlistGroup}
              className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-all shrink-0"
              title="Add New Watchlist Group"
            >
              <FiPlus size={14}/>
            </button>
          </div>

          {/* Active Group Header with Name Editing Support */}
          <div className="px-3 py-2 bg-[#12141c] border-b border-gray-800 flex items-center justify-between">
            {editingGroupNameKey === activeWatchlistGroup ? (
              <div className="flex items-center space-x-1 w-full">
                <input 
                  type="text" 
                  value={tempGroupNameInput} 
                  onChange={(e) => setTempGroupNameInput(e.target.value)}
                  className="bg-[#0b0e14] border border-purple-500 text-white px-2 py-0.5 rounded text-xs flex-1 focus:outline-none"
                  placeholder="Enter Group Name..."
                  autoFocus
                />
                <button onClick={() => handleSaveGroupName(activeWatchlistGroup)} className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-purple-400 font-bold flex items-center gap-1.5">
                  📁 {watchlistGroupNames[activeWatchlistGroup] || 'Watchlist Group'} ({currentGroupStocks.length})
                </span>
                <button 
                  onClick={() => {
                    setEditingGroupNameKey(activeWatchlistGroup);
                    setTempGroupNameInput(watchlistGroupNames[activeWatchlistGroup] || '');
                  }} 
                  className="text-gray-400 hover:text-white p-1 cursor-pointer"
                  title="Rename Group"
                >
                  <FiEdit2 size={12}/>
                </button>
              </div>
            )}
          </div>

          <div className="p-3 border-b border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
              <span>Watchlist (Live TBT)</span>
              <span className="text-gray-300 font-bold">{currentGroupStocks.length} Stocks</span>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500"><FiSearch size={13} /></span>
              <input 
                type="text" 
                placeholder="Search stock eg: RELIANCE, TCS..." 
                value={watchlistSearch}
                onChange={(e) => setWatchlistSearch(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <form onSubmit={handleAddStockToWatchlist} className="flex space-x-1 pt-1">
              <input 
                type="text" 
                placeholder="Add symbol (e.g. INFY)" 
                value={newStockInput}
                onChange={(e) => setNewStockInput(e.target.value)}
                className="flex-1 bg-[#0b0e14] border border-gray-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-600"
              />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-bold cursor-pointer" title="Add Stock">+</button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
            {currentGroupStocks
              .filter(stock => stock.name.toLowerCase().includes(watchlistSearch.toLowerCase()))
              .map((stock, idx) => (
                <div key={idx} className={`p-3 hover:bg-gray-800/60 transition-all flex items-center justify-between cursor-pointer ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`}>
                  <div onClick={() => setSelectedStock(stock.name)} className="flex-1">
                    <div className="flex items-center space-x-1.5">
                      <p className="text-xs font-bold text-white">{stock.name}</p>
                      <span className="text-[9px] bg-gray-800 text-gray-300 px-1 py-0.2 rounded font-mono">{stock.exchange || 'NSE EQ'}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[11px] font-mono text-gray-200">₹{stock.price.toFixed(2)}</span>
                      <span className={`text-[10px] font-mono font-bold ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.isUp ? '+' : ''}{stock.changeNum.toFixed(2)} ({stock.isUp ? '+' : ''}{stock.changePct.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button onClick={() => setSelectedOrderStock({ symbol: stock.name, price: stock.price, actionType: 'BUY', category: 'holding', high: stock.high, low: stock.low })} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer">B</button>
                    <button onClick={() => setSelectedOrderStock({ symbol: stock.name, price: stock.price, actionType: 'SELL', category: 'holding', high: stock.high, low: stock.low })} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer">S</button>
                  </div>
                </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-[#0b0e14] p-4 flex flex-col overflow-y-auto">
          {activeTab === 'marketPulse' && (
            <MarketOverview 
              onQuickTrade={(symbol, price, actionType, category) => {
                setSelectedOrderStock({
                  symbol,
                  price,
                  actionType,
                  category,
                  high: price * 1.03,
                  low: price * 0.97
                });
              }}
              onOpenOptionChain={(sym) => {
                setSelectedOptionSymbol(sym);
                setActiveTab('optionChain');
              }}
            />
          )}

          {activeTab === 'chart' && (
            <div className="w-full h-full flex flex-col">
              <AdvancedChart 
                symbol={selectedStock} 
                ltp={currentStockObj.price} 
                onBuy={() => setSelectedOrderStock({ symbol: selectedStock, price: currentStockObj.price, actionType: 'BUY', category: 'holding', high: currentStockObj.high, low: currentStockObj.low })}
                onSell={() => setSelectedOrderStock({ symbol: selectedStock, price: currentStockObj.price, actionType: 'SELL', category: 'holding', high: currentStockObj.high, low: currentStockObj.low })}
              />
            </div>
          )}

          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-2xl flex-1 flex flex-col font-sans text-gray-100 overflow-hidden">
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-2 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-400 mr-2">Option Chain:</span>
                {optionSymbols.map((sym) => (
                  <button key={sym} onClick={() => setSelectedOptionSymbol(sym)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedOptionSymbol === sym ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'}`}>{sym}</button>
                ))}
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-gray-800 text-xs">
                <span className="text-gray-400 font-bold">Expiry:</span>
                {expiryDates.map((exp) => (
                  <button key={exp} onClick={() => setSelectedExpiry(exp)} className={`px-2.5 py-1 rounded-md font-medium cursor-pointer whitespace-nowrap ${selectedExpiry === exp ? 'bg-purple-600/30 border border-purple-500 text-purple-300' : 'bg-[#0b0e14] text-gray-400 hover:text-white border border-gray-800'}`}>{exp}</button>
                ))}
              </div>

              <div className="overflow-x-auto flex-1 border border-gray-800 rounded-lg">
                <table className="w-full text-left text-[11px] text-gray-300 border-collapse whitespace-nowrap font-mono">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-center uppercase tracking-wider text-[10px]">
                      <th className="p-2.5 border-r border-gray-800/60 bg-blue-950/25" colSpan="9">Calls</th>
                      <th className="p-2.5 bg-gray-900 font-bold text-amber-400">STRIKE</th>
                      <th className="p-2.5 border-l border-gray-800/60 bg-red-950/25" colSpan="9">Puts</th>
                    </tr>
                    <tr className="bg-gray-900/90 text-gray-400 border-b border-gray-800 text-[10px] text-center">
                      <th className="p-2">Volume</th>
                      <th className="p-2">IV</th>
                      <th className="p-2">Vega</th>
                      <th className="p-2">Gamma</th>
                      <th className="p-2">Theta</th>
                      <th className="p-2">Delta</th>
                      <th className="p-2">OI (chg)</th>
                      <th className="p-2">OI (lakhs)</th>
                      <th className="p-2 border-r border-gray-800">LTP / Action</th>
                      
                      <th className="p-2 bg-gray-900 font-bold text-amber-400">PRICE</th>

                      <th className="p-2 border-l border-gray-800">Action / LTP</th>
                      <th className="p-2">OI (lakhs)</th>
                      <th className="p-2">OI (chg)</th>
                      <th className="p-2">Delta</th>
                      <th className="p-2">Theta</th>
                      <th className="p-2">Gamma</th>
                      <th className="p-2">Vega</th>
                      <th className="p-2">IV</th>
                      <th className="p-2">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {optionRows.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/45 transition-colors text-center">
                        <td className="p-2 text-gray-400">{r.callVol}</td>
                        <td className="p-2 text-gray-400">{r.callIV}</td>
                        <td className="p-2 text-gray-400">{r.callVega}</td>
                        <td className="p-2 text-gray-400">{r.callGamma}</td>
                        <td className="p-2 text-gray-400">{r.callTheta}</td>
                        <td className="p-2 text-gray-400">{r.callDelta}</td>
                        <td className="p-2 text-gray-400">{r.callOIChg}</td>
                        <td className="p-2 text-gray-300 font-bold">{r.callOILakhs}</td>
                        <td className="p-2 border-r border-gray-800 flex items-center justify-center space-x-1">
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} CE`, price: r.callLTP, actionType: 'BUY', category: 'position', high: r.callLTP * 1.05, low: r.callLTP * 0.95 })} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer">B</button>
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} CE`, price: r.callLTP, actionType: 'SELL', category: 'position', high: r.callLTP * 1.05, low: r.callLTP * 0.95 })} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer">S</button>
                          <span className={`font-bold font-mono ${r.callIsUp ? 'text-green-400' : 'text-red-400'}`}>₹{r.callLTP.toFixed(2)}</span>
                        </td>

                        <td className="p-2 font-bold text-white bg-gray-900/80 border-x border-gray-800 text-xs">{r.strike}</td>

                        <td className="p-2 border-l border-gray-800 flex items-center justify-center space-x-1">
                          <span className={`font-bold font-mono ${r.putIsUp ? 'text-green-400' : 'text-red-400'}`}>₹{r.putLTP.toFixed(2)}</span>
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} PE`, price: r.putLTP, actionType: 'BUY', category: 'position', high: r.putLTP * 1.05, low: r.putLTP * 0.95 })} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer">B</button>
                          <button onClick={() => setSelectedOrderStock({ symbol: `${selectedOptionSymbol} ${r.strike} PE`, price: r.putLTP, actionType: 'SELL', category: 'position', high: r.putLTP * 1.05, low: r.putLTP * 0.95 })} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer">S</button>
                        </td>
                        <td className="p-2 text-gray-300 font-bold">{r.putOILakhs}</td>
                        <td className="p-2 text-gray-400">{r.putOIChg}</td>
                        <td className="p-2 text-gray-400">{r.putDelta}</td>
                        <td className="p-2 text-gray-400">{r.putTheta}</td>
                        <td className="p-2 text-gray-400">{r.putGamma}</td>
                        <td className="p-2 text-gray-400">{r.putVega}</td>
                        <td className="p-2 text-gray-400">{r.putIV}</td>
                        <td className="p-2 text-gray-400">{r.putVolume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="flex-1 bg-[#12141c] border border-gray-800 rounded-xl p-4 flex flex-col text-xs text-white">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold">Portfolio, Positions, GTT & Trade Analytics</h2>
                <span className={`font-bold px-2.5 py-1 rounded ${totalNetPnL >= 0 ? 'bg-green-950/60 text-green-400 border border-green-500/30' : 'bg-red-950/60 text-red-400 border border-red-500/30'}`}>
                  Net Live P&L: {totalNetPnL >= 0 ? '+' : ''}₹{totalNetPnL.toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-4 border-b border-gray-800 pb-2 mb-4 overflow-x-auto whitespace-nowrap">
                <button onClick={() => setPortfolioSubTab('holdings')} className={`font-bold cursor-pointer pb-1 ${portfolioSubTab === 'holdings' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}`}>Holdings ({holdings.length})</button>
                <button onClick={() => setPortfolioSubTab('positions')} className={`font-bold cursor-pointer pb-1 ${portfolioSubTab === 'positions' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}`}>Positions ({positions.length})</button>
                <button onClick={() => setPortfolioSubTab('gtt')} className={`font-bold cursor-pointer pb-1 ${portfolioSubTab === 'gtt' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}`}>GTT Orders ({gttOrders.length})</button>
                <button onClick={() => setPortfolioSubTab('history')} className={`font-bold cursor-pointer pb-1 ${portfolioSubTab === 'history' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}`}>Order History ({orderHistory.length})</button>
                <button onClick={() => setPortfolioSubTab('analytics')} className={`font-bold cursor-pointer pb-1 flex items-center gap-1 ${portfolioSubTab === 'analytics' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400'}`}><FiPieChart size={12}/> Trade Analytics Report</button>
              </div>

              {portfolioSubTab === 'holdings' && (
                <div className="overflow-x-auto flex-1">
                  {holdings.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No holdings available. Buy stocks from watchlist or chart to see them here.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Stock Name</th><th className="p-2">Qty</th><th className="p-2">Buy Price</th><th className="p-2">Current Value</th><th className="p-2">P&L</th><th className="p-2">Action / Exit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map(h => (
                          <tr key={h.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                            <td className="p-2 font-bold">{h.instrument}</td>
                            <td className="p-2">{h.qty}</td>
                            <td className="p-2 font-mono">₹{h.avgPrice}</td>
                            <td className="p-2 text-amber-400 font-mono">₹{h.currentVal.toFixed(2)}</td>
                            <td className={`p-2 font-bold font-mono ${h.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{h.pnl}</td>
                            <td className="p-2 space-x-1.5 flex justify-center items-center">
                              <button onClick={() => setShareCardData(h)} className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow">
                                <FiShare2 size={11}/> Share
                              </button>
                              <button onClick={() => setExitModalData({ type: 'holding', item: h, orderType: 'Market', limitPrice: h.currentVal / 10 })} className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer shadow">
                                Exit / Sell
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'positions' && (
                <div className="overflow-x-auto flex-1">
                  {positions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No open positions.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Instrument</th><th className="p-2">Type</th><th className="p-2">Qty</th><th className="p-2">Avg Price</th><th className="p-2">LTP</th><th className="p-2">P&L</th><th className="p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map(p => (
                          <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                            <td className="p-2 font-bold">{p.instrument}</td>
                            <td className={`p-2 font-bold ${p.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{p.type}</td>
                            <td className="p-2">{p.qty}</td>
                            <td className="p-2 font-mono">₹{p.avgPrice}</td>
                            <td className="p-2 text-amber-400 font-mono">₹{p.ltp}</td>
                            <td className={`p-2 font-bold font-mono ${p.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{p.pnl}</td>
                            <td className="p-2 space-x-1.5 flex justify-center items-center">
                              <button onClick={() => setShareCardData(p)} className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded text-[10px] font-bold cursor-pointer shadow">Share</button>
                              <button onClick={() => setExitModalData({ type: 'position', item: p, orderType: 'Market', limitPrice: p.ltp })} className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer shadow">Square Off</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'gtt' && (
                <div className="overflow-x-auto flex-1">
                  {gttOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No active GTT orders.</p>
                  ) : (
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800">
                          <th className="p-2">Time</th><th className="p-2">Instrument</th><th className="p-2">Qty</th><th className="p-2">Stoploss</th><th className="p-2">Target</th><th className="p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gttOrders.map(g => (
                          <tr key={g.id} className="border-b border-gray-800">
                            <td className="p-2 text-gray-400">{g.time}</td>
                            <td className="p-2 font-bold text-white">{g.instrument}</td>
                            <td className="p-2">{g.qty}</td>
                            <td className="p-2 text-red-400 font-mono">₹{g.stoploss}</td>
                            <td className="p-2 text-green-400 font-mono">₹{g.target}</td>
                            <td className="p-2 text-amber-400 font-bold">{g.status}</td>
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
                          <tr key={ord.id} className="border-b border-gray-800">
                            <td className="p-2 text-gray-400">{ord.time}</td>
                            <td className="p-2 font-bold text-white">{ord.instrument}</td>
                            <td className={`p-2 font-bold ${ord.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{ord.type}</td>
                            <td className="p-2">{ord.qty}</td>
                            <td className="p-2 text-amber-400 font-mono">₹{ord.avgPrice}</td>
                            <td className="p-2 text-green-400 font-bold">{ord.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'analytics' && (
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#0b0e14] border border-gray-800 p-4 rounded-xl">
                      <span className="text-gray-400 text-[10px] uppercase">Total Executed Trades</span>
                      <p className="text-xl font-bold text-white mt-1">{totalTradesCount}</p>
                    </div>
                    <div className="bg-[#0b0e14] border border-green-900/40 p-4 rounded-xl">
                      <span className="text-gray-400 text-[10px] uppercase flex items-center gap-1"><FiTrendingUp className="text-green-400"/> Profitable Wins</span>
                      <p className="text-xl font-bold text-green-400 mt-1">{winsCount}</p>
                    </div>
                    <div className="bg-[#0b0e14] border border-red-900/40 p-4 rounded-xl">
                      <span className="text-gray-400 text-[10px] uppercase flex items-center gap-1"><FiTrendingDown className="text-red-400"/> Losses</span>
                      <p className="text-xl font-bold text-red-400 mt-1">{lossesCount}</p>
                    </div>
                    <div className="bg-[#0b0e14] border border-purple-900/40 p-4 rounded-xl">
                      <span className="text-gray-400 text-[10px] uppercase flex items-center gap-1"><FiAward className="text-purple-400"/> Win / Loss Ratio</span>
                      <p className="text-xl font-bold text-purple-400 mt-1">{winRatePercentage}%</p>
                    </div>
                  </div>

                  <div className="bg-[#0b0e14] border border-gray-800 p-4 rounded-xl">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-bold text-gray-300">Performance Accuracy Meter</span>
                      <span className="font-bold text-purple-400">{winRatePercentage}% Win Rate</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden flex">
                      <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${winRatePercentage}%` }}></div>
                      <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${100 - parseFloat(winRatePercentage)}%` }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* **UPSTOX TOKEN MODAL POPUP** */}
      {showTokenModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl font-sans text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🔑 Enter Upstox Access Token</span>
              </h3>
              <button onClick={() => setShowTokenModal(false)} className="text-gray-400 hover:text-white cursor-pointer"><FiX size={16}/></button>
            </div>

            <div className="space-y-3">
              <p className="text-gray-400 text-[11px]">Paste your Upstox API Access Token below to fetch live market feeds and execute live simulated orders.</p>
              <div>
                <label className="text-gray-400 block mb-1">Access Token</label>
                <input 
                  type="text" 
                  placeholder="Paste token here..." 
                  value={upstoxToken} 
                  onChange={(e) => setUpstoxToken(e.target.value)} 
                  className="w-full bg-[#0b0e14] border border-gray-800 rounded px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button onClick={() => setShowTokenModal(false)} className="flex-1 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold cursor-pointer">Cancel</button>
              <button onClick={handleSaveToken} className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer shadow-lg">Save & Connect</button>
            </div>
          </div>
        </div>
      )}

      {exitModalData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl font-sans text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{exitModalData.type === 'holding' ? 'Exit / Sell Stock:' : 'Square Off:'}</span> <span className="text-purple-400">{exitModalData.item.instrument}</span>
              </h3>
              <button onClick={() => setExitModalData(null)} className="text-gray-400 hover:text-white cursor-pointer"><FiX size={16}/></button>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2 bg-[#0b0e14] p-1 rounded-lg">
                <button onClick={() => setExitModalData({ ...exitModalData, orderType: 'Market' })} className={`flex-1 py-1.5 rounded font-bold cursor-pointer ${exitModalData.orderType === 'Market' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>Market</button>
                <button onClick={() => setExitModalData({ ...exitModalData, orderType: 'Limit' })} className={`flex-1 py-1.5 rounded font-bold cursor-pointer ${exitModalData.orderType === 'Limit' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>Limit Price</button>
              </div>

              {exitModalData.orderType === 'Limit' && (
                <div>
                  <label className="text-gray-400 block mb-1">Set Limit Price (₹)</label>
                  <input 
                    type="number" 
                    value={exitModalData.limitPrice} 
                    onChange={(e) => setExitModalData({ ...exitModalData, limitPrice: e.target.value })} 
                    className="w-full bg-[#0b0e14] border border-gray-800 rounded px-3 py-2 text-white font-mono font-bold"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-2 pt-2">
              <button onClick={() => setExitModalData(null)} className="flex-1 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold cursor-pointer">Cancel</button>
              <button onClick={handleConfirmExit} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer shadow-lg">Confirm {exitModalData.type === 'holding' ? 'Sell' : 'Square Off'}</button>
            </div>
          </div>
        </div>
      )}

      {showFundsModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl font-sans text-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-green-400 flex items-center gap-2"><FiDollarSign/> Funds & Margin Dashboard</h3>
              <button onClick={() => setTotalFunds(prev => prev + 100000)} className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-300 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer">
                <FiPlusCircle size={12}/> + Add ₹1,00,000
              </button>
            </div>

            <div className="space-y-3 bg-[#0b0e14] p-4 rounded-xl border border-gray-800 mb-4 font-mono">
              <div className="flex justify-between"><span className="text-gray-400 font-sans">Opening Virtual Balance:</span><span className="font-bold text-white">₹{totalFunds.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 font-sans">Blocked Margin:</span><span className="font-bold text-amber-400">₹{usedMargin.toLocaleString()}</span></div>
              <div className="border-t border-gray-800 pt-2.5 flex justify-between items-center">
                <span className="text-gray-300 font-bold font-sans">Available Margin:</span>
                <span className="font-bold text-green-400 text-sm">₹{(totalFunds - usedMargin + totalNetPnL).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowFundsModal(false)} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold cursor-pointer">Close Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {shareCardData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1b1f2e] border border-purple-500/60 rounded-2xl p-6 w-full max-w-sm shadow-2xl font-sans text-center space-y-4">
            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-md text-xs">AlphaTrade Pro</span>
            <div className="bg-[#0b0e14] border border-gray-800 p-4 rounded-xl text-left space-y-2">
              <p className="font-bold text-white">{shareCardData.instrument}</p>
              <p className={`font-bold text-xl font-mono ${shareCardData.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{shareCardData.pnl}</p>
            </div>
            <button onClick={() => setShareCardData(null)} className="w-full py-2 rounded-lg bg-purple-600 text-white font-bold text-xs cursor-pointer">Close</button>
          </div>
        </div>
      )}

      {selectedOrderStock && (
        <div className="absolute right-0 top-0 h-full z-50 shadow-2xl">
          <PlaceOrderPanel 
            stock={{ symbol: selectedOrderStock.symbol, price: selectedOrderStock.price, exchange: 'NSE EQ', high: selectedOrderStock.high, low: selectedOrderStock.low }}
            actionType={selectedOrderStock.actionType}
            onClose={() => setSelectedOrderStock(null)}
            onPlaceOrder={(orderDetails) => {
              executeTrade(
                orderDetails.symbol, 
                orderDetails.price, 
                orderDetails.action, 
                selectedOrderStock.category || 'holding', 
                orderDetails.quantity, 
                orderDetails.orderType, 
                orderDetails.gttDetails
              );
              setSelectedOrderStock(null);
            }}
          />
        </div>
      )}
    </div>
  );
}