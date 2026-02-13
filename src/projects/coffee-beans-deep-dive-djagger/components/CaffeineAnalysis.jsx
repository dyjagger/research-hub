import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Legend } from 'recharts';
import { caffeineComparison, keepAwakeData } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const INTENSITY_COLORS = {
  'Extreme': '#ef4444',
  'Very High': '#f97316',
  'Moderate': '#eab308',
  'Mild-Moderate': '#84cc16',
  'Mild': '#22c55e',
  'Negligible': '#6b7280',
};

export default function CaffeineAnalysis() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Caffeine & Alertness</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          How much caffeine is in each species? Which beans keep you awake the longest?
          A deep comparison of caffeine content per gram, per bean, and per brewed cup.
        </p>
      </div>

      <InsightCallout color="amber">
        A single Robusta bean contains ~10mg of caffeine vs ~6mg for Arabica. Per brewed cup (8oz),
        Robusta delivers ~265mg — nearly 77% more than Arabica's ~150mg. If you need maximum alertness, Robusta is the clear winner.
      </InsightCallout>

      {/* Caffeine per species comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-1">Caffeine per 8oz Brewed Cup</h3>
          <p className="text-[10px] text-gray-500 mb-4">Milligrams of caffeine by species</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={caffeineComparison} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="species" tick={{ fill: '#d1d5db', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="caffeinePerCup" name="mg per cup" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-1">Caffeine per Gram of Beans</h3>
          <p className="text-[10px] text-gray-500 mb-4">Milligrams of caffeine per gram (dry weight)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={caffeineComparison} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="species" tick={{ fill: '#d1d5db', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="caffeinePerGram" name="mg per gram" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keep-Awake Index */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">Keep-Awake Index</h3>
        <p className="text-[10px] text-gray-500 mb-4">Estimated alertness duration by brew type — caffeine content vs hours of wakefulness effect</p>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={keepAwakeData} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fill: '#d1d5db', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'mg caffeine', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 10 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9ca3af', fontSize: 11 }} label={{ value: 'hours awake', angle: 90, position: 'insideRight', fill: '#6b7280', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="caffeineContent" name="Caffeine (mg)" fill="#eab308" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="keepAwakeHours" name="Hours Awake" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout color="rose">
        A double Robusta espresso delivers ~400mg of caffeine — the FDA's recommended daily maximum for adults.
        It can keep you alert for up to 8 hours. By contrast, a Geisha pour-over (low-caffeine Arabica variety) delivers
        only ~120mg with ~3 hours of mild alertness — ideal for flavor seekers who don't want jitters.
      </InsightCallout>

      {/* Caffeine quick-reference table */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-3">Quick Reference: Caffeine by Species</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Species</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">% by Weight</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">mg/gram</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">mg/bean</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">mg/cup (8oz)</th>
                <th className="text-right py-2 px-3 text-gray-400 font-medium">Alertness</th>
              </tr>
            </thead>
            <tbody>
              {caffeineComparison.map((c) => (
                <tr key={c.species} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-white font-medium">{c.species}</td>
                  <td className="py-2 px-3 text-right text-yellow-400">{c.caffeinePercent}%</td>
                  <td className="py-2 px-3 text-right text-gray-300">{c.caffeinePerGram}</td>
                  <td className="py-2 px-3 text-right text-gray-300">~{c.caffeinePerBean}</td>
                  <td className="py-2 px-3 text-right text-gray-300">~{c.caffeinePerCup}</td>
                  <td className="py-2 px-3 text-right">
                    <span className="font-semibold" style={{ color: c.keepAwakeRating >= 8 ? '#ef4444' : c.keepAwakeRating >= 6 ? '#eab308' : '#22c55e' }}>
                      {c.keepAwakeRating}/10
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
