<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { FiMaximize2, FiSettings } from 'react-icons/fi';

const stockBasePrices = {
  'NIFTY 50': 24891.95,
  'BANKNIFTY': 47595.71,
  'RELIANCE': 2971.74,
  'TCS': 3941.39,
  'INFY': 1624.56,
  'HDFCBANK': 1466.10,
  'TATAMOTORS': 988.11
};

export default function AdvancedChart({ symbol, ltp }) {
  const [timeframe, setTimeframe] = useState('15m');
  const [candles, setCandles] = useState([]);
  
  const initialPrice = ltp || stockBasePrices[symbol] || 1500.00;
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const canvasRef = useRef(null);

  useEffect(() => {
    const basePrice = stockBasePrices[symbol] || ltp || 1500.00;
    setCurrentPrice(basePrice);
    
    const initialCandles = [];
    let time = Date.now() - 50 * 15 * 60 * 1000;
    let runningPrice = basePrice * 0.98;

    for (let i = 0; i < 45; i++) {
      const open = runningPrice + (Math.random() - 0.5) * (basePrice * 0.005);
      const close = open + (Math.random() - 0.48) * (basePrice * 0.006);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.003);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.003);
      initialCandles.push({ time, open, high, low, close });
      runningPrice = close;
      time += 15 * 60 * 1000;
    }
    if (initialCandles.length > 0) {
      initialCandles[initialCandles.length - 1].close = basePrice;
    }
    setCandles(initialCandles);
  }, [symbol]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const fluctuationRange = prev * 0.0008;
        const change = (Math.random() - 0.49) * fluctuationRange;
        const newPrice = parseFloat((prev + change).toFixed(2));
        
        setCandles(prevCandles => {
          if (prevCandles.length === 0) return prevCandles;
          const last = { ...prevCandles[prevCandles.length - 1] };
          last.close = newPrice;
          last.high = Math.max(last.high, newPrice);
          last.low = Math.min(last.low, newPrice);
          return [...prevCandles.slice(0, prevCandles.length - 1), last];
        });

        return newPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [symbol]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    if (candles.length === 0) return;

    ctx.fillStyle = '#0F141C';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1E2638';
    ctx.lineWidth = 1;

    const prices = candles.flatMap(c => [c.high, c.low]);
    const minPrice = Math.min(...prices) * 0.995;
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice || 1;

    const gridSteps = 6;
    for (let i = 0; i <= gridSteps; i++) {
      const y = (height / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width - 70, y);
      ctx.stroke();

      const priceVal = maxPrice - (priceRange / gridSteps) * i;
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px monospace';
      ctx.fillText(priceVal.toFixed(2), width - 65, y + 4);
    }

    const candleWidth = Math.max(4, (width - 90) / candles.length - 4);
    
    candles.forEach((c, idx) => {
      const x = 20 + idx * (candleWidth + 4);
      const isGreen = c.close >= c.open;
      const color = isGreen ? '#10B981' : '#EF4444';

      const yHigh = height - ((c.high - minPrice) / priceRange) * height;
      const yLow = height - ((c.low - minPrice) / priceRange) * height;
      const yOpen = height - ((c.open - minPrice) / priceRange) * height;
      const yClose = height - ((c.close - minPrice) / priceRange) * height;

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, yHigh);
      ctx.lineTo(x + candleWidth / 2, yLow);
      ctx.stroke();

      ctx.fillStyle = color;
      const bodyY = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));
      ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
    });

    const currentY = height - ((currentPrice - minPrice) / priceRange) * height;
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(width - 70, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(width - 70, currentY - 10, 70, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(currentPrice.toFixed(2), width - 65, currentY + 4);

  }, [candles, currentPrice]);

  return (
    <div className="flex-1 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white select-none w-full">
      <div className="flex justify-between items-center pb-3 border-b border-[#1E2638]">
        <div className="flex items-center space-x-3">
          <h2 className="text-base font-bold text-white">{symbol}</h2>
          <span className="text-sm font-semibold text-green-400">₹{currentPrice.toLocaleString('en-IN')}</span>
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold animate-pulse">● LIVE TBT</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            {['1m', '5m', '15m', '1H', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded font-bold transition ${timeframe === tf ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button className="p-1.5 bg-[#0F141C] border border-[#1E2638] rounded-lg text-gray-300 hover:text-white">
            <FiSettings size={14} />
          </button>
          <button className="p-1.5 bg-[#0F141C] border border-[#1E2638] rounded-lg text-gray-300 hover:text-white">
            <FiMaximize2 size={14} />
=======
import React, { useState } from 'react';
import { FiTrendingUp, FiBarChart2, FiSliders } from 'react-icons/fi';

export default function AdvancedChart({ symbol = 'NIFTY 50', ltp = 24804.90 }) {
  const [timeframe, setTimeframe] = useState('5m');
  const [showRSI, setShowRSI] = useState(true);
  const [showMACD, setShowMACD] = useState(true);

  // Simulated Candlestick Data
  const candles = [
    { time: '09:15', open: 24750, high: 24780, low: 24740, close: 24775, type: 'up' },
    { time: '09:30', open: 24775, high: 24810, low: 24760, close: 24790, type: 'up' },
    { time: '09:45', open: 24790, high: 24795, low: 24755, close: 24765, type: 'down' },
    { time: '10:00', open: 24765, high: 24820, low: 24760, close: 24815, type: 'up' },
    { time: '10:15', open: 24815, high: 24830, low: 24790, close: 24805, type: 'down' },
    { time: '10:30', open: 24805, high: 24850, low: 24800, close: 24840, type: 'up' },
  ];

  return (
    <div className="bg-[#131B2A] border border-[#1E2638] rounded-xl flex flex-col h-full overflow-hidden text-white select-none">
      {/* Chart Control Toolbar */}
      <div className="p-3 border-b border-[#1E2638] flex justify-between items-center bg-[#0F141C]/60 flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-sm text-purple-400 flex items-center space-x-1">
            <FiBarChart2 className="inline mr-1" /> {symbol} Advanced Chart
          </span>
          <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
            ₹{ltp.toFixed(2)}
          </span>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center space-x-1 bg-[#131B2A] p-1 rounded-lg border border-[#1E2638] text-xs">
          {['1m', '5m', '15m', '1H', '1D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded transition ${
                timeframe === tf ? 'bg-purple-600 font-bold text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicator Toggles */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setShowRSI(!showRSI)}
            className={`px-2.5 py-1 rounded border transition flex items-center space-x-1 ${
              showRSI 
                ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-semibold' 
                : 'bg-[#0F141C] border-[#1E2638] text-gray-400'
            }`}
          >
            <FiSliders size={12} />
            <span>RSI (14)</span>
          </button>

          <button
            onClick={() => setShowMACD(!showMACD)}
            className={`px-2.5 py-1 rounded border transition flex items-center space-x-1 ${
              showMACD 
                ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold' 
                : 'bg-[#0F141C] border-[#1E2638] text-gray-400'
            }`}
          >
            <FiTrendingUp size={12} />
            <span>MACD</span>
>>>>>>> main
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex-1 bg-[#0F141C] rounded-xl mt-3 border border-[#1E2638] relative overflow-hidden flex flex-col">
        <canvas 
          ref={canvasRef} 
          width={1200} 
          height={500} 
          className="w-full h-full object-fill cursor-crosshair"
        />

        <div className="absolute bottom-2 left-3 right-20 flex justify-between items-center bg-[#131B2A]/90 px-3 py-1.5 rounded-lg border border-[#1E2638] text-[11px] backdrop-blur">
          <span className="text-gray-400">Symbol: <strong className="text-white">{symbol}</strong></span>
          <span className="text-gray-400">LTP: <strong className="text-green-400">₹{currentPrice}</strong></span>
          <span className="text-gray-400">RSI (14): <strong className="text-purple-400">58.40</strong></span>
          <span className="text-gray-400">Volume: <strong className="text-blue-400">1.42M</strong></span>
        </div>
=======
      {/* Main Candlestick Visualizer */}
      <div className="flex-1 p-4 flex flex-col justify-between relative bg-gradient-to-b from-[#131B2A] to-[#0F141C]">
        {/* Simulated Candlestick Grid */}
        <div className="flex-1 border-b border-[#1E2638]/50 flex items-end justify-around pb-4 px-6 relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
            <div className="border-b border-dashed border-white"></div>
            <div className="border-b border-dashed border-white"></div>
            <div className="border-b border-dashed border-white"></div>
          </div>

          {candles.map((c, i) => (
            <div key={i} className="flex flex-col items-center group relative cursor-pointer">
              <div className="absolute -top-10 hidden group-hover:flex bg-[#0F141C] border border-[#1E2638] px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap z-20">
                O:{c.open} H:{c.high} L:{c.low} C:{c.close}
              </div>

              <div 
                className={`w-[2px] ${c.type === 'up' ? 'bg-green-400' : 'bg-red-400'}`}
                style={{ height: '90px' }}
              ></div>

              <div
                className={`w-4 rounded-sm absolute bottom-4 ${
                  c.type === 'up' ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-red-500 shadow-lg shadow-red-500/20'
                }`}
                style={{ height: `${Math.abs(c.close - c.open) * 1.5 + 20}px` }}
              ></div>

              <span className="text-[10px] text-gray-500 mt-2 font-mono">{c.time}</span>
            </div>
          ))}
        </div>

        {/* RSI Sub-Chart */}
        {showRSI && (
          <div className="h-20 border-b border-[#1E2638]/50 p-2 flex flex-col justify-between bg-[#0F141C]/40 mt-2 rounded-lg">
            <div className="flex justify-between items-center text-[10px] text-purple-400 font-mono font-bold">
              <span>RSI (14): 64.20</span>
              <span className="text-gray-500">Overbought: 70 | Oversold: 30</span>
            </div>
            <div className="h-8 flex items-center">
              <svg className="w-full h-full stroke-purple-400 fill-none" viewBox="0 0 100 20">
                <path d="M 0 15 Q 20 5, 40 12 T 80 4 T 100 8" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}

        {/* MACD Sub-Chart */}
        {showMACD && (
          <div className="h-20 p-2 flex flex-col justify-between bg-[#0F141C]/40 mt-2 rounded-lg">
            <div className="flex justify-between items-center text-[10px] text-blue-400 font-mono font-bold">
              <span>MACD (12, 26, 9): +14.80 (Bullish Crossover)</span>
            </div>
            <div className="h-8 flex items-end justify-around space-x-1">
              {[4, 8, 12, 16, 10, 6, -4, -8, 8, 14].map((v, idx) => (
                <div
                  key={idx}
                  className={`w-2 rounded-t ${v >= 0 ? 'bg-green-400/80' : 'bg-red-400/80'}`}
                  style={{ height: `${Math.abs(v) * 2}px` }}
                ></div>
              ))}
            </div>
          </div>
        )}
>>>>>>> main
      </div>
    </div>
  );
}