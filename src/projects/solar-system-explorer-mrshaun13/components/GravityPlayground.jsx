import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { gravityData, planets, plutoData } from '../data/solarSystemData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { gravityQuiz } from '../data/quizData';

const allForWeight = [
  ...planets.map(p => ({ name: p.name, emoji: p.emoji, gravity: p.gravity_vs_earth, color: p.color })),
  { name: 'Pluto', emoji: plutoData.emoji, gravity: plutoData.gravity_vs_earth, color: plutoData.color },
];

export default function GravityPlayground() {
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState('lbs');

  const weightResults = allForWeight.map(p => ({
    ...p,
    yourWeight: Math.round(weight * p.gravity * 10) / 10,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          ⚖️ Gravity Playground
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Gravity is what keeps you on the ground! Every planet has different gravity. See how much YOU would weigh on each planet!
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">🎮 Weight Calculator — Try It!</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">Your weight:</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(Math.max(1, Math.min(999, Number(e.target.value) || 0)))}
              className="w-20 bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white font-bold text-center focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setUnit('lbs')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                unit === 'lbs' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Pounds
            </button>
            <button
              onClick={() => setUnit('kg')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                unit === 'kg' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Kilograms
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mt-4">
          {weightResults.map(p => (
            <div key={p.name} className="bg-gray-900/60 rounded-xl p-2.5 text-center border border-gray-800/50">
              <span className="text-2xl block">{p.emoji}</span>
              <p className="text-[10px] text-gray-500 mt-1">{p.name}</p>
              <p className="text-sm font-black text-white mt-0.5">
                {p.yourWeight} <span className="text-[9px] text-gray-500 font-normal">{unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Gravity Compared to Earth (Earth = 1.0)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gravityData} margin={{ left: 10, right: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#E5E7EB', fontSize: 11, fontWeight: 600 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 2.5]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="gravity" name="Gravity (Earth = 1)" radius={[6, 6, 0, 0]} barSize={40}>
              {gravityData.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Whoa!</p>
        <p>On Jupiter, you would weigh more than <strong>twice</strong> as much as on Earth! You would feel super heavy and it would be really hard to jump. But on Pluto, you would be so light you could jump over a house!</p>
      </InsightCallout>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <span className="text-3xl">🏋️</span>
          <p className="text-sm font-bold text-red-300 mt-2">Heaviest</p>
          <p className="text-xs text-gray-400">Jupiter — 2.36x Earth</p>
          <p className="text-lg font-black text-white mt-1">{Math.round(weight * 2.36)} {unit}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <span className="text-3xl">🏠</span>
          <p className="text-sm font-bold text-blue-300 mt-2">Home</p>
          <p className="text-xs text-gray-400">Earth — 1.0x</p>
          <p className="text-lg font-black text-white mt-1">{weight} {unit}</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
          <span className="text-3xl">🪶</span>
          <p className="text-sm font-bold text-purple-300 mt-2">Lightest</p>
          <p className="text-xs text-gray-400">Pluto — 0.07x Earth</p>
          <p className="text-lg font-black text-white mt-1">{Math.round(weight * 0.07 * 10) / 10} {unit}</p>
        </div>
      </div>

      <QuizSection questions={gravityQuiz} />
    </div>
  );
}
