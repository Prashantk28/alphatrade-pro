import React, { useState } from 'react';
import { FiTrendingUp, FiCheckCircle, FiActivity, FiAward, FiPieChart, FiShoppingBag, FiZap, FiLayers } from 'react-icons/fi';

export default function ExploreDiscover({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('Overview');

  // 1. Movers and Shakers
  const moversAndShakers = [
    { symbol: 'ASHOKLEY', price: '170.24', change: '+16.21', percent: '+10.52%', isUp: true },
    { symbol: 'TECHNOE', price: '964.20', change: '+79.80', percent: '+9.02%', isUp: true },
    { symbol: 'CARTRADE', price: '2,702.00', change: '+209.10', percent: '+8.39%', isUp: true },
    { symbol: 'JKTYRE', price: '361.70', change: '+28.85', percent: '+8.67%', isUp: true },
    { symbol: 'FIVESTAR', price: '430.70', change: '+33.55', percent: '+8.45%', isUp: true },
  ];

  // 2. Most Bought
  const mostBought = [
    { symbol: 'COALINDIA', price: '393.50', change: '-6.15', percent: '-1.54%', isUp: false },
    { symbol: 'IRFC', price: '80.01', change: '+2.17', percent: '+2.79%', isUp: true },
    { symbol: 'HDFCBANK', price: '753.15', change: '+16.45', percent: '+2.23%', isUp: true },
    { symbol: 'BSE', price: '3,813.00', change: '+211.50', percent: '+5.87%', isUp: true },
    { symbol: 'ITC', price: '279.20', change: '-0.80', percent: '-0.29%', isUp: false },
  ];

  // 3. Intraday Screeners
  const intradayScreeners = [
    { symbol: 'POKARNA', recovery: '15.76%', price: '810.40', chg: '+135.05 (+20.00%)' },
    { symbol: 'GNRL', recovery: '19.02%', price: '12.14', chg: '+1.52 (+14.31%)' },
    { symbol: 'GYFTR', recovery: '13.16%', price: '206.50', chg: '+24.12 (+13.23%)' },
    { symbol: 'IXIGO', recovery: '10.22%', price: '161.63', chg: '+16.98 (+11.74%)' },
  ];

  // 4. Start for less than ₹500
  const under500Stocks = [
    { symbol: 'MAHABANK', price: '83.93', chg: '+4.32 (+5.43%)', isUp: true },
    { symbol: 'GMRAIRPORT', price: '98.83', chg: '+3.83 (+4.03%)', isUp: true },
    { symbol: 'INOXWIND', price: '65.80', chg: '+2.30 (+3.62%)', isUp: true },
    { symbol: 'IFCI', price: '61.65', chg: '+2.23 (+3.75%)', isUp: true },
    { symbol: 'UCOBANK', price: '23.84', chg: '+0.86 (+3.74%)', isUp: true },
  ];

  // 5. SEBI Advisory Calls
  const advisoryCalls = [
    { symbol: 'INDUSTOWER', ltp: '381.10', sl: '375.00', entry: '385.00', target: '400.00', potential: '5.00%', time: '10:33 AM' },
    { symbol: 'HDFCLIFE', ltp: '544.40', sl: '526.00', entry: '540.00', target: '563.00', potential: '3.40%', time: '09:58 AM' },
    { symbol: 'KERNEX', ltp: '1,763.20', sl: '1,573.20', entry: '1,748.00', target: '1,922.80', potential: '21.20%', time: '09:39 AM' },
    { symbol: 'M&MFIN', ltp: '288.10', sl: '256.90', entry: '285.45', target: '313.95', potential: '27.60%', time: '09:31 AM' },
  ];

  // 6. Buzzing Stocks
  const buzzingStocks = [
    { symbol: 'ADANIPOWER', price: '205.02', chg: '+1.64%', news: 'Signs 25-year pact to supply 1,234 MW thermal power' },
    { symbol: 'INDIGO', price: '5,416.50', chg: '+5.36%', news: 'Plans more wide-body planes and Bengaluru as third hub' },
    { symbol: 'GRSE', price: '2,158.90', chg: '+0.72%', news: 'Shares rise as defence sector gains on Navy contract news' },
    { symbol: 'DRREDDY', price: '1,363.00', chg: '-0.80%', news: 'Secured tentative US FDA nod for generic injectable HIV drug' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 overflow-y-auto p-5 font-sans space-y-6 custom-scrollbar">
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-[#1E2638] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center space-x-2">
            <FiActivity className="text-purple-500" />
            <span>Market Discover & Screeners</span>
          </h1>
          <p className="text-xs text-gray-400">Movers, top intraday screeners, stocks under ₹500 and SEBI insights</p>
        </div>
        <div className="flex space-x-2 bg-[#131B2A] p-1 rounded-lg border border-[#1E2638] text-xs">
          {['Overview', 'Screeners', 'Advisory', 'Sectors'].map((t) => (
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

      {/* Grid 1: Movers & Shakers vs Most Bought */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Movers and Shakers */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiZap className="text-amber-400" />
              <span>Movers & Shakers</span>
            </h2>
            <span className="text-[11px] text-purple-400 cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-2 text-xs">
            {moversAndShakers.map((s, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{s.symbol}</div>
                  <div className="text-[11px] text-gray-400">₹{s.price}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right text-emerald-400 font-medium">
                    <div>{s.percent}</div>
                    <div className="text-[10px] opacity-75">+{s.change}</div>
                  </div>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Bought */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiShoppingBag className="text-blue-400" />
              <span>Most Bought Stocks</span>
            </h2>
            <span className="text-[11px] text-purple-400 cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-2 text-xs">
            {mostBought.map((s, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{s.symbol}</div>
                  <div className="text-[11px] text-gray-400">₹{s.price}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`text-right font-medium ${s.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    <div>{s.percent}</div>
                    <div className="text-[10px] opacity-75">{s.change}</div>
                  </div>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2: Intraday Screeners & Stocks Under ₹500 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Intraday Screeners */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiTrendingUp className="text-purple-400" />
            <span>Intraday Screeners (High Recovery %)</span>
          </h2>
          <div className="space-y-2 text-xs">
            {intradayScreeners.map((sc, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-100">{sc.symbol}</div>
                  <div className="text-[10px] text-purple-400 font-medium">Recovery: {sc.recovery}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-gray-200">₹{sc.price}</div>
                  <div className="text-emerald-400 text-[10px]">{sc.chg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start for less than ₹500 */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiAward className="text-emerald-400" />
            <span>Start for less than ₹500</span>
          </h2>
          <div className="space-y-2 text-xs">
            {under500Stocks.map((u, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-100">{u.symbol}</span>
                  <span className="text-[10px] text-emerald-400 ml-2">{u.chg}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-gray-200">₹{u.price}</span>
                  <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">
                    BUY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 3: SEBI Advisory Calls */}
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-200 flex items-center space-x-2">
              <FiCheckCircle className="text-emerald-400" />
              <span>SEBI Expert Recommendations</span>
            </h2>
            <p className="text-[11px] text-gray-400">High-conviction target calls with strict stop-loss bounds</p>
          </div>
          <span className="text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full font-medium">500k+ orders placed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {advisoryCalls.map((adv, idx) => (
            <div key={idx} className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] flex flex-col justify-between space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-100 text-sm">{adv.symbol}</div>
                  <div className="text-[10px] text-gray-400">{adv.time}</div>
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
                  BUY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid 4: Sectors & Buzzing News Stocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Sector Quick Pills */}
        <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiLayers className="text-indigo-400" />
            <span>Popular Sectors</span>
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Automobile', 'IT', 'Banking', 'Pharma', 'Oil & Gas', 'Construction', 'Metal', 'ETFs'].map((sec, i) => (
              <span key={i} className="bg-[#0F141C] hover:bg-[#1E2638] text-gray-300 border border-[#1E2638] px-3 py-1.5 rounded-lg cursor-pointer transition">
                {sec}
              </span>
            ))}
          </div>
        </div>

        {/* Buzzing News Stocks */}
        <div className="md:col-span-2 bg-[#131B2A] border border-[#1E2638] rounded-xl p-4 shadow-lg">
          <h2 className="text-sm font-semibold text-gray-200 mb-3 flex items-center space-x-2">
            <FiPieChart className="text-blue-400" />
            <span>Buzzing Stocks & Headlines</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {buzzingStocks.map((b, idx) => (
              <div key={idx} className="bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638] flex justify-between items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-100">{b.symbol}</span>
                    <span className="text-emerald-400 text-[11px] font-medium">{b.chg}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{b.news}</p>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('BUY')} className="bg-[#1E2638] hover:bg-[#2A344A] text-purple-300 px-2.5 py-1 rounded text-[10px] border border-purple-500/30 whitespace-nowrap">
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