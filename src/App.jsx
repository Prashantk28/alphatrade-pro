import React, { useState, useEffect, useRef } from 'react';

// 📈 TradingView Chart Component (Keeps top stock bar & BUY/SELL buttons intact)
function TradingViewChartSection({ stock, onTrade }) {
  const [timeframe, setTimeframe] = useState('15m');
  const containerRef = useRef(null);

  const tvIntervalMap = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '1H': '60',
    '1D': 'D',
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    const exchangePrefix = stock.exchange?.includes('BSE') ? 'BSE' : 'NSE';
    const cleanSymbol = stock.symbol.replace(/\s+/g, '');

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `${exchangePrefix}:${cleanSymbol}`,
      interval: tvIntervalMap[timeframe] || '15',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [stock.symbol, stock.exchange, timeframe]);

  return (
    <div className="flex-1 flex flex-col bg-[#0b0e14] border border-[#1e2638] rounded-xl overflow-hidden h-full min-h-[560px]">
      {/* Top Stock Bar & BUY / SELL Buttons */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#121622] border-b border-[#1e2638] gap-2 shrink-0">
        <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
          <span className="font-bold text-white tracking-wide">{stock.symbol}</span>
          <span className="text-gray-400 text-xs">{stock.exchange}</span>
          <span className="text-gray-600">•</span>
          <div className="flex items-center space-x-1 bg-[#0b0e14] px-1.5 py-0.5 rounded border border-gray-800">
            {['1m', '5m', '15m', '1H', '1D'].map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold cursor-pointer transition ${
                  timeframe === tf ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <span className="text-gray-600">•</span>
          <span className="text-amber-400 font-bold font-mono">
            LTP: ₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block text-[11px] bg-[#1a2030] border border-gray-700 text-gray-300 px-2.5 py-1 rounded">
            Tradingview Live Chart
          </span>
          <button
            type="button"
            onClick={() => onTrade(stock.symbol, stock.ltp, 'BUY')}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-1.5 rounded transition cursor-pointer"
          >
            BUY ₹{stock.ltp.toFixed(2)}
          </button>
          <button
            type="button"
            onClick={() => onTrade(stock.symbol, stock.ltp, 'SELL')}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3.5 py-1.5 rounded transition cursor-pointer"
          >
            SELL ₹{stock.ltp.toFixed(2)}
          </button>
        </div>
      </div>

      {/* TradingView Live Chart Container */}
      <div className="flex-1 relative bg-[#0b0e14] w-full h-full min-h-[500px]">
        <div ref={containerRef} className="tradingview-widget-container w-full h-full" />
      </div>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState('pulse'); // 'pulse' | 'chart' | 'optionChain' | 'portfolio'
  const [pulseSubTab, setPulseSubTab] = useState('All Overview');
  const [activeWatchlistGroup, setActiveWatchlistGroup] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [newSymbolInput, setNewSymbolInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [virtualFunds, setVirtualFunds] = useState(505765);
  const [bookedPnL, setBookedPnL] = useState(43.10);

  const [watchlist, setWatchlist] = useState([
    { symbol: 'DHANSAFAL', exchange: 'BSE X', ltp: 120.26, change: '14.69 (13.91%)', isUp: true },
    { symbol: 'EXIDEIND', exchange: 'NSE EQ', ltp: 456.53, change: '+70.58 (+18.29%)', isUp: true },
    { symbol: 'PVRINOX', exchange: 'NSE EQ', ltp: 1849.19, change: '+265.79 (+16.79%)', isUp: true },
    { symbol: 'PNB', exchange: 'NSE EQ', ltp: 164.62, change: '26.13 (18.87%)', isUp: true },
    { symbol: 'PCBL', exchange: 'NSE EQ', ltp: 326.34, change: '45.79 (16.32%)', isUp: true },
    { symbol: 'GTLINFRA', exchange: 'NSE EQ', ltp: 1.10, change: '-0.01 (-0.90%)', isUp: false },
    { symbol: 'ONGC', exchange: 'NSE EQ', ltp: 247.82, change: '+12.96 (+5.52%)', isUp: true },
    { symbol: 'CIPLA', exchange: 'NSE EQ', ltp: 1578.03, change: '+158.13 (+11.14%)', isUp: true },
    { symbol: 'IDFCFIRSTB', exchange: 'NSE EQ', ltp: 92.70, change: '+12.52 (+15.61%)', isUp: true },
    { symbol: 'PNBHOUSING', exchange: 'NSE EQ', ltp: 1333.36, change: '+211.66 (+18.87%)', isUp: true },
    { symbol: 'TECHM', exchange: 'NSE EQ', ltp: 2066.71, change: '+278.21 (+15.56%)', isUp: true },
    { symbol: 'SPENCERS', exchange: 'NSE EQ', ltp: 27.74, change: '+5.97 (+27.42%)', isUp: true },
    { symbol: 'COALINDIA', exchange: 'NSE EQ', ltp: 457.05, change: '50.75 (12.49%)', isUp: true },
    { symbol: 'HINDZINC', exchange: 'NSE EQ', ltp: 642.39, change: '+63.39 (+10.95%)', isUp: true },
  ]);

  const [selectedStock, setSelectedStock] = useState(watchlist[1]); // Default EXIDEIND
  const [selectedOptionIndex, setSelectedOptionIndex] = useState('SENSEX');
  const [selectedExpiry, setSelectedExpiry] = useState('12 Nov 2026');
  const [portfolioTab, setPortfolioTab] = useState('Trade Analytics Report');

  const [orders, setOrders] = useState([
    { id: 1, symbol: 'NIFTY 17 NOV 25100 CE', side: 'BUY', qty: 75, price: 164.37, pnl: '+₹28.50' },
    { id: 2, symbol: 'EXIDEIND NSE EQ', side: 'BUY', qty: 10, price: 455.07, pnl: '+₹14.60' },
  ]);

  const handleAddSymbol = (e) => {
    e.preventDefault();
    const sym = newSymbolInput.trim().toUpperCase();
    if (!sym) return;
    if (!watchlist.some((w) => w.symbol === sym)) {
      const added = { symbol: sym, exchange: 'NSE EQ', ltp: 540.00, change: '+4.20 (+0.78%)', isUp: true };
      setWatchlist([added, ...watchlist]);
      setSelectedStock(added);
    }
    setNewSymbolInput('');
  };

  const handleExecuteTrade = (symbol, price, side) => {
    const newOrder = {
      id: Date.now(),
      symbol,
      side,
      qty: 25,
      price: Number(price),
      pnl: '+₹0.00',
    };
    setOrders([newOrder, ...orders]);
    alert(`${side} Order Executed for ${symbol} @ ₹${Number(price).toFixed(2)} (Paper Trading)`);
  };

  const filteredWatchlist = watchlist.filter((item) =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indices = [
    { name: 'NIFTY 50', value: '25,151.56', change: '-0.71%', isUp: false },
    { name: 'SENSEX', value: '81,485.85', change: '-0.51%', isUp: false },
    { name: 'BANKNIFTY', value: '61,044.24', change: '-0.80%', isUp: false },
    { name: 'FINNIFTY', value: '27,782.15', change: '-1.03%', isUp: false },
    { name: 'MIDCPNIFTY', value: '14,324.44', change: '+0.01%', isUp: true },
  ];

  const trendingStocks = [
    { symbol: 'TDPOWERSYS', ltp: 652.47, changePct: '+4.38%', changeVal: '+27.4', isUp: true },
    { symbol: 'COALINDIA', ltp: 403.46, changePct: '-0.10%', changeVal: '-0.4', isUp: false },
    { symbol: 'GOLDBEES', ltp: 112.00, changePct: '-0.86%', changeVal: '-0.97', isUp: false },
    { symbol: 'TATAGOLD', ltp: 13.17, changePct: '-0.83%', changeVal: '-0.11', isUp: false },
    { symbol: 'SILVERBEES', ltp: 168.76, changePct: '-1.55%', changeVal: '-2.66', isUp: false },
    { symbol: 'CUPID', ltp: 369.68, changePct: '-3.95%', changeVal: '-15.2', isUp: false },
  ];

  const buzzingNews = [
    { symbol: 'OLAELEC', price: '₹34.51', change: '-3.44%', text: 'Demand no longer a constraint; supply limits growth now', isUp: false },
    { symbol: 'TATAPOWER', price: '₹351.00', change: '-1.68%', text: 'Renewables capex was around ₹6,000 crore in H1 FY27', isUp: false },
    { symbol: 'DODLA', price: '₹955.75', change: '-1.02%', text: 'Raised milk prices by up to ₹8 per litre starting November', isUp: false },
    { symbol: 'ITC', price: '₹284.25', change: '+0.07%', text: 'Raised MRP of 10-stick Gold Flake pack by 8% to ₹135', isUp: true },
  ];

  const trendingOptions = [
    { contract: 'NIFTY 17 NOV 25100 CE', moneyness: 'ATM', ltp: 164.37, change: '-119.75 (-42.17%)', oiChange: '+82.29L (+812.7%)' },
    { contract: 'NIFTY 17 NOV 25150 CE', moneyness: 'OTM +1', ltp: 139.77, change: '-114.00 (-45.08%)', oiChange: '+78.45L (+1298.7%)' },
    { contract: 'NIFTY 17 NOV 25200 CE', moneyness: 'OTM +2', ltp: 115.31, change: '-108.00 (-47.95%)', oiChange: '+150.01L (+456.5%)' },
    { contract: 'NIFTY 17 NOV 25250 CE', moneyness: 'OTM +3', ltp: 97.67, change: '-100.65 (-50.77%)', oiChange: '+87.81L (+179.9%)' },
    { contract: 'NIFTY 17 NOV 25300 CE', moneyness: 'OTM +4', ltp: 84.04, change: '-93.85 (-53.67%)', oiChange: '+124.11L (+75.9%)' },
  ];

  const oiLevels = [
    { strike: '24,800', call: '25L', put: '95L', callPct: 20, putPct: 65 },
    { strike: '24,900', call: '35L', put: '110L', callPct: 28, putPct: 75 },
    { strike: '25,000', call: '45L', put: '145L', callPct: 35, putPct: 90 },
    { strike: '25,100', call: '70L', put: '120L', callPct: 52, putPct: 80, active: true },
    { strike: '25,200', call: '140L', put: '65L', callPct: 85, putPct: 45 },
    { strike: '25,300', call: '155L', put: '40L', callPct: 92, putPct: 30 },
    { strike: '25,400', call: '130L', put: '25L', callPct: 78, putPct: 20 },
  ];

  const optionChainRows = [
    { strike: 81340, cVol: '21.48 L', cIV: '29.48', cVega: '2.8767', cGamma: '0.0004', cTheta: '-422.2445', cDelta: '1.1196', cOIChg: '-36141', cOI: '15.40', cLTP: 869.36, pLTP: 33.12, pOI: '35.69', pOIChg: '+100940', pDelta: '-0.7425', pTheta: '-694.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '14.18 Cr' },
    { strike: 81440, cVol: '18.98 L', cIV: '29.68', cVega: '2.9767', cGamma: '0.0004', cTheta: '-412.2445', cDelta: '1.0696', cOIChg: '-34641', cOI: '16.60', cLTP: 802.35, pLTP: 62.62, pOI: '34.89', pOIChg: '+103440', pDelta: '-0.7025', pTheta: '-704.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '12.68 Cr' },
    { strike: 81540, cVol: '16.48 L', cIV: '29.88', cVega: '3.0767', cGamma: '0.0004', cTheta: '-402.2445', cDelta: '1.0196', cOIChg: '-33141', cOI: '17.80', cLTP: 732.89, pLTP: 54.09, pOI: '34.09', pOIChg: '+105940', pDelta: '-0.6625', pTheta: '-714.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '11.18 Cr' },
    { strike: 81640, cVol: '13.98 L', cIV: '30.08', cVega: '3.1767', cGamma: '0.0004', cTheta: '-392.2445', cDelta: '0.9696', cOIChg: '-31641', cOI: '19.00', cLTP: 682.05, pLTP: 125.76, pOI: '33.29', pOIChg: '+108440', pDelta: '-0.6225', pTheta: '-724.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '9.68 Cr' },
    { strike: 81740, cVol: '11.48 L', cIV: '30.28', cVega: '3.2767', cGamma: '0.0004', cTheta: '-382.2445', cDelta: '0.9196', cOIChg: '-30141', cOI: '20.20', cLTP: 580.79, pLTP: 166.75, pOI: '32.49', pOIChg: '+110940', pDelta: '-0.5825', pTheta: '-734.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '8.18 Cr' },
    { strike: 81840, cVol: '8.98 L', cIV: '30.48', cVega: '3.3767', cGamma: '0.0004', cTheta: '-372.2445', cDelta: '0.8696', cOIChg: '-28641', cOI: '21.40', cLTP: 518.33, pLTP: 262.05, pOI: '31.69', pOIChg: '+113440', pDelta: '-0.5425', pTheta: '-744.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '12.68 Cr' },
    { strike: 81940, cVol: '11.48 L', cIV: '30.68', cVega: '3.4767', cGamma: '0.0004', cTheta: '-362.2445', cDelta: '0.8196', cOIChg: '-27141', cOI: '22.60', cLTP: 401.08, pLTP: 320.66, pOI: '30.89', pOIChg: '+115940', pDelta: '-0.5025', pTheta: '-754.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '14.18 Cr' },
    { strike: 82040, cVol: '13.98 L', cIV: '30.88', cVega: '3.5767', cGamma: '0.0004', cTheta: '-352.2445', cDelta: '0.7696', cOIChg: '-25641', cOI: '23.80', cLTP: 406.08, pLTP: 408.30, pOI: '30.09', pOIChg: '+118440', pDelta: '-0.4625', pTheta: '-764.3559', pGamma: '0.0008', pVega: '6.3189', pIV: '32.57', pVol: '15.68 Cr' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans select-none">
      {/* ⚠️ Top Warning Banner */}
      <div className="bg-[#3d2e0c] border-b border-amber-500/40 px-4 py-1.5 flex items-center justify-center space-x-2 text-amber-300 text-xs font-bold tracking-wide z-50">
        <span>⚠️</span>
        <span>Paper Trading (Virtual Funds Only) — No Real Money Involved</span>
      </div>

      {/* Main Header */}
      <header className="bg-[#11151f] border-b border-gray-800/90 px-4 py-2 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-40">
        {/* Left Brand & Metrics */}
        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
          <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm shadow">
            AlphaTrade Pro
          </span>
          <div className="bg-[#13251e] border border-emerald-600/40 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-semibold">
            $ Funds: ₹{virtualFunds.toLocaleString('en-IN')}
          </div>
          <div className="bg-[#13251e] border border-emerald-600/40 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-semibold">
            Booked P&amp;L: +₹{bookedPnL.toFixed(2)}
          </div>
          <div className="hidden lg:block bg-[#1d1836] border border-purple-500/40 text-purple-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
            🕒 Analytics (Win: 100.0%)
          </div>
        </div>

        {/* Center Main Navigation */}
        <nav className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => setActiveNav('pulse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeNav === 'pulse' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            🔥 Market Pulse
          </button>
          <button
            type="button"
            onClick={() => setActiveNav('chart')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeNav === 'chart' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            📊 Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveNav('optionChain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeNav === 'optionChain' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            Option Chain
          </button>
          <button
            type="button"
            onClick={() => setActiveNav('portfolio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeNav === 'portfolio' ? 'bg-purple-600 text-white shadow' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            Portfolio &amp; History
          </button>
        </nav>

        {/* Right Upstox Status & Profile */}
        <div className="flex items-center space-x-2 relative">
          <div className="flex items-center space-x-1.5 bg-[#11271d] border border-emerald-500/40 px-3 py-1 rounded-lg text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">Upstox Connected</span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold w-8 h-8 rounded-lg text-xs flex items-center justify-center cursor-pointer"
            >
              PK
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#161b26] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-4 py-2.5 border-b border-gray-800">
                  <p className="font-bold text-white">👤 Prashant Kamble</p>
                  <p className="text-[11px] text-gray-400">User ID: 122758</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setActiveNav('portfolio'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 cursor-pointer"
                >
                  👤 My Account | ID 122758
                </button>
                <button
                  type="button"
                  onClick={() => { setVirtualFunds((f) => f + 100000); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-emerald-400 hover:bg-gray-800 cursor-pointer"
                >
                  $ Funds &amp; Margin (+₹1L)
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveNav('portfolio'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 text-purple-300 hover:bg-gray-800 cursor-pointer"
                >
                  🕒 Trade Analytics Report
                </button>
                <div className="border-t border-gray-800 mt-1 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 font-semibold cursor-pointer"
                  >
                    ↪ Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Watchlist Sidebar */}
        <aside className="w-72 bg-[#11151f] border-r border-gray-800/90 flex flex-col shrink-0 hidden md:flex">
          {/* Group Numbers 1-7 */}
          <div className="p-2.5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveWatchlistGroup(num)}
                  className={`w-6 h-6 rounded text-xs font-bold cursor-pointer ${
                    activeWatchlistGroup === num
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#1a2030] text-gray-400 hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveWatchlistGroup((g) => (g < 7 ? g + 1 : 1))}
              className="w-6 h-6 rounded bg-[#1a2030] text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="px-3 py-2 border-b border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
            <span className="text-amber-400 font-semibold">📁 Group {activeWatchlistGroup} ({watchlist.length})</span>
            <span>✏️</span>
          </div>

          <div className="px-3 py-2 border-b border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
            <span>Watchlist (Live TBT)</span>
            <span className="font-semibold text-gray-300">{watchlist.length} Stocks</span>
          </div>

          {/* Search & Add Symbol */}
          <div className="p-2.5 space-y-2 border-b border-gray-800">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search stock eg: RELIANCE, TCS..."
              className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-600"
            />
            <form onSubmit={handleAddSymbol} className="flex space-x-1.5">
              <input
                type="text"
                value={newSymbolInput}
                onChange={(e) => setNewSymbolInput(e.target.value)}
                placeholder="Add symbol (e.g. INFY)"
                className="flex-1 bg-[#0b0e14] border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white px-2.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                +
              </button>
            </form>
          </div>

          {/* Stock Rows */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-800/60">
            {filteredWatchlist.map((item) => {
              const isSelected = selectedStock.symbol === item.symbol;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    setSelectedStock(item);
                    setActiveNav('chart');
                  }}
                  className={`px-3 py-2.5 hover:bg-[#181f2e] cursor-pointer flex items-center justify-between transition ${
                    isSelected ? 'bg-[#1a2234] border-l-2 border-purple-500' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-white">{item.symbol}</span>
                      <span className="text-[9px] text-gray-500 uppercase">{item.exchange}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-0.5 text-[11px] font-mono">
                      <span className="text-gray-200 font-semibold">₹{item.ltp.toFixed(2)}</span>
                      <span className={item.isUp ? 'text-emerald-400' : 'text-red-400'}>
                        {item.change}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleExecuteTrade(item.symbol, item.ltp, 'BUY')}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded cursor-pointer"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExecuteTrade(item.symbol, item.ltp, 'SELL')}
                      className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded cursor-pointer"
                    >
                      S
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#0b0e14] flex flex-col">
          {/* 1️⃣ MARKET PULSE TAB */}
          {activeNav === 'pulse' && (
            <div className="space-y-4">
              {/* Top 5 Index Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {indices.map((idx) => (
                  <div
                    key={idx.name}
                    onClick={() => {
                      setSelectedStock({ symbol: idx.name === 'NIFTY 50' ? 'NIFTY' : idx.name, exchange: 'NSE', ltp: parseFloat(idx.value.replace(/,/g, '')), change: idx.change, isUp: idx.isUp });
                      setActiveNav('chart');
                    }}
                    className="bg-[#121622] border border-gray-800 hover:border-purple-500/50 rounded-xl p-3 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span>{idx.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${idx.isUp ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                        {idx.change}
                      </span>
                    </div>
                    <p className="text-base font-bold text-white mt-1.5 font-mono">{idx.value}</p>
                  </div>
                ))}
              </div>

              {/* Sub-navigation Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#121622] border border-gray-800 p-2 rounded-xl">
                <div className="flex flex-wrap gap-1.5">
                  {['Option Chain', 'OI Analysis', 'Advisory Calls', 'MTF Margin', 'Commodities & Fut', 'Upcoming IPOs', 'All Overview'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        if (tab === 'Option Chain') setActiveNav('optionChain');
                        else setPulseSubTab(tab);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                        pulseSubTab === tab
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#191f2e] text-gray-300 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-gray-400">
                  Spot NIFTY: <strong className="text-amber-400">25,127.85</strong> • MCX Live TBT Feeds Active
                </span>
              </div>

              {/* Trending Stocks & Buzzing News Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-[#121622] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">📈 Trending Stocks &amp; ETFs (Live TBT)</h3>
                    <span className="text-[10px] bg-[#1a2234] text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                      NSE / BSE Live
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {trendingStocks.map((st) => (
                      <div key={st.symbol} className="bg-[#0d111a] border border-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{st.symbol}</span>
                          <span className={st.isUp ? 'text-emerald-400' : 'text-red-400'}>{st.changePct}</span>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <div>
                            <p className="text-sm font-bold text-gray-100 font-mono">₹{st.ltp.toFixed(2)}</p>
                            <p className={`text-[11px] ${st.isUp ? 'text-emerald-400' : 'text-red-400'}`}>{st.changeVal}</p>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => handleExecuteTrade(st.symbol, st.ltp, 'BUY')}
                              className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer"
                            >
                              B
                            </button>
                            <button
                              type="button"
                              onClick={() => handleExecuteTrade(st.symbol, st.ltp, 'SELL')}
                              className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer"
                            >
                              S
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buzzing Stocks in News */}
                <div className="bg-[#121622] border border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3">⚡ Buzzing Stocks in News</h3>
                  <div className="space-y-2.5">
                    {buzzingNews.map((news) => (
                      <div key={news.symbol} className="bg-[#0d111a] border border-gray-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-bold text-white">{news.symbol}</span>
                            <span className="text-gray-300 font-mono">{news.price}</span>
                            <span className={news.isUp ? 'text-emerald-400' : 'text-red-400'}>{news.change}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{news.text}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStock({ symbol: news.symbol, exchange: 'NSE EQ', ltp: parseFloat(news.price.replace('₹', '')), change: news.change, isUp: news.isUp });
                            setActiveNav('chart');
                          }}
                          className="bg-[#1e2638] hover:bg-purple-600 text-gray-200 hover:text-white text-[11px] px-2.5 py-1 rounded cursor-pointer shrink-0"
                        >
                          Trade
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Options & NIFTY OI Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-[#121622] border border-gray-800 rounded-xl p-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">📈 Trending Options (17 NOV Expiry)</h3>
                    <button
                      type="button"
                      onClick={() => setActiveNav('optionChain')}
                      className="text-xs text-purple-400 hover:underline cursor-pointer"
                    >
                      Full Option Chain ↗
                    </button>
                  </div>
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="text-[10px] text-gray-400 border-b border-gray-800 uppercase">
                        <th className="py-2">Contract Symbol</th>
                        <th className="py-2">Moneyness</th>
                        <th className="py-2">LTP</th>
                        <th className="py-2">Change</th>
                        <th className="py-2">OI Change</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {trendingOptions.map((opt) => (
                        <tr key={opt.contract} className="hover:bg-[#171d2c]">
                          <td className="py-2.5 font-bold text-white">{opt.contract}</td>
                          <td className="py-2.5">
                            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px]">{opt.moneyness}</span>
                          </td>
                          <td className="py-2.5 text-emerald-400 font-bold font-mono">₹{opt.ltp.toFixed(2)}</td>
                          <td className="py-2.5 text-red-400 font-mono">{opt.change}</td>
                          <td className="py-2.5 text-emerald-400 font-mono">{opt.oiChange}</td>
                          <td className="py-2.5 text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => handleExecuteTrade(opt.contract, opt.ltp, 'BUY')}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
                            >
                              Buy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleExecuteTrade(opt.contract, opt.ltp, 'SELL')}
                              className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
                            >
                              Sell
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* NIFTY OI Analysis */}
                <div className="bg-[#121622] border border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white">📊 NIFTY OI Analysis</h3>
                    <span className="text-[10px] text-gray-400">Exp: 17 Nov 2026</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">
                    Spot Close: <strong className="text-amber-400">25,127.85</strong> • Max Pain: <strong className="text-white">25,100</strong>
                  </p>
                  <div className="space-y-2.5 text-[11px]">
                    {oiLevels.map((lvl) => (
                      <div key={lvl.strike}>
                        <div className="flex justify-between mb-1 font-mono">
                          <span className="text-red-400">{lvl.call}</span>
                          <span className={lvl.active ? 'text-amber-400 font-bold underline' : 'text-gray-300'}>
                            {lvl.strike}
                          </span>
                          <span className="text-emerald-400">{lvl.put}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden flex justify-between">
                          <div className="bg-red-500 h-full" style={{ width: `${lvl.callPct}%` }} />
                          <div className="bg-emerald-500 h-full" style={{ width: `${lvl.putPct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2️⃣ CHART TAB (TradingView Live Chart inside exact layout) */}
          {activeNav === 'chart' && (
            <TradingViewChartSection stock={selectedStock} onTrade={handleExecuteTrade} />
          )}

          {/* 3️⃣ OPTION CHAIN TAB */}
          {activeNav === 'optionChain' && (
            <div className="bg-[#121622] border border-gray-800 rounded-xl p-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-gray-800">
                <span className="text-xs text-gray-400 font-semibold mr-1">Option Chain:</span>
                {['NIFTY 50', 'BANKNIFTY', 'SENSEX', 'FINNIFTY', 'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'].map((idxName) => (
                  <button
                    key={idxName}
                    type="button"
                    onClick={() => setSelectedOptionIndex(idxName)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedOptionIndex === idxName
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#191f2e] text-gray-300 hover:text-white'
                    }`}
                  >
                    {idxName}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 py-3 border-b border-gray-800">
                <span className="text-xs text-gray-400 mr-1">Expiry:</span>
                {['12 Nov 2026', '19 Nov 2026', '26 Nov 2026', '03 Dec 2026', '10 Dec 2026', '17 Dec 2026', '24 Dec 2026'].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setSelectedExpiry(exp)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      selectedExpiry === exp
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#191f2e] text-gray-400 hover:text-white'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto flex-1 mt-3 border border-gray-800 rounded-lg">
                <table className="w-full text-left text-[11px] font-mono whitespace-nowrap border-collapse">
                  <thead>
                    <tr className="bg-[#0d111a] text-gray-400 border-b border-gray-800 text-center uppercase text-[10px]">
                      <th colSpan="10" className="p-2 border-r border-gray-800 text-blue-300">Calls</th>
                      <th className="p-2 bg-gray-900 text-amber-400 font-bold">Strike</th>
                      <th colSpan="10" className="p-2 border-l border-gray-800 text-red-300">Puts</th>
                    </tr>
                    <tr className="bg-[#161c2b] text-gray-400 border-b border-gray-800 text-[10px]">
                      <th className="p-2">Volume</th>
                      <th className="p-2">IV</th>
                      <th className="p-2">Vega</th>
                      <th className="p-2">Gamma</th>
                      <th className="p-2">Theta</th>
                      <th className="p-2">Delta</th>
                      <th className="p-2">OI (chg)</th>
                      <th className="p-2">OI (lakhs)</th>
                      <th className="p-2">LTP / Action</th>
                      <th className="p-2 border-r border-gray-800"></th>
                      <th className="p-2 text-center bg-gray-900 text-amber-400">PRICE</th>
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
                    {optionChainRows.map((row) => (
                      <tr key={row.strike} className="hover:bg-[#182032]">
                        <td className="p-2 text-gray-400">{row.cVol}</td>
                        <td className="p-2 text-gray-400">{row.cIV}</td>
                        <td className="p-2 text-gray-400">{row.cVega}</td>
                        <td className="p-2 text-gray-400">{row.cGamma}</td>
                        <td className="p-2 text-gray-400">{row.cTheta}</td>
                        <td className="p-2 text-gray-400">{row.cDelta}</td>
                        <td className="p-2 text-red-400">{row.cOIChg}</td>
                        <td className="p-2 text-white font-bold">{row.cOI}</td>
                        <td className="p-2 space-x-1" colSpan="2">
                          <button
                            type="button"
                            onClick={() => handleExecuteTrade(`${selectedOptionIndex} ${row.strike} CE`, row.cLTP, 'BUY')}
                            className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer"
                          >
                            B
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExecuteTrade(`${selectedOptionIndex} ${row.strike} CE`, row.cLTP, 'SELL')}
                            className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer"
                          >
                            S
                          </button>
                          <span className="text-amber-400 font-bold ml-1">₹{row.cLTP.toFixed(2)}</span>
                        </td>
                        <td className="p-2 text-center font-bold text-white bg-gray-900 border-x border-gray-800">
                          {row.strike}
                        </td>
                        <td className="p-2 space-x-1">
                          <span className="text-emerald-400 font-bold mr-1">₹{row.pLTP.toFixed(2)}</span>
                          <button
                            type="button"
                            onClick={() => handleExecuteTrade(`${selectedOptionIndex} ${row.strike} PE`, row.pLTP, 'BUY')}
                            className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer"
                          >
                            B
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExecuteTrade(`${selectedOptionIndex} ${row.strike} PE`, row.pLTP, 'SELL')}
                            className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer"
                          >
                            S
                          </button>
                        </td>
                        <td className="p-2 text-white font-bold">{row.pOI}</td>
                        <td className="p-2 text-emerald-400">{row.pOIChg}</td>
                        <td className="p-2 text-gray-400">{row.pDelta}</td>
                        <td className="p-2 text-gray-400">{row.pTheta}</td>
                        <td className="p-2 text-gray-400">{row.pGamma}</td>
                        <td className="p-2 text-gray-400">{row.pVega}</td>
                        <td className="p-2 text-gray-400">{row.pIV}</td>
                        <td className="p-2 text-gray-400">{row.pVol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4️⃣ PORTFOLIO & HISTORY TAB */}
          {activeNav === 'portfolio' && (
            <div className="bg-[#121622] border border-gray-800 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="text-sm font-bold text-white">Portfolio, Positions, GTT &amp; Trade Analytics</h2>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-[#13251e] border border-emerald-600/40 text-emerald-400 px-3 py-1 rounded-lg font-semibold">
                    Booked P&amp;L: +₹{bookedPnL.toFixed(2)}
                  </span>
                  <span className="bg-[#13251e] border border-emerald-600/40 text-emerald-400 px-3 py-1 rounded-lg font-semibold">
                    Net Live P&amp;L: +₹0.00
                  </span>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex flex-wrap gap-4 border-b border-gray-800 pb-2.5 mb-4 text-xs font-semibold">
                {['Holdings (0)', 'Positions (0)', 'GTT Orders (0)', `Order History (${orders.length})`, 'Trade Analytics Report'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPortfolioTab(tab)}
                    className={`pb-1 border-b-2 cursor-pointer ${
                      portfolioTab === tab
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {portfolioTab === 'Trade Analytics Report' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-[#0d111a] border border-gray-800 rounded-xl p-4">
                      <p className="text-[11px] text-gray-400">TOTAL EXECUTED TRADES</p>
                      <p className="text-2xl font-bold text-white mt-1">{orders.length}</p>
                    </div>
                    <div className="bg-[#0d111a] border border-gray-800 rounded-xl p-4">
                      <p className="text-[11px] text-emerald-400">PROFITABLE WINS</p>
                      <p className="text-2xl font-bold text-emerald-400 mt-1">{orders.length}</p>
                    </div>
                    <div className="bg-[#0d111a] border border-gray-800 rounded-xl p-4">
                      <p className="text-[11px] text-red-400">LOSSES</p>
                      <p className="text-2xl font-bold text-red-400 mt-1">0</p>
                    </div>
                    <div className="bg-[#0d111a] border border-gray-800 rounded-xl p-4">
                      <p className="text-[11px] text-purple-300">WIN / LOSS RATIO</p>
                      <p className="text-2xl font-bold text-purple-400 mt-1">100.0%</p>
                    </div>
                  </div>

                  <div className="bg-[#0d111a] border border-gray-800 rounded-xl p-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-semibold text-gray-200">Performance Accuracy Meter</span>
                      <span className="text-emerald-400 font-bold">100.0% Win Rate</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-800 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#0d111a] text-gray-400 border-b border-gray-800">
                        <th className="p-3">Instrument</th>
                        <th className="p-3">Side</th>
                        <th className="p-3">Qty</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">P&amp;L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {orders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="p-3 font-bold text-white">{ord.symbol}</td>
                          <td className={`p-3 font-bold ${ord.side === 'BUY' ? 'text-blue-400' : 'text-red-400'}`}>
                            {ord.side}
                          </td>
                          <td className="p-3">{ord.qty}</td>
                          <td className="p-3 font-mono">₹{ord.price.toFixed(2)}</td>
                          <td className="p-3 text-emerald-400 font-mono">{ord.pnl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}