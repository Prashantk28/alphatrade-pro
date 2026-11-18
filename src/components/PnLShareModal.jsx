<<<<<<< HEAD
import React, { useState } from 'react';
import { FiX, FiShare2, FiCheck, FiDownload } from 'react-icons/fi';

export default function PnLShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const pnlAmount = "+₹22,575.00";
  const percentage = "+18.45%";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none font-mono">
      <div className="bg-[#131B2A] border border-[#1E2638] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
=======
import React from 'react';
import { FiX, FiShare2, FiTrendingUp, FiTrendingDown, FiCheckCircle } from 'react-icons/fi';

export default function PnLShareModal({ onClose, pnlData }) {
  const isProfit = (pnlData?.totalPnL || 24500) >= 0;

  const data = pnlData || {
    symbol: 'NIFTY 24800 CE',
    buyPrice: 120.50,
    sellPrice: 185.00,
    qty: 350,
    totalPnL: 22575,
    pnlPercentage: '+53.52%',
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#131B2A] border border-[#1E2638] w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-white">
        {/* Close Button */}
>>>>>>> main
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#0F141C] border border-[#1E2638]"
        >
          <FiX size={18} />
        </button>

<<<<<<< HEAD
        <div className="flex items-center space-x-2 mb-4">
          <FiShare2 className="text-green-400" size={20} />
          <h3 className="text-base font-bold text-white">Share Your Trading PnL</h3>
        </div>

        {/* PnL Card Preview Box */}
        <div className="bg-gradient-to-br from-[#1E2638] to-[#0F141C] border border-green-500/30 rounded-2xl p-6 text-center my-4 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500/10 text-green-400 text-[10px] px-3 py-1 rounded-bl-xl font-bold">
            VERIFIED TRADE
          </div>
          <p className="text-xs text-gray-400 mb-1">AlphaTrade Pro Portfolio</p>
          <h2 className="text-3xl font-extrabold text-green-400 my-2">{pnlAmount}</h2>
          <span className="bg-green-500/20 text-green-300 text-xs px-2.5 py-1 rounded-full font-bold">
            {percentage} Return
          </span>
          <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between text-[11px] text-gray-400">
            <span>Instrument: NIFTY 24800 CE</span>
            <span>Trader: Prashant Kamble</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="py-2.5 bg-[#0F141C] border border-[#1E2638] hover:border-purple-500 text-gray-200 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2"
          >
            {copied ? <FiCheck className="text-green-400" /> : <FiShare2 />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Card'}</span>
          </button>
          
          <button
            onClick={() => alert('📥 PnL Card Downloaded Successfully!')}
            className="py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30"
          >
            <FiDownload size={14} />
            <span>Download Image</span>
=======
        <h3 className="text-base font-bold mb-4 flex items-center space-x-2 text-purple-400">
          <FiShare2 />
          <span>Share Position PnL</span>
        </h3>

        {/* Share Card UI Preview */}
        <div className={`p-6 rounded-xl border relative overflow-hidden transition-all ${
          isProfit 
            ? 'bg-gradient-to-br from-green-950/40 via-[#131B2A] to-[#0F141C] border-green-500/30' 
            : 'bg-gradient-to-br from-red-950/40 via-[#131B2A] to-[#0F141C] border-red-500/30'
        }`}>
          {/* Top Brand Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span className="bg-purple-600 text-white font-extrabold text-xs px-2 py-0.5 rounded tracking-wider">
                ALPHA TRADE
              </span>
              <span className="text-[10px] text-gray-400 font-mono">PRO TERMINAL</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono">{data.date}</span>
          </div>

          {/* Symbol & Side */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Instrument</span>
            <div className="text-lg font-bold text-white flex items-center space-x-2">
              <span>{data.symbol}</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded font-mono">
                BUY
              </span>
            </div>
          </div>

          {/* PnL Value Highlight */}
          <div className="my-6 text-center py-4 bg-[#0F141C]/60 border border-[#1E2638] rounded-xl">
            <div className="text-xs text-gray-400 font-semibold mb-1">TOTAL REALIZED P&L</div>
            <div className={`text-3xl font-extrabold font-mono flex items-center justify-center space-x-1 ${
              isProfit ? 'text-green-400' : 'text-red-400'
            }`}>
              {isProfit ? <FiTrendingUp size={24} /> : <FiTrendingDown size={24} />}
              <span>{isProfit ? '+' : ''}₹{Math.abs(data.totalPnL).toLocaleString('en-IN')}</span>
            </div>
            <div className={`text-xs font-bold mt-1 font-mono ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
              ({data.pnlPercentage})
            </div>
          </div>

          {/* Trade Details Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-[#1E2638] pt-4 font-mono">
            <div>
              <div className="text-gray-500 text-[10px]">AVG PRICE</div>
              <div className="font-semibold text-gray-200">₹{data.buyPrice}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">LTP / EXIT</div>
              <div className="font-semibold text-gray-200">₹{data.sellPrice}</div>
            </div>
            <div>
              <div className="text-gray-500 text-[10px]">QUANTITY</div>
              <div className="font-semibold text-gray-200">{data.qty}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => {
              alert("PnL Card screenshot copied to clipboard!");
              onClose();
            }}
            className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30"
          >
            <FiShare2 size={14} />
            <span>Copy / Share Card</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#0F141C] border border-[#1E2638] hover:bg-[#1E2638] text-gray-300 text-xs font-bold rounded-lg transition"
          >
            Close
>>>>>>> main
          </button>
        </div>
      </div>
    </div>
  );
}