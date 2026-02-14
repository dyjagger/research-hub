import React, { useState } from 'react';
import { Compass, Mountain, Waves, Camera, TreePine, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { topAttractions, adventureActivities, topBeaches } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const typeColors = {
  Landmark: '#f59e0b', Historical: '#6366f1', Archaeological: '#8b5cf6', Nature: '#10b981',
  Monument: '#f43f5e', Temple: '#ec4899', Architecture: '#06b6d4', Island: '#14b8a6',
  Safari: '#84cc16', Museum: '#a855f7',
};
const regionColors = { Europe: '#6366f1', 'Asia-Pacific': '#10b981', Americas: '#f59e0b', 'Middle East': '#f43f5e', Africa: '#8b5cf6', Oceania: '#06b6d4' };

export default function Activities() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [tab, setTab] = useState('attractions');
  const types = ['All', ...new Set(topAttractions.map((a) => a.type))];
  const filteredAttractions = typeFilter === 'All' ? topAttractions : topAttractions.filter((a) => a.type === typeFilter);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Compass className="text-emerald-400" size={24} /> Activities & Attractions
        </h2>
        <p className="text-gray-400 text-sm mt-1">World-class attractions, adventure activities, and stunning beaches</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        {[
          { key: 'attractions', label: 'Top Attractions', icon: Camera },
          { key: 'adventure', label: 'Adventure Activities', icon: Mountain },
          { key: 'beaches', label: 'Best Beaches', icon: Waves },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              tab === t.key ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ATTRACTIONS TAB */}
      {tab === 'attractions' && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-gray-500" />
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  typeFilter === t ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Annual Visitors (Millions)</h3>
            <p className="text-xs text-gray-500 mb-4">Top global attractions by estimated annual visitor count</p>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={filteredAttractions} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} width={120} />
                <Tooltip content={<CustomTooltip formatter={(v, name) => name === 'annualVisitors' ? `${v}M visitors` : `${v}/5`} />} />
                <Bar dataKey="annualVisitors" name="Annual Visitors" radius={[0, 4, 4, 0]} barSize={16}>
                  {filteredAttractions.map((entry) => (
                    <Cell key={entry.name} fill={typeColors[entry.type] || '#6366f1'} fillOpacity={0.75} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries(typeColors).slice(0, 6).map(([t, c]) => (
                <span key={t} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} /> {t}
                </span>
              ))}
            </div>
          </div>

          <InsightCallout color="#10b981">
            The Great Wall of China draws 10M+ visitors annually — more than any other single attraction. But the highest-rated
            experiences are nature-based: Great Barrier Reef and Serengeti both score 4.9/5. Europe dominates the attraction
            count but Asia-Pacific and the Americas hold the most awe-inspiring natural wonders.
          </InsightCallout>

          {/* Attraction Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAttractions.map((a) => (
              <div key={a.name} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${typeColors[a.type]}20`, color: typeColors[a.type] }}>
                    {a.type}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${regionColors[a.region]}20`, color: regionColors[a.region] }}>
                    {a.region}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{a.name}</h4>
                <p className="text-xs text-gray-500">{a.city}, {a.country}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-1">
                    <Camera size={11} className="text-gray-500" />
                    <span className="text-xs text-gray-400">{a.annualVisitors}M/yr</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-amber-300">{a.rating}</span>
                    <span className="text-[10px] text-gray-500">/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ADVENTURE TAB */}
      {tab === 'adventure' && (
        <>
          <InsightCallout color="#8b5cf6">
            Safari is the most premium adventure activity ($200–$800/day) but offers an unmatched wildlife experience.
            Scuba diving and hiking offer the best value-to-thrill ratio. Southeast Asia and Central America are the
            top regions for affordable adventure travel.
          </InsightCallout>

          <div className="grid md:grid-cols-2 gap-3">
            {adventureActivities.map((a) => (
              <div key={a.activity} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-violet-500/30 transition-all">
                <h4 className="text-sm font-bold text-white mb-1">{a.activity}</h4>
                <p className="text-xs text-gray-400 mb-3">{a.topDest}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Difficulty</p>
                    <p className="text-xs text-violet-300 font-medium">{a.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Avg Cost</p>
                    <p className="text-xs text-emerald-300 font-medium">{a.avgCost}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Best Season</p>
                    <p className="text-xs text-amber-300 font-medium">{a.season}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* BEACHES TAB */}
      {tab === 'beaches' && (
        <>
          <InsightCallout color="#06b6d4">
            Whitehaven Beach in Australia tops the 2025 global beach rankings — pristine white silica sand with minimal crowds.
            The Caribbean dominates with multiple entries, but the Indian Ocean (Seychelles) and Mediterranean (Greece) offer
            equally stunning alternatives with warmer water temperatures.
          </InsightCallout>

          <div className="grid md:grid-cols-2 gap-3">
            {topBeaches.map((b) => (
              <div key={b.beach} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-cyan-400">#{b.rank}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${regionColors[b.region]}20`, color: regionColors[b.region] }}>
                    {b.region}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{b.beach}</h4>
                <p className="text-xs text-gray-500 mb-3">{b.country}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Water Temp</p>
                    <p className="text-xs text-cyan-300 font-medium">{b.waterTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Crowds</p>
                    <p className={`text-xs font-medium ${b.crowdLevel === 'Low' ? 'text-emerald-300' : b.crowdLevel === 'Medium' ? 'text-amber-300' : 'text-rose-300'}`}>
                      {b.crowdLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Vibe</p>
                    <p className="text-xs text-gray-300">{b.vibe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
