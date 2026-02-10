import React, { useState } from 'react';
import { MapPin, Star, TrendingUp, Calendar, Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { regions } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const appealColors = {
  5: '#f43f5e',
  4: '#8b5cf6',
  3: '#f59e0b',
  2: '#6b7280',
};

export default function RegionalCoverage() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const coverageData = regions.map(r => ({
    name: r.name.length > 15 ? r.name.substring(0, 14) + '…' : r.name,
    fullName: r.name,
    coverage: r.dmcCoverage,
    appeal: r.luxuryAppeal,
  })).sort((a, b) => b.coverage - a.coverage);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Regional Coverage</h2>
        <p className="text-gray-400 text-sm mt-1">
          Which DMCs operate where — luxury appeal ratings, emerging destinations, and seasonal guidance across 10 regions
        </p>
      </div>

      <InsightCallout>
        70% of visitors concentrate in Tokyo, Osaka, and Kyoto — but the Japanese government is actively developing 14 model
        luxury destinations in regional areas. For travel agents, this creates a competitive advantage: clients who've "done"
        Tokyo and Kyoto are hungry for Setouchi art islands, Tohoku's hidden onsen, and Kyushu's luxury trains. DMCs with
        strong regional networks (Beauty of Japan, InsideJapan Tours, Boutique JTB) are best positioned for these itineraries.
      </InsightCallout>

      {/* DMC Coverage Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">DMC Coverage by Region</h3>
        <p className="text-xs text-gray-500 mb-4">Number of profiled DMCs operating in each region (out of 20)</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={coverageData} layout="vertical" margin={{ left: 110 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 20]} />
            <YAxis dataKey="name" type="category" tick={{ fill: '#9ca3af', fontSize: 11 }} width={105} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="coverage" name="DMCs Operating" radius={[0, 4, 4, 0]}>
              {coverageData.map((entry) => (
                <rect key={entry.name} fill={appealColors[entry.appeal] || '#6b7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 justify-center">
          {[5, 4, 3].map(level => (
            <span key={level} className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: appealColors[level] }} />
              {level === 5 ? 'Top Tier' : level === 4 ? 'High' : 'Emerging'} Luxury Appeal
            </span>
          ))}
        </div>
      </div>

      {/* Region Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {regions.map((region) => {
          const isSelected = selectedRegion === region.name;
          const color = appealColors[region.luxuryAppeal] || '#6b7280';
          return (
            <button
              key={region.name}
              onClick={() => setSelectedRegion(isSelected ? null : region.name)}
              className={`text-left bg-gray-900 border rounded-lg p-4 transition-all ${
                isSelected ? 'border-gray-600 ring-1 ring-gray-700' : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} style={{ color }} />
                    <h4 className="text-sm font-semibold text-white">{region.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={10} fill={i < region.luxuryAppeal ? color : 'transparent'} stroke={i < region.luxuryAppeal ? color : '#4b5563'} />
                    ))}
                    <span className="text-[10px] text-gray-500 ml-1">Luxury Appeal</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{region.dmcCoverage}</p>
                  <p className="text-[10px] text-gray-500">DMCs</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-3">{region.description}</p>

              {isSelected && (
                <div className="space-y-3 mt-3 pt-3 border-t border-gray-800">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide flex items-center gap-1">
                      <Star size={9} />Top Luxury Experiences
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {region.topExperiences.map(exp => (
                        <span key={exp} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{exp}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={10} className="text-gray-500" />
                    <span className="text-xs text-gray-400"><span className="text-gray-300">Season:</span> {region.seasonality}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp size={10} className="text-green-400 mt-0.5" />
                    <span className="text-xs text-green-400">{region.emergingTrend}</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Emerging Destinations Spotlight */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Emerging Luxury Destinations — Agent Opportunity</h3>
        <p className="text-xs text-gray-400 mb-4">
          These regions are being actively developed by the Japanese government for luxury tourism. Early-mover travel agents
          who build DMC relationships here will have a competitive advantage as demand grows.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: 'Setouchi & Art Islands',
              why: 'Naoshima, Teshima, Inujima art islands + Azumi Setoda boutique hotel. The "new Kyoto" for design-conscious luxury travelers.',
              dmcs: 'Toki, Beauty of Japan, InsideJapan Tours',
              readiness: 'High',
            },
            {
              name: 'Tohoku Hidden Onsen',
              why: 'Ginzan Onsen (Spirited Away inspiration), Nyuto Onsen, Zao snow monsters. Authentic Japan without crowds.',
              dmcs: 'InsideJapan Tours, Boutique JTB',
              readiness: 'Medium',
            },
            {
              name: 'Kanazawa "Little Kyoto"',
              why: 'Geisha districts, Kenroku-en garden, gold leaf crafts, fresh seafood. All the culture of Kyoto with none of the overtourism.',
              dmcs: 'Boutique JTB, InsideJapan Tours, Beauty of Japan',
              readiness: 'High',
            },
          ].map((dest) => (
            <div key={dest.name} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  dest.readiness === 'High' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {dest.readiness} Readiness
                </span>
              </div>
              <p className="text-sm font-medium text-white mb-1">{dest.name}</p>
              <p className="text-xs text-gray-400 mb-2">{dest.why}</p>
              <p className="text-[10px] text-gray-500">
                <span className="text-gray-400">Best DMCs:</span> {dest.dmcs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
