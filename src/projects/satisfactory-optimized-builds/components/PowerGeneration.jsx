import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { powerGeneration, oilPowerEfficiency, coalSetup, nuclearSetup } from '../data/researchData';

const POWER_COLORS = {
  'Biomass Burner': '#84cc16',
  'Coal Generator': '#374151',
  'Fuel Generator (Fuel)': '#f97316',
  'Fuel Generator (Turbofuel)': '#ef4444',
  'Fuel Generator (Rocket Fuel)': '#a78bfa',
  'Fuel Generator (Ionized Fuel)': '#06b6d4',
  'Nuclear Power Plant (Uranium)': '#22c55e',
  'Nuclear Power Plant (Plutonium)': '#eab308',
  'Nuclear Power Plant (Ficsonium)': '#e879f9',
};

export default function PowerGeneration() {
  const [view, setView] = useState('overview');

  const mwData = powerGeneration.map((p) => ({
    name: p.source.replace('Fuel Generator ', 'Fuel Gen ').replace('Nuclear Power Plant ', 'Nuclear '),
    mw: p.mwPerBuilding,
    fullName: p.source,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Power Generation</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Power is the lifeblood of every Satisfactory factory. Understanding the efficiency
          of each power source — and how to maximize MW per resource — is critical for
          scaling production without running out of fuel.
        </p>
      </div>

      <InsightCallout color="emerald">
        Turbo Blend Fuel produces 400 MW per crude oil m³/min — nearly 5x more efficient than
        standard fuel processing. However, it requires a complex multi-step setup. For most players,
        Turbo Heavy Fuel (333 MW/oil) offers the best balance of efficiency and simplicity.
      </InsightCallout>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        {[
          { key: 'overview', label: 'All Sources' },
          { key: 'oil', label: 'Oil Efficiency' },
          { key: 'coal', label: 'Coal Setup' },
          { key: 'nuclear', label: 'Nuclear' },
        ].map((v) => (
          <button
            key={v.key}
            onClick={() => setView(v.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              view === v.key
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {view === 'overview' && (
        <>
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">MW per Building</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mwData} margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#d1d5db', fontSize: 9 }} angle={-25} textAnchor="end" height={80} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'MW', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="mw" name="MW per Building" radius={[4, 4, 0, 0]}>
                  {mwData.map((entry, i) => (
                    <Cell key={i} fill={POWER_COLORS[entry.fullName] || '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Source</th>
                  <th className="text-right py-2 px-3 text-gray-400 font-medium">MW</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Fuel</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Rate</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Tier</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {powerGeneration.map((p) => (
                  <tr key={p.source} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-3 text-white font-medium text-xs">{p.source}</td>
                    <td className="py-2 px-3 text-right text-amber-400 font-mono">{p.mwPerBuilding.toLocaleString()}</td>
                    <td className="py-2 px-3 text-gray-300 text-xs">{p.fuelType}</td>
                    <td className="py-2 px-3 text-gray-400 text-xs font-mono">{p.fuelRate}</td>
                    <td className="py-2 px-3 text-gray-400 text-xs">{p.tier}</td>
                    <td className="py-2 px-3 text-gray-500 text-xs">{p.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Oil Efficiency */}
      {view === 'oil' && (
        <>
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">MW per Crude Oil (m³/min)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={oilPowerEfficiency} margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="method" tick={{ fill: '#d1d5db', fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'MW per oil m³/min', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="mwPerOil" name="MW per Oil" radius={[4, 4, 0, 0]}>
                  {oilPowerEfficiency.map((entry, i) => {
                    const colors = ['#ef4444', '#f97316', '#fbbf24', '#22c55e', '#06b6d4'];
                    return <Cell key={i} fill={colors[i]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oilPowerEfficiency.map((o) => (
              <div key={o.method} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-white mb-1">{o.method}</h4>
                <p className="text-2xl font-bold text-amber-400">{o.mwPerOil} MW</p>
                <p className="text-xs text-gray-500 mt-1">per crude oil m³/min</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    o.complexity === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    o.complexity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    o.complexity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {o.complexity} complexity
                  </span>
                  <span className="text-[10px] text-gray-600">{o.recipe}</span>
                </div>
              </div>
            ))}
          </div>

          <InsightCallout color="amber">
            The jump from Standard Fuel (83 MW/oil) to Diluted Fuel (167 MW/oil) is the single
            biggest power efficiency gain — doubling output with moderate complexity. This should
            be every player's first oil power optimization.
          </InsightCallout>
        </>
      )}

      {/* Coal Setup */}
      {view === 'coal' && (
        <div className="space-y-6">
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Optimal Coal Power Setup</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">8</p>
                <p className="text-xs text-gray-500">Coal Generators</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">3</p>
                <p className="text-xs text-gray-500">Water Extractors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-400">{coalSetup.totalMW}</p>
                <p className="text-xs text-gray-500">MW Total</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">120</p>
                <p className="text-xs text-gray-500">Coal/min</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-400">
              <p><strong className="text-gray-200">Coal per generator:</strong> {coalSetup.coalPerGenerator}/min</p>
              <p><strong className="text-gray-200">Water per generator:</strong> {coalSetup.waterPerGenerator} m³/min</p>
              <p><strong className="text-gray-200">Total water for 8:</strong> {coalSetup.totalWaterFor8} m³/min</p>
              <p><strong className="text-gray-200">Water extractor output:</strong> {coalSetup.waterExtractorOutput} m³/min each</p>
              <p><strong className="text-gray-200">Mk.1 pipe limit:</strong> {coalSetup.pipelineMk1Limit} m³/min</p>
            </div>
          </div>

          <InsightCallout color="cyan">
            {coalSetup.notes} Scale by multiples: 16:6, 24:9, 32:12 generators-to-extractors.
            Each set of 8 generators produces 600 MW from a single normal coal node.
          </InsightCallout>
        </div>
      )}

      {/* Nuclear */}
      {view === 'nuclear' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Uranium Path */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-4">Uranium → Plutonium Path</h3>
              <ol className="space-y-2">
                {nuclearSetup.uraniumPath.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <p className="text-xs text-amber-400">{nuclearSetup.uraniumPath.wastePerReactor}</p>
                <p className="text-xs text-amber-400 mt-1">{nuclearSetup.uraniumPath.plutoniumWaste}</p>
              </div>
            </div>

            {/* Ficsonium Path */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-violet-400 mb-4">Ficsonium Path (Zero Waste)</h3>
              <ol className="space-y-2">
                {nuclearSetup.ficsoniumPath.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 p-3 rounded-lg bg-violet-500/5 border border-violet-500/10">
                <p className="text-xs text-violet-400">{nuclearSetup.ficsoniumPath.notes}</p>
              </div>
            </div>
          </div>

          <InsightCallout color="violet">
            For zero-waste nuclear: burn Uranium Fuel Rods, reprocess waste into Plutonium Fuel Rods,
            then SINK the plutonium rods (or burn them and sink the plutonium waste). Ficsonium is
            technically zero-waste but resource-inefficient — the community consensus is to avoid it
            for power and use the Uranium→Plutonium→Sink path instead.
          </InsightCallout>
        </div>
      )}
    </div>
  );
}
