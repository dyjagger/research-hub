import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import InsightCallout from '../../../components/InsightCallout';
import { activities, categories } from '../data/researchData';

const BARRIER_KEYS = ['skill', 'fitness', 'equipment', 'cost'];
const BARRIER_LABELS = { skill: 'Skill', fitness: 'Fitness', equipment: 'Equipment', cost: 'Cost' };

function getBarrierAvg(activity) {
  return Object.values(activity.barrier).reduce((a, b) => a + b, 0) / BARRIER_KEYS.length;
}

function BarrierBar({ label, value, max = 5 }) {
  const pct = (value / max) * 100;
  const color = value <= 1 ? 'bg-emerald-400' : value <= 2 ? 'bg-teal-400' : value <= 3 ? 'bg-amber-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-20">{label}</span>
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-300 w-6 text-right">{value}/5</span>
    </div>
  );
}

export default function BarrierToEntry() {
  const [selectedId, setSelectedId] = useState(null);
  const sorted = [...activities].sort((a, b) => getBarrierAvg(a) - getBarrierAvg(b));

  const easiest = sorted.slice(0, 6);
  const hardest = sorted.slice(-4);

  const selectedActivity = selectedId ? activities.find(a => a.id === selectedId) : null;
  const radarData = selectedActivity
    ? BARRIER_KEYS.map(k => ({ axis: BARRIER_LABELS[k], value: selectedActivity.barrier[k] }))
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Barrier to Entry</h2>
        <p className="text-gray-400">How easy is it to walk in and start? Rated on 4 dimensions (1 = lowest barrier, 5 = highest)</p>
      </div>

      <InsightCallout accent="teal">
        <strong>Pickleball, hiking, and badminton</strong> have the lowest barriers to entry — minimal skill, fitness, or equipment needed to start enjoying them immediately. <strong>Hockey and mountain biking</strong> have the highest barriers due to equipment costs and prerequisite skills (skating, bike handling).
      </InsightCallout>

      {/* Easiest to Start */}
      <div>
        <h3 className="text-lg font-semibold text-emerald-400 mb-3">Easiest to Start</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {easiest.map(a => {
            const cat = categories.find(c => c.id === a.category);
            return (
              <div
                key={a.id}
                className={`bg-gray-800/50 rounded-xl border p-4 cursor-pointer transition-all ${selectedId === a.id ? 'border-teal-500/50 bg-teal-500/5' : 'border-gray-700/50 hover:border-gray-600'}`}
                onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color }} />
                  <span className="text-sm font-semibold text-white">{a.name}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">
                    Avg {getBarrierAvg(a).toFixed(1)}/5
                  </span>
                </div>
                <div className="space-y-1.5">
                  {BARRIER_KEYS.map(k => (
                    <BarrierBar key={k} label={BARRIER_LABELS[k]} value={a.barrier[k]} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Radar Chart for Selected */}
      {selectedActivity && radarData && (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">Barrier Profile: {selectedActivity.name}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar name="Barrier" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 text-center mt-1">Smaller area = lower barrier to entry</p>
        </div>
      )}

      {/* Highest Barriers */}
      <div>
        <h3 className="text-lg font-semibold text-amber-400 mb-3">Highest Barriers (Worth It Though)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hardest.map(a => {
            const cat = categories.find(c => c.id === a.category);
            return (
              <div
                key={a.id}
                className={`bg-gray-800/50 rounded-xl border p-4 cursor-pointer transition-all ${selectedId === a.id ? 'border-teal-500/50 bg-teal-500/5' : 'border-gray-700/50 hover:border-gray-600'}`}
                onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat?.color }} />
                  <span className="text-sm font-semibold text-white">{a.name}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                    Avg {getBarrierAvg(a).toFixed(1)}/5
                  </span>
                </div>
                <div className="space-y-1.5">
                  {BARRIER_KEYS.map(k => (
                    <BarrierBar key={k} label={BARRIER_LABELS[k]} value={a.barrier[k]} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Ranking */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Full Barrier Ranking (Easiest → Hardest)</h3>
        <div className="space-y-2">
          {sorted.map((a, i) => {
            const avg = getBarrierAvg(a);
            const pct = (avg / 5) * 100;
            const color = avg <= 1.5 ? 'bg-emerald-400' : avg <= 2.5 ? 'bg-teal-400' : avg <= 3 ? 'bg-amber-400' : 'bg-red-400';
            return (
              <div key={a.id} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-5 text-right">{i + 1}</span>
                <span className="text-xs text-gray-300 w-40 truncate">{a.name}</span>
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-10 text-right">{avg.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
