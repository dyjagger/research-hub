import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { flavorRadarData, speciesData } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const SPECIES_COLORS = { Arabica: '#f59e0b', Robusta: '#ef4444', Liberica: '#8b5cf6', Excelsa: '#06b6d4' };

export default function FlavorProfiles() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Flavor Profiles</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          How do the four main coffee species compare in sweetness, acidity, bitterness, body, aroma, and complexity?
          Each species has a distinct sensory fingerprint shaped by genetics, altitude, and terroir.
        </p>
      </div>

      <InsightCallout color="rose">
        Arabica dominates in sweetness, acidity, aroma, and complexity — the attributes prized by specialty coffee judges.
        Robusta leads in body and bitterness, making it ideal for espresso blends. Excelsa is the "mystery bean" — it
        somehow combines light-roast fruitiness with dark-roast depth in the same cup.
      </InsightCallout>

      {/* Radar Chart */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">Species Flavor Radar</h3>
        <p className="text-[10px] text-gray-500 mb-4">Sensory attributes rated 1–10 across all four commercial species</p>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={flavorRadarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="attribute" tick={{ fill: '#d1d5db', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {Object.entries(SPECIES_COLORS).map(([species, color]) => (
              <Radar key={species} name={species} dataKey={species} stroke={color} fill={color} fillOpacity={0.15} strokeWidth={2} />
            ))}
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Flavor notes detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {speciesData.map((s, i) => {
          const color = Object.values(SPECIES_COLORS)[i];
          return (
            <div key={s.species} className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <h3 className="text-sm font-semibold text-white">{s.species}</h3>
                <span className="ml-auto text-xs font-semibold" style={{ color }}>{s.flavorRating}/10</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{s.flavorNotes}</p>
              <div className="space-y-2">
                {[
                  { label: 'Sweetness', value: s.sweetnessRating },
                  { label: 'Acidity', value: s.acidityRating },
                  { label: 'Bitterness', value: s.bitternessRating },
                  { label: 'Body', value: s.bodyRating },
                  { label: 'Aroma', value: s.aromaRating },
                ].map((attr) => (
                  <div key={attr.label} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-16">{attr.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${attr.value * 10}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-[10px] text-gray-400 w-6 text-right">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <InsightCallout color="violet">
        The "best" flavor is subjective. Specialty coffee culture prizes Arabica's complexity and acidity, but in many
        cultures (Vietnam, Italy, India), Robusta's bold bitterness and heavy body are preferred — especially in espresso
        and traditional preparations like Vietnamese cà phê sữa đá.
      </InsightCallout>
    </div>
  );
}
