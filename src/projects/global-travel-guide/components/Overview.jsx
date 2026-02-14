import React from 'react';
import { Globe, Users, DollarSign, TrendingUp, Plane, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { globalOverview, arrivalsTimeline, topCountries, topCities } from '../data/researchData';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const ACCENT = '#06b6d4';

const statCards = [
  { label: 'International Arrivals (2025)', value: '1.52B', sub: '+4% YoY', icon: Plane, color: '#06b6d4' },
  { label: 'Tourism Receipts (2024)', value: '$1.73T', sub: 'Record high', icon: DollarSign, color: '#10b981' },
  { label: 'Tourism GDP Contribution', value: '$10.9T', sub: '10% of global GDP', icon: TrendingUp, color: '#f59e0b' },
  { label: 'Jobs Supported', value: '357M', sub: '1 in 10 jobs globally', icon: Users, color: '#8b5cf6' },
];

export default function Overview() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Globe className="text-cyan-400" size={32} />
          Global Travel Guide
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-3xl">
          A comprehensive intelligence dashboard for vacationers — covering the world's top destinations,
          hotel ratings, culinary hotspots, adventure activities, nightlife, beaches, safety, and travel budgets.
          Powered by UN Tourism, Euromonitor, TripAdvisor, and 15+ authoritative sources.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: s.color }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <InsightCallout color={ACCENT}>
        Global tourism has fully recovered from COVID-19 — 2025 arrivals of 1.52 billion exceeded the pre-pandemic
        2019 peak. The Middle East leads recovery at 132% of 2019 levels, driven by massive investment in Saudi Arabia,
        Qatar, and the UAE. Bangkok reclaimed its crown as the world's most visited city with 32.4M arrivals.
      </InsightCallout>

      {/* Arrivals Timeline */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-1">Global International Tourist Arrivals</h3>
        <p className="text-xs text-gray-500 mb-4">Billions of arrivals per year — pandemic crash & full recovery</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={arrivalsTimeline}>
            <defs>
              <linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACCENT} stopOpacity={0.3} />
                <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 1.8]} tickFormatter={(v) => `${v}B`} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}B`} />} />
            <Area type="monotone" dataKey="arrivals" stroke={ACCENT} fill="url(#arrGrad)" strokeWidth={2} name="Arrivals" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Countries + Top 5 Cities side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <MapPin size={14} className="text-cyan-400" /> Top Countries by Arrivals (2024)
          </h3>
          <div className="space-y-2">
            {topCountries.slice(0, 7).map((c) => (
              <div key={c.country} className="flex items-center gap-3">
                <span className="text-lg w-8">{c.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{c.country}</span>
                    <span className="text-xs text-white font-bold">{c.arrivals}M</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(c.arrivals / 102) * 100}%`, backgroundColor: ACCENT }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Plane size={14} className="text-emerald-400" /> Top Cities by Arrivals (2024)
          </h3>
          <div className="space-y-2">
            {topCities.slice(0, 7).map((c, i) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-5 text-right">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{c.city}, {c.country}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white font-bold">{c.arrivals}M</span>
                      <span className="text-[10px] text-emerald-400">+{c.growth}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${(c.arrivals / 32.4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
