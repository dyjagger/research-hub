import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { resourceNodes } from '../data/researchData';

const PURITY_COLORS = { impure: '#ef4444', normal: '#fbbf24', pure: '#22c55e' };

export default function ResourceMap() {
  const [sortBy, setSortBy] = useState('total');

  const sorted = [...resourceNodes].sort((a, b) => b[sortBy] - a[sortBy]);

  const totalNodes = resourceNodes.reduce((s, r) => s + r.total, 0);
  const totalImpure = resourceNodes.reduce((s, r) => s + r.impure, 0);
  const totalNormal = resourceNodes.reduce((s, r) => s + r.normal, 0);
  const totalPure = resourceNodes.reduce((s, r) => s + r.pure, 0);

  const purityBreakdown = [
    { name: 'Impure', value: totalImpure, color: PURITY_COLORS.impure },
    { name: 'Normal', value: totalNormal, color: PURITY_COLORS.normal },
    { name: 'Pure', value: totalPure, color: PURITY_COLORS.pure },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Resource Node Distribution</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          The Satisfactory map contains {totalNodes} resource nodes across 11 resource types
          and 3 purity levels. Understanding node distribution is the foundation of factory planning —
          it determines maximum theoretical throughput and optimal factory placement.
        </p>
      </div>

      <InsightCallout color="cyan">
        Iron Ore dominates with 127 nodes (27.7% of all nodes), while Uranium has only 5 nodes —
        making nuclear fuel rod production the tightest bottleneck in endgame. Crude Oil's 30 nodes
        produce up to 12,600 m³/min, but optimized alternate recipes can stretch each drop 4x further.
      </InsightCallout>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalNodes}</p>
          <p className="text-xs text-gray-500">Total Nodes</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{totalImpure}</p>
          <p className="text-xs text-gray-500">Impure</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{totalNormal}</p>
          <p className="text-xs text-gray-500">Normal</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{totalPure}</p>
          <p className="text-xs text-gray-500">Pure</p>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Sort by:</span>
        {['total', 'pure', 'maxExtraction'].map((key) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              sortBy === key
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
            }`}
          >
            {key === 'total' ? 'Total Nodes' : key === 'pure' ? 'Pure Nodes' : 'Max Extraction'}
          </button>
        ))}
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Nodes by Resource & Purity</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sorted} layout="vertical" margin={{ left: 100, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis type="category" dataKey="resource" tick={{ fill: '#d1d5db', fontSize: 11 }} width={95} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="impure" name="Impure" stackId="a" fill={PURITY_COLORS.impure} radius={[0, 0, 0, 0]} />
            <Bar dataKey="normal" name="Normal" stackId="a" fill={PURITY_COLORS.normal} />
            <Bar dataKey="pure" name="Pure" stackId="a" fill={PURITY_COLORS.pure} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Max Extraction Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Maximum Extraction Rates (All Nodes, Mk.3 Miner @250%)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Resource</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Impure</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Normal</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Pure</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Total</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Max /min</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.resource} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 font-medium" style={{ color: r.color }}>{r.resource}</td>
                  <td className="py-2 px-3 text-right text-red-400">{r.impure}</td>
                  <td className="py-2 px-3 text-right text-amber-400">{r.normal}</td>
                  <td className="py-2 px-3 text-right text-emerald-400">{r.pure}</td>
                  <td className="py-2 px-3 text-right text-white font-semibold">{r.total}</td>
                  <td className="py-2 px-3 text-right text-cyan-400 font-mono">{r.maxExtraction.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purity Breakdown Pie */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Overall Purity Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={purityBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              >
                {purityBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
