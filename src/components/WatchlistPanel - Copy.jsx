import React, { useState } from 'react';
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
          />
          <button className="absolute right-2 p-0.5 bg-purple-600 rounded text-white hover:bg-purple-500">
            <FiPlus size={12} />
          </button>
        </div>
      </div>

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
            </div>
          );
        })}
      </div>
    </div>
  );
}