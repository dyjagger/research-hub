import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { distanceData, planets } from '../data/solarSystemData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { distanceQuiz } from '../data/quizData';

function formatBigNumber(n) {
  if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)}B`;
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

function formatTime(hours) {
  if (hours < 24) return `${hours} hours`;
  const days = Math.round(hours / 24);
  if (days < 365) return `${days.toLocaleString()} days`;
  const years = (days / 365).toFixed(1);
  return `${years} years`;
}

export default function RaceToSun() {
  const chartData = distanceData.map(p => ({
    name: p.name,
    distance: p.distance_km,
    au: p.distance_au,
    color: p.color,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🏃 Race to the Sun
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          How far away is each planet from the Sun? And how long would it take to get there?
        </p>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Distance from the Sun (km)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={v => formatBigNumber(v)} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#E5E7EB', fontSize: 12, fontWeight: 600 }} width={70} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="distance" name="Distance (km)" radius={[0, 6, 6, 0]} barSize={28}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="info">
        <p className="font-bold">What is an AU?</p>
        <p>Scientists use a special measurement called an <strong>AU</strong> (Astronomical Unit). 1 AU = the distance from Earth to the Sun (about 150 million km). So Mars is 1.52 AU away — that means it is about 1.5 times farther from the Sun than we are!</p>
      </InsightCallout>

      <div>
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">🚗 How Long Would It Take to Travel There?</h3>
        <p className="text-xs text-gray-500 mb-4">From Earth, traveling at different speeds...</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-xs text-gray-500 font-bold">Planet</th>
                <th className="text-center py-2 px-3 text-xs text-gray-500 font-bold">
                  <span className="flex items-center justify-center gap-1">🚗 Car<br /><span className="text-[9px] font-normal">(100 km/h)</span></span>
                </th>
                <th className="text-center py-2 px-3 text-xs text-gray-500 font-bold">
                  <span className="flex items-center justify-center gap-1">🚀 Rocket<br /><span className="text-[9px] font-normal">(40,000 km/h)</span></span>
                </th>
                <th className="text-center py-2 px-3 text-xs text-gray-500 font-bold">
                  <span className="flex items-center justify-center gap-1">💡 Light<br /><span className="text-[9px] font-normal">(300,000 km/s)</span></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {distanceData.map((p, i) => (
                <tr key={p.name} className={`border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/10' : ''}`}>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{planets[i].emoji}</span>
                      <span className="font-bold text-white text-xs">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center text-xs text-gray-300 font-medium">
                    {formatTime(p.car_hours)}
                  </td>
                  <td className="py-2.5 px-3 text-center text-xs text-indigo-300 font-medium">
                    {formatTime(p.rocket_hours)}
                  </td>
                  <td className="py-2.5 px-3 text-center text-xs text-yellow-300 font-medium">
                    {p.light_minutes < 60 ? `${p.light_minutes} min` : `${(p.light_minutes / 60).toFixed(1)} hrs`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">That is SO far!</p>
        <p>If you drove a car to Neptune at highway speed, it would take over <strong>5,000 years</strong>! But light can get there in just about 4 hours. Light is the fastest thing in the universe!</p>
      </InsightCallout>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
          <span className="text-2xl">🏠</span>
          <p className="text-xs text-gray-500 mt-1">Closest Planet</p>
          <p className="text-sm font-bold text-white">Mercury</p>
          <p className="text-[10px] text-gray-400">58M km from Sun</p>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
          <span className="text-2xl">🌍</span>
          <p className="text-xs text-gray-500 mt-1">Our Home</p>
          <p className="text-sm font-bold text-white">Earth</p>
          <p className="text-[10px] text-gray-400">150M km (1 AU)</p>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
          <span className="text-2xl">🔵</span>
          <p className="text-xs text-gray-500 mt-1">Farthest Planet</p>
          <p className="text-sm font-bold text-white">Neptune</p>
          <p className="text-[10px] text-gray-400">4,495M km from Sun</p>
        </div>
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3 text-center">
          <span className="text-2xl">💜</span>
          <p className="text-xs text-gray-500 mt-1">Even Farther!</p>
          <p className="text-sm font-bold text-white">Pluto</p>
          <p className="text-[10px] text-gray-400">5,906M km from Sun</p>
        </div>
      </div>

      <QuizSection questions={distanceQuiz} />
    </div>
  );
}
