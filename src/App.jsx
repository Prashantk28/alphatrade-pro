import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderBar from './components/HeaderBar';
import WatchlistPanel from './components/WatchlistPanel';
import PositionsDock from './components/PositionsDock';
import OrderModal from './components/OrderModal';
import TradingViewChart from './components/TradingViewChart';
import ExploreDiscover from './components/ExploreDiscover';

export default function App() {
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [activeTab, setActiveTab] = useState('explore'); // 'chart' किवा 'explore'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('BUY');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

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
      {/* Sidebar with active tab handler */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderBar />

        <div className="flex flex-1 overflow-hidden">
          {/* Watchlist Panel */}
          <div className="w-80 border-r border-[#1E2638] bg-[#131B2A]">
            <WatchlistPanel onSelectStock={setSelectedStock} selectedStock={selectedStock} />
          </div>

          {/* Main Content Area: Tab switching between Chart and Explore */}
          <div className="flex flex-col flex-1 bg-[#0F141C] overflow-hidden">
            {activeTab === 'explore' ? (
              <ExploreDiscover onOpenModal={openModal} />
            ) : (
              <div className="flex-1 flex flex-col relative overflow-hidden">
                <TradingViewChart stockSymbol={selectedStock} timeframe={selectedTimeframe} />

                {/* Quick Buy/Sell Floating Buttons */}
                <div className="absolute top-3 right-20 flex items-center space-x-2 z-30">
                  <button
                    onClick={() => openModal('BUY')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg transition"
                  >
                    BUY {selectedStock}
                  </button>
                  <button
                    onClick={() => openModal('SELL')}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold shadow-lg transition"
                  >
                    SELL {selectedStock}
                  </button>
                </div>
              </div>
            )}

            {/* Positions Dock */}
            <div className="h-48 border-t border-[#1E2638] bg-[#131B2A]">
              <PositionsDock positions={positionsList} />
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
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