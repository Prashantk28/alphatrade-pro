import React, { useState } from 'react';
import { FiSearch, FiStar } from 'react-icons/fi';

const STOCKS = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 22488.95, change: '+158.65', pct: '+0.71%', isPositive: true },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty Index', price: 47595.71, change: '-404.79', pct: '-0.84%', isPositive: false },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2971.74, change: '+15.54', pct: '+0.53%', isPositive: true },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3941.39, change: '-21.11', pct: '-0.53%', isPositive: false },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1624.56, change: '+22.66', pct: '+1.41%', isPositive: true },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1466.10, change: '+10.25', pct: '+0.70%', isPositive: true },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 988.11, change: '+34.61', pct: '+3.63%', isPositive: true }
];

export default function WatchlistPanel({ onSelectStock, selectedStock }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = STOCKS.filter(s => 
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#131B2A] text-gray-200 select-none">
      {/* Watchlist Header / Tabs */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#1E2638] text-xs font-semibold">
        <span className="text-purple-400 border-b-2 border-purple-500 pb-1">Watchlist 1</span>
        <span className="text-gray-400 hover:text-gray-200 cursor-pointer">Watchlist 2</span>
        <FiStar className="text-gray-400 cursor-pointer" size={14} />
      </div>

      {/* Search Filter inside Watchlist */}
      <div className="p-2 border-b border-[#1E2638]">
        <div className="relative">
          <FiSearch className="absolute left-2.5 top-2 text-gray-400" size={12} />
          <input
            type="text"
            placeholder="Search eg: infy, bse"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-7 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Stocks List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1E2638]/40">
        {filteredStocks.map((stock) => {
          const isSelected = selectedStock === stock.symbol;
          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock.symbol)}
              className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${
                isSelected ? 'bg-[#1E2638]/70 border-l-2 border-purple-500' : 'hover:bg-[#1E2638]/30'
              }`}
            >
              <div>
                <div className="font-medium text-xs text-gray-200">{stock.symbol}</div>
                <div className="text-[10px] text-gray-400 truncate max-w-[130px]">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium text-xs text-gray-200">₹{stock.price.toLocaleString()}</div>
                <div className={`font-mono text-[10px] ${stock.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.change} ({stock.pct})
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}