import React from 'react';
import { FiTrendingUp, FiList, FiBriefcase, FiDollarSign, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="w-14 bg-[#131B2A] border-r border-[#1E2638] flex flex-col items-center py-4 space-y-6">
      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
        α
      </div>
      <nav className="flex flex-col space-y-4 text-gray-400">
        <button className="p-2 hover:bg-[#1E2638] hover:text-purple-400 rounded-md active text-purple-400">
          <FiTrendingUp size={20} />
        </button>
        <button className="p-2 hover:bg-[#1E2638] hover:text-purple-400 rounded-md">
          <FiList size={20} />
        </button>
        <button className="p-2 hover:bg-[#1E2638] hover:text-purple-400 rounded-md">
          <FiBriefcase size={20} />
        </button>
        <button className="p-2 hover:bg-[#1E2638] hover:text-purple-400 rounded-md">
          <FiDollarSign size={20} />
        </button>
      </nav>
      <div className="mt-auto">
        <button className="p-2 hover:bg-[#1E2638] text-gray-400 rounded-md">
          <FiSettings size={20} />
        </button>
      </div>
    </div>
  );
}