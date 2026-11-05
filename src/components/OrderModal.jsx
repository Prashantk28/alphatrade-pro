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

  // १. ही positions लिस्टची स्टेट येथे ॲड करा
  const [positionsList, setPositionsList] = useState([
    { symbol: 'RELIANCE', qty: 15, avgPrice: 2955.00, ltp: 2971.74, pnl: 251.10, chg: '+0.53%', isBuy: true }
  ]);

  // २. नवीन ऑर्डर ॲड करणारे फंक्शन येथे ठेवा
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
            <div className="flex-1 relative flex flex-col items-center justify-center p-4 bg-[#0F141C]">
              <div className="absolute inset-4 border border-dashed border-[#1E2638]/60 rounded-lg flex flex-col items-center justify-center text-center p-6">
                <FiBarChart2 className="text-purple-500 mb-2 animate-bounce" size={36} />
                <h3 className="text-sm font-semibold text-gray-300">Advanced TradingView Chart for {selectedStock}</h3>
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

            {/* ۳. PositionsDock ला positionsList डेटा प्रॉप म्हणून पास करा */}
            <div className="h-44 border-t border-[#1E2638] bg-[#131B2A]">
              <PositionsDock positions={positionsList} />
            </div>
          </div>
        </div>
      </div>

      {/* ४. OrderModal मध्ये handleAddPosition पास करा जेणेकरून ऑर्डर सबमिट झाल्यावर इथे येईल */}
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