import React from 'react';
import { ExternalLink } from 'lucide-react';
import { sources } from '../data/researchData';

const TIER_BADGES = {
  T1: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  T2: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  T3: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  T4: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export default function Sources() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          All data in this dashboard was gathered from authoritative sources including the International Coffee Organization,
          USDA, Specialty Coffee Association, and peer-reviewed publications. Data quality tiers are noted for transparency.
        </p>
      </div>

      {/* Methodology */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Methodology & Limitations</h3>
        <div className="space-y-3 text-xs text-gray-400">
          <p>
            <span className="text-white font-medium">Caffeine data:</span> Caffeine percentages are based on dry weight measurements
            from peer-reviewed studies and industry databases. Actual caffeine in a brewed cup varies significantly based on grind size,
            water temperature, brew time, and bean-to-water ratio. Values shown are representative averages.
          </p>
          <p>
            <span className="text-white font-medium">Flavor ratings:</span> Composite scores derived from SCA cupping protocols,
            specialty coffee competition results, and expert reviews. These are inherently subjective — individual preferences vary widely.
          </p>
          <p>
            <span className="text-white font-medium">Pricing:</span> Prices reflect 2024–2025 retail and auction ranges. Coffee prices
            are highly volatile and vary by origin, processing, roast date, and retailer. Auction prices for rare lots can be
            orders of magnitude higher than retail.
          </p>
          <p>
            <span className="text-white font-medium">Production data:</span> Based on USDA Foreign Agricultural Service 2024/2025
            marketing year projections. Actual production may differ due to weather, disease, and market conditions.
          </p>
          <p>
            <span className="text-white font-medium">Keep-Awake Index:</span> Estimated based on caffeine content and average
            caffeine half-life (~5 hours). Individual sensitivity varies enormously based on genetics (CYP1A2 enzyme), tolerance,
            body weight, and other factors. These are rough guides, not medical advice.
          </p>
        </div>
      </div>

      {/* Data Quality Tiers */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Data Quality Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${TIER_BADGES.T1} flex-shrink-0`}>T1</span>
            <div>
              <p className="text-xs text-white font-medium">Gold — Official/Government</p>
              <p className="text-[10px] text-gray-500">ICO, USDA, SCA official data and protocols</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${TIER_BADGES.T2} flex-shrink-0`}>T2</span>
            <div>
              <p className="text-xs text-white font-medium">Silver — Expert/Industry</p>
              <p className="text-[10px] text-gray-500">Specialty coffee publications, expert reviews, industry databases</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${TIER_BADGES.T3} flex-shrink-0`}>T3</span>
            <div>
              <p className="text-xs text-white font-medium">Bronze — Aggregated</p>
              <p className="text-[10px] text-gray-500">Cross-referenced from multiple secondary sources</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-800/30">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${TIER_BADGES.T4} flex-shrink-0`}>T4</span>
            <div>
              <p className="text-xs text-white font-medium">Estimate</p>
              <p className="text-[10px] text-gray-500">Informed estimates where primary data unavailable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Source list */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">All Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((s) => (
            <div key={s.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/20 hover:bg-gray-800/40 transition-colors">
              <span className="text-[10px] text-gray-600 font-mono w-5 flex-shrink-0 mt-0.5">{s.id}.</span>
              <div className="flex-1 min-w-0">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                  {s.title}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500">{s.type}</span>
                  <span className={`text-[10px] px-1.5 py-0 rounded-full border ${TIER_BADGES[s.tier]}`}>{s.tier}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
