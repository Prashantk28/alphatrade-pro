import React from 'react';
import { FiUser, FiMail, FiShield, FiLogOut } from 'react-icons/fi';

export default function ProfileView({ onLogout }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#0F141C] text-gray-200 p-6 select-none h-full">
      <div className="w-full max-w-lg bg-[#131B2A] border border-[#1E2638] rounded-2xl p-8 shadow-2xl">
        
        {/* Header / Avatar */}
        <div className="flex items-center space-x-4 pb-6 border-b border-[#1E2638]">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl font-bold">
            PK
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Prashant Kamble</h2>
            <p className="text-xs text-gray-400">AlphaTrade Pro Member</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between bg-[#0F141C] p-4 rounded-xl border border-[#1E2638]">
            <div className="flex items-center space-x-3 text-gray-400">
              <FiUser size={18} className="text-purple-400" />
              <span className="text-xs">Username</span>
            </div>
            <span className="text-sm font-medium text-white">prashant_trader</span>
          </div>

          <div className="flex items-center justify-between bg-[#0F141C] p-4 rounded-xl border border-[#1E2638]">
            <div className="flex items-center space-x-3 text-gray-400">
              <FiMail size={18} className="text-purple-400" />
              <span className="text-xs">Email Address</span>
            </div>
            <span className="text-sm font-medium text-white">pkamble@example.com</span>
          </div>

          <div className="flex items-center justify-between bg-[#0F141C] p-4 rounded-xl border border-[#1E2638]">
            <div className="flex items-center space-x-3 text-gray-400">
              <FiShield size={18} className="text-purple-400" />
              <span className="text-xs">Account Status</span>
            </div>
            <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full font-medium">
              Active (Paper Trading)
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4 border-t border-[#1E2638]">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 font-semibold py-3 rounded-xl text-sm transition duration-200"
          >
            <FiLogOut size={18} />
            <span>Logout from AlphaTrade Pro</span>
          </button>
        </div>

      </div>
    </div>
  );
}