import React from 'react';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';
import { sources } from '../data/researchData';

const TIER_BADGES = {
  T1: { label: 'Primary', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  T2: { label: 'Secondary', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  T3: { label: 'Community', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  T4: { label: 'Estimate', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
};

export default function Sources() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Sources & Methodology</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          All data in this dashboard is sourced from official game data, community-maintained
          wikis, and peer-reviewed community analysis. Data quality tiers indicate source reliability.
        </p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Methodology
        </h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>
            <strong className="text-gray-200">Resource data</strong> is extracted from the game files
            and verified against the official Satisfactory Wiki and satisfactory-calculator.com interactive map.
            Node counts, extraction rates, and building stats are T1 (game data) quality.
          </p>
          <p>
            <strong className="text-gray-200">Alternate recipe rankings</strong> are based on wrigh516's
            linear programming optimization model, which uses the Pyomo Python library and GLPK solver
            to find optimal recipe combinations for Final Project Assembly production. Each recipe is
            scored by comparing the optimal solution with vs without that recipe, measuring impact on
            power, buildings, items moved, and raw resources.
          </p>
          <p>
            <strong className="text-gray-200">Power efficiency calculations</strong> are derived from
            official recipe rates and building power consumption values. Oil efficiency comparisons
            account for the full processing chain from crude oil to generator output.
          </p>
          <p>
            <strong className="text-gray-200">Overclocking formulas</strong> use the confirmed
            power exponent of 1.321928 (log₂(2.5)), verified against in-game measurements
            and documented on the official wiki.
          </p>
        </div>
      </div>

      {/* Data Quality Tiers */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Quality Tiers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(TIER_BADGES).map(([tier, badge]) => (
            <div key={tier} className={`rounded-xl border p-4 ${badge.bg} ${badge.border}`}>
              <p className={`text-lg font-bold ${badge.text}`}>{tier}</p>
              <p className={`text-sm font-medium ${badge.text}`}>{badge.label}</p>
              <p className="text-xs text-gray-400 mt-2">
                {tier === 'T1' && 'Official game data, developer documentation, verified wiki data'}
                {tier === 'T2' && 'Community analysis with methodology, cross-referenced data'}
                {tier === 'T3' && 'Community guides, forum posts, anecdotal reports'}
                {tier === 'T4' && 'Informed estimates, interpolated data, unverified claims'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Source List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">All Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((s) => {
            const badge = TIER_BADGES[s.tier] || TIER_BADGES.T3;
            return (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs text-gray-600 font-mono w-6 flex-shrink-0">[{s.id}]</span>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-200 font-medium truncate">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                    {s.tier}
                  </span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Limitations & Disclaimers
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>- Game data reflects Satisfactory 1.0 (Build 365306+). Future patches may alter recipes, rates, or building stats.</li>
          <li>- Alternate recipe rankings are optimized for Final Project Assembly production. Rankings may differ for other optimization targets (e.g., pure resource efficiency, single-product maximization).</li>
          <li>- Resource node counts and locations are fixed per map but may change in future updates.</li>
          <li>- Oil power efficiency calculations assume 100% clock speed on all buildings. Underclocking changes the math.</li>
          <li>- Community-sourced data (T2/T3) may contain minor inaccuracies. Cross-reference with the official wiki for critical decisions.</li>
          <li>- This dashboard does not account for logistics complexity (belt routing, train networks, pipe fluid dynamics).</li>
        </ul>
      </div>
    </div>
  );
}
