import React from 'react';
import { Smartphone, TrendingDown, Clock, DollarSign, Zap, Shield } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { currentPhone, recommendations, featureDelta } from '../data/researchData';

const STATS = [
  { icon: Smartphone, label: 'Your Phone', value: 'Pixel 9 Pro', sub: 'Owned outright', color: 'text-emerald-400' },
  { icon: Clock, label: 'Updates Left', value: '6 years', sub: 'Through ~2031', color: 'text-blue-400' },
  { icon: DollarSign, label: 'Resale Value', value: '~$455', sub: 'Swappa avg, Feb 2026', color: 'text-violet-400' },
  { icon: Zap, label: 'Upgrade Net Cost', value: '$195–544', sub: 'Depending on deal', color: 'text-amber-400' },
  { icon: TrendingDown, label: 'Innovation Cycle', value: 'Tock Year', sub: 'Pixel 10 = refinement', color: 'text-rose-400' },
  { icon: Shield, label: 'High-Impact Gains', value: `${featureDelta.gains.filter(g => g.impact === 'high').length}`, sub: `of ${featureDelta.gains.length} new features`, color: 'text-cyan-400' },
];

export default function Overview() {
  const topRec = recommendations[0];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Should You Upgrade from the Pixel 9 Pro?</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          You own a Pixel 9 Pro outright and it works perfectly. The Pixel 10 Pro is out, the Pixel 10 standard is cheaper,
          and deals are everywhere. This dashboard breaks down exactly what you'd gain, what you'd lose, what it costs,
          and whether the Pixel upgrade cycle says "now" or "wait."
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <InsightCallout variant="verdict" title="Bottom Line">
        <strong>{topRec.action}</strong> — {topRec.reasoning}
      </InsightCallout>

      <InsightCallout variant="insight" title="The Tick-Tock Pattern">
        Google's Pixel lineup follows a clear innovation cycle. The Pixel 6 and 8 were "tick" years with major hardware changes.
        The Pixel 7 and 10 were "tock" years — same design, refined internals. You bought during a tick year (Pixel 9 = design overhaul + Gemini).
        Upgrading during a tock year means paying full price for incremental gains. History says wait for the next tick.
      </InsightCallout>
    </div>
  );
}
