import React, { useEffect, useRef } from 'react';

export default function TradingViewChart({
  stockSymbol = 'EXIDEIND',
  exchange = 'NSE',
  timeframe = '15m',
  ltp = null,
  change = null,
  changePercent = null,
  onBuy,
  onSell,
}) {
  const widgetContainerRef = useRef(null);

  const cleanSymbol = (stockSymbol || 'EXIDEIND')
    .replace(/\s+(NSE|BSE).*$/i, '')
    .trim();
  const tvInterval = String(timeframe || '15').replace(/[^0-9A-Za-z]/g, '') || '15';

  useEffect(() => {
    const container = widgetContainerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    const tvSymbol = cleanSymbol.includes(':') ? cleanSymbol : `${exchange}:${cleanSymbol}`;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: tvInterval,
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [cleanSymbol, exchange, tvInterval]);

  return (
    <div className="flex-1 flex flex-col bg-[#0b0e14] text-gray-200 overflow-hidden h-full">
      {/* Top Stock Info & BUY / SELL Bar (Unchanged layout) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#111622] border-b border-[#1e2638] shrink-0">
        <div className="flex items-center space-x-3 text-xs sm:text-sm flex-wrap gap-y-1">
          <span className="font-bold text-white tracking-wide">{cleanSymbol}</span>
          <span className="text-gray-400 text-xs">{exchange}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300 text-xs">{timeframe}</span>
          {ltp !== null && ltp !== undefined && (
            <>
              <span className="text-gray-500">•</span>
              <span className="text-amber-400 font-semibold font-mono">
                LTP: ₹{Number(ltp).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </>
          )}
          {change !== null && change !== undefined && (
            <span
              className={`text-xs font-mono ${
                Number(change) >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {Number(change) >= 0 ? '+' : ''}
              {Number(change).toFixed(2)}
              {changePercent !== null && changePercent !== undefined
                ? ` (${Number(changePercent) >= 0 ? '+' : ''}${Number(changePercent).toFixed(2)}%)`
                : ''}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onBuy && onBuy(cleanSymbol)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded transition cursor-pointer"
          >
            BUY {ltp ? `₹${Number(ltp).toFixed(2)}` : ''}
          </button>
          <button
            type="button"
            onClick={() => onSell && onSell(cleanSymbol)}
            className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded transition cursor-pointer"
          >
            SELL {ltp ? `₹${Number(ltp).toFixed(2)}` : ''}
          </button>
        </div>
      </div>

      {/* TradingView Chart Area Only */}
      <div className="flex-1 relative bg-[#0b0e14] overflow-hidden min-h-[450px]">
        <div
          ref={widgetContainerRef}
          className="tradingview-widget-container w-full h-full"
        />
      </div>
    </div>
  );
}