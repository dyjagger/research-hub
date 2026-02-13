import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { acquisitions } from '../data/limelightData';

const OUTCOME_COLORS = {
  'Integrated': '#10b981',
  'Sold': '#f59e0b',
  'Survived bankruptcy': '#8b5cf6',
  'Triggered rebrand': '#06b6d4',
};

function getOutcomeColor(outcome) {
  if (outcome.includes('Sold') || outcome.includes('sold')) return OUTCOME_COLORS['Sold'];
  if (outcome.includes('Integrated') || outcome.includes('Became')) return OUTCOME_COLORS['Integrated'];
  if (outcome.includes('rebrand') || outcome.includes('Uplynk')) return OUTCOME_COLORS['Triggered rebrand'];
  return '#64748b';
}

export default function Acquisitions() {
  const chartData = acquisitions
    .filter(a => a.value)
    .sort((a, b) => b.value - a.value);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Acquisitions & Strategy</h2>
        <p className="text-slate-400">7 acquisitions over 13 years — a mixed track record</p>
      </div>

      {/* Acquisition Value Chart */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6">
        <h3 className="text-white font-semibold mb-4">Acquisition Values ($M)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}M`} />
            <YAxis type="category" dataKey="company" stroke="#94a3b8" tick={{ fontSize: 12 }} width={90} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v}M`} />} />
            <Bar dataKey="value" name="Value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getOutcomeColor(entry.outcome)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="warning" title="The Edgecast Gamble">
        The $300M Edgecast acquisition in 2022 was a bet-the-company move. It doubled revenue overnight and
        added security + streaming capabilities — but integration failures, talent loss, and accounting issues
        turned the growth story into a bankruptcy filing just 2 years later.
      </InsightCallout>

      {/* Acquisition Cards */}
      <div className="space-y-4 mt-6">
        {acquisitions.map((a, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <span className="text-slate-300 text-xs font-mono">{a.year}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h4 className="text-white font-semibold">{a.company}</h4>
                {a.value && (
                  <span className="text-cyan-400 text-sm font-medium">${a.value}M</span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  {a.category}
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                <span className="font-medium text-slate-300">Outcome:</span> {a.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Acquisition Scorecard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-white text-2xl font-bold">7</p>
          <p className="text-slate-400 text-sm">Total Acquisitions</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-cyan-400 text-2xl font-bold">$440M+</p>
          <p className="text-slate-400 text-sm">Total Spent</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-amber-400 text-2xl font-bold">2</p>
          <p className="text-slate-400 text-sm">Later Sold/Divested</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-red-400 text-2xl font-bold">$300M</p>
          <p className="text-slate-400 text-sm">Edgecast (68% of total)</p>
        </div>
      </div>
    </div>
  );
}
