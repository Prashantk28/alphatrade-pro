import React, { useState } from 'react';
import { FiLayers, FiBarChart2, FiInfo } from 'react-icons/fi';

export default function OptionChainView({ onOpenModal }) {
  const [selectedExpiry, setSelectedExpiry] = useState('09 Nov 2026 w');
  const [hoveredRow, setHoveredRow] = useState(null);

  const expiries = [
    '09 Nov 2026 w',
    '17 Nov 2026 w',
    '23 Nov 2026 w',
    '01 Dec 2026 w',
    '08 Dec 2026 w',
    '29 Dec 2026 w'
  ];

  const optionData = [
    { volumeCall: '5.62 Cr', ivCall: '17.92', deltaCall: '0.7656', oiCall: '-2,00,78', callOiLakhs: '15.32', callLtp: 307.60, strike: 24400, pcr: '5.61', putLtp: 73.70, putOiLakhs: '78.5', oiPut: '+78,67,925', deltaPut: '-0.2438', ivPut: '18.72', volumePut: '19.03 Cr' },
    { volumeCall: '5.34 Cr', ivCall: '17.76', deltaCall: '0.7278', oiCall: '-1,34,095', callOiLakhs: '15.78', callLtp: 270.85, strike: 24450, pcr: '5.12', putLtp: 87.15, putOiLakhs: '163.53', oiPut: '+56,41,545', deltaPut: '-0.2789', ivPut: '18.38', volumePut: '11.57 Cr' },
    { volumeCall: '18.39 Cr', ivCall: '17.50', deltaCall: '0.6874', oiCall: '+1,66,725', callOiLakhs: '59.67', callLtp: 236.10, strike: 24500, pcr: '2.74', putLtp: 102.60, putOiLakhs: '82.46', oiPut: '+1,05,33,315', deltaPut: '-0.3189', ivPut: '18.18', volumePut: '24.10 Cr' },
    { volumeCall: '14.26 Cr', ivCall: '17.27', deltaCall: '0.6432', oiCall: '-13,41,080', callOiLakhs: '29.53', callLtp: 204.35, strike: 24550, pcr: '2.79', putLtp: 120.65, putOiLakhs: '129.99', oiPut: '+52,46,865', deltaPut: '-0.3612', ivPut: '17.88', volumePut: '12.16 Cr' },
    { volumeCall: '28.28 Cr', ivCall: '17.10', deltaCall: '0.5956', oiCall: '+23,86,345', callOiLakhs: '86.47', callLtp: 175.20, strike: 24600, pcr: '1.50', putLtp: 141.45, putOiLakhs: '76.69', oiPut: '+1,10,26,665', deltaPut: '-0.4075', ivPut: '17.71', volumePut: '20.32 Cr' },
    { volumeCall: '22.31 Cr', ivCall: '17.04', deltaCall: '0.5453', oiCall: '+57,55,230', callOiLakhs: '83.35', callLtp: 148.35, strike: 24650, pcr: '0.92', putLtp: 164.90, putOiLakhs: '51.97', oiPut: '+71,32,515', deltaPut: '-0.4559', ivPut: '17.57', volumePut: '9.77 Cr' },
    { volumeCall: '25.98 Cr', ivCall: '16.93', deltaCall: '0.4940', oiCall: '+64,22,130', callOiLakhs: '126.35', callLtp: 125.00, strike: 24700, pcr: '0.41', putLtp: 191.15, putOiLakhs: '11.28', oiPut: '+45,73,075', deltaPut: '-0.5056', ivPut: '17.51', volumePut: '7.61 Cr' },
    { volumeCall: '12.71 Cr', ivCall: '16.87', deltaCall: '0.4425', oiCall: '+31,20,390', callOiLakhs: '55.6', callLtp: 104.90, strike: 24750, pcr: '0.20', putLtp: 220.75, putOiLakhs: '17.28', oiPut: '+7,99,890', deltaPut: '-0.5555', ivPut: '17.42', volumePut: '1.57 Cr' },
    { volumeCall: '19.47 Cr', ivCall: '16.87', deltaCall: '0.3920', oiCall: '+27,12,970', callOiLakhs: '104.48', callLtp: 86.40, strike: 24800, pcr: '0.17', putLtp: 252.80, putOiLakhs: '2.79', oiPut: '+14,20,445', deltaPut: '-0.6046', ivPut: '17.41', volumePut: '1.79 Cr' },
    { volumeCall: '8.66 Cr', ivCall: '16.81', deltaCall: '0.3428', oiCall: '+29,52,300', callOiLakhs: '51.82', callLtp: 71.25, strike: 24850, pcr: '0.05', putLtp: 288.35, putOiLakhs: '3.63', oiPut: '+2,05,530', deltaPut: '-0.6515', ivPut: '17.45', volumePut: '38.49 L' },
    { volumeCall: '10.96 Cr', ivCall: '16.87', deltaCall: '0.2973', oiCall: '+22,70,905', callOiLakhs: '59.93', callLtp: 58.25, strike: 24900, pcr: '0.06', putLtp: 322.50, putOiLakhs: '0.88', oiPut: '+2,65,200', deltaPut: '-0.6958', ivPut: '17.50', volumePut: '35.58 L' },
  ];

  return (
    <div className="flex-1 bg-[#0F141C] text-gray-200 flex flex-col overflow-hidden select-none">
      
      {/* Top Header / Expiry Tabs */}
      <div className="bg-[#131B2A] border-b border-[#1E2638] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-white flex items-center space-x-1.5">
            <FiLayers className="text-purple-400" />
            <span>Option Chain for NIFTY</span>
          </span>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-semibold">
            Spot: 24,682.60
          </span>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto">
          {expiries.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedExpiry(exp)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                selectedExpiry === exp
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-[#0F141C] text-gray-400 hover:text-white border border-[#1E2638]'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

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
              const isAtm = row.strike === 24650;
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
                        >
                          B
                        </button>
                        <button
                          onClick={() => onOpenModal('SELL')}
                          className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold shadow"
                        >
                          S
                        </button>
                        <button
                          title="Info"
                          className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"
                        >
                          <FiInfo size={11} />
                        </button>
                        <button
                          title="Chart"
                          className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"
                        >
                          <FiBarChart2 size={11} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-green-400">₹{row.callLtp}</span>
                    )}
                  </td>

                  {/* STRIKE PRICE */}
                  <td className="p-2 text-center font-bold text-white bg-[#1E2638] border-x border-[#0F141C] whitespace-nowrap">
                    <div>{row.strike}</div>
                    <div className="text-[9px] text-gray-400 font-normal">PCR: {row.pcr}</div>
                  </td>

                  {/* PUT LTP & Hover Buttons */}
                  <td className="p-2 text-left font-bold text-white relative">
                    {isHovered ? (
                      <div className="flex items-center justify-start space-x-1">
                        <button
                          onClick={() => onOpenModal('BUY')}
                          className="px-2 py-0.5 bg-green-600 hover:bg-green-500 text-white rounded text-[10px] font-bold shadow"
                        >
                          B
                        </button>
                        <button
                          onClick={() => onOpenModal('SELL')}
                          className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold shadow"
                        >
                          S
                        </button>
                        <button
                          title="Info"
                          className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"
                        >
                          <FiInfo size={11} />
                        </button>
                        <button
                          title="Chart"
                          className="p-1 bg-[#1E2638] hover:bg-purple-600 text-gray-300 hover:text-white rounded"
                        >
                          <FiBarChart2 size={11} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-red-400">₹{row.putLtp}</span>
                    )}
                  </td>

                  <td className="p-2 text-amber-400 font-medium">{row.putOiLakhs}</td>
                  <td className="p-2 text-green-400">{row.oiPut}</td>
                  <td className="p-2 text-gray-400">{row.deltaPut}</td>
                  <td className="p-2 text-gray-400">{row.ivPut}</td>
                  <td className="p-2 text-right text-gray-400">{row.volumePut}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}