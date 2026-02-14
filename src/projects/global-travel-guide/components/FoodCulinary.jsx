import React, { useState } from 'react';
import { UtensilsCrossed, Star, Flame, ChefHat } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { foodDestinations } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const ACCENT = '#f43f5e';
const COLORS = ['#f43f5e', '#f59e0b', '#10b981', '#6366f1', '#06b6d4', '#ec4899', '#8b5cf6', '#84cc16', '#ef4444', '#14b8a6', '#a855f7', '#eab308'];

export default function FoodCulinary() {
  const [selected, setSelected] = useState(null);

  const radarData = selected
    ? [
        { metric: 'Street Food', value: selected.streetFood },
        { metric: 'Fine Dining', value: selected.fineDining },
        { metric: 'Variety', value: selected.variety },
        { metric: 'Michelin (scaled)', value: Math.min(selected.michelinStars / 130, 5) },
      ]
    : [];

  const michelinData = [...foodDestinations].sort((a, b) => b.michelinStars - a.michelinStars);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <UtensilsCrossed className="text-rose-400" size={24} /> Food & Culinary
        </h2>
        <p className="text-gray-400 text-sm mt-1">The world's best food destinations — street food, fine dining, cuisine diversity, and Michelin stars</p>
      </div>

      {/* Food Destination Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {foodDestinations.map((f) => {
          const isSelected = selected?.country === f.country;
          return (
            <button
              key={f.country}
              onClick={() => setSelected(isSelected ? null : f)}
              className={`text-left bg-gray-900/60 border rounded-xl p-4 transition-all hover:border-rose-500/40 ${
                isSelected ? 'border-rose-500/60 ring-1 ring-rose-500/20' : 'border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{f.flag}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{f.country}</h4>
                    <p className="text-[10px] text-gray-500">{f.cuisine} Cuisine</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-400">#{f.rank}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{f.highlights}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Flame key={i} size={10} className={i < f.streetFood ? 'text-orange-400' : 'text-gray-700'} />
                    ))}
                  </div>
                  <p className="text-[9px] text-gray-500">Street Food</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < f.fineDining ? 'text-amber-400' : 'text-gray-700'} />
                    ))}
                  </div>
                  <p className="text-[9px] text-gray-500">Fine Dining</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <ChefHat key={i} size={10} className={i < f.variety ? 'text-emerald-400' : 'text-gray-700'} />
                    ))}
                  </div>
                  <p className="text-[9px] text-gray-500">Variety</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">Michelin Stars</span>
                <span className="text-xs font-bold text-amber-300">{f.michelinStars}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Radar Chart for Selected Country */}
      {selected && (
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-1">
            {selected.flag} {selected.country} — Culinary Profile
          </h3>
          <p className="text-xs text-gray-500 mb-4">Scores out of 5 — Michelin scaled to 5-point range</p>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar name={selected.country} dataKey="value" stroke={ACCENT} fill={ACCENT} fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <InsightCallout color={ACCENT}>
        Japan leads the world with 413 Michelin stars — more than any other country — yet its street food scene is equally
        legendary. France dominates fine dining with 632 stars but scores lower on street food accessibility. For the best
        all-around food experience combining street food, variety, and fine dining, Italy, Japan, and Thailand are the holy trinity.
      </InsightCallout>

      {/* Michelin Stars Bar Chart */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Michelin Stars by Country</h3>
        <p className="text-xs text-gray-500 mb-4">Total Michelin-starred restaurants per country</p>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={michelinData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 11 }} width={85} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v} stars`} />} />
            <Bar dataKey="michelinStars" name="Michelin Stars" radius={[0, 4, 4, 0]} barSize={16}>
              {michelinData.map((entry, i) => (
                <Cell key={entry.country} fill={COLORS[i % COLORS.length]} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Reference Table */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Quick Culinary Reference</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs text-rose-400 font-bold mb-2">Best Street Food</h4>
            <div className="space-y-1.5">
              {foodDestinations.filter((f) => f.streetFood === 5).map((f) => (
                <div key={f.country} className="flex items-center gap-2 text-xs">
                  <span>{f.flag}</span>
                  <span className="text-gray-300">{f.country}</span>
                  <span className="text-gray-600">—</span>
                  <span className="text-gray-500">{f.highlights.split(',')[0]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs text-amber-400 font-bold mb-2">Best Fine Dining</h4>
            <div className="space-y-1.5">
              {foodDestinations.filter((f) => f.fineDining === 5).map((f) => (
                <div key={f.country} className="flex items-center gap-2 text-xs">
                  <span>{f.flag}</span>
                  <span className="text-gray-300">{f.country}</span>
                  <span className="text-gray-600">—</span>
                  <span className="text-gray-500">{f.michelinStars} Michelin stars</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
