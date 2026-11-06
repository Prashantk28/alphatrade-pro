import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function HeaderBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`h-12 px-4 flex items-center justify-between border-b transition-colors ${
      isDarkMode ? 'bg-[#131B2A] border-[#1E2638] text-white' : 'bg-white border-gray-200 text-gray-800'
    }`}>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-sm bg-purple-600 text-white px-2 py-0.5 rounded">AlphaTrade</span>
        <span className="text-xs opacity-75">Pro Terminal</span>
      </div>

      <div className="flex items-center space-x-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-lg border transition ${
            isDarkMode ? 'bg-[#0F141C] border-[#1E2638] text-amber-400 hover:bg-[#1E2638]' : 'bg-gray-100 border-gray-200 text-purple-600 hover:bg-gray-200'
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>
      </div>
    </header>
  );
}