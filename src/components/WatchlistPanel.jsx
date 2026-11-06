import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiTrash2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function WatchlistPanel({ onSelectStock, selectedStock }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2971.74, change: '+0.53%', isUp: true },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3941.39, change: '-0.53%', isUp: false },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1624.56, change: '+1.41%', isUp: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1466.10, change: '+0.70%', isUp: true },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 988.11, change: '+3.63%', isUp: true },
  ]);

  // Real-time Tick Simulator (WebSocket Hook Connection)
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.map((stock) => {
          const delta = (Math.random() - 0.49) * 2.5; // Slight live random tick movement
          const newPrice = Math.max(1, parseFloat((stock.price + delta).toFixed(2)));
          const isUp = delta >= 0;
          return {
            ...stock,
            price: newPrice,
            isUp: isUp,
            change: `${isUp ? '+' : ''}${(delta / stock.price * 100).toFixed(2)}%`
          };
        })
      );
    }, 1200); // Ticks every 1.2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddStock = () => {
    if (!searchTerm.trim()) return;
    const newSymbol = searchTerm.toUpperCase();
    if (!watchlist.some((s) => s.symbol === newSymbol)) {
      setWatchlist([
        ...watchlist,
        {
          symbol: newSymbol,
          name: `${newSymbol} Ltd`,
          price: (Math.random() * 1000 + 500).toFixed(2),
          change: '+0.00%',
          isUp: true,
        },
      ]);
    }
    setSearchTerm('');
  };

  const handleDeleteStock = (symbol, e) => {
    e.stopPropagation();
    setWatchlist(watchlist.filter((s) => s.symbol !== symbol));
  };

  return (
    <div className="flex flex-col h-full bg-[#131B2A] border-r border-[#1E2638] select-none">
      <div className="p-3 border-b border-[#1E2638]">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search eg: infy, bse"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStock()}
            className="w-full bg-[#0F141C] text-xs text-white pl-9 pr-8 py-2 rounded border border-[#1E2638] focus:outline-none focus:border-purple-500 placeholder-gray-500"
          />
          <button
            onClick={handleAddStock}
            className="absolute right-2 p-1 bg-purple-600 hover:bg-purple-500 text-white rounded transition"
          >
            <FiPlus size={12} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-[#1E2638]/40">
        {watchlist.map((stock) => {
          const isSelected = selectedStock === stock.symbol;
          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock.symbol)}
              className={`p-3 flex items-center justify-between cursor-pointer group transition ${
                isSelected ? 'bg-purple-950/30 border-l-2 border-purple-500' : 'hover:bg-[#1E2638]/50'
              }`}
            >
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-purple-300 transition">
                    {stock.symbol}
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium bg-[#0F141C] px-1 rounded border border-[#1E2638]">
                    NSE
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`text-xs font-bold transition-colors duration-300 ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{stock.price.toFixed(2)}
                  </div>
                  <div className={`text-[10px] flex items-center justify-end font-semibold ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.isUp ? <FiTrendingUp size={10} className="mr-0.5" /> : <FiTrendingDown size={10} className="mr-0.5" />}
                    {stock.change}
                  </div>
                </div>

                <button
                  onClick={(e) => handleDeleteStock(stock.symbol, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-gray-400 transition"
                  title="Delete"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}