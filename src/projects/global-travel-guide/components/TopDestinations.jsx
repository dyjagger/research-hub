import React, { useState } from 'react';
import { MapPin, TrendingUp, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { topCountries, topCities, fastestGrowing, regionalRecovery } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#ec4899'];
const regionColors = { Europe: '#6366f1', 'Asia-Pacific': '#10b981', Americas: '#f59e0b', 'Middle East': '#f43f5e', Africa: '#8b5cf6', Oceania: '#06b6d4' };

export default function TopDestinations() {
  const [regionFilter, setRegionFilter] = useState('All');
  const regions = ['All', ...new Set(topCountries.map((c) => c.region))];
  const filtered = regionFilter === 'All' ? topCountries : topCountries.filter((c) => c.region === regionFilter);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MapPin className="text-cyan-400" size={24} /> Top Destinations
        </h2>
        <p className="text-gray-400 text-sm mt-1">Country & city rankings by international arrivals, growth rates, and regional recovery</p>
      </div>

      {/* Region Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-gray-500" />
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              regionFilter === r ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Country Arrivals Bar Chart */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">International Arrivals by Country (2024)</h3>
        <p className="text-xs text-gray-500 mb-4">Millions of international tourist arrivals — vs 2019 growth %</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={filtered} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 11 }} width={80} />
            <Tooltip content={<CustomTooltip formatter={(v, name) => name === 'arrivals' ? `${v}M` : `$${v}B`} />} />
            <Bar dataKey="arrivals" name="Arrivals" radius={[0, 4, 4, 0]} barSize={18}>
              {filtered.map((entry) => (
                <Cell key={entry.country} fill={regionColors[entry.region] || '#6366f1'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(regionColors).map(([r, c]) => (
            <span key={r} className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} /> {r}
            </span>
          ))}
        </div>
      </div>

      <InsightCallout color="#10b981">
        France remains the undisputed #1 destination with 102M arrivals — the first country ever to surpass 100M annual tourists.
        But the real story is growth: Turks & Caicos exploded +127% vs 2019, Qatar +80%, and Morocco +35%.
        The Middle East is the fastest-recovering region at 132% of pre-pandemic levels.
      </InsightCallout>

      {/* Fastest Growing */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Fastest Growing Destinations</h3>
        <p className="text-xs text-gray-500 mb-4">% growth vs 2019 pre-pandemic levels</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fastestGrowing} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `+${v}%`} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 11 }} width={110} />
            <Tooltip content={<CustomTooltip formatter={(v) => `+${v}%`} />} />
            <Bar dataKey="growth" name="Growth vs 2019" radius={[0, 4, 4, 0]} barSize={16}>
              {fastestGrowing.map((entry, i) => (
                <Cell key={entry.country} fill={COLORS[i % COLORS.length]} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Recovery */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Regional Recovery Status (% of 2019 Levels)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {regionalRecovery.map((r) => {
            const isAbove = r.recoveryPct >= 100;
            return (
              <div key={r.region} className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 font-medium">{r.region}</p>
                <p className={`text-2xl font-bold mt-1 ${isAbove ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {r.recoveryPct}%
                </p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(r.recoveryPct, 135) / 1.35}%`,
                      backgroundColor: isAbove ? '#10b981' : '#f59e0b',
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{isAbove ? 'Exceeded 2019' : 'Still recovering'}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Cities Table */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Top 10 Most Visited Cities (2024)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 text-gray-500 font-medium">#</th>
                <th className="text-left py-2 text-gray-500 font-medium">City</th>
                <th className="text-left py-2 text-gray-500 font-medium">Country</th>
                <th className="text-right py-2 text-gray-500 font-medium">Arrivals</th>
                <th className="text-right py-2 text-gray-500 font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map((c) => (
                <tr key={c.city} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2.5 text-gray-500 font-bold">{c.rank}</td>
                  <td className="py-2.5 text-white font-medium">{c.city}</td>
                  <td className="py-2.5 text-gray-400">{c.country}</td>
                  <td className="py-2.5 text-right text-white font-bold">{c.arrivals}M</td>
                  <td className="py-2.5 text-right">
                    <span className="text-emerald-400 font-medium">+{c.growth}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
