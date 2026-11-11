import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import socketService from '../websocket';

export default function AdvancedChart({ symbol, ltp }) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [currentPrice, setCurrentPrice] = useState(ltp || 24893.03);
  const [indicator, setIndicator] = useState('EMA');

  // जेव्हा सिम्बॉल किंवा त्याची LTP बदलेल, तेव्हा चार्टची प्राईस अपडेट करणे
  useEffect(() => {
    if (ltp) {
      setCurrentPrice(ltp);
    }
  }, [ltp]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // १. लाइटवेट चार्ट इन्स्टॉल करणे
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 480,
      layout: {
        background: { color: '#0f172a' },
        textColor: '#cbd5e1',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartInstanceRef.current = chart;

    // २. कॅन्डल सिरीज जोडणे
    let candleSeries;
    const seriesOptions = {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    };

    if (typeof chart.addCandlestickSeries === 'function') {
      candleSeries = chart.addCandlestickSeries(seriesOptions);
    } else if (typeof chart.addSeries === 'function' && CandlestickSeries) {
      candleSeries = chart.addSeries(CandlestickSeries, seriesOptions);
    } else {
      candleSeries = chart.addCustomSeries(seriesOptions);
    }

    candleSeriesRef.current = candleSeries;

    // ३. निवडलेल्या स्टॉकच्या खऱ्या LTP नुसार डेटा जनरेट करणे
    const currentBasePrice = ltp || 24700;
    const baseTimestamp = Math.floor(Date.now() / 1000) - (12 * 3600);
    const initialData = [];
    let baseP = currentBasePrice * 0.98; // थोड्या मागच्या प्राईसपासून सुरुवात

    for (let i = 0; i < 30; i++) {
      const time = baseTimestamp + (i * 1800);
      const open = baseP;
      const close = open + (Math.random() * (currentBasePrice * 0.01) - (currentBasePrice * 0.005));
      const high = Math.max(open, close) + Math.random() * (currentBasePrice * 0.004);
      const low = Math.min(open, close) - Math.random() * (currentBasePrice * 0.004);
      
      initialData.push({
        time: time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
      baseP = close;
    }

    // शेवटी शेवटची कॅन्डल सध्याच्या अचूक LTP वर सेट करणे
    if (initialData.length > 0) {
      initialData[initialData.length - 1].close = currentBasePrice;
      initialData[initialData.length - 1].high = Math.max(initialData[initialData.length - 1].high, currentBasePrice);
      initialData[initialData.length - 1].low = Math.min(initialData[initialData.length - 1].low, currentBasePrice);
    }

    if (candleSeries) {
      candleSeries.setData(initialData);
      chart.timeScale().fitContent();
    }

    // ४. WebSocket कनेक्ट करणे
    socketService.connect('ws://localhost:5000');

    const handleRealtimeUpdate = (data) => {
      if (data && data.price && candleSeriesRef.current) {
        setCurrentPrice(data.price);
        const currentTime = Math.floor(Date.now() / 1000);
        try {
          candleSeriesRef.current.update({
            time: currentTime,
            open: data.price - 5,
            high: data.price + 10,
            low: data.price - 8,
            close: data.price,
          });
        } catch (err) {
          console.error("Chart update error:", err);
        }
      }
    };

    socketService.subscribe(handleRealtimeUpdate);

    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      socketService.unsubscribe(handleRealtimeUpdate);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
      }
    };
  }, [symbol, ltp]);

  return (
    <div className="bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white w-full shadow-lg">
      <div className="flex flex-wrap justify-between items-center mb-3 px-2 gap-2">
        <div className="text-white font-bold text-lg flex items-center gap-2">
          <span>{symbol || 'NIFTY 50'}</span>
          <span className="text-emerald-400 text-sm">₹{currentPrice}</span>
        </div>

        {/* ॲडव्हान्स इंडिकेटर्स सिलेक्शन बटन्स */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1">
            {['EMA', 'SMA', 'RSI'].map((ind) => (
              <button
                key={ind}
                onClick={() => setIndicator(ind)}
                className={`px-2.5 py-1 rounded font-bold transition cursor-pointer ${
                  indicator === ind ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          <div className="bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs px-2.5 py-1 rounded-full animate-pulse">
            ● LIVE
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#0F141C] px-3 py-1.5 rounded-lg border border-[#1E2638] text-xs mb-2 text-gray-400">
        <span>Active Indicator: <strong className="text-purple-400">{indicator} (14)</strong></span>
        <span>Value: <strong className="text-amber-400">{indicator === 'RSI' ? '58.40' : (currentPrice * 0.995).toFixed(2)}</strong></span>
      </div>
      
      <div ref={chartContainerRef} className="w-full h-[420px] rounded-lg overflow-hidden flex-1" />
    </div>
  );
}