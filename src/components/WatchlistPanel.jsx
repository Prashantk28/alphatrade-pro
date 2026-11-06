import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';

export default function WatchlistPanel({ onSelectStock, selectedStock }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([
    { symbol: 'NIFTY 50', price: '22,488.95', chg: '+158.65 (+0.71%)', isUp: true, isIndex: true },
    { symbol: 'BANKNIFTY', price: '47,595.71', chg: '-404.79 (-0.84%)', isUp: false, isIndex: true },
    { symbol: 'RELIANCE', price: '2,971.74', chg: '+15.54 (+0.53%)', isUp: true },
    { symbol: 'TCS', price: '3,941.39', chg: '-21.11 (-0.53%)', isUp: false },
    { symbol: 'INFY', price: '1,624.56', chg: '+22.66 (+1.41%)', isUp: true },
    { symbol: 'HDFCBANK', price: '1,466.10', chg: '+10.25 (+0.70%)', isUp: true },
    { symbol: 'TATAMOTORS', price: '988.11', chg: '+34.61 (+3.63%)', isUp: true },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newSymbol) return;
    setWatchlist(prev => [
      ...prev,
      { symbol: newSymbol.toUpperCase(), price: newPrice || '1,000.00', chg: '+0.00 (0.00%)', isUp: true }
    ]);
    setNewSymbol('');
    setNewPrice('');
    setShowAddModal(false);
  };

  const handleRemoveStock = (e, symbolToRemove) => {
    e.stopPropagation();
    setWatchlist(prev => prev.filter(item => item.symbol !== symbolToRemove));
  };

  const filteredWatchlist = watchlist.filter(item => 
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#131B2A] text-gray-200 select-none">
      {/* Search & Add Bar */}
      <div className="p-3 border-b border-[#1E2638] flex items-center space-x-2">
        <div className="flex items-center flex-1 bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-1.5 space-x-2">
          <FiSearch size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search eg: infy, bse"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-white focus:outline-none w-full"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          title="Add Stock"
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition"
        >
          <FiPlus size={14} />
        </button>
      </div>

      {/* Watchlist Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1E2638]">
        {filteredWatchlist.map((item, idx) => (
          <div
            key={idx}
            onClick={() => !item.isIndex && onSelectStock(item.symbol)}
            className={`p-3 flex items-center justify-between cursor-pointer transition group ${selectedStock === item.symbol ? 'bg-[#1E2638]' : 'hover:bg-[#1E2638]/50'}`}
          >
            <div>
              <p className={`text-xs font-semibold ${selectedStock === item.symbol ? 'text-purple-400' : 'text-white'}`}>
                {item.symbol}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.isIndex ? 'Index' : 'NSE'}</p>
            </div>
            
            <div className="text-right flex items-center space-x-3">
              <div>
                <p className="text-xs font-medium text-white">₹{item.price}</p>
                <p className={`text-[10px] ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {item.chg}
                </p>
              </div>
              {!item.isIndex && (
                <button
                  onClick={(e) => handleRemoveStock(e, item.symbol)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition"
                  title="Remove"
                >
                  <FiTrash2 size={13} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-4">Add Stock to Watchlist</h3>
            <form onSubmit={handleAddStock} className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Stock Symbol</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SBIN, TATAPOWER"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Initial Price (₹)</label>
                <input
                  type="text"
                  placeholder="e.g. 750.00"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-[#0F141C] border border-[#1E2638] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-[#0F141C] border border-[#1E2638] text-gray-300 py-2 rounded-lg text-xs hover:bg-[#1E2638] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg text-xs font-semibold transition"
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}