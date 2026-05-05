import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { sources } from '../data/researchData';

export default function Sources() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sources & Methodology</h1>
        <p className="text-gray-400 text-lg">Research citations, data quality notes, and practical tips</p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-3">Methodology</h2>
        <div className="space-y-3 text-sm text-gray-300">
          <p>This guide was compiled by cross-referencing multiple sources to identify places that meet two criteria:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>High quality / authentic cultural value (verified by expert reviews, local rankings, or community consensus)</li>
            <li>Low foreign tourist density (verified by location analysis, community reports, and absence from mainstream tourist guides)</li>
          </ol>
          <p className="mt-3">Tourist density ratings are based on:</p>
          <ul className="space-y-1 ml-2">
            <li><span className="text-emerald-400 font-medium">Very Low</span> — Rarely if ever see foreign tourists. No English signage. Deep in residential areas.</li>
            <li><span className="text-yellow-400 font-medium">Low</span> — Occasional foreign visitors but predominantly local. Some English awareness but not tourist-oriented.</li>
          </ul>
        </div>
      </div>

      {/* Sources List */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          Citations
        </h2>
        <div className="space-y-3">
          {sources.map((source, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-white">{source.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-gray-700/50 text-xs text-gray-400">{source.type}</span>
                </div>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 flex-shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Visit
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers */}
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-white mb-3">Important Notes</h2>
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-start gap-2"><span className="text-gray-500">•</span>Hours and prices are subject to change. Always verify on Tabelog or Google Maps before visiting.</div>
          <div className="flex items-start gap-2"><span className="text-gray-500">•</span>Festival dates for 2026 are based on historical patterns and announced schedules. Check official websites closer to your trip.</div>
          <div className="flex items-start gap-2"><span className="text-gray-500">•</span>Tourist density assessments reflect typical conditions. Major holidays (especially around June 15 if any) may increase crowds everywhere.</div>
          <div className="flex items-start gap-2"><span className="text-gray-500">•</span>Some shops may close irregularly — especially small family-run ramen shops. Tabelog and Google Maps show real-time status.</div>
          <div className="flex items-start gap-2"><span className="text-gray-500">•</span>Rainy season timing varies year to year. Typically starts early-to-mid June in Kanto (Tokyo) and slightly earlier in Kansai (Kyoto).</div>
        </div>
      </div>

      {/* Practical Tips */}
      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-rose-300 mb-3">Essential Apps & Tools</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Tabelog</strong> — Japan's #1 restaurant review app. Ratings above 3.5 are excellent (it's harsh). Use for ramen shop verification.</div>
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Google Maps</strong> — Live hours, crowd indicators, directions. Works perfectly in Japan.</div>
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Google Translate camera</strong> — Point at Japanese menus, signs, ticket machines for instant translation.</div>
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Suica/Pasmo IC card</strong> — Contactless transit card. Works on all trains, buses, and many vending machines/konbini.</div>
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Navitime or Japan Transit</strong> — Train route planning with real-time delays and platform numbers.</div>
          <div className="flex items-start gap-2"><span className="text-rose-400">•</span><strong>Pocket WiFi or eSIM</strong> — Essential. Get unlimited data before arrival. Most physical SIMs sell at airport.</div>
        </div>
      </div>
    </div>
  );
}
