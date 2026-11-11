import React, { useState } from 'react';
import { X, Plus, Minus, Info } from 'lucide-react';

export default function PlaceOrderPanel({ stock, actionType, onClose, onPlaceOrder }) {
  const [orderType, setOrderType] = useState('Regular'); // Regular / GTT
  const [productType, setProductType] = useState('Intraday'); // Delivery / Intraday
  const [quantity, setQuantity] = useState(1);
  const [priceType, setPriceType] = useState('Market'); // Market / Limit
  const [limitPrice, setLimitPrice] = useState(stock?.price || 100);

  const isBuy = actionType === 'BUY';

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleSubmit = () => {
    onPlaceOrder({
      symbol: stock?.symbol || 'TATAGOLD',
      action: actionType,
      productType,
      orderType: priceType,
      quantity,
      price: priceType === 'Market' ? stock?.price : limitPrice
    });
    onClose();
  };

  return (
    <div className="w-80 bg-[#1e222d] text-white border-l border-gray-800 flex flex-col h-full shadow-2xl font-sans">
      {/* Top Header */}
      <div className={`p-4 flex items-center justify-between border-b border-gray-800 ${isBuy ? 'bg-blue-900/30' : 'bg-red-900/30'}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isBuy ? 'bg-blue-600' : 'bg-red-600'}`}>
              {actionType}
            </span>
            <h2 className="font-bold text-base tracking-wide">{stock?.symbol || 'TATAGOLD'}</h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {stock?.exchange || 'NSE'} <span className="text-emerald-400 font-semibold ml-2">₹{stock?.price || '13.74'}</span> 
            <span className="text-emerald-400 text-[10px] ml-1">(+0.02 +0.15%)</span>
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
          <X size={18} />
        </button>
      </div>

      {/* Tabs: Regular / GTT */}
      <div className="flex border-b border-gray-800 text-sm">
        <button 
          onClick={() => setOrderType('Regular')} 
          className={`flex-1 py-2.5 font-medium border-b-2 transition-all ${orderType === 'Regular' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}
        >
          Regular
        </button>
        <button 
          onClick={() => setOrderType('GTT')} 
          className={`flex-1 py-2.5 font-medium border-b-2 transition-all ${orderType === 'GTT' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}
        >
          GTT
        </button>
      </div>

      {/* Form Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
        {/* Product Type (Delivery / Intraday) */}
        <div className="flex gap-2 bg-[#12141c] p-1 rounded-lg">
          <button 
            onClick={() => setProductType('Delivery')}
            className={`flex-1 py-1.5 rounded font-medium transition-all ${productType === 'Delivery' ? 'bg-[#2a2e39] text-purple-400 shadow' : 'text-gray-400'}`}
          >
            Delivery (Longterm)
          </button>
          <button 
            onClick={() => setProductType('Intraday')}
            className={`flex-1 py-1.5 rounded font-medium transition-all ${productType === 'Intraday' ? 'bg-[#2a2e39] text-purple-400 shadow' : 'text-gray-400'}`}
          >
            Intraday (Same day)
          </button>
        </div>

        {/* Quantity & Price Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-400 block mb-1">Quantity</label>
            <div className="flex items-center bg-[#12141c] border border-gray-700 rounded px-2 py-1">
              <button onClick={() => handleQuantityChange(-1)} className="text-gray-400 hover:text-white p-1"><Minus size={14} /></button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="w-full bg-transparent text-center text-white focus:outline-none font-semibold text-sm"
              />
              <button onClick={() => handleQuantityChange(1)} className="text-gray-400 hover:text-white p-1"><Plus size={14} /></button>
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Type</label>
            <select 
              value={priceType} 
              onChange={(e) => setPriceType(e.target.value)}
              className="w-full bg-[#12141c] border border-gray-700 rounded px-2 py-1.5 text-white focus:outline-none font-medium"
            >
              <option value="Market">Market</option>
              <option value="Limit">Limit</option>
            </select>
          </div>
        </div>

        {/* Limit Price Input (if Limit selected) */}
        {priceType === 'Limit' && (
          <div>
            <label className="text-gray-400 block mb-1">Limit Price</label>
            <input 
              type="number" 
              value={limitPrice} 
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full bg-[#12141c] border border-gray-700 rounded px-3 py-1.5 text-white focus:outline-none"
            />
          </div>
        )}

        {/* Market Depth Link */}
        <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-purple-400 cursor-pointer hover:underline">
          <span>Market depth</span>
          <span>&gt;</span>
        </div>

        {/* Additional Settings */}
        <div className="bg-[#12141c] p-2.5 rounded border border-gray-800/60 space-y-1">
          <p className="font-semibold text-gray-300">Additional settings</p>
          <p className="text-[11px] text-gray-400">Add validity & disclosed quantity.</p>
        </div>

        {/* Info Note */}
        <div className="bg-amber-950/30 border border-amber-900/50 p-2 rounded flex items-start gap-2 text-amber-300 text-[11px]">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>Markets are closed. Order will be placed during the next trading session.</span>
        </div>
      </div>

      {/* Footer / Review Button */}
      <div className="p-3 border-t border-gray-800 bg-[#12141c] space-y-2">
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>Estimated charges</span>
          <span className="text-white font-semibold">Available: ₹ 0.00</span>
        </div>
        <button 
          onClick={handleSubmit}
          className={`w-full py-2.5 rounded-lg font-bold text-sm tracking-wide shadow-lg transition-all ${
            isBuy ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Review {isBuy ? 'buy' : 'sell'} order
        </button>
      </div>
    </div>
  );
}