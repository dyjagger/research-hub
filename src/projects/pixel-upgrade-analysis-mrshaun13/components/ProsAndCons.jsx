import React from 'react';
import { ThumbsUp, ThumbsDown, Clock, Smartphone } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { prosAndCons } from '../data/researchData';

function ProConList({ items, type }) {
  const isPro = type === 'pro';
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
          isPro ? 'bg-emerald-500/5' : 'bg-rose-500/5'
        }`}>
          <span className={`text-sm mt-0.5 ${isPro ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPro ? '+' : '−'}
          </span>
          <p className="text-sm text-gray-300">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProsAndCons() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pros & Cons</h2>
        <p className="text-gray-400 text-sm">Two scenarios analyzed: upgrade now to the Pixel 10 Pro, or wait for the Pixel 11.</p>
      </div>

      {/* Upgrade Now */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-semibold text-white">Option A: Upgrade to Pixel 10 Pro Now</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5" /> Pros ({prosAndCons.upgradeNow.pros.length})
            </h4>
            <ProConList items={prosAndCons.upgradeNow.pros} type="pro" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-rose-400 mb-3 flex items-center gap-1.5">
              <ThumbsDown className="w-3.5 h-3.5" /> Cons ({prosAndCons.upgradeNow.cons.length})
            </h4>
            <ProConList items={prosAndCons.upgradeNow.cons} type="con" />
          </div>
        </div>
      </div>

      {/* Wait */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Option B: Wait for Pixel 11 (2026)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5" /> Pros ({prosAndCons.waitForPixel11.pros.length})
            </h4>
            <ProConList items={prosAndCons.waitForPixel11.pros} type="pro" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-rose-400 mb-3 flex items-center gap-1.5">
              <ThumbsDown className="w-3.5 h-3.5" /> Cons ({prosAndCons.waitForPixel11.cons.length})
            </h4>
            <ProConList items={prosAndCons.waitForPixel11.cons} type="con" />
          </div>
        </div>
      </div>

      <InsightCallout variant="verdict" title="The Verdict">
        The cons of upgrading now (7) outnumber the pros (5), and the single high-impact gain (Tensor G5) doesn't justify
        the cost when your phone has 6 years of updates remaining. The pros of waiting (5) are stronger than the cons (3).
        <strong> Wait for the Pixel 11.</strong>
      </InsightCallout>
    </div>
  );
}
