import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { curricula } from '../data/curricula';
import InsightCallout from './InsightCallout';

const costData = curricula
  .map(c => ({
    name: c.name,
    low: c.annualCostLow,
    high: c.annualCostHigh,
    range: c.annualCostHigh - c.annualCostLow,
    allSubjects: c.allSubjects,
    advancedFriendly: c.advancedFriendly,
    type: c.type,
  }))
  .sort((a, b) => a.low - b.low);

const valueData = curricula.map(c => ({
  name: c.name,
  cost: (c.annualCostLow + c.annualCostHigh) / 2,
  advanced: c.advancedFriendly,
  rating: c.rating,
  allSubjects: c.allSubjects,
}));

const barColors = {
  0: '#10b981',
  1: '#34d399',
  2: '#6ee7b7',
  3: '#fbbf24',
  4: '#f59e0b',
  5: '#ef4444',
};

const getBarColor = (low) => {
  if (low === 0) return '#10b981';
  if (low < 100) return '#34d399';
  if (low < 300) return '#fbbf24';
  if (low < 500) return '#f59e0b';
  if (low < 700) return '#fb923c';
  return '#ef4444';
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl text-sm">
      <p className="font-bold text-white mb-1">{d.name}</p>
      <p className="text-gray-300">
        Cost: <span className={d.low === 0 ? 'text-emerald-400' : 'text-amber-400'}>{d.low === 0 ? 'FREE' : `$${d.low}`}</span> – <span className="text-amber-400">${d.high}</span>/year
      </p>
      <p className="text-gray-400 text-xs mt-1">{d.allSubjects ? 'All subjects included' : 'Single subject'}</p>
    </div>
  );
};

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl text-sm">
      <p className="font-bold text-white mb-1">{d.name}</p>
      <p className="text-gray-300">Avg Cost: <span className="text-amber-400">${d.cost.toFixed(0)}</span>/year</p>
      <p className="text-gray-300">Advanced Score: <span className="text-violet-400">{d.advanced}/5</span></p>
      <p className="text-gray-300">Rating: <span className="text-amber-400">{d.rating}</span></p>
      <p className="text-gray-400 text-xs mt-1">{d.allSubjects ? 'All subjects' : 'Single subject'}</p>
    </div>
  );
};

export default function CostAnalysis() {
  const [showAllSubjectsOnly, setShowAllSubjectsOnly] = useState(false);

  const filteredCost = showAllSubjectsOnly ? costData.filter(d => d.allSubjects) : costData;
  const filteredValue = showAllSubjectsOnly ? valueData.filter(d => d.allSubjects) : valueData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Cost Analysis</h1>
        <p className="text-gray-400">Annual cost comparison across all curricula — from free to premium</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowAllSubjectsOnly(!showAllSubjectsOnly)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            showAllSubjectsOnly ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700'
          }`}
        >
          {showAllSubjectsOnly ? '✓ All-in-One Only' : 'Show All-in-One Only'}
        </button>
        <span className="text-xs text-gray-600">
          {showAllSubjectsOnly ? 'Comparing apples to apples — full curriculum packages only' : 'Showing all curricula including single-subject'}
        </span>
      </div>

      <InsightCallout variant="tip" title="Budget-Friendly Doesn't Mean Low Quality">
        <strong className="text-white">The Good and the Beautiful</strong> offers FREE Language Arts downloads and math for $38–$48/level.
        Combined with <strong className="text-white">Beast Academy</strong> ($96/year online) for advanced math, you could have a world-class
        curriculum for under $200/year total. Compare that to $1,000+ for BJU Press or Sonlight.
      </InsightCallout>

      {/* Cost Range Bar Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Annual Cost Range by Curriculum</h3>
        <p className="text-sm text-gray-500 mb-4">Low end to high end of annual cost per student</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredCost} layout="vertical" margin={{ left: 120, right: 20, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={v => `$${v}`} domain={[0, 'auto']} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#d1d5db', fontSize: 12 }} width={110} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="low" stackId="cost" fill="#374151" radius={[4, 0, 0, 4]} />
            <Bar dataKey="range" stackId="cost" radius={[0, 4, 4, 0]}>
              {filteredCost.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.low)} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 text-center mt-2">Green = most affordable • Orange/Red = premium pricing</p>
      </div>

      {/* Value Scatter Plot */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-1">Cost vs. Advanced-Friendliness</h3>
        <p className="text-sm text-gray-500 mb-4">The sweet spot: high advanced-friendly score at reasonable cost (top-left quadrant)</p>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="cost"
              name="Avg Annual Cost"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={v => `$${v}`}
              label={{ value: 'Average Annual Cost', position: 'bottom', fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="advanced"
              name="Advanced Score"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              domain={[0, 6]}
              label={{ value: 'Advanced-Friendly Score', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
            />
            <ZAxis type="number" dataKey="rating" range={[80, 300]} />
            <Tooltip content={<ScatterTooltip />} />
            <Scatter data={filteredValue} fill="#8b5cf6" fillOpacity={0.8} />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 text-center mt-2">Bubble size = user rating • Top-left = best value for advanced learners</p>
      </div>

      {/* Cost Breakdown Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Sample Annual Budget Scenarios</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-emerald-500/20">
            <p className="text-emerald-400 font-bold text-lg mb-1">Budget Build</p>
            <p className="text-xs text-gray-500 mb-3">~$200–$350/year</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• TGTB Language Arts — <span className="text-emerald-400">FREE</span></li>
              <li>• TGTB Math — <span className="text-gray-400">$48</span></li>
              <li>• TGTB Science — <span className="text-gray-400">$38</span></li>
              <li>• TGTB History — <span className="text-gray-400">$58</span></li>
              <li>• Beast Academy Online — <span className="text-gray-400">$96</span></li>
              <li className="pt-2 border-t border-gray-700 font-medium text-emerald-400">Total: ~$240/year</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-amber-500/20">
            <p className="text-amber-400 font-bold text-lg mb-1">Mid-Range Build</p>
            <p className="text-xs text-gray-500 mb-3">~$500–$800/year</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Singapore Math — <span className="text-gray-400">$120</span></li>
              <li>• Sonlight Core — <span className="text-gray-400">$500</span></li>
              <li>• Apologia Science — <span className="text-gray-400">$85</span></li>
              <li className="pt-2 border-t border-gray-700 font-medium text-amber-400">Total: ~$705/year</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-violet-500/20">
            <p className="text-violet-400 font-bold text-lg mb-1">Premium Build</p>
            <p className="text-xs text-gray-500 mb-3">~$1,000–$1,500/year</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• BJU Press Video (all subjects) — <span className="text-gray-400">$1,100</span></li>
              <li>• Beast Academy supplement — <span className="text-gray-400">$96</span></li>
              <li className="pt-2 border-t border-gray-700 font-medium text-violet-400">Total: ~$1,196/year</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
