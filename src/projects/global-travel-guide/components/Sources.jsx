import React from 'react';
import { BookOpen, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { sources } from '../data/researchData';

const tierColors = {
  'T1 — Official Data': '#10b981',
  'T2 — Aggregated Data': '#06b6d4',
  'T2 — Industry Report': '#f59e0b',
  'T2 — Editorial': '#8b5cf6',
  'T2 — Review Aggregation': '#ec4899',
  'T2 — Survey': '#a855f7',
  'T2 — Report': '#6366f1',
  'T2 — Industry Award': '#f43f5e',
  'T2 — Industry Guide': '#14b8a6',
  'T2 — Reader Survey': '#84cc16',
  'T2 — Expert Panel': '#eab308',
};

export default function Sources() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-gray-400" size={24} /> Sources & Methodology
        </h2>
        <p className="text-gray-400 text-sm mt-1">All data sources, quality tiers, and methodology notes</p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">Methodology</h3>
        <div className="space-y-3 text-xs text-gray-400">
          <p>
            This dashboard aggregates data from 17 authoritative sources spanning official UN statistics, industry reports,
            editorial rankings, reader surveys, and expert panels. Data was gathered in February 2026 and reflects the most
            recent available figures (primarily 2024–2025 data).
          </p>
          <p>
            <strong className="text-gray-300">Tourism arrivals & receipts:</strong> Sourced from the UN Tourism World Tourism
            Barometer (T1 official data) — the gold standard for international tourism statistics.
          </p>
          <p>
            <strong className="text-gray-300">Hotel pricing:</strong> Aggregated from FreeTour.com's analysis of hotel booking
            platforms and Hotels.com's annual Price Index. Prices reflect average nightly rates in USD.
          </p>
          <p>
            <strong className="text-gray-300">Food & culinary rankings:</strong> Composite of Michelin Guide data, Condé Nast
            Traveller reader surveys, and editorial assessments. Michelin star counts are approximate totals per country.
          </p>
          <p>
            <strong className="text-gray-300">Safety rankings:</strong> Derived from the Global Peace Index, Numbeo crime index,
            International SOS risk ratings, and World Population Review safety scores.
          </p>
          <p>
            <strong className="text-gray-300">Daily travel costs:</strong> Based on Topologica's budget travel calculator using
            real traveler spending data across 50 countries, cross-referenced with Budget Your Trip aggregates.
          </p>
        </div>
      </div>

      {/* Data Quality */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Shield size={14} className="text-emerald-400" /> Data Quality Tiers
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-emerald-400">T1 — Official / Government Data</p>
            <p className="text-[10px] text-gray-400 mt-1">UN Tourism, World Bank, national statistics offices. Highest reliability.</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-cyan-400">T2 — Industry Reports & Aggregations</p>
            <p className="text-[10px] text-gray-400 mt-1">Euromonitor, Hotels.com, TripAdvisor, Michelin. Professional data collection with editorial curation.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-amber-400">T3 — Editorial & Expert Opinion</p>
            <p className="text-[10px] text-gray-400 mt-1">Forbes, Condé Nast, National Geographic. Informed but subjective rankings.</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
            <p className="text-xs font-bold text-rose-400">T4 — Estimates & Approximations</p>
            <p className="text-[10px] text-gray-400 mt-1">Some visitor counts and cost figures are estimates based on available data. Marked where applicable.</p>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
        <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
          <AlertTriangle size={14} /> Limitations & Caveats
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-400">
          <li>• Hotel prices vary significantly by season, location within a country, and booking platform</li>
          <li>• Daily travel costs are averages — actual costs depend on travel style, season, and specific destinations</li>
          <li>• Michelin star counts are approximate and change annually as restaurants gain/lose stars</li>
          <li>• Safety scores are composites and may not reflect localized risks (e.g., specific neighborhoods)</li>
          <li>• Tourism arrival figures for some countries are preliminary 2024 estimates pending final UN confirmation</li>
          <li>• Beach and attraction rankings are inherently subjective despite expert panel methodology</li>
        </ul>
      </div>

      {/* Source List */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-4">All Sources ({sources.length})</h3>
        <div className="space-y-2">
          {sources.map((s) => (
            <div key={s.id} className="flex items-start gap-3 py-2 border-b border-gray-800/50 last:border-0">
              <span className="text-xs text-gray-600 font-mono w-6 text-right shrink-0">[{s.id}]</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 truncate"
                  >
                    {s.name}
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                </div>
                <span
                  className="inline-block text-[9px] px-1.5 py-0.5 rounded mt-1 font-medium"
                  style={{
                    backgroundColor: `${tierColors[s.type] || '#6b7280'}15`,
                    color: tierColors[s.type] || '#6b7280',
                  }}
                >
                  {s.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
