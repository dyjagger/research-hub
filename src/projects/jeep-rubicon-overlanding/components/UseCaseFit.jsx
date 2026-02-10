import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { products, useCaseRatings, useCaseLabels, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const useCaseDescriptions = {
  weekendCamping: 'Quick 1-2 night trips to established campgrounds or easy trails. Setup speed and comfort matter most.',
  extendedOverland: 'Multi-day to multi-week trips through remote terrain. Durability, weather protection, and livability are critical.',
  dailyDriving: 'The tent stays mounted on your Jeep for daily commuting. Low profile, aerodynamics, and weight matter.',
  familyCamping: 'Camping with 3+ people (partner + kids or dog). Sleeping capacity and interior space are key.',
  extremeWeather: 'Camping in snow, heavy rain, high winds, or extreme cold. 4-season rating, insulation, and condensation management.',
};

const useCaseIcons = {
  weekendCamping: '🏕️',
  extendedOverland: '🗺️',
  dailyDriving: '🚗',
  familyCamping: '👨‍👩‍👧',
  extremeWeather: '❄️',
};

const getRatingColor = (rating) => {
  if (rating >= 5) return 'text-emerald-400 bg-emerald-400/10';
  if (rating >= 4) return 'text-green-400 bg-green-400/10';
  if (rating >= 3) return 'text-amber-400 bg-amber-400/10';
  if (rating >= 2) return 'text-orange-400 bg-orange-400/10';
  return 'text-red-400 bg-red-400/10';
};

const topPicks = {
  weekendCamping: { id: 'ikamper-skycamp-3-mini', reason: 'Fast setup, comfortable mattress, great ventilation' },
  extendedOverland: { id: 'alu-cab-gen3-expedition', reason: 'Expedition-proven, all-aluminum, built for decades of abuse' },
  dailyDriving: { id: 'roofnest-falcon-3-evo', reason: '8" closed profile, most aerodynamic, minimal fuel impact' },
  familyCamping: { id: 'roofnest-condor-overland', reason: 'Largest sleeping area (37.3 sqft), sleeps 3, flat floor' },
  extremeWeather: { id: 'james-baroud-odyssey', reason: 'Built-in condensation fan, full blackout, 4-season, Made in Portugal' },
};

const UseCaseFit = () => {
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const useCaseKeys = Object.keys(useCaseLabels);

  // Top 5 for radar chart
  const radarProducts = ['ikamper-skycamp-3-mini', 'ikamper-bdv-duo', 'roofnest-falcon-3-evo', 'roofnest-condor-overland', 'alu-cab-gen3-expedition'];
  const radarData = useCaseKeys.map(key => {
    const entry = { useCase: useCaseLabels[key] };
    radarProducts.forEach(pid => {
      const p = products.find(pr => pr.id === pid);
      entry[p.name] = useCaseRatings[pid]?.[key] || 0;
    });
    return entry;
  });

  const radarColors = radarProducts.map(pid => {
    const p = products.find(pr => pr.id === pid);
    return BRAND_COLORS[p.brand] || '#6366f1';
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Use Case Fit</h2>
        <p className="text-gray-400 text-sm">How each RTT performs across 5 distinct overlanding scenarios</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {useCaseKeys.map(key => {
          const pick = topPicks[key];
          const pickProduct = products.find(p => p.id === pick.id);
          return (
            <button key={key} onClick={() => setSelectedUseCase(selectedUseCase === key ? null : key)} className={`text-left bg-gray-800/40 border rounded-xl p-4 transition-all hover:bg-gray-800/60 ${selectedUseCase === key ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-gray-700/50'}`}>
              <div className="text-2xl mb-2">{useCaseIcons[key]}</div>
              <p className="text-white font-semibold text-sm">{useCaseLabels[key]}</p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{useCaseDescriptions[key]}</p>
              <div className="mt-3 pt-2 border-t border-gray-700/30">
                <p className="text-emerald-400 text-xs font-medium">Top Pick</p>
                <p className="text-gray-300 text-xs">{pickProduct?.name}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedUseCase && (
        <div className="bg-gray-800/40 border border-emerald-500/30 rounded-xl p-5">
          <h3 className="text-emerald-400 font-semibold mb-1">{useCaseLabels[selectedUseCase]} — All Ratings</h3>
          <p className="text-gray-400 text-xs mb-4">{useCaseDescriptions[selectedUseCase]}</p>
          <div className="space-y-2">
            {[...products].sort((a, b) => (useCaseRatings[b.id]?.[selectedUseCase] || 0) - (useCaseRatings[a.id]?.[selectedUseCase] || 0)).map(p => {
              const rating = useCaseRatings[p.id]?.[selectedUseCase] || 0;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-gray-300 text-sm w-48 flex-shrink-0 truncate">{p.name}</span>
                  <div className="flex-1 bg-gray-900/50 rounded-full h-4 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(rating / 5) * 100}%`, backgroundColor: rating >= 4 ? '#10b981' : rating >= 3 ? '#f59e0b' : '#6b7280' }} />
                  </div>
                  <span className={`text-sm font-bold w-8 text-right ${rating >= 4 ? 'text-emerald-400' : rating >= 3 ? 'text-amber-400' : 'text-gray-500'}`}>{rating}/5</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-700/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-800/80 z-10 min-w-[160px]">Tent</th>
              {useCaseKeys.map(key => (
                <th key={key} className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{useCaseLabels[key]}</th>
              ))}
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Avg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map(p => {
              const ratings = useCaseRatings[p.id] || {};
              const avg = (useCaseKeys.reduce((s, k) => s + (ratings[k] || 0), 0) / useCaseKeys.length).toFixed(1);
              return (
                <tr key={p.id} className="hover:bg-gray-800/40">
                  <td className="px-3 py-2 sticky left-0 bg-gray-950/90 z-10">
                    <p className="text-white text-sm font-medium">{p.name}</p>
                  </td>
                  {useCaseKeys.map(key => {
                    const r = ratings[key] || 0;
                    return (
                      <td key={key} className="px-3 py-2 text-center">
                        <span className={`inline-block w-8 h-6 leading-6 rounded text-xs font-bold ${getRatingColor(r)}`}>{r}</span>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-center">
                    <span className="text-white font-bold text-sm">{avg}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Top 5 Contenders — Radar Comparison</h3>
        <p className="text-gray-400 text-xs mb-4">How the top 5 premium/mid tents compare across all use cases</p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="useCase" stroke="#9ca3af" fontSize={11} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#4b5563" fontSize={10} />
            {radarProducts.map((pid, i) => {
              const p = products.find(pr => pr.id === pid);
              return (
                <Radar key={pid} name={p.name} dataKey={p.name} stroke={radarColors[i]} fill={radarColors[i]} fillOpacity={0.1} strokeWidth={2} />
              );
            })}
            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {radarProducts.map((pid, i) => {
            const p = products.find(pr => pr.id === pid);
            return (
              <div key={pid} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: radarColors[i] }} />
                <span className="text-gray-400 text-xs">{p.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="recommendation" title="No Single Tent Wins Everything">
        The radar chart reveals a key truth: <strong>no single RTT scores 5/5 across all use cases</strong>. The iKamper Skycamp 3.0 Mini comes closest as an all-rounder, but if you prioritize daily driving, the Falcon 3 EVO wins. If family space matters most, the Condor Overland is unmatched. Pick the use case that matters most to <em>you</em>, then optimize for that.
      </InsightCallout>
    </div>
  );
};

export default UseCaseFit;
