import React from 'react';
import { Check, X } from 'lucide-react';
import { products, featureLabels } from '../data/products';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const FeaturesMatrix = () => {
  const featureKeys = Object.keys(featureLabels);
  const totalFeatures = featureKeys.length;

  const scored = products.map(p => {
    const score = featureKeys.filter(k => p[k]).length;
    return { ...p, featureScore: score };
  }).sort((a, b) => b.featureScore - a.featureScore);

  const scoreData = scored.map(p => ({
    name: p.name.replace(p.brand + ' ', ''),
    fullName: p.name,
    score: p.featureScore,
    pct: Math.round((p.featureScore / totalFeatures) * 100),
  }));

  const getScoreColor = (score) => {
    if (score >= 5) return '#10b981';
    if (score >= 4) return '#f59e0b';
    return '#6b7280';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Features Matrix</h2>
        <p className="text-gray-400 text-sm">{totalFeatures} key features compared across all {products.length} rooftop tents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {featureKeys.map(key => (
          <div key={key} className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-3">
            <p className="text-white font-medium text-sm">{featureLabels[key]}</p>
            <p className="text-gray-500 text-xs mt-1">
              {key === 'hasAnnex' && 'Optional room extension that attaches below the tent for extra living space or changing area'}
              {key === 'hasLEDLights' && 'Built-in LED light strips inside the tent — no need to bring separate camp lights'}
              {key === 'canStoreBedding' && 'Leave your sleeping bag and pillows inside when the tent is folded for travel'}
              {key === 'hasRainfly' && 'Separate waterproof fly that can be removed for better airflow on clear nights'}
              {key === 'hasAntiCondensation' && 'Built-in mat or system to prevent moisture buildup on cold nights'}
              {key === 'hasBlackout' && 'Dark fabric that blocks sunlight for sleeping in — essential for summer camping'}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-800/80 z-10 min-w-[160px]">Tent</th>
              {featureKeys.map(key => (
                <th key={key} className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{featureLabels[key].replace('Built-in ', '').replace('Anti-', 'Anti ')}</th>
              ))}
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {scored.map(p => (
              <tr key={p.id} className="hover:bg-gray-800/40">
                <td className="px-3 py-2 sticky left-0 bg-gray-950/90 z-10">
                  <p className="text-white text-sm font-medium">{p.name}</p>
                </td>
                {featureKeys.map(key => (
                  <td key={key} className="px-3 py-2 text-center">
                    {p[key] ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />}
                  </td>
                ))}
                <td className="px-3 py-2 text-center">
                  <span className="font-bold text-sm" style={{ color: getScoreColor(p.featureScore) }}>
                    {p.featureScore}/{totalFeatures}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Feature Score Ranking</h3>
        <p className="text-gray-400 text-xs mb-4">Total features per tent — higher = more complete feature set</p>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={scoreData} layout="vertical" margin={{ left: 5, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" domain={[0, totalFeatures]} stroke="#9ca3af" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} width={140} />
            <Tooltip content={<CustomTooltip formatter={(v, key) => key === 'score' ? `${v}/${totalFeatures} features` : v} />} />
            <Bar dataKey="score" radius={[0, 6, 6, 0]}>
              {scoreData.map((entry, i) => (
                <Cell key={i} fill={getScoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="highlight" title="Feature Leaders">
        The <strong>iKamper Skycamp 3.0 Mini</strong> and <strong>James Baroud Odyssey</strong> lead with the most complete feature sets. Notably, <strong>blackout fabric</strong> and <strong>anti-condensation systems</strong> are only found on premium ($2,800+) tents — these are the features that separate "good enough" from "sleep like a baby anywhere."
      </InsightCallout>
    </div>
  );
};

export default FeaturesMatrix;
