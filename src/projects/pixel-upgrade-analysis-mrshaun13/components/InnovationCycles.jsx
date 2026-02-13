import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, RefreshCw } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { generationCycles } from '../data/researchData';

const CYCLE_COLORS = { TICK: '#10b981', TOCK: '#6366f1' };

const innovationData = generationCycles.map(g => ({
  name: g.label,
  score: g.innovationScore,
  type: g.cycleType,
}));

function CycleCard({ cycle, isYours }) {
  const isTick = cycle.cycleType === 'TICK';
  return (
    <div className={`border rounded-xl p-5 ${
      isYours
        ? 'bg-emerald-500/5 border-emerald-500/20'
        : isTick
          ? 'bg-emerald-500/5 border-emerald-500/15'
          : 'bg-indigo-500/5 border-indigo-500/15'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isTick ? <Zap className="w-4 h-4 text-emerald-400" /> : <RefreshCw className="w-4 h-4 text-indigo-400" />}
          <span className="text-sm font-bold text-white">{cycle.label}</span>
          <span className="text-[10px] text-gray-500">{cycle.year}</span>
          {isYours && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">YOUR PHONE</span>}
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
          isTick ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
        }`}>
          {cycle.cycleLabel}
        </span>
      </div>

      <h4 className="text-xs font-semibold text-gray-300 mb-2">{cycle.headline}</h4>

      <div className="space-y-1 mb-3">
        {cycle.keyInnovations.slice(0, 4).map((innovation, i) => (
          <p key={i} className="text-[11px] text-gray-400 flex items-start gap-1.5">
            <span className={isTick ? 'text-emerald-500' : 'text-indigo-500'}>•</span>
            {innovation}
          </p>
        ))}
        {cycle.keyInnovations.length > 4 && (
          <p className="text-[10px] text-gray-600">+{cycle.keyInnovations.length - 4} more</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
        <div><span className="text-gray-500">Chip:</span> <span className="text-gray-300">{cycle.chipJump}</span></div>
        <div><span className="text-gray-500">Camera:</span> <span className="text-gray-300">{cycle.cameraJump}</span></div>
        <div><span className="text-gray-500">Design:</span> <span className="text-gray-300">{cycle.designJump}</span></div>
        <div><span className="text-gray-500">Software:</span> <span className="text-gray-300">{cycle.softwareJump}</span></div>
      </div>

      {cycle.upgradeWorthFrom && (
        <p className="text-[10px] text-gray-500">
          <span className="font-medium text-gray-400">Worth upgrading from:</span> {cycle.upgradeWorthFrom}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-gray-800/50">
        <p className="text-xs text-gray-400 italic">{cycle.verdict}</p>
      </div>
    </div>
  );
}

export default function InnovationCycles() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Innovation Cycles (Tick-Tock)</h2>
        <p className="text-gray-400 text-sm">
          Like Intel's famous tick-tock cadence, Google alternates between major innovation years and refinement years.
          Understanding where you are in the cycle is key to timing your upgrade.
        </p>
      </div>

      <InsightCallout variant="insight" title="The Pattern Is Clear">
        <strong className="text-emerald-400">Tick years</strong> (Pixel 6, 8, 9) bring new designs, major camera upgrades, or platform shifts.{' '}
        <strong className="text-indigo-400">Tock years</strong> (Pixel 7, 10) refine the previous generation with better chips and minor tweaks.
        You bought during a tick. The Pixel 10 is a tock. The Pixel 11 will likely be the next tick — and that's when upgrading makes sense.
      </InsightCallout>

      {/* Innovation Score Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Innovation Score by Generation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={innovationData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={v => `${v}/10`} />} />
            <Bar dataKey="score" name="Innovation Score" radius={[6, 6, 0, 0]}>
              {innovationData.map((entry, i) => (
                <Cell key={i} fill={CYCLE_COLORS[entry.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Tick (Major Innovation)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-500 inline-block" /> Tock (Refinement)</span>
        </div>
      </div>

      {/* Generation Cards */}
      <div className="space-y-4">
        {generationCycles.map(cycle => (
          <CycleCard key={cycle.generation} cycle={cycle} isYours={cycle.generation === 9} />
        ))}
      </div>

      <InsightCallout variant="positive" title="If You Were on a Pixel 7 Pro or Older...">
        The upgrade math changes dramatically. From a Pixel 7 Pro, you'd gain: a complete design overhaul (Pixel 9's flat sides),
        a 42MP selfie camera (up from 10.8MP), Gemini built-in, 16GB RAM, the Tensor G5, Qi2, and 7 years of updates.
        That's two tick cycles of innovation — a massive upgrade. From a Pixel 6 Pro, it's even more compelling.
      </InsightCallout>
    </div>
  );
}
