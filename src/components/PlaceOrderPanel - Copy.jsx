import React, { useState } from 'react';
import { X, Plus, Minus, Info } from 'lucide-react';

export default function PlaceOrderPanel({ stock, actionType, onClose, onPlaceOrder }) {
  const [orderType, setOrderType] = useState('Regular'); // 'Regular' | 'GTT'
  const [productType, setProductType] = useState('Intraday'); // 'Delivery' | 'Intraday'
  const [quantity, setQuantity] = useState(1);
  const [priceType, setPriceType] = useState('Market'); // 'Market' | 'Limit'
  const [limitPrice, setLimitPrice] = useState(stock?.price || 100);
  
  // GTT साठी स्टेट्स
  const [gttTriggerPrice, setGttTriggerPrice] = useState(parseFloat(((stock?.price || 100) * 0.95).toFixed(2)));
  const [gttTargetPrice, setGttTargetPrice] = useState(parseFloat(((stock?.price || 100) * 1.05).toFixed(2)));

  const isBuy = actionType === 'BUY';

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleSubmit = () => {
    onPlaceOrder({
      symbol: stock?.symbol || 'TATAGOLD',
      action: actionType,
      orderCategory: orderType,
      productType: orderType === 'GTT' ? 'Delivery' : productType,
      orderType: priceType,
      quantity,
      price: priceType === 'Market' ? stock?.price : limitPrice,
      gttTriggerPrice: orderType === 'GTT' ? gttTriggerPrice : null,
      gttTargetPrice: orderType === 'GTT' ? gttTargetPrice : null
    });
    onClose();
  };

  return (
    <div className="w-80 bg-[#1e222d] text-white border-l border-gray-800 flex flex-col h-full shadow-2xl font-sans text-xs">
      {/* Top Header */}
      <div className={`p-4 flex items-center justify-between border-b border-gray-800 ${isBuy ? 'bg-blue-900/30' : 'bg-red-900/30'}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isBuy ? 'bg-blue-600' : 'bg-red-600'}`}>
              {actionType}
            </span>
            <h2 className="font-bold text-sm tracking-wide">{stock?.symbol}</h2>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {stock?.exchange || 'NSE'} <span className="text-emerald-400 font-semibold ml-2">₹{stock?.price}</span>
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1 cursor-pointer">
          <X size={16} />
        </button>
      </div>

      {/* Tabs: Regular / GTT */}
      <div className="flex border-b border-gray-800 text-xs font-medium">
        <button 
          onClick={() => setOrderType('Regular')} 
          className={`flex-1 py-2.5 border-b-2 transition-all cursor-pointer ${orderType === 'Regular' ? 'border-purple-500 text-purple-400 font-bold' : 'border-transparent text-gray-400'}`}
        >
          Regular
        </button>
        <button 
          onClick={() => setOrderType('GTT')} 
          className={`flex-1 py-2.5 border-b-2 transition-all cursor-pointer ${orderType === 'GTT' ? 'border-purple-500 text-purple-400 font-bold' : 'border-transparent text-gray-400'}`}
        >
          GTT (Good Till Triggered)
        </button>
      </div>

      {/* Form Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3.5">
        
        {/* जर Regular असेल तर Product Type दाखवा */}
        {orderType === 'Regular' && (
          <div className="flex gap-2 bg-[#12141c] p-1 rounded-lg">
            <button 
              onClick={() => setProductType('Delivery')}
              className={`flex-1 py-1.5 rounded font-medium transition-all cursor-pointer ${productType === 'Delivery' ? 'bg-[#2a2e39] text-purple-400 shadow' : 'text-gray-400'}`}
            >
              Delivery
            </button>
            <button 
              onClick={() => setProductType('Intraday')}
              className={`flex-1 py-1.5 rounded font-medium transition-all cursor-pointer ${productType === 'Intraday' ? 'bg-[#2a2e39] text-purple-400 shadow' : 'text-gray-400'}`}
            >
              Intraday
            </button>
          </div>
        )}

        {/* GTT विशेष इन्स्ट्रक्शन बॉक्स */}
        {orderType === 'GTT' && (
          <div className="bg-purple-950/30 border border-purple-800/50 p-2.5 rounded text-[11px] text-purple-300">
            <p className="font-bold mb-0.5">💡 GTT OCO Order</p>
            <p className="text-gray-400">Set trigger price for stop-loss and target. Valid for 1 year.</p>
          </div>
        )}

        {/* Quantity & Price Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-400 block mb-1">Quantity</label>
            <div className="flex items-center bg-[#12141c] border border-gray-700 rounded px-2 py-1">
              <button onClick={() => handleQuantityChange(-1)} className="text-gray-400 hover:text-white p-1 cursor-pointer"><Minus size={13} /></button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="w-full bg-transparent text-center text-white focus:outline-none font-semibold text-xs"
              />
              <button onClick={() => handleQuantityChange(1)} className="text-gray-400 hover:text-white p-1 cursor-pointer"><Plus size={13} /></button>
            </div>
          </div>

          {orderType === 'Regular' && (
            <div>
              <label className="text-gray-400 block mb-1">Type</label>
              <select 
                value={priceType} 
                onChange={(e) => setPriceType(e.target.value)}
                className="w-full bg-[#12141c] border border-gray-700 rounded px-2 py-1.5 text-white focus:outline-none font-medium text-xs cursor-pointer"
              >
                <option value="Market">Market</option>
                <option value="Limit">Limit</option>
              </select>
            </div>
          )}
        </div>

        {/* GTT Inputs: Trigger Price & Target Price */}
        {orderType === 'GTT' && (
          <div className="space-y-3 bg-[#12141c] p-3 rounded-lg border border-gray-800">
            <div>
              <label className="text-gray-400 block mb-1">Trigger Price (Stoploss)</label>
              <input 
                type="number" 
                value={gttTriggerPrice} 
                onChange={(e) => setGttTriggerPrice(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-700 rounded px-2.5 py-1.5 text-white focus:outline-none font-semibold"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Target Price</label>
              <input 
                type="number" 
                value={gttTargetPrice} 
                onChange={(e) => setGttTargetPrice(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-700 rounded px-2.5 py-1.5 text-white focus:outline-none font-semibold"
              />
            </div>
          </div>
        )}

        {/* Limit Price Input (जर रेगुलर आणि लिमिट असेल तर) */}
        {orderType === 'Regular' && priceType === 'Limit' && (
          <div>
            <label className="text-gray-400 block mb-1">Limit Price</label>
            <input 
              type="number" 
              value={limitPrice} 
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full bg-[#12141c] border border-gray-700 rounded px-3 py-1.5 text-white focus:outline-none font-semibold"
            />
          </div>
        )}

        {/* Market Depth Link */}
        <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-purple-400 cursor-pointer hover:underline">
          <span>Market depth</span>
          <span>&gt;</span>
        </div>

        {/* Info Note */}
        <div className="bg-amber-950/30 border border-amber-900/50 p-2 rounded flex items-start gap-2 text-amber-300 text-[10px]">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>Markets are closed. Order will be placed during the next trading session.</span>
        </div>
      </div>

      {/* Footer / Review Button */}
      <div className="p-3 border-t border-gray-800 bg-[#12141c] space-y-2">
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Estimated charges</span>
          <span className="text-white font-semibold">Available: ₹ 4,85,240.00</span>
        </div>
        <button 
          onClick={handleSubmit}
          className={`w-full py-2.5 rounded-lg font-bold text-xs tracking-wide shadow-lg transition-all cursor-pointer ${
            isBuy ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Review {orderType === 'GTT' ? 'GTT' : ''} {isBuy ? 'buy' : 'sell'} order
        </button>
      </div>
    </div>
  );
}