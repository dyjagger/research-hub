import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { moonCountData, dayLengthData, yearLengthData, windSpeedData, atmosphereData, spaceRecords, spaceRecordQuiz, yearRatioExamples } from '../data/recordsData';
import { sizeComparison } from '../data/solarSystemData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';

const PC = {
  Mercury: '#6B7280', Venus: '#EC4899', Earth: '#10B981', Mars: '#F97316',
  Jupiter: '#EF4444', Saturn: '#F59E0B', Uranus: '#06B6D4', Neptune: '#3B82F6', Pluto: '#8B5CF6',
};

/* ─── 1. RECORD BOOK — always-visible visual cards ─── */
function RecordCards() {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const pages = Math.ceil(spaceRecords.length / perPage);
  const visible = spaceRecords.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🏆 Solar System Record Book</h3>
      <p className="text-sm text-gray-400">Browse the most extreme facts in our solar system!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((r, i) => (
          <div
            key={page * perPage + i}
            className="rounded-2xl border border-gray-800/40 bg-gradient-to-br from-gray-800/30 to-gray-900/50 p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ backgroundColor: `${r.color}15`, border: `1px solid ${r.color}30` }}
              >
                {r.emoji}
              </div>
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">{r.record}</p>
                <p className="text-sm font-black text-white leading-tight">{r.winner}</p>
                <p className="text-xs font-semibold" style={{ color: r.color }}>{r.value}</p>
              </div>
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed">{r.comparison}</p>

            <div className="bg-gray-900/50 rounded-lg p-2.5 border border-gray-800/20">
              <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mb-1">🧠 Why?</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">{r.whyItMatters}</p>
            </div>

            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-gray-600 font-bold">🥈</span>
              <span className="text-gray-500">{r.runnerUp}</span>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded px-2 py-1">
              <p className="text-[9px] text-indigo-400 font-mono">{r.funScale}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              page === i ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-500 hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 2. MOON COUNT — sqrt scale for better 1-28 visibility ─── */
function MoonVisualizer() {
  const sorted = [...moonCountData].sort((a, b) => b.moons - a.moons);
  const maxSqrt = Math.sqrt(sorted[0].moons);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🌙 Moon Count — Who Has the Most?</h3>
      <p className="text-sm text-gray-400">Circle size uses a square-root scale so you can see the difference between 1, 5, 16, and 28 moons clearly!</p>

      <div className="bg-gray-900/40 border border-gray-800/30 rounded-2xl p-5">
        <div className="flex flex-wrap items-end justify-center gap-4">
          {sorted.map(d => {
            const minSize = 22;
            const maxSize = 130;
            const sqrtVal = Math.sqrt(Math.max(d.moons, 0));
            const size = d.moons === 0 ? minSize : Math.max(minSize + 8, (sqrtVal / maxSqrt) * maxSize);
            return (
              <div key={d.name} className="flex flex-col items-center gap-2">
                <div
                  className="rounded-full flex items-center justify-center transition-all duration-500 relative"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `${d.color}20`,
                    border: `2px solid ${d.color}60`,
                    boxShadow: d.moons > 10 ? `0 0 ${Math.sqrt(d.moons) * 2}px ${d.color}30` : 'none',
                  }}
                >
                  <span className="font-black text-white" style={{ fontSize: Math.max(11, size / 4) }}>
                    {d.moons}
                  </span>
                  {d.moons > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center">
                      <span className="text-[8px]">🌙</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold" style={{ color: d.color }}>{d.name}</p>
                  <p className="text-[9px] text-gray-600">{d.moons === 0 ? 'No moons!' : d.moons === 1 ? '1 moon' : `${d.moons} moons`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-5 space-y-3">
        <h4 className="text-sm font-black text-white flex items-center gap-2">🤔 What If Earth Had 2 Moons?</h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          Imagine looking up and seeing TWO moons in the sky! Here is what would actually happen:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { emoji: '🌊', title: 'Crazy Tides', desc: 'Ocean tides would be much more extreme and unpredictable. Coastal cities would flood more often!' },
            { emoji: '🌙', title: 'Brighter Nights', desc: 'Nights would be much brighter — you might not need a flashlight to walk outside at night!' },
            { emoji: '🌍', title: 'Shorter Days', desc: 'Earth would spin faster, making our days shorter — maybe only 6-12 hours long!' },
            { emoji: '🦎', title: 'Different Life', desc: 'Animals that depend on moonlight (like sea turtles) would behave very differently. Evolution would have taken a different path!' },
            { emoji: '💥', title: 'Collision Risk', desc: 'The two moons could eventually collide or one could be flung out of orbit — creating a spectacular ring around Earth!' },
            { emoji: '🌅', title: 'Double Eclipses', desc: 'We could have two different types of solar eclipses, and sometimes both moons would be visible at once!' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900/40 rounded-xl p-3 border border-gray-800/20">
              <p className="text-xs font-bold text-white flex items-center gap-1.5"><span>{item.emoji}</span> {item.title}</p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Did You Know?</p>
        <p>Venus and Mercury have ZERO moons! Mars has 2 tiny moons (Phobos and Deimos), but they are so small they look like bright stars, not like our Moon!</p>
      </InsightCallout>
    </div>
  );
}

/* ─── 3. DAY LENGTH — spinning planet visual ─── */
function DayLengthViz() {
  const allPlanets = [...dayLengthData].sort((a, b) => a.hours - b.hours);
  const [selected, setSelected] = useState(null);
  const earthHours = 24;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">⏰ How Fast Does Each Planet Spin?</h3>
      <p className="text-sm text-gray-400">A "day" is one full spin. Tap a planet to see how its spin compares to Earth's 24-hour day!</p>

      <div className="bg-gray-900/40 border border-gray-800/30 rounded-2xl p-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {allPlanets.map(d => {
            const isActive = selected === d.name;
            const spinSpeed = earthHours / d.hours;
            const animDuration = Math.max(0.5, 4 / spinSpeed);
            return (
              <button
                key={d.name}
                onClick={() => setSelected(isActive ? null : d.name)}
                className={`rounded-xl p-3 text-center transition-all border ${
                  isActive ? 'border-indigo-500/40 bg-indigo-500/10 scale-105' : 'border-gray-800/30 bg-gray-800/20 hover:bg-gray-800/40'
                }`}
              >
                <div
                  className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg mb-1.5"
                  style={{
                    backgroundColor: `${d.color}20`,
                    border: `2px solid ${d.color}50`,
                    animation: isActive ? `spin ${animDuration}s linear infinite` : 'none',
                  }}
                >
                  {d.name === 'Earth' ? '🌍' : d.name === 'Venus' ? '🌋' : d.name === 'Mars' ? '🔴' : d.name === 'Jupiter' ? '🟤' : d.name === 'Saturn' ? '🪐' : d.name === 'Mercury' ? '🪨' : d.name === 'Neptune' ? '🔵' : d.name === 'Uranus' ? '🧊' : '💜'}
                </div>
                <p className="text-[10px] font-bold" style={{ color: d.color }}>{d.name}</p>
                <p className="text-[9px] text-gray-500 font-medium">{d.label}</p>
              </button>
            );
          })}
        </div>

        {selected && (() => {
          const d = allPlanets.find(p => p.name === selected);
          if (!d) return null;
          const ratio = d.hours / earthHours;
          const earthsInDay = Math.round(d.hours / earthHours * 10) / 10;
          return (
            <div className="mt-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 space-y-2 animate-in fade-in duration-200">
              <p className="text-sm font-bold text-white">🌍 Earth vs {d.name}</p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-gray-900/40 rounded-lg p-2">
                  <p className="text-lg font-black text-emerald-400">24 hrs</p>
                  <p className="text-[10px] text-gray-500">Earth Day</p>
                </div>
                <div className="bg-gray-900/40 rounded-lg p-2">
                  <p className="text-lg font-black" style={{ color: d.color }}>{d.label}</p>
                  <p className="text-[10px] text-gray-500">{d.name} Day</p>
                </div>
              </div>
              {ratio > 1 ? (
                <p className="text-xs text-gray-400">One {d.name} day = <strong className="text-white">{earthsInDay} Earth days</strong>. While {d.name} spins once, Earth spins {earthsInDay} times!</p>
              ) : (
                <p className="text-xs text-gray-400">{d.name} spins <strong className="text-white">{(1/ratio).toFixed(1)}x faster</strong> than Earth! In one Earth day, {d.name} would complete {(1/ratio).toFixed(1)} full spins.</p>
              )}
              {d.name === 'Venus' && <p className="text-[10px] text-pink-400">🤯 Venus also spins BACKWARDS — the Sun rises in the west!</p>}
              {d.name === 'Jupiter' && <p className="text-[10px] text-red-400">⚡ Jupiter spins so fast it bulges 7% wider at the equator!</p>}
            </div>
          );
        })()}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <InsightCallout variant="wow">
        <p className="font-bold">Day vs Year — What's the Difference?</p>
        <p>A <strong>day</strong> = one full spin of the planet on its axis. A <strong>year</strong> = one full trip around the Sun. They are totally different! Venus's day (243 Earth days) is actually longer than its year (225 Earth days)!</p>
      </InsightCallout>
    </div>
  );
}

/* ─── 4. YEAR LENGTH — ratio table + interactive converter ─── */
function YearLengthViz() {
  const [earthMinutes, setEarthMinutes] = useState(20);
  const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  const convertTime = useCallback((mins, planetYearDays) => {
    const earthYearDays = 365;
    const ratio = planetYearDays / earthYearDays;
    const planetMins = mins * ratio;
    if (planetMins < 60) return `${Math.round(planetMins)} min`;
    if (planetMins < 1440) return `${(planetMins / 60).toFixed(1)} hours`;
    if (planetMins < 43200) return `${(planetMins / 1440).toFixed(1)} days`;
    if (planetMins < 525600) return `${(planetMins / 43200).toFixed(1)} months`;
    return `${(planetMins / 525600).toFixed(1)} years`;
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🗓️ How Long Is a Year?</h3>
      <p className="text-sm text-gray-400">A year = one trip around the Sun. Set Earth time below and see how long it feels on other planets!</p>

      <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-5 space-y-4">
        <h4 className="text-sm font-black text-white">⏱️ Time Converter — Set Earth Time!</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="range"
              min={1}
              max={600}
              value={earthMinutes}
              onChange={e => setEarthMinutes(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-[9px] text-gray-600 mt-1">
              <span>1 min</span>
              <span>10 hrs</span>
            </div>
          </div>
          <div className="bg-gray-900 border border-indigo-500/30 rounded-xl px-4 py-2 text-center min-w-[80px]">
            <p className="text-lg font-black text-indigo-400">{earthMinutes < 60 ? `${earthMinutes}` : `${(earthMinutes/60).toFixed(1)}`}</p>
            <p className="text-[9px] text-gray-500">{earthMinutes < 60 ? 'minutes' : 'hours'} on Earth</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {yearLengthData.map(d => {
            const converted = convertTime(earthMinutes, d.days);
            const isEarth = d.name === 'Earth';
            return (
              <div
                key={d.name}
                className={`rounded-xl p-2.5 text-center border transition-all ${
                  isEarth ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-gray-800/30 bg-gray-800/20'
                }`}
              >
                <p className="text-[10px] font-bold" style={{ color: PC[d.name] || '#9ca3af' }}>{d.name}</p>
                <p className="text-sm font-black text-white mt-0.5">{isEarth ? (earthMinutes < 60 ? `${earthMinutes} min` : `${(earthMinutes/60).toFixed(1)} hrs`) : converted}</p>
                <p className="text-[8px] text-gray-600">{d.days} day orbit</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900/40 border border-gray-800/30 rounded-2xl p-4 space-y-3">
        <h4 className="text-sm font-bold text-white">🎮 Fun Comparisons — Time on Earth vs Other Planets</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-1 text-gray-500 font-bold">On Earth...</th>
                <th className="py-2 px-1 text-gray-500">Jupiter</th>
                <th className="py-2 px-1 text-gray-500">Saturn</th>
                <th className="py-2 px-1 text-gray-500">Neptune</th>
                <th className="py-2 px-1 text-gray-500">Pluto</th>
              </tr>
            </thead>
            <tbody>
              {yearRatioExamples.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/30">
                  <td className="py-2 px-1 text-gray-300 font-medium">{row.earthTime}</td>
                  <td className="py-2 px-1 text-center text-red-400 font-bold">{row.jupiter}</td>
                  <td className="py-2 px-1 text-center text-amber-400 font-bold">{row.saturn}</td>
                  <td className="py-2 px-1 text-center text-blue-400 font-bold">{row.neptune}</td>
                  <td className="py-2 px-1 text-center text-purple-400 font-bold">{row.pluto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Time Warp!</p>
        <p>20 minutes of video game time on Earth would feel like <strong>3.4 days on Pluto</strong>! If you were born on Neptune, you would not celebrate your 1st birthday until you were <strong>165 Earth years old</strong>!</p>
      </InsightCallout>
    </div>
  );
}

/* ─── 5. PLANET SIZE BUBBLES ─── */
function PlanetSizeBubbles() {
  const bubbleData = sizeComparison.map(p => ({
    ...p,
    diameter_earths: p.diameter_km / 12742,
  }));
  const maxDiameter = Math.max(...bubbleData.map(d => d.diameter_km));
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🔵 Planet Size — Intensity Bubbles</h3>
      <p className="text-sm text-gray-400">Each planet shown at proportional scale. Feel the difference — Jupiter is MASSIVE!</p>

      <div className="bg-gray-900/40 border border-gray-800/30 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {bubbleData.map(d => {
            const minPx = 16;
            const maxPx = 160;
            const size = Math.max(minPx, (d.diameter_km / maxDiameter) * maxPx);
            const glowSize = Math.max(0, size / 6);
            return (
              <div key={d.name} className="flex flex-col items-center gap-1.5">
                <div
                  className="rounded-full transition-all duration-500 flex items-center justify-center"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `radial-gradient(circle at 35% 35%, ${d.color}88, ${d.color}33, ${d.color}11)`,
                    border: `2px solid ${d.color}55`,
                    boxShadow: `0 0 ${glowSize}px ${d.color}40, inset 0 0 ${glowSize}px ${d.color}20`,
                  }}
                >
                  {size > 40 && (
                    <span className="text-white font-black drop-shadow-lg" style={{ fontSize: Math.max(9, size / 8) }}>
                      {d.name === 'Earth' ? '🌍' : (d.diameter_km / 1000).toFixed(0) + 'k'}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold" style={{ color: d.color }}>{d.name}</p>
                  <p className="text-[8px] text-gray-600">{d.diameter_km.toLocaleString()} km</p>
                  {d.name !== 'Earth' && (
                    <p className="text-[8px] text-gray-700">
                      {d.diameter_earths < 1
                        ? `${(d.diameter_earths * 100).toFixed(0)}% of Earth`
                        : `${d.diameter_earths.toFixed(1)}x Earth`}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="cool">
        <p className="font-bold">See the Difference?</p>
        <p>Mercury is barely a dot compared to Jupiter! If Earth were the size of a nickel, Jupiter would be the size of a basketball.</p>
      </InsightCallout>
    </div>
  );
}

/* ─── 6. WIND SPEED RACE GAME ─── */
function WindRaceGame() {
  const [racer1, setRacer1] = useState(0);
  const [racer2, setRacer2] = useState(6);
  const [racing, setRacing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const animRef = useRef(null);
  const startRef = useRef(null);

  const sorted = [...windSpeedData].sort((a, b) => b.speed - a.speed);
  const r1 = sorted[racer1];
  const r2 = sorted[racer2];

  const startRace = useCallback(() => {
    setRacing(true);
    setFinished(false);
    setProgress1(0);
    setProgress2(0);
    startRef.current = performance.now();

    const maxTime = Math.max(r1.quarterMile, r2.quarterMile);
    const duration = Math.min(maxTime * 40, 6000);

    const animate = (now) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);

      const p1Target = Math.min(100, (elapsed / (r1.quarterMile * 40)) * 100);
      const p2Target = Math.min(100, (elapsed / (r2.quarterMile * 40)) * 100);

      setProgress1(Math.min(100, p1Target));
      setProgress2(Math.min(100, p2Target));

      if (p1Target < 100 || p2Target < 100) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRacing(false);
        setFinished(true);
      }
    };
    animRef.current = requestAnimationFrame(animate);
  }, [r1, r2]);

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const reset = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setRacing(false);
    setFinished(false);
    setProgress1(0);
    setProgress2(0);
  };

  const winner = r1.quarterMile < r2.quarterMile ? r1 : r2;
  const loser = r1.quarterMile < r2.quarterMile ? r2 : r1;
  const headStart = ((loser.quarterMile - winner.quarterMile) / loser.quarterMile * 1320).toFixed(0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🏁 Wind Speed Race!</h3>
      <p className="text-sm text-gray-400">Pick two planets and race their wind speeds down a quarter-mile track! Each planet's wind is matched to a real-world vehicle.</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">🏎️ Racer 1</p>
          <div className="space-y-1">
            {sorted.map((d, i) => (
              <button
                key={d.name}
                onClick={() => { if (!racing) { setRacer1(i); reset(); } }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-2 ${
                  racer1 === i ? 'bg-indigo-500/20 border border-indigo-500/40 text-white font-bold' : 'bg-gray-800/20 border border-transparent text-gray-400 hover:bg-gray-800/40'
                }`}
              >
                <span>{d.vehicleShort}</span>
                <span style={{ color: PC[d.name] }}>{d.name}</span>
                <span className="text-gray-600 ml-auto">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">🏎️ Racer 2</p>
          <div className="space-y-1">
            {sorted.map((d, i) => (
              <button
                key={d.name}
                onClick={() => { if (!racing) { setRacer2(i); reset(); } }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-2 ${
                  racer2 === i ? 'bg-purple-500/20 border border-purple-500/40 text-white font-bold' : 'bg-gray-800/20 border border-transparent text-gray-400 hover:bg-gray-800/40'
                }`}
              >
                <span>{d.vehicleShort}</span>
                <span style={{ color: PC[d.name] }}>{d.name}</span>
                <span className="text-gray-600 ml-auto">{d.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800/40 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 font-bold">QUARTER-MILE TRACK (1,320 feet)</p>
          <button
            onClick={racing ? reset : startRace}
            disabled={racer1 === racer2}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
              racer1 === racer2
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : racing
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600 animate-pulse'
            }`}
          >
            {racing ? '⏹ STOP' : racer1 === racer2 ? 'Pick 2 different planets' : '🏁 GO!'}
          </button>
        </div>

        {/* Track lane 1 */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="font-bold" style={{ color: PC[r1.name] }}>{r1.vehicleShort} {r1.name}</span>
            <span className="text-gray-600">{r1.vehicle}</span>
          </div>
          <div className="h-10 bg-gray-800/50 rounded-lg overflow-hidden relative border border-gray-700/30">
            <div className="absolute inset-0 flex items-center">
              {[20, 40, 60, 80].map(p => (
                <div key={p} className="absolute h-full border-l border-dashed border-gray-700/30" style={{ left: `${p}%` }} />
              ))}
            </div>
            <div
              className="h-full rounded-lg flex items-center justify-end pr-1 transition-all"
              style={{
                width: `${Math.max(3, progress1)}%`,
                background: `linear-gradient(90deg, ${PC[r1.name]}cc, ${PC[r1.name]}88)`,
                transition: racing ? 'none' : 'width 0.3s',
              }}
            >
              <span className="text-lg">{r1.vehicleShort}</span>
            </div>
            <div className="absolute right-1 top-0 h-full flex items-center">
              <div className="w-0.5 h-6 bg-white/30" />
            </div>
          </div>
        </div>

        {/* Track lane 2 */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="font-bold" style={{ color: PC[r2.name] }}>{r2.vehicleShort} {r2.name}</span>
            <span className="text-gray-600">{r2.vehicle}</span>
          </div>
          <div className="h-10 bg-gray-800/50 rounded-lg overflow-hidden relative border border-gray-700/30">
            <div className="absolute inset-0 flex items-center">
              {[20, 40, 60, 80].map(p => (
                <div key={p} className="absolute h-full border-l border-dashed border-gray-700/30" style={{ left: `${p}%` }} />
              ))}
            </div>
            <div
              className="h-full rounded-lg flex items-center justify-end pr-1 transition-all"
              style={{
                width: `${Math.max(3, progress2)}%`,
                background: `linear-gradient(90deg, ${PC[r2.name]}cc, ${PC[r2.name]}88)`,
                transition: racing ? 'none' : 'width 0.3s',
              }}
            >
              <span className="text-lg">{r2.vehicleShort}</span>
            </div>
            <div className="absolute right-1 top-0 h-full flex items-center">
              <div className="w-0.5 h-6 bg-white/30" />
            </div>
          </div>
        </div>

        {finished && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 animate-in fade-in duration-300 space-y-1">
            <p className="text-sm font-black text-white">🏆 {winner.name} wins!</p>
            <p className="text-xs text-gray-400">
              <strong style={{ color: PC[winner.name] }}>{winner.name}</strong> ({winner.label}) finishes in <strong>{winner.quarterMile}s</strong> vs{' '}
              <strong style={{ color: PC[loser.name] }}>{loser.name}</strong> ({loser.label}) at <strong>{loser.quarterMile}s</strong>.
            </p>
            <p className="text-xs text-gray-400">
              By the time {loser.name} crosses the finish line, {winner.name}'s wind would be <strong className="text-white">{headStart} feet ahead</strong> — that is {Math.round(headStart / 3)} car lengths!
            </p>
            <p className="text-[10px] text-gray-600 mt-1">
              {winner.name}'s wind is like a {winner.vehicle.replace(/^[^\s]+\s/, '')} — {loser.name}'s is like a {loser.vehicle.replace(/^[^\s]+\s/, '')}!
            </p>
          </div>
        )}
      </div>

      <InsightCallout variant="cool">
        <p className="font-bold">Speed Check!</p>
        <p>Neptune's 1,200 mph winds are like a <strong>Porsche 911 Turbo S</strong> doing a quarter mile in 10 seconds. Mars's 60 mph winds? That is a <strong>person jogging slowly</strong> — it would take over 3 minutes!</p>
      </InsightCallout>
    </div>
  );
}

/* ─── 7. ATMOSPHERE ─── */
function AtmosphereComparison() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🌫️ Atmosphere Thickness</h3>
      <p className="text-sm text-gray-400">Venus has the thickest atmosphere — it would crush you! Mercury has almost none.</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={atmosphereData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 100]} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} width={55} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs">
                    <p className="font-bold text-white">{d.name} — {d.type}</p>
                    <p className="text-gray-400">{d.description}</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="thickness" radius={[0, 6, 6, 0]}>
              {atmosphereData.map((d, i) => <Cell key={i} fill={d.color} fillOpacity={0.7} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function SpaceRecords() {
  const [tab, setTab] = useState('records');

  const tabs = [
    { id: 'records', label: 'Record Book', emoji: '🏆' },
    { id: 'moons', label: 'Moon Count', emoji: '🌙' },
    { id: 'days', label: 'Spin Speed', emoji: '⏰' },
    { id: 'years', label: 'Orbit Time', emoji: '🗓️' },
    { id: 'sizes', label: 'Planet Sizes', emoji: '🔵' },
    { id: 'wind', label: 'Wind Race', emoji: '🏁' },
    { id: 'atmosphere', label: 'Atmosphere', emoji: '🌫️' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🏅 Space Records & Extremes
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Which planet is the biggest? The fastest? The windiest? Explore the record-breaking extremes of our solar system!
        </p>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              tab === t.id ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      {tab === 'records' && <RecordCards />}
      {tab === 'moons' && <MoonVisualizer />}
      {tab === 'days' && <DayLengthViz />}
      {tab === 'years' && <YearLengthViz />}
      {tab === 'sizes' && <PlanetSizeBubbles />}
      {tab === 'wind' && <WindRaceGame />}
      {tab === 'atmosphere' && <AtmosphereComparison />}

      <QuizSection questions={spaceRecordQuiz} />
    </div>
  );
}
