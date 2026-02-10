import React from 'react';
import { Factory, Zap, Box, Pickaxe, ArrowDown } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { altRecipeImpact, gameTiers } from '../data/researchData';

const stats = [
  {
    label: 'Power Saved',
    value: '-17.5%',
    detail: `${altRecipeImpact.withAlts.power.toLocaleString()} MW vs ${altRecipeImpact.withoutAlts.power.toLocaleString()} MW`,
    icon: Zap,
    color: 'text-amber-400',
  },
  {
    label: 'Items Moved',
    value: '-37.4%',
    detail: `${altRecipeImpact.withAlts.itemsPerMin.toLocaleString()}/min vs ${altRecipeImpact.withoutAlts.itemsPerMin.toLocaleString()}/min`,
    icon: Box,
    color: 'text-cyan-400',
  },
  {
    label: 'Buildings Needed',
    value: '-63.3%',
    detail: `${altRecipeImpact.withAlts.buildings.toLocaleString()} vs ${altRecipeImpact.withoutAlts.buildings.toLocaleString()}`,
    icon: Factory,
    color: 'text-emerald-400',
  },
  {
    label: 'Raw Resources',
    value: '-42.3%',
    detail: `${altRecipeImpact.withAlts.rawResources.toLocaleString()} vs ${altRecipeImpact.withoutAlts.rawResources.toLocaleString()}`,
    icon: Pickaxe,
    color: 'text-rose-400',
  },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Optimization Overview</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Satisfactory 1.0 offers a deep optimization landscape spanning 10 progression tiers,
          12 raw resource types across 459 nodes, and 90+ alternate recipes. This dashboard
          distills the community's collective knowledge into actionable data for building
          the most efficient factories possible.
        </p>
      </div>

      <InsightCallout color="emerald">
        Using optimized alternate recipes reduces buildings needed by 63.3% — from 2,783 to just
        1,020 — while producing the same Final Project Assembly output. This is the single
        biggest optimization lever in the game.
      </InsightCallout>

      {/* Impact Stats */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Alternate Recipe Impact (Full Production Chain)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Game Progression Timeline */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Game Progression & Power Milestones</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Tier</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Name</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Phase</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Power Source</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Key Unlocks</th>
              </tr>
            </thead>
            <tbody>
              {gameTiers.map((t) => (
                <tr key={t.tier} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white font-mono text-xs">{t.tier}</td>
                  <td className="py-2 px-3 text-gray-200">{t.name}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      t.phase === 'Early' ? 'bg-emerald-500/10 text-emerald-400' :
                      t.phase === 'Mid' ? 'bg-amber-500/10 text-amber-400' :
                      t.phase === 'Late' ? 'bg-rose-500/10 text-rose-400' :
                      'bg-violet-500/10 text-violet-400'
                    }`}>
                      {t.phase}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-gray-300 text-xs">{t.power}</td>
                  <td className="py-2 px-3 text-gray-400 text-xs">{t.keyUnlocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
