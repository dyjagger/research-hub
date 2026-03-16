import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import InsightCallout from '../../../components/InsightCallout';
import { costComparisonData, activities } from '../data/researchData';

const COLORS = { startup: '#14b8a6', monthly: '#6366f1' };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const item = costComparisonData.find(d => d.name === label);
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white mb-1">{item?.fullName || label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: ${p.value}
        </p>
      ))}
    </div>
  );
}

export default function CostComparison() {
  const [view, setView] = useState('monthly');

  const freeActivities = activities.filter(a => a.monthlyCost.max === 0);
  const cheapActivities = activities.filter(a => a.monthlyCost.max <= 50 && a.monthlyCost.max > 0);
  const midActivities = activities.filter(a => a.monthlyCost.max > 50 && a.monthlyCost.max <= 150);
  const premiumActivities = activities.filter(a => a.monthlyCost.max > 150);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Cost Comparison</h2>
        <p className="text-gray-400">What you'll spend to get started and keep going</p>
      </div>

      <InsightCallout accent="teal">
        <strong>5 of 18 activities are completely free</strong> for ongoing costs (hiking, trail running, road cycling, mountain biking, outdoor tennis/courts). City recreation passes in Coquitlam ($43.30/mo) and Burnaby (Be Active Pass) unlock swimming, fitness classes, skating, gym sports, and more — incredible value for the variety offered.
      </InsightCallout>

      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('monthly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${view === 'monthly' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
        >
          Monthly Cost
        </button>
        <button
          onClick={() => setView('startup')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${view === 'startup' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
        >
          Startup Cost
        </button>
      </div>

      {/* Chart */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-4">
          {view === 'monthly' ? 'Average Monthly Cost by Activity' : 'Average Startup Cost by Activity'}
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={costComparisonData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} width={130} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={view === 'monthly' ? 'monthlyAvg' : 'startupAvg'} name={view === 'monthly' ? 'Monthly Avg' : 'Startup Avg'} radius={[0, 4, 4, 0]}>
              {costComparisonData.map((entry, i) => (
                <Cell key={i} fill={view === 'monthly' ? COLORS.monthly : COLORS.startup} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-emerald-400 mb-2">Free (Ongoing)</h4>
          <ul className="space-y-1">
            {freeActivities.map(a => (
              <li key={a.id} className="text-xs text-gray-300 flex justify-between">
                <span>{a.name}</span>
                <span className="text-emerald-400">$0/mo</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">Startup costs range from $0 (hiking) to $3,000 (mountain bike)</p>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-teal-400 mb-2">Budget-Friendly ($7–$50/mo)</h4>
          <ul className="space-y-1">
            {cheapActivities.map(a => (
              <li key={a.id} className="text-xs text-gray-300 flex justify-between">
                <span>{a.name}</span>
                <span className="text-teal-400">${a.monthlyCost.min}–${a.monthlyCost.max}/mo</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">City recreation passes are the best value here</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-400 mb-2">Mid-Range ($50–$150/mo)</h4>
          <ul className="space-y-1">
            {midActivities.map(a => (
              <li key={a.id} className="text-xs text-gray-300 flex justify-between">
                <span>{a.name}</span>
                <span className="text-blue-400">${a.monthlyCost.min}–${a.monthlyCost.max}/mo</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-violet-400 mb-2">Premium ($150+/mo)</h4>
          <ul className="space-y-1">
            {premiumActivities.map(a => (
              <li key={a.id} className="text-xs text-gray-300 flex justify-between">
                <span>{a.name}</span>
                <span className="text-violet-400">${a.monthlyCost.min}–${a.monthlyCost.max}/mo</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-2">Highest engagement/retention — members get hooked</p>
        </div>
      </div>
    </div>
  );
}
