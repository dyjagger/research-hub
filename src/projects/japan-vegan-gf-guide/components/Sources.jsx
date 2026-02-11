import React from 'react';
import { ExternalLink, BookOpen, Database, Newspaper, Globe, Users } from 'lucide-react';
import { sources } from '../data/researchData';

const typeIcons = {
  Database: Database,
  'Travel Guide': BookOpen,
  News: Newspaper,
  'Market Research': BookOpen,
  Blog: Globe,
  Community: Users,
  'Official Tourism': Globe,
};

const tierColors = {
  T1: 'bg-green-500/20 text-green-300 border-green-500/30',
  T2: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  T3: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  T4: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const tierLabels = {
  T1: 'Primary Source',
  T2: 'Secondary Source',
  T3: 'Community Source',
  T4: 'Estimate',
};

const Sources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Sources & Methodology</h2>
        <p className="text-gray-400 mt-1">All sources used in this research, with quality tiers and links</p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Methodology</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>This dashboard compiles data from <strong className="text-gray-200">{sources.length} sources</strong> across travel guides, restaurant databases, market research, community forums, and official tourism resources.</p>
          <p>Restaurant ratings are sourced primarily from <strong className="text-gray-200">HappyCow</strong> (the world's largest vegan restaurant database) and cross-referenced with Google Maps reviews and travel blog first-hand accounts.</p>
          <p>Gluten-free safety information is sourced from <strong className="text-gray-200">celiac travel bloggers</strong> who have personally tested restaurants and verified safety with staff.</p>
          <p>Market statistics come from <strong className="text-gray-200">IMARC Group's Japan Vegan Food Market Report</strong> (2024-2033 projections).</p>
        </div>
      </div>

      {/* Data Quality Tiers */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Data Quality Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(tierLabels).map(([tier, label]) => (
            <div key={tier} className={`rounded-lg px-4 py-3 border ${tierColors[tier]}`}>
              <p className="text-sm font-bold">{tier}: {label}</p>
              <p className="text-xs mt-1 opacity-80">
                {tier === 'T1' && 'Official databases, market research, verified first-hand accounts'}
                {tier === 'T2' && 'Reputable travel blogs, news outlets, review aggregators'}
                {tier === 'T3' && 'Community forums, Reddit, user-submitted reviews'}
                {tier === 'T4' && 'Estimates based on available data, clearly marked'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Source List */}
      <div className="space-y-2">
        {sources.map(source => {
          const Icon = typeIcons[source.type] || Globe;
          return (
            <div key={source.id} className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 flex items-start gap-3 hover:border-gray-600/50 transition-all">
              <Icon size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-gray-200">{source.title}</h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border flex-shrink-0 ${tierColors[source.tier]}`}>
                    {source.tier}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{source.type}</p>
                <a href={source.url} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-cyan-400/70 hover:text-cyan-400 flex items-center gap-1 mt-1 truncate">
                  <ExternalLink size={10} />
                  {source.url}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Limitations */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Limitations & Disclaimers</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• Restaurant information is current as of early 2026 but <strong className="text-gray-300">hours, menus, and availability change frequently</strong>. Always verify before visiting.</p>
          <p>• Ratings are aggregated from multiple sources and may not reflect the most recent reviews.</p>
          <p>• GPS coordinates are approximate and may not pinpoint exact restaurant locations.</p>
          <p>• "GF Options" means the restaurant can accommodate gluten-free requests but is <strong className="text-gray-300">not a dedicated GF kitchen</strong> — cross-contamination risk exists for severe celiacs.</p>
          <p>• This guide covers major tourist cities. Rural Japan and smaller cities have significantly fewer options.</p>
          <p>• Price ranges are approximate and subject to change. Prices shown in Japanese Yen (¥).</p>
          <p>• The interactive map uses OpenStreetMap data via CARTO dark tiles.</p>
        </div>
      </div>
    </div>
  );
};

export default Sources;
