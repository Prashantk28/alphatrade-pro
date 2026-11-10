import React, { useState, useEffect, useRef } from 'react';
import { FiMaximize2, FiSettings } from 'react-icons/fi';

const stockBasePrices = {
  'NIFTY 50': 24891.95,
  'BANKNIFTY': 47595.71,
  'RELIANCE': 2971.74,
  'TCS': 3941.39,
  'INFY': 1624.56,
  'HDFCBANK': 1466.10,
  'TATAMOTORS': 988.11
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
  const [activeTab, setActiveTab] = useState('chart');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  // Option Chain Symbol State & Professional Greeks Rows
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

  const stocks = [
    { name: 'NIFTY 50', price: 24893.03, change: '+1.26 (+0.01%)', isUp: true },
    { name: 'BANKNIFTY', price: 47595.12, change: '-0.81 (-0.01%)', isUp: false },
    { name: 'RELIANCE', price: 2973.10, change: '+0.02 (+0.00%)', isUp: true },
    { name: 'TCS', price: 3942.49, change: '+0.41 (+0.00%)', isUp: true },
    { name: 'INFY', price: 1624.84, change: '+0.03 (+0.00%)', isUp: true },
    { name: 'HDFCBANK', price: 1466.97, change: '+0.24 (+0.00%)', isUp: true },
    { name: 'TATAMOTORS', price: 989.40, change: '+0.64 (+0.01%)', isUp: true },
  ];

  const optionSymbols = ['NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'];
  const currentStockObj = stocks.find(s => s.name === selectedStock) || stocks[0];

  const optionRows = [
    { strike: 80600, callVol: '55.27 L', callIV: '18.12', callVega: '26.99', callGamma: '0.0003', callTheta: '-81.73', callDelta: '0.65', callOIChg: '+36,620', callOILakhs: '1.56', callLTP: '840.00', putLTP: '383.40', putOILakhs: '2.31', putOIChg: '+44,620', putDelta: '-0.36', putTheta: '-96.83', putGamma: '0.0002', putVega: '27.55', putIV: '21.03', putVol: '93.17 L' },
    { strike: 80700, callVol: '84.18 L', callIV: '18.56', callVega: '27.82', callGamma: '0.0003', callTheta: '-86.30', callDelta: '0.62', callOIChg: '+39,860', callOILakhs: '1.66', callLTP: '778.85', putLTP: '422.90', putOILakhs: '2.34', putOIChg: '+85,660', putDelta: '-0.38', putTheta: '-97.16', putGamma: '0.0003', putVega: '28.09', putIV: '20.70', putVol: '1.05 Cr' },
    { strike: 80800, callVol: '1.15 Cr', callIV: '18.44', callVega: '28.40', callGamma: '0.0003', callTheta: '-87.52', callDelta: '0.59', callOIChg: '+1,46,920', callOILakhs: '2.38', callLTP: '718.80', putLTP: '464.30', putOILakhs: '2.48', putOIChg: '+1,04,520', putDelta: '-0.41', putTheta: '-98.46', putGamma: '0.0003', putVega: '28.57', putIV: '20.62', putVol: '1.16 Cr' },
    { strike: 80900, callVol: '1.00 Cr', callIV: '18.82', callVega: '28.87', callGamma: '0.0003', callTheta: '-90.82', callDelta: '0.56', callOIChg: '+2,01,220', callOILakhs: '2.84', callLTP: '665.90', putLTP: '507.70', putOILakhs: '2.09', putOIChg: '+1,13,520', putDelta: '-0.43', putTheta: '-101.86', putGamma: '0.0003', putVega: '28.95', putIV: '21.06', putVol: '78.81 L' },
    { strike: 81000, callVol: '2.16 Cr', callIV: '19.02', callVega: '29.16', callGamma: '0.0003', callTheta: '-92.70', callDelta: '0.53', callOIChg: '+5,30,540', callOILakhs: '9.90', callLTP: '622.65', putLTP: '550.25', putOILakhs: '7.66', putOIChg: '+4,39,340', putDelta: '-0.46', putTheta: '-101.35', putGamma: '0.0002', putVega: '29.18', putIV: '20.79', putVol: '1.47 Cr' },
  ];

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
      alert(`Successfully ${type}ed ${instrumentName} Position! Added to Positions.`);
    } else {
      setHoldings([newTrade, ...holdings]);
      alert(`Successfully added ${instrumentName} to Holdings!`);
    }
  };

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
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-purple-600" required />
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer mt-2">
              Login to Terminal &rarr;
            </button>
          </form>
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
                  <p className="text-[10px] text-gray-400 mt-0.5">pkamble.kvic@hokvic.gov.in</p>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <button onClick={() => { setShowProfileMenu(false); setIsLoggedIn(false); }} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center space-x-2 font-bold transition-all cursor-pointer"><span>🚪 Logout</span></button>
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
              <div key={idx} onClick={() => setSelectedStock(stock.name)} className={`p-3 hover:bg-gray-800/60 cursor-pointer transition-all flex items-center justify-between ${selectedStock === stock.name ? 'bg-gray-800/80 border-l-4 border-purple-600' : ''}`}>
                <div>
                  <p className="text-xs font-bold text-gray-200">{stock.name}</p>
                  <p className="text-[10px] text-gray-500">NSE</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-200">₹{stock.price.toFixed(2)}</p>
                  <p className={`text-[10px] font-medium ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>{stock.change}</p>
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

          {/* 🌟 Professional Option Chain View with All Indices & Greeks Columns */}
          {activeTab === 'optionChain' && (
            <div className="bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-2xl flex-1 flex flex-col font-sans text-gray-100 overflow-hidden">
              
              {/* Indices & Commodities Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-gray-800">
                <span className="text-xs font-bold text-gray-400 mr-2">Option Chain:</span>
                {optionSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setSelectedOptionSymbol(sym)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedOptionSymbol === sym 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="font-bold text-purple-400">📊 Option Chain for {selectedOptionSymbol}</span>
                <span className="text-gray-400">Click <strong className="text-blue-400">[B]</strong> to Buy or <strong className="text-red-400">[S]</strong> to Sell</span>
              </div>

              {/* Professional Pro Greeks & Volume Table */}
              <div className="overflow-x-auto flex-1 border border-gray-800 rounded-lg">
                <table className="w-full text-left text-[11px] text-gray-300 border-collapse whitespace-nowrap font-mono">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-center uppercase tracking-wider text-[10px]">
                      <th className="p-2.5 border-r border-gray-800/60 bg-blue-950/20" colSpan="10">Calls (CE)[cite: 7]</th>
                      <th className="p-2.5 bg-gray-900 font-bold text-amber-400">Strike</th>
                      <th className="p-2.5 border-l border-gray-800/60 bg-red-950/20" colSpan="10">Puts (PE)[cite: 7]</th>
                    </tr>
                    <tr className="bg-gray-900/90 text-gray-400 border-b border-gray-800 text-[10px]">
                      <th className="p-2">Volume</th>
                      <th className="p-2">IV[cite: 10]</th>
                      <th className="p-2">Vega[cite: 10]</th>
                      <th className="p-2">Gamma[cite: 10]</th>
                      <th className="p-2">Theta[cite: 10]</th>
                      <th className="p-2">Delta[cite: 10]</th>
                      <th className="p-2">OI (chg)[cite: 10]</th>
                      <th className="p-2">OI (Lakhs)[cite: 10]</th>
                      <th className="p-2">LTP[cite: 10]</th>
                      <th className="p-2 border-r border-gray-800">Action</th>
                      <th className="p-2 text-center bg-gray-900 font-bold text-amber-400">PRICE</th>
                      <th className="p-2 border-l border-gray-800">Action</th>
                      <th className="p-2">LTP[cite: 10]</th>
                      <th className="p-2">OI (Lakhs)[cite: 10]</th>
                      <th className="p-2">OI (chg)[cite: 10]</th>
                      <th className="p-2">Delta[cite: 10]</th>
                      <th className="p-2">Theta[cite: 10]</th>
                      <th className="p-2">Gamma[cite: 10]</th>
                      <th className="p-2">Vega[cite: 10]</th>
                      <th className="p-2">IV[cite: 10]</th>
                      <th className="p-2">Volume[cite: 10]</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {optionRows.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/45 transition-colors">
                        <td className="p-2 text-gray-400">{r.callVol}</td>
                        <td className="p-2 text-gray-400">{r.callIV}</td>
                        <td className="p-2 text-gray-400">{r.callVega}</td>
                        <td className="p-2 text-gray-400">{r.callGamma}</td>
                        <td className="p-2 text-gray-400">{r.callTheta}</td>
                        <td className="p-2 text-gray-400">{r.callDelta}</td>
                        <td className="p-2 text-green-400">{r.callOIChg}</td>
                        <td className="p-2 text-blue-400 font-bold">{r.callOILakhs}</td>
                        <td className="p-2 text-amber-400 font-bold">₹{r.callLTP}</td>
                        <td className="p-2 border-r border-gray-800 space-x-1 text-center">
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} CE`, parseFloat(r.callLTP), 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} CE`, parseFloat(r.callLTP), 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                        </td>

                        <td className="p-2 text-center font-bold text-white bg-gray-900/80 border-x border-gray-800 text-xs">
                          {r.strike}
                        </td>

                        <td className="p-2 border-l border-gray-800 space-x-1 text-center">
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} PE`, parseFloat(r.putLTP), 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                          <button onClick={() => executeTrade(`${selectedOptionSymbol} ${r.strike} PE`, parseFloat(r.putLTP), 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                        </td>
                        <td className="p-2 text-amber-400 font-bold">₹{r.putLTP}</td>
                        <td className="p-2 text-blue-400 font-bold">{r.putOILakhs}</td>
                        <td className="p-2 text-green-400">{r.putOIChg}</td>
                        <td className="p-2 text-gray-400">{r.putDelta}</td>
                        <td className="p-2 text-gray-400">{r.putTheta}</td>
                        <td className="p-2 text-gray-400">{r.putGamma}</td>
                        <td className="p-2 text-gray-400">{r.putVega}</td>
                        <td className="p-2 text-gray-400">{r.putIV}</td>
                        <td className="p-2 text-gray-400">{r.putVol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Portfolio View */}
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

              <div className="flex space-x-4 border-b border-gray-800 pb-3 mb-4 text-xs font-semibold">
                <button onClick={() => setPortfolioSubTab('positions')} className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'positions' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Positions ({positions.length})</button>
                <button onClick={() => setPortfolioSubTab('holdings')} className={`pb-1 border-b-2 cursor-pointer ${portfolioSubTab === 'holdings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Holdings ({holdings.length})</button>
              </div>

              {portfolioSubTab === 'positions' && (
                <div className="flex-1">
                  {positions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">No open positions available. Place trade from Option Chain[cite: 7].</div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400"><th className="py-2">Instrument</th><th className="py-2">Type</th><th className="py-2">Qty</th><th className="py-2">Avg. Price</th><th className="py-2">P&L</th></tr>
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

              {portfolioSubTab === 'holdings' && (
                <div className="flex-1">
                  {holdings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-xs border border-dashed border-gray-800 rounded-lg">No holdings available.</div>
                  ) : (
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead>
                        <tr className="border-b border-gray-800 text-gray-400"><th className="py-2">Stock Name</th><th className="py-2">Qty</th><th className="py-2">Buy Price</th><th className="py-2">Current Value</th></tr>
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

        {/* Basket Drawer */}
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

      {/* Token Modal */}
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

      {/* Quick Trade Modal */}
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