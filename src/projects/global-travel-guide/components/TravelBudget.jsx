import React, { useState } from 'react';
import { Wallet, TrendingDown, Globe, ArrowUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { dailyCostsByRegion } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const ACCENT = '#10b981';
const tierColors = { ultraBudget: '#10b981', budget: '#06b6d4', mid: '#f59e0b', luxury: '#f43f5e' };

export default function TravelBudget() {
  const [sortBy, setSortBy] = useState('ultraBudget');
  const sorted = [...dailyCostsByRegion].sort((a, b) => a[sortBy] - b[sortBy]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wallet className="text-emerald-400" size={24} /> Travel Budget
        </h2>
        <p className="text-gray-400 text-sm mt-1">Daily travel costs by region and budget tier — plan your trip at any price point</p>
      </div>

      {/* Budget Tier Legend */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Budget Tiers Explained</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-emerald-400">Ultra Budget</p>
            <p className="text-lg font-bold text-white mt-1">$20–$50/day</p>
            <p className="text-[10px] text-gray-400 mt-1">Hostels, street food, local transport, free activities</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-cyan-400">Budget</p>
            <p className="text-lg font-bold text-white mt-1">$50–$120/day</p>
            <p className="text-[10px] text-gray-400 mt-1">Budget hotels, local restaurants, some paid activities</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-400">Mid-Range</p>
            <p className="text-lg font-bold text-white mt-1">$100–$250/day</p>
            <p className="text-[10px] text-gray-400 mt-1">3-4★ hotels, nice restaurants, guided tours</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-rose-400">Luxury</p>
            <p className="text-lg font-bold text-white mt-1">$250–$550/day</p>
            <p className="text-[10px] text-gray-400 mt-1">5★ hotels, fine dining, private tours, premium experiences</p>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <ArrowUpDown size={14} className="text-gray-500" />
        <span className="text-xs text-gray-500">Sort by:</span>
        {[
          { key: 'ultraBudget', label: 'Ultra Budget', color: '#10b981' },
          { key: 'budget', label: 'Budget', color: '#06b6d4' },
          { key: 'mid', label: 'Mid-Range', color: '#f59e0b' },
          { key: 'luxury', label: 'Luxury', color: '#f43f5e' },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setSortBy(s.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              sortBy === s.key ? 'text-white border' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
            style={sortBy === s.key ? { backgroundColor: `${s.color}20`, borderColor: `${s.color}50`, color: s.color } : {}}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Grouped Bar Chart */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Daily Travel Costs by Region</h3>
        <p className="text-xs text-gray-500 mb-4">USD per day — all 4 budget tiers compared across 10 global regions</p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="region" tick={{ fill: '#9ca3af', fontSize: 10 }} width={110} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v}/day`} />} />
            <Bar dataKey="ultraBudget" name="Ultra Budget" fill="#10b981" fillOpacity={0.7} barSize={6} radius={[0, 2, 2, 0]} />
            <Bar dataKey="budget" name="Budget" fill="#06b6d4" fillOpacity={0.7} barSize={6} radius={[0, 2, 2, 0]} />
            <Bar dataKey="mid" name="Mid-Range" fill="#f59e0b" fillOpacity={0.7} barSize={6} radius={[0, 2, 2, 0]} />
            <Bar dataKey="luxury" name="Luxury" fill="#f43f5e" fillOpacity={0.7} barSize={6} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3">
          {Object.entries(tierColors).map(([k, c]) => (
            <span key={k} className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
              {k === 'ultraBudget' ? 'Ultra Budget' : k === 'mid' ? 'Mid-Range' : k.charAt(0).toUpperCase() + k.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <InsightCallout color={ACCENT}>
        Southeast Asia is the undisputed champion for budget travel — $22/day gets you comfortable accommodation, incredible
        street food, and local transport. Western Europe and East Asia are 6x more expensive at the ultra-budget level.
        Africa offers the widest price range: $35/day backpacking to $400/day luxury safari. The Middle East surprises
        with affordable mid-range options despite its luxury reputation.
      </InsightCallout>

      {/* Region Detail Cards */}
      <div className="grid md:grid-cols-2 gap-3">
        {sorted.map((r) => (
          <div key={r.region} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white">{r.region}</h4>
              <Globe size={14} className="text-gray-600" />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="text-center">
                <p className="text-[9px] text-emerald-400 font-medium">Ultra</p>
                <p className="text-sm font-bold text-white">${r.ultraBudget}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-cyan-400 font-medium">Budget</p>
                <p className="text-sm font-bold text-white">${r.budget}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-amber-400 font-medium">Mid</p>
                <p className="text-sm font-bold text-white">${r.mid}</p>
              </div>
              <div className="text-center">
                <p className="text-[9px] text-rose-400 font-medium">Luxury</p>
                <p className="text-sm font-bold text-white">${r.luxury}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-800">
              <p className="text-[10px] text-gray-500">Best for: <span className="text-gray-400">{r.bestFor}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Trip Cost Calculator */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Quick Trip Cost Estimates</h3>
        <p className="text-xs text-gray-500 mb-4">Estimated total cost for a 7-day and 14-day trip (excluding flights)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 text-gray-500 font-medium">Region</th>
                <th className="text-right py-2 text-gray-500 font-medium">7d Budget</th>
                <th className="text-right py-2 text-gray-500 font-medium">7d Mid</th>
                <th className="text-right py-2 text-gray-500 font-medium">14d Budget</th>
                <th className="text-right py-2 text-gray-500 font-medium">14d Mid</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.region} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2.5 text-white font-medium">{r.region}</td>
                  <td className="py-2.5 text-right text-emerald-400 font-bold">${(r.budget * 7).toLocaleString()}</td>
                  <td className="py-2.5 text-right text-amber-400 font-bold">${(r.mid * 7).toLocaleString()}</td>
                  <td className="py-2.5 text-right text-emerald-400">${(r.budget * 14).toLocaleString()}</td>
                  <td className="py-2.5 text-right text-amber-400">${(r.mid * 14).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
