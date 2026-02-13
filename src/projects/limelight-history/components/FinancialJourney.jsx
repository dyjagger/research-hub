import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { revenueData, stockPriceData, ERAS } from '../data/limelightData';

const eraColors = Object.values(ERAS).map(e => e.color);

function getEraColor(year) {
  if (year <= 2006) return ERAS['Startup'].color;
  if (year <= 2011) return ERAS['IPO & Streaming Boom'].color;
  if (year <= 2019) return ERAS['Stagnation'].color;
  if (year <= 2021) return ERAS['Reinvention'].color;
  if (year <= 2023) return ERAS['Edgio'].color;
  return ERAS['Collapse'].color;
}

export default function FinancialJourney() {
  const [view, setView] = useState('revenue');

  const revenueWithColor = revenueData.map(d => ({
    ...d,
    fill: getEraColor(d.year),
  }));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Financial Journey</h2>
        <p className="text-slate-400">Revenue growth, stock price trajectory, and the path to bankruptcy</p>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'revenue', label: 'Revenue' },
          { id: 'stock', label: 'Stock Price' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'revenue' && (
        <>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6">
            <h3 className="text-white font-semibold mb-4">Annual Revenue ($M)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}M`} />
                <Tooltip content={<CustomTooltip formatter={(v, n) => `$${v}M`} />} />
                <ReferenceLine x={2007} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'IPO', fill: '#10b981', fontSize: 11 }} />
                <ReferenceLine x={2022} stroke="#8b5cf6" strokeDasharray="3 3" label={{ value: 'Edgio', fill: '#8b5cf6', fontSize: 11 }} />
                <ReferenceLine x={2024} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Bankrupt', fill: '#ef4444', fontSize: 11 }} />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fill="url(#revGradient)" strokeWidth={2} name="Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <InsightCallout variant="warning" title="The Stagnation Decade">
            From 2012 to 2019, Limelight's revenue barely moved — hovering between $160M and $197M while the CDN
            market tripled in size. The 2022 Edgecast merger temporarily doubled revenue to $310M+, but integration
            failures and accounting issues made the growth illusory.
          </InsightCallout>

          {/* Revenue annotations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <p className="text-emerald-400 text-xs font-medium uppercase mb-1">Fastest Growth</p>
              <p className="text-white font-bold text-lg">+202%</p>
              <p className="text-slate-400 text-sm">2005→2006 ($21M→$64M)</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <p className="text-purple-400 text-xs font-medium uppercase mb-1">Biggest Jump</p>
              <p className="text-white font-bold text-lg">+$100M</p>
              <p className="text-slate-400 text-sm">2022 Edgecast merger effect</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <p className="text-red-400 text-xs font-medium uppercase mb-1">Final Decline</p>
              <p className="text-white font-bold text-lg">-51%</p>
              <p className="text-slate-400 text-sm">2023→2024 ($370M→$180M)</p>
            </div>
          </div>
        </>
      )}

      {view === 'stock' && (
        <>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6">
            <h3 className="text-white font-semibold mb-4">Stock Price History (LLNW → EGIO)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={stockPriceData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}`} domain={[0, 'auto']} />
                <Tooltip content={<CustomTooltip formatter={(v, n) => `$${v.toFixed(2)}`} />} />
                <Area type="monotone" dataKey="high" stroke="#10b981" fill="none" strokeWidth={1} strokeDasharray="3 3" name="52w High" />
                <Area type="monotone" dataKey="price" stroke="#f59e0b" fill="url(#stockGradient)" strokeWidth={2} name="Avg Price" />
                <Area type="monotone" dataKey="low" stroke="#ef4444" fill="none" strokeWidth={1} strokeDasharray="3 3" name="52w Low" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <InsightCallout variant="critical" title="From $25 to $0.02">
            Limelight's stock hit ~$25 on its first day of trading in June 2007 — a classic IPO pop. By the time
            the company filed for bankruptcy in September 2024, shares traded at $0.02. An investor who bought at
            IPO and held would have lost 99.87% of their investment.
          </InsightCallout>

          {/* Stock annotations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {stockPriceData.filter(d => d.event).map((d, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 flex items-center gap-3">
                <span className="text-slate-500 text-sm font-mono w-12">{d.year}</span>
                <span className="text-slate-300 text-sm">{d.event}</span>
                <span className="ml-auto text-amber-400 font-medium text-sm">${d.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
