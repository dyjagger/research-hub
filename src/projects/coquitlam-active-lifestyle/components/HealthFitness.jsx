import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import InsightCallout from '../../../components/InsightCallout';
import { healthData, activities } from '../data/researchData';

const COLORS = {
  cardio: '#3b82f6',
  strength: '#ef4444',
  flexibility: '#a855f7',
  calories: '#f59e0b',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white mb-1">{d.fullName}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color || '#9ca3af' }}>
          {p.name}: {p.value}{p.name === 'Calories/hr' ? '' : '/5'}
        </p>
      ))}
    </div>
  );
}

function CalorieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white">{d.fullName}</p>
      <p className="text-xs text-amber-400">{d.caloriesPerHour} cal/hr</p>
      <p className="text-xs text-teal-400">Fun: {d.funScore}/10</p>
    </div>
  );
}

export default function HealthFitness() {
  const [metric, setMetric] = useState('cardio');

  const sortedByMetric = [...healthData].sort((a, b) => b[metric] - a[metric]);
  const sortedByCalories = [...healthData].sort((a, b) => b.caloriesPerHour - a.caloriesPerHour);

  const jointFriendlyList = activities.filter(a => a.jointFriendly);
  const notJointFriendly = activities.filter(a => !a.jointFriendly);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Health & Fitness</h2>
        <p className="text-gray-400">Cardiovascular benefit, strength, flexibility, injury risk, and joint-friendliness for your 40s</p>
      </div>

      <InsightCallout accent="teal">
        In your 40s, <strong>joint-friendly activities become increasingly important</strong>. 10 of 18 activities here are rated joint-friendly (low-impact on knees, hips, and back). Swimming, cycling, climbing, yoga, and kayaking top the list. Activities like BJJ and CrossFit deliver incredible fitness results but carry moderate injury risk — proper coaching and ego management are key.
      </InsightCallout>

      {/* Metric Selector */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'cardio', label: 'Cardio', color: 'blue' },
          { key: 'strength', label: 'Strength', color: 'red' },
          { key: 'flexibility', label: 'Flexibility', color: 'purple' },
        ].map(m => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              metric === m.key
                ? `bg-${m.color}-500/20 text-${m.color}-300 border border-${m.color}-500/30`
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Fitness Rating Chart */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">
          {metric.charAt(0).toUpperCase() + metric.slice(1)} Rating by Activity
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={sortedByMetric} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" domain={[0, 5]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} width={130} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={metric} name={metric.charAt(0).toUpperCase() + metric.slice(1)} radius={[0, 4, 4, 0]}>
              {sortedByMetric.map((_, i) => (
                <Cell key={i} fill={COLORS[metric]} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Calories Burned Chart */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">Calories Burned Per Hour</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={sortedByCalories} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `${v} cal`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} width={130} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="caloriesPerHour" name="Calories/hr" radius={[0, 4, 4, 0]}>
              {sortedByCalories.map((_, i) => (
                <Cell key={i} fill={COLORS.calories} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Joint-Friendly Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-emerald-400 mb-3">Joint-Friendly (Low Impact)</h4>
          <p className="text-xs text-gray-400 mb-3">Safe for knees, hips, and back — especially important in your 40s</p>
          <div className="space-y-2">
            {jointFriendlyList.map(a => (
              <div key={a.id} className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{a.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{a.caloriesPerHour} cal/hr</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    a.injuryRisk === 'Very Low' ? 'bg-emerald-500/20 text-emerald-400' :
                    a.injuryRisk === 'Low' ? 'bg-green-500/20 text-green-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>{a.injuryRisk} risk</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-amber-400 mb-3">Higher Impact (Manage Carefully)</h4>
          <p className="text-xs text-gray-400 mb-3">Great workouts but require proper form, warm-up, and recovery</p>
          <div className="space-y-2">
            {notJointFriendly.map(a => (
              <div key={a.id} className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{a.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{a.caloriesPerHour} cal/hr</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    a.injuryRisk === 'Moderate' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{a.injuryRisk} risk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 40s-Specific Tips */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Exercise Tips for Your 40s</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="space-y-2">
            <p><span className="text-teal-400 font-semibold">Warm up longer.</span> Your body needs 10-15 min to get ready, not the 5 min it needed at 25.</p>
            <p><span className="text-teal-400 font-semibold">Recovery days matter more.</span> Schedule at least 2 rest days per week. Active recovery (walking, yoga) is better than couch recovery.</p>
            <p><span className="text-teal-400 font-semibold">Diversify your activities.</span> Doing 2-3 different activities per week reduces overuse injury risk and keeps things interesting.</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-teal-400 font-semibold">Flexibility and mobility work.</span> Add 10 min of stretching after every session. Yoga once a week is a game-changer.</p>
            <p><span className="text-teal-400 font-semibold">Listen to your body.</span> Sharp pain = stop. Dull ache that persists = see a physiotherapist before it becomes chronic.</p>
            <p><span className="text-teal-400 font-semibold">Strength training is non-negotiable.</span> Muscle mass declines ~1% per year after 30. Climbing, CrossFit, or even bodyweight work helps.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
