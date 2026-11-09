<<<<<<< HEAD
import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
=======
import React, { useState, useEffect } from 'react';
import { FiLayers, FiBarChart2, FiInfo } from 'react-icons/fi';
>>>>>>> main

const segmentsData = {
  'NIFTY 50': { ltp: 24891.95, change: '+158.65 (+0.71%)', isUp: true, expiry: '13-Nov-2026', lotSize: 25, spot: 24890 },
  'SENSEX': { ltp: 81450.20, change: '+420.10 (+0.52%)', isUp: true, expiry: '14-Nov-2026', lotSize: 10, spot: 81440 },
  'BANKNIFTY': { ltp: 47595.71, change: '-404.79 (-0.84%)', isUp: false, expiry: '12-Nov-2026', lotSize: 15, spot: 47600 },
  'FINNIFTY': { ltp: 23210.40, change: '+85.30 (+0.37%)', isUp: true, expiry: '18-Nov-2026', lotSize: 25, spot: 23200 },
  'MIDCPNIFTY': { ltp: 12450.80, change: '+45.20 (+0.36%)', isUp: true, expiry: '17-Nov-2026', lotSize: 50, spot: 12450 },
  'CRUDEOIL': { ltp: 6150.00, change: '-65.00 (-1.05%)', isUp: false, expiry: '19-Nov-2026', lotSize: 100, spot: 6150 },
  'NATURALGAS': { ltp: 245.50, change: '+4.20 (+1.74%)', isUp: true, expiry: '26-Nov-2026', lotSize: 1250, spot: 245 },
  'GOLD': { ltp: 78500.00, change: '+350.00 (+0.45%)', isUp: true, expiry: '05-Dec-2026', lotSize: 10, spot: 78500 },
  'SILVER': { ltp: 92400.00, change: '+1200.00 (+1.32%)', isUp: true, expiry: '05-Dec-2026', lotSize: 30, spot: 92400 }
};

export default function OptionChainView({ onOptionTradeSuccess }) {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY 50');
  const [orderPanel, setOrderPanel] = useState(null);
  const [orderCategory, setOrderCategory] = useState('Regular');
  const [productType, setProductType] = useState('Intraday');
  const [quantity, setQuantity] = useState(25);
  const [orderType, setOrderType] = useState('Market');
  const [limitPrice, setLimitPrice] = useState('');
  const [triggerPrice, setTriggerPrice] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

<<<<<<< HEAD
  const currentData = segmentsData[selectedSymbol];

  const strikesCount = 11;
  const step = selectedSymbol === 'SENSEX' ? 200 : selectedSymbol === 'BANKNIFTY' ? 100 : selectedSymbol === 'GOLD' ? 500 : selectedSymbol === 'SILVER' ? 1000 : 50;
  
  const strikes = [];
  const baseSpot = currentData.spot;
  for (let i = -Math.floor(strikesCount / 2); i <= Math.floor(strikesCount / 2); i++) {
    strikes.push(baseSpot + i * step);
  }

  const handleOpenOrder = (side, type, strike, price) => {
    setOrderPanel({
      side,
      type,
      strike,
      price: parseFloat(price),
      symbol: `${selectedSymbol} ${strike} ${type}`
    });
    setQuantity(currentData.lotSize);
    setLimitPrice(price);
    setTriggerPrice((parseFloat(price) * 0.95).toFixed(2));
    setOrderCategory('Regular');
    setSuccessMsg(false);
  };

  const handlePlaceOrder = () => {
    if (!orderPanel) return;
    const finalPrice = orderType === 'Limit' ? parseFloat(limitPrice) || orderPanel.price : orderPanel.price;

    if (onOptionTradeSuccess) {
      onOptionTradeSuccess({
        symbol: `${orderPanel.symbol} ${orderCategory === 'GTT' ? '[GTT]' : ''}`,
        qty: quantity,
        price: finalPrice,
        triggerPrice: orderCategory === 'GTT' ? triggerPrice : null,
        side: orderPanel.side,
        type: orderCategory === 'GTT' ? 'GTT OPTION' : 'OPTION',
        time: new Date().toLocaleTimeString()
      });
    }

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setOrderPanel(null);
    }, 1200);
  };
=======
  const [optionData, setOptionData] = useState([
    { volumeCall: '15.55 Cr', ivCall: '19.63', deltaCall: '0.7282', oiCall: '-26,50,2', callOiLakhs: '34.48', callLtp: 322.00, strike: 24550, pcr: '3.48', putLtp: 54.41, putOiLakhs: '27.22', oiPut: '+27,22,135', deltaPut: '-0.2601', ivPut: '18.52', volumePut: '16.00 Cr' },
    { volumeCall: '32.91 Cr', ivCall: '19.11', deltaCall: '0.6939', oiCall: '-21,95,375', callOiLakhs: '40.65', callLtp: 302.00, strike: 24600, pcr: '2.82', putLtp: 78.30, putOiLakhs: '114.75', oiPut: '+95,02,870', deltaPut: '-0.2972', ivPut: '18.18', volumePut: '27.31 Cr' },
    { volumeCall: '28.07 Cr', ivCall: '18.99', deltaCall: '0.6530', oiCall: '+3,82,590', callOiLakhs: '29.62', callLtp: 265.80, strike: 24650, pcr: '2.96', putLtp: 92.10, putOiLakhs: '87.8', oiPut: '+82,43,300', deltaPut: '-0.3386', ivPut: '17.89', volumePut: '14.96 Cr' },
    { volumeCall: '37.93 Cr', ivCall: '18.72', deltaCall: '0.6104', oiCall: '-3,61,595', callOiLakhs: '58.51', callLtp: 233.45, strike: 24700, pcr: '1.48', putLtp: 109.65, putOiLakhs: '86.78', oiPut: '+80,53,825', deltaPut: '-0.3841', ivPut: '17.76', volumePut: '15.46 Cr' },
    { volumeCall: '21.36 Cr', ivCall: '18.56', deltaCall: '0.5650', oiCall: '+11,19,105', callOiLakhs: '36.35', callLtp: 202.70, strike: 24750, pcr: '1.56', putLtp: 128.35, putOiLakhs: '56.74', oiPut: '+53,45,600', deltaPut: '-0.4318', ivPut: '17.59', volumePut: '5.66 Cr' },
    { volumeCall: '32.97 Cr', ivCall: '18.43', deltaCall: '0.5179', oiCall: '+32,17,175', callOiLakhs: '109.53', callLtp: 175.00, strike: 24800, pcr: '0.80', putLtp: 150.70, putOiLakhs: '88.13', oiPut: '+85,05,315', deltaPut: '-0.4815', ivPut: '17.47', volumePut: '7.07 Cr' },
    { volumeCall: '16.41 Cr', ivCall: '18.35', deltaCall: '0.4701', oiCall: '+44,97,935', callOiLakhs: '67.28', callLtp: 149.50, strike: 24850, pcr: '0.33', putLtp: 175.30, putOiLakhs: '22.09', oiPut: '+21,35,640', deltaPut: '-0.5319', ivPut: '17.39', volumePut: '1.87 Cr' },
    { volumeCall: '18.99 Cr', ivCall: '18.33', deltaCall: '0.4227', oiCall: '+32,46,100', callOiLakhs: '69.68', callLtp: 127.45, strike: 24900, pcr: '0.25', putLtp: 202.80, putOiLakhs: '17.66', oiPut: '+16,68,290', deltaPut: '-0.5817', ivPut: '17.40', volumePut: '1.40 Cr' },
    { volumeCall: '10.90 Cr', ivCall: '18.29', deltaCall: '0.3763', oiCall: '+26,48,295', callOiLakhs: '41.16', callLtp: 107.50, strike: 24950, pcr: '0.07', putLtp: 234.45, putOiLakhs: '2.86', oiPut: '+2,50,510', deltaPut: '-0.6305', ivPut: '17.35', volumePut: '28.06 L' },
    { volumeCall: '32.46 Cr', ivCall: '18.41', deltaCall: '0.3329', oiCall: '+35,75,585', callOiLakhs: '155.35', callLtp: 91.15, strike: 25000, pcr: '0.10', putLtp: 266.80, putOiLakhs: '15.62', oiPut: '+7,86,890', deltaPut: '-0.6766', ivPut: '17.39', volumePut: '1.28 Cr' },
    { volumeCall: '8.70 Cr', ivCall: '18.49', deltaCall: '0.2917', oiCall: '+17,75,735', callOiLakhs: '33.44', callLtp: 76.05, strike: 25050, pcr: '0.04', putLtp: 303.60, putOiLakhs: '1.46', oiPut: '+1,32,600', deltaPut: '-0.7188', ivPut: '17.53', volumePut: '8.80 L' },
    { volumeCall: '12.21 Cr', ivCall: '18.58', deltaCall: '0.2537', oiCall: '+19,61,830', callOiLakhs: '58.64', callLtp: 63.35, strike: 25100, pcr: '0.02', putLtp: 339.70, putOiLakhs: '1.46', oiPut: '+1,10,565', deltaPut: '-0.7582', ivPut: '17.63', volumePut: '8.93 L' },
  ]);

  // Real-time Tick Simulator for Option Chain LTP Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOptionData(prev =>
        prev.map(row => {
          const callDelta = (Math.random() - 0.48) * 1.5;
          const putDelta = (Math.random() - 0.52) * 1.5;
          return {
            ...row,
            callLtp: Math.max(0.5, parseFloat((row.callLtp + callDelta).toFixed(2))),
            putLtp: Math.max(0.5, parseFloat((row.putLtp + putDelta).toFixed(2)))
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);
>>>>>>> main

  return (
    <div className="flex-1 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col h-full font-mono text-white select-none overflow-hidden relative">
      <div className="flex flex-wrap justify-between items-center pb-3 border-b border-[#1E2638] gap-3">
        <div className="flex items-center space-x-3">
<<<<<<< HEAD
          <h2 className="text-base font-bold text-white">Option Chain</h2>
          <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638] text-xs space-x-1 overflow-x-auto max-w-full">
            {Object.keys(segmentsData).map((sym) => (
              <button
                key={sym}
                onClick={() => setSelectedSymbol(sym)}
                className={`px-2.5 py-1 rounded font-bold transition whitespace-nowrap ${
                  selectedSymbol === sym ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
=======
          <span className="text-xs font-bold text-white flex items-center space-x-1.5">
            <FiLayers className="text-purple-400" />
            <span>Option Chain for NIFTY</span>
          </span>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-semibold">
            Spot: 24,804.90
          </span>
>>>>>>> main
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-[#0F141C] px-3 py-1 rounded-lg border border-[#1E2638]">
            <span className="text-gray-400">LTP: </span>
            <strong className={currentData.isUp ? 'text-green-400' : 'text-red-400'}>
              ₹{currentData.ltp.toLocaleString('en-IN')} ({currentData.change})
            </strong>
          </div>
          <div className="bg-[#0F141C] px-3 py-1 rounded-lg border border-[#1E2638]">
            <span className="text-gray-400">Expiry: </span>
            <strong className="text-purple-400">{currentData.expiry}</strong>
          </div>
          <div className="bg-[#0F141C] px-3 py-1 rounded-lg border border-[#1E2638]">
            <span className="text-gray-400">Lot Size: </span>
            <strong className="text-blue-400">{currentData.lotSize}</strong>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex-1 flex mt-3 overflow-hidden gap-3">
        <div className="flex-1 overflow-y-auto rounded-xl border border-[#1E2638] bg-[#0F141C]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638] text-center">
                <th colSpan="4" className="py-2 border-r border-[#1E2638] text-blue-400 font-bold">CALLS (CE)</th>
                <th className="py-2 text-gray-300 font-bold bg-[#1A2234]">STRIKE</th>
                <th colSpan="4" className="py-2 border-l border-[#1E2638] text-purple-400 font-bold">PUTS (PE)</th>
              </tr>
              <tr className="bg-[#131B2A]/70 text-gray-400 border-b border-[#1E2638] text-[10px]">
                <th className="p-2 text-right">OI</th>
                <th className="p-2 text-right">CHG</th>
                <th className="p-2 text-right">IV</th>
                <th className="p-2 text-right border-r border-[#1E2638]">LTP (Click B/S)</th>
                <th className="p-2 text-center bg-[#1A2234] text-white font-bold">PRICE</th>
                <th className="p-2 text-left border-l border-[#1E2638]">LTP (Click B/S)</th>
                <th className="p-2 text-left">IV</th>
                <th className="p-2 text-left">CHG</th>
                <th className="p-2 text-left">OI</th>
              </tr>
            </thead>
            <tbody>
              {strikes.map((strike, idx) => {
                const isATM = strike === baseSpot;
                const callLtp = Math.max(2.5, (baseSpot > strike ? (baseSpot - strike) + 55 : 55 - (strike - baseSpot) * 0.5)).toFixed(2);
                const putLtp = Math.max(2.5, (strike > baseSpot ? (strike - baseSpot) + 50 : 50 - (baseSpot - strike) * 0.5)).toFixed(2);
                
                return (
                  <tr 
                    key={strike} 
                    className={`border-b border-[#1E2638]/40 hover:bg-[#131B2A]/60 transition ${
                      isATM ? 'bg-purple-900/20 font-bold' : ''
                    }`}
                  >
                    <td className="p-2 text-right text-gray-400">{(125400 + idx * 12500).toLocaleString()}</td>
                    <td className="p-2 text-right text-green-400">+{(12.4 + idx).toFixed(1)}%</td>
                    <td className="p-2 text-right text-gray-400">{(14.2 + idx * 0.2).toFixed(1)}</td>
                    <td className="p-2 text-right font-bold border-r border-[#1E2638]">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button 
                          onClick={() => handleOpenOrder('BUY', 'CE', strike, callLtp)}
                          className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
=======
      {/* Option Chain Table Header Indicators */}
      <div className="bg-[#0F141C] px-4 py-1 flex justify-between text-[11px] font-bold border-b border-[#1E2638]">
        <span className="text-purple-400">« Calls</span>
        <span className="text-purple-400">Puts »</span>
      </div>

      {/* Detailed Upstox Option Chain Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638] sticky top-0 z-10">
              <th className="p-2 text-left">Volume</th>
              <th className="p-2 text-right">IV</th>
              <th className="p-2 text-right">Delta</th>
              <th className="p-2 text-right">OI (chg)</th>
              <th className="p-2 text-right">OI (lakhs)</th>
              <th className="p-2 text-right text-white">LTP</th>
              <th className="p-2 text-center bg-[#1E2638] text-white font-bold px-4">Strike</th>
              <th className="p-2 text-left text-white">LTP</th>
              <th className="p-2 text-left">OI (lakhs)</th>
              <th className="p-2 text-left">OI (chg)</th>
              <th className="p-2 text-left">Delta</th>
              <th className="p-2 text-left">IV</th>
              <th className="p-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2638]">
            {optionData.map((row, idx) => {
              const isAtm = row.strike === 24700;
              const isHovered = hoveredRow === idx;

              return (
                <tr
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`hover:bg-[#1E2638]/60 transition ${
                    isAtm ? 'bg-purple-950/20' : ''
                  }`}
                >
                  <td className="p-2 text-gray-400">{row.volumeCall}</td>
                  <td className="p-2 text-right text-gray-400">{row.ivCall}</td>
                  <td className="p-2 text-right text-gray-400">{row.deltaCall}</td>
                  <td className="p-2 text-right text-green-400">{row.oiCall}</td>
                  <td className="p-2 text-right text-amber-400 font-medium">{row.callOiLakhs}</td>

                  {/* CALL LTP & Hover Buttons */}
                  <td className="p-2 text-right font-bold text-white relative">
                    {isHovered ? (
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => onOpenModal('BUY')}
                          className="px-2 py-0.5 bg-green-600 hover:bg-green-500 text-white rounded text-[10px] font-bold shadow"
>>>>>>> main
                        >
                          B
                        </button>
                        <button 
                          onClick={() => handleOpenOrder('SELL', 'CE', strike, callLtp)}
                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold"
                        >
                          S
                        </button>
                        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => handleOpenOrder('BUY', 'CE', strike, callLtp)}>
                          ₹{callLtp}
                        </span>
                      </div>
<<<<<<< HEAD
                    </td>
=======
                    ) : (
                      <span className="text-green-400 transition-colors duration-300">₹{row.callLtp.toFixed(2)}</span>
                    )}
                  </td>
>>>>>>> main

                    <td className={`p-2 text-center font-bold bg-[#131B2A] text-yellow-400 border-x border-[#1E2638] ${isATM ? 'bg-purple-600 text-white' : ''}`}>
                      {strike} {isATM && <span className="text-[9px] bg-black/40 px-1 rounded ml-1">ATM</span>}
                    </td>

                    <td className="p-2 text-left font-bold border-l border-[#1E2638]">
                      <div className="flex items-center justify-start space-x-1.5">
                        <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => handleOpenOrder('BUY', 'PE', strike, putLtp)}>
                          ₹{putLtp}
                        </span>
                        <button 
                          onClick={() => handleOpenOrder('BUY', 'PE', strike, putLtp)}
                          className="px-1.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold"
                        >
                          B
                        </button>
                        <button 
                          onClick={() => handleOpenOrder('SELL', 'PE', strike, putLtp)}
                          className="px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold"
                        >
                          S
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-left text-gray-400">{(15.1 + idx * 0.2).toFixed(1)}</td>
                    <td className="p-2 text-left text-red-400">-{(8.2 + idx).toFixed(1)}%</td>
                    <td className="p-2 text-left text-gray-400">{(98400 + idx * 10500).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {orderPanel && (
          <div className="w-80 bg-[#131B2A] border border-[#1E2638] rounded-2xl p-4 flex flex-col shadow-2xl shrink-0 animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-[#1E2638]">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${orderPanel.side === 'BUY' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
                  {orderPanel.side}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-white">{orderPanel.symbol}</h3>
                  <p className="text-[10px] text-gray-400">NFO • Expiry: {currentData.expiry}</p>
                </div>
              </div>
              <button onClick={() => setOrderPanel(null)} className="text-gray-400 hover:text-white">
                <FiX size={18} />
              </button>
            </div>

            {successMsg ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 bg-green-500/20 text-green-400 rounded-full mb-3 text-xl font-bold animate-bounce">
                  <FiCheck size={24} />
                </div>
                <h4 className="text-sm font-bold text-white">{orderCategory === 'GTT' ? 'GTT Order Placed!' : 'Order Executed!'}</h4>
                <p className="text-[11px] text-gray-400 mt-1">Added to Positions & Orders tab.</p>
              </div>
            ) : (
              <div className="py-3 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-3">
                  <div className="flex border-b border-[#1E2638] pb-2">
                    <button
                      onClick={() => setOrderCategory('Regular')}
                      className={`flex-1 py-1 text-center font-bold text-xs border-b-2 transition ${
                        orderCategory === 'Regular' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      Regular
                    </button>
                    <button
                      onClick={() => setOrderCategory('GTT')}
                      className={`flex-1 py-1 text-center font-bold text-xs border-b-2 transition ${
                        orderCategory === 'GTT' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      GTT (Good Till Triggered)
                    </button>
                  </div>

                  <div className="flex bg-[#0F141C] p-1 rounded-lg border border-[#1E2638]">
                    <button
                      onClick={() => setProductType('Intraday')}
                      className={`flex-1 py-1 rounded font-bold transition ${productType === 'Intraday' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                    >
                      Intraday (MIS)
                    </button>
                    <button
                      onClick={() => setProductType('Delivery')}
                      className={`flex-1 py-1 rounded font-bold transition ${productType === 'Delivery' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                    >
                      Delivery (NRML)
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Quantity</span>
                      <span>1 Lot = {currentData.lotSize} Qty</span>
                    </div>
                    <div className="flex items-center bg-[#0F141C] border border-[#1E2638] rounded-xl px-3 py-2">
                      <input 
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || currentData.lotSize)}
                        className="w-full bg-transparent text-white font-bold text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {orderCategory === 'GTT' ? (
                    <div>
                      <label className="text-[11px] text-purple-400 font-bold block mb-1">Trigger Price (₹)</label>
                      <input 
                        type="number"
                        value={triggerPrice}
                        onChange={(e) => setTriggerPrice(e.target.value)}
                        className="w-full bg-[#0F141C] border border-purple-500/50 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-purple-500"
                        placeholder="Enter Trigger Price"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Order Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setOrderType('Market')}
                          className={`py-1.5 rounded-lg font-bold border transition ${orderType === 'Market' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-[#0F141C] border-[#1E2638] text-gray-400'}`}
                        >
                          Market
                        </button>
                        <button
                          onClick={() => setOrderType('Limit')}
                          className={`py-1.5 rounded-lg font-bold border transition ${orderType === 'Limit' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-[#0F141C] border-[#1E2638] text-gray-400'}`}
                        >
                          Limit
                        </button>
                      </div>
<<<<<<< HEAD
                    </div>
                  )}
=======
                    ) : (
                      <span className="text-red-400 transition-colors duration-300">₹{row.putLtp.toFixed(2)}</span>
                    )}
                  </td>
>>>>>>> main

                  {orderCategory === 'Regular' && orderType === 'Limit' && (
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Limit Price</label>
                      <input 
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="w-full bg-[#0F141C] border border-[#1E2638] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  )}

                  <div className="bg-[#0F141C] p-3 rounded-xl border border-[#1E2638] space-y-1.5">
                    <div className="flex justify-between text-gray-400 text-[11px]">
                      <span>LTP Price:</span>
                      <span className="text-green-400 font-bold">₹{orderPanel.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 font-bold pt-1 border-t border-[#1E2638]">
                      <span>Margin Required:</span>
                      <span className="text-white">₹{(orderPanel.price * quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handlePlaceOrder}
                    className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition ${
                      orderPanel.side === 'BUY' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30' : 'bg-red-600 hover:bg-red-500 shadow-red-600/30'
                    }`}
                  >
                    Place {orderCategory === 'GTT' ? 'GTT' : orderPanel.side} Order
                  </button>
                  <button
                    onClick={() => setOrderPanel(null)}
                    className="w-full py-2 bg-[#0F141C] hover:bg-gray-800 text-gray-400 rounded-xl font-semibold border border-[#1E2638]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}