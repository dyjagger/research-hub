import React from 'react';
import { Music, Wine, Shield, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { nightlifeCities } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const ACCENT = '#a855f7';
const COLORS = ['#a855f7', '#f43f5e', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#6366f1', '#84cc16', '#ef4444', '#14b8a6'];

export default function Nightlife() {
  const drinkData = [...nightlifeCities].sort((a, b) => a.avgDrinkPrice - b.avgDrinkPrice);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Music className="text-violet-400" size={24} /> Nightlife & Entertainment
        </h2>
        <p className="text-gray-400 text-sm mt-1">The world's best cities for nightlife — bars, clubs, festivals, safety, and drink prices</p>
      </div>

      {/* City Cards */}
      <div className="grid md:grid-cols-2 gap-3">
        {nightlifeCities.map((c) => (
          <div key={c.city} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-violet-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-bold text-white">{c.city}</h4>
                <p className="text-[10px] text-gray-500">{c.country}</p>
              </div>
              <span className="text-xs font-bold text-violet-400">#{c.rank}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">{c.highlights}</p>
            <div className="bg-gray-800/40 rounded-lg px-3 py-2 mb-3">
              <p className="text-[10px] text-violet-300 italic">"{c.vibe}"</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wine size={13} className="text-rose-400" />
                <div>
                  <p className="text-[10px] text-gray-500">Avg Drink</p>
                  <p className="text-xs text-white font-bold">${c.avgDrinkPrice}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-emerald-400" />
                <div>
                  <p className="text-[10px] text-gray-500">Safety</p>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-white font-bold">{c.safetyRating}</p>
                    <span className="text-[10px] text-gray-500">/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InsightCallout color={ACCENT}>
        Tokyo is the safest nightlife city in the world (4.8/5) with the most eclectic scene — from tiny Golden Gai bars
        to robot restaurants. Berlin offers the cheapest drinks ($6 avg) with legendary 48-hour techno clubs. Dubai is the
        most expensive ($18/drink) but also one of the safest (4.7/5). Madrid's culture of 2am dinners makes it Europe's
        undisputed late-night capital.
      </InsightCallout>

      {/* Drink Price Comparison */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Average Drink Price by City</h3>
        <p className="text-xs text-gray-500 mb-4">Average cost of a cocktail/beer in USD — sorted cheapest to most expensive</p>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={drinkData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="city" tick={{ fill: '#9ca3af', fontSize: 11 }} width={100} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v}`} />} />
            <Bar dataKey="avgDrinkPrice" name="Avg Drink Price" radius={[0, 4, 4, 0]} barSize={16}>
              {drinkData.map((entry, i) => (
                <Cell key={entry.city} fill={COLORS[i % COLORS.length]} fillOpacity={0.75} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Safety vs Price Scatter (as cards) */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Safety vs Drink Price</h3>
        <p className="text-xs text-gray-500 mb-4">Finding the sweet spot — safe AND affordable nightlife</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[...nightlifeCities].sort((a, b) => (b.safetyRating / b.avgDrinkPrice) - (a.safetyRating / a.avgDrinkPrice)).map((c) => {
            const ratio = (c.safetyRating / c.avgDrinkPrice).toFixed(2);
            return (
              <div key={c.city} className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-white">{c.city}</p>
                <p className="text-lg font-bold mt-1" style={{ color: parseFloat(ratio) > 0.4 ? '#10b981' : parseFloat(ratio) > 0.25 ? '#f59e0b' : '#ef4444' }}>
                  {ratio}
                </p>
                <p className="text-[9px] text-gray-500">safety/$ ratio</p>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-gray-500 mt-3 text-center">Higher ratio = safer per dollar spent. Tokyo (0.60) and Berlin (0.65) lead.</p>
      </div>

      {/* Quick Tips */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Nightlife Quick Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-xs text-emerald-400 font-bold mb-2">Budget-Friendly</h4>
            <div className="space-y-1.5 text-xs text-gray-400">
              <p>• Bangkok — $4 avg drinks, vibrant street scene</p>
              <p>• Rio de Janeiro — $5 avg, samba & beach bars</p>
              <p>• Berlin — $6 avg, world-class techno clubs</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs text-amber-400 font-bold mb-2">Safest After Dark</h4>
            <div className="space-y-1.5 text-xs text-gray-400">
              <p>• Tokyo — 4.8/5, ultra-safe at all hours</p>
              <p>• Dubai — 4.7/5, strict but glamorous</p>
              <p>• Madrid — 4.2/5, late-night culture is the norm</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs text-violet-400 font-bold mb-2">Most Unique</h4>
            <div className="space-y-1.5 text-xs text-gray-400">
              <p>• Berlin — 48hr techno marathons, raw venues</p>
              <p>• Tokyo — Golden Gai, robot shows, karaoke</p>
              <p>• New York — Speakeasies, jazz, Broadway</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
