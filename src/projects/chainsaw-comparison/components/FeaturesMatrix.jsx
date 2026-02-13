import React from 'react';
import { Check, X } from 'lucide-react';
import { products, FEATURES, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const FeaturesMatrix = () => {
  const scored = products.map(p => {
    const score = FEATURES.reduce((s, f) => s + (p[f.key] ? 1 : 0), 0);
    return { ...p, featureScore: score };
  }).sort((a, b) => b.featureScore - a.featureScore);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Features Matrix</h2>
      <p className="text-gray-500 text-sm mb-6">Safety, convenience, and build quality features across all 12 models</p>

      <InsightCallout variant="info" title="What These Features Mean for You">
        <strong>Decompression valve</strong> = much easier pull-starting (critical for beginners). <strong>Auto-Tune/M-Tronic</strong> = the saw adjusts itself for altitude, temperature, and fuel quality — zero carburetor fiddling. <strong>Adjustable oiler</strong> = control bar oil flow for different bar lengths. <strong>Magnesium crankcase</strong> isn't listed here but is the single biggest build quality indicator — see the Power & Weight section.
      </InsightCallout>

      {/* Feature Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {FEATURES.map(f => (
          <div key={f.key} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-200">{f.label}</p>
            <p className="text-xs text-gray-500 mt-1">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Matrix Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-900 z-10 min-w-[180px]">Model</th>
                {FEATURES.map(f => (
                  <th key={f.key} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{f.label}</th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody>
              {scored.map((p, i) => (
                <tr key={p.id} className={`border-b border-gray-800/50 ${i % 2 === 0 ? '' : 'bg-gray-800/20'}`}>
                  <td className="px-4 py-3 sticky left-0 bg-gray-900 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                      <span className="font-medium text-gray-200 text-xs">{p.model}</span>
                    </div>
                  </td>
                  {FEATURES.map(f => (
                    <td key={f.key} className="px-3 py-3 text-center">
                      {p[f.key]
                        ? <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        : <X className="w-4 h-4 text-gray-700 mx-auto" />
                      }
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold text-sm ${p.featureScore >= 7 ? 'text-emerald-400' : p.featureScore >= 5 ? 'text-amber-400' : 'text-gray-500'}`}>
                      {p.featureScore}/{FEATURES.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Score Ranking */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Feature Score Ranking</h3>
        <div className="space-y-3">
          {scored.map(p => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
              <span className="text-sm text-gray-300 w-40 flex-shrink-0">{p.model}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(p.featureScore / FEATURES.length) * 100}%`,
                    backgroundColor: p.featureScore >= 7 ? '#22c55e' : p.featureScore >= 5 ? '#f59e0b' : '#6b7280',
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-400 w-12 text-right">{p.featureScore}/{FEATURES.length}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesMatrix;
