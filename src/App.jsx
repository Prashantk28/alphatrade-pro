import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import WatchlistPanel from './components/WatchlistPanel';
import ChartArea from './components/ChartArea';
import PositionsDock from './components/PositionsDock';

export default function App() {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');

  return (
    <div className="flex h-screen bg-[#0F141C] text-gray-200 overflow-hidden font-sans">
      {/* 1. Icon Sidebar (Upstox Style Left Menu) */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 2. Top Navigation & Indices Bar */}
        <HeaderBar />

        {/* 3. Main Workspace: Watchlist + Chart + Dock */}
        <div className="flex flex-1 overflow-hidden">
          {/* Watchlist Section */}
          <div className="w-80 border-r border-[#1E2638] bg-[#131B2A]">
            <WatchlistPanel onSelectStock={setSelectedStock} selectedStock={selectedStock} />
          </div>

          {/* Main Chart + Order Book Area */}
          <div className="flex flex-col flex-1 bg-[#0F141C]">
            <div className="flex-1 p-2">
              <ChartArea stock={selectedStock} />
            </div>

            {/* Bottom Positions & P&L Panel */}
            <div className="h-48 border-t border-[#1E2638] bg-[#131B2A]">
              <PositionsDock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}