import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { featureDelta } from '../data/researchData';

const IMPACT_STYLES = {
  high: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', badge: 'bg-emerald-500/20 text-emerald-400', label: 'High Impact' },
  medium: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', badge: 'bg-amber-500/20 text-amber-400', label: 'Medium' },
  low: { bg: 'bg-gray-500/10', border: 'border-gray-700/30', badge: 'bg-gray-500/20 text-gray-400', label: 'Low' },
};

const CATEGORY_COLORS = {
  Performance: 'text-red-400',
  Charging: 'text-violet-400',
  Connectivity: 'text-blue-400',
  Camera: 'text-amber-400',
  Display: 'text-cyan-400',
  'Battery': 'text-emerald-400',
  'AI Software': 'text-rose-400',
  Software: 'text-indigo-400',
  Design: 'text-gray-400',
  Sensors: 'text-teal-400',
};

export default function FeatureDelta() {
  const highImpact = featureDelta.gains.filter(g => g.impact === 'high');
  const medImpact = featureDelta.gains.filter(g => g.impact === 'medium');
  const lowImpact = featureDelta.gains.filter(g => g.impact === 'low');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">What You're Missing</h2>
        <p className="text-gray-400 text-sm">Feature-by-feature breakdown of what the Pixel 10 Pro adds over your Pixel 9 Pro — and what you'd lose.</p>
      </div>

      <InsightCallout variant="warning" title="Only 1 High-Impact Gain">
        Of {featureDelta.gains.length} new features on the Pixel 10 Pro, only the Tensor G5 chip qualifies as a high-impact upgrade.
        The rest are medium or low impact — nice-to-haves, not need-to-haves. And you'd lose the physical SIM slot.
      </InsightCallout>

      {/* Gains */}
      <div>
        <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
          <ArrowUp className="w-4 h-4" /> What You Gain ({featureDelta.gains.length} features)
        </h3>
        <div className="space-y-2">
          {[...highImpact, ...medImpact, ...lowImpact].map((item, i) => {
            const style = IMPACT_STYLES[item.impact];
            return (
              <div key={i} className={`${style.bg} border ${style.border} rounded-lg p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{item.feature}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${style.badge}`}>{style.label}</span>
                      <span className={`text-[10px] ${CATEGORY_COLORS[item.category] || 'text-gray-400'}`}>{item.category}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Losses */}
      <div>
        <h3 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
          <ArrowDown className="w-4 h-4" /> What You Lose ({featureDelta.losses.length} features)
        </h3>
        <div className="space-y-2">
          {featureDelta.losses.map((item, i) => {
            const style = IMPACT_STYLES[item.impact];
            return (
              <div key={i} className="bg-rose-500/5 border border-rose-500/15 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{item.feature}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${style.badge}`}>{style.label}</span>
                      <span className={`text-[10px] ${CATEGORY_COLORS[item.category] || 'text-gray-400'}`}>{item.category}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Impact Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-400">{highImpact.length}</p>
            <p className="text-xs text-gray-500">High Impact</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-400">{medImpact.length}</p>
            <p className="text-xs text-gray-500">Medium Impact</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-400">{lowImpact.length}</p>
            <p className="text-xs text-gray-500">Low Impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
