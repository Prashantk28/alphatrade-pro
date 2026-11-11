import React, { useState } from 'react';
import { X, User, Shield, CreditCard, Bell, LogOut, CheckCircle } from 'lucide-react';

export default function ProfileModal({ email, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [nseActive, setNseActive] = useState(true);
  const [bseBseActive, setBseActive] = useState(true);
  const [foActive, setFoActive] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans text-xs">
      <div className="bg-[#12141c] border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#181b25]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
              PK
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Prashant Sitaram Kamble</h3>
              <p className="text-[10px] text-gray-400">{email} • ID: 122758</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer p-1">
            <X size={18} />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex border-b border-gray-800 bg-[#0b0e14] px-4 space-x-6 font-semibold">
          <button onClick={() => setActiveTab('profile')} className={`py-3 border-b-2 cursor-pointer transition-all ${activeTab === 'profile' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Profile & Segments</button>
          <button onClick={() => setActiveTab('settings')} className={`py-3 border-b-2 cursor-pointer transition-all ${activeTab === 'settings' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'}`}>Bank & Demat</button>
        </div>

        {/* Body Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-[#181b25] p-4 rounded-xl border border-gray-800 space-y-2">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Account Tier</span>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Pro Paper Trader (KVIC Entity)</span>
                  <span className="bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle size={10} /> Active
                  </span>
                </div>
              </div>

              <div className="bg-[#181b25] p-4 rounded-xl border border-gray-800 space-y-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Exchange Segment Activations</span>
                
                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/60">
                  <div>
                    <p className="font-bold text-white">NSE & BSE (Cash / Equities)</p>
                    <p className="text-[10px] text-gray-400">Default trading enabled</p>
                  </div>
                  <input type="checkbox" checked={nseActive} onChange={() => setNseActive(!nseActive)} className="accent-purple-600 h-4 w-4 cursor-pointer" />
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-gray-800/60">
                  <div>
                    <p className="font-bold text-white">Futures & Options (F&O)</p>
                    <p className="text-[10px] text-gray-400">Nifty, BankNifty derivatives</p>
                  </div>
                  <input type="checkbox" checked={foActive} onChange={() => setFoActive(!foActive)} className="accent-purple-600 h-4 w-4 cursor-pointer" />
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <div>
                    <p className="font-bold text-white">MCX (Commodity)</p>
                    <p className="text-[10px] text-gray-400">Gold, Silver, Crudeoil</p>
                  </div>
                  <input type="checkbox" checked={bseBseActive} onChange={() => setBseActive(!bseBseActive)} className="accent-purple-600 h-4 w-4 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="bg-[#181b25] p-4 rounded-xl border border-gray-800 space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Primary Bank Account</span>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">HDFC Bank Limited</p>
                    <p className="text-[10px] text-gray-400">A/c No: *****4021 • IFSC: HDFC0001234</p>
                  </div>
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold">Primary</span>
                </div>
              </div>

              <div className="bg-[#181b25] p-4 rounded-xl border border-gray-800 space-y-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Demat & Depository</span>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">CDSL Demat Account</p>
                    <p className="text-[10px] text-gray-400">BO ID: 120816000122758</p>
                  </div>
                  <span className="text-green-400 font-bold text-[11px]">Verified</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-[#181b25] flex justify-between items-center">
          <button 
            onClick={onLogout} 
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 px-4 py-2 rounded-lg font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
          >
            <LogOut size={14} />
            <span>Logout Terminal</span>
          </button>
          <button 
            onClick={onClose} 
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-lg cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}