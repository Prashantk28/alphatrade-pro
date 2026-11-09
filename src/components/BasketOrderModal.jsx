import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';

export default function BasketOrderModal({ isOpen, onClose, onExecuteBasket }) {
  const [basketName, setBasketName] = useState('My Mega Basket');
  const [items, setItems] = useState([
    { symbol: 'NIFTY 24800 CE', qty: 75, side: 'BUY', price: 120.50 },
    { symbol: 'RELIANCE', qty: 25, side: 'BUY', price: 2740.50 }
  ]);
  
  const [newSymbol, setNewSymbol] = useState('TCS');
  const [newQty, setNewQty] = useState(10);
  const [newSide, setNewSide] = useState('BUY');

  if (!isOpen) return null;

  const addItem = () => {
    setItems([...items, { symbol: newSymbol, qty: parseInt(newQty), side: newSide, price: 1500.00 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleExecute = () => {
    onExecuteBasket(items);
    alert(`🚀 Basket "${basketName}" Executed Successfully! All orders placed.`);
    onClose();
  };

  const totalMargin = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none font-mono">
      <div className="bg-[#131B2A] border border-[#1E2638] w-full max-w-xl rounded-2xl p-6 shadow-2xl relative text-white">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#0F141C] border border-[#1E2638]"
        >
          <FiX size={18} />
        </button>

        <div className="flex items-center space-x-2 mb-4">
          <FiShoppingBag className="text-purple-400" size={20} />
          <h3 className="text-base font-bold text-white">Basket Order Execution (Multi-Leg)</h3>
        </div>

        <div className="mb-4">
          <label className="text-[10px] text-gray-400 block mb-1">BASKET NAME</label>
          <input 
            type="text" 
            value={basketName} 
            onChange={(e) => setBasketName(e.target.value)}
            className="w-full bg-[#0F141C] border border-[#1E2638] rounded-xl px-3 py-2 text-xs text-white font-bold"
          />
        </div>

        {/* Add item row */}
        <div className="grid grid-cols-4 gap-2 mb-4 bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] items-end">
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">SYMBOL</label>
            <select 
              value={newSymbol} 
              onChange={(e) => setNewSymbol(e.target.value)}
              className="w-full bg-[#131B2A] border border-[#1E2638] rounded px-2 py-1 text-xs text-white"
            >
              <option value="NIFTY 50">NIFTY 50</option>
              <option value="BANKNIFTY">BANKNIFTY</option>
              <option value="RELIANCE">RELIANCE</option>
              <option value="TCS">TCS</option>
              <option value="GOLD">GOLD</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">QTY</label>
            <input 
              type="number" 
              value={newQty} 
              onChange={(e) => setNewQty(e.target.value)}
              className="w-full bg-[#131B2A] border border-[#1E2638] rounded px-2 py-1 text-xs text-white text-right"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 block mb-1">SIDE</label>
            <select 
              value={newSide} 
              onChange={(e) => setNewSide(e.target.value)}
              className="w-full bg-[#131B2A] border border-[#1E2638] rounded px-2 py-1 text-xs text-white"
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>
          <button 
            onClick={addItem}
            className="bg-purple-600 hover:bg-purple-500 text-white rounded py-1 text-xs font-bold flex items-center justify-center space-x-1"
          >
            <FiPlus size={14} />
            <span>Add</span>
          </button>
        </div>

        {/* Items List */}
        <div className="max-h-48 overflow-y-auto space-y-2 mb-4 border border-[#1E2638] rounded-xl p-2 bg-[#0F141C]/50">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-[#0F141C] p-2.5 rounded-lg border border-[#1E2638]">
              <div className="flex items-center space-x-3">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.side === 'BUY' ? 'bg-blue-600/20 text-blue-400' : 'bg-red-600/20 text-red-400'}`}>
                  {item.side}
                </span>
                <span className="font-bold text-xs text-white">{item.symbol}</span>
                <span className="text-gray-400 text-xs">{item.qty} Qty</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-green-400">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                <button onClick={() => removeItem(idx)} className="text-gray-500 hover:text-red-400">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-[#1E2638] mb-4 text-xs">
          <span className="text-gray-400">Total Required Margin:</span>
          <span className="font-extrabold text-green-400 text-sm">₹{totalMargin.toLocaleString('en-IN')}</span>
        </div>

        <button
          onClick={handleExecute}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-purple-600/30"
        >
          Execute Entire Basket ({items.length} Orders) 🚀
        </button>
      </div>
    </div>
  );
}