import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { temperatureData } from '../data/solarSystemData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { temperatureQuiz } from '../data/quizData';

export default function HotAndCold() {
  const [unit, setUnit] = useState('c');

  const data = temperatureData.map(p => ({
    name: p.name,
    temp: unit === 'c' ? p.avg_c : p.avg_f,
    color: p.color,
    label: p.label,
  }));

  const funComparisons = [
    { emoji: '🍕', label: 'Oven for pizza', temp_c: 260, temp_f: 500 },
    { emoji: '💧', label: 'Water boils', temp_c: 100, temp_f: 212 },
    { emoji: '🏖️', label: 'Hot summer day', temp_c: 38, temp_f: 100 },
    { emoji: '🧊', label: 'Water freezes', temp_c: 0, temp_f: 32 },
    { emoji: '❄️', label: 'Really cold winter', temp_c: -30, temp_f: -22 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🌡️ Hot & Cold
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Some planets are super hot and some are freezing cold! Let's compare!
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setUnit('c')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            unit === 'c' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          °C Celsius
        </button>
        <button
          onClick={() => setUnit('f')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            unit === 'f' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          °F Fahrenheit
        </button>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Average Temperature by Planet ({unit === 'c' ? '°C' : '°F'})</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ left: 10, right: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#E5E7EB', fontSize: 11, fontWeight: 600 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={v => `${v}°`} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#6B7280" strokeDasharray="4 4" label={{ value: '0°', fill: '#9CA3AF', fontSize: 10 }} />
            <Bar dataKey="temp" name={`Temperature (°${unit.toUpperCase()})`} radius={[6, 6, 0, 0]} barSize={40}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.temp > 0 ? '#EF4444' : '#3B82F6'}
                  fillOpacity={Math.min(1, 0.4 + Math.abs(entry.temp) / (unit === 'c' ? 500 : 900))}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="hot">
        <p className="font-bold">Surprise!</p>
        <p>Venus is hotter than Mercury even though Mercury is closer to the Sun! That is because Venus has a super thick atmosphere that traps heat like a blanket. Scientists call this the <strong>greenhouse effect</strong>!</p>
      </InsightCallout>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">🤔 How Hot or Cold Is That? Fun Comparisons!</h3>
        <div className="space-y-2">
          {funComparisons.map((c, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="text-xl w-8 text-center">{c.emoji}</span>
              <span className="text-gray-300 flex-1">{c.label}</span>
              <span className="text-white font-bold">{unit === 'c' ? `${c.temp_c}°C` : `${c.temp_f}°F`}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-500">
            Venus at {unit === 'c' ? '464°C' : '867°F'} is almost <strong>twice as hot</strong> as your oven when baking pizza! 🍕🔥
          </p>
        </div>
      </div>

      <InsightCallout variant="cool">
        <p className="font-bold">Brrr!</p>
        <p>Neptune is the coldest planet at {unit === 'c' ? '-200°C' : '-328°F'}. That is way colder than anything on Earth — even colder than Antarctica!</p>
      </InsightCallout>

      <QuizSection questions={temperatureQuiz} />
    </div>
  );
}
