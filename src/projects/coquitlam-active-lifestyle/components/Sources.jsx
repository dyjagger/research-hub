import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { sources } from '../data/researchData';

const tierColors = {
  T1: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Gold' },
  T2: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Silver' },
  T3: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Bronze' },
  T4: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Estimate' },
};

export default function Sources() {
  const tierCounts = sources.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Sources & Methodology</h2>
        <p className="text-gray-400">All data sources used in this research dashboard</p>
      </div>

      {/* Methodology */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-400" /> Methodology
        </h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            This dashboard was compiled through systematic research of official city recreation websites, facility homepages, community forums, and review platforms. Pricing data was gathered directly from official sources where available and cross-referenced with community reports.
          </p>
          <p>
            <strong className="text-white">Location data:</strong> Addresses, hours, and pricing were sourced from official facility websites and city recreation portals as of March 2026. Hours and pricing may change seasonally — always verify with the facility before visiting.
          </p>
          <p>
            <strong className="text-white">Fun scores and barrier ratings:</strong> Subjective ratings based on community feedback, expert recommendations, and activity characteristics. Fun scores weigh engagement, variety, skill progression, and social interaction against monotony.
          </p>
          <p>
            <strong className="text-white">Health metrics:</strong> Calorie burn estimates are approximate averages for moderate-intensity recreational participation. Actual burn varies by body weight, intensity, and individual fitness level.
          </p>
          <p>
            <strong className="text-white">Injury risk and joint-friendliness:</strong> Based on sports medicine research and expert consensus for recreational (not competitive) adult participation.
          </p>
        </div>
      </div>

      {/* Data Quality Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(tierColors).map(([tier, style]) => (
          <div key={tier} className={`${style.bg} rounded-xl p-3 border border-gray-700/50`}>
            <div className={`text-lg font-bold ${style.text}`}>{tierCounts[tier] || 0}</div>
            <div className="text-xs text-gray-400">{tier} — {style.label}</div>
          </div>
        ))}
      </div>

      {/* Source List */}
      <div className="space-y-2">
        {sources.map(s => {
          const tier = tierColors[s.type] || tierColors.T3;
          return (
            <div key={s.id} className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-3 flex items-start gap-3">
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${tier.bg} ${tier.text}`}>
                {s.type}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{s.name}</span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 flex-shrink-0">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Limitations */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Limitations & Disclaimers</h3>
        <ul className="space-y-2 text-xs text-gray-400">
          <li>• <strong className="text-gray-300">Pricing may have changed</strong> since data collection (March 2026). Always confirm current rates directly with the facility.</li>
          <li>• <strong className="text-gray-300">Drop-in schedules change seasonally.</strong> Check the city recreation website or call before your first visit.</li>
          <li>• <strong className="text-gray-300">Martial arts and studio pricing</strong> varies by membership type, duration, and promotional offers. Contact facilities directly for current rates.</li>
          <li>• <strong className="text-gray-300">Calorie estimates</strong> are approximate averages for a ~170 lb adult at moderate recreational intensity.</li>
          <li>• <strong className="text-gray-300">Injury risk ratings</strong> assume proper coaching, warm-up, and recreational (not competitive) intensity.</li>
          <li>• <strong className="text-gray-300">This is not medical advice.</strong> Consult a healthcare provider before starting a new exercise program, especially if you have pre-existing conditions.</li>
        </ul>
      </div>
    </div>
  );
}
