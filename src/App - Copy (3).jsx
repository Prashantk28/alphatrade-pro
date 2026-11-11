import React, { useState, useEffect, useRef } from 'react';
import { FiMaximize2, FiSettings } from 'react-icons/fi';

const stockBasePrices = {
  'NIFTY 50': 24893.03,
  'BANKNIFTY': 47595.12,
  'RELIANCE': 2973.10,
  'TCS': 3942.49,
  'INFY': 1624.84,
  'HDFCBANK': 1466.97,
  'TATAMOTORS': 989.40
};

// 📈 Advanced Chart Component
function AdvancedChart({ symbol, ltp }) {
  const [timeframe, setTimeframe] = useState('15m');
  const [candles, setCandles] = useState([]);
  const initialPrice = ltp || stockBasePrices[symbol] || 1500.00;
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const canvasRef = useRef(null);

  useEffect(() => {
    const basePrice = stockBasePrices[symbol] || ltp || 1500.00;
    setCurrentPrice(basePrice);
    const initialCandles = [];
    let time = Date.now() - 50 * 15 * 60 * 1000;
    let runningPrice = basePrice * 0.98;

    for (let i = 0; i < 45; i++) {
      const open = runningPrice + (Math.random() - 0.5) * (basePrice * 0.005);
      const close = open + (Math.random() - 0.48) * (basePrice * 0.006);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.003);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.003);
      initialCandles.push({ time, open, high, low, close });
      runningPrice = close;
      time += 15 * 60 * 1000;
    }
    if (initialCandles.length > 0) {
      initialCandles[initialCandles.length - 1].close = basePrice;
    }
    setCandles(initialCandles);
  }, [symbol]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const fluctuationRange = prev * 0.0008;
        const change = (Math.random() - 0.49) * fluctuationRange;
        const newPrice = parseFloat((prev + change).toFixed(2));
        
        setCandles(prevCandles => {
          if (prevCandles.length === 0) return prevCandles;
          const last = { ...prevCandles[prevCandles.length - 1] };
          last.close = newPrice;
          last.high = Math.max(last.high, newPrice);
          last.low = Math.min(last.low, newPrice);
          return [...prevCandles.slice(0, prevCandles.length - 1), last];
        });

        return newPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    if (candles.length === 0) return;

    ctx.fillStyle = '#0F141C';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#1E2638';
    ctx.lineWidth = 1;

    const prices = candles.flatMap(c => [c.high, c.low]);
    const minPrice = Math.min(...prices) * 0.995;
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice || 1;

    const gridSteps = 6;
    for (let i = 0; i <= gridSteps; i++) {
      const y = (height / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width - 70, y);
      ctx.stroke();

      const priceVal = maxPrice - (priceRange / gridSteps) * i;
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px monospace';
      ctx.fillText(priceVal.toFixed(2), width - 65, y + 4);
    }

    const candleWidth = Math.max(4, (width - 90) / candles.length - 4);
    
    candles.forEach((c, idx) => {
      const x = 20 + idx * (candleWidth + 4);
      const isGreen = c.close >= c.open;
      const color = isGreen ? '#10B981' : '#EF4444';

      const yHigh = height - ((c.high - minPrice) / priceRange) * height;
      const yLow = height - ((c.low - minPrice) / priceRange) * height;
      const yOpen = height - ((c.open - minPrice) / priceRange) * height;
      const yClose = height - ((c.close - minPrice) / priceRange) * height;

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, yHigh);
      ctx.lineTo(x + candleWidth / 2, yLow);
      ctx.stroke();

      ctx.fillStyle = color;
      const bodyY = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
    });

    const currentY = height - ((currentPrice - minPrice) / priceRange) * height;
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(width - 70, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(width - 70, currentY - 10, 70, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(currentPrice.toFixed(2), width - 65, currentY + 4);

  }, [candles, currentPrice]);

  return (
    <div className="flex-1 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white select-none w-full">
      <div className="flex justify-between items-center pb-3 border-b border-[#1E2638]">
        <div className="flex items-center space-x-3">
          <h2 className="text-base font-bold text-white">{symbol}</h2>
          <span className="text-sm font-semibold text-green-400">₹{currentPrice.toLocaleString('en-IN')}</span>
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold animate-pulse">● LIVE TBT</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            {['1m', '5m', '15m', '1H', '1D'].map((tf) => (
              <button key={tf} onClick={() => setTimeframe(tf)} className={`px-2 py-0.5 rounded font-bold transition ${timeframe === tf ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>{tf}</button>
            ))}
          </div>
          <button className="p-1.5 bg-[#0F141C] border border-[#1E2638] rounded-lg text-gray-300 hover:text-white"><FiSettings size={14} /></button>
          <button className="p-1.5 bg-[#0F141C] border border-[#1E2638] rounded-lg text-gray-300 hover:text-white"><FiMaximize2 size={14} /></button>
        </div>
      </div>
      <div className="flex-1 bg-[#0F141C] rounded-xl mt-3 border border-[#1E2638] relative overflow-hidden flex flex-col">
        <canvas ref={canvasRef} width={1200} height={500} className="w-full h-full object-fill cursor-crosshair" />
        <div className="absolute bottom-2 left-3 right-20 flex justify-between items-center bg-[#131B2A]/90 px-3 py-1.5 rounded-lg border border-[#1E2638] text-[11px] backdrop-blur">
          <span className="text-gray-400">Symbol: <strong className="text-white">{symbol}</strong></span>
          <span className="text-gray-400">LTP: <strong className="text-green-400">₹{currentPrice}</strong></span>
          <span className="text-gray-400">RSI (14): <strong className="text-purple-400">58.40</strong></span>
          <span className="text-gray-400">Volume: <strong className="text-blue-400">1.42M</strong></span>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot' | 'resetNew'
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  const [selectedOptionSymbol, setSelectedOptionSymbol] = useState('NIFTY');

  const [isUpstoxConnected, setIsUpstoxConnected] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBasketPanel, setShowBasketPanel] = useState(false);
  const [showQuickTradeModal, setShowQuickTradeModal] = useState(false);
  const [upstoxToken, setUpstoxToken] = useState('');

  const [portfolioSubTab, setPortfolioSubTab] = useState('positions');
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [virtualFunds, setVirtualFunds] = useState(485240.00);

  const [email, setEmail] = useState('pkamble.kvic@hokvic.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [stocks, setStocks] = useState([
    { name: 'NIFTY 50', price: 24893.03, change: '+1.26 (+0.01%)', isUp: true },
    { name: 'BANKNIFTY', price: 47595.12, change: '-0.81 (-0.01%)', isUp: false },
    { name: 'RELIANCE', price: 2973.10, change: '+0.02 (+0.00%)', isUp: true },
    { name: 'TCS', price: 3942.49, change: '+0.41 (+0.00%)', isUp: true },
    { name: 'INFY', price: 1624.84, change: '+0.03 (+0.00%)', isUp: true },
    { name: 'HDFCBANK', price: 1466.97, change: '+0.24 (+0.00%)', isUp: true },
    { name: 'TATAMOTORS', price: 989.40, change: '+0.64 (+0.01%)', isUp: true },
  ]);

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
          return {
            ...stock,
            price: newPrice,
            isUp: changeVal >= 0
          };
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

  const executeTrade = (instrumentName, price, type, category = 'position') => {
    const newTrade = {
      id: Date.now(),
      instrument: instrumentName,
      qty: category === 'position' ? '1 Lot (25 Qty)' : '10 Qty',
      avgPrice: price,
      ltp: price,
      pnlVal: 0.00,
      pnl: '+₹0.00',
      type: type
    };

    if (category === 'position') {
      setPositions([newTrade, ...positions]);
      alert(`Successfully ${type}ed ${instrumentName} at ₹${price}! Added to Positions.`);
    } else {
      setHoldings([newTrade, ...holdings]);
      alert(`Successfully ${type}ed ${instrumentName} at ₹${price}! Added to Holdings.`);
    }
  };

  const totalUnrealizedPnL = positions.reduce((acc, curr) => acc + (curr.pnlVal || 0), 0);

  // 🌟 Authentication Screen (Login / Register / Forgot Password / Reset New Password)
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

          {/* LOGIN FORM */}
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

          {/* REGISTER FORM */}
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

          {/* FORGOT PASSWORD FORM */}
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

          {/* SET NEW PASSWORD FORM (After Reset Link Click) */}
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
          <button onClick={() => setActiveTab('chart')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'chart' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>📊 Chart</button>
          <button onClick={() => setActiveTab('optionChain')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'optionChain' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Option Chain</button>
          <button onClick={() => setActiveTab('portfolio')} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Portfolio</button>
        </nav>

        {/* Action Buttons & Status */}
        <div className="flex items-center space-x-2 relative">
          {isUpstoxConnected ? (
            <div className="flex items-center space-x-1.5 bg-green-950/60 border border-green-500/40 px-3 py-1 rounded-lg text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 font-bold">Upstox Connected</span>
            </div>
          ) : (
            <button onClick={() => setShowTokenModal(true)} className="bg-amber-600/20 border border-amber-600/50 text-amber-300 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-amber-600/30 transition-all cursor-pointer">🔑 Set Upstox Token</button>
          )}

          <button onClick={() => setShowBasketPanel(!showBasketPanel)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${showBasketPanel ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}>🛒 Basket</button>
          <button onClick={() => setShowQuickTradeModal(true)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-all cursor-pointer">⚡ Quick Trade</button>

          {/* Profile Dropdown */}
          <div className="relative ml-1">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="bg-purple-700 hover:bg-purple-600 text-white font-bold w-8 h-8 rounded-lg text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer transition-all">PK</button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#181b25] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 font-sans text-xs">
                <div className="px-4 py-2.5 border-b border-gray-800">
                  <p className="text-gray-200 font-bold">My Account | User ID 122758</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{email}</p>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <button onClick={() => { setShowProfileMenu(false); setIsLoggedIn(false); setAuthMode('login'); }} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold transition-all cursor-pointer"><span>🚪 Logout</span></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Watchlist Sidebar */}
        <aside className="w-80 bg-[#12141c] border-r border-gray-800 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 font-semibold">
            <span>Watchlist (Live TBT)</span>
            <span>NSE</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
            {stocks.map((stock, idx) => (
              <div key={idx} className={`p-3 hover:bg-gray-800/60 transition-all flex items-center justify-between ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`}>
                <div onClick={() => setSelectedStock(stock.name)} className="cursor-pointer flex-1">
                  <p className="text-xs font-bold text-gray-200">{stock.name}</p>
                  <p className="text-[10px] text-gray-500">NSE</p>
                </div>
                <div className="text-right flex items-center space-x-2">
                  <div onClick={() => setSelectedStock(stock.name)} className="cursor-pointer">
                    <p className="text-xs font-semibold text-gray-200 animate-pulse">₹{stock.price.toFixed(2)}</p>
                    <p className={`text-[10px] font-medium ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>{stock.change}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <button onClick={() => executeTrade(stock.name, stock.price, 'BUY', 'holding')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                    <button onClick={() => executeTrade(stock.name, stock.price, 'SELL', 'holding')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                  </div>
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

          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-2xl flex-1 flex flex-col font-sans text-gray-100 overflow-hidden">
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-400 mr-2">Option Chain:</span>
                {optionSymbols.map((sym) => (
                  <button key={sym} onClick={() => setSelectedOptionSymbol(sym)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedOptionSymbol === sym ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'}`}>{sym}</button>
                ))}
              </div>

              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="font-bold text-purple-400">📊 Option Chain for {selectedOptionSymbol} (Live Feed)</span>
                <span className="text-gray-400">Click <strong className="text-blue-400">[B]</strong> to Buy or <strong className="text-red-400">[S]</strong> to Sell</span>
              </div>

              <div className="overflow-x-auto flex-1 border border-gray-800 rounded-lg">
                <table className="w-full text-left text-[11px] text-gray-300 border-collapse whitespace-nowrap font-mono">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-center uppercase tracking-wider text-[10px]">
                      <th className="p-2.5 border-r border-gray-800/60 bg-blue-950/20" colSpan="10">Calls (CE)</th>
                      <th className="p-2.5 bg-gray-900 font-bold text-amber-400">Strike</th>
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
                      <tr key={idx} className="hover:bg-gray-800/45 transition-colors">
                        <td className="p-2 text-gray-400">{r.callVol}</td><td className="p-2 text-gray-400">{r.callIV}</td><td className="p-2 text-gray-400">{r.callVega}</td><td className="p-2 text-gray-400">{r.callGamma}</td><td className="p-2 text-gray-400">{r.callTheta}</td><td className="p-2 text-gray-400">{r.callDelta}</td><td className="p-2 text-green-400">{r.callOIChg}</td><td className="p-2 text-blue-400 font-bold">{r.callOILakhs}</td>
                        <td className="p-2 text-amber-400 font-bold animate-pulse">₹{r.callLTP.toFixed(2)}</td>
                        <td className="p-2 border-r border-gray-800 space-x-1 text-center">
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} CE`, r.callLTP, 'BUY', 'position')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} CE`, r.callLTP, 'SELL', 'position')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                        </td>
                        <td className="p-2 text-center font-bold text-white bg-gray-900/80 border-x border-gray-800 text-xs">{r.strike}</td>
                        <td className="p-2 border-l border-gray-800 space-x-1 text-center">
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} PE`, r.putLTP, 'BUY', 'position')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} PE`, r.putLTP, 'SELL', 'position')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
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
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-6 shadow-lg flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-xs">Total Positions P&L</span>
                  <h3 className={`text-2xl font-bold mt-1 ${totalUnrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalUnrealizedPnL >= 0 ? '+' : ''}₹{totalUnrealizedPnL.toLocaleString('en-IN')}
                  </h3>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs">Available Funds (Paper)</span>
                    <h3 className="text-2xl font-bold text-green-400 mt-1">₹{virtualFunds.toLocaleString('en-IN')}</h3>
                  </div>
                  <button onClick={() => setVirtualFunds(prev => prev + 100000)} className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded text-xs font-bold">+ Add Funds</button>
                </div>
              </div>

              <div className="flex space-x-4 border-b border-gray-800 pb-3 mb-4 text-xs font-semibold">
                <button onClick={() => setPortfolioSubTab('positions')} className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'positions' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Positions ({positions.length})</button>
                <button onClick={() => setPortfolioSubTab('holdings')} className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'holdings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Holdings ({holdings.length})</button>
              </div>

              {portfolioSubTab === 'positions' && (
                <div className="flex-1">
                  {positions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">No open positions available. Place trade from Option Chain.</div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400"><th className="py-2">Instrument</th><th className="py-2">Type</th><th className="py-2">Qty</th><th className="py-2">Avg. Price</th><th className="py-2">LTP</th><th className="py-2">P&L</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {positions.map(p => (
                          <tr key={p.id}>
                            <td className="py-3 font-bold text-white">{p.instrument}</td>
                            <td className={`py-3 font-bold ${p.type === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>{p.type}</td>
                            <td className="py-3">{p.qty}</td>
                            <td className="py-3">₹{p.avgPrice.toFixed(2)}</td>
                            <td className="py-3 text-amber-400">₹{p.ltp.toFixed(2)}</td>
                            <td className={`py-3 font-bold ${p.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{p.pnl}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {portfolioSubTab === 'holdings' && (
                <div className="flex-1">
                  {holdings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">No holdings available. Click [B] or [S] on any stock in Watchlist.</div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400"><th className="py-2">Stock Name</th><th className="py-2">Qty</th><th className="py-2">Buy Price</th><th className="py-2">Current Value</th><th className="py-2">P&L</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {holdings.map(h => (
                          <tr key={h.id}>
                            <td className="py-3 font-bold text-white">{h.instrument}</td>
                            <td className="py-3">{h.qty}</td>
                            <td className="py-3">₹{h.avgPrice.toFixed(2)}</td>
                            <td className="py-3 text-amber-400">₹{h.currentVal}</td>
                            <td className={`py-3 font-bold ${h.pnlVal >= 0 ? 'text-green-400' : 'text-red-400'}`}>{h.pnl}</td>
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

        {showBasketPanel && (
          <div className="w-80 bg-[#12141c] border-l border-gray-800 p-4 flex flex-col justify-between shadow-2xl z-30">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <h3 className="font-bold text-sm text-purple-400">🛒 Order Basket</h3>
                <button onClick={() => setShowBasketPanel(false)} className="text-gray-400 hover:text-white text-xs font-bold">✕</button>
              </div>
              <div className="mt-4 text-xs text-gray-400 text-center py-8 border border-dashed border-gray-800 rounded-lg">No active orders in basket.</div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded text-xs">Execute Basket Orders</button>
          </div>
        )}
      </div>

      {showTokenModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-bold text-amber-400 mb-2">🔑 Set Upstox Access Token</h3>
            <input type="text" placeholder="Paste Upstox Access Token..." value={upstoxToken} onChange={(e) => setUpstoxToken(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2.5 text-xs text-gray-200 mb-4 focus:outline-none focus:border-purple-600" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowTokenModal(false)} className="px-4 py-1.5 rounded text-xs bg-gray-800 hover:bg-gray-700 text-gray-300">Cancel</button>
              <button onClick={handleSaveToken} className="px-4 py-1.5 rounded text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold">Save & Connect</button>
            </div>
          </div>
        </div>
      )}

      {showQuickTradeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#12141c] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
              <h3 className="text-sm font-bold text-blue-400">⚡ Quick Order Execution</h3>
              <button onClick={() => setShowQuickTradeModal(false)} className="text-gray-400 hover:text-white text-xs font-bold">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300"><span>Symbol:</span><span className="font-bold text-white">{selectedStock}</span></div>
              <div className="flex justify-between text-gray-300"><span>LTP:</span><span className="font-bold text-green-400">₹{currentStockObj.price.toFixed(2)}</span></div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => { executeTrade(selectedStock, currentStockObj.price, 'BUY', 'holding'); setShowQuickTradeModal(false); }} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded text-xs">BUY</button>
                <button onClick={() => { executeTrade(selectedStock, currentStockObj.price, 'SELL', 'holding'); setShowQuickTradeModal(false); }} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded text-xs">SELL</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}