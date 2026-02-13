import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { phones, generationSpecs } from '../data/researchData';

const UPGRADE_PHONES = phones.filter(p => ['pixel-9-pro', 'pixel-10', 'pixel-10-pro'].includes(p.id));

const SPEC_ROWS = [
  { label: 'Chipset', key: 'chipset' },
  { label: 'Process Node', key: 'chipProcess' },
  { label: 'RAM', key: 'ram', suffix: 'GB' },
  { label: 'Storage Options', key: 'storageOptions', format: v => v.map(s => s >= 1024 ? '1TB' : `${s}GB`).join(', ') },
  { label: 'Display Size', key: p => `${p.display.size}"` },
  { label: 'Resolution', key: p => p.display.resolution },
  { label: 'Peak Brightness', key: p => `${p.display.brightness} nits` },
  { label: 'Refresh Rate', key: p => `${p.display.refreshRate}Hz` },
  { label: 'Battery', key: p => `${p.battery.capacity} mAh` },
  { label: 'Wired Charging', key: p => `${p.battery.wiredCharging}W` },
  { label: 'Wireless Charging', key: p => `${p.battery.wirelessCharging}W ${p.battery.wirelessStandard}` },
  { label: 'Magnetic Charging', key: p => p.battery.magnetic ? '✓ Qi2' : '✗' },
  { label: 'Main Camera', key: p => p.cameras.main },
  { label: 'Ultrawide', key: p => p.cameras.ultrawide },
  { label: 'Telephoto', key: p => p.cameras.telephoto },
  { label: 'Selfie', key: p => p.cameras.selfie },
  { label: 'Max Zoom', key: p => p.cameras.maxZoom },
  { label: 'Wi-Fi', key: p => p.connectivity.wifi },
  { label: 'Bluetooth', key: p => p.connectivity.bluetooth },
  { label: 'SIM', key: p => p.connectivity.sim },
  { label: 'UWB', key: p => p.connectivity.uwb ? '✓' : '✗' },
  { label: 'OS', key: 'os' },
  { label: 'Updates Remaining', key: p => `${p.osUpdatesRemaining} years` },
  { label: 'Weight', key: p => `${p.weight}g` },
  { label: 'IP Rating', key: 'ip' },
  { label: 'Glass', key: 'glass' },
  { label: 'Launch Price', key: p => `$${p.launchPrice}` },
  { label: 'Current Price', key: p => p.currentPrice ? `~$${p.currentPrice}` : 'Discontinued' },
];

function getCellValue(phone, row) {
  if (typeof row.key === 'function') return row.key(phone);
  const val = phone[row.key];
  if (row.format) return row.format(val);
  if (row.suffix) return `${val}${row.suffix}`;
  return val;
}

function isHighlight(phone, row) {
  if (typeof row.key === 'function') {
    const val = row.key(phone);
    if (val === '✓ Qi2' || val === '100x Pro Res Zoom') return true;
  }
  if (row.label === 'Updates Remaining' && phone.osUpdatesRemaining >= 7) return true;
  return false;
}

const radarData = generationSpecs.map(g => ({
  subject: g.label,
  Performance: Math.round((g.antutu / 1200000) * 100),
  Battery: Math.round((g.battery / 5100) * 100),
  Display: Math.round((g.brightness / 3300) * 100),
  Camera: Math.round(((g.ultrawideMP + g.selfieMP) / 90) * 100),
  RAM: Math.round((g.ram / 16) * 100),
}));

const COLORS = ['#f59e0b', '#6366f1', '#10b981', '#f472b6', '#06b6d4'];

export default function SpecComparison() {
  const [showAll, setShowAll] = useState(false);

  const performanceData = generationSpecs.map(g => ({
    name: g.label,
    AnTuTu: g.antutu,
    fill: g.isYours ? '#f472b6' : '#6366f1',
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Spec Comparison</h2>
        <p className="text-gray-400 text-sm">Side-by-side specs for your upgrade options, plus generation-over-generation performance trends.</p>
      </div>

      <InsightCallout variant="insight" title="Key Takeaway">
        The Pixel 10 Pro shares the same camera sensors, same display size, same resolution, and nearly the same design as your Pixel 9 Pro.
        The meaningful differences are the Tensor G5 chip (3nm), Qi2 magnetic charging, Bluetooth 6.0, and improved PWM dimming.
      </InsightCallout>

      {/* Spec Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-500 font-medium w-40">Spec</th>
              {UPGRADE_PHONES.map(p => (
                <th key={p.id} className={`text-left py-3 px-4 font-medium ${p.isYourPhone ? 'text-emerald-400' : 'text-gray-300'}`}>
                  {p.model}
                  {p.isYourPhone && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">YOUR PHONE</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPEC_ROWS.slice(0, showAll ? undefined : 16).map((row, i) => (
              <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-2.5 px-4 text-gray-500 text-xs">{row.label}</td>
                {UPGRADE_PHONES.map(p => (
                  <td key={p.id} className={`py-2.5 px-4 text-xs ${isHighlight(p, row) ? 'text-emerald-400 font-medium' : 'text-gray-300'}`}>
                    {getCellValue(p, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!showAll && (
          <button onClick={() => setShowAll(true)} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            Show all {SPEC_ROWS.length} specs →
          </button>
        )}
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">AnTuTu Performance by Generation</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={performanceData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip formatter={v => v.toLocaleString()} />} />
            <Bar dataKey="AnTuTu" radius={[6, 6, 0, 0]}>
              {performanceData.map((entry, i) => (
                <rect key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[11px] text-gray-500 mt-2">Your Pixel 9 Pro highlighted in pink. The G4→G5 jump is modest in benchmarks despite the 34% CPU claim.</p>
      </div>

      {/* Radar Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Capability Radar — Pixel Pro Generations (Normalized %)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {['Performance', 'Battery', 'Display', 'Camera', 'RAM'].map((key, i) => (
              <Radar key={key} name={key} dataKey={key} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.1} />
            ))}
            <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
            <Tooltip content={<CustomTooltip formatter={v => `${v}%`} />} />
          </RadarChart>
        </ResponsiveContainer>
        <p className="text-[11px] text-gray-500 mt-2">Pixel 9 Pro and 10 Pro overlap almost completely — confirming this is a tock/refinement year.</p>
      </div>
    </div>
  );
}
