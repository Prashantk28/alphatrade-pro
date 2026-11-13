import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiActivity, FiAward, FiZap, FiLayers, FiBarChart2, FiBriefcase, FiArrowUpRight } from 'react-icons/fi';

export default function MarketOverview({ onQuickTrade, onOpenOptionChain }) {
  const [activeSubNav, setActiveSubNav] = useState('all');

  const [indexSnapshots, setIndexSnapshots] = useState([
    { name: 'NIFTY 50', price: 25119.45, pct: '-0.71%', isUp: false },
    { name: 'SENSEX', price: 81492.71, pct: '-0.51%', isUp: false },
    { name: 'BANKNIFTY', price: 61027.85, pct: '-0.80%', isUp: false },
    { name: 'FINNIFTY', price: 27766.80, pct: '-1.03%', isUp: false },
    { name: 'MIDCPNIFTY', price: 14324.05, pct: '+0.01%', isUp: true },
  ]);

  const [trendingStocks, setTrendingStocks] = useState([
    { symbol: 'TDPOWERSYS', price: 653.40, change: 27.40, pct: '+4.38%', isUp: true },
    { symbol: 'COALINDIA', price: 404.00, change: -0.40, pct: '-0.10%', isUp: false },
    { symbol: 'GOLDBEES', price: 111.74, change: -0.97, pct: '-0.86%', isUp: false },
    { symbol: 'TATAGOLD', price: 13.17, change: -0.11, pct: '-0.83%', isUp: false },
    { symbol: 'SILVERBEES', price: 168.71, change: -2.66, pct: '-1.55%', isUp: false },
    { symbol: 'CUPID', price: 369.55, change: -15.20, pct: '-3.95%', isUp: false },
  ]);

  const [trendingOptions, setTrendingOptions] = useState([
    { symbol: 'NIFTY 17 NOV 25100 CE', tag: 'ATM', ltp: 164.20, change: '-119.75 (-42.17%)', oi: '+82.29L (+812.7%)', isUp: false },
    { symbol: 'NIFTY 17 NOV 25150 CE', tag: 'OTM +1', ltp: 138.90, change: '-114.00 (-45.08%)', oi: '+78.45L (+1298.7%)', isUp: false },
    { symbol: 'NIFTY 17 NOV 25200 CE', tag: 'OTM +2', ltp: 117.25, change: '-108.00 (-47.95%)', oi: '+150.01L (+456.5%)', isUp: false },
    { symbol: 'NIFTY 17 NOV 25250 CE', tag: 'OTM +3', ltp: 97.60, change: '-100.65 (-50.77%)', oi: '+87.81L (+179.9%)', isUp: false },
    { symbol: 'NIFTY 17 NOV 25300 CE', tag: 'OTM +4', ltp: 81.00, change: '-93.85 (-53.67%)', oi: '+124.11L (+75.9%)', isUp: false },
  ]);

  const [momentumGainers, setMomentumGainers] = useState([
    { symbol: 'NIFTY 17 NOV 25200 PE', ltp: 183.90, pct: '+30.98%', vol: '23.73 Cr', iv: '14.00', oi: '+76.26L (+109.7%)', isUp: true },
    { symbol: 'NIFTY 17 NOV 25150 PE', ltp: 156.40, pct: '+30.77%', vol: '16.13 Cr', iv: '13.95', oi: '+60.08L (+276.9%)', isUp: true },
    { symbol: 'NIFTY 17 NOV 25050 PE', ltp: 108.55, pct: '+30.16%', vol: '9.56 Cr', iv: '13.90', oi: '+44.42L (+252.6%)', isUp: true },
    { symbol: 'NIFTY 17 NOV 25000 PE', ltp: 89.00, pct: '+29.74%', vol: '22.59 Cr', iv: '13.87', oi: '+125.69L (+60.1%)', isUp: true },
    { symbol: 'NIFTY 17 NOV 24950 PE', ltp: 72.50, pct: '+29.12%', vol: '6.81 Cr', iv: '13.83', oi: '+37.51L (+83.7%)', isUp: true },
  ]);

  const advisoryCalls = [
    { action: 'BUY', instrument: 'BANKNIFTY 61000 PE', expiry: '23 NOV 26', ltp: 672.00, entry: 799.00, sl: 349.00, target: 1799.00, potential: '171.20%', time: '12:21 PM' },
    { action: 'BUY', instrument: 'NIFTY 25200 PE', expiry: '17 NOV 26', ltp: 183.90, entry: 219.00, sl: 99.00, target: 599.00, potential: '229.90%', time: '02:27 PM' },
    { action: 'BUY', instrument: 'GVT&D 4500 CE', expiry: '23 NOV 26', ltp: 88.50, entry: 100.00, sl: 60.00, target: 150.00, potential: '71.80%', time: '10:38 AM' },
    { action: 'BUY', instrument: 'SIEMENS FUT', expiry: '23 NOV 26', ltp: 3682.00, entry: 3725.00, sl: 3650.00, target: 3835.00, potential: '19.80%', time: '10:42 AM' },
    { action: 'SELL', instrument: 'NIFTY 25500 PE', expiry: '29 DEC 26', ltp: 575.75, entry: 528.00, sl: 630.00, target: 375.00, potential: '7.00%', time: '01:09 PM' },
    { action: 'BUY', instrument: 'BSE 3900 CE', expiry: '23 NOV 26', ltp: 98.90, entry: 100.00, sl: 50.00, target: 135.00, potential: '34.50%', time: '01:24 PM' },
  ];

  const oiData = [
    { strike: '24,800', call: 25, put: 95 },
    { strike: '24,900', call: 35, put: 110 },
    { strike: '25,000', call: 45, put: 145 },
    { strike: '25,100', call: 70, put: 120 },
    { strike: '25,200', call: 140, put: 65 },
    { strike: '25,300', call: 155, put: 40 },
    { strike: '25,400', call: 130, put: 25 },
  ];

  const [mtfStocks, setMtfStocks] = useState([
    { symbol: 'BSE', ltp: 3923.80, pct: '+0.38%', payOnly: 1221.87, isUp: true },
    { symbol: 'HDFCBANK', ltp: 801.10, pct: '-1.38%', payOnly: 184.25, isUp: false },
    { symbol: 'SUZLON', ltp: 38.40, pct: '-1.18%', payOnly: 11.22, isUp: false },
    { symbol: 'TATAGOLD', ltp: 13.17, pct: '-0.83%', payOnly: 6.58, isUp: false },
    { symbol: 'IDEA', ltp: 12.56, pct: '-3.16%', payOnly: 4.14, isUp: false },
  ]);

  const [commoditiesFutures, setCommoditiesFutures] = useState([
    { symbol: 'CRUDEOIL 09 DEC 8000 CE', type: 'MCX OPT', ltp: 624.90, pct: '+12.86%', isUp: true },
    { symbol: 'CRUDEOIL 09 DEC 8300 CE', type: 'MCX OPT', ltp: 455.00, pct: '+15.37%', isUp: true },
    { symbol: 'PNB FUT (23 NOV)', type: 'NFO FUT', ltp: 144.55, pct: '+1.65%', isUp: true },
    { symbol: 'IDEA FUT (23 NOV)', type: 'NFO FUT', ltp: 12.57, pct: '-2.86%', isUp: false },
  ]);

  const buzzingStocks = [
    { symbol: 'OLAELEC', price: 34.51, pct: '-3.44%', isUp: false, news: 'Demand no longer a constraint; supply limits growth now' },
    { symbol: 'TATAPOWER', price: 351.00, pct: '-1.68%', isUp: false, news: 'Renewables capex was around ₹6,000 crore in H1 FY27' },
    { symbol: 'DODLA', price: 955.75, pct: '-1.02%', isUp: false, news: 'Raised milk prices by up to ₹8 per litre starting November' },
    { symbol: 'ITC', price: 284.25, pct: '+0.07%', isUp: true, news: 'Raised MRP of 10-stick Gold Flake pack by 8% to ₹135' },
  ];

  const upcomingIpos = [
    { name: 'Parle Products IPO', sector: 'Consumer Food', status: 'Opens Soon' },
    { name: 'Flipkart IPO', sector: 'e-Commerce', status: 'Opens Soon' },
    { name: 'PhonePe IPO', sector: 'Fintech', status: 'Opens Soon' },
    { name: 'Zepto IPO', sector: 'Quick Commerce', status: 'Opens Soon' },
    { name: 'Hero FinCorp IPO', sector: 'Finance - NBFC', status: 'Opens Soon' },
    { name: 'boAt IPO', sector: 'Consumer Electronics', status: 'Opens Soon' },
    { name: 'OYO IPO', sector: 'Hospitality', status: 'Opens Soon' },
    { name: 'FabIndia IPO', sector: 'Retail & Apparel', status: 'Opens Soon' },
  ];

  const quickTools = [
    { label: 'Option Chain', action: () => onOpenOptionChain('NIFTY 50') },
    { label: 'OI Analysis', action: () => setActiveSubNav('fno') },
    { label: 'Advisory Calls', action: () => setActiveSubNav('advisory') },
    { label: 'MTF Margin', action: () => setActiveSubNav('mtf') },
    { label: 'Commodities & Fut', action: () => setActiveSubNav('commodities') },
    { label: 'Upcoming IPOs', action: () => setActiveSubNav('ipo') },
    { label: 'All Overview', action: () => setActiveSubNav('all') },
  ];

  // **LIVE PRICE FLUCTUATION EFFECT (हर 1 सेकंदाला प्राईस बदलणार)**
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Index Ticker Update
      setIndexSnapshots(prev => prev.map(idx => {
        const delta = (Math.random() - 0.48) * 15;
        const newPrice = parseFloat((idx.price + delta).toFixed(2));
        return { ...idx, price: newPrice, isUp: delta >= 0 };
      }));

      // 2. Trending Stocks Update
      setTrendingStocks(prev => prev.map(st => {
        const delta = (Math.random() - 0.48) * (st.price * 0.003);
        const newPrice = parseFloat((st.price + delta).toFixed(2));
        return { ...st, price: newPrice, isUp: delta >= 0 };
      }));

      // 3. Trending Options Update
      setTrendingOptions(prev => prev.map(opt => {
        const delta = (Math.random() - 0.48) * 3;
        const newLtp = Math.max(2.00, parseFloat((opt.ltp + delta).toFixed(2)));
        return { ...opt, ltp: newLtp, isUp: delta >= 0 };
      }));

      // 4. Momentum Gainers Update
      setMomentumGainers(prev => prev.map(mg => {
        const delta = (Math.random() - 0.48) * 2;
        const newLtp = Math.max(2.00, parseFloat((mg.ltp + delta).toFixed(2)));
        return { ...mg, ltp: newLtp, isUp: delta >= 0 };
      }));

      // 5. MTF Stocks Update
      setMtfStocks(prev => prev.map(m => {
        const delta = (Math.random() - 0.48) * (m.ltp * 0.002);
        const newLtp = parseFloat((m.ltp + delta).toFixed(2));
        return { ...m, ltp: newLtp, isUp: delta >= 0 };
      }));

      // 6. Commodities & Futures Update
      setCommoditiesFutures(prev => prev.map(cf => {
        const delta = (Math.random() - 0.48) * 4;
        const newLtp = Math.max(5.00, parseFloat((cf.ltp + delta).toFixed(2)));
        return { ...cf, ltp: newLtp, isUp: delta >= 0 };
      }));

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-10 font-sans text-gray-100">
      
      {/* Top Index Ticker Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {indexSnapshots.map((idx, i) => (
          <div 
            key={i} 
            onClick={() => onOpenOptionChain(idx.name)}
            className="bg-[#12141c] hover:bg-gray-800/70 border border-gray-800 hover:border-purple-500/40 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <p className="text-[11px] font-bold text-gray-400">{idx.name}</p>
              <p className="text-sm font-mono font-bold text-white mt-0.5">{idx.price.toLocaleString()}</p>
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${idx.isUp ? 'bg-green-950/60 text-green-400' : 'bg-red-950/60 text-red-400'}`}>
              {idx.pct}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Tools Navigation Ribbon */}
      <div className="bg-[#12141c] border border-gray-800 rounded-xl p-2.5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {quickTools.map((tool, i) => (
            <button
              key={i}
              onClick={tool.action}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0b0e14] hover:bg-purple-600/20 text-gray-300 hover:text-purple-300 border border-gray-800 hover:border-purple-500/40 transition-all cursor-pointer whitespace-nowrap"
            >
              {tool.label}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-gray-500 font-mono hidden xl:inline">
          Spot NIFTY: <strong className="text-amber-400">25,127.85</strong> • Live TBT Feeds Active
        </span>
      </div>

      {/* Section 1: Trending Stocks & Buzzing News */}
      {(activeSubNav === 'all') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Trending Stocks */}
          <div className="lg:col-span-7 bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                <FiTrendingUp className="text-purple-400" /> Trending Stocks & ETFs (Live TBT)
              </h3>
              <span className="text-[10px] text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">NSE / BSE Live</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {trendingStocks.map((st, idx) => (
                <div key={idx} className="bg-[#0b0e14] border border-gray-800/90 hover:border-gray-700 rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-white">{st.symbol}</span>
                    <span className={`text-[10px] font-mono font-bold ${st.isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {st.pct}
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-100">₹{st.price.toFixed(2)}</p>
                      <p className={`text-[10px] font-mono ${st.isUp ? 'text-green-500' : 'text-red-500'}`}>{st.isUp ? '+' : ''}{st.change}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => onQuickTrade(st.symbol, st.price, 'BUY', 'holding')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">B</button>
                      <button onClick={() => onQuickTrade(st.symbol, st.price, 'SELL', 'holding')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">S</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buzzing Stocks */}
          <div className="lg:col-span-5 bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                <FiZap className="text-amber-400" /> Buzzing Stocks in News
              </h3>
            </div>
            <div className="space-y-2.5">
              {buzzingStocks.map((bz, idx) => (
                <div key={idx} className="bg-[#0b0e14] border border-gray-800 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{bz.symbol}</span>
                      <span className="font-mono text-xs text-gray-300">₹{bz.price.toFixed(2)}</span>
                      <span className={`font-mono text-[10px] font-bold ${bz.isUp ? 'text-green-400' : 'text-red-400'}`}>{bz.pct}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{bz.news}</p>
                  </div>
                  <button 
                    onClick={() => onQuickTrade(bz.symbol, bz.price, 'BUY', 'holding')}
                    className="bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all shrink-0"
                  >
                    Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Trending Options, Momentum Gainers & OI Analysis */}
      {(activeSubNav === 'all' || activeSubNav === 'fno') && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* Trending Options + Momentum Gainers */}
          <div className="xl:col-span-8 space-y-5">
            {/* Trending Options */}
            <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                  <FiActivity className="text-blue-400" /> Trending Options (17 NOV Expiry)
                </h3>
                <button onClick={() => onOpenOptionChain('NIFTY 50')} className="text-[11px] text-purple-400 hover:underline flex items-center gap-1 cursor-pointer">
                  Full Option Chain <FiArrowUpRight />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-[10px] uppercase">
                      <th className="p-2.5">Contract Symbol</th>
                      <th className="p-2.5">Moneyness</th>
                      <th className="p-2.5">LTP</th>
                      <th className="p-2.5">Change</th>
                      <th className="p-2.5">OI Change</th>
                      <th className="p-2.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {trendingOptions.map((opt, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/40">
                        <td className="p-2.5 font-sans font-bold text-white">{opt.symbol}</td>
                        <td className="p-2.5"><span className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-sans">{opt.tag}</span></td>
                        <td className={`p-2.5 font-bold ${opt.isUp ? 'text-green-400' : 'text-amber-400'}`}>₹{opt.ltp.toFixed(2)}</td>
                        <td className="p-2.5 text-gray-300">{opt.change}</td>
                        <td className="p-2.5 text-green-400">{opt.oi}</td>
                        <td className="p-2.5 text-center space-x-1">
                          <button onClick={() => onQuickTrade(opt.symbol, opt.ltp, 'BUY', 'position')} className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer">Buy</button>
                          <button onClick={() => onQuickTrade(opt.symbol, opt.ltp, 'SELL', 'position')} className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer">Sell</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Momentum Gainers */}
            <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                  <FiTrendingUp className="text-green-400" /> Momentum Gainers (Put Surge)
                </h3>
                <span className="text-[10px] text-green-400 bg-green-950/40 border border-green-500/30 px-2 py-0.5 rounded">High Volume Breakout</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-[10px] uppercase">
                      <th className="p-2.5">Symbol</th>
                      <th className="p-2.5">LTP</th>
                      <th className="p-2.5">Gain %</th>
                      <th className="p-2.5">Volume</th>
                      <th className="p-2.5">IV</th>
                      <th className="p-2.5">OI (Lakhs)</th>
                      <th className="p-2.5 text-center">Trade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {momentumGainers.map((mg, idx) => (
                      <tr key={idx} className="hover:bg-gray-800/40">
                        <td className="p-2.5 font-sans font-bold text-white">{mg.symbol}</td>
                        <td className={`p-2.5 font-bold ${mg.isUp ? 'text-green-400' : 'text-amber-400'}`}>₹{mg.ltp.toFixed(2)}</td>
                        <td className="p-2.5 text-green-400 font-bold">{mg.pct}</td>
                        <td className="p-2.5 text-gray-300">{mg.vol}</td>
                        <td className="p-2.5 text-purple-400">{mg.iv}</td>
                        <td className="p-2.5 text-green-400">{mg.oi}</td>
                        <td className="p-2.5 text-center space-x-1">
                          <button onClick={() => onQuickTrade(mg.symbol, mg.ltp, 'BUY', 'position')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">B</button>
                          <button onClick={() => onQuickTrade(mg.symbol, mg.ltp, 'SELL', 'position')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">S</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Open Interest (OI) Analysis Visual Chart */}
          <div className="xl:col-span-4 bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                  <FiBarChart2 className="text-purple-400" /> NIFTY OI Analysis
                </h3>
                <span className="text-[10px] text-gray-400">Exp: 17 Nov 2026</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">Spot Close: <strong className="text-amber-400 font-mono">25,127.85</strong> • Max Pain: <strong className="text-white font-mono">25,100</strong></p>
              
              {/* Legend */}
              <div className="flex items-center space-x-4 text-[11px] mb-4">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span><span className="text-gray-300">Call OI (Resistance)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500"></span><span className="text-gray-300">Put OI (Support)</span></div>
              </div>

              {/* Strike Bars */}
              <div className="space-y-3.5">
                {oiData.map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-red-400">{bar.call}L</span>
                      <span className={`font-bold ${bar.strike === '25,100' ? 'text-amber-400 underline' : 'text-gray-300'}`}>{bar.strike}</span>
                      <span className="text-green-400">{bar.put}L</span>
                    </div>
                    <div className="flex h-2.5 bg-[#0b0e14] rounded-full overflow-hidden border border-gray-800">
                      <div className="bg-red-500/80 h-full" style={{ width: `${(bar.call / 160) * 100}%` }}></div>
                      <div className="bg-green-500/80 h-full ml-auto" style={{ width: `${(bar.put / 160) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-800 text-[11px] text-gray-400 flex justify-between">
              <span>Strong Support: <strong className="text-green-400">25,000</strong></span>
              <span>Resistance: <strong className="text-red-400">25,300</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Trade Advisory Calls (Research Ideas) */}
      {(activeSubNav === 'all' || activeSubNav === 'advisory') && (
        <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                <FiAward className="text-purple-400" /> Research & Trade Setups (Simulated Ideas)
              </h3>
              <p className="text-[11px] text-gray-400">Pre-calculated Entry, Stop-Loss & Target levels for practice</p>
            </div>
            <span className="text-[10px] bg-purple-950/60 border border-purple-500/40 text-purple-300 px-2.5 py-1 rounded-lg font-bold">
              500k+ Simulated Setups
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisoryCalls.map((call, idx) => (
              <div key={idx} className="bg-[#0b0e14] border border-gray-800 hover:border-purple-500/40 rounded-xl p-4 flex flex-col justify-between transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${call.action === 'BUY' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40' : 'bg-red-600/20 text-red-400 border border-red-500/40'}`}>
                      {call.action} IDEA
                    </span>
                    <span className="text-[10px] text-gray-500">{call.expiry} • {call.time}</span>
                  </div>
                  <div className="flex items-baseline justify-between my-2">
                    <h4 className="font-bold text-sm text-white">{call.instrument}</h4>
                    <span className="font-mono font-bold text-amber-400 text-sm">₹{call.ltp.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-[#12141c] p-2.5 rounded-lg border border-gray-800/80 text-center font-mono my-3">
                    <div>
                      <p className="text-[9px] text-gray-400 font-sans">Stop-Loss</p>
                      <p className="text-xs font-bold text-red-400">₹{call.sl}</p>
                    </div>
                    <div className="border-x border-gray-800">
                      <p className="text-[9px] text-gray-400 font-sans">Entry</p>
                      <p className="text-xs font-bold text-gray-200">₹{call.entry}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-sans">Target</p>
                      <p className="text-xs font-bold text-green-400">₹{call.target}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-800/80">
                  <span className="text-[11px] text-green-400 font-bold">Potential: {call.potential}</span>
                  <button 
                    onClick={() => onQuickTrade(call.instrument, call.ltp, call.action, 'position')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer shadow ${call.action === 'BUY' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'}`}
                  >
                    Execute {call.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: MTF Stocks & Commodities / Futures */}
      {(activeSubNav === 'all' || activeSubNav === 'mtf' || activeSubNav === 'commodities') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Trending MTF */}
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                <FiLayers className="text-amber-400" /> Trending MTF (Margin Trading)
              </h3>
              <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">Up to 4x Leverage</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-[10px] uppercase">
                    <th className="p-2.5">Symbol</th>
                    <th className="p-2.5">LTP</th>
                    <th className="p-2.5">Change</th>
                    <th className="p-2.5 text-purple-300">Pay Only (MTF)</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-mono">
                  {mtfStocks.map((m, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/40">
                      <td className="p-2.5 font-sans font-bold text-white">{m.symbol}</td>
                      <td className={`p-2.5 font-bold ${m.isUp ? 'text-green-400' : 'text-gray-200'}`}>₹{m.ltp.toFixed(2)}</td>
                      <td className={`p-2.5 font-bold ${m.isUp ? 'text-green-400' : 'text-red-400'}`}>{m.pct}</td>
                      <td className="p-2.5 font-bold text-purple-400">₹{m.payOnly.toFixed(2)}</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => onQuickTrade(m.symbol, m.ltp, 'BUY', 'holding')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">Buy</button>
                        <button onClick={() => onQuickTrade(m.symbol, m.ltp, 'SELL', 'holding')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">Sell</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Commodities & Futures */}
          <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                <FiTrendingDown className="text-blue-400" /> Trending Commodities & Futures
              </h3>
              <span className="text-[10px] text-gray-400">MCX & NFO Active</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-[10px] uppercase">
                    <th className="p-2.5">Contract</th>
                    <th className="p-2.5">Segment</th>
                    <th className="p-2.5">LTP</th>
                    <th className="p-2.5">Change</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-mono">
                  {commoditiesFutures.map((cf, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/40">
                      <td className="p-2.5 font-sans font-bold text-white">{cf.symbol}</td>
                      <td className="p-2.5"><span className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[10px] font-sans">{cf.type}</span></td>
                      <td className={`p-2.5 font-bold ${cf.isUp ? 'text-green-400' : 'text-amber-400'}`}>₹{cf.ltp.toFixed(2)}</td>
                      <td className={`p-2.5 font-bold ${cf.isUp ? 'text-green-400' : 'text-red-400'}`}>{cf.pct}</td>
                      <td className="p-2.5 text-center space-x-1">
                        <button onClick={() => onQuickTrade(cf.symbol, cf.ltp, 'BUY', 'position')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">Buy</button>
                        <button onClick={() => onQuickTrade(cf.symbol, cf.ltp, 'SELL', 'position')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-sans font-bold cursor-pointer">Sell</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Upcoming IPOs Hub */}
      {(activeSubNav === 'all' || activeSubNav === 'ipo') && (
        <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-white">
              <FiBriefcase className="text-green-400" /> Upcoming IPO Watchlist
            </h3>
            <span className="text-[11px] text-gray-400">Mainboard & Consumer Tech Pipeline</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {upcomingIpos.map((ipo, idx) => (
              <div key={idx} className="bg-[#0b0e14] border border-gray-800 hover:border-purple-500/40 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-medium">
                    {ipo.sector}
                  </span>
                  <h4 className="font-bold text-xs text-white mt-2">{ipo.name}</h4>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Price: <strong className="text-gray-200">TBA</strong></span>
                  <button 
                    onClick={() => alert(`IPO Alert set for ${ipo.name}! We will notify you when the price band opens.`)}
                    className="text-purple-400 hover:text-purple-300 font-bold cursor-pointer"
                  >
                    Notify Me &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}