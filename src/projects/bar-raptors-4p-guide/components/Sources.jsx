import React from 'react';
import { ExternalLink, BookOpen, Globe, MessageSquare, FileText } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { sources, mapRecommendations } from '../data/researchData';

const TYPE_ICONS = {
  'Official': Globe,
  'Official Guide': Globe,
  'Official Dev Blog': FileText,
  'Official Unit Data': FileText,
  'Official FAQ': Globe,
  'Community Guide': BookOpen,
  'Community Discussion': MessageSquare,
};

const TIER_LABELS = { T1: 'Primary Source', T2: 'Supporting Source', T3: 'Supplementary', T4: 'Estimate' };
const TIER_COLORS = { T1: 'text-emerald-400 bg-emerald-500/10', T2: 'text-blue-400 bg-blue-500/10', T3: 'text-amber-400 bg-amber-500/10', T4: 'text-gray-400 bg-gray-500/10' };

export default function Sources() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Sources & Methodology</h1>
        <p className="text-gray-400 mt-1 text-sm">Data sources, map recommendations, and research notes</p>
      </div>

      {/* Map Recommendations */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recommended Maps for 4-Player Raptors</h2>
        <div className="space-y-3">
          {mapRecommendations.map((map, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-4 border border-gray-800/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{map.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{map.type}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{map.players} players</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{map.description}</p>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-semibold">Pros:</span>
                      <ul className="text-[10px] text-gray-400 mt-0.5">
                        {map.pros.map((p, j) => <li key={j}>+ {p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[10px] text-red-400 font-semibold">Cons:</span>
                      <ul className="text-[10px] text-gray-400 mt-0.5">
                        {map.cons.map((c, j) => <li key={j}>- {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-3 h-3 rounded-sm ${star <= map.rating ? 'bg-amber-400' : 'bg-gray-700'}`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{map.rating}/5</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="emerald">
        <strong>Best starter map:</strong> Supreme Isthmus or Requiem. Both have natural chokepoints that reduce the number of directions you need to defend. Once your team is comfortable, try Raptor Crater for a true 360-degree challenge.
      </InsightCallout>

      {/* Sources List */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Data Sources ({sources.length})</h2>
        <div className="space-y-2">
          {sources.map((source, i) => {
            const Icon = TYPE_ICONS[source.type] || Globe;
            return (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200 group-hover:text-white truncate">{source.title}</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-500">{source.type}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${TIER_COLORS[source.tier]}`}>
                      {TIER_LABELS[source.tier]}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Methodology & Limitations</h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-amber-400 mb-1">Data Quality</h3>
            <p className="text-xs text-gray-400">Unit stats (HP, DPS, range, cost) are sourced directly from the official BAR unit pages (T1 — Gold tier). Strategy recommendations are synthesized from community guides and experienced player advice (T2 — Silver tier). Exact wave compositions and difficulty multipliers are approximated from community observations and dev blog posts, as the game's source code values may change between patches.</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-amber-400 mb-1">Balance Changes</h3>
            <p className="text-xs text-gray-400">BAR is actively developed. Recent changes include: Assist Drones and Base Builder turret disabled by default in PvE; extra grace period time per difficulty; special squad ratio capped at 25%; air squad ratio capped at 25%; Matriarchs can no longer spawn in pairs. These changes are reflected in this guide as of February 2026.</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-amber-400 mb-1">NuttyB Mod vs Standard</h3>
            <p className="text-xs text-gray-400">Some strategies reference the "NuttyB" Raptors mod, a popular community modification with adjusted settings. The core principles (T2 Wind meta, no Fusions, layered defense, T3 for queen) apply to both standard and NuttyB Raptors. Specific timings may vary.</p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-amber-400 mb-1">Limitations</h3>
            <p className="text-xs text-gray-400">This guide assumes 4 coordinated human players on voice comms. Solo or 2-player strategies differ significantly. Map choice heavily affects optimal strategy. The guide focuses on the defensive/turtle meta which is the proven approach for hardest difficulty — aggressive strategies (destroying burrows early) are not recommended for Epic/Survival.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
