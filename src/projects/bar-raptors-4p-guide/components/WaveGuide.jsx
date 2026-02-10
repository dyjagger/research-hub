import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { raptorWaves } from '../data/researchData';

const THREAT_COLORS = { Low: '#22c55e', Medium: '#f59e0b', High: '#ef4444', 'Very High': '#dc2626', Extreme: '#7c3aed' };

export default function WaveGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Wave Composition Guide</h1>
        <p className="text-gray-400 mt-1 text-sm">Raptor wave types, scaling, and how to counter each threat</p>
      </div>

      {/* Wave Scaling Chart */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Wave Intensity Scaling</h2>
        <p className="text-xs text-gray-500 mb-4">Ground, air, and special unit strength by wave number</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={raptorWaves.waveScaling}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="wave" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="groundStrength" name="Ground" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="airStrength" name="Air" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="specialChance" name="Special %" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 space-y-1">
          {raptorWaves.waveScaling.map((w, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="w-16 font-mono text-gray-500">Wave {w.wave}</span>
              <span className="text-gray-400">{w.description}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="red">
        <strong>RNG Warning:</strong> Wave sizes and timers have independent RNG between 0.5x and 2x. You can get a double-sized wave that arrives in half the normal time. Always over-prepare your defenses.
      </InsightCallout>

      {/* Ground Raptor Types */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Ground Raptor Types</h2>
        <div className="space-y-3">
          {raptorWaves.groundTypes.map((r, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{r.tier}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                      style={{ backgroundColor: `${THREAT_COLORS[r.threat]}15`, color: THREAT_COLORS[r.threat] }}
                    >
                      {r.threat} Threat
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{r.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-500">Appears: <strong className="text-gray-300">{r.appearsAt}</strong></span>
                    <span className="text-[10px] text-gray-500">Counter: <strong className="text-emerald-400">{r.counter}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Air Raptor Types */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Air Raptor Types</h2>
        <div className="space-y-3">
          {raptorWaves.airTypes.map((r, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{r.tier}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                      style={{ backgroundColor: `${THREAT_COLORS[r.threat]}15`, color: THREAT_COLORS[r.threat] }}
                    >
                      {r.threat} Threat
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{r.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-gray-500">Appears: <strong className="text-gray-300">{r.appearsAt}</strong></span>
                    <span className="text-[10px] text-gray-500">Counter: <strong className="text-blue-400">{r.counter}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="blue">
        <strong>Elemental Bombers</strong> are the #1 air threat. They have devastating AoE that can wipe out turret clusters. The Anti-Air player MUST have Mercury/Screamer long-range AA and dense Flak coverage before wave 10. After balance changes, max air squad ratio is capped at 25% of a wave.
      </InsightCallout>

      {/* Wave Response Checklist */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Wave Response Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-400 mb-2">Ground Wave Response</h3>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>• Walls intact? Repair gaps immediately with Con Turrets</li>
              <li>• Turrets firing? Check power — Bulwarks need energy to shoot</li>
              <li>• Raptors breaking through? Add more popup turrets at weak points</li>
              <li>• Matriarch spotted? Focus all Pulsars on it — call it out to team</li>
            </ul>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-2">Air Wave Response</h3>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>• Flak covering all angles? Air can come from any direction</li>
              <li>• Mercury/Screamer stocked? They build missiles over time</li>
              <li>• Elemental bombers? Set Mercury to Hold Fire, manual target</li>
              <li>• Paralyzing bombers? Kill before they reach — they disable turrets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
