import React from 'react';
import { Check, X } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { products, features, BRAND_COLORS } from '../data/products';

const FeaturesMatrix = () => {
  const featureScores = products.map(p => {
    const score = features.reduce((sum, f) => sum + (p[f.key] ? 1 : 0), 0);
    return { ...p, featureScore: score };
  }).sort((a, b) => b.featureScore - a.featureScore);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Features Matrix</h2>
        <p className="text-gray-400 mt-1">Boolean feature comparison — which scopes have what you need</p>
      </div>

      <InsightCallout variant="warning" title="Features That Matter for Your Setup">
        For your porch → phone → TV workflow, the must-have features are: <strong>Scenery/Terrestrial Mode</strong> (for Nashville skyline),
        <strong> WiFi Control</strong> (phone control from couch), and <strong>Live Stacking</strong> (for stargazing).
        Nice-to-haves: Dual Camera (wide + telephoto), Built-in Filters (light pollution), EQ Mode (longer exposures).
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Feature Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map(f => (
            <div key={f.key} className="bg-gray-800/60 rounded-lg px-3 py-2">
              <p className="text-xs font-semibold text-cyan-400">{f.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-white mb-3">Feature Matrix</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase sticky left-0 bg-gray-800/80 z-10 min-w-[140px]">Model</th>
              {features.map(f => (
                <th key={f.key} className="px-2 py-2 text-center text-[10px] font-medium text-gray-400 uppercase min-w-[70px]">
                  {f.label.split('/')[0]}
                </th>
              ))}
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {featureScores.map(p => (
              <tr key={p.id} className="hover:bg-gray-800/40">
                <td className="px-3 py-2 font-medium text-white sticky left-0 bg-gray-900/90 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                    <span className="text-xs whitespace-nowrap">{p.name}</span>
                  </div>
                </td>
                {features.map(f => (
                  <td key={f.key} className="px-2 py-2 text-center">
                    {p[f.key]
                      ? <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      : <X className="w-4 h-4 text-gray-600 mx-auto" />}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.featureScore >= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                    p.featureScore >= 6 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {p.featureScore}/{features.length}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Feature Score Ranking</h3>
        <div className="space-y-2">
          {featureScores.map(p => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-28 text-xs text-gray-300 flex items-center gap-1.5 flex-shrink-0">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                {p.name}
              </div>
              <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    p.featureScore >= 8 ? 'bg-emerald-500' :
                    p.featureScore >= 6 ? 'bg-amber-500' :
                    'bg-gray-600'
                  }`}
                  style={{ width: `${(p.featureScore / features.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">{p.featureScore}/{features.length}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="highlight" title="Feature Kings">
        The <strong>DWARF 3</strong> and <strong>Seestar S30 Pro</strong> tie for the most features — they have nearly everything: terrestrial mode, dual cameras, EQ mode, built-in filters, WiFi, and GPS.
        The Unistellar and Vaonis models score lowest because they focus on doing one thing (astronomy) extremely well, but lack versatility features.
      </InsightCallout>
    </div>
  );
};

export default FeaturesMatrix;
