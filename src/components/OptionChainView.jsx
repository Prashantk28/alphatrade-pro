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
            Spot: 24,804.90
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