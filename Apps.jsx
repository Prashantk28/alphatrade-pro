import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartType, setChartType] = useState('candlestick');
  const [showIndicators, setShowIndicators] = useState({ ma10: true, ma20: true, rsi: true });
  const [orderType, setOrderType] = useState('BUY');
  const [productType, setProductType] = useState('INTRADAY');
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState('');
  const [isLimit, setIsLimit] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Authentication & Wallet State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [funds, setFunds] = useState(50000);
  const [addFundsAmount, setAddFundsAmount] = useState('');

  // Watchlist & Market Simulator State
  const [stocks, setStocks] = useState([
    { id: '1', symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 22450.75, change: 120.45, pChange: 0.54, history: [] },
    { id: '2', symbol: 'BANKNIFTY', name: 'Bank Nifty Index', price: 47820.30, change: -180.20, pChange: -0.38, history: [] },
    { id: '3', symbol: 'RELIANCE', name: 'Reliance Industries', price: 2980.50, change: 24.30, pChange: 0.82, history: [] },
    { id: '4', symbol: 'TCS', name: 'Tata Consultancy Services', price: 3950.10, change: -12.40, pChange: -0.31, history: [] },
    { id: '5', symbol: 'INFY', name: 'Infosys Ltd', price: 1620.80, change: 18.90, pChange: 1.18, history: [] },
    { id: '6', symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1450.25, change: -5.60, pChange: -0.38, history: [] },
    { id: '7', symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 985.60, change: 32.10, pChange: 3.37, history: [] },
  ]);

  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([
    { symbol: 'RELIANCE', qty: 10, avgPrice: 2850.00, ltp: 2980.50 },
    { symbol: 'INFY', qty: 25, avgPrice: 1550.00, ltp: 1620.80 }
  ]);

  const canvasRef = useRef(null);

  // Set default selected stock
  useEffect(() => {
    if (!selectedStock && stocks.length > 0) {
      setSelectedStock(stocks[2]); // RELIANCE
    }
  }, [stocks]);

  // Real-time Stock Price Engine Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const delta = (Math.random() - 0.49) * (stock.price * 0.002);
          const newPrice = Math.max(1, +(stock.price + delta).toFixed(2));
          const change = +(newPrice - (stock.price - stock.change)).toFixed(2);
          const pChange = +((change / (stock.price - stock.change)) * 100).toFixed(2);
          const newHistory = [...(stock.history || []), newPrice].slice(-50);

          return { ...stock, price: newPrice, change, pChange, history: newHistory };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update LTP in positions and selected stock
  useEffect(() => {
    if (selectedStock) {
      const updated = stocks.find(s => s.symbol === selectedStock.symbol);
      if (updated) setSelectedStock(updated);
    }

    setPositions(prev =>
      prev.map(pos => {
        const live = stocks.find(s => s.symbol === pos.symbol);
        const ltp = live ? live.price : pos.ltp;
        const pnl = pos.type === 'BUY'
          ? (ltp - pos.avgPrice) * pos.qty
          : (pos.avgPrice - ltp) * pos.qty;
        return { ...pos, ltp, pnl: +pnl.toFixed(2) };
      })
    );
  }, [stocks]);

  // Render TradingView Style Chart Engine
  useEffect(() => {
    if (!canvasRef.current || !selectedStock) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background Grid
    ctx.strokeStyle = '#1E232D';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 60) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    const prices = selectedStock.history && selectedStock.history.length > 5
      ? selectedStock.history
      : Array.from({ length: 40 }, (_, i) => selectedStock.price + Math.sin(i) * 15);

    const minPrice = Math.min(...prices) * 0.998;
    const maxPrice = Math.max(...prices) * 1.002;
    const getY = p => height - 60 - ((p - minPrice) / (maxPrice - minPrice)) * (height - 100);

    // Draw Line or Candlesticks
    if (chartType === 'line') {
      ctx.beginPath();
      ctx.strokeStyle = '#00D09C';
      ctx.lineWidth = 2;
      prices.forEach((p, i) => {
        const x = (i / (prices.length - 1)) * (width - 60);
        const y = getY(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    } else {
      const barWidth = (width - 80) / prices.length;
      prices.forEach((p, i) => {
        const x = i * barWidth + 20;
        const open = i === 0 ? p : prices[i - 1];
        const close = p;
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;

        const isGreen = close >= open;
        ctx.strokeStyle = isGreen ? '#00D09C' : '#FF4D4D';
        ctx.fillStyle = isGreen ? '#00D09C' : '#FF4D4D';

        // Wick
        ctx.beginPath();
        ctx.moveTo(x + barWidth / 2, getY(high));
        ctx.lineTo(x + barWidth / 2, getY(low));
        ctx.stroke();

        // Body
        const yOpen = getY(open);
        const yClose = getY(close);
        ctx.fillRect(x + 2, Math.min(yOpen, yClose), barWidth - 4, Math.max(2, Math.abs(yClose - yOpen)));
      });
    }

    // Moving Averages
    if (showIndicators.ma10 && prices.length > 10) {
      ctx.beginPath(); ctx.strokeStyle = '#FFB800'; ctx.lineWidth = 1.5;
      for (let i = 9; i < prices.length; i++) {
        const slice = prices.slice(i - 9, i + 1);
        const ma = slice.reduce((a, b) => a + b, 0) / 10;
        const x = (i / (prices.length - 1)) * (width - 60);
        if (i === 9) ctx.moveTo(x, getY(ma));
        else ctx.lineTo(x, getY(ma));
      }
      ctx.stroke();
    }
  }, [selectedStock, chartType, showIndicators]);

  // Handle Order Placement
  const handlePlaceOrder = () => {
    if (!selectedStock) return;
    const execPrice = isLimit && limitPrice ? parseFloat(limitPrice) : selectedStock.price;
    const totalCost = (execPrice * quantity) / (productType === 'INTRADAY' ? 5 : 1);

    if (totalCost > funds && orderType === 'BUY') {
      alert('Insufficient Balance/Margin for this order!');
      return;
    }

    if (orderType === 'BUY') setFunds(prev => prev - totalCost);

    const newOrder = {
      id: Date.now().toString(),
      symbol: selectedStock.symbol,
      type: orderType,
      product: productType,
      qty: quantity,
      price: execPrice,
      status: 'COMPLETE',
      time: new Date().toLocaleTimeString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Position creation/update
    const existingPos = positions.find(p => p.symbol === selectedStock.symbol && p.product === productType);
    if (existingPos) {
      setPositions(prev => prev.map(p => p.id === existingPos.id ? { ...p, qty: p.qty + quantity } : p));
    } else {
      setPositions(prev => [...prev, {
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        product: productType,
        type: orderType,
        qty: quantity,
        avgPrice: execPrice,
        ltp: selectedStock.price,
        pnl: 0
      }]);
    }

    setIsOrderModalOpen(false);
  };

  const handleAddFunds = () => {
    const val = parseFloat(addFundsAmount);
    if (val > 0) {
      setFunds(prev => prev + val);
      setAddFundsAmount('');
      alert(`₹${val} Added Successfully to your Trading Wallet!`);
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0E14] text-gray-200 font-sans overflow-hidden select-none">
      {/* Sidebar / Left Watchlist Panel */}
      <div className="w-80 border-r border-[#1E232D] flex flex-col bg-[#0F131C]">
        {/* Brand Header */}
        <div className="p-4 border-b border-[#1E232D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-extrabold text-black text-lg">α</div>
            <span className="text-lg font-bold tracking-wider text-white">AlphaTrade<span className="text-emerald-400">PRO</span></span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">LIVE</span>
        </div>

        {/* Watchlist Header */}
        <div className="px-4 py-3 border-b border-[#1E232D] text-xs font-semibold text-gray-400 tracking-wider">
          MARKET WATCHLIST
        </div>

        {/* Watchlist List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#181C24]">
          {stocks.map(stock => (
            <div
              key={stock.id}
              onClick={() => setSelectedStock(stock)}
              className={`p-3.5 flex justify-between items-center cursor-pointer transition-all hover:bg-[#181E2A] ${selectedStock?.symbol === stock.symbol ? 'bg-[#151C28] border-l-4 border-emerald-400' : ''}`}
            >
              <div>
                <div className="font-bold text-sm text-gray-100">{stock.symbol}</div>
                <div className="text-xs text-gray-500">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-semibold text-sm">₹{stock.price.toFixed(2)}</div>
                <div className={`text-xs font-medium ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.pChange}%)
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wallet Balance Widget */}
        <div className="p-4 border-t border-[#1E232D] bg-[#0B0E14]">
          <div className="text-xs text-gray-400">Available Funds / Margin</div>
          <div className="text-xl font-bold font-mono text-emerald-400">₹{funds.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Main Trading Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Action Header */}
        {selectedStock && (
          <div className="h-16 border-b border-[#1E232D] bg-[#0F131C] px-6 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{selectedStock.symbol}</span>
                  <span className="text-xs text-gray-400 font-normal">{selectedStock.name}</span>
                </h1>
                <div className="flex items-center space-x-3 text-sm font-mono mt-0.5">
                  <span className="font-bold">₹{selectedStock.price.toFixed(2)}</span>
                  <span className={selectedStock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.pChange}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Buy & Sell Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => { setOrderType('BUY'); setIsOrderModalOpen(true); }}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-md shadow-lg shadow-emerald-950/50 transition-all"
              >
                BUY
              </button>
              <button
                onClick={() => { setOrderType('SELL'); setIsOrderModalOpen(true); }}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md shadow-lg shadow-red-950/50 transition-all"
              >
                SELL
              </button>
            </div>
          </div>
        )}

        {/* Chart View Window */}
        <div className="h-[52%] border-b border-[#1E232D] bg-[#0B0E14] relative p-4 flex flex-col">
          {/* Chart Controls */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('candlestick')}
                className={`px-3 py-1 text-xs rounded font-semibold ${chartType === 'candlestick' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#181C24] text-gray-400'}`}
              >
                Candlestick
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 text-xs rounded font-semibold ${chartType === 'line' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#181C24] text-gray-400'}`}
              >
                Line Chart
              </button>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showIndicators.ma10}
                  onChange={e => setShowIndicators({ ...showIndicators, ma10: e.target.checked })}
                  className="rounded bg-gray-800 border-gray-700 text-emerald-500 focus:ring-0"
                />
                <span className="text-amber-400 font-semibold">MA (10)</span>
              </label>
            </div>
          </div>

          <canvas ref={canvasRef} width={900} height={320} className="w-full h-full rounded" />
        </div>

        {/* Bottom Tabbed Portfolio Window */}
        <div className="flex-1 bg-[#0F131C] flex flex-col">
          {/* Navigation Tabs */}
          <div className="flex border-b border-[#1E232D] px-4">
            {['positions', 'orders', 'holdings', 'funds'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === tab ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              >
                {tab} {tab === 'positions' && positions.length > 0 && `(${positions.length})`}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'positions' && (
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#151A24] text-gray-400 uppercase">
                  <tr>
                    <th className="p-2.5">Symbol</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Avg. Price</th>
                    <th className="p-2.5">LTP</th>
                    <th className="p-2.5 text-right">P&L (Live)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A202C]">
                  {positions.length === 0 ? (
                    <tr><td colSpan="6" className="p-6 text-center text-gray-500">No Open Positions</td></tr>
                  ) : (
                    positions.map(p => (
                      <tr key={p.id}>
                        <td className="p-2.5 font-bold text-white">{p.symbol}</td>
                        <td className="p-2.5"><span className={`px-1.5 py-0.5 rounded text-[10px] ${p.type === 'BUY' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>{p.product}</span></td>
                        <td className="p-2.5">{p.qty}</td>
                        <td className="p-2.5 font-mono">₹{p.avgPrice.toFixed(2)}</td>
                        <td className="p-2.5 font-mono">₹{p.ltp.toFixed(2)}</td>
                        <td className={`p-2.5 text-right font-bold font-mono ${p.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          ₹{p.pnl.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'orders' && (
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#151A24] text-gray-400 uppercase">
                  <tr>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Symbol</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Price</th>
                    <th className="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A202C]">
                  {orders.length === 0 ? (
                    <tr><td colSpan="6" className="p-6 text-center text-gray-500">No Executed Orders</td></tr>
                  ) : (
                    orders.map(o => (
                      <tr key={o.id}>
                        <td className="p-2.5 text-gray-500">{o.time}</td>
                        <td className="p-2.5 font-bold text-white">{o.symbol}</td>
                        <td className="p-2.5">{o.type}</td>
                        <td className="p-2.5">{o.qty}</td>
                        <td className="p-2.5 font-mono">₹{o.price.toFixed(2)}</td>
                        <td className="p-2.5 text-right text-emerald-400 font-semibold">{o.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'holdings' && (
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#151A24] text-gray-400 uppercase">
                  <tr>
                    <th className="p-2.5">Stock</th>
                    <th className="p-2.5">Qty</th>
                    <th className="p-2.5">Avg Price</th>
                    <th className="p-2.5">LTP</th>
                    <th className="p-2.5 text-right">Total P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A202C]">
                  {holdings.map((h, i) => {
                    const pnl = (h.ltp - h.avgPrice) * h.qty;
                    return (
                      <tr key={i}>
                        <td className="p-2.5 font-bold text-white">{h.symbol}</td>
                        <td className="p-2.5">{h.qty}</td>
                        <td className="p-2.5 font-mono">₹{h.avgPrice.toFixed(2)}</td>
                        <td className="p-2.5 font-mono">₹{h.ltp.toFixed(2)}</td>
                        <td className={`p-2.5 text-right font-bold font-mono ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          ₹{pnl.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === 'funds' && (
              <div className="max-w-md bg-[#151A24] p-5 rounded-lg border border-[#262D3D]">
                <h3 className="text-sm font-bold text-white mb-3">Add Funds (Simulation)</h3>
                <div className="flex space-x-3 mb-3">
                  <input
                    type="number"
                    placeholder="Enter Amount (₹)"
                    value={addFundsAmount}
                    onChange={e => setAddFundsAmount(e.target.value)}
                    className="flex-1 bg-[#0B0E14] border border-[#2A3245] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleAddFunds}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs rounded transition-all"
                  >
                    ADD MONEY
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Placement Modal */}
      {isOrderModalOpen && selectedStock && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#121722] border border-[#232B3E] rounded-xl w-96 p-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-base font-bold ${orderType === 'BUY' ? 'text-emerald-400' : 'text-red-400'}`}>
                {orderType} {selectedStock.symbol}
              </h2>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-gray-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Product Type</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setProductType('INTRADAY')}
                    className={`flex-1 py-1.5 rounded font-bold ${productType === 'INTRADAY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#181E2B] text-gray-400'}`}
                  >
                    Intraday (5x)
                  </button>
                  <button
                    onClick={() => setProductType('DELIVERY')}
                    className={`flex-1 py-1.5 rounded font-bold ${productType === 'DELIVERY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-[#181E2B] text-gray-400'}`}
                  >
                    Longterm (CNC)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#0B0E14] border border-[#232B3E] rounded p-2 text-white font-mono"
                />
              </div>

              <div className="p-3 bg-[#0B0E14] rounded border border-[#1E2536] flex justify-between items-center">
                <span className="text-gray-400">Margin Required:</span>
                <span className="text-emerald-400 font-bold font-mono">
                  ₹{((selectedStock.price * quantity) / (productType === 'INTRADAY' ? 5 : 1)).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 font-bold rounded text-sm transition-all ${orderType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-600 text-black' : 'bg-red-500 hover:bg-red-600 text-white'}`}
              >
                PLACE {orderType} ORDER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}