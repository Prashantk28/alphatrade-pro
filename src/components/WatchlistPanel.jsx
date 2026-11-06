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
          />
        </div>
      </div>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}