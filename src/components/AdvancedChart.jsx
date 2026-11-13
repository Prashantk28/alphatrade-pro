import React, { useEffect, useRef } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function AdvancedChart({ symbol = 'EXIDEIND', ltp = 381.45, onBuy, onSell }) {
  const containerRef = useRef(null);

  // TradingView Widget इंजिन लोड करणे
  useEffect(() => {
    // जर आधीच स्क्रिप्ट असेल तर साफ करणे
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    // सिम्बॉल मॅपिंग (भारतीय स्टॉक एक्सचेंजसाठी NSE/BSE किंवा जागतिक इंडेक्स मॅपिंग)
    let tvSymbol = 'NSE:' + symbol.replace(/\s+/g, '');
    if (symbol === 'NIFTY 50') tvSymbol = 'NSE:NIFTY';
    if (symbol === 'BANKNIFTY') tvSymbol = 'NSE:BANKNIFTY';
    if (symbol === 'SENSEX') tvSymbol = 'BSE:SENSEX';

    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "symbol": tvSymbol,
      "interval": "D",
      "timezone": "Asia/Kolkata",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="w-full h-full flex flex-col bg-[#12141c] rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-sans">
      
      {/* चार्ट वरील टॉप बार आणि बाय/सेल बटन्स */}
      <div className="bg-[#0b0e14] px-4 py-3 border-b border-gray-800 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-white uppercase tracking-wide">📊 {symbol} (TradingView Advanced)</span>
          <span className="text-xs font-mono text-amber-400 font-bold">LTP: ₹{ltp ? ltp.toFixed(2) : '0.00'}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={onBuy} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1"
          >
            <FiTrendingUp/> BUY
          </button>
          <button 
            onClick={onSell} 
            className="bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1"
          >
            <FiTrendingDown/> SELL
          </button>
        </div>
      </div>

      {/* TradingView Widget Container */}
      <div className="flex-1 w-full h-full relative" ref={containerRef}>
        {/* TradingView widget इथे रेंडर होईल */}
      </div>

    </div>
  );
}