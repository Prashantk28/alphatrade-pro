import React from 'react';
import { FiX, FiUser, FiFileText, FiSettings, FiHelpCircle } from 'react-icons/fi';

export default function ProfileDetailsModal({ activeSection, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 select-none">
      <div className="bg-[#131B2A] border border-[#1E2638] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2638]">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            {activeSection === 'profile' && <><FiUser className="text-purple-400" /><span>My Profile</span></>}
            {activeSection === 'reports' && <><FiFileText className="text-purple-400" /><span>My Reports & P&L</span></>}
            {activeSection === 'settings' && <><FiSettings className="text-purple-400" /><span>Account Settings</span></>}
            {activeSection === 'help' && <><FiHelpCircle className="text-purple-400" /><span>Help & Support</span></>}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <FiX size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs text-gray-300 overflow-y-auto max-h-[60vh]">
          {activeSection === 'profile' && (
            <div className="space-y-3">
              <div className="flex justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span className="text-gray-400">Full Name</span>
                <span className="text-white font-semibold">Prashant Kamble</span>
              </div>
              <div className="flex justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span className="text-gray-400">User ID</span>
                <span className="text-white font-semibold">ALPHAPK1227</span>
              </div>
              <div className="flex justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span className="text-gray-400">Email</span>
                <span className="text-white font-semibold">prashant@alphatrade.pro</span>
              </div>
              <div className="flex justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span className="text-gray-400">Segment</span>
                <span className="text-green-400 font-semibold">Equity, F&O, Currency</span>
              </div>
            </div>
          )}

          {activeSection === 'reports' && (
            <div className="space-y-3">
              <div className="bg-[#0F141C] p-4 rounded-xl border border-[#1E2638]">
                <p className="text-gray-400 mb-1">Realized P&L (Current Month)</p>
                <p className="text-base font-bold text-green-400">+₹4,850.20</p>
              </div>
              <div className="bg-[#0F141C] p-4 rounded-xl border border-[#1E2638]">
                <p className="text-gray-400 mb-1">Total Trades Executed</p>
                <p className="text-base font-bold text-white">28 Trades</p>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition">
                Download Tax P&L Statement (PDF)
              </button>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span>Dark Theme Mode</span>
                <span className="text-purple-400 font-semibold">Enabled (Upstox Dark)</span>
              </div>
              <div className="flex items-center justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span>Order Execution Sound</span>
                <span className="text-green-400 font-semibold">ON</span>
              </div>
              <div className="flex items-center justify-between bg-[#0F141C] p-3 rounded-xl border border-[#1E2638]">
                <span>Two-Factor Authentication</span>
                <span className="text-green-400 font-semibold">Secured</span>
              </div>
            </div>
          )}

          {activeSection === 'help' && (
            <div className="space-y-3">
              <div className="bg-[#0F141C] p-4 rounded-xl border border-[#1E2638] space-y-1">
                <p className="font-semibold text-white">Customer Care Support</p>
                <p className="text-gray-400 text-[11px]">Available 24/7 for AlphaTrade Pro Simulator users.</p>
                <p className="text-purple-400 font-medium pt-1">support@alphatrade.pro</p>
              </div>
              <div className="bg-[#0F141C] p-4 rounded-xl border border-[#1E2638] space-y-1">
                <p className="font-semibold text-white">Paper Trading Guide</p>
                <p className="text-gray-400 text-[11px]">Learn how to execute buy/sell orders and manage stop-loss in virtual markets.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1E2638] bg-[#0F141C]/50 text-right">
          <button
            onClick={onClose}
            className="bg-[#1E2638] hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}