import React, { useState } from 'react';
import AuthView from './components/AuthView';
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import WatchlistPanel from './components/WatchlistPanel';
import OptionChainView from './components/OptionChainView';
import FuturesView from './components/FuturesView';
import CommoditiesView from './components/CommoditiesView';
import ProfileView from './components/ProfileView';
import PortfolioView from './components/PortfolioView';
import FundsView from './components/FundsView';
import BuySellModal from './components/BuySellModal';
import CustomizationModal from './components/CustomizationModal';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Option Chain');
  const [selectedStock, setSelectedStock] = useState('NIFTY');
  
  // Modals state
  const [isBuySellOpen, setIsBuySellOpen] = useState(false);
  const [orderType, setOrderType] = useState('BUY');
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const { isDarkMode } = useTheme();

  // 1. Login Handler
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 2. Logout Handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 3. Open Order Modal
  const handleOpenOrderModal = (type = 'BUY') => {
    setOrderType(type);
    setIsBuySellOpen(true);
  };

  // If user is not logged in, render full AuthView screen
  if (!isLoggedIn) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden ${
      isDarkMode ? 'bg-[#0F141C] text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Top Navigation Header */}
      <HeaderBar 
        onLogout={handleLogout} 
        onOpenCustomization={() => setIsCustomizationOpen(true)}
      />

      {/* Main App Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dynamic Main Workspace View */}
        {activeTab === 'Profile' ? (
          <ProfileView onLogout={handleLogout} />
        ) : activeTab === 'Portfolio' ? (
          <PortfolioView />
        ) : activeTab === 'Funds' ? (
          <FundsView />
        ) : (
          <>
            {/* Watchlist Panel (Visible for trading tabs) */}
            <div className="w-80 h-full border-r border-[#1E2638]">
              <WatchlistPanel 
                selectedStock={selectedStock} 
                onSelectStock={setSelectedStock} 
              />
            </div>

            {/* Main Trading Dashboard View */}
            <div className="flex-1 h-full overflow-hidden flex flex-col">
              {activeTab === 'Option Chain' && (
                <OptionChainView onOpenModal={handleOpenOrderModal} />
              )}
              {activeTab === 'Futures' && (
                <FuturesView onOpenModal={handleOpenOrderModal} />
              )}
              {activeTab === 'Commodities' && (
                <CommoditiesView onOpenModal={handleOpenOrderModal} />
              )}
            </div>
          </>
        )}
      </div>

      {/* Global Action Modals */}
      {isBuySellOpen && (
        <BuySellModal 
          type={orderType} 
          onClose={() => setIsBuySellOpen(false)} 
        />
      )}

      {isCustomizationOpen && (
        <CustomizationModal 
          onClose={() => setIsCustomizationOpen(false)} 
        />
      )}
    </div>
  );
}