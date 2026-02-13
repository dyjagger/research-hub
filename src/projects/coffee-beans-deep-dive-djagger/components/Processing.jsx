import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { processingMethods, cuppingTiers } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

export default function Processing() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Processing Methods</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          How coffee is processed after harvest dramatically affects its flavor. The same bean can taste completely
          different depending on whether it's washed, natural, honey-processed, or anaerobically fermented.
        </p>
      </div>

      <InsightCallout color="amber">
        Anaerobic fermentation is the hottest trend in specialty coffee — sealed oxygen-free tanks create intense,
        wine-like flavors that are winning competitions worldwide. It pushes quality potential to a perfect 10,
        but requires precise control and expertise.
      </InsightCallout>

      {/* Quality Potential Chart */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">Quality Potential by Processing Method</h3>
        <p className="text-[10px] text-gray-500 mb-4">Maximum achievable cup quality (1–10 scale)</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={processingMethods} margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="method" tick={{ fill: '#d1d5db', fontSize: 10 }} angle={-15} textAnchor="end" height={50} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="qualityPotential" name="Quality Potential" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Processing method cards */}
      <div className="space-y-3">
        {processingMethods.map((m, i) => (
          <div key={m.method} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-white">{m.method}</h3>
                <p className="text-xs text-gray-400 mt-1">{m.description}</p>
              </div>
              <div className="flex-shrink-0 ml-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-400">{m.qualityPotential}</span>
                </div>
                <p className="text-[9px] text-gray-500 mt-1">Quality</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-[10px]">
              <span className="text-gray-500"><span className="text-gray-400">Flavor impact:</span> {m.flavorImpact}</span>
              <span className="text-gray-500"><span className="text-gray-400">Regions:</span> {m.regions}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SCA Cupping Tiers */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">SCA Cupping Score Tiers</h3>
        <p className="text-[10px] text-gray-500 mb-4">Specialty Coffee Association quality grading system (0–100 scale)</p>
        <div className="space-y-2">
          {cuppingTiers.map((t) => (
            <div key={t.tier} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
              <div className="w-16 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: `${t.color}30`, border: `1px solid ${t.color}40` }}>
                <span style={{ color: t.color }}>{t.scoreRange}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">{t.tier}</p>
                <p className="text-[10px] text-gray-500">{t.description}</p>
              </div>
              <p className="text-[10px] text-gray-500 max-w-[200px] text-right hidden md:block">{t.examples}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="cyan">
        Only coffees scoring 80+ on the SCA scale qualify as "specialty grade." This represents roughly the top 5–10%
        of all coffee produced globally. Below 80, coffee is classified as commercial grade — the vast majority of what
        you find in supermarkets and chain coffee shops.
      </InsightCallout>
    </div>
  );
}
