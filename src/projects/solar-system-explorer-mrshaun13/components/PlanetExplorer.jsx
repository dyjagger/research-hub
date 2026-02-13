import React, { useState } from 'react';
import { planets, plutoData } from '../data/solarSystemData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { planetExplorerQuiz } from '../data/quizData';

const allBodies = [...planets, { ...plutoData, order: 9 }];

function StatRow({ label, value, sub }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      <div className="text-right">
        <span className="text-sm font-bold text-white">{value}</span>
        {sub && <p className="text-[10px] text-gray-500">{sub}</p>}
      </div>
    </div>
  );
}

function PlanetDetail({ planet }) {
  const p = planet;
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-black/30"
          style={{ background: `radial-gradient(circle at 35% 35%, ${p.accentColor || p.color}44, ${p.color}22)`, border: `2px solid ${p.color}66` }}
        >
          {p.emoji}
        </div>
        <div>
          <h3 className="text-2xl font-black text-white">{p.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${p.color}22`, color: p.accentColor || p.color, border: `1px solid ${p.color}33` }}>
              {p.type}
            </span>
            <span className="text-xs text-gray-500">#{p.order} from the Sun</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">📏 Size & Distance</h4>
          <StatRow label="Diameter" value={`${p.diameter_km.toLocaleString()} km`} sub={`${p.diameter_mi.toLocaleString()} miles`} />
          <StatRow label="Compared to Earth" value={p.diameter_earths < 1 ? `${(p.diameter_earths * 100).toFixed(0)}% of Earth` : `${p.diameter_earths.toFixed(1)}x Earth`} />
          <StatRow label="Distance from Sun" value={`${(p.distance_from_sun_km / 1000000).toFixed(0)}M km`} sub={`${p.distance_from_sun_au} AU`} />
          {p.mass_earths && <StatRow label="Mass" value={p.mass_earths < 1 ? `${(p.mass_earths * 100).toFixed(1)}% of Earth` : `${p.mass_earths}x Earth`} />}
          {p.density_g_cm3 && <StatRow label="Density" value={`${p.density_g_cm3} g/cm³`} sub={p.density_g_cm3 < 1 ? 'Would float in water!' : undefined} />}
        </div>

        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">⏰ Time & Motion</h4>
          <StatRow label="One Day" value={p.rotation_period_label} />
          <StatRow label="One Year" value={p.orbital_period_label} />
          {p.orbital_period_days && <StatRow label="Year in Earth Days" value={p.orbital_period_days.toLocaleString()} />}
        </div>

        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">🌡️ Environment</h4>
          <StatRow label="Temperature" value={p.temp_label} />
          <StatRow label="Atmosphere" value="" sub={p.atmosphere} />
          <StatRow label="Gravity" value={p.gravity_vs_earth ? `${p.gravity_vs_earth}x Earth` : '—'} />
          {p.escape_velocity_km_s && <StatRow label="Escape Velocity" value={`${p.escape_velocity_km_s} km/s`} />}
        </div>

        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">🌙 Moons & Rings</h4>
          <StatRow label="Known Moons" value={p.moons} sub={p.moons === 0 ? 'No moons at all!' : p.moons === 1 ? 'Just one!' : `${p.moons} moons!`} />
          <StatRow label="Rings" value={p.rings ? 'Yes! 💍' : 'Nope'} />
        </div>
      </div>

      {p.kidWeight && (
        <InsightCallout variant="fun">
          <p className="font-bold">⚖️ Your Weight on {p.name}!</p>
          <p>{p.kidWeight}</p>
        </InsightCallout>
      )}

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">⭐ Fun Facts About {p.name}</h4>
        <div className="space-y-2">
          {p.funFacts.map((fact, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
              <span className="text-base flex-shrink-0">🚀</span>
              <p>{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {p.exploration && p.exploration.length > 0 && (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">🛸 Space Missions to {p.name}</h4>
          <div className="space-y-2">
            {p.exploration.map((e, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-xs font-black text-indigo-400 tabular-nums w-10 flex-shrink-0 pt-0.5">{e.year}</span>
                <div>
                  <span className="font-bold text-white">{e.mission}</span>
                  <span className="text-gray-400"> — {e.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <InsightCallout variant="joke">
        <p className="font-bold">😂 Dad Joke!</p>
        <p>{p.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

export default function PlanetExplorer() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🪐 Planet Explorer
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Click on any planet to zoom in and see all its amazing stats and fun facts!
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {allBodies.map(p => {
          const isSelected = selected === p.name;
          return (
            <button
              key={p.name}
              onClick={() => setSelected(isSelected ? null : p.name)}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-white/30 bg-white/5 scale-105 shadow-lg'
                  : 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:border-gray-700/50 hover:scale-105'
              }`}
            >
              <span className="text-3xl">{p.emoji}</span>
              <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>{p.name}</span>
              <span className="text-[9px] text-gray-600">#{p.order}</span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {selected ? (
        <PlanetDetail planet={allBodies.find(p => p.name === selected)} />
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
          <span className="text-5xl block mb-3">👆</span>
          <p className="text-gray-400 text-sm font-medium">Pick a planet above to explore!</p>
          <p className="text-gray-600 text-xs mt-1">Each planet has tons of cool stats, fun facts, and a dad joke!</p>
        </div>
      )}

      <QuizSection questions={planetExplorerQuiz} />
    </div>
  );
}
