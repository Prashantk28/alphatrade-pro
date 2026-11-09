import React, { useState } from 'react';
import AuthView from './components/AuthView';
import WatchlistPanel from './components/WatchlistPanel';
import AdvancedChart from './components/AdvancedChart';
import OptionChainView from './components/OptionChainView';
import PortfolioView from './components/PortfolioView';
import PnLShareModal from './components/PnLShareModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('chart'); // 'chart', 'optionchain', 'portfolio', 'basket'
  const [activeSymbol, setActiveSymbol] = useState('NIFTY 50');
  const [ltp, setLtp] = useState(24816.67);
  const [isPnLModalOpen, setIsPnLModalOpen] = useState(false);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setLtp(prev => parseFloat((prev + (Math.random() - 0.48) * 5).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AuthView onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen w-screen bg-[#0F141C] text-white flex flex-col overflow-hidden select-none">
      {/* Header Bar */}
      <header className="h-12 bg-[#131B2A] border-b border-[#1E2638] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm bg-purple-600 text-white px-2 py-0.5 rounded">AlphaTrade</span>
          
          {/* Main Navigation Tabs */}
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'chart' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              📊 Chart
            </button>
            <button
              onClick={() => setActiveTab('optionchain')}
              className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'optionchain' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              ⛓️ Option Chain
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'portfolio' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              💼 Portfolio & Funds
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPnLModalOpen(true)}
            className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded text-xs font-semibold transition"
          >
            Share PnL 📤
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded text-xs font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Watchlist Panel with Filters */}
        <WatchlistPanel 
          onSelectSymbol={(sym) => {
            setActiveSymbol(sym);
            setActiveTab('chart');
          }} 
          activeSymbol={activeSymbol} 
        />

        {/* Dynamic Center Display */}
        <div className="flex-1 bg-[#0F141C] p-3 overflow-hidden flex flex-col">
          {activeTab === 'chart' && <AdvancedChart symbol={activeSymbol} ltp={ltp} />}
          {activeTab === 'optionchain' && <OptionChainView />}
          {activeTab === 'portfolio' && <PortfolioView />}
        </div>
      </div>

      {isPnLModalOpen && <PnLShareModal onClose={() => setIsPnLModalOpen(false)} />}
    </div>
  );
}