import React from 'react';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';
import { sources } from '../data/courses';

const TIER_BADGES = {
  T1: { label: 'Primary', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  T2: { label: 'Secondary', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  T3: { label: 'Community', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
};

export default function Sources() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Sources & Methodology</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          All content in this dashboard is sourced from established Japanese language textbooks,
          official JLPT resources, and respected community learning platforms.
        </p>
      </div>

      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Methodology
        </h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>
            <strong className="text-gray-200">Kana charts</strong> follow the standard gojuuon (fifty sounds)
            ordering used in all Japanese dictionaries and textbooks. Romaji uses the modified Hepburn system,
            the most widely used romanization for English speakers.
          </p>
          <p>
            <strong className="text-gray-200">Grammar content</strong> is organized by JLPT level and cross-referenced
            against the Genki textbook series, Tae Kim's Guide, and the Dictionary of Japanese Grammar trilogy.
            Examples use natural, commonly-heard sentences rather than textbook-only patterns.
          </p>
          <p>
            <strong className="text-gray-200">Vocabulary</strong> is curated from JLPT word lists and organized
            by practical category rather than alphabetical order, prioritizing words you'll actually use
            in daily conversation and travel.
          </p>
          <p>
            <strong className="text-gray-200">Verb conjugation</strong> tables follow standard Japanese
            linguistic classification (Group 1/2/3 or Godan/Ichidan/Irregular) with all major forms
            verified against multiple reference sources.
          </p>
          <p>
            <strong className="text-gray-200">The translator</strong> uses a rule-based approach with a
            curated dictionary to demonstrate Japanese sentence construction. It is designed as a
            learning tool, not a production translator — it teaches you the "why" behind each translation.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Quality Tiers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(TIER_BADGES).map(([tier, badge]) => (
            <div key={tier} className={`rounded-xl border p-4 ${badge.bg} ${badge.border}`}>
              <p className={`text-lg font-bold ${badge.text}`}>{tier}</p>
              <p className={`text-sm font-medium ${badge.text}`}>{badge.label}</p>
              <p className="text-xs text-gray-400 mt-2">
                {tier === 'T1' && 'Official textbooks, JLPT standards, established reference works'}
                {tier === 'T2' && 'Respected learning platforms with peer review and community validation'}
                {tier === 'T3' && 'Community forums, user-generated content, anecdotal learning advice'}
              </p>
            </div>
          ))}
        </div>
      </div>

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

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Limitations & Disclaimers
        </h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>- This dashboard is a learning reference, not a replacement for structured courses or native speaker interaction.</li>
          <li>- The sentence translator is rule-based and works best with simple, direct sentences. It is not a production-quality machine translator.</li>
          <li>- Kanji is intentionally excluded from this dashboard. For serious study beyond N4, kanji knowledge becomes essential.</li>
          <li>- JLPT study hour estimates vary widely by individual. The figures shown are averages from multiple sources.</li>
          <li>- Romaji is provided as a learning aid. Learners should transition away from romaji as soon as they can read kana fluently.</li>
          <li>- Some grammar explanations are simplified for clarity. Consult the referenced textbooks for complete coverage.</li>
          <li>- Vocabulary lists are curated selections, not exhaustive JLPT word lists. Use dedicated SRS apps for comprehensive vocabulary study.</li>
        </ul>
      </div>
    </div>
  );
}
