import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderBar from './components/HeaderBar';
import WatchlistPanel from './components/WatchlistPanel';
import PositionsDock from './components/PositionsDock';
import OrderModal from './components/OrderModal';
import { FiBarChart2 } from 'react-icons/fi';

export default function App() {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('BUY');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candles');
  const [showMa, setShowMa] = useState(true);
  const [showRsi, setShowRsi] = useState(false);

  // Positions list state
  const [positionsList, setPositionsList] = useState([
    { symbol: 'RELIANCE', qty: 15, avgPrice: 2955.00, ltp: 2971.74, pnl: 251.10, chg: '+0.53%', isBuy: true }
  ]);

  const handleAddPosition = (newOrder) => {
    setPositionsList(prev => [
      ...prev,
      {
        symbol: newOrder.symbol,
        qty: newOrder.qty,
        avgPrice: newOrder.price,
        ltp: newOrder.price,
        pnl: 0.00,
        chg: '0.00%',
        isBuy: newOrder.type === 'BUY'
      }
    ]);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#0F141C] text-gray-200 overflow-hidden font-sans select-none">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderBar />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 border-r border-[#1E2638] bg-[#131B2A]">
            <WatchlistPanel onSelectStock={setSelectedStock} selectedStock={selectedStock} />
          </div>

          <div className="flex flex-col flex-1 bg-[#0F141C]">
            {/* Chart Workspace Header with Timeframe & Indicators */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E2638] bg-[#131B2A]">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-200 text-sm">{selectedStock}</span>
                <span className="text-xs text-emerald-400">₹2,971.74 (+0.53%)</span>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center space-x-1 bg-[#0F141C] p-1 rounded border border-[#1E2638]">
                {['1m', '5m', '15m', '1h', '1D'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      selectedTimeframe === tf ? 'bg-purple-600 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-[#1E2638]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Technical Indicators & Chart Type */}
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1 bg-[#0F141C] p-1 rounded border border-[#1E2638]">
                  <button
                    onClick={() => setChartType('candles')}
                    className={`px-2 py-0.5 rounded ${chartType === 'candles' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Candles
                  </button>
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-2 py-0.5 rounded ${chartType === 'line' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    Line
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showMa}
                      onChange={(e) => setShowMa(e.target.checked)}
                      className="rounded bg-[#0F141C] border-[#1E2638] text-purple-600 focus:ring-0"
                    />
                    <span>MA(10)</span>
                  </label>
                  <label className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRsi}
                      onChange={(e) => setShowRsi(e.target.checked)}
                      className="rounded bg-[#0F141C] border-[#1E2638] text-purple-600 focus:ring-0"
                    />
                    <span>RSI</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Chart Area with Interactive Candlesticks */}
            <div className="flex-1 relative flex flex-col bg-[#0F141C] overflow-hidden">
              <div className="px-4 py-1.5 bg-[#0F141C]/50 border-b border-[#1E2638]/40 flex justify-between items-center text-[11px] text-gray-400">
                <span>O: 2,950.00 | H: 2,985.50 | L: 2,942.00 | C: 2,971.74</span>
                <span className="text-purple-400 font-medium">Vol: 14,85,210</span>
              </div>

              <div className="flex-1 relative flex items-end justify-between px-6 pb-6 pt-10">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-6 py-4 opacity-20">
                  <div className="border-b border-gray-600 w-full"></div>
                  <div className="border-b border-gray-600 w-full"></div>
                  <div className="border-b border-gray-600 w-full"></div>
                  <div className="border-b border-gray-600 w-full"></div>
                </div>

                {[
                  { h: 'h-24', color: 'bg-emerald-500', wick: 'h-36' },
                  { h: 'h-16', color: 'bg-red-500', wick: 'h-24' },
                  { h: 'h-32', color: 'bg-emerald-500', wick: 'h-44' },
                  { h: 'h-20', color: 'bg-emerald-500', wick: 'h-28' },
                  { h: 'h-28', color: 'bg-red-500', wick: 'h-36' },
                  { h: 'h-40', color: 'bg-emerald-500', wick: 'h-52' },
                  { h: 'h-12', color: 'bg-red-500', wick: 'h-20' },
                  { h: 'h-36', color: 'bg-emerald-500', wick: 'h-48' },
                  { h: 'h-24', color: 'bg-emerald-500', wick: 'h-32' },
                  { h: 'h-30', color: 'bg-red-500', wick: 'h-40' },
                  { h: 'h-44', color: 'bg-emerald-500', wick: 'h-56' },
                  { h: 'h-22', color: 'bg-emerald-500', wick: 'h-30' },
                  { h: 'h-38', color: 'bg-red-500', wick: 'h-48' },
                  { h: 'h-28', color: 'bg-emerald-500', wick: 'h-36' },
                  { h: 'h-48', color: 'bg-emerald-500', wick: 'h-60' }
                ].map((candle, idx) => (
                  <div key={idx} className="relative flex flex-col items-center group cursor-pointer z-10">
                    <div className={`w-[2px] ${candle.color} ${candle.wick} absolute rounded-full opacity-80`}></div>
                    <div className={`w-3.5 ${candle.h} ${candle.color} rounded-sm shadow-lg relative z-10 transition-transform transform group-hover:scale-110`}></div>
                  </div>
                ))}

                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-[#131B2A]/90 border border-[#1E2638] px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md z-20">
                  <span className="text-xs text-gray-300 font-medium">{selectedStock} ({selectedTimeframe})</span>
                  <button
                    onClick={() => openModal('BUY')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition"
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => openModal('SELL')}
                    className="bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition"
                  >
                    SELL
                  </button>
                </div>
              </div>
            </div>

            {/* Positions Dock */}
            <div className="h-48 border-t border-[#1E2638] bg-[#131B2A]">
              <PositionsDock positions={positionsList} />
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stockSymbol={selectedStock}
        initialType={modalType}
        onAddPosition={handleAddPosition}
      />
    </div>
  );
}