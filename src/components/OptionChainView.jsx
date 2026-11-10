import React, { useState } from 'react';

export default function OptionChainView({ onTrade }) {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');

  const symbols = [
    'NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY', 
    'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'
  ];

  // Dummy professional option chain rows matching Upstox layout
  const rows = [
    { strike: 80600, callVol: '55.27 L', callIV: '18.12', callVega: '26.99', callGamma: '0.0003', callTheta: '-81.73', callDelta: '0.65', callOIChg: '+36,620', callOILakhs: '1.56', callLTP: '840.00', putLTP: '383.40', putOILakhs: '2.31', putOIChg: '+44,620', putDelta: '-0.36', putTheta: '-96.83', putGamma: '0.0002', putVega: '27.55', putIV: '21.03', putVol: '93.17 L' },
    { strike: 80700, callVol: '84.18 L', callIV: '18.56', callVega: '27.82', callGamma: '0.0003', callTheta: '-86.30', callDelta: '0.62', callOIChg: '+39,860', callOILakhs: '1.66', callLTP: '778.85', putLTP: '422.90', putOILakhs: '2.34', putOIChg: '+85,660', putDelta: '-0.38', putTheta: '-97.16', putGamma: '0.0003', putVega: '28.09', putIV: '20.70', putVol: '1.05 Cr' },
    { strike: 80800, callVol: '1.15 Cr', callIV: '18.44', callVega: '28.40', callGamma: '0.0003', callTheta: '-87.52', callDelta: '0.59', callOIChg: '+1,46,920', callOILakhs: '2.38', callLTP: '718.80', putLTP: '464.30', putOILakhs: '2.48', putOIChg: '+1,04,520', putDelta: '-0.41', putTheta: '-98.46', putGamma: '0.0003', putVega: '28.57', putIV: '20.62', putVol: '1.16 Cr' },
    { strike: 80900, callVol: '1.00 Cr', callIV: '18.82', callVega: '28.87', callGamma: '0.0003', callTheta: '-90.82', callDelta: '0.56', callOIChg: '+2,01,220', callOILakhs: '2.84', callLTP: '665.90', putLTP: '507.70', putOILakhs: '2.09', putOIChg: '+1,13,520', putDelta: '-0.43', putTheta: '-101.86', putGamma: '0.0003', putVega: '28.95', putIV: '21.06', putVol: '78.81 L' },
    { strike: 81000, callVol: '2.16 Cr', callIV: '19.02', callVega: '29.16', callGamma: '0.0003', callTheta: '-92.70', callDelta: '0.53', callOIChg: '+5,30,540', callOILakhs: '9.90', callLTP: '622.65', putLTP: '550.25', putOILakhs: '7.66', putOIChg: '+4,39,340', putDelta: '-0.46', putTheta: '-101.35', putGamma: '0.0002', putVega: '29.18', putIV: '20.79', putVol: '1.47 Cr' },
  ];

  return (
    <div className="bg-[#12141c] rounded-xl border border-gray-800 p-4 shadow-2xl flex-1 flex flex-col font-sans text-gray-100 overflow-hidden">
      
      {/* Top Indices & Commodities Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 border-b border-gray-800 scrollbar-thin scrollbar-thumb-gray-800">
        <span className="text-xs font-bold text-gray-400 mr-2">Option Chain:</span>
        {symbols.map((sym) => (
          <button
            key={sym}
            onClick={() => setSelectedSymbol(sym)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedSymbol === sym 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {sym}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-purple-400">📊 {selectedSymbol} Pro Chain</span>
          <span className="bg-gray-900 px-2 py-0.5 rounded border border-gray-800 text-gray-300">Exp: 13-Nov-2026</span>
        </div>
        <span className="text-gray-400">Click <strong className="text-blue-400">[B]</strong> to Buy or <strong className="text-red-400">[S]</strong> to Sell</span>
      </div>

      {/* Professional Option Chain Table with all Greeks & Analytics */}
      <div className="overflow-x-auto flex-1 border border-gray-800 rounded-lg">
        <table className="w-full text-left text-[11px] text-gray-300 border-collapse whitespace-nowrap font-mono">
          <thead>
            <tr className="bg-[#0b0e14] text-gray-400 border-b border-gray-800 text-center uppercase tracking-wider text-[10px]">
              <th className="p-2.5 border-r border-gray-800/60 bg-blue-950/20" colSpan="10">Calls (CE)</th>
              <th className="p-2.5 bg-gray-900 font-bold text-amber-400">Strike</th>
              <th className="p-2.5 border-l border-gray-800/60 bg-red-950/20" colSpan="10">Puts (PE)</th>
            </tr>
            <tr className="bg-gray-900/90 text-gray-400 border-b border-gray-800 text-[10px]">
              <th className="p-2">Volume</th>
              <th className="p-2">IV</th>
              <th className="p-2">Vega</th>
              <th className="p-2">Gamma</th>
              <th className="p-2">Theta</th>
              <th className="p-2">Delta</th>
              <th className="p-2">OI (chg)</th>
              <th className="p-2">OI (Lakhs)</th>
              <th className="p-2">LTP</th>
              <th className="p-2 border-r border-gray-800">Action</th>
              <th className="p-2 text-center bg-gray-900 font-bold text-amber-400">PRICE</th>
              <th className="p-2 border-l border-gray-800">Action</th>
              <th className="p-2">LTP</th>
              <th className="p-2">OI (Lakhs)</th>
              <th className="p-2">OI (chg)</th>
              <th className="p-2">Delta</th>
              <th className="p-2">Theta</th>
              <th className="p-2">Gamma</th>
              <th className="p-2">Vega</th>
              <th className="p-2">IV</th>
              <th className="p-2">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                {/* Calls Data */}
                <td className="p-2 text-gray-400">{r.callVol}</td>
                <td className="p-2 text-gray-400">{r.callIV}</td>
                <td className="p-2 text-gray-400">{r.callVega}</td>
                <td className="p-2 text-gray-400">{r.callGamma}</td>
                <td className="p-2 text-gray-400">{r.callTheta}</td>
                <td className="p-2 text-gray-400">{r.callDelta}</td>
                <td className="p-2 text-green-400">{r.callOIChg}</td>
                <td className="p-2 text-blue-400 font-bold">{r.callOILakhs}</td>
                <td className="p-2 text-amber-400 font-bold">₹{r.callLTP}</td>
                <td className="p-2 border-r border-gray-800 space-x-1 text-center">
                  <button onClick={() => onTrade(`${selectedSymbol} ${r.strike} CE`, parseFloat(r.callLTP), 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                  <button onClick={() => onTrade(`${selectedSymbol} ${r.strike} CE`, parseFloat(r.callLTP), 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                </td>

                {/* Strike Price */}
                <td className="p-2 text-center font-bold text-white bg-gray-900/80 border-x border-gray-800 text-xs">
                  {r.strike}
                </td>

                {/* Puts Actions & Data */}
                <td className="p-2 border-l border-gray-800 space-x-1 text-center">
                  <button onClick={() => onTrade(`${selectedSymbol} ${r.strike} PE`, parseFloat(r.putLTP), 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">B</button>
                  <button onClick={() => onTrade(`${selectedSymbol} ${r.strike} PE`, parseFloat(r.putLTP), 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-1.5 py-0.5 rounded font-bold text-[9px] cursor-pointer">S</button>
                </td>
                <td className="p-2 text-amber-400 font-bold">₹{r.putLTP}</td>
                <td className="p-2 text-blue-400 font-bold">{r.putOILakhs}</td>
                <td className="p-2 text-green-400">{r.putOIChg}</td>
                <td className="p-2 text-gray-400">{r.putDelta}</td>
                <td className="p-2 text-gray-400">{r.putTheta}</td>
                <td className="p-2 text-gray-400">{r.putGamma}</td>
                <td className="p-2 text-gray-400">{r.putVega}</td>
                <td className="p-2 text-gray-400">{r.putIV}</td>
                <td className="p-2 text-gray-400">{r.putVol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}