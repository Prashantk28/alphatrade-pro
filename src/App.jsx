import React, { useState } from 'react';
import Sidebar from './Sidebar';
import HeaderBar from './components/HeaderBar';
import WatchlistPanel from './components/WatchlistPanel';
import PositionsDock from './components/PositionsDock';
import OrderModal from './components/OrderModal';
import TradingViewChart from './components/TradingViewChart';
import ExploreDiscover from './components/ExploreDiscover';
import OptionChainView from './components/OptionChainView';
import FuturesView from './components/FuturesView';
import CommoditiesView from './components/CommoditiesView';
import PortfolioView from './components/PortfolioView';
import FundsView from './components/FundsView';
import AuthView from './components/AuthView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [activeTab, setActiveTab] = useState('explore');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('BUY');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

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

  // युझर लॉगइन नसेल तर लॉगिन पेज दाखवणे
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-screen bg-[#0F141C] flex items-center justify-center">
        <AuthView onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0F141C] text-gray-200 overflow-hidden font-sans select-none">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderBar onLogout={() => setIsLoggedIn(false)} />

        <div className="flex flex-1 overflow-hidden">
          <div className="w-80 border-r border-[#1E2638] bg-[#131B2A]">
            <WatchlistPanel onSelectStock={setSelectedStock} selectedStock={selectedStock} />
          </div>

          <div className="flex flex-col flex-1 bg-[#0F141C] overflow-hidden">
            {activeTab === 'explore' ? (
              <ExploreDiscover onOpenModal={openModal} />
            ) : activeTab === 'optionchain' ? (
              <OptionChainView onOpenModal={openModal} />
            ) : activeTab === 'futures' ? (
              <FuturesView onOpenModal={openModal} />
            ) : activeTab === 'commodities' ? (
              <CommoditiesView onOpenModal={openModal} />
            ) : activeTab === 'portfolio' ? (
              <PortfolioView />
            ) : activeTab === 'funds' ? (
              <FundsView />
            ) : activeTab === 'chart' ? (
              <div className="flex-1 flex flex-col relative overflow-hidden">
                <TradingViewChart stockSymbol={selectedStock} timeframe={selectedTimeframe} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col relative overflow-hidden">
                <TradingViewChart stockSymbol={selectedStock} timeframe={selectedTimeframe} />
              </div>
            )}

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