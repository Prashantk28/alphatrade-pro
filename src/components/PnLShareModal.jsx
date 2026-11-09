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
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#0F141C] border border-[#1E2638]"
        >
          <FiX size={18} />
        </button>

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
          </button>
        </div>
      </div>
    </div>
  );
}