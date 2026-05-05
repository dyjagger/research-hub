import React, { useState } from 'react';
import { MapPin, Calendar, Users, Train, DollarSign } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { juneFestivals } from '../data/researchData';

const ACCENT = 'violet';

const densityLabel = {
  'very-low': { text: 'Almost No Tourists', color: 'emerald' },
  'low': { text: 'Few Tourists', color: 'yellow' },
  'medium': { text: 'Some Tourists', color: 'orange' },
};

export default function JuneFestivals() {
  const [cityFilter, setCityFilter] = useState('all');
  const filtered = cityFilter === 'all' ? juneFestivals : juneFestivals.filter(f => f.city === cityFilter);

  const tokyoFestivals = juneFestivals.filter(f => f.city === 'Tokyo');
  const kyotoFestivals = juneFestivals.filter(f => f.city === 'Kyoto');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">June Festivals & Seasonal Events</h1>
        <p className="text-gray-400 text-lg">Neighborhood matsuri, ancient rituals, and seasonal magic</p>
      </div>

      <InsightCallout color={ACCENT}>
        June festivals in Japan are <strong>community events</strong> — not staged for tourists. You'll see locals in happi coats carrying 
        mikoshi through their own streets, monks performing 1,000-year-old rituals, and families gathering for firefly viewing. 
        These are the moments where you stop being a spectator and become part of something real.
      </InsightCallout>

      {/* City Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">City:</span>
        {[
          { key: 'all', label: `All (${juneFestivals.length})` },
          { key: 'Tokyo', label: `Tokyo (${tokyoFestivals.length})` },
          { key: 'Kyoto', label: `Kyoto (${kyotoFestivals.length})` },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setCityFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              cityFilter === f.key
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        {filtered.sort((a, b) => {
          const dateA = a.dates.match(/\d+/) ? parseInt(a.dates.match(/June (\d+)/)?.[1] || '30') : 30;
          const dateB = b.dates.match(/\d+/) ? parseInt(b.dates.match(/June (\d+)/)?.[1] || '30') : 30;
          return dateA - dateB;
        }).map(festival => {
          const density = densityLabel[festival.touristDensity];
          return (
            <div key={festival.id} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      festival.city === 'Tokyo' ? 'bg-blue-500/20 text-blue-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {festival.city}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{festival.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-violet-400 font-medium">
                      <Calendar className="w-3 h-3" /> {festival.dates}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" /> {festival.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-md bg-${density.color}-500/20 text-${density.color}-400 text-xs font-medium`}>
                    {density.text}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-3">{festival.description}</p>

              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30 mb-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Why it's local</span>
                </div>
                <p className="text-xs text-gray-400">{festival.whyLocal}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Train className="w-3 h-3" /> {festival.access}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" /> {festival.cost}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Festival Etiquette */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-violet-300 mb-3">Festival Etiquette</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2"><span className="text-violet-400">•</span>Never touch or block the mikoshi procession — these are sacred objects carrying deities.</div>
          <div className="flex items-start gap-2"><span className="text-violet-400">•</span>At food stalls (yatai): pay in cash, eat standing or at designated areas, don't walk while eating.</div>
          <div className="flex items-start gap-2"><span className="text-violet-400">•</span>Photography is generally fine at festivals, but ask before photographing individuals close-up.</div>
          <div className="flex items-start gap-2"><span className="text-violet-400">•</span>For Nagoshi-no-Harae: walk through the Chinowa ring in a figure-8 pattern (instructions are usually posted).</div>
          <div className="flex items-start gap-2"><span className="text-violet-400">•</span>Wearing a yukata (summer kimono) to festivals is welcomed and appreciated by locals — rental shops are everywhere.</div>
        </div>
      </div>
    </div>
  );
}
