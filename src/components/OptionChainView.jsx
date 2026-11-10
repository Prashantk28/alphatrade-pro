import React, { useState } from 'react';

export default function OptionChainView({ onTrade }) {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');

  const symbols = [
    'NIFTY', 'SENSEX', 'BANKNIFTY', 'FINNIFTY', 
    'MIDCPNIFTY', 'CRUDEOIL', 'NATURALGAS', 'GOLD', 'SILVER'
  ];

  return (
    <div className="bg-[#12141c] rounded-xl border border-gray-800 p-5 shadow-lg flex-1 flex flex-col font-sans text-gray-100">
      
      {/* Top Indices & Commodities Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4 border-b border-gray-800">
        <span className="text-xs font-bold text-gray-400 mr-2">Option Chain</span>
        {symbols.map((sym) => (
          <button
            key={sym}
            onClick={() => setSelectedSymbol(sym)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedSymbol === sym 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {sym}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-purple-400">📊 Option Chain Analytics for {selectedSymbol}</h2>
        <span className="text-xs text-gray-400">Expiry: 13-Nov-2026 | Click [B] to Buy or [S] to Sell</span>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs text-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-800 text-gray-400">
              <th className="p-3">CALLS OI</th>
              <th className="p-3">CHG %</th>
              <th className="p-3 text-center">CALL ACTION</th>
              <th className="p-3 text-center">STRIKE PRICE</th>
              <th className="p-3 text-center">PUT ACTION</th>
              <th className="p-3">PUTS OI</th>
              <th className="p-3">CHG %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr className="hover:bg-gray-800/40">
              <td className="p-3 text-blue-400 font-mono">1,25,400</td>
              <td className="p-3 text-green-400 font-mono">+12.4%</td>
              <td className="p-3 text-center space-x-1">
                <button onClick={() => onTrade(`${selectedSymbol} 24640 CE`, 305.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">B</button>
                <button onClick={() => onTrade(`${selectedSymbol} 24640 CE`, 305.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">S</button>
              </td>
              <td className="p-3 text-center font-bold text-amber-400 bg-gray-900/50 font-mono">24640</td>
              <td className="p-3 text-center space-x-1">
                <button onClick={() => onTrade(`${selectedSymbol} 24640 PE`, 45.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">B</button>
                <button onClick={() => onTrade(`${selectedSymbol} 24640 PE`, 45.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">S</button>
              </td>
              <td className="p-3 text-red-400 font-mono">98,400</td>
              <td className="p-3 text-red-400 font-mono">-8.2%</td>
            </tr>
            <tr className="hover:bg-gray-800/40">
              <td className="p-3 text-blue-400 font-mono">1,87,900</td>
              <td className="p-3 text-green-400 font-bold font-mono">+17.4%</td>
              <td className="p-3 text-center space-x-1">
                <button onClick={() => onTrade(`${selectedSymbol} 24890 ATM CE`, 55.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">B</button>
                <button onClick={() => onTrade(`${selectedSymbol} 24890 ATM CE`, 55.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">S</button>
              </td>
              <td className="p-3 text-center font-bold text-white bg-purple-900/40 font-mono">24890 [ATM]</td>
              <td className="p-3 text-center space-x-1">
                <button onClick={() => onTrade(`${selectedSymbol} 24890 ATM PE`, 50.00, 'BUY')} className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">B</button>
                <button onClick={() => onTrade(`${selectedSymbol} 24890 ATM PE`, 50.00, 'SELL')} className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded font-bold text-[10px] cursor-pointer">S</button>
              </td>
              <td className="p-3 text-red-400 font-mono">1,50,900</td>
              <td className="p-3 text-red-400 font-mono">-13.2%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}