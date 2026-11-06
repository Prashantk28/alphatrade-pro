import React, { useState } from 'react';
import WatchlistPanel from './components/WatchlistPanel';
import AdvancedChart from './components/AdvancedChart';
import OptionChainView from './components/OptionChainView';
import PortfolioView from './components/PortfolioView';
import PnLShareModal from './components/PnLShareModal';
import OrderModal from './components/OrderModal';

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
    </div>
  );
}