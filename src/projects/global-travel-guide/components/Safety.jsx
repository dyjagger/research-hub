import React from 'react';
import { Shield, MapPin, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { safetyRankings } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const regionColors = { Europe: '#6366f1', 'Asia-Pacific': '#10b981', Americas: '#f59e0b', 'Middle East': '#f43f5e', Africa: '#8b5cf6', Oceania: '#06b6d4' };

export default function Safety() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="text-emerald-400" size={24} /> Travel Safety
        </h2>
        <p className="text-gray-400 text-sm mt-1">Safest countries for tourists — composite safety scores from Global Peace Index, Numbeo, and International SOS</p>
      </div>

      {/* Safety Bar Chart */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Safety Score by Country</h3>
        <p className="text-xs text-gray-500 mb-4">Composite score out of 10 — higher is safer</p>
        <ResponsiveContainer width="100%" height={460}>
          <BarChart data={safetyRankings} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[7, 10]} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#9ca3af', fontSize: 11 }} width={100} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}/10`} />} />
            <Bar dataKey="score" name="Safety Score" radius={[0, 4, 4, 0]} barSize={16}>
              {safetyRankings.map((entry) => (
                <Cell key={entry.country} fill={regionColors[entry.region] || '#6366f1'} fillOpacity={0.75} />
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
        Iceland tops the global safety rankings for the 15th consecutive year — near-zero violent crime and no military.
        Japan is the safest country in Asia (9.0/10) with ultra-safe cities even at night. Europe dominates the top 15
        with 10 entries. Canada is the safest in the Americas (8.5/10). Notable: Portugal (8.7) is both safe AND affordable.
      </InsightCallout>

      {/* Country Detail Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {safetyRankings.map((s) => {
          const scoreColor = s.score >= 9.0 ? '#10b981' : s.score >= 8.5 ? '#06b6d4' : '#f59e0b';
          return (
            <div key={s.country} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">#{s.rank}</span>
                  <h4 className="text-sm font-bold text-white">{s.country}</h4>
                </div>
                <span
                  className="text-sm font-bold px-2 py-0.5 rounded-lg"
                  style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}
                >
                  {s.score}
                </span>
              </div>
              <p className="text-xs text-gray-400">{s.notes}</p>
              <div className="mt-2 pt-2 border-t border-gray-800 flex items-center gap-2">
                <MapPin size={11} className="text-gray-600" />
                <span className="text-[10px] text-gray-500">{s.region}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Tips */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-400" /> Universal Safety Tips for Travelers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2 text-xs text-gray-400">
            <p className="text-gray-300 font-medium">Before You Go</p>
            <p>• Register with your embassy's travel notification system</p>
            <p>• Purchase comprehensive travel insurance (medical + evacuation)</p>
            <p>• Research local laws and customs — what's legal at home may not be abroad</p>
            <p>• Save offline copies of passport, insurance, and emergency contacts</p>
          </div>
          <div className="space-y-2 text-xs text-gray-400">
            <p className="text-gray-300 font-medium">While Traveling</p>
            <p>• Use hotel safes for valuables; carry copies, not originals</p>
            <p>• Stay aware in tourist-dense areas — pickpocketing is universal</p>
            <p>• Use licensed taxis or ride-sharing apps, especially at night</p>
            <p>• Trust your instincts — if something feels wrong, leave the situation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
