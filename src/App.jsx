<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> main
import WatchlistPanel from './components/WatchlistPanel';
import AdvancedChart from './components/AdvancedChart';
import OptionChainView from './components/OptionChainView';
import PortfolioView from './components/PortfolioView';
import PnLShareModal from './components/PnLShareModal';
import OrderModal from './components/OrderModal';
<<<<<<< HEAD
import BasketOrderModal from './components/BasketOrderModal';
import AuthScreen from './components/AuthScreen';
import { upstoxWS } from './services/upstoxWebSocket'; // WebSocket Service Import
import { FiLogOut, FiKey } from 'react-icons/fi';

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
  const [accessToken, setAccessToken] = useState(localStorage.getItem('upstox_access_token') || '');

  // Access Token सेव्ह करण्यासाठी फंक्शन
  const handleSaveToken = () => {
    const token = prompt('कृपया तुमचे Upstox Access Token येथे पेस्ट करा:', accessToken);
    if (token) {
      localStorage.setItem('upstox_access_token', token);
      setAccessToken(token);
      alert('✅ Upstox Access Token यशस्वीरित्या सेव्ह झाले! ॲप रिफ्रेश होत आहे...');
      window.location.reload();
    }
  };

  // WebSocket Live Connection Setup
  useEffect(() => {
    const token = localStorage.getItem('upstox_access_token');

    if (token) {
      console.log("Connecting to Upstox WebSocket with Token...");
      const instruments = [
        'NSE_INDEX|Nifty 50',
        'NSE_INDEX|Nifty Bank',
        'NSE_EQ|INE002A01018' // Reliance
      ];

      upstoxWS.connect(token, instruments);

      const unsubscribe = upstoxWS.onMarketUpdate((liveData) => {
        if (liveData && liveData.feeds) {
          const niftyFeed = liveData.feeds['NSE_INDEX|Nifty 50'];
          if (niftyFeed && niftyFeed.ff && niftyFeed.ff.indexFF) {
            setLtp(niftyFeed.ff.indexFF.ltpc.ltp);
          }
        }
      });

      return () => {
        unsubscribe();
        upstoxWS.disconnect();
      };
    } else {
      // जर टोकन नसेल तर सिम्युलेटेड प्राइसेस चालू राहतील
      const interval = setInterval(() => {
        setLtp(prev => parseFloat((prev + (Math.random() - 0.48) * 5).toFixed(2)));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, []);

  const handleOrderSuccess = (newOrder) => {
    setExecutedOrders(prev => [newOrder, ...prev]);
    setActivePositions(prev => [newOrder, ...prev]);
    setAvailableFunds(prev => prev - (newOrder.qty * newOrder.price));
  };

  const handleOptionTradeSuccess = (newOrder) => {
    setExecutedOrders(prev => [newOrder, ...prev]);
    setActivePositions(prev => [newOrder, ...prev]);
    setAvailableFunds(prev => prev - (newOrder.qty * newOrder.price));
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
    setAvailableFunds(prev => prev - price);
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
      <header className="h-12 bg-[#131B2A] border-b border-[#1E2638] px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm bg-purple-600 text-white px-2 py-0.5 rounded">AlphaTrade Pro</span>
          
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            <button onClick={() => setActiveTab('chart')} className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'chart' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>📊 Chart</button>
            <button onClick={() => setActiveTab('optionchain')} className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'optionchain' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>⛓️ Option Chain</button>
            <button onClick={() => setActiveTab('portfolio')} className={`px-3 py-0.5 rounded font-semibold transition ${activeTab === 'portfolio' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>💼 Portfolio</button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Upstox Token Setup Button */}
          <button
            onClick={handleSaveToken}
            className={`px-2.5 py-1 rounded text-xs font-bold border flex items-center space-x-1 transition ${
              accessToken ? 'bg-green-600/20 text-green-400 border-green-500/30' : 'bg-amber-600/20 text-amber-400 border-amber-500/30'
            }`}
          >
            <FiKey size={12} />
            <span>{accessToken ? 'Upstox Connected 🟢' : 'Set Upstox Token 🔑'}</span>
          </button>

          <button onClick={() => setIsBasketModalOpen(true)} className="px-3 py-1 bg-purple-600/25 text-purple-300 border border-purple-500/30 rounded text-xs font-semibold">📦 Basket</button>
          <button onClick={() => setIsOrderModalOpen(true)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">+ Quick Trade</button>
          <button onClick={() => setIsPnLModalOpen(true)} className="px-3 py-1 bg-green-600/25 text-green-400 border border-green-500/30 rounded text-xs font-semibold">Share PnL 📤</button>

          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-8 h-8 bg-purple-600 text-white rounded-full font-bold text-xs flex items-center justify-center ml-2">PK</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden w-full">
        <WatchlistPanel onSelectSymbol={(sym) => { setActiveSymbol(sym); setActiveTab('chart'); }} activeSymbol={activeSymbol} onQuickTrade={handleQuickTradeFromWatchlist} />

        <div className="flex-1 bg-[#0F141C] p-3 overflow-hidden flex flex-col w-full">
          {activeTab === 'chart' && <AdvancedChart key={activeSymbol} symbol={activeSymbol} ltp={ltp} />}
          {activeTab === 'optionchain' && <OptionChainView onOptionTradeSuccess={handleOptionTradeSuccess} />}
          {activeTab === 'portfolio' && (
            <PortfolioView positions={activePositions} holdings={holdings} orders={executedOrders} funds={availableFunds} onAddFunds={() => setAvailableFunds(prev => prev + 50000)} />
=======

export default function App() {
  const [activeTab, setActiveTab] = useState('chart'); // 'chart', 'optionchain', 'portfolio'
  const [activeSymbol, setActiveSymbol] = useState('NIFTY 50');
  const [ltp, setLtp] = useState(24819.29);
  const [isPnLModalOpen, setIsPnLModalOpen] = useState(false);
  
  // Real-time Order & Portfolio State Engine
  const [executedOrders, setExecutedOrders] = useState([]);
  const [activePositions, setActivePositions] = useState([]);
  const [availableFunds, setAvailableFunds] = useState(485240);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

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
    alert(`⚡ Order Executed! ${newOrder.side} ${newOrder.qty} Qty of ${newOrder.symbol}`);
  };

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

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition shadow-lg shadow-blue-600/30"
          >
            + Quick Trade
          </button>
          <button
            onClick={() => setIsPnLModalOpen(true)}
            className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded text-xs font-semibold transition"
          >
            Share PnL 📤
          </button>
        </div>
      </header>

      {/* Main Workspace with Watchlist Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Watchlist Panel (Always Visible) */}
        <WatchlistPanel 
          onSelectSymbol={(sym) => {
            setActiveSymbol(sym);
            setActiveTab('chart');
          }} 
          activeSymbol={activeSymbol} 
        />

        {/* Center Display Area */}
        <div className="flex-1 bg-[#0F141C] p-3 overflow-hidden flex flex-col">
          {activeTab === 'chart' && <AdvancedChart symbol={activeSymbol} ltp={ltp} />}
          {activeTab === 'optionchain' && <OptionChainView />}
          {activeTab === 'portfolio' && (
            <PortfolioView 
              positions={activePositions}
              orders={executedOrders}
              funds={availableFunds}
              onAddFunds={() => setAvailableFunds(prev => prev + 50000)}
            />
>>>>>>> main
          )}
        </div>
      </div>

      {isPnLModalOpen && <PnLShareModal onClose={() => setIsPnLModalOpen(false)} />}
<<<<<<< HEAD
      {isOrderModalOpen && <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} stockName={activeSymbol} ltp={ltp} onPlaceOrderSuccess={handleOrderSuccess} />}
      {isBasketModalOpen && <BasketOrderModal isOpen={isBasketModalOpen} onClose={() => setIsBasketModalOpen(false)} onExecuteBasket={handleExecuteBasket} />}
=======
      {isOrderModalOpen && (
        <OrderModal 
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          stockName={activeSymbol}
          ltp={ltp}
          onPlaceOrderSuccess={handleOrderSuccess}
        />
      )}
>>>>>>> main
    </div>
  );
}