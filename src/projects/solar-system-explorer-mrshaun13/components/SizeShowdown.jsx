import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { sizeComparison, planets } from '../data/solarSystemData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { sizeQuiz } from '../data/quizData';

export default function SizeShowdown() {
  const [showEarthsFit, setShowEarthsFit] = useState(false);

  const diameterData = sizeComparison.map(p => ({
    name: p.name,
    diameter: p.diameter_km,
    color: p.color,
  }));

  const earthsFitData = sizeComparison
    .filter(p => p.earths_fit >= 1)
    .map(p => ({
      name: p.name,
      earths: p.earths_fit,
      color: p.color,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          📏 Size Showdown
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          How big are the planets compared to each other? Let's find out!
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowEarthsFit(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            !showEarthsFit ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          🌍 Planet Diameters
        </button>
        <button
          onClick={() => setShowEarthsFit(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            showEarthsFit ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          🏠 How Many Earths Fit Inside?
        </button>
      </div>

      {!showEarthsFit ? (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h3 className="text-sm font-bold text-gray-300 mb-4">Planet Diameters (km)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={diameterData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#E5E7EB', fontSize: 12, fontWeight: 600 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="diameter" name="Diameter (km)" radius={[0, 6, 6, 0]} barSize={28}>
                {diameterData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h3 className="text-sm font-bold text-gray-300 mb-4">How Many Earths Fit Inside Each Giant Planet?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earthsFitData} margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#E5E7EB', fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="earths" name="Earths That Fit" radius={[6, 6, 0, 0]} barSize={50}>
                {earthsFitData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <InsightCallout variant="wow">
        <p className="font-bold">Mind-blowing!</p>
        <p>Jupiter is SO big that over <strong>1,300 Earths</strong> could fit inside it! That is like filling a swimming pool with marbles!</p>
      </InsightCallout>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {planets.slice(0, 4).map(p => (
          <div key={p.name} className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
            <span className="text-2xl">{p.emoji}</span>
            <p className="text-xs font-bold text-white mt-1">{p.name}</p>
            <p className="text-lg font-black" style={{ color: p.accentColor || p.color }}>
              {p.diameter_km.toLocaleString()} km
            </p>
            <p className="text-[10px] text-gray-500">
              {p.diameter_earths < 1 ? `${(p.diameter_earths * 100).toFixed(0)}% of Earth` : 'Earth!'}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {planets.slice(4).map(p => (
          <div key={p.name} className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
            <span className="text-2xl">{p.emoji}</span>
            <p className="text-xs font-bold text-white mt-1">{p.name}</p>
            <p className="text-lg font-black" style={{ color: p.accentColor || p.color }}>
              {p.diameter_km.toLocaleString()} km
            </p>
            <p className="text-[10px] text-gray-500">{p.diameter_earths.toFixed(1)}x Earth</p>
          </div>
        ))}
      </div>

      <QuizSection questions={sizeQuiz} />
    </div>
  );
}
