import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiUser, FiLogOut, FiSettings, FiHelpCircle, FiFileText } from 'react-icons/fi';

export default function HeaderBar({ onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside kelyanantar dropdown band honyasathi
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-12 bg-[#0F141C] border-b border-[#1E2638] flex items-center justify-between px-4 select-none z-30">
      
      {/* Market Indices / Ticker Summary */}
      <div className="flex items-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-400">NIFTY 50</span>
          <span className="text-white font-medium">22,488.95</span>
          <span className="text-green-400 font-medium">+158.65 (+0.71%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-400">BANKNIFTY</span>
          <span className="text-white font-medium">47,595.71</span>
          <span className="text-red-400 font-medium">-404.79 (-0.84%)</span>
        </div>
      </div>

      {/* Right Side Actions & Profile Dropdown */}
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        
        {/* Live Status Badge */}
        <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
          LIVE
        </span>

        {/* Notifications Icon */}
        <button className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-[#1E2638]">
          <FiBell size={16} />
        </button>

        {/* User Profile / PK Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center transition shadow-md shadow-purple-600/20"
        >
          PK
        </button>

        {/* Dropdown Menu (Upstox Style) */}
        {dropdownOpen && (
          <div className="absolute right-0 top-10 w-64 bg-[#131B2A] border border-[#1E2638] rounded-xl shadow-2xl py-2 z-50 text-xs">
            
            {/* User ID Header */}
            <div className="px-4 py-3 border-b border-[#1E2638]">
              <p className="font-semibold text-white">Prashant Kamble</p>
              <p className="text-[11px] text-gray-400 mt-0.5">My Account | User ID 122758</p>
            </div>

            {/* Menu Options */}
            <div className="py-1 text-gray-300">
              <button onClick={() => setDropdownOpen(false)} className="w-full flex items-center px-4 py-2.5 hover:bg-[#1E2638] hover:text-white transition space-x-2.5">
                <FiUser size={14} className="text-purple-400" />
                <span>My Profile</span>
              </button>
              <button onClick={() => setDropdownOpen(false)} className="w-full flex items-center px-4 py-2.5 hover:bg-[#1E2638] hover:text-white transition space-x-2.5">
                <FiFileText size={14} className="text-purple-400" />
                <span>My Reports</span>
              </button>
              <button onClick={() => setDropdownOpen(false)} className="w-full flex items-center px-4 py-2.5 hover:bg-[#1E2638] hover:text-white transition space-x-2.5">
                <FiSettings size={14} className="text-purple-400" />
                <span>Settings</span>
              </button>
              <button onClick={() => setDropdownOpen(false)} className="w-full flex items-center px-4 py-2.5 hover:bg-[#1E2638] hover:text-white transition space-x-2.5">
                <FiHelpCircle size={14} className="text-purple-400" />
                <span>Help & Support</span>
              </button>
            </div>

            {/* Logout Option */}
            <div className="border-t border-[#1E2638] pt-1 mt-1">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  if (onLogout) onLogout();
                }}
                className="w-full flex items-center px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition space-x-2.5 font-semibold"
              >
                <FiLogOut size={14} />
                <span>Logout</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}