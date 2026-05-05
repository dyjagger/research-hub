import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Ban } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { tokyoRamen } from '../data/researchData';

const ACCENT = 'amber';

const densityLabel = {
  'very-low': { text: 'Almost No Tourists', color: 'emerald' },
  'low': { text: 'Few Tourists', color: 'yellow' },
  'medium': { text: 'Some Tourists', color: 'orange' },
};

export default function TokyoRamen() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? tokyoRamen : tokyoRamen.filter(r => r.touristDensity === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tokyo Ramen — Local Favorites</h1>
        <p className="text-gray-400 text-lg">Handpicked shops in neighborhoods tourists don't reach</p>
      </div>

      <InsightCallout color={ACCENT}>
        These are NOT the Ichiran/Ippudo tourist chains. Every shop here is in a <strong>residential or commuter neighborhood</strong> where 
        the queue is salary-men and students, not tour groups. Most have no English menu — use Google Translate's camera or just point at the 
        ticket machine. That's part of the experience.
      </InsightCallout>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400">Filter:</span>
        {[
          { key: 'all', label: 'All Shops' },
          { key: 'very-low', label: 'Almost No Tourists' },
          { key: 'low', label: 'Few Tourists' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === f.key
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Ramen Cards */}
      <div className="space-y-4">
        {filtered.map(shop => {
          const density = densityLabel[shop.touristDensity];
          return (
            <div key={shop.id} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{shop.name}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" /> {shop.neighborhood}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {shop.hours}
                    </span>
                    {shop.closed !== 'None' && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Ban className="w-3 h-3" /> Closed: {shop.closed}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-md bg-${density.color}-500/20 text-${density.color}-400 text-xs font-medium`}>
                    {density.text}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold">
                    {shop.price}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-2 py-0.5 rounded bg-gray-700/50 text-xs text-gray-300 font-medium mb-2">
                  {shop.style}
                </span>
                <p className="text-sm text-gray-300">{shop.description}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Why it's local</span>
                </div>
                <p className="text-xs text-gray-400">{shop.whyLocal}</p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Access:</span>
                <span className="text-xs text-gray-400">{shop.station}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tips */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-amber-300 mb-3">Tokyo Ramen Tips</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Most shops use ticket machines (食券機). Buy your ticket at the machine before sitting down.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Peak lunch is 11:30–13:00. Go at 11:00 opening or after 14:00 to avoid waits.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>"Kaedama" (替え玉) = extra noodles for ~¥150. Ask when you're almost done with noodles but have soup left.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Slurping is expected and polite — it aerates the noodles and shows appreciation.</div>
          <div className="flex items-start gap-2"><span className="text-amber-400">•</span>Water/tea is always free and self-serve. Look for the pitcher or dispenser.</div>
        </div>
      </div>
    </div>
  );
}
