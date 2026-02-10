import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { productionRatios, conveyorBelts, minerOutput } from '../data/researchData';

export default function ProductionRatios() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Production Ratios</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Optimal machine ratios ensure 100% efficiency — no machine sits idle, no belt overflows.
          These ratios are calculated from base recipe rates and represent the foundation of
          any well-designed factory.
        </p>
      </div>

      <InsightCallout color="amber">
        The most common beginner mistake is not matching smelter-to-constructor ratios.
        A single Mk.1 Miner on a normal node outputs 60 ore/min. A Smelter processes 30/min,
        so you always need 2 Smelters per Miner. From there, constructor counts depend on the recipe.
      </InsightCallout>

      {/* Conveyor Belt Speeds */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Conveyor Belt Throughput</h3>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={conveyorBelts} margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="mark" tick={{ fill: '#d1d5db', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'Items/min', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="speed" name="Items/min" radius={[4, 4, 0, 0]}>
                {conveyorBelts.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {conveyorBelts.map((b) => (
              <span key={b.mark} className="text-[10px] text-gray-500">
                <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: b.color }} />
                {b.mark}: {b.speed}/min ({b.tier})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Miner Output Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Miner Output by Purity (items/min)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Miner</th>
                <th className="text-right py-2 px-3 text-red-400 font-medium">Impure</th>
                <th className="text-right py-2 px-3 text-amber-400 font-medium">Normal</th>
                <th className="text-right py-2 px-3 text-emerald-400 font-medium">Pure</th>
              </tr>
            </thead>
            <tbody>
              {minerOutput.map((m) => (
                <tr key={m.miner} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white font-medium">{m.miner}</td>
                  <td className="py-2 px-3 text-right text-red-400 font-mono">{m.impure}</td>
                  <td className="py-2 px-3 text-right text-amber-400 font-mono">{m.normal}</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-mono">{m.pure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: Mk.3 Miner @250% on a Pure node outputs 900/min — exactly matching the Mk.6 belt cap.
          This is the theoretical maximum extraction rate per node.
        </p>
      </div>

      {/* Production Ratios Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Production Ratios (Normal Node, Mk.1 Miner @ 60/min)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Product</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Smelters</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Constructors</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Output/min</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Min Belt</th>
              </tr>
            </thead>
            <tbody>
              {productionRatios.map((r) => (
                <tr key={r.product} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white font-medium">{r.product}</td>
                  <td className="py-2 px-3 text-right text-amber-400 font-mono">{r.smelters || r.foundries || 0}</td>
                  <td className="py-2 px-3 text-right text-cyan-400 font-mono">{r.constructors}</td>
                  <td className="py-2 px-3 text-right text-emerald-400 font-mono">{r.outputPerMin}</td>
                  <td className="py-2 px-3 text-gray-300">{r.beltMark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout color="cyan">
        Manifold designs (single input belt feeding machines in series) are the easiest to build
        and scale. While load-balancers distribute items evenly, manifolds achieve 100% throughput
        once the line saturates — and they're far simpler to construct and expand.
      </InsightCallout>

      {/* Building Tips */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Optimization Tips</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">1.</span>
            <span><strong className="text-gray-200">Always match ratios first.</strong> An unbalanced line wastes both power and space.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">2.</span>
            <span><strong className="text-gray-200">Use manifold designs.</strong> They self-balance over time and are trivial to extend.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">3.</span>
            <span><strong className="text-gray-200">Plan for belt upgrades.</strong> Leave space for higher-tier belts as you progress.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">4.</span>
            <span><strong className="text-gray-200">Underclock to 100% efficiency.</strong> Two machines at 50% use less power than one at 100%.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">5.</span>
            <span><strong className="text-gray-200">Use Somersloops wisely.</strong> Double output on bottleneck machines for maximum impact.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
