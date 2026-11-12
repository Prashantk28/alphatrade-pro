import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import socketService from '../websocket';

export default function AdvancedChart({ symbol, ltp, onBuy, onSell }) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const [currentPrice, setCurrentPrice] = useState(ltp || 24893.03);
  const [indicator, setIndicator] = useState('EMA');

  useEffect(() => {
    if (ltp) setCurrentPrice(ltp);
  }, [ltp]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 440,
      layout: { background: { color: '#0f172a' }, textColor: '#cbd5e1' },
      grid: { vertLines: { color: '#1e293b' }, horzLines: { color: '#1e293b' } },
    });

    chartInstanceRef.current = chart;

    let candleSeries;
    const seriesOptions = { upColor: '#22c55e', downColor: '#ef4444', borderVisible: false };

    if (typeof chart.addCandlestickSeries === 'function') {
      candleSeries = chart.addCandlestickSeries(seriesOptions);
    } else {
      candleSeries = chart.addSeries(CandlestickSeries, seriesOptions);
    }

    candleSeriesRef.current = candleSeries;

    const currentBasePrice = ltp || 24700;
    const baseTimestamp = Math.floor(Date.now() / 1000) - (12 * 3600);
    const initialData = [];
    let baseP = currentBasePrice * 0.98;

    for (let i = 0; i < 30; i++) {
      const time = baseTimestamp + (i * 1800);
      const open = baseP;
      const close = open + (Math.random() * (currentBasePrice * 0.01) - (currentBasePrice * 0.005));
      const high = Math.max(open, close) + Math.random() * (currentBasePrice * 0.004);
      const low = Math.min(open, close) - Math.random() * (currentBasePrice * 0.004);
      
      initialData.push({ time, open, high, low, close });
      baseP = close;
    }

    candleSeries.setData(initialData);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [symbol, ltp]);

  return (
    <div className="bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white w-full shadow-lg">
      <div className="flex flex-wrap justify-between items-center mb-3 px-2 gap-2">
        <div className="text-white font-bold text-lg flex items-center gap-3">
          <span>{symbol || 'NIFTY 50'}</span>
          <span className="text-emerald-400 text-sm">₹{currentPrice}</span>
        </div>

        {/* चार्टवरून थेट BUY आणि SELL करण्याची सोय */}
        <div className="flex items-center space-x-2">
          <button onClick={onBuy} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">BUY</button>
          <button onClick={onSell} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer">SELL</button>
        </div>
      </div>

      <div ref={chartContainerRef} className="w-full h-[400px] rounded-lg overflow-hidden flex-1" />
    </div>
  );
}