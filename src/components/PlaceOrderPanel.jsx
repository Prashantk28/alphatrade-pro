import React, { useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function PlaceOrderPanel({ stock, actionType, onClose, onPlaceOrder }) {
  const [orderMode, setOrderMode] = useState('Regular');
  const [productType, setProductType] = useState('Intraday');
  const [orderType, setOrderType] = useState('Market');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock.price || 100);
  const [showDepth, setShowDepth] = useState(true);

  const [stoplossPrice, setStoplossPrice] = useState((stock.price * 0.95).toFixed(2));
  const [targetPrice, setTargetPrice] = useState((stock.price * 1.05).toFixed(2));

  const baseP = parseFloat(stock.price) || 100;
  const bids = [
    { price: (baseP - 0.05).toFixed(2), orders: 12, qty: 450 },
    { price: (baseP - 0.10).toFixed(2), orders: 8, qty: 320 },
    { price: (baseP - 0.15).toFixed(2), orders: 19, qty: 890 },
    { price: (baseP - 0.20).toFixed(2), orders: 5, qty: 150 },
    { price: (baseP - 0.25).toFixed(2), orders: 14, qty: 610 },
  ];

  const asks = [
    { price: (baseP + 0.05).toFixed(2), orders: 9, qty: 380 },
    { price: (baseP + 0.10).toFixed(2), orders: 15, qty: 540 },
    { price: (baseP + 0.15).toFixed(2), orders: 6, qty: 210 },
    { price: (baseP + 0.20).toFixed(2), orders: 22, qty: 950 },
    { price: (baseP + 0.25).toFixed(2), orders: 11, qty: 430 },
  ];

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
    <div className="w-80 md:w-96 bg-[#12141c] border-l border-gray-800 h-full flex flex-col font-sans text-xs text-gray-100 p-4 shadow-2xl z-50">
      <div className="flex justify-between items-center pb-3 border-b border-gray-800 mb-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${actionType === 'BUY' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
            {actionType}
          </span>
          <span className="font-bold text-sm text-white">{stock.symbol}</span>
          <span className="text-[11px] text-amber-400 font-mono">₹{baseP.toFixed(2)}</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer"><FiX size={16}/></button>
      </div>

      <div className="flex space-x-2 bg-[#0b0e14] p-1 rounded-lg mb-3">
        <button onClick={() => setOrderMode('Regular')} className={`flex-1 py-1.5 rounded font-bold cursor-pointer ${orderMode === 'Regular' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}>Regular</button>
        <button onClick={() => setOrderMode('GTT')} className={`flex-1 py-1.5 rounded font-bold cursor-pointer ${orderMode === 'GTT' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>GTT (SL & Target)</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {orderMode === 'Regular' ? (
          <>
            <div className="flex space-x-2">
              <button onClick={() => setProductType('Delivery')} className={`flex-1 py-1.5 rounded border cursor-pointer ${productType === 'Delivery' ? 'border-purple-600 bg-purple-950/30 text-white' : 'border-gray-800 text-gray-400'}`}>Delivery (CNC)</button>
              <button onClick={() => setProductType('Intraday')} className={`flex-1 py-1.5 rounded border cursor-pointer ${productType === 'Intraday' ? 'border-purple-600 bg-purple-950/30 text-white' : 'border-gray-800 text-gray-400'}`}>Intraday (MIS)</button>
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Quantity (Lots of 10)</label>
              <div className="flex items-center space-x-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-800 px-3 py-1.5 rounded font-bold cursor-pointer">-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-[#0b0e14] border border-gray-800 rounded text-center py-1.5 text-white font-bold" />
                <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-800 px-3 py-1.5 rounded font-bold cursor-pointer">+</button>
              </div>
            </div>

            <div className="flex space-x-2">
              <button onClick={() => setOrderType('Market')} className={`flex-1 py-1.5 rounded border cursor-pointer ${orderType === 'Market' ? 'border-purple-600 text-white' : 'border-gray-800 text-gray-400'}`}>Market</button>
              <button onClick={() => setOrderType('Limit')} className={`flex-1 py-1.5 rounded border cursor-pointer ${orderType === 'Limit' ? 'border-purple-600 text-white' : 'border-gray-800 text-gray-400'}`}>Limit</button>
            </div>

            {orderType === 'Limit' && (
              <div>
                <label className="text-gray-400 block mb-1">Limit Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2.5 py-1.5 text-white font-mono" />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-purple-950/30 border border-purple-500/30 p-2.5 rounded-lg text-[11px] text-purple-300">
              <strong>GTT OCO Order:</strong> Set trigger price for stop-loss and target. Valid for 1 year.
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Trigger Price (Stoploss)</label>
              <input type="number" value={stoplossPrice} onChange={(e) => setStoplossPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2.5 py-1.5 text-red-400 font-bold font-mono" />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Target Price</label>
              <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 rounded px-2.5 py-1.5 text-green-400 font-bold font-mono" />
            </div>
          </>
        )}

        {/* Day High / Low */}
        <div className="pt-2 border-t border-gray-800">
          <div className="flex justify-between text-[11px] bg-[#0b0e14] p-2.5 rounded-lg border border-gray-800">
            <div>
              <span className="text-gray-400 block text-[10px]">DAY HIGH</span>
              <span className="text-green-400 font-bold font-mono">₹{stock.high ? stock.high.toFixed(2) : (baseP * 1.015).toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px]">DAY LOW</span>
              <span className="text-red-400 font-bold font-mono">₹{stock.low ? stock.low.toFixed(2) : (baseP * 0.985).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Top 5 Market Depth (Bid/Ask) */}
        <div className="bg-[#0b0e14] rounded-lg border border-gray-800 overflow-hidden">
          <button onClick={() => setShowDepth(!showDepth)} className="w-full px-3 py-2 flex justify-between items-center bg-gray-900/60 text-gray-300 font-bold text-[11px] cursor-pointer">
            <span>Market Depth (Top 5 Bid / Ask)</span>
            {showDepth ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {showDepth && (
            <div className="p-2 grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div>
                <div className="flex justify-between text-gray-500 border-b border-gray-800 pb-1 mb-1">
                  <span>BID</span><span>ORD</span><span>QTY</span>
                </div>
                {bids.map((b, i) => (
                  <div key={i} className="flex justify-between text-blue-400 py-0.5">
                    <span>{b.price}</span><span className="text-gray-400">{b.orders}</span><span>{b.qty}</span>
                  </div>
                ))}
                <div className="border-t border-gray-800 pt-1 mt-1 flex justify-between font-bold text-blue-300">
                  <span>Total</span><span>2,420</span>
                </div>
              </div>

              <div className="border-l border-gray-800 pl-2">
                <div className="flex justify-between text-gray-500 border-b border-gray-800 pb-1 mb-1">
                  <span>ASK</span><span>ORD</span><span>QTY</span>
                </div>
                {asks.map((a, i) => (
                  <div key={i} className="flex justify-between text-red-400 py-0.5">
                    <span>{a.price}</span><span className="text-gray-400">{a.orders}</span><span>{a.qty}</span>
                  </div>
                ))}
                <div className="border-t border-gray-800 pt-1 mt-1 flex justify-between font-bold text-red-300">
                  <span>Total</span><span>2,510</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-800 mt-3">
        <div className="flex justify-between mb-2 text-gray-400">
          <span>Estimated Margin:</span>
          <span className="text-white font-bold font-mono">₹{(baseP * quantity * 10).toFixed(2)}</span>
        </div>
        <button onClick={handleReviewOrder} className={`w-full py-2.5 rounded-lg font-bold text-white shadow-lg cursor-pointer ${actionType === 'BUY' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'}`}>
          Confirm {actionType} Order
        </button>
      </div>
    </div>
  );
}