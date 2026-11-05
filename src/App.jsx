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

            {/* Main Chart Area */}
            <div className="flex-1 relative flex flex-col items-center justify-center p-4 bg-[#0F141C]">
              <div className="absolute inset-4 border border-dashed border-[#1E2638]/60 rounded-lg flex flex-col items-center justify-center text-center p-6">
                <FiBarChart2 className="text-purple-500 mb-2 animate-bounce" size={36} />
                <h3 className="text-sm font-semibold text-gray-300">
                  Advanced TradingView Chart for {selectedStock} ({selectedTimeframe})
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">
                  Displaying live market candles, volume indicators, and moving average trends for <span className="text-purple-400">{selectedStock}</span>.
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <button
                    onClick={() => openModal('BUY')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-xs font-semibold shadow"
                  >
                    BUY {selectedStock}
                  </button>
                  <button
                    onClick={() => openModal('SELL')}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded text-xs font-semibold shadow"
                  >
                    SELL {selectedStock}
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