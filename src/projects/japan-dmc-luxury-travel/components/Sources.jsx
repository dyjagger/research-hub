import React from 'react';
import { ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { sources } from '../data/researchData';
import InsightCallout from './InsightCallout';

const tierColors = {
  T1: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Gold — Government/Official' },
  T2: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Silver — Industry/Market Reports' },
  T3: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Bronze — Community/Anecdotal' },
  T4: { bg: 'bg-gray-500/10', text: 'text-gray-400', label: 'Estimate — Agent Inference' },
};

const typeColors = {
  Government: '#10b981',
  Research: '#3b82f6',
  'Market Report': '#8b5cf6',
  'Industry Award': '#f59e0b',
  Media: '#ec4899',
  'DMC Website': '#06b6d4',
  Industry: '#f59e0b',
  Consulting: '#8b5cf6',
  Community: '#f43f5e',
};

export default function Sources() {
  const grouped = sources.reduce((acc, s) => {
    if (!acc[s.tier]) acc[s.tier] = [];
    acc[s.tier].push(s);
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Sources & Methodology</h2>
        <p className="text-gray-400 text-sm mt-1">
          {sources.length} sources across government statistics, market reports, DMC profiles, and community intelligence
        </p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Research Methodology</h3>
        <div className="space-y-3 text-xs text-gray-400">
          <p>
            This research was compiled from official Japanese government tourism statistics (JNTO, JTA),
            international market research firms (Grand View Research, IMARC Group), industry awards bodies
            (World Travel Awards), individual DMC websites and service catalogs, and community sentiment
            from travel agent forums.
          </p>
          <p>
            DMC profiles were built by analyzing each company's website, service offerings, client testimonials,
            industry awards, and community reputation. Luxury ratings and service depth scores are editorial
            assessments based on the breadth and exclusivity of offerings, not client satisfaction surveys.
          </p>
          <p>
            Price ranges are approximate and based on published rates, industry norms, and DMC positioning.
            Actual pricing varies by season, group size, experience complexity, and negotiated agent rates.
          </p>
        </div>
      </div>

      {/* Data Quality Tiers */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Shield size={14} className="text-green-400" />Data Quality Tiers
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(tierColors).map(([tier, style]) => {
            const count = (grouped[tier] || []).length;
            return (
              <div key={tier} className={`${style.bg} rounded-lg p-3 flex items-center gap-3`}>
                <span className={`text-sm font-bold ${style.text}`}>{tier}</span>
                <div>
                  <p className={`text-xs font-medium ${style.text}`}>{style.label}</p>
                  <p className="text-[10px] text-gray-500">{count} source{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Source List */}
      {Object.entries(grouped).map(([tier, tierSources]) => (
        <div key={tier}>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-3 ${tierColors[tier]?.text || 'text-gray-400'}`}>
            {tierColors[tier]?.label || tier} ({tierSources.length})
          </h3>
          <div className="space-y-2">
            {tierSources.map((source) => (
              <div key={source.id} className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
                <span className="text-[10px] text-gray-600 font-mono mt-0.5 w-5 shrink-0">[{source.id}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${typeColors[source.type] || '#6b7280'}20`, color: typeColors[source.type] || '#6b7280' }}
                    >
                      {source.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 font-medium">{source.title}</p>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-gray-500 hover:text-gray-400 flex items-center gap-1 mt-0.5 truncate"
                  >
                    <ExternalLink size={9} />{source.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Limitations */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-400" />Limitations & Caveats
        </h3>
        <ul className="space-y-2 text-xs text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span><strong className="text-gray-300">DMC ratings are editorial.</strong> Luxury ratings and service depth scores reflect the breadth and exclusivity of published offerings, not verified client satisfaction data.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span><strong className="text-gray-300">Pricing is approximate.</strong> DMC rates vary significantly by season, group size, and negotiated agent terms. Published ranges are indicative only.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span><strong className="text-gray-300">Market data uses multiple sources.</strong> Luxury market size estimates vary between research firms ($37.1M IMARC vs $38.7B Grand View). We use Grand View's broader definition which includes all luxury travel spending.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span><strong className="text-gray-300">Not exhaustive.</strong> Japan has 100+ registered DMCs. This research profiles the 20 most relevant for luxury travel agents. Smaller regional operators may serve specific niches well.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-0.5">•</span>
            <span><strong className="text-gray-300">Exchange rate assumption.</strong> USD conversions use approximately 1 USD = 152 JPY (early 2025 rate). Actual rates fluctuate and significantly impact luxury travel value proposition.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
