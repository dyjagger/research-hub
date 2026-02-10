import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { sourceMarkets2024, spendingByCategory } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';
const COLORS_PIE = ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4'];

const luxuryShareColors = { High: '#10b981', Medium: '#f59e0b', Low: '#6b7280' };

export default function MarketIntelligence() {
  const [sortBy, setSortBy] = useState('visitors');

  const sortedMarkets = [...sourceMarkets2024].sort((a, b) =>
    sortBy === 'visitors' ? b.visitors - a.visitors : b.yoy - a.yoy
  );

  const topLuxuryMarkets = sourceMarkets2024.filter(m => m.luxuryShare === 'High');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white">Market Intelligence</h2>
        <p className="text-gray-400 text-sm mt-1">
          Tourism statistics, visitor trends, spending patterns, and luxury source market analysis
        </p>
      </div>

      <InsightCallout>
        While South Korea, China, and Taiwan dominate total visitor volume, the highest-value luxury clients come from the
        United States, Australia, United Kingdom, Canada, Singapore, France, and Germany. These "High luxury share" markets
        represent your primary client base — travelers who spend 3-5x the average per capita and seek bespoke DMC services.
        The US alone sent 2.7M visitors in 2024 (+33.2% YoY) and is the #1 luxury feeder market.
      </InsightCallout>

      {/* Source Markets Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Source Markets — 2024 Visitor Volume</h3>
            <p className="text-xs text-gray-500">Thousands of visitors by country, with luxury share indicator</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setSortBy('visitors')}
              className={`text-[10px] px-2 py-1 rounded ${sortBy === 'visitors' ? 'bg-rose-500/20 text-rose-400' : 'bg-gray-800 text-gray-500'}`}
            >
              By Volume
            </button>
            <button
              onClick={() => setSortBy('yoy')}
              className={`text-[10px] px-2 py-1 rounded ${sortBy === 'yoy' ? 'bg-rose-500/20 text-rose-400' : 'bg-gray-800 text-gray-500'}`}
            >
              By Growth
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={sortedMarkets} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis dataKey="country" type="category" tick={{ fill: '#9ca3af', fontSize: 11 }} width={75} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="visitors" name="Visitors (K)" radius={[0, 4, 4, 0]}>
              {sortedMarkets.map((entry) => (
                <Cell key={entry.country} fill={luxuryShareColors[entry.luxuryShare]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 justify-center">
          {Object.entries(luxuryShareColors).map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              {label} Luxury Share
            </span>
          ))}
        </div>
      </div>

      {/* Key Luxury Feeder Markets */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Key Luxury Feeder Markets (High Luxury Share)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topLuxuryMarkets.map((m) => (
            <div key={m.country} className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-sm font-medium text-white">{m.country}</p>
              <p className="text-lg font-bold text-green-400">{m.visitors.toLocaleString()}K</p>
              <p className="text-[10px] text-gray-500">+{m.yoy}% YoY growth</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spending by Category */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Tourist Spending by Category</h3>
        <p className="text-xs text-gray-500 mb-4">Average visitor breakdown with luxury multiplier</p>
        <div className="grid md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={spendingByCategory}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={100}
                dataKey="percentage"
                nameKey="category"
                label={({ category, percentage }) => `${percentage}%`}
                labelLine={false}
              >
                {spendingByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS_PIE[i % COLORS_PIE.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-xs text-gray-400">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-2">Luxury travelers spend significantly more in every category:</p>
            {spendingByCategory.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: COLORS_PIE[i] }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{cat.category}</span>
                    <span className="text-xs font-medium" style={{ color: COLORS_PIE[i] }}>
                      {cat.luxuryMultiplier}x luxury multiplier
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${cat.percentage * 3}%`, backgroundColor: COLORS_PIE[i] }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Market Trends */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Key Market Trends for Luxury Travel Agents</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'China 10-Year Visa (Spring 2025)',
              detail: 'Japan introducing 10-year multiple-entry visa for affluent Chinese travelers. Could restore China to 9.6M+ visitors and unlock a massive luxury segment.',
              impact: 'High',
            },
            {
              title: 'World Expo 2025 (Osaka, Apr-Oct)',
              detail: '28.2M expected visitors, ~10% international. Driving luxury hotel development in Osaka and boosting Kansai region demand.',
              impact: 'High',
            },
            {
              title: 'Regional Dispersal Push',
              detail: 'Government selecting 14 model destinations to attract luxury travelers beyond the big 3 metros. Setouchi, Tohoku, and Shikoku emerging.',
              impact: 'Medium',
            },
            {
              title: 'Yen Weakness = Value Opportunity',
              detail: 'Favorable exchange rates make Japan luxury travel exceptional value vs. European alternatives. Luxury ryokan stays cost 30-50% less than comparable European luxury.',
              impact: 'High',
            },
            {
              title: 'Condé Nast #1 Country 2024',
              detail: 'Japan ranked #1 in Condé Nast Traveler Readers\' Choice Awards 2024 (US & UK editions). Kanazawa in National Geographic Best of World 2025.',
              impact: 'Medium',
            },
            {
              title: '42% Surge in Luxury Interest',
              detail: 'Multiple operators report 40%+ increase in luxury booking inquiries in H2 2024, with advance bookings for 2025 cherry blossom already at capacity.',
              impact: 'High',
            },
          ].map((trend) => (
            <div key={trend.title} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  trend.impact === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {trend.impact} Impact
                </span>
              </div>
              <p className="text-sm font-medium text-white">{trend.title}</p>
              <p className="text-xs text-gray-400 mt-1">{trend.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
