import React, { useState } from 'react';
import { FiTrendingUp, FiCheckCircle, FiActivity, FiAward, FiPieChart, FiBarChart2 } from 'react-icons/fi';

export default function ExploreDiscover({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('Overview');

  // 1. Trending Stocks Data
  const trendingStocks = [
    { symbol: 'GOLDBEES', price: '118.04', change: '+1.63', percent: '+1.40%', isUp: true },
    { symbol: 'TATAGOLD', price: '13.88', change: '+0.20', percent: '+1.46%', isUp: true },
    { symbol: 'COALINDIA', price: '393.90', change: '-5.50', percent: '-1.38%', isUp: false },
    { symbol: 'SILVERBEES', price: '178.01', change: '+1.67', percent: '+0.95%', isUp: true },
    { symbol: 'SUZLON', price: '38.45', change: '+1.00', percent: '+2.67%', isUp: true },
    { symbol: 'PCJEWELLER', price: '15.76', change: '-0.05', percent: '-0.32%', isUp: false },
  ];

  // 2. Market Indices (Option Chain Overview)
  const marketIndices = [
    { name: 'SENSEX', price: '78,945.85', chg: '+1,644.45 (+2.13%)' },
    { name: 'NIFTY', price: '24,432.00', chg: '+471.40 (+1.97%)' },
    { name: 'BANKNIFTY', price: '57,368.35', chg: '+1,454.75 (+2.60%)' },
    { name: 'FINNIFTY', price: '26,433.70', chg: '+853.10 (+3.33%)' },
    { name: 'MIDCPNIFTY', price: '13,952.75', chg: '+240.10 (+1.75%)' },
    { name: 'BANKEX', price: '64,617.39', chg: '+1,744.88 (+2.78%)' },
  ];

  // 3. Advisory Calls by SEBI Experts
  const advisoryCalls = [
    { symbol: 'PFC 325 CE', expiry: '23 NOV 26', ltp: '9.25', chg: '+3.35 (56.78%)', sl: '6.00', entry: '7.65', target: '15.00', potential: '60.40%', type: 'BUY', time: '11:50 AM' },
    { symbol: 'BAJAJ-AUTO 10600 CE', expiry: '23 NOV 26', ltp: '260.00', chg: '+60.75 (30.49%)', sl: '200.00', entry: '250.00', target: '350.00', potential: '35.60%', type: 'BUY', time: '11:40 AM' },
    { symbol: 'PGEL 540 CE', expiry: '23 NOV 26', ltp: '20.55', chg: '+4.60 (28.84%)', sl: '17.25', entry: '21.60', target: '35.00', potential: '70.30%', type: 'BUY', time: '11:37 AM' },
    { symbol: 'COALINDIA 400 PE', expiry: '23 NOV 26', ltp: '10.05', chg: '+0.20 (2.03%)', sl: '6.00', entry: '9.50', target: '15.00', potential: '47.10%', type: 'BUY', time: '10:04 AM' },
  ];

  // 4. Buzzing News Stocks
  const buzzingStocks = [
    { symbol: 'ADANIPOWER', price: '205.67', chg: '+1.96%', news: 'Signs 25-year pact to supply 1,234 MW thermal power' },
    { symbol: 'INDIGO', price: '5,427.30', chg: '+5.57%', news: 'Plans more wide-body planes and Bengaluru as third hub' },
    { symbol: 'GRSE', price: '2,159.50', chg: '+0.75%', news: 'Shares rise as defence sector gains on Navy contract news' },
    { symbol: 'DRREDDY', price: '1,362.00', chg: '-0.87%', news: 'Secured tentative US FDA nod for generic injectable HIV drug' },
  ];

  // 5. Trending MTFs
  const trendingMTFs = [
    { symbol: 'TATAGOLD', price: '13.88', chg: '+1.46%', payOnly: '6.94' },
    { symbol: 'HDFCBANK', price: '752.35', chg: '+2.12%', payOnly: '173.04' },
    { symbol: 'IDEA', price: '12.81', chg: '+2.07%', payOnly: '4.25' },
    { symbol: 'BSE', price: '3,827.70', chg: '+6.28%', payOnly: '1,194.63' },
  ];

  // 6. Trending Futures
  const trendingFutures = [
    { symbol: 'IDEA FUT', price: '12.88', chg: '+2.55%', vol: '19.56 Cr' },
    { symbol: 'YESBANK FUT', price: '16.08', chg: '+2.62%', vol: '11.44 Cr' },
    { symbol: 'ASHOKLEY FUT', price: '170.25', chg: '+10.21%', vol: '7.92 Cr' },
    { symbol: 'JIOFIN FUT', price: '232.26', chg: '+3.98%', vol: '3.73 Cr' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Top Section Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-orange-500" />
            <span>Discover & Markets Explorer</span>
          </h1>
          <p className="text-xs text-gray-400">Live option chains, SEBI advisory calls, futures, and trending market insights</p>
        </div>
        <div className="flex space-x-2 bg-[#131B2A] p-1 rounded-lg border border-[#1E2638] text-xs">
          {['Overview', 'Advisory', 'Futures & MTF'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1 rounded transition-colors ${activeTab === t ? 'bg-purple-600 text-white font-medium' : 'text-gray-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Option Chain Indices Bar */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-3 shadow-lg">
        <h2 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Option Chain & Market Indices Snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {marketIndices.map((idx, i) => (
            <div key={i} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638]">
              <div className="font-bold text-gray-300">{idx.name}</div>
              <div className="text-white font-mono mt-0.5">₹{idx.price}</div>
              <div className="text-emerald-400 text-[10px] mt-0.5">{idx.chg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout 1: Trending Stocks & MTFs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Trending Stocks */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiTrendingUp className="text-emerald-400" />
              <span>Trending Stocks</span>
            </h2>
            <span className="text-[11px] text-purple-400 cursor-pointer hover:underline">See more</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {trendingStocks.map((s, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638]/60 flex justify-between items-center hover:border-purple-500/50 transition">
                <div>
                  <div className="font-bold text-gray-100">{s.symbol}</div>
                  <div className="text-[11px] text-gray-400">₹{s.price}</div>
                </div>
                <div className={`text-right font-medium ${s.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  <div>{s.percent}</div>
                  <div className="text-[10px] opacity-75">{s.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending MTFs */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiAward className="text-amber-400" />
              <span>Trending MTFs (Pay 4x Less)</span>
            </h2>
            <span className="text-[11px] text-purple-400 cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-2 text-xs">
            {trendingMTFs.map((m, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2 rounded-lg border border-[#1E2638]/60 flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-200">{m.symbol}</span>
                  <span className="text-[10px] text-emerald-400 ml-2">{m.chg}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] text-gray-400">Pay Only: <strong className="text-white">₹{m.payOnly}</strong></span>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[10px] font-semibold">
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout 2: Expert SEBI Advisory Calls */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiCheckCircle className="text-purple-400" />
              <span>Advisory Calls by SEBI Experts</span>
            </h2>
            <p className="text-[11px] text-gray-400">High potential target signals with stop-loss tracking</p>
          </div>
          <span className="text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">500k+ orders placed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {advisoryCalls.map((adv, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] flex flex-col justify-between space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-100 text-sm">{adv.symbol}</div>
                  <div className="text-[10px] text-gray-400">{adv.expiry} · {adv.time}</div>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[10px]">
                  +{adv.potential}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-[#131B2A] p-2 rounded text-[10px] text-center border border-[#1E2638]">
                <div>
                  <div className="text-gray-400">Entry</div>
                  <div className="text-gray-200 font-semibold">₹{adv.entry}</div>
                </div>
                <div>
                  <div className="text-gray-400">SL</div>
                  <div className="text-red-400 font-semibold">₹{adv.sl}</div>
                </div>
                <div>
                  <div className="text-gray-400">Target</div>
                  <div className="text-emerald-400 font-semibold">₹{adv.target}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-300 font-medium text-[11px]">LTP: ₹{adv.ltp}</span>
                <button
                  onClick={() => onOpenModal && onOpenModal('BUY')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded font-bold text-[11px] transition shadow"
                >
                  {adv.type}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout 3: Trending Futures & Buzzing Stocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Trending Futures */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiBarChart2 className="text-cyan-400" />
            <span>Trending Futures (Volume Leaders)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {trendingFutures.map((f, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-100">{f.symbol}</span>
                  <div className="text-[10px] text-gray-400">Volume: {f.vol}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-gray-200">₹{f.price}</div>
                  <div className="text-emerald-400 text-[10px]">{f.chg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buzzing Stocks in News */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiPieChart className="text-blue-400" />
            <span>Buzzing Stocks & Market News</span>
          </h2>
          <div className="space-y-2 text-xs">
            {buzzingStocks.map((b, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-100">{b.symbol}</span>
                    <span className="text-emerald-400 text-[11px] font-medium">{b.chg}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{b.news}</p>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-[#1E2638] hover:bg-[#2A344A] text-purple-300 px-3 py-1 rounded text-[11px] border border-purple-500/30 whitespace-nowrap">
                  Trade
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}