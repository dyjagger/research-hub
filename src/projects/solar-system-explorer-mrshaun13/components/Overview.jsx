import React from 'react';
import { sunData, planets, plutoData } from '../data/solarSystemData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { overviewQuiz } from '../data/quizData';

function SunCard() {
  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl">{sunData.emoji}</span>
        <div>
          <h3 className="text-xl font-bold text-yellow-300">{sunData.name}</h3>
          <span className="text-xs text-yellow-500/70 font-medium">{sunData.type}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">How Wide</p>
          <p className="text-sm font-bold text-white">{sunData.diameter_km.toLocaleString()} km</p>
          <p className="text-[11px] text-yellow-400">109 Earths wide!</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Surface Temp</p>
          <p className="text-sm font-bold text-white">{sunData.surface_temp_c.toLocaleString()}°C</p>
          <p className="text-[11px] text-orange-400">Super duper hot!</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Age</p>
          <p className="text-sm font-bold text-white">{sunData.age_billion_years} billion years</p>
          <p className="text-[11px] text-yellow-400">Middle-aged star!</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Light to Earth</p>
          <p className="text-sm font-bold text-white">{sunData.light_travel_to_earth_min} minutes</p>
          <p className="text-[11px] text-yellow-400">Pretty fast!</p>
        </div>
      </div>
      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{sunData.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

function QuickStatCard({ emoji, label, value, sub }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-center">
      <span className="text-3xl block mb-1">{emoji}</span>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-indigo-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Overview() {
  const innerPlanets = planets.filter(p => p.group === 'Inner');
  const outerPlanets = planets.filter(p => p.group === 'Outer');
  const totalMoons = planets.reduce((sum, p) => sum + p.moons, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🚀 Mission Control
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Welcome, Space Explorer! Here is everything about our amazing solar system!
        </p>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Did you know?</p>
        <p>Our solar system is about 4.6 billion years old! That is way older than any dinosaur that ever lived!</p>
      </InsightCallout>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickStatCard emoji="🌟" label="Star" value="1" sub="The Sun!" />
        <QuickStatCard emoji="🪐" label="Planets" value="8" sub={`${innerPlanets.length} rocky + ${outerPlanets.length} giant`} />
        <QuickStatCard emoji="🌙" label="Known Moons" value={totalMoons} sub="And counting!" />
        <QuickStatCard emoji="💜" label="Dwarf Planets" value="5+" sub="Including Pluto!" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SunCard />

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            🪨 Inner Rocky Planets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {innerPlanets.map(p => (
              <div key={p.name} className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-3 flex items-center gap-2.5">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-gray-500">#{p.order} from Sun</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 pt-2">
            💨 Outer Giant Planets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {outerPlanets.map(p => (
              <div key={p.name} className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-3 flex items-center gap-2.5">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-gray-500">{p.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InsightCallout variant="info">
        <p className="font-bold">How to remember the planet order!</p>
        <p><strong>M</strong>y <strong>V</strong>ery <strong>E</strong>xcited <strong>M</strong>other <strong>J</strong>ust <strong>S</strong>erved <strong>U</strong>s <strong>N</strong>achos!</p>
        <p className="text-xs text-gray-500 mt-1">(Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)</p>
      </InsightCallout>

      <QuizSection questions={overviewQuiz} />
    </div>
  );
}
