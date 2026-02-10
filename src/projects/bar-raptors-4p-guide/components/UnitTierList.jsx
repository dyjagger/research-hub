import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { unitTierList, factionComparison } from '../data/researchData';

const TIER_COLORS = { S: '#ef4444', A: '#f59e0b', B: '#3b82f6', C: '#6b7280' };
const TIER_BG = { S: 'bg-red-500/10 border-red-500/30', A: 'bg-amber-500/10 border-amber-500/30', B: 'bg-blue-500/10 border-blue-500/30', C: 'bg-gray-500/10 border-gray-500/30' };
const TYPE_FILTERS = ['All', 'Defense', 'AA', 'Economy', 'Bot', 'Wall'];

export default function UnitTierList() {
  const [typeFilter, setTypeFilter] = useState('All');
  const filtered = typeFilter === 'All' ? unitTierList : unitTierList.filter((u) => u.type === typeFilter);

  const dpsChartData = unitTierList
    .filter((u) => u.dps > 0)
    .sort((a, b) => b.dps - a.dps)
    .slice(0, 10)
    .map((u) => ({ name: u.name, DPS: u.dps, color: TIER_COLORS[u.rating] }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Unit & Structure Tier List</h1>
        <p className="text-gray-400 mt-1 text-sm">Best units ranked by effectiveness against Raptors</p>
      </div>

      {/* DPS Chart */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Top 10 DPS — Combat Units & Turrets</h2>
        <p className="text-xs text-gray-500 mb-4">Damage per second for units relevant to Raptors defense</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dpsChartData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => v.toLocaleString()} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#d1d5db', fontSize: 11 }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="DPS" radius={[0, 4, 4, 0]}>
                {dpsChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout color="violet">
        <strong>Juggernaut dominates:</strong> At 4,187 DPS and 149,000 HP, the Cortex Juggernaut is the single most important unit for killing the Raptor Queen. Build 3-4 of them. The Armada Titan is good but has less than half the HP and a third of the DPS.
      </InsightCallout>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              typeFilter === t ? 'bg-red-500/20 text-red-400' : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/70'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tier List */}
      {['S', 'A', 'B', 'C'].map((tier) => {
        const tierUnits = filtered.filter((u) => u.rating === tier);
        if (tierUnits.length === 0) return null;
        return (
          <div key={tier} className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                style={{ backgroundColor: `${TIER_COLORS[tier]}20`, color: TIER_COLORS[tier] }}
              >
                {tier}
              </span>
              <span className="text-sm font-semibold text-gray-300">
                {tier === 'S' ? 'Essential' : tier === 'A' ? 'Very Strong' : tier === 'B' ? 'Strong' : 'Situational'}
              </span>
            </div>
            <div className="space-y-1.5">
              {tierUnits.map((unit, i) => (
                <div key={i} className={`rounded-xl border p-4 ${TIER_BG[tier]}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">{unit.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{unit.faction}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{unit.tier}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{unit.type}</span>
                      </div>
                      <p className="text-xs text-gray-400">{unit.role}</p>
                    </div>
                    <div className="flex gap-4 flex-shrink-0 text-right">
                      {unit.hp > 0 && (
                        <div>
                          <p className="text-[10px] text-gray-500">HP</p>
                          <p className="text-xs font-bold text-gray-300">{unit.hp.toLocaleString()}</p>
                        </div>
                      )}
                      {unit.dps > 0 && (
                        <div>
                          <p className="text-[10px] text-gray-500">DPS</p>
                          <p className="text-xs font-bold" style={{ color: TIER_COLORS[tier] }}>{unit.dps.toLocaleString()}</p>
                        </div>
                      )}
                      {unit.range > 0 && (
                        <div>
                          <p className="text-[10px] text-gray-500">Range</p>
                          <p className="text-xs font-bold text-gray-300">{unit.range.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Faction Comparison */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Armada vs Cortex — Raptors Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Category</th>
                <th className="text-left py-2 px-3 text-blue-400 font-medium">Armada</th>
                <th className="text-left py-2 px-3 text-red-400 font-medium">Cortex</th>
                <th className="text-left py-2 px-3 text-amber-400 font-medium">Winner</th>
              </tr>
            </thead>
            <tbody>
              {factionComparison.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="py-2 px-3 text-gray-300 font-medium">{row.category}</td>
                  <td className="py-2 px-3 text-gray-400 text-xs">{row.armada}</td>
                  <td className="py-2 px-3 text-gray-400 text-xs">{row.cortex}</td>
                  <td className="py-2 px-3">
                    <span className={`text-xs font-semibold ${row.winner === 'Cortex' ? 'text-red-400' : row.winner === 'Armada' ? 'text-blue-400' : 'text-gray-400'}`}>
                      {row.winner}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Recommendation: In a 4-player team, have 2-3 players go Cortex (especially the Heavy Weapons player for Juggernauts) and 1-2 Armada (for Pulsars and Titans as backup).</p>
      </div>
    </div>
  );
}
