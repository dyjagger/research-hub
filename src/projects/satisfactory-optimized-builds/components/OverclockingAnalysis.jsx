import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, BarChart, Bar, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { overclockingData, buildingPower } from '../data/researchData';

export default function OverclockingAnalysis() {
  const efficiencyBreakpoints = [
    { clock: '50%', production: '0.50x', power: '0.40x', efficiency: '125%', verdict: 'Best efficiency', color: '#22c55e' },
    { clock: '100%', production: '1.00x', power: '1.00x', efficiency: '100%', verdict: 'Baseline', color: '#fbbf24' },
    { clock: '150%', production: '1.50x', power: '1.72x', efficiency: '87%', verdict: 'Moderate waste', color: '#f97316' },
    { clock: '200%', production: '2.00x', power: '2.50x', efficiency: '80%', verdict: 'Significant waste', color: '#ef4444' },
    { clock: '250%', production: '2.50x', power: '3.36x', efficiency: '74%', verdict: 'Maximum waste', color: '#dc2626' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Overclocking Analysis</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Overclocking follows a power-law curve: power consumption scales as (clock/100)^1.321928.
          This means overclocking is always power-inefficient — but underclocking is always
          power-efficient. Understanding this curve is key to optimizing power budgets.
        </p>
      </div>

      <InsightCallout color="rose">
        Running two machines at 50% clock speed produces the same output as one at 100% — but uses
        only 80% of the power. This "underclock and duplicate" strategy is the most powerful
        power-saving technique in the game, especially for high-power buildings like Manufacturers (55 MW)
        and Particle Accelerators (1500 MW).
      </InsightCallout>

      {/* Power Curve Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Overclocking Power Curve</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={overclockingData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="clockSpeed"
              tick={{ fill: '#d1d5db', fontSize: 11 }}
              label={{ value: 'Clock Speed (%)', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              label={{ value: 'Multiplier', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine x={100} stroke="#4b5563" strokeDasharray="5 5" label={{ value: '100%', fill: '#6b7280', fontSize: 10 }} />
            <Line type="monotone" dataKey="productionMultiplier" name="Production" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="powerMultiplier" name="Power Cost" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Formula: Power Multiplier = (Clock Speed / 100) ^ 1.321928
        </p>
      </div>

      {/* Efficiency Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Power Efficiency by Clock Speed</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={overclockingData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="clockSpeed"
              tick={{ fill: '#d1d5db', fontSize: 11 }}
              label={{ value: 'Clock Speed (%)', position: 'insideBottom', offset: -5, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              domain={[60, 160]}
              label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={100} stroke="#4b5563" strokeDasharray="5 5" label={{ value: 'Baseline', fill: '#6b7280', fontSize: 10 }} />
            <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Above 100% = more efficient than baseline. Below 100% = wasting power.
        </p>
      </div>

      {/* Breakpoint Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Breakpoints</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Clock Speed</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Production</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Power Cost</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Efficiency</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {efficiencyBreakpoints.map((b) => (
                <tr key={b.clock} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white font-mono font-medium">{b.clock}</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-mono">{b.production}</td>
                  <td className="py-2 px-3 text-right text-rose-400 font-mono">{b.power}</td>
                  <td className="py-2 px-3 text-right font-mono" style={{ color: b.color }}>{b.efficiency}</td>
                  <td className="py-2 px-3" style={{ color: b.color }}>{b.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Building Power Consumption */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Building Power Consumption (Base)</h3>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={buildingPower} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="building" tick={{ fill: '#d1d5db', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'MW', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="power" name="Base MW" radius={[4, 4, 0, 0]}>
                {buildingPower.map((entry, i) => {
                  const color = entry.power >= 1000 ? '#ef4444' : entry.power >= 50 ? '#f97316' : entry.power >= 15 ? '#fbbf24' : '#22c55e';
                  return <Cell key={i} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">When to Overclock vs Underclock</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Underclock (Save Power)</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>- Manufacturers (55 MW base) — biggest power savings</li>
              <li>- Particle Accelerators (1500 MW) — massive savings potential</li>
              <li>- Any building where you have spare machines</li>
              <li>- When power is your bottleneck, not space</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Overclock (Save Space)</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li>- Miners — only way to exceed base extraction rate</li>
              <li>- Mk.3 Miner @250% on Pure = 900/min (belt cap)</li>
              <li>- When space is limited but power is abundant</li>
              <li>- Single bottleneck machines in a chain</li>
            </ul>
          </div>
        </div>
      </div>

      <InsightCallout color="cyan">
        The exception to "never overclock": Miners. Overclocking miners is the ONLY way to extract
        more than the base rate from a node. A Mk.3 Miner at 250% on a Pure node hits 900/min —
        the theoretical maximum and the exact cap of a Mk.6 belt.
      </InsightCallout>
    </div>
  );
}
