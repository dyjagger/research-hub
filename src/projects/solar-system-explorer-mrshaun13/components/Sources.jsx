import React from 'react';
import { sources } from '../data/solarSystemData';
import { skySources } from '../data/skyData';
import InsightCallout from './InsightCallout';

const allSources = [...sources, ...skySources];

const TIER_COLORS = {
  'T1 Gold': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  'T2 Silver': { bg: 'bg-gray-400/10', text: 'text-gray-300', border: 'border-gray-500/20' },
};

export default function Sources() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          📚 Space Library
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Where did all this cool space info come from? Real scientists and space agencies!
        </p>
      </div>

      <InsightCallout variant="info">
        <p className="font-bold">How We Know This Stuff!</p>
        <p>Scientists at NASA and other space agencies use telescopes, spacecraft, and robots to study the planets. Everything in this dashboard comes from real scientific data!</p>
      </InsightCallout>

      <div className="space-y-2">
        {allSources.map((s, i) => {
          const tier = TIER_COLORS[s.type] || TIER_COLORS['T2 Silver'];
          return (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:border-gray-700 transition-all group"
            >
              <span className="text-lg">🔗</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">{s.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{s.url}</p>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${tier.bg} ${tier.text} ${tier.border} flex-shrink-0`}>
                {s.type}
              </span>
            </a>
          );
        })}
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-2">Data Quality</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-yellow-500/10 text-yellow-400 border-yellow-500/20">T1 Gold</span>
            <span>Official space agency data (NASA, ESA, JPL)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-gray-400/10 text-gray-300 border-gray-500/20">T2 Silver</span>
            <span>Educational sites that use official data</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-2">A Note for Grown-Ups</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          All planetary statistics in this dashboard are sourced from NASA's NSSDC Planetary Fact Sheet and cross-referenced with NASA Solar System Exploration data. Moon counts reflect the latest confirmed discoveries as of early 2026. Temperature values for gas/ice giants represent cloud-top temperatures. Earth rotation, seasons, moon phases, and constellation data are sourced from NASA Space Place, ESA Kids, and the American Museum of Natural History. Meteor shower dates and rates are from NASA's meteor watch program. Fun facts and descriptions are simplified for a young audience while maintaining scientific accuracy. Dad jokes are... well, they're dad jokes.
        </p>
      </div>
    </div>
  );
}
