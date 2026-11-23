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
          </button>
        </div>
      </div>

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
      </div>
    </div>
  );
}