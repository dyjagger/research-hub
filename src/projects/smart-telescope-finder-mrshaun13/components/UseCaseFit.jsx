import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import InsightCallout from './InsightCallout';
import { products, useCaseRatings, BRAND_COLORS } from '../data/products';

const useCaseLabels = {
  deepSky: 'Deep Sky',
  moonSun: 'Moon & Sun',
  terrestrial: 'Terrestrial',
  portability: 'Portability',
  astrophoto: 'Astrophotography',
  easeOfUse: 'Ease of Use',
};

const ratingColor = (val) => {
  if (val >= 4) return 'bg-emerald-500/20 text-emerald-400';
  if (val >= 3) return 'bg-amber-500/20 text-amber-400';
  if (val >= 2) return 'bg-orange-500/20 text-orange-400';
  return 'bg-red-500/20 text-red-400';
};

const UseCaseFit = () => {
  const terrestrialProducts = products.filter(p => p.terrestrial_viewing);
  const [selectedIds, setSelectedIds] = useState(
    terrestrialProducts.slice(0, 4).map(p => p.id)
  );

  const toggleProduct = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const radarData = Object.keys(useCaseLabels).map(key => {
    const entry = { useCase: useCaseLabels[key] };
    selectedIds.forEach(id => {
      const ratings = useCaseRatings[id];
      if (ratings) entry[id] = ratings[key];
    });
    return entry;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Use Case Fit</h2>
        <p className="text-gray-400 mt-1">How each telescope performs across your key use cases (1-5 scale)</p>
      </div>

      <InsightCallout variant="info" title="Use Cases Explained">
        <strong>Deep Sky</strong> — galaxies, nebulae, star clusters (aperture-driven).{' '}
        <strong>Moon & Sun</strong> — detailed lunar/solar imaging.{' '}
        <strong>Terrestrial</strong> — daytime buildings, skyline, wildlife (your Nashville view).{' '}
        <strong>Portability</strong> — weight and size for easy setup.{' '}
        <strong>Astrophotography</strong> — image quality for sharing/printing.{' '}
        <strong>Ease of Use</strong> — setup time, app quality, learning curve.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Use Case Ratings Grid</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase sticky left-0 bg-gray-800/80 z-10">Model</th>
                {Object.values(useCaseLabels).map(label => (
                  <th key={label} className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">{label}</th>
                ))}
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-400 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map(p => {
                const ratings = useCaseRatings[p.id];
                if (!ratings) return null;
                const total = Object.values(ratings).reduce((s, v) => s + v, 0);
                return (
                  <tr key={p.id} className="hover:bg-gray-800/40">
                    <td className="px-3 py-2 font-medium text-white sticky left-0 bg-gray-900/90 z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                        <span className="text-xs">{p.name}</span>
                        {!p.terrestrial_viewing && <span className="text-[10px] text-red-400 bg-red-900/30 px-1 rounded">No Terr.</span>}
                      </div>
                    </td>
                    {Object.keys(useCaseLabels).map(key => (
                      <td key={key} className="px-3 py-2 text-center">
                        <span className={`inline-block w-7 h-7 leading-7 rounded-lg text-xs font-bold ${ratingColor(ratings[key])}`}>
                          {ratings[key]}
                        </span>
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center">
                      <span className="text-white font-bold text-sm">{total}</span>
                      <span className="text-gray-500 text-xs">/30</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-2">Radar Comparison — Select up to 5 models</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {products.map(p => (
            <button
              key={p.id}
              onClick={() => toggleProduct(p.id)}
              className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                selectedIds.includes(p.id)
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="useCase" stroke="#9ca3af" fontSize={11} />
            <PolarRadiusAxis domain={[0, 5]} stroke="#4b5563" fontSize={9} />
            {selectedIds.map((id, i) => {
              const p = products.find(x => x.id === id);
              return (
                <Radar
                  key={id}
                  name={p?.name || id}
                  dataKey={id}
                  stroke={BRAND_COLORS[p?.brand] || '#6b7280'}
                  fill={BRAND_COLORS[p?.brand] || '#6b7280'}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              );
            })}
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-sm">
                    <p className="text-gray-300 font-medium mb-1">{label}</p>
                    {payload.map((entry, i) => (
                      <p key={i} style={{ color: entry.color }} className="text-xs">
                        {entry.name}: {entry.value}/5
                      </p>
                    ))}
                  </div>
                );
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="recommendation" title="Top Picks by Use Case">
        <strong>Best for Terrestrial (Nashville Skyline):</strong> DWARF 3 (5/5) — dedicated VIS filter designed for daytime photography.<br />
        <strong>Best for Deep Sky:</strong> Celestron Origin Mark II, Equinox 2, Vespera Pro (all 5/5) — large aperture or premium sensors.<br />
        <strong>Best for Portability:</strong> DWARF Mini (5/5) — under 2 lbs, fits in a pocket.<br />
        <strong>Best Ease of Use:</strong> Seestar S30, S30 Pro, S50, Odyssey Pro (all 5/5) — polished apps, minimal setup.<br />
        <strong>Best All-Rounder for YOUR use case:</strong> Seestar S30 Pro or DWARF 3 — strong across all categories with terrestrial support.
      </InsightCallout>
    </div>
  );
};

export default UseCaseFit;
