import React from 'react';
import { ExternalLink } from 'lucide-react';
import { sources } from '../data/researchData';

const tierColors = {
  T1: 'bg-green-500/10 text-green-400 border-green-500/20',
  T2: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  T3: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  T4: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function Sources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h1>
        <p className="text-gray-400 text-sm">All data sources, quality tiers, and research limitations.</p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Methodology</h3>
        <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
          <p>
            This dashboard synthesizes data from developer surveys (Stack Overflow 2025, n=33,662), 
            engineering analytics platforms (Jellyfish, 20M PRs across 1,000 companies), financial 
            analysis (Sacra), market research reports, and official announcements from tool vendors.
          </p>
          <p>
            <strong className="text-gray-300">Data quality tiers:</strong> T1 (Gold) = primary source with 
            large sample size or official data. T2 (Silver) = reputable secondary analysis or smaller surveys. 
            T3 (Bronze) = industry estimates or extrapolations. T4 = informed estimates where data is sparse.
          </p>
          <p>
            <strong className="text-gray-300">Key limitation:</strong> This is a fast-moving space where 
            marketing hype significantly inflates perceived adoption. We've prioritized data from independent 
            surveys and engineering analytics over vendor-reported numbers. Market size projections vary widely 
            between research firms — we've used midpoint estimates and noted ranges where available.
          </p>
          <p>
            <strong className="text-gray-300">Hype vs Reality scoring:</strong> "Hype Score" reflects the 
            most commonly cited marketing/headline number. "Reality Score" reflects the most rigorous 
            independent measurement available. The gap between them is the "adoption paradox."
          </p>
        </div>
      </div>

      {/* Tier Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(tierColors).map(([tier, cls]) => (
          <span key={tier} className={`text-[10px] px-2 py-0.5 rounded border ${cls}`}>
            {tier} — {tier === 'T1' ? 'Primary/Official' : tier === 'T2' ? 'Reputable Secondary' : tier === 'T3' ? 'Industry Estimate' : 'Informed Estimate'}
          </span>
        ))}
      </div>

      {/* Sources List */}
      <div className="space-y-2">
        {sources.map((src) => (
          <div key={src.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
            <span className="text-gray-600 text-xs font-mono w-5 flex-shrink-0 pt-0.5">{src.id}.</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  {src.title}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${tierColors[src.tier]}`}>{src.tier}</span>
                <span className="text-[10px] text-gray-600">{src.type}</span>
                {src.respondents && (
                  <span className="text-[10px] text-gray-600">• {src.respondents}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimers */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-2">Disclaimers & Limitations</h3>
        <ul className="space-y-1.5 text-xs text-gray-500">
          <li>• Market size projections vary by 2-3x between research firms depending on methodology and market definition</li>
          <li>• Vendor-reported user numbers (e.g., "20M all-time users") include free, trial, and inactive accounts</li>
          <li>• Stack Overflow survey has self-selection bias toward engaged developers who visit the platform</li>
          <li>• MCP SDK download counts include CI/CD pipelines and may overcount unique users</li>
          <li>• "Adoption" means different things in different surveys — from "tried once" to "daily active use"</li>
          <li>• Skills & Workflows category has the least available data — assessments are largely T3-T4 estimates</li>
          <li>• Future projections beyond 2027 carry high uncertainty given the pace of change in this space</li>
          <li>• Research conducted February 2026 — data may be outdated by the time you read this</li>
        </ul>
      </div>
    </div>
  );
}
