import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { products, USE_CASES, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const UseCaseFit = () => {
  const topContenders = ['stihl-ms-261', 'echo-cs-590', 'husqvarna-545-mk2', 'husqvarna-550xp-mk2', 'echo-cs-620p'];
  const topProducts = topContenders.map(id => products.find(p => p.id === id)).filter(Boolean);

  const radarData = USE_CASES.map(uc => {
    const point = { useCase: uc.label };
    topProducts.forEach(p => {
      point[p.id] = p.useCaseRatings?.[uc.key] || 0;
    });
    return point;
  });

  const allRated = products.map(p => ({
    ...p,
    totalScore: USE_CASES.reduce((s, uc) => s + (p.useCaseRatings?.[uc.key] || 0), 0),
  })).sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Use Case Fit</h2>
      <p className="text-gray-500 text-sm mb-6">How well each saw handles your specific Tennessee property needs</p>

      <InsightCallout variant="recommendation" title="Your Primary Use Cases">
        <strong>Storm cleanup</strong> (immediate — fallen trees everywhere), <strong>firewood</strong> (Tennessee winters), <strong>property maintenance</strong> (ongoing), and occasional <strong>tree felling</strong>. You need a saw that scores high across ALL of these — not just one. The radar chart below shows which saws are the most versatile.
      </InsightCallout>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {USE_CASES.map(uc => {
          const best = allRated.reduce((b, p) => (p.useCaseRatings?.[uc.key] || 0) > (b.useCaseRatings?.[uc.key] || 0) ? p : b);
          return (
            <div key={uc.key} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-200">{uc.label}</p>
              <p className="text-xs text-gray-500 mt-1 mb-3">{uc.description}</p>
              <p className="text-xs text-gray-400">Top pick:</p>
              <p className="text-sm font-medium text-orange-400">{best.model}</p>
            </div>
          );
        })}
      </div>

      {/* Radar Chart — Top 5 Contenders */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Top 5 Contenders — Use Case Radar</h3>
        <p className="text-sm text-gray-500 mb-4">Larger area = more versatile across all use cases</p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="useCase" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {topProducts.map((p, i) => (
              <Radar
                key={p.id}
                name={p.model}
                dataKey={p.id}
                stroke={BRAND_COLORS[p.brand]}
                fill={BRAND_COLORS[p.brand]}
                fillOpacity={i === 0 ? 0.15 : 0.05}
                strokeWidth={2}
              />
            ))}
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                  <p className="text-sm font-medium text-gray-300 mb-1">{label}</p>
                  {payload.map((entry, i) => {
                    const prod = topProducts.find(p => p.id === entry.dataKey);
                    return (
                      <p key={i} className="text-xs" style={{ color: entry.stroke }}>
                        {prod?.model}: {entry.value}/5
                      </p>
                    );
                  })}
                </div>
              );
            }} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {topProducts.map(p => (
            <div key={p.id} className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
              {p.model}
            </div>
          ))}
        </div>
      </div>

      {/* Full Rated Grid */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-900 z-10 min-w-[160px]">Model</th>
                {USE_CASES.map(uc => (
                  <th key={uc.key} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{uc.label}</th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {allRated.map((p, i) => (
                <tr key={p.id} className={`border-b border-gray-800/50 ${i % 2 === 0 ? '' : 'bg-gray-800/20'}`}>
                  <td className="px-4 py-3 sticky left-0 bg-gray-900 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                      <span className="font-medium text-gray-200 text-xs">{p.model}</span>
                    </div>
                  </td>
                  {USE_CASES.map(uc => {
                    const rating = p.useCaseRatings?.[uc.key] || 0;
                    return (
                      <td key={uc.key} className="px-3 py-3 text-center">
                        <span className={`text-sm font-medium ${rating >= 5 ? 'text-emerald-400' : rating >= 4 ? 'text-emerald-500/70' : rating >= 3 ? 'text-amber-400' : 'text-red-400'}`}>
                          {rating}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold text-sm ${p.totalScore >= 22 ? 'text-emerald-400' : p.totalScore >= 18 ? 'text-amber-400' : 'text-gray-500'}`}>
                      {p.totalScore}/{USE_CASES.length * 5}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UseCaseFit;
