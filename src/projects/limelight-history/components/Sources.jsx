import React from 'react';
import { sources } from '../data/limelightData';
import InsightCallout from './InsightCallout';

const TIER_LABELS = {
  T1: { label: 'Primary Source', color: 'text-emerald-400 bg-emerald-500/10' },
  T2: { label: 'Verified Secondary', color: 'text-cyan-400 bg-cyan-500/10' },
  T3: { label: 'Tertiary/Aggregated', color: 'text-amber-400 bg-amber-500/10' },
  T4: { label: 'Estimate', color: 'text-red-400 bg-red-500/10' },
};

export default function Sources() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h2>
        <p className="text-slate-400">{sources.length} sources across legal records, financial filings, and industry analysis</p>
      </div>

      <InsightCallout variant="info" title="Data Quality Notes">
        Revenue data from 2005-2021 is sourced from SEC 10-K filings and CompaniesMarketCap.com. Post-2022 data
        (Edgio era) includes preliminary/unaudited figures due to accounting restatements. Market share estimates
        are triangulated from multiple industry reports and should be treated as T3 approximations. Stock price
        data uses annual averages with 52-week high/low ranges.
      </InsightCallout>

      {/* Source List */}
      <div className="space-y-3 mt-6">
        {sources.map(s => {
          const tier = TIER_LABELS[s.tier] || TIER_LABELS.T3;
          return (
            <div key={s.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 flex items-start gap-4">
              <span className="text-slate-600 text-xs font-mono w-6 flex-shrink-0 mt-1">[{s.id}]</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium truncate"
                  >
                    {s.title}
                  </a>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tier.color}`}>
                    {tier.label}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{s.type} · {s.url}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology */}
      <div className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Methodology</h3>
        <div className="space-y-3 text-sm text-slate-400">
          <p>
            <span className="text-white font-medium">Financial data:</span> Annual revenue figures sourced from
            SEC 10-K filings (2005-2021) and CompaniesMarketCap.com. Post-Edgecast merger figures (2022+) include
            combined entity revenue. 2024 figure is estimated based on partial-year reporting before bankruptcy.
          </p>
          <p>
            <span className="text-white font-medium">Stock prices:</span> Annual average closing prices with
            52-week high/low ranges from Barchart.com and historical NASDAQ data. IPO first-day price from
            DataCenterKnowledge.
          </p>
          <p>
            <span className="text-white font-medium">Market share:</span> Estimated from T4.ai, 6sense, Enlyft,
            and StreamingMediaBlog industry reports. CDN market share is notoriously difficult to measure precisely;
            figures represent best-available estimates and should be treated as directional.
          </p>
          <p>
            <span className="text-white font-medium">Legal timeline:</span> Sourced from Supreme Court records
            (Justia, Oyez, Cornell LII), Wikipedia case article, and Akamai press releases. Court dates and
            outcomes verified against multiple sources.
          </p>
          <p>
            <span className="text-white font-medium">Bankruptcy details:</span> Sourced from ElevenFlo's
            comprehensive bankruptcy analysis, which references Delaware court filings (Case 24-11989).
          </p>
        </div>
      </div>

      {/* Limitations */}
      <div className="mt-6 bg-slate-800/50 border border-amber-500/20 rounded-xl p-5">
        <h3 className="text-amber-400 font-semibold mb-3">Limitations & Caveats</h3>
        <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
          <li>Edgio's 2022-2023 financial data may be unreliable due to accounting restatements</li>
          <li>CDN market share figures are estimates — no single authoritative source exists</li>
          <li>Employee count data is sparse; peak figure of ~610 is from late-stage reporting</li>
          <li>Some acquisition values (Kiptronic, Delve, Layer0) were not publicly disclosed</li>
          <li>Stock price data uses annual averages, which smooth out intra-year volatility</li>
          <li>The 2024 revenue figure ($180M) is an estimate based on partial-year data before shutdown</li>
        </ul>
      </div>
    </div>
  );
}
