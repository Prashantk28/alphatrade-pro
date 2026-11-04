import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function OrderModal({ isOpen, onClose, stockSymbol = 'RELIANCE', initialType = 'BUY' }) {
  const [orderType, setOrderType] = useState(initialType); // BUY or SELL
  const [productType, setProductType] = useState('INTRADAY'); // INTRADAY or DELIVERY
  const [quantity, setQuantity] = useState(1);
  const [priceType, setPriceType] = useState('MARKET'); // MARKET or LIMIT
  const [limitPrice, setLimitPrice] = useState(2971.74);

  if (!isOpen) return null;

  const isBuy = orderType === 'BUY';
  const price = 2971.74;
  const totalAmount = (quantity * (priceType === 'LIMIT' ? limitPrice : price)).toFixed(2);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert(`Order Placed Successfully!\nType: ${orderType}\nStock: ${stockSymbol}\nQty: ${quantity}\nTotal: ₹${totalAmount}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-[#131B2A] border border-[#1E2638] rounded-xl shadow-2xl overflow-hidden font-sans">
        
        {/* Top Header & Toggle Tabs */}
        <div className={`p-4 flex items-center justify-between border-b border-[#1E2638] ${isBuy ? 'bg-emerald-950/30' : 'bg-red-950/30'}`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setOrderType('BUY')}
              className={`px-4 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                isBuy ? 'bg-emerald-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-gray-200'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderType('SELL')}
              className={`px-4 py-1.5 rounded-md font-semibold text-xs transition-colors ${
                !isBuy ? 'bg-red-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-gray-200'
              }`}
            >
              SELL
            </button>
          </div>
          <div className="text-right flex items-center space-x-3">
            <div>
              <div className="font-bold text-sm text-gray-100">{stockSymbol}</div>
              <div className="text-[10px] font-mono text-gray-400">NSE · ₹{price}</div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmitOrder} className="p-4 space-y-4 text-xs">
          
          {/* Product Type (Intraday / Delivery) */}
          <div>
            <label className="block text-gray-400 mb-1.5 font-medium">Product Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProductType('INTRADAY')}
                className={`py-2 rounded border text-center font-medium transition-colors ${
                  productType === 'INTRADAY'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-[#1E2638] bg-[#0F141C] text-gray-400'
                }`}
              >
                Intraday <span className="text-[10px] block font-normal text-gray-500">MIS (5x margin)</span>
              </button>
              <button
                type="button"
                onClick={() => setProductType('DELIVERY')}
                className={`py-2 rounded border text-center font-medium transition-colors ${
                  productType === 'DELIVERY'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                    : 'border-[#1E2638] bg-[#0F141C] text-gray-400'
                }`}
              >
                Delivery <span className="text-[10px] block font-normal text-gray-500">CNC (Long-term)</span>
              </button>
            </div>
          </div>

          {/* Quantity & Order Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-3 py-2 text-gray-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-medium">Order Type</label>
              <select
                value={priceType}
                onChange={(e) => setPriceType(e.target.value)}
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-purple-500"
              >
                <option value="MARKET">Market</option>
                <option value="LIMIT">Limit</option>
              </select>
            </div>
          </div>

          {/* Limit Price Input (Only if LIMIT selected) */}
          {priceType === 'LIMIT' && (
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Limit Price (₹)</label>
              <input
                type="number"
                step="0.05"
                value={limitPrice}
                onChange={(e) => setLimitPrice(parseFloat(e.target.value))}
                className="w-full bg-[#0F141C] border border-[#1E2638] rounded px-3 py-2 text-gray-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {/* Margin & Amount Calculation */}
          <div className="bg-[#0F141C] border border-[#1E2638] p-3 rounded flex items-center justify-between font-mono">
            <div>
              <div className="text-gray-400 text-[10px]">Approx Margin Required</div>
              <div className="text-gray-200 font-semibold text-xs">
                ₹{productType === 'INTRADAY' ? (totalAmount / 5).toFixed(2) : totalAmount}
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-[10px]">Available Funds</div>
              <div className="text-emerald-400 font-semibold text-xs">₹50,000.00</div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className={`w-full py-2.5 rounded-lg font-bold text-white text-sm transition-transform active:scale-[0.98] ${
              isBuy ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            {isBuy ? 'PLACE BUY ORDER' : 'PLACE SELL ORDER'}
          </button>
        </form>
      </div>
    </div>
  );
}