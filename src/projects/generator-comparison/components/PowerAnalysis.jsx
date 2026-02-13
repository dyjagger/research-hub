import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, ReferenceLine, ScatterChart, Scatter } from 'recharts';
import { products, BRAND_COLORS, USER_LOAD_PROFILE } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

export default function PowerAnalysis() {
  const [fuelFilter, setFuelFilter] = useState('all');
  const triFuel = products.filter(p => p.fuelType === 'Tri-Fuel');
  const filtered = fuelFilter === 'all' ? products : products.filter(p => p.fuelType === fuelFilter);

  // Gas vs NG vs Propane comparison (tri-fuel only)
  const fuelCompData = triFuel
    .sort((a, b) => b.runningWattsNG - a.runningWattsNG)
    .map(p => ({
      name: p.model,
      brand: p.brand,
      gasoline: p.runningWattsGas,
      propane: p.runningWattsPropane,
      naturalGas: p.runningWattsNG,
    }));

  // NG derating ratio
  const deratingData = triFuel
    .sort((a, b) => b.ngToGasRatio - a.ngToGasRatio)
    .map(p => ({
      name: p.model,
      brand: p.brand,
      ratio: Math.round(p.ngToGasRatio * 100),
      loss: Math.round((1 - p.ngToGasRatio) * 100),
    }));

  // "Will it run my AC?" analysis
  const acAnalysis = triFuel.map(p => ({
    name: p.model,
    brand: p.brand,
    ngRunning: p.runningWattsNG,
    ngPeak: p.peakWattsNG,
    canRunACWithSoftStart: p.runningWattsNG >= USER_LOAD_PROFILE.summer.totalRunningWithAC && p.peakWattsNG >= USER_LOAD_PROFILE.summer.totalStartingWithSoftStart,
    canRunACWithout: p.runningWattsNG >= USER_LOAD_PROFILE.summer.totalRunningWithAC && p.peakWattsNG >= USER_LOAD_PROFILE.summer.totalStartingNoSoftStart,
    canRunWinter: p.runningWattsNG >= USER_LOAD_PROFILE.winter.totalRunning,
    headroomWinter: p.runningWattsNG - USER_LOAD_PROFILE.winter.totalRunning,
    headroomSummer: p.runningWattsNG - USER_LOAD_PROFILE.summer.totalRunningWithAC,
  })).sort((a, b) => b.ngRunning - a.ngRunning);

  // All products gas running watts
  const allGasData = [...filtered]
    .sort((a, b) => b.runningWattsGas - a.runningWattsGas)
    .map(p => ({
      name: p.model,
      brand: p.brand,
      watts: p.runningWattsGas,
      fuelType: p.fuelType,
    }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Power Analysis</h2>
      <p className="text-gray-400 mb-6">Gas vs. Propane vs. Natural Gas output — and what it means for your home</p>

      {/* Tri-Fuel: Gas vs Propane vs NG */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Running Watts by Fuel Type (Tri-Fuel Models)</h3>
        <p className="text-xs text-gray-400 mb-4">Same generator, different fuel = different output. Natural gas always produces the least.</p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={fuelCompData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tickFormatter={v => `${(v/1000).toFixed(0)}kW`} domain={[0, 13000]} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v, name) => `${v.toLocaleString()}W (${name})`} />} />
            <Legend />
            <Bar dataKey="gasoline" fill="#f59e0b" name="Gasoline" radius={[0, 2, 2, 0]} barSize={10} />
            <Bar dataKey="propane" fill="#3b82f6" name="Propane" radius={[0, 2, 2, 0]} barSize={10} />
            <Bar dataKey="naturalGas" fill="#10b981" name="Natural Gas" radius={[0, 2, 2, 0]} barSize={10} />
            <ReferenceLine x={USER_LOAD_PROFILE.summer.totalRunningWithAC} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Summer Load (5,960W)', fill: '#ef4444', fontSize: 10, position: 'top' }} />
            <ReferenceLine x={USER_LOAD_PROFILE.winter.totalRunning} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Winter Load (2,460W)', fill: '#f59e0b', fontSize: 10, position: 'top' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="highlight" title="The NG Derating Varies by Model">
        Not all generators lose the same percentage on natural gas. The DuroMax XP15000HXT retains <strong>85.5%</strong> of its gas output on NG,
        while the Firman T07573 only retains <strong>73.3%</strong>. This 12% difference translates to over 1,000 watts at these power levels.
      </InsightCallout>

      {/* NG Derating Ratio */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Natural Gas Efficiency Ratio</h3>
        <p className="text-xs text-gray-400 mb-4">What percentage of gasoline watts you keep on natural gas. Higher = better NG performance.</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={deratingData} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" domain={[65, 90]} tickFormatter={v => `${v}%`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}% retained`} />} />
            <Bar dataKey="ratio" name="NG/Gas Ratio" radius={[0, 4, 4, 0]}>
              {deratingData.map((entry, i) => (
                <Cell key={i} fill={entry.ratio >= 83 ? '#10b981' : entry.ratio >= 80 ? '#f59e0b' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Will It Run My AC? */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Will It Run Your 3-Ton AC on Natural Gas?</h3>
        <p className="text-xs text-gray-400 mb-4">Green = yes with soft start ($140). Yellow = winter only. Red = insufficient.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {acAnalysis.map(p => {
            let status, statusColor, statusBg;
            if (p.canRunACWithSoftStart) {
              status = '✓ AC + Everything (with soft start)';
              statusColor = 'text-emerald-400';
              statusBg = 'bg-emerald-500/10 border-emerald-500/30';
            } else if (p.canRunWinter) {
              status = '⚠ Winter Essentials Only';
              statusColor = 'text-amber-400';
              statusBg = 'bg-amber-500/10 border-amber-500/30';
            } else {
              status = '✗ Insufficient';
              statusColor = 'text-red-400';
              statusBg = 'bg-red-500/10 border-red-500/30';
            }
            return (
              <div key={p.name} className={`${statusBg} border rounded-lg p-3`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-white text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.brand} — {p.ngRunning.toLocaleString()}W on NG</p>
                  </div>
                  <span className={`text-xs font-medium ${statusColor}`}>{status}</span>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>Winter headroom: <span className="text-gray-300">+{p.headroomWinter.toLocaleString()}W</span></span>
                  <span>Summer headroom: <span className={p.headroomSummer >= 0 ? 'text-emerald-400' : 'text-red-400'}>{p.headroomSummer >= 0 ? '+' : ''}{p.headroomSummer.toLocaleString()}W</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="recommendation" title="The Soft Start Strategy">
        A <strong>Micro-Air EasyStart 368 (~$140)</strong> installed on your AC compressor reduces starting surge by 65-75%.
        This one $140 investment opens up the 8,500W+ NG generators for summer AC use — saving you $1,000+ vs buying a 15kW unit.
        It's the single best ROI upgrade in this entire comparison.
      </InsightCallout>

      {/* All Models Gas Watts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">All Models — Gasoline Running Watts</h3>
        <p className="text-xs text-gray-400 mb-4">
          <select value={fuelFilter} onChange={e => setFuelFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded px-2 py-0.5 ml-1">
            <option value="all">All fuel types</option>
            <option value="Tri-Fuel">Tri-Fuel only</option>
            <option value="Dual-Fuel">Dual-Fuel only</option>
          </select>
        </p>
        <ResponsiveContainer width="100%" height={Math.max(250, filtered.length * 35)}>
          <BarChart data={allGasData} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tickFormatter={v => `${(v/1000).toFixed(0)}kW`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v.toLocaleString()}W`} />} />
            <Bar dataKey="watts" name="Gas Running Watts" radius={[0, 4, 4, 0]}>
              {allGasData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6b7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
