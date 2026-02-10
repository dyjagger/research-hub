import React from 'react';
import { Skull, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { queenStrategy } from '../data/researchData';

const DPS_COLORS = ['#a855f7', '#3b82f6', '#ef4444', '#f59e0b'];

export default function QueenKill() {
  const dpsData = queenStrategy.killComposition.map((u) => ({
    name: u.unit,
    value: u.dpsContribution,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Queen Kill Strategy</h1>
        <p className="text-gray-400 mt-1 text-sm">Endgame composition and tactics for defeating the Raptor Queen</p>
      </div>

      <InsightCallout color="rose">
        <strong>Do NOT destroy all raptor burrows!</strong> This triggers an early queen spawn before you're ready. Let the rage bar fill naturally to 100% while you build up your T3 forces. Patience wins the endgame.
      </InsightCallout>

      {/* Queen Stats */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Skull className="w-5 h-5 text-red-400" />
          Raptor Queen — Stats (Epic/Survival)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(queenStrategy.queenStats).map(([key, value]) => (
            <div key={key} className="bg-gray-800/40 rounded-lg p-3">
              <p className="text-xs text-gray-500 capitalize mb-0.5">{key}</p>
              <p className="text-sm text-gray-200">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kill Composition */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Optimal Kill Composition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dpsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {dpsData.map((_, i) => (
                    <Cell key={i} fill={DPS_COLORS[i]} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Unit Breakdown */}
          <div className="space-y-3">
            {queenStrategy.killComposition.map((unit, i) => (
              <div key={i} className="bg-gray-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{unit.unit}</span>
                  <span className="text-xs font-bold" style={{ color: DPS_COLORS[i] }}>x{unit.count}</span>
                </div>
                <p className="text-xs text-gray-400">{unit.role}</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${unit.dpsContribution}%`, backgroundColor: DPS_COLORS[i] }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">{unit.dpsContribution}% of total DPS contribution</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tactics */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Queen Fight Tactics
        </h2>
        <div className="space-y-2">
          {queenStrategy.tactics.map((tactic, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3">
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i < 3 ? 'text-red-400' : 'text-amber-400'}`} />
              <span className="text-sm text-gray-300">{tactic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Queen Fight Timeline */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Queen Fight Phase Breakdown</h2>
        <div className="space-y-4">
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-red-400 mb-1">Phase 1: Queen Approaches (100% Rage)</h3>
            <p className="text-xs text-gray-300">Queen spawns and begins walking toward your base. LRPCs should start firing immediately. She's slow but unstoppable — she walks through walls and turrets. All players redirect fire toward her approach path.</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-1">Phase 2: Engagement Range (Queen reaches turrets)</h3>
            <p className="text-xs text-gray-300">Juggernauts and Titans engage. Position them in a semicircle so they all fire simultaneously. Pulsars unleash 10K+ damage bursts. Con Turrets repair T3 units between queen attacks. Keep economy running — you need energy for Bulwarks and shields.</p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-purple-400 mb-1">Phase 3: Sustained DPS (Grind her down)</h3>
            <p className="text-xs text-gray-300">This is a war of attrition. The queen has 800K-1.2M HP on Epic/Survival. Keep Juggernauts alive with Con Turrets. If a Juggernaut falls, have backup units queued from the Experimental Gantry. All 4 players should contribute firepower — even the Economy Lead should have some Pulsars.</p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-emerald-400 mb-1">Phase 4: Victory</h3>
            <p className="text-xs text-gray-300">Queen dies. Game won. On Epic difficulty with 4 coordinated players, the queen fight typically lasts 3-8 minutes depending on your T3 count and LRPC coverage. More Juggernauts = faster kill.</p>
          </div>
        </div>
      </div>

      <InsightCallout color="violet">
        <strong>Pro tip:</strong> The Heavy Weapons player should start building Juggernauts by minute 25. You want 3-4 ready before the queen spawns. Each Juggernaut costs 22,000 metal — the Economy Lead must be producing 5K+ metal/sec to sustain this.
      </InsightCallout>
    </div>
  );
}
