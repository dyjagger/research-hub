import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Legend } from 'recharts';
import { arabicaVarieties } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const AVAILABILITY_COLORS = {
  'Common': '#22c55e',
  'Moderate': '#3b82f6',
  'Rare': '#f59e0b',
  'Very Rare': '#ef4444',
};

export default function Varieties() {
  const [sortBy, setSortBy] = useState('flavorRating');

  const sorted = [...arabicaVarieties].sort((a, b) => b[sortBy] - a[sortBy]);

  const scatterData = arabicaVarieties.map((v) => ({
    name: v.name,
    flavorRating: v.flavorRating,
    caffeinePercent: v.caffeinePercent,
    availability: v.availability,
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Arabica Varieties</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Within Arabica alone, there are hundreds of cultivars — each with distinct flavor characteristics,
          yield potential, and disease resistance. These are the 15 most significant varieties in specialty coffee.
        </p>
      </div>

      <InsightCallout color="emerald">
        Geisha/Gesha is the undisputed king of specialty coffee — routinely scoring 90+ in cupping competitions and
        fetching over $1,000/lb at auction. But Pink Bourbon and Wush Wush are emerging as the next "it" varieties,
        with complex fruit-forward profiles that rival Geisha at a fraction of the price.
      </InsightCallout>

      {/* Flavor Rating Bar Chart */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Variety Rankings</h3>
            <p className="text-[10px] text-gray-500">Sorted by selected metric</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50"
          >
            <option value="flavorRating">Flavor Rating</option>
            <option value="caffeinePercent">Caffeine %</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={sortBy === 'flavorRating' ? [5, 10] : [0.8, 1.5]} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#d1d5db', fontSize: 11 }} width={110} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={sortBy} name={sortBy === 'flavorRating' ? 'Flavor Rating' : 'Caffeine %'} fill={sortBy === 'flavorRating' ? '#f59e0b' : '#eab308'} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Variety detail table */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Complete Variety Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Variety</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Origin</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">Flavor</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">Caffeine</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Cupping</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Availability</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Yield</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Disease Res.</th>
                <th className="text-left py-2 px-2 text-gray-400 font-medium">Flavor Notes</th>
              </tr>
            </thead>
            <tbody>
              {arabicaVarieties.map((v) => (
                <tr key={v.name} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-2 text-white font-medium">{v.name}</td>
                  <td className="py-2 px-2 text-gray-400">{v.origin}</td>
                  <td className="py-2 px-2 text-right text-amber-400 font-semibold">{v.flavorRating}</td>
                  <td className="py-2 px-2 text-right text-yellow-400">{v.caffeinePercent}%</td>
                  <td className="py-2 px-2 text-gray-300">{v.cuppingScore}</td>
                  <td className="py-2 px-2">
                    <span style={{ color: AVAILABILITY_COLORS[v.availability] || '#9ca3af' }}>{v.availability}</span>
                  </td>
                  <td className="py-2 px-2 text-gray-400">{v.yieldLevel}</td>
                  <td className="py-2 px-2 text-gray-400">{v.diseaseResistance}</td>
                  <td className="py-2 px-2 text-gray-500 max-w-[180px] truncate" title={v.flavorNotes}>{v.flavorNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout color="amber">
        There's an inverse relationship between flavor quality and practical farming traits. The highest-rated varieties
        (Geisha, Pink Bourbon, Wush Wush) have very low yields and poor disease resistance. Meanwhile, Catimor — bred
        for maximum disease resistance — scores lowest in flavor. This is the fundamental tension in coffee agriculture.
      </InsightCallout>
    </div>
  );
}
