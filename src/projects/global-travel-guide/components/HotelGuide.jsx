import React, { useState } from 'react';
import { Hotel, Star, DollarSign, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { hotelPrices, hotelValueByRegion } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const ACCENT = '#f59e0b';

export default function HotelGuide() {
  const [sortBy, setSortBy] = useState('avg');
  const sorted = [...hotelPrices].sort((a, b) => sortBy === 'valueIndex' ? b.valueIndex - a.valueIndex : b[sortBy] - a[sortBy]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Hotel className="text-amber-400" size={24} /> Hotel Guide
        </h2>
        <p className="text-gray-400 text-sm mt-1">Average nightly rates, budget vs luxury pricing, and value index by country & region</p>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500">Sort by:</span>
        {[
          { key: 'avg', label: 'Avg Price' },
          { key: 'budget', label: 'Budget Price' },
          { key: 'luxury', label: 'Luxury Price' },
          { key: 'valueIndex', label: 'Best Value' },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              sortBy === s.key ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Price Comparison Chart */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Hotel Prices by Country</h3>
        <p className="text-xs text-gray-500 mb-4">Budget (cheapest) → Average → Luxury (most expensive) per night in USD</p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 11 }} width={85} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v}/night`} />} />
            <Bar dataKey="budget" name="Budget" fill="#10b981" fillOpacity={0.7} radius={[0, 2, 2, 0]} barSize={8} stackId="price" />
            <Bar dataKey="avg" name="Average" fill="#f59e0b" fillOpacity={0.7} radius={[0, 2, 2, 0]} barSize={8} />
            <Bar dataKey="luxury" name="Luxury" fill="#f43f5e" fillOpacity={0.7} radius={[0, 4, 4, 0]} barSize={8} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Budget</span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-amber-500" /> Average</span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-rose-500" /> Luxury</span>
        </div>
      </div>

      <InsightCallout color={ACCENT}>
        Malaysia offers the best hotel value globally (index 0.84) — low prices ($64 avg), high ratings (8.4/10), and 88 hotels to choose from.
        Indonesia has the cheapest rooms on Earth at $14/night minimum. France is the priciest at $339 avg but earns the highest guest ratings (8.7).
        The UAE punches above its weight — despite its luxury reputation, average rooms are just $93/night.
      </InsightCallout>

      {/* Hotel Value Index by Region */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Hotel Value Index by Region</h3>
        <p className="text-xs text-gray-500 mb-4">Composite score: price affordability × guest rating × hotel density (higher = better value)</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hotelValueByRegion} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 1]} />
            <YAxis type="category" dataKey="region" tick={{ fill: '#9ca3af', fontSize: 11 }} width={120} />
            <Tooltip content={<CustomTooltip formatter={(v) => v.toFixed(2)} />} />
            <Bar dataKey="valueIndex" name="Value Index" radius={[0, 4, 4, 0]} barSize={18}>
              {hotelValueByRegion.map((entry, i) => (
                <Cell key={entry.region} fill={entry.valueIndex >= 0.65 ? '#10b981' : entry.valueIndex >= 0.5 ? '#f59e0b' : '#ef4444'} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Country Detail Cards */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Country Hotel Breakdown</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {hotelPrices.map((h) => (
            <div key={h.country} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-white">{h.country}</h4>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400" />
                  <span className="text-xs text-amber-300 font-medium">{h.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-gray-500">Budget</p>
                  <p className="text-sm font-bold text-emerald-400">${h.budget}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Average</p>
                  <p className="text-sm font-bold text-amber-400">${h.avg}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Luxury</p>
                  <p className="text-sm font-bold text-rose-400">${h.luxury}</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Value Index</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-cyan-500" style={{ width: `${h.valueIndex * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-cyan-400 font-medium">{h.valueIndex.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
