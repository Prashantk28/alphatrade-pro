import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import { FiTrendingUp, FiSettings, FiMaximize2, FiCamera } from 'react-icons/fi';

const SAMPLE_CANDLES = [
  { time: 1732515600, open: 24380, high: 24420, low: 24360, close: 24400 },
  { time: 1732517400, open: 24400, high: 24410, low: 24350, close: 24365 },
  { time: 1732519200, open: 24365, high: 24440, low: 24360, close: 24430 },
  { time: 1732521000, open: 24430, high: 24450, low: 24400, close: 24410 },
  { time: 1732522800, open: 24410, high: 24425, low: 24390, close: 24420 },
  { time: 1732524600, open: 24420, high: 24435, low: 24405, close: 24415 },
  { time: 1732526400, open: 24415, high: 24460, low: 24410, close: 24450 },
  { time: 1732528200, open: 24450, high: 24470, low: 24430, close: 24440 },
  { time: 1732530000, open: 24440, high: 24480, low: 24435, close: 24475 },
  { time: 1732531800, open: 24475, high: 24490, low: 24450, close: 24460 },
  { time: 1732533600, open: 24460, high: 24520, low: 24455, close: 24510 },
];

export default function TradingViewChart({
  stockSymbol = 'NIFTY',
  timeframe = '15m',
  candles = SAMPLE_CANDLES,
}) {
  const chartContainerRef = useRef(null);
  const seriesRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState('1D');
  const [hoverBar, setHoverBar] = useState(
    SAMPLE_CANDLES[SAMPLE_CANDLES.length - 1]
  );

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight || 400,
      layout: {
        background: { color: '#121722' },
        textColor: '#9ca3af',
      },
      grid: {
        vertLines: { color: '#1E2638' },
        horzLines: { color: '#1E2638' },
      },
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: '#1E2638',
      },
      timeScale: {
        borderColor: '#1E2638',
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        locale: 'en-IN',
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    const validCandles = (candles && candles.length > 0 ? candles : SAMPLE_CANDLES)
      .slice()
      .sort((a, b) => a.time - b.time);

    candlestickSeries.setData(validCandles);
    chart.timeScale().fitContent();
    seriesRef.current = candlestickSeries;
    setHoverBar(validCandles[validCandles.length - 1]);

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time || !param.seriesData) {
        setHoverBar(validCandles[validCandles.length - 1]);
        return;
      }
      const data = param.seriesData.get(candlestickSeries);
      if (data && data.open !== undefined) {
        setHoverBar(data);
      }
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          chart.applyOptions({ width, height });
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles, stockSymbol, timeframe]);

  const diff = hoverBar ? (hoverBar.close - hoverBar.open).toFixed(2) : '0.00';
  const pct =
    hoverBar && hoverBar.open
      ? (((hoverBar.close - hoverBar.open) / hoverBar.open) * 100).toFixed(2)
      : '0.00';
  const isPositive = Number(diff) >= 0;

  return (
    <div className="flex-1 flex flex-col bg-[#121722] text-gray-300 font-sans select-none overflow-hidden relative border-r border-[#1E2638]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0F141C] border-b border-[#1E2638] text-xs">
        <div className="flex items-center space-x-3 flex-wrap">
          <span className="font-bold text-gray-100">
            {stockSymbol} · {timeframe} · NSE
          </span>
          {hoverBar && (
            <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
              O {hoverBar.open.toFixed(2)} H {hoverBar.high.toFixed(2)} L{' '}
              {hoverBar.low.toFixed(2)} C {hoverBar.close.toFixed(2)}{' '}
              {isPositive ? '+' : ''}
              {diff} ({isPositive ? '+' : ''}
              {pct}%)
            </span>
          )}
          <span className="text-gray-400 text-[11px]">Volume SMA</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-400">
          <button
            type="button"
            className="hover:text-white flex items-center space-x-1 bg-[#1A2234] px-2 py-0.5 rounded border border-[#2A344A]"
          >
            <FiTrendingUp size={13} className="text-purple-400" />
            <span>Indicators</span>
          </button>
          <button type="button" className="hover:text-white">
            <FiSettings size={14} />
          </button>
          <button type="button" className="hover:text-white">
            <FiCamera size={14} />
          </button>
          <button type="button" className="hover:text-white">
            <FiMaximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Drawing Toolbar */}
        <div className="w-10 bg-[#0F141C] border-r border-[#1E2638] flex flex-col items-center py-3 space-y-4 text-gray-400 text-xs z-10">
          <span className="hover:text-white cursor-pointer">✏️</span>
          <span className="hover:text-white cursor-pointer">📈</span>
          <span className="hover:text-white cursor-pointer">📐</span>
          <span className="hover:text-white cursor-pointer">🖌️</span>
          <span className="hover:text-white cursor-pointer">📝</span>
          <span className="hover:text-white cursor-pointer">📏</span>
          <span className="hover:text-white cursor-pointer">🔍</span>
          <div className="w-6 h-[1px] bg-[#1E2638] my-1"></div>
          <span className="hover:text-white cursor-pointer text-red-400">🗑️</span>
        </div>

        {/* Lightweight Chart Container */}
        <div ref={chartContainerRef} className="flex-1 w-full h-full min-h-[380px]" />
      </div>

      {/* Bottom Chart Footer */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0F141C] border-t border-[#1E2638] text-[11px] text-gray-400">
        <div className="flex space-x-2">
          {['5Y', '1Y', '6M', '3M', '1M', '5D', '1D'].map((tf) => (
            <button
              type="button"
              key={tf}
              onClick={() => setSelectedRange(tf)}
              className={`px-1.5 py-0.5 rounded ${
                selectedRange === tf
                  ? 'bg-[#1E2638] text-white font-semibold'
                  : 'hover:text-white hover:bg-[#1E2638]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>IST (UTC+5:30)</span>
          <span className="text-gray-400">% log auto</span>
        </div>
      </div>
    </div>
  );
}