import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  Zap, Pickaxe, Factory, ChevronDown, ChevronUp, Rocket, Lightbulb,
  ArrowRight, CheckCircle2, Info,
} from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { tierProgression } from '../data/researchData';

const PHASE_COLORS = {
  Early: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', bar: '#22c55e' },
  Mid: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', bar: '#f59e0b' },
  Late: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', bar: '#ef4444' },
  Endgame: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', bar: '#8b5cf6' },
};

function TierCard({ tier, isExpanded, onToggle }) {
  const phase = PHASE_COLORS[tier.phase] || PHASE_COLORS.Early;
  const totalBuildings = tier.buildings.reduce((sum, b) => {
    const count = typeof b.count === 'number' ? b.count : parseInt(b.count) || 0;
    return sum + count;
  }, 0);
  const totalMiners = tier.oreNodes.reduce((sum, n) => {
    const miners = typeof n.miners === 'number' ? n.miners : parseInt(n.miners) || 0;
    return sum + miners;
  }, 0);
  const totalNodes = tier.oreNodes.reduce((sum, n) => {
    const nodes = typeof n.nodes === 'number' ? n.nodes : parseInt(n.nodes) || 0;
    return sum + nodes;
  }, 0);

  return (
    <div className={`rounded-xl border ${phase.border} ${isExpanded ? 'bg-gray-900/60' : 'bg-gray-900/30'} transition-all duration-200`}>
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-800/20 transition-colors rounded-xl"
      >
        {/* Tier badge */}
        <div className={`w-12 h-12 rounded-xl ${phase.bg} flex flex-col items-center justify-center flex-shrink-0`}>
          <span className={`text-lg font-bold ${phase.text}`}>{tier.tier}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-base font-semibold text-white">Tier {tier.tier}: {tier.name}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${phase.bg} ${phase.text} ${phase.border} border font-medium`}>
              {tier.phase}
            </span>
            {tier.spaceElevator && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium flex items-center gap-1">
                <Rocket className="w-2.5 h-2.5" />
                Phase {tier.spaceElevator.phase}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 line-clamp-1">{tier.goal}</p>
        </div>

        {/* Quick stats */}
        <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
          <div className="text-center">
            <p className={`text-sm font-bold ${phase.text}`}>{typeof tier.power.totalMW === 'number' ? tier.power.totalMW.toLocaleString() : tier.power.totalMW}</p>
            <p className="text-[10px] text-gray-500">MW</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-cyan-400">{totalMiners || `${tier.oreNodes.length}+`}</p>
            <p className="text-[10px] text-gray-500">Miners</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-300">{totalBuildings || '100+'}</p>
            <p className="text-[10px] text-gray-500">Buildings</p>
          </div>
        </div>

        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-gray-800/50 pt-5">
          {/* Goal */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300">{tier.goal}</p>
          </div>

          {/* Space Elevator Requirement */}
          {tier.spaceElevator && (
            <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/15">
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Rocket className="w-3.5 h-3.5" />
                Space Elevator Phase {tier.spaceElevator.phase} Requirements
              </h4>
              <div className="flex flex-wrap gap-3">
                {tier.spaceElevator.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-sm text-indigo-300 font-medium">{item.qty.toLocaleString()}x</span>
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Power Setup */}
          <div>
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Power Setup
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div className="p-3 rounded-lg bg-gray-800/40 text-center">
                <p className="text-lg font-bold text-amber-400">{tier.power.count}</p>
                <p className="text-[10px] text-gray-500">{tier.power.source}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/40 text-center">
                <p className="text-lg font-bold text-white">{typeof tier.power.totalMW === 'number' ? tier.power.totalMW.toLocaleString() : tier.power.totalMW}</p>
                <p className="text-[10px] text-gray-500">Total MW</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/40 col-span-2">
                <p className="text-xs text-gray-400"><strong className="text-gray-300">Fuel:</strong> {tier.power.fuel}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-amber-400/80">
              <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{tier.power.tip}</span>
            </div>
          </div>

          {/* Ore Nodes & Miners */}
          <div>
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Pickaxe className="w-3.5 h-3.5" />
              Ore Nodes & Miners ({tier.oreNodes.length} resource types)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-1.5 px-2 text-gray-500 font-medium text-xs">Resource</th>
                    <th className="text-right py-1.5 px-2 text-gray-500 font-medium text-xs">Nodes</th>
                    <th className="text-center py-1.5 px-2 text-gray-500 font-medium text-xs">Purity</th>
                    <th className="text-right py-1.5 px-2 text-gray-500 font-medium text-xs">Miners</th>
                    <th className="text-right py-1.5 px-2 text-gray-500 font-medium text-xs">Output/min</th>
                  </tr>
                </thead>
                <tbody>
                  {tier.oreNodes.map((n) => (
                    <tr key={n.resource} className="border-b border-gray-800/30">
                      <td className="py-1.5 px-2 text-gray-200 text-xs font-medium">{n.resource}</td>
                      <td className="py-1.5 px-2 text-right text-cyan-400 font-mono text-xs">{n.nodes}</td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          n.purity === 'Pure' ? 'bg-emerald-500/10 text-emerald-400' :
                          n.purity === 'Normal' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          {n.purity}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-right text-white font-mono text-xs">{n.miners}</td>
                      <td className="py-1.5 px-2 text-right text-emerald-400 font-mono text-xs">{n.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Buildings */}
          <div>
            <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Factory className="w-3.5 h-3.5" />
              Buildings ({tier.buildings.length} types, ~{totalBuildings || '100+'} total)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {tier.buildings.map((b) => (
                <div key={b.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-800/30">
                  <span className="text-xs text-gray-300">{b.name}</span>
                  <span className="text-xs font-bold text-white ml-2">{b.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Targets */}
          <div>
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5" />
              Key Production Targets
            </h4>
            <div className="space-y-1.5">
              {tier.production.map((p) => (
                <div key={p.item} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-800/20">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200 font-medium">{p.item}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">{p.buildings}</span>
                    <span className="text-sm font-mono text-emerald-400 font-semibold w-16 text-right">{p.rate}/min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Milestones to Complete
            </h4>
            <div className="flex flex-wrap gap-2">
              {tier.milestones.map((m) => (
                <span key={m} className="text-xs px-2.5 py-1 rounded-lg bg-gray-800/40 text-gray-300 border border-gray-700/50">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <h4 className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5" />
              Optimization Tips
            </h4>
            <ul className="space-y-1.5">
              {tier.tips.map((tip, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TierProgression() {
  const [expandedTier, setExpandedTier] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (tier) => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  // Power scaling chart data
  const powerData = tierProgression.map((t) => ({
    name: `T${t.tier}`,
    mw: typeof t.power.totalMW === 'number' ? t.power.totalMW : parseInt(t.power.totalMW) || 0,
    phase: t.phase,
  }));

  // Building count scaling
  const buildingData = tierProgression.map((t) => ({
    name: `T${t.tier}`,
    buildings: t.buildings.reduce((sum, b) => sum + (typeof b.count === 'number' ? b.count : parseInt(b.count) || 0), 0),
    phase: t.phase,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tier-by-Tier Progression Guide</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          A complete start-to-finish optimized build guide for every tier in Satisfactory 1.0.
          Each tier shows exactly how many miners, buildings, and power generators you need,
          what to produce, and the key tips to stay efficient as you progress to endgame.
        </p>
      </div>

      <InsightCallout color="emerald">
        This guide assumes you're building optimally from the start — using manifold designs,
        matching production ratios, and picking up key alternate recipes as you go. The building
        counts are recommendations for comfortable progression, not bare minimums.
      </InsightCallout>

      {/* Power Scaling Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Power Scaling by Tier</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={powerData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#d1d5db', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'MW', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="mw" name="Total MW" radius={[4, 4, 0, 0]}>
              {powerData.map((entry, i) => (
                <Cell key={i} fill={PHASE_COLORS[entry.phase]?.bar || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Building Count Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Total Buildings by Tier</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={buildingData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#d1d5db', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'Buildings', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="buildings" name="Total Buildings" radius={[4, 4, 0, 0]}>
              {buildingData.map((entry, i) => (
                <Cell key={i} fill={PHASE_COLORS[entry.phase]?.bar || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expand/Collapse All */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">All Tiers (0–9)</h3>
        <button
          onClick={() => {
            setShowAll(!showAll);
            setExpandedTier(showAll ? null : 0);
          }}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {showAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Tier Cards */}
      <div className="space-y-3">
        {tierProgression.map((tier) => (
          <TierCard
            key={tier.tier}
            tier={tier}
            isExpanded={showAll || expandedTier === tier.tier}
            onToggle={() => handleToggle(tier.tier)}
          />
        ))}
      </div>

      <InsightCallout color="violet">
        The jump from Tier 5 to Tier 6 is the biggest complexity spike — you go from ~75 buildings
        to ~100+, introduce trains, and need to produce 3 different Space Elevator parts simultaneously.
        Plan your train network and dedicated sub-factories before starting Phase 3 production.
      </InsightCallout>
    </div>
  );
}
