import React, { useState } from 'react';
import { FiTrendingUp, FiCheckCircle, FiChevronRight, FiActivity, FiAward, FiPieChart } from 'react-icons/fi';

export default function ExploreDiscover({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('Overview');

  // 1. Trending Stocks Data
  const trendingStocks = [
    { symbol: 'GOLDBEES', price: '118.31', change: '+1.90', percent: '+1.63%', isUp: true },
    { symbol: 'TATAGOLD', price: '13.92', change: '+0.24', percent: '+1.75%', isUp: true },
    { symbol: 'SILVERBEES', price: '178.47', change: '+2.13', percent: '+1.21%', isUp: true },
    { symbol: 'COALINDIA', price: '395.05', change: '-4.35', percent: '-1.09%', isUp: false },
    { symbol: 'SUZLON', price: '38.53', change: '+1.08', percent: '+2.88%', isUp: true },
    { symbol: 'PCJEWELLER', price: '15.76', change: '-0.05', percent: '-0.32%', isUp: false },
  ];

  // 2. Advisory Calls Data
  const advisoryCalls = [
    { symbol: 'PFC 325 CE', expiry: '23 NOV 26', ltp: '7.80', chg: '+1.90 (32.20%)', sl: '6.00', entry: '7.65', target: '15.00', potential: '89.90%', type: 'BUY', time: '11:50 AM' },
    { symbol: 'BAJAJ-AUTO 10600 CE', expiry: '23 NOV 26', ltp: '249.85', chg: '+50.60 (25.40%)', sl: '200.00', entry: '250.00', target: '350.00', potential: '40.00%', type: 'BUY', time: '11:40 AM' },
    { symbol: 'PGEL 540 CE', expiry: '23 NOV 26', ltp: '21.25', chg: '+5.30 (33.23%)', sl: '17.25', entry: '21.60', target: '35.00', potential: '66.30%', type: 'BUY', time: '11:37 AM' },
    { symbol: 'COALINDIA 400 PE', expiry: '23 NOV 26', ltp: '9.45', chg: '-0.40 (-4.06%)', sl: '6.00', entry: '9.50', target: '15.00', potential: '55.40%', type: 'BUY', time: '10:04 AM' },
  ];

  // 3. Buzzing News Stocks
  const buzzingStocks = [
    { symbol: 'ADANIPOWER', price: '205.09', chg: '+1.68%', news: 'Signs 25-year pact to supply 1,234 MW thermal power' },
    { symbol: 'INDIGO', price: '5,408.60', chg: '+5.21%', news: 'Plans more wide-body planes and Bengaluru as third hub' },
    { symbol: 'GRSE', price: '2,164.90', chg: '+1.00%', news: 'Shares rise as defence sector gains on Navy contract news' },
    { symbol: 'DRREDDY', price: '1,363.30', chg: '-0.78%', news: 'Secured tentative US FDA nod for generic injectable HIV drug' },
  ];

  // 4. Trending MTFs
  const trendingMTFs = [
    { symbol: 'TATAGOLD', price: '13.92', chg: '+1.75%', payOnly: '6.96' },
    { symbol: 'HDFCBANK', price: '752.95', chg: '+2.21%', payOnly: '173.18' },
    { symbol: 'BSE', price: '3,825.90', chg: '+6.23%', payOnly: '1,194.06' },
    { symbol: 'SUZLON', price: '38.53', chg: '+2.88%', payOnly: '11.32' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Top Section Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-orange-500" />
            <span>Discover & Markets</span>
          </h1>
          <p className="text-xs text-gray-400">Explore trending ideas, advisory recommendations, and option chains</p>
        </div>
        <div className="flex space-x-2 bg-[#131B2A] p-1 rounded-lg border border-[#1E2638] text-xs">
          {['Overview', 'Advisory', 'MTF & Futures'].map((t) => (
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

      {/* Grid Layout 3: Buzzing Stocks in News */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
          <FiPieChart className="text-blue-400" />
          <span>Buzzing Stocks & Market News</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {buzzingStocks.map((b, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-lg border border-[#1E2638] flex justify-between items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-100">{b.symbol}</span>
                  <span className="text-emerald-400 text-[11px] font-medium">{b.chg}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{b.news}</p>
              </div>
              <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-[#1E2638] hover:bg-[#2A344A] text-purple-300 px-3 py-1 rounded text-[11px] border border-purple-500/30 whitespace-nowrap">
                Trade
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}