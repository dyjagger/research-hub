import React from 'react';
import { Award, ArrowRight, CheckCircle } from 'lucide-react';
import { recommendations } from '../data/researchData';

const TIER_STYLES = {
  A: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', badge: 'bg-emerald-500', text: 'text-emerald-400' },
  B: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', badge: 'bg-amber-500', text: 'text-amber-400' },
  C: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', badge: 'bg-blue-500', text: 'text-blue-400' },
  D: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', badge: 'bg-rose-500', text: 'text-rose-400' },
};

export default function Recommendations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Recommendations</h2>
        <p className="text-gray-400 text-sm">Ranked options from best value to worst, with confidence scores based on the research.</p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, i) => {
          const style = TIER_STYLES[rec.tier];
          const isTop = i === 0;
          return (
            <div key={rec.tier} className={`${style.bg} border ${style.border} rounded-xl p-5 ${isTop ? 'ring-1 ring-emerald-500/30' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${style.badge} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{rec.tier}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold ${style.text} uppercase tracking-wider`}>{rec.label}</span>
                    {isTop && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{rec.action}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{rec.reasoning}</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-semibold ${style.text}`}>{rec.cost}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-500">Confidence:</span>
                      <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rec.confidence >= 80 ? 'bg-emerald-500' : rec.confidence >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">{rec.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
