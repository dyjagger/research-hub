import React, { useState } from 'react';
import { MapPin, Clock, Users, Sparkles, DollarSign } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { tokyoCulture } from '../data/researchData';

const ACCENT = 'rose';

const densityLabel = {
  'very-low': { text: 'Almost No Tourists', color: 'emerald' },
  'low': { text: 'Few Tourists', color: 'yellow' },
  'medium': { text: 'Some Tourists', color: 'orange' },
};

export default function TokyoCulture() {
  const [filter, setFilter] = useState('all');
  const types = [...new Set(tokyoCulture.map(c => c.type))];
  const filtered = filter === 'all' ? tokyoCulture : tokyoCulture.filter(c => c.type === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tokyo Culture & Neighborhoods</h1>
        <p className="text-gray-400 text-lg">Authentic experiences in neighborhoods most visitors never discover</p>
      </div>

      <InsightCallout color={ACCENT}>
        The best cultural experiences in Tokyo aren't at famous landmarks — they're in <strong>everyday neighborhood life</strong>. 
        Walking through a shitamachi shotengai, soaking in a local sento, or making pottery in a backstreet studio gives you the Tokyo 
        that residents actually live in. These spots have <strong>zero tourist infrastructure</strong> by design.
      </InsightCallout>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-gray-400">Type:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
          }`}
        >
          All
        </button>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === t
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {filtered.map(exp => {
          const density = densityLabel[exp.touristDensity];
          return (
            <div key={exp.id} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.name}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" /> {exp.neighborhood}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <DollarSign className="w-3 h-3" /> {exp.cost}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md bg-${density.color}-500/20 text-${density.color}-400 text-xs font-medium flex-shrink-0`}>
                  {density.text}
                </span>
              </div>

              <div className="mb-3">
                <span className="inline-block px-2 py-0.5 rounded bg-gray-700/50 text-xs text-gray-300 font-medium mb-2">
                  {exp.type}
                </span>
                <p className="text-sm text-gray-300">{exp.description}</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30 mb-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-400">Why it's local</span>
                </div>
                <p className="text-xs text-gray-400">{exp.whyLocal}</p>
              </div>

              {exp.juneBonus && (
                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-semibold text-blue-400">June Bonus</span>
                  </div>
                  <p className="text-xs text-gray-400">{exp.juneBonus}</p>
                </div>
              )}

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Best time:</span>
                <span className="text-xs text-gray-400">{exp.bestTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
