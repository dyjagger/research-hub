import React, { useState } from 'react';
import { Building2, Star, Globe, Users, MapPin, Award, ExternalLink, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { dmcDirectory, dmcTiers } from '../data/researchData';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const tierColors = {
  'Ultra-Luxury Boutique': '#f43f5e',
  'Premium Full-Service': '#8b5cf6',
  'Large-Scale / MICE': '#3b82f6',
  'International Operator': '#10b981',
};

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={12} fill={i < rating ? '#f59e0b' : 'transparent'} stroke={i < rating ? '#f59e0b' : '#4b5563'} />
      ))}
    </div>
  );
}

function DMCCard({ dmc, isExpanded, onToggle }) {
  const tierColor = tierColors[dmc.tier] || '#6b7280';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${tierColor}20`, color: tierColor }}>
                {dmc.tier}
              </span>
              {dmc.b2bOnly && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">B2B Only</span>
              )}
              {dmc.awards.length > 0 && (
                <Award size={12} className="text-yellow-500" />
              )}
            </div>
            <h3 className="text-white font-semibold text-sm">{dmc.name}</h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={10} />{dmc.hq}</span>
              <span className="flex items-center gap-1"><Globe size={10} />Est. {dmc.founded}</span>
              <span className="flex items-center gap-1 text-green-400">{dmc.priceRange}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 ml-3">
            <div className="text-[10px] text-gray-500 uppercase">Luxury</div>
            <StarRating rating={dmc.luxuryRating} />
            {isExpanded ? <ChevronUp size={14} className="text-gray-500 mt-1" /> : <ChevronDown size={14} className="text-gray-500 mt-1" />}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-800 pt-3 space-y-3">
          {/* Specializations */}
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Specializations</p>
            <div className="flex flex-wrap gap-1.5">
              {dmc.specializations.map((s) => (
                <span key={s} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </div>

          {/* Client Types */}
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Client Types</p>
            <div className="flex flex-wrap gap-1.5">
              {dmc.clientTypes.map((c) => (
                <span key={c} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Regional Coverage</p>
            <p className="text-xs text-gray-400">{dmc.regions.join(' • ')}</p>
          </div>

          {/* Languages */}
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Languages</p>
            <p className="text-xs text-gray-400">{dmc.languages.join(', ')}</p>
          </div>

          {/* Unique Offerings */}
          <div>
            <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Unique Offerings</p>
            <ul className="space-y-1">
              {dmc.uniqueOfferings.map((o) => (
                <li key={o} className="text-xs text-gray-300 flex items-start gap-1.5">
                  <span className="text-rose-400 mt-0.5">•</span>{o}
                </li>
              ))}
            </ul>
          </div>

          {/* Awards */}
          {dmc.awards.length > 0 && (
            <div>
              <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Awards & Recognition</p>
              <div className="flex flex-wrap gap-1.5">
                {dmc.awards.map((a) => (
                  <span key={a} className="text-[11px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded flex items-center gap-1">
                    <Award size={10} />{a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Considerations */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase text-green-400 mb-1.5 tracking-wide">Strengths</p>
              <ul className="space-y-1">
                {dmc.strengths.map((s) => (
                  <li key={s} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-green-400 mt-0.5">✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase text-amber-400 mb-1.5 tracking-wide">Considerations</p>
              <ul className="space-y-1">
                {dmc.considerations.map((c) => (
                  <li key={c} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5">△</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended For */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-[10px] uppercase text-rose-400 mb-1 tracking-wide">Best For</p>
            <p className="text-xs text-gray-200">{dmc.recommendedFor}</p>
          </div>

          {/* Website Link */}
          <a
            href={dmc.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            <ExternalLink size={12} />Visit Website
          </a>
        </div>
      )}
    </div>
  );
}

export default function DMCDirectory() {
  const [expandedId, setExpandedId] = useState(null);
  const [tierFilter, setTierFilter] = useState('all');

  const filtered = tierFilter === 'all'
    ? dmcDirectory
    : dmcDirectory.filter(d => d.tier === tierFilter);

  const tierCounts = dmcTiers.map(t => ({
    ...t,
    count: dmcDirectory.filter(d => d.tier === t.tier).length,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">DMC Directory</h2>
        <p className="text-gray-400 text-sm mt-1">
          20 destination management companies profiled across 4 tiers — from ultra-luxury boutique to international operators
        </p>
      </div>

      <InsightCallout>
        For luxury travel agents, the most critical distinction is between Japan-specialist boutique DMCs (who have deep local
        relationships and exclusive access) vs. international operators (who offer brand trust but less local depth). Reddit
        community feedback from travel agents consistently recommends Japan-specialist DMCs over global operators for high-end
        clients, citing better guide quality and more authentic experiences.
      </InsightCallout>

      {/* Tier Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tierCounts.map((t) => (
          <button
            key={t.tier}
            onClick={() => setTierFilter(tierFilter === t.tier ? 'all' : t.tier)}
            className={`text-left p-3 rounded-lg border transition-all ${
              tierFilter === t.tier
                ? 'border-gray-600 bg-gray-800'
                : 'border-gray-800 bg-gray-900 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-xs font-medium text-white">{t.tier}</span>
            </div>
            <p className="text-lg font-bold text-white">{t.count}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{t.description}</p>
          </button>
        ))}
      </div>

      {/* Filter indicator */}
      {tierFilter !== 'all' && (
        <div className="flex items-center gap-2">
          <Filter size={12} className="text-gray-500" />
          <span className="text-xs text-gray-400">
            Showing <span className="text-white font-medium">{tierFilter}</span> ({filtered.length} DMCs)
          </span>
          <button onClick={() => setTierFilter('all')} className="text-xs text-rose-400 hover:text-rose-300 ml-2">
            Clear filter
          </button>
        </div>
      )}

      {/* DMC Cards */}
      <div className="space-y-3">
        {filtered.map((dmc) => (
          <DMCCard
            key={dmc.id}
            dmc={dmc}
            isExpanded={expandedId === dmc.id}
            onToggle={() => setExpandedId(expandedId === dmc.id ? null : dmc.id)}
          />
        ))}
      </div>
    </div>
  );
}
