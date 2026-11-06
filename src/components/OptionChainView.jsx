import React, { useState } from 'react';
import { FiLayers, FiBarChart2, FiInfo } from 'react-icons/fi';

export default function OptionChainView({ onOpenModal }) {
  const [selectedExpiry, setSelectedExpiry] = useState('09 Nov 2026 w');
  const [hoveredRow, setHoveredRow] = useState(null);
  const expiries = ['09 Nov 2026 w', '17 Nov 2026 w', '23 Nov 2026 w', '01 Dec 2026 w', '08 Dec 2026 w', '29 Dec 2026 w'];

  const optionData = [
    { strike: 24400, callLtp: 358.05, callOi: '27.28 Cr', putLtp: 60.35, putOi: '142.61 Cr', iv: '17.88', pcr: '5.23' },
    { strike: 24450, callLtp: 319.00, callOi: '15.78 Cr', putLtp: 70.50, putOi: '79.18 Cr', iv: '17.94', pcr: '5.02' },
    { strike: 24500, callLtp: 282.40, callOi: '41.01 Cr', putLtp: 83.75, putOi: '154.53 Cr', iv: '17.60', pcr: '2.53' },
    { strike: 24550, callLtp: 248.40, callOi: '31.39 Cr', putLtp: 97.85, putOi: '75.73 Cr', iv: '17.34', pcr: '2.41' },
    { strike: 24600, callLtp: 214.30, callOi: '98.25 Cr', putLtp: 115.60, putOi: '124.96 Cr', iv: '17.27', pcr: '1.27' },
    { strike: 24650, callLtp: 184.45, callOi: '88.12 Cr', putLtp: 135.55, putOi: '68.94 Cr', iv: '17.15', pcr: '0.78' },
    { strike: 24700, callLtp: 158.05, callOi: '125.86 Cr', putLtp: 158.15, putOi: '37.53 Cr', iv: '17.10', pcr: '0.30' },
    { strike: 24750, callLtp: 133.10, callOi: '55.51 Cr', putLtp: 183.70, putOi: '9.20 Cr', iv: '16.98', pcr: '0.17' },
    { strike: 24800, callLtp: 112.00, callOi: '104.53 Cr', putLtp: 212.60, putOi: '14.68 Cr', iv: '16.92', pcr: '0.14' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 flex flex-col overflow-hidden select-none">
      
      {/* Top Bar / Expiry Filter */}
      <div className="bg-[#131B2A] border-b border-[#1E2638] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-white flex items-center space-x-1.5">
            <FiLayers className="text-purple-400" />
            <span>Option Chain for NIFTY</span>
          </span>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-semibold">
            Spot: 24,693.60
          </span>
        </div>

        {/* Expiry Dates */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {expiries.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExpiry(exp)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${selectedExpiry === exp ? 'bg-purple-600 text-white' : 'bg-[#0F141C] text-gray-400 hover:text-white border border-[#1E2638]'}`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Option Chain Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#131B2A] text-gray-400 border-b border-[#1E2638] sticky top-0 z-10 text-[11px]">
              <th className="p-3 text-right">OI (lakhs)</th>
              <th className="p-3 text-right">IV</th>
              <th className="p-3 text-right">LTP</th>
              <th className="p-3 text-center bg-purple-600/10 text-purple-400 font-bold">Calls (CE)</th>
              <th className="p-3 text-center bg-[#1E2638] font-bold text-white">Strike</th>
              <th className="p-3 text-center bg-purple-600/10 text-purple-400 font-bold">Puts (PE)</th>
              <th className="p-3 text-left">LTP</th>
              <th className="p-3 text-left">OI (lakhs)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2638]">
            {optionData.map((row, idx) => {
              const isAtm = row.strike === 24650;
              const isHovered = hoveredRow === idx;

              return (
                <tr 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`hover:bg-[#1E2638]/40 transition relative ${isAtm ? 'bg-[#1E2638]/60' : ''}`}
                >
                  <td className="p-3 text-right text-gray-300">{row.callOi}</td>
                  <td className="p-3 text-right text-gray-400">{row.iv}</td>
                  <td className="p-3 text-right font-medium text-white">₹{row.callLtp}</td>
                  
                  {/* Call Action or Buy Button */}
                  <td className="p-3 text-center bg-green-500/5">
                    {isHovered ? (
                      <div className="flex items-center justify-center space-x-1">
                        <button onClick={() => onOpenModal('BUY')} className="px-2 py-0.5 bg-green-600 text-white rounded text-[10px] font-bold">B</button>
                        <button onClick={() => onOpenModal('SELL')} className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold">S</button>
                        <button title="Chart" className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"><FiBarChart2 size={12}/></button>
                      </div>
                    ) : (
                      <button onClick={() => onOpenModal('BUY')} className="px-2 py-1 bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white rounded text-[10px] font-bold transition">
                        BUY CE
                      </button>
                    )}
                  </td>

                  {/* Strike Price */}
                  <td className="p-3 text-center font-bold text-white bg-[#1E2638] border-x border-[#0F141C]">
                    {row.strike} {isAtm && <span className="text-[9px] bg-purple-600 text-white px-1 rounded ml-1">ATM</span>}
                  </td>

                  {/* Put Action or Buy Button */}
                  <td className="p-3 text-center bg-red-500/5">
                    {isHovered ? (
                      <div className="flex items-center justify-center space-x-1">
                        <button onClick={() => onOpenModal('BUY')} className="px-2 py-0.5 bg-green-600 text-white rounded text-[10px] font-bold">B</button>
                        <button onClick={() => onOpenModal('SELL')} className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold">S</button>
                        <button title="Chart" className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"><FiBarChart2 size={12}/></button>
                      </div>
                    ) : (
                      <button onClick={() => onOpenModal('SELL')} className="px-2 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded text-[10px] font-bold transition">
                        BUY PE
                      </button>
                    )}
                  </td>

                  <td className="p-3 text-left font-medium text-white">₹{row.putLtp}</td>
                  <td className="p-3 text-left text-gray-300">{row.putOi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}