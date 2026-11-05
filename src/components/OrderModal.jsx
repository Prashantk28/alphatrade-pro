import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function OrderModal({ isOpen, onClose, stockSymbol, initialType, onAddPosition }) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState(initialType || 'BUY');
  const [productType, setProductType] = useState('INTRADAY');
  const [qty, setQty] = useState(15);
  const [price, setPrice] = useState(2971.74);
  const [orderCategory, setOrderCategory] = useState('MARKET');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPosition({
      symbol: stockSymbol,
      qty: Number(qty),
      price: Number(price),
      type: orderType,
      product: productType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm font-sans select-none">
      <div className={`w-full max-w-md rounded-xl border ${orderType === 'BUY' ? 'border-emerald-500/40 bg-[#131B2A]' : 'border-red-500/40 bg-[#131B2A]'} shadow-2xl text-gray-200 overflow-hidden`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-4 py-3 ${orderType === 'BUY' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'} border-b border-[#1E2638]`}>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm tracking-wide">{orderType} {stockSymbol}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#0F141C] text-gray-300 border border-[#1E2638]">NSE</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* Buy/Sell Toggle */}
          <div className="grid grid-cols-2 gap-2 bg-[#0F141C] p-1 rounded-lg border border-[#1E2638]">
            <button
              type="button"
              onClick={() => setOrderType('BUY')}
              className={`py-1.5 font-semibold rounded transition-colors ${orderType === 'BUY' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => setOrderType('SELL')}
              className={`py-1.5 font-semibold rounded transition-colors ${orderType === 'SELL' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              SELL
            </button>
          </div>

          {/* Product Type */}
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input
                type="radio"
                name="product"
                checked={productType === 'INTRADAY'}
                onChange={() => setProductType('INTRADAY')}
                className="text-purple-600 bg-[#0F141C] border-[#1E2638]"
              />
              <span className="font-medium text-gray-300">Intraday (MIS)</span>
            </label>
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input
                type="radio"
                name="product"
                checked={productType === 'LONGTERM'}
                onChange={() => setProductType('LONGTERM')}
                className="text-purple-600 bg-[#0F141C] border-[#1E2638]"
              />
              <span className="font-medium text-gray-300">Longterm (CNC)</span>
            </label>
          </div>

          {/* Qty & Price Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1">Qty. (Lots)</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-500"
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Price (₹)</label>
              <input
                type="number"
                step="0.05"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-3 py-2 text-gray-200 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Order Category */}
          <div className="flex space-x-3 pt-1">
            {['MARKET', 'LIMIT', 'SL'].map((cat) => (
              <label key={cat} className="flex items-center space-x-1 cursor-pointer text-gray-400">
                <input
                  type="radio"
                  name="category"
                  checked={orderCategory === cat}
                  onChange={() => setOrderCategory(cat)}
                  className="text-purple-600 bg-[#0F141C] border-[#1E2638]"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1E2638]">
            <span className="text-gray-400 text-[11px]">Req. Margin: <strong className="text-gray-200">₹{(qty * price / 5).toFixed(2)}</strong></span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[#1E2638] text-gray-300 hover:bg-[#252f46] font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-1.5 rounded text-white font-semibold shadow ${orderType === 'BUY' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'}`}
              >
                Submit {orderType}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}