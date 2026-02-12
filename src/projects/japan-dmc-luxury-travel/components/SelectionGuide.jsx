import React, { useState } from 'react';
import { Compass, Users, DollarSign, Target, ChevronDown, ChevronUp, CheckCircle2, Star } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { clientProfiles } from '../data/researchData';
import { dmcDirectory } from '../data/dmcProfiles';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const profileIcons = {
  'Ultra-HNW Individual/Couple': Star,
  'Luxury FIT (First-Time Japan)': Compass,
  'Luxury FIT (Repeat Visitor)': Target,
  'Luxury Family': Users,
  'Corporate Incentive / MICE': Users,
  'Art & Design Enthusiast': Star,
  'Adventure Luxury': Compass,
  'Wellness & Spiritual': Star,
};

const profileColors = ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#84cc16', '#6366f1'];

// Build radar data for top DMCs
const radarMetrics = ['Luxury Rating', 'Service Depth', 'Regional Coverage', 'Language Support', 'Experience Range'];

function getDMCRadar(dmcName) {
  const dmc = dmcDirectory.find(d => d.name === dmcName);
  if (!dmc) return null;
  const regionScore = dmc.regions.some(r => r.toLowerCase().includes('nationwide')) ? 5 : Math.min(5, Math.ceil(dmc.regions.length * 0.8));
  const langScore = Math.min(5, dmc.languages.length);
  const expScore = Math.min(5, Math.ceil(dmc.specializations.length / 1.5));
  const reviewScore = dmc.reviews?.google ? Math.round(dmc.reviews.google) : 3;
  return {
    name: dmcName,
    data: [
      { metric: 'Luxury', value: dmc.luxuryRating },
      { metric: 'Reviews', value: reviewScore },
      { metric: 'Coverage', value: regionScore },
      { metric: 'Languages', value: langScore },
      { metric: 'Experiences', value: expScore },
    ],
  };
}

export default function SelectionGuide() {
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [selectedDMCs, setSelectedDMCs] = useState(['Motenas Japan', 'JTB GMT (Sunrise Tours / Luxury Division)']);

  const topDMCNames = [
    'Motenas Japan', 'Beauty of Japan (BOJ)', 'Japan Royal Service', 'Toki Inc.',
    'JTB GMT (Sunrise Tours / Luxury Division)', 'InsideJapan Tours', 'Boutique Japan',
    'B Japan Tours', 'Cycle Japan Tours', 'Custom Japan Tours',
  ];

  const radarData = selectedDMCs.map(name => getDMCRadar(name)).filter(Boolean);

  // Merge radar data for comparison
  const mergedRadar = radarData.length > 0
    ? radarData[0].data.map((item, i) => {
        const point = { metric: item.metric };
        radarData.forEach((r, j) => {
          point[r.name] = r.data[i].value;
        });
        return point;
      })
    : [];

  const radarColors = ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b'];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">DMC Selection Guide</h2>
        <p className="text-gray-400 text-sm mt-1">
          Match your client's profile to the ideal DMC — decision framework with 8 client archetypes
        </p>
      </div>

      <InsightCallout>
        The single most important factor in DMC selection is matching the client's experience expectations to the DMC's
        specialization depth. An ultra-HNW client seeking private jet transfers and Living National Treasure access needs
        Motenas Japan or Beauty of Japan — not a large-scale MICE operator. Conversely, a 200-person corporate incentive
        group needs JTB GMT or Dispo, not a boutique 5-person DMC. Use the profiles below to quickly match clients to DMCs.
      </InsightCallout>

      {/* Quick Decision Matrix */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Quick Decision Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-500 pb-2 pr-4">If your client is…</th>
                <th className="text-left text-gray-500 pb-2 px-3">Budget</th>
                <th className="text-left text-gray-500 pb-2 px-3">Start with…</th>
                <th className="text-left text-gray-500 pb-2 px-3">Why</th>
              </tr>
            </thead>
            <tbody>
              {clientProfiles.map((p, i) => (
                <tr key={p.profile} className="border-b border-gray-800/50">
                  <td className="py-2.5 pr-4">
                    <span className="text-gray-200 font-medium">{p.profile}</span>
                  </td>
                  <td className="py-2.5 px-3 text-green-400 font-medium whitespace-nowrap">{p.budget}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {p.topDMCs.slice(0, 2).map(d => (
                        <span key={d} className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded text-[10px]">{d}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-400 max-w-xs">{p.reasoning.substring(0, 80)}…</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DMC Comparison Radar */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">DMC Comparison Radar</h3>
        <p className="text-xs text-gray-500 mb-3">Select up to 4 DMCs to compare across 5 dimensions</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topDMCNames.map((name) => {
            const isSelected = selectedDMCs.includes(name);
            const displayName = name.length > 25 ? name.substring(0, 24) + '…' : name;
            return (
              <button
                key={name}
                onClick={() => {
                  if (isSelected) {
                    setSelectedDMCs(selectedDMCs.filter(d => d !== name));
                  } else if (selectedDMCs.length < 4) {
                    setSelectedDMCs([...selectedDMCs, name]);
                  }
                }}
                className={`text-[11px] px-2 py-1 rounded transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-gray-800 text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {mergedRadar.length > 0 && (
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={mergedRadar}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 9 }} />
              {radarData.map((r, i) => (
                <Radar
                  key={r.name}
                  name={r.name}
                  dataKey={r.name}
                  stroke={radarColors[i]}
                  fill={radarColors[i]}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              ))}
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '11px' }}
                itemStyle={{ color: '#d1d5db' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}

        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {radarData.map((r, i) => (
            <span key={r.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: radarColors[i] }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: radarColors[i] }} />
              {r.name}
            </span>
          ))}
        </div>
      </div>

      {/* Detailed Client Profiles */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Detailed Client Profiles</h3>
        {clientProfiles.map((profile, i) => {
          const isExpanded = expandedProfile === i;
          const Icon = profileIcons[profile.profile] || Users;
          const color = profileColors[i % profileColors.length];

          return (
            <div key={profile.profile} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedProfile(isExpanded ? null : i)}
                className="w-full text-left p-4 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white">{profile.profile}</h4>
                  <p className="text-xs text-green-400">{profile.budget}</p>
                </div>
                <div className="flex gap-1 mr-2">
                  {profile.topDMCs.slice(0, 2).map(d => (
                    <span key={d} className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded hidden md:inline">{d}</span>
                  ))}
                </div>
                {isExpanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-800 pt-3 space-y-3">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Client Priorities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.priorities.map(p => (
                        <span key={p} className="text-[11px] px-2 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide">Recommended DMCs</p>
                    <div className="space-y-2">
                      {profile.topDMCs.map((dmcName, j) => (
                        <div key={dmcName} className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-600 w-4">{j + 1}.</span>
                          <CheckCircle2 size={12} style={{ color }} />
                          <span className="text-xs text-gray-200 font-medium">{dmcName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-gray-500 mb-1 tracking-wide">Why These DMCs</p>
                    <p className="text-xs text-gray-300">{profile.reasoning}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Action Items */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Agent Action Items — Building Your DMC Network</h3>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Establish 2-3 Primary DMC Relationships',
              detail: 'Contact Beauty of Japan, Boutique JTB, and one MICE operator (JTB GMT or Dispo) to cover your full client range. Request agent rate cards and FAM trip opportunities.',
            },
            {
              step: '2',
              title: 'Specialize with a Boutique Partner',
              detail: 'For ultra-luxury clients, build a deep relationship with Motenas Japan or Toki. These boutique DMCs offer the highest-margin, most exclusive experiences.',
            },
            {
              step: '3',
              title: 'Book Cherry Blossom 6+ Months Ahead',
              detail: 'Top ryokans and exclusive experiences during cherry blossom (late March–mid April) and autumn foliage (October–November) sell out 6-12 months in advance. DMC relationships are essential for securing allocations.',
            },
            {
              step: '4',
              title: 'Develop Regional Expertise',
              detail: 'Differentiate yourself by offering Setouchi, Tohoku, and Kanazawa itineraries. These emerging luxury destinations have less competition and higher margins.',
            },
            {
              step: '5',
              title: 'Leverage B2B-Only DMCs',
              detail: 'A Touch of Japan and Essential Japan Travel work exclusively through agents — they won\'t compete with you for clients. These are ideal long-term partners.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
