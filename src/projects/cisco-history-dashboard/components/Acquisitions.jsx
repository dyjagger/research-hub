import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart, Line, ScatterChart, Scatter, ZAxis
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import {
  acquisitionsByYear, acquisitionCategories, topAcquisitions, acquisitionGeography
} from '../data/ciscoData';

const COLORS = ['#049fd9', '#6b21a8', '#059669', '#d97706', '#dc2626', '#0284c7', '#7c3aed', '#ea580c', '#64748b'];

export default function Acquisitions() {
  const [view, setView] = useState('timeline');

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">The Acquisition Machine</h2>
      <p className="text-slate-400 mb-6">
        218+ acquisitions totaling $70B+ — M&A as a core growth strategy since 1993
      </p>

      <div className="flex gap-3 mb-6 flex-wrap">
        {['timeline', 'categories', 'top10', 'geography'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              view === v
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600'
            }`}
          >
            {v === 'top10' ? 'Top 10 Deals' : v}
          </button>
        ))}
      </div>

      {view === 'timeline' && (
        <>
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Acquisitions per Year (Count & Spend)</h3>
            <ResponsiveContainer width="100%" height={420}>
              <ComposedChart data={acquisitionsByYear} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}B`} label={{ value: 'Spend ($B)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const item = acquisitionsByYear.find(a => a.year === label);
                    return (
                      <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 shadow-xl">
                        <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
                        {payload.map((entry, i) => (
                          <p key={i} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.name === 'Spend' ? `$${entry.value}B` : entry.value}
                          </p>
                        ))}
                        {item?.notable && (
                          <p className="text-slate-400 text-xs mt-1 border-t border-slate-700 pt-1">
                            Notable: {item.notable}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="count" name="Count" fill="#8b5cf6" radius={[2, 2, 0, 0]} opacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="spend" name="Spend" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <InsightCallout variant="highlight" title="Peak Acquisition Years">
            <strong>1999:</strong> 15 acquisitions worth $14.7B (including Cerent at $6.9B).
            <strong> 2000:</strong> 23 acquisitions worth $12.4B at the height of the dot-com bubble.
            <strong> 2023:</strong> 9 acquisitions worth $28.5B, dominated by the Splunk mega-deal.
          </InsightCallout>
        </>
      )}

      {view === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Acquisitions by Business Category</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={acquisitionCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="count"
                  nameKey="category"
                  label={({ category, count }) => `${category} (${count})`}
                  labelLine={{ stroke: '#64748b' }}
                >
                  {acquisitionCategories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 shadow-xl">
                        <p className="text-white text-sm font-medium">{payload[0].name}</p>
                        <p className="text-slate-300 text-sm">{payload[0].value} acquisitions</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={acquisitionCategories.sort((a, b) => b.count - a.count)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={110} />
                <Tooltip content={<CustomTooltip formatter={(val) => `${val} acquisitions`} />} />
                <Bar dataKey="count" name="Acquisitions" radius={[0, 4, 4, 0]}>
                  {acquisitionCategories.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-2">
            <InsightCallout variant="insight" title="From Networking to Security to AI">
              Cisco's acquisition strategy has evolved dramatically. The 1990s focused on <strong>networking/routing</strong> (building
              the internet backbone). The 2010s shifted to <strong>security and collaboration</strong> (Sourcefire, Duo, WebEx).
              The 2020s mark a pivot to <strong>data analytics and AI</strong> (Splunk, NeuralFabric, AppDynamics).
            </InsightCallout>
          </div>
        </div>
      )}

      {view === 'top10' && (
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top 10 Largest Acquisitions ($B)</h3>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={topAcquisitions}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 130, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}B`} />
              <YAxis
                type="category"
                dataKey="company"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                width={120}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 shadow-xl">
                      <p className="text-white text-sm font-medium">{d.company}</p>
                      <p className="text-emerald-400 text-sm">${d.value}B</p>
                      <p className="text-slate-400 text-xs">{d.year} · {d.category} · {d.country}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="value" name="Deal Value" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                {topAcquisitions.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? '#dc2626' : '#8b5cf6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <InsightCallout variant="highlight" title="Splunk: A Transformational Bet">
            The $28B Splunk acquisition in 2023 was <strong>4x larger</strong> than Cisco's previous biggest deal.
            It signals Cisco's strategic pivot from hardware-centric networking to data analytics, AI, and
            observability — positioning the company for the AI era.
          </InsightCallout>
        </div>
      )}

      {view === 'geography' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Acquisitions by Country</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={acquisitionGeography.sort((a, b) => b.count - a.count)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="country" stroke="#94a3b8" tick={{ fontSize: 12 }} width={90} />
                <Tooltip content={<CustomTooltip formatter={(val) => `${val} acquisitions`} />} />
                <Bar dataKey="count" name="Acquisitions" fill="#049fd9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
            <div className="space-y-3 mt-4">
              {acquisitionGeography.sort((a, b) => b.count - a.count).map((g, i) => {
                const pct = ((g.count / 218) * 100).toFixed(1);
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{g.country}</span>
                      <span className="text-slate-400">{g.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: '#049fd9' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <InsightCallout variant="info" title="US-Centric M&A">
              ~78% of Cisco's acquisitions are US-based companies. Israel is the second-largest source
              with 14 acquisitions, reflecting Israel's strong cybersecurity and networking startup ecosystem.
            </InsightCallout>
          </div>
        </div>
      )}
    </div>
  );
}
