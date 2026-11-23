import React, { useState } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';

export default function OrderModal({ isOpen, onClose, stockName, ltp }) {
  const [qty, setQty] = useState(75);
  const [orderType, setOrderType] = useState('MARKET');
  const [transactionType, setTransactionType] = useState('BUY'); // BUY or SELL

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    alert(`Order Successfully Placed! ${transactionType} ${qty} qty of ${stockName} at ${orderType}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
      <div className="bg-[#131B2A] border border-[#1E2638] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#0F141C] border border-[#1E2638]"
        >
          <FiX size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${transactionType === 'BUY' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
            {transactionType}
          </span>
          <h3 className="text-base font-bold text-white">{stockName}</h3>
        </div>

        {/* Buy / Sell Toggle */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-[#0F141C] p-1 rounded-xl border border-[#1E2638]">
          <button
            onClick={() => setTransactionType('BUY')}
            className={`py-2 rounded-lg text-xs font-bold transition ${transactionType === 'BUY' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            BUY
          </button>
          <button
            onClick={() => setTransactionType('SELL')}
            className={`py-2 rounded-lg text-xs font-bold transition ${transactionType === 'SELL' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            SELL
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="space-y-4 text-xs font-mono mb-6">
          <div className="flex justify-between items-center bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
            <span className="text-gray-400">Quantity (Lots)</span>
            <input 
              type="number" 
              value={qty} 
              onChange={(e) => setQty(e.target.value)}
              className="w-24 bg-[#131B2A] border border-[#1E2638] text-right px-2 py-1 rounded text-white font-bold" 
            />
          </div>

          <div className="flex justify-between items-center bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
            <span className="text-gray-400">Order Type</span>
            <div className="space-x-2">
              {['MARKET', 'LIMIT'].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`px-3 py-1 rounded font-semibold transition ${orderType === t ? 'bg-purple-600 text-white' : 'bg-[#131B2A] text-gray-400'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Margin Required & Action */}
        <div className="flex justify-between items-center mb-6 text-xs font-mono border-t border-[#1E2638] pt-4">
          <div>
            <div className="text-gray-500 text-[10px]">EST. MARGIN</div>
            <div className="font-bold text-gray-200">₹{(qty * (ltp || 150)).toLocaleString('en-IN')}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-[10px]">LTP</div>
            <div className="font-bold text-green-400">₹{ltp}</div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className={`w-full py-3 rounded-xl text-xs font-bold transition shadow-lg ${
            transactionType === 'BUY' 
              ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 text-white' 
              : 'bg-red-600 hover:bg-red-500 shadow-red-600/30 text-white'
          }`}
        >
          Place {transactionType} Order 🚀
        </button>
      </div>
    </div>
  );
}