import React, { useState } from 'react';
import WatchlistPanel from './components/WatchlistPanel';
import AdvancedChart from './components/AdvancedChart';
import OptionChainView from './components/OptionChainView';
import PortfolioView from './components/PortfolioView';
import PnLShareModal from './components/PnLShareModal';
import OrderModal from './components/OrderModal';
import BasketOrderModal from './components/BasketOrderModal';
import AuthScreen from './components/AuthScreen';
import { FiLogOut } from 'react-icons/fi';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Prashant Kamble', email: 'pkamble.kvic@hokvic.gov.in' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [activeTab, setActiveTab] = useState('chart');
  const [activeSymbol, setActiveSymbol] = useState('NIFTY 50');
  const [ltp, setLtp] = useState(24891.95);
  const [isPnLModalOpen, setIsPnLModalOpen] = useState(false);
  
  const [executedOrders, setExecutedOrders] = useState([]);
  const [activePositions, setActivePositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [availableFunds, setAvailableFunds] = useState(485240);
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLtp(prev => parseFloat((prev + (Math.random() - 0.48) * 5).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleOrderSuccess = (newOrder) => {
    setExecutedOrders(prev => [newOrder, ...prev]);
    setActivePositions(prev => [newOrder, ...prev]);
    const cost = newOrder.qty * newOrder.price;
    setAvailableFunds(prev => prev - cost);
  };

  const handleOptionTradeSuccess = (newOrder) => {
    setExecutedOrders(prev => [newOrder, ...prev]);
    setActivePositions(prev => [newOrder, ...prev]);
    const cost = newOrder.qty * newOrder.price;
    setAvailableFunds(prev => prev - cost);
    setActiveTab('portfolio');
  };

  const handleQuickTradeFromWatchlist = (symbol, price, side, category) => {
    const newOrder = {
      symbol,
      qty: 1,
      price,
      side,
      type: category,
      time: new Date().toLocaleTimeString()
    };

    setExecutedOrders(prev => [newOrder, ...prev]);
    if (category === 'EQUITY') {
      setHoldings(prev => [newOrder, ...prev]);
    } else {
      setActivePositions(prev => [newOrder, ...prev]);
    }
    setAvailableFunds(prev => prev - (newOrder.qty * price));
    setActiveTab('portfolio');
  };

  const handleExecuteBasket = (items) => {
    const newOrders = items.map(item => ({
      symbol: item.symbol,
      qty: item.qty,
      price: item.price,
      side: item.side,
      type: 'BASKET',
      time: new Date().toLocaleTimeString()
    }));
    setExecutedOrders(prev => [...newOrders, ...prev]);
    setActivePositions(prev => [...newOrders, ...prev]);
    setActiveTab('portfolio');
  };

  if (!isLoggedIn) {
    return <AuthScreen onLoginSuccess={(userData) => { setUserProfile(userData); setIsLoggedIn(true); }} />;
  }

  return (
    <div className="h-screen w-screen bg-[#0F141C] text-white flex flex-col overflow-hidden select-none">
      {/* Header Bar */}
      <header className="h-12 bg-[#131B2A] border-b border-[#1E2638] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm bg-purple-600 text-white px-2 py-0.5 rounded">AlphaTrade</span>
          
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'chart' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              📊 Advanced Chart
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

        <div className="flex items-center space-x-2 relative">
          <button
            onClick={() => setIsBasketModalOpen(true)}
            className="px-3 py-1 bg-purple-600/25 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 rounded text-xs font-semibold transition"
          >
            📦 Basket Order
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition shadow-lg shadow-blue-600/30"
          >
            + Quick Trade
          </button>
          <button
            onClick={() => setIsPnLModalOpen(true)}
            className="px-3 py-1 bg-green-600/25 hover:bg-green-600/40 text-green-400 border border-green-500/30 rounded text-xs font-semibold transition"
          >
            Share PnL 📤
          </button>

          {/* User Profile Button & Dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 bg-purple-600 text-white rounded-full font-bold text-xs flex items-center justify-center border border-purple-400 shadow cursor-pointer"
            >
              PK
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#131B2A] border border-[#1E2638] rounded-xl p-3 shadow-2xl z-50 text-xs">
                <div className="pb-2.5 mb-2 border-b border-[#1E2638]">
                  <p className="font-bold text-white">{userProfile.name}</p>
                  <p className="text-gray-400 text-[10px] truncate">{userProfile.email}</p>
                </div>

                <div className="space-y-1 mb-2">
                  <button 
                    onClick={() => { alert('👤 Opening My Account Details...'); setShowProfileMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#0F141C] text-gray-300 hover:text-white font-medium flex items-center justify-between transition"
                  >
                    <span>My Account</span>
                    <span className="text-[10px] text-purple-400">KYC Done</span>
                  </button>

                  <button 
                    onClick={() => { alert('🚀 F&O Segment Activation Requested'); setShowProfileMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#0F141C] text-gray-300 hover:text-white font-medium flex items-center justify-between transition"
                  >
                    <span>Activate F&O</span>
                    <span className="text-[10px] bg-green-500/25 text-green-400 px-1.5 py-0.5 rounded font-bold">Active</span>
                  </button>

                  <button 
                    onClick={() => { alert('📈 MCX Commodity Profile Settings Opened'); setShowProfileMenu(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-[#0F141C] text-gray-300 hover:text-white font-medium flex items-center justify-between transition"
                  >
                    <span>MCX Profile</span>
                    <span className="text-[10px] bg-blue-500/25 text-blue-400 px-1.5 py-0.5 rounded font-bold">Config</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-[#1E2638]">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full py-1.5 bg-red-600/25 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-lg font-semibold flex items-center justify-center space-x-1 transition"
                  >
                    <FiLogOut size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden w-full">
        <WatchlistPanel 
          onSelectSymbol={(sym) => {
            setActiveSymbol(sym);
            setActiveTab('chart');
          }} 
          activeSymbol={activeSymbol}
          onQuickTrade={handleQuickTradeFromWatchlist}
        />

        <div className="flex-1 bg-[#0F141C] p-3 overflow-hidden flex flex-col w-full">
          {activeTab === 'chart' && <AdvancedChart key={activeSymbol} symbol={activeSymbol} ltp={ltp} />}
          {activeTab === 'optionchain' && <OptionChainView onOptionTradeSuccess={handleOptionTradeSuccess} />}
          {activeTab === 'portfolio' && (
            <PortfolioView 
              positions={activePositions}
              holdings={holdings}
              orders={executedOrders}
              funds={availableFunds}
              onAddFunds={() => setAvailableFunds(prev => prev + 50000)}
            />
          )}
        </div>
      </div>

      {isPnLModalOpen && <PnLShareModal onClose={() => setIsPnLModalOpen(false)} />}
      {isOrderModalOpen && (
        <OrderModal 
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          stockName={activeSymbol}
          ltp={ltp}
          onPlaceOrderSuccess={handleOrderSuccess}
        />
      )}
      {isBasketModalOpen && (
        <BasketOrderModal 
          isOpen={isBasketModalOpen}
          onClose={() => setIsBasketModalOpen(false)}
          onExecuteBasket={handleExecuteBasket}
        />
      )}
    </div>
  );
}