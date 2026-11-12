import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function PlaceOrderPanel({ stock, actionType, onClose, onPlaceOrder }) {
  const [orderMode, setOrderMode] = useState('Regular'); // 'Regular' or 'GTT'
  const [productType, setProductType] = useState('Intraday'); // 'Delivery' or 'Intraday'
  const [orderType, setOrderType] = useState('Market'); // 'Market' or 'Limit'
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock.price || 100);
  
  // GTT specific state
  const [stoplossPrice, setStoplossPrice] = useState((stock.price * 0.95).toFixed(2));
  const [targetPrice, setTargetPrice] = useState((stock.price * 1.05).toFixed(2));

  const handleReviewOrder = () => {
    if (orderMode === 'GTT') {
      onPlaceOrder({
        symbol: stock.symbol,
        price: stock.price,
        action: actionType,
        quantity,
        orderType: 'GTT',
        gttDetails: { stoploss: stoplossPrice, target: targetPrice }
      });
    } else {
      onPlaceOrder({
        symbol: stock.symbol,
        price: orderType === 'Limit' ? parseFloat(price) : stock.price,
        action: actionType,
        quantity,
        orderType: 'REGULAR'
      });
    }
  };

  return (
    <div className="w-80 bg-[#12141c] border-l border-gray-800 h-full flex flex-col font-sans text-xs text-gray-100 p-4 shadow-2xl z-50">
      <div className="flex justify-between items-center pb-3 border-b border-gray-800 mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${actionType === 'BUY' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
            {actionType}
          </span>
          <span className="font-bold text-sm text-white">{stock.symbol}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer"><FiX size={16}/></button>
      </div>

      <div className="flex space-x-2 bg-[#0b0e14] p-1 rounded-lg mb-3">
        <button onClick={() => setOrderMode('Regular')} className={`flex-1 py-1 rounded font-bold cursor-pointer ${orderMode === 'Regular' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}>Regular</button>
        <button onClick={() => setOrderMode('GTT')} className={`flex-1 py-1 rounded font-bold cursor-pointer ${orderMode === 'GTT' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>GTT (Stoploss & Target)</button>
      </div>

      {orderMode === 'Regular' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          <div className="flex space-x-2">
            <button onClick={() => setProductType('Delivery')} className={`flex-1 py-1.5 rounded border ${productType === 'Delivery' ? 'border-purple-600 bg-purple-950/30 text-white' : 'border-gray-800 text-gray-400'}`}>Delivery (CNC)</button>
            <button onClick={() => setProductType('Intraday')} className={`flex-1 py-1.5 rounded border ${productType === 'Intraday' ? 'border-purple-600 bg-purple-950/30 text-white' : 'border-gray-800 text-gray-400'}`}>Intraday (MIS)</button>
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Quantity (Lots of 10)</label>
            <div className="flex items-center space-x-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-800 px-3 py-1 rounded font-bold cursor-pointer">-</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-[#0b0e14] border border-gray-800 rounded text-center py-1 text-white" />
              <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-800 px-3 py-1 rounded font-bold cursor-pointer">+</button>
            </div>
          </div>

          <div className="flex space-x-2">
            <button onClick={() => setOrderType('Market')} className={`flex-1 py-1 rounded border ${orderType === 'Market' ? 'border-purple-600 text-white' : 'border-gray-800 text-gray-400'}`}>Market</button>
            <button onClick={() => setOrderType('Limit')} className={`flex-1 py-1 rounded border ${orderType === 'Limit' ? 'border-purple-600 text-white' : 'border-gray-800 text-gray-400'}`}>Limit</button>
          </div>

          {orderType === 'Limit' && (
            <div>
              <label className="text-gray-400 block mb-1">Limit Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2 py-1.5 text-white" />
            </div>
          )}
        </div>
      )}

      {orderMode === 'GTT' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          <div className="bg-purple-950/30 border border-purple-500/30 p-2.5 rounded-lg text-[11px] text-purple-300">
            <strong>GTT OCO Order:</strong> Set trigger price for stop-loss and target. Valid for 1 year.
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Trigger Price (Stoploss)</label>
            <input type="number" value={stoplossPrice} onChange={(e) => setStoplossPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2 py-1.5 text-red-400 font-bold" />
          </div>
          <div>
            <label className="text-gray-400 block mb-1">Target Price</label>
            <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2 py-1.5 text-green-400 font-bold" />
          </div>
        </div>
      )}

      {/* Day High / Low & Market Depth (Bid/Ask) */}
      <div className="mt-3 pt-3 border-t border-gray-800 space-y-2 text-[11px]">
        <div className="flex justify-between text-gray-400">
          <span>Day High: <strong className="text-green-400">₹{stock.high ? stock.high.toFixed(2) : (stock.price * 1.01).toFixed(2)}</strong></span>
          <span>Day Low: <strong className="text-red-400">₹{stock.low ? stock.low.toFixed(2) : (stock.price * 0.99).toFixed(2)}</strong></span>
        </div>
        <div className="bg-[#0b0e14] p-2 rounded border border-gray-800">
          <p className="font-bold text-gray-300 mb-1">Market Depth (Bid / Ask)</p>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>Bid: 5 Orders @ ₹{(stock.price * 0.999).toFixed(2)}</span>
            <span>Ask: 3 Orders @ ₹{(stock.price * 1.001).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-800 mt-3">
        <div className="flex justify-between mb-2 text-gray-400">
          <span>Estimated Margin:</span>
          <span className="text-white font-bold">₹{(stock.price * quantity * 10).toFixed(2)}</span>
        </div>
        <button onClick={handleReviewOrder} className={`w-full py-2.5 rounded-lg font-bold text-white shadow-lg cursor-pointer ${actionType === 'BUY' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'}`}>
          Confirm {actionType} Order
        </button>
      </div>
    </div>
  );
}