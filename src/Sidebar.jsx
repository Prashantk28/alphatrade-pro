import React from 'react';
import { FiTrendingUp, FiCompass, FiLayers, FiBarChart2, FiBox, FiPieChart, FiDollarSign, FiSettings } from 'react-icons/fi';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-14 bg-[#0F141C] border-r border-[#1E2638] flex flex-col items-center py-4 justify-between h-full z-20 select-none">
      {/* Top Logo */}
      <div className="flex flex-col items-center space-y-6">
        <div 
          onClick={() => setActiveTab('chart')} 
          className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition"
        >
          α
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4 text-gray-400">
          {/* Chart Icon */}
          <button
            title="Trading Chart"
            onClick={() => setActiveTab('chart')}
            className={`p-2 rounded-xl transition ${activeTab === 'chart' ? 'bg-[#1E2638] text-purple-400' : 'hover:text-white hover:bg-[#131B2A]'}`}
          >
            <FiTrendingUp size={18} />
          </button>

          {/* Discover / Markets Icon */}
          <button
            title="Discover & Ideas"
            onClick={() => setActiveTab('explore')}
            className={`p-2 rounded-xl transition relative ${activeTab === 'explore' ? 'bg-[#1E2638] text-purple-400' : 'hover:text-white hover:bg-[#131B2A]'}`}
          >
            <FiCompass size={18} />
          </button>

          {/* Option Chain Icon */}
          <button
            title="Option Chain"
            onClick={() => setActiveTab('optionchain')}
            className={`p-2 rounded-xl transition ${activeTab === 'optionchain' ? 'bg-[#1E2638] text-purple-400' : 'hover:text-white hover:bg-[#131B2A]'}`}
          >
            <FiLayers size={18} />
          </button>

          {/* Futures Icon */}
          <button
            title="Futures & Derivatives"
            onClick={() => setActiveTab('futures')}
            className={`p-2 rounded-xl transition ${activeTab === 'futures' ? 'bg-[#1E2638] text-purple-400' : 'hover:text-white hover:bg-[#131B2A]'}`}
          >
            <FiBarChart2 size={18} />
          </button>

          {/* Commodities Icon (हा बॉक्स आयकॉन इथे जोडला आहे) */}
          <button
            title="Commodities & MCX"
            onClick={() => setActiveTab('commodities')}
            className={`p-2 rounded-xl transition ${activeTab === 'commodities' ? 'bg-[#1E2638] text-purple-400' : 'hover:text-white hover:bg-[#131B2A]'}`}
          >
            <FiBox size={18} />
          </button>

          {/* Portfolio Icon */}
          <button
            title="Portfolio"
            className="p-2 rounded-xl hover:text-white hover:bg-[#131B2A] transition"
          >
            <FiPieChart size={18} />
          </button>

          {/* Funds Icon */}
          <button
            title="Funds"
            className="p-2 rounded-xl hover:text-white hover:bg-[#131B2A] transition"
          >
            <FiDollarSign size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Settings Icon */}
      <div className="text-gray-400">
        <button title="Settings" className="p-2 rounded-xl hover:text-white hover:bg-[#131B2A] transition">
          <FiSettings size={18} />
        </button>
      </div>
    </div>
  );
}