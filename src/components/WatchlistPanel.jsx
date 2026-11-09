<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

const initialWatchlist = [
  { symbol: 'NIFTY 50', price: 24891.95, change: '+158.65 (+0.71%)', isUp: true },
  { symbol: 'BANKNIFTY', price: 47595.71, change: '-404.79 (-0.84%)', isUp: false },
  { symbol: 'RELIANCE', price: 2971.74, change: '+15.54 (+0.53%)', isUp: true },
  { symbol: 'TCS', price: 3941.39, change: '-21.11 (-0.53%)', isUp: false },
  { symbol: 'INFY', price: 1624.56, change: '+22.66 (+1.41%)', isUp: true },
  { symbol: 'HDFCBANK', price: 1466.10, change: '+10.25 (+0.70%)', isUp: true },
  { symbol: 'TATAMOTORS', price: 988.11, change: '+34.61 (+3.63%)', isUp: true },
];

export default function WatchlistPanel({ onSelectSymbol, activeSymbol, onQuickTrade }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [hoveredSymbol, setHoveredSymbol] = useState(null);

  // वॉचलिस्टमधील स्टॉक्सच्या प्राइसेस रिअल-टाइम फ्लक्चुएट करणे
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prevList =>
        prevList.map(item => {
          const diff = (Math.random() - 0.48) * 3;
          const newPrice = parseFloat((item.price + diff).toFixed(2));
          const isUp = diff >= 0;
          const changeVal = (Math.random() * 1.5).toFixed(2);
          const changeStr = `${isUp ? '+' : '-'}${changeVal} (${isUp ? '+' : '-'}${(changeVal / 100).toFixed(2)}%)`;

          return {
            ...item,
            price: newPrice,
            isUp: isUp,
            change: changeStr
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const filteredWatchlist = watchlist.filter(item =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-[#131B2A] border-r border-[#1E2638] flex flex-col h-full font-mono text-white select-none shrink-0">
      <div className="p-3 border-b border-[#1E2638]">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search eg: infy, bse"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg pl-8 pr-8 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
=======
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function WatchlistPanel({ onSelectSymbol, activeSymbol }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const watchlistItems = [
    { symbol: 'NIFTY 50', type: 'F&O', price: 24819.29, change: '+0.69%', positive: true },
    { symbol: 'BANKNIFTY', type: 'F&O', price: 51240.10, change: '+0.45%', positive: true },
    { symbol: 'RELIANCE', type: 'STOCKS', price: 2740.50, change: '-0.30%', positive: false },
    { symbol: 'TCS', type: 'STOCKS', price: 4120.00, change: '+1.20%', positive: true },
    { symbol: 'GOLD 05DEC', type: 'COMMODITY', price: 78500.00, change: '+0.15%', positive: true },
    { symbol: 'CRUDEOIL 19NOV', type: 'COMMODITY', price: 6050.00, change: '-1.85%', positive: false },
  ];

  const filteredItems = watchlistItems.filter(item => {
    const matchesFilter = filter === 'ALL' || item.type === filter;
    const matchesSearch = item.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-80 bg-[#131B2A]/50 border-r border-[#1E2638] flex flex-col h-full select-none">
      <div className="p-3 border-b border-[#1E2638]">
        <div className="flex items-center bg-[#0F141C] border border-[#1E2638] rounded-lg px-2.5 py-1.5 text-xs">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Stocks, F&O, Gold..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full text-white outline-none"
>>>>>>> main
          />
          <button className="absolute right-2 p-0.5 bg-purple-600 rounded text-white hover:bg-purple-500">
            <FiPlus size={12} />
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex-1 overflow-y-auto">
        {filteredWatchlist.map((item) => {
          const isActive = activeSymbol === item.symbol;
          const isHovered = hoveredSymbol === item.symbol;

          return (
            <div
              key={item.symbol}
              onMouseEnter={() => setHoveredSymbol(item.symbol)}
              onMouseLeave={() => setHoveredSymbol(null)}
              onClick={() => onSelectSymbol && onSelectSymbol(item.symbol)}
              className={`p-3 border-b border-[#1E2638]/50 cursor-pointer transition flex justify-between items-center relative ${
                isActive ? 'bg-purple-900/30 border-l-4 border-l-purple-500' : 'hover:bg-[#0F141C]'
              }`}
            >
              <div>
                <h4 className="text-xs font-bold text-white">{item.symbol}</h4>
                <p className="text-[10px] text-gray-400">NSE</p>
              </div>

              {isHovered ? (
                <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onQuickTrade && onQuickTrade(item.symbol, item.price, 'BUY', 'EQUITY')}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded shadow"
                    title="Buy Equity Stock"
                  >
                    B
                  </button>
                  <button
                    onClick={() => onQuickTrade && onQuickTrade(item.symbol, item.price, 'SELL', 'EQUITY')}
                    className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded shadow"
                    title="Sell Equity Stock"
                  >
                    S
                  </button>
                </div>
              ) : (
                <div className="text-right">
                  <p className="text-xs font-bold text-white">₹{item.price.toLocaleString('en-IN')}</p>
                  <p className={`text-[10px] font-semibold ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </p>
                </div>
              )}
=======
      <div className="flex border-b border-[#1E2638] text-[10px] font-mono font-bold bg-[#0F141C]/40">
        {['ALL', 'STOCKS', 'F&O', 'COMMODITY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-1 py-2 text-center transition ${
              filter === cat ? 'bg-purple-600/20 text-purple-300 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto divide-y divide-[#1E2638]/40">
        {filteredItems.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelectSymbol(item.symbol)}
            className={`p-3 flex justify-between items-center cursor-pointer transition ${
              activeSymbol === item.symbol ? 'bg-purple-600/10 border-l-2 border-purple-500' : 'hover:bg-[#1E2638]/40'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-white">{item.symbol}</div>
              <div className="text-[9px] text-gray-500 font-mono uppercase">{item.type}</div>
            </div>
            <div className="text-right font-mono">
              <div className="font-bold text-xs text-white">₹{item.price.toLocaleString('en-IN')}</div>
              <div className={`text-[10px] font-semibold ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                {item.change}
              </div>
>>>>>>> main
            </div>
          );
        })}
      </div>
    </div>
  );
}