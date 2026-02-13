import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { speciesData } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const PIE_COLORS = ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Overview() {
  const pieData = speciesData.map((s) => ({ name: s.species, value: s.globalShare }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">The World of Coffee Beans</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          A comprehensive deep dive into every major coffee species, variety, and cultivar — from the ubiquitous Arabica
          to ultra-rare animal-digested beans. Covering flavor profiles, caffeine content, quality ratings, global production, and rarity.
        </p>
      </div>

      <InsightCallout color="amber">
        There are over 120 species in the Coffea genus, but only 4 are commercially significant. Arabica alone accounts for ~60% of global production,
        yet Ethiopia — where it originated — has over 10,000 identified varieties, most still unclassified.
      </InsightCallout>

      {/* Species cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speciesData.map((s, i) => (
          <div key={s.species} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${PIE_COLORS[i]}20`, color: PIE_COLORS[i] }}>
                {s.globalShare}%
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{s.species}</h3>
                <p className="text-[10px] text-gray-500 italic">{s.scientificName}</p>
              </div>
              <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border ${
                s.availability === 'Very Common' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                s.availability === 'Rare' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>{s.availability}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">{s.description}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Caffeine</p>
                <p className="text-sm font-semibold text-yellow-400">{s.caffeinePercent}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Flavor</p>
                <p className="text-sm font-semibold text-rose-400">{s.flavorRating}/10</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-[10px] text-gray-500">Altitude</p>
                <p className="text-sm font-semibold text-cyan-400">{s.altitude}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2"><span className="text-gray-400">Flavor:</span> {s.flavorNotes}</p>
            <p className="text-[10px] text-gray-500 mt-1"><span className="text-gray-400">Top producers:</span> {s.topProducers.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Global Market Share Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-1">Global Market Share by Species</h3>
          <p className="text-[10px] text-gray-500 mb-4">Percentage of world coffee production (2024/2025)</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-1">Caffeine Content by Species</h3>
          <p className="text-[10px] text-gray-500 mb-4">Percentage of caffeine by dry weight</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={speciesData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 2.5]} unit="%" />
              <YAxis type="category" dataKey="species" tick={{ fill: '#d1d5db', fontSize: 12 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="caffeinePercent" name="Caffeine %" fill="#eab308" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout color="emerald">
        Robusta has nearly double the caffeine of Arabica (2.2% vs 1.2%), which acts as a natural pesticide — making Robusta
        far more disease-resistant. Surprisingly, Liberica has slightly more caffeine than Arabica despite being less commercially popular.
      </InsightCallout>
    </div>
  );
}
