import React from 'react';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';
import { sources } from '../data/researchData';

export default function Sources() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Sources & Methodology</h2>
        <p className="text-gray-400 text-sm">All data sources used in this analysis, plus methodology notes and limitations.</p>
      </div>

      {/* Sources List */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          {sources.length} Sources Cited
        </h3>
        <div className="space-y-2">
          {sources.map(source => (
            <div key={source.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
              <span className="text-xs text-gray-600 font-mono w-6 text-right flex-shrink-0">[{source.id}]</span>
              <div className="flex-1 min-w-0">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                >
                  {source.name}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
                <span className="text-[10px] text-gray-600">{source.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Methodology</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• Specs sourced from GSMArena (manufacturer-verified) and cross-referenced with PhoneArena</p>
          <p>• Pricing data from Amazon, Google Store, Swappa, and BankMyCell as of February 2026</p>
          <p>• Editorial perspectives from Android Central, Android Authority, and ZDNet</p>
          <p>• Innovation cycle analysis based on Google's official Pixel history and feature changelogs</p>
          <p>• Innovation scores (1-10) are subjective assessments based on the magnitude of hardware, software, and design changes relative to the previous generation</p>
          <p>• Trade-in values fluctuate daily; actual resale may differ from estimates shown</p>
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Limitations & Disclaimers
        </h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• Pricing is a snapshot — deals change frequently. Check current prices before purchasing.</p>
          <p>• The "tick-tock" cycle is an observed pattern, not a guarantee. Google could break the pattern with Pixel 11.</p>
          <p>• Camera quality comparisons are based on sensor specs, not real-world photo testing.</p>
          <p>• AI feature assessments (Magic Cue, Camera Coach) are based on reviewer consensus, not personal testing.</p>
          <p>• The Pixel 9a is included in pricing but not deeply compared — it's a different tier (budget vs flagship).</p>
          <p>• Resale values assume good condition, unlocked device. Carrier-locked or damaged phones will fetch less.</p>
        </div>
      </div>
    </div>
  );
}
