import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { productionByCountry } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const REGION_COLORS = {
  'South America': '#f59e0b',
  'Asia': '#ef4444',
  'Africa': '#22c55e',
  'Central America': '#3b82f6',
};

export default function GlobalProduction() {
  const regionData = Object.entries(
    productionByCountry.reduce((acc, c) => {
      acc[c.region] = (acc[c.region] || 0) + c.production;
      return acc;
    }, {})
  ).map(([region, production]) => ({ region, production: Math.round(production * 10) / 10 }))
    .sort((a, b) => b.production - a.production);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Global Production</h2>
        <p className="text-sm text-gray-400 max-w-2xl">
          Coffee is grown in the "Bean Belt" — a horizontal band between the Tropics of Cancer and Capricorn.
          Over 70 countries produce coffee, but the top 10 account for ~80% of global output.
        </p>
      </div>

      <InsightCallout color="cyan">
        Brazil alone produces more coffee than the next 3 countries combined — 69.9 million 60kg bags in 2024/2025,
        accounting for 36.5% of global production. Vietnam is the world's largest Robusta producer, while Colombia
        and Ethiopia are the premier Arabica origins.
      </InsightCallout>

      {/* Top producers bar chart */}
      <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
        <h3 className="text-sm font-semibold text-white mb-1">Top 10 Coffee Producing Countries</h3>
        <p className="text-[10px] text-gray-500 mb-4">Millions of 60kg bags — 2024/2025 marketing year (USDA)</p>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={productionByCountry} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis type="category" dataKey="country" tick={{ fill: '#d1d5db', fontSize: 12 }} width={90} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="production" name="Million bags" radius={[0, 4, 4, 0]}>
              {productionByCountry.map((entry, i) => (
                <Cell key={i} fill={REGION_COLORS[entry.region] || '#6b7280'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3 justify-center">
          {Object.entries(REGION_COLORS).map(([region, color]) => (
            <div key={region} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-gray-400">{region}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Production by region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-1">Production by Region</h3>
          <p className="text-[10px] text-gray-500 mb-4">Aggregated output by growing region</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={regionData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="production" label={({ region, production }) => `${region} (${production}M)`}>
                {regionData.map((entry, i) => (
                  <Cell key={i} fill={REGION_COLORS[entry.region] || '#6b7280'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Country detail table */}
        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
          <h3 className="text-sm font-semibold text-white mb-3">Country Details</h3>
          <div className="overflow-y-auto max-h-[300px]">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-gray-900">
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-2 text-gray-400 font-medium">Country</th>
                  <th className="text-right py-2 px-2 text-gray-400 font-medium">M Bags</th>
                  <th className="text-right py-2 px-2 text-gray-400 font-medium">Share</th>
                  <th className="text-left py-2 px-2 text-gray-400 font-medium">Species</th>
                </tr>
              </thead>
              <tbody>
                {productionByCountry.map((c) => (
                  <tr key={c.country} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-2 text-white font-medium">{c.country}</td>
                    <td className="py-2 px-2 text-right text-gray-300">{c.production}</td>
                    <td className="py-2 px-2 text-right text-amber-400">{c.share}%</td>
                    <td className="py-2 px-2 text-gray-400">{c.species}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <InsightCallout color="emerald">
        Ethiopia is the birthplace of coffee and still grows it in a way no other country does — with over 10,000
        indigenous varieties, many growing wild in highland forests. Ethiopian "heirloom" coffees are genetically
        diverse in ways that no other origin can match, making Ethiopia irreplaceable for the future of coffee genetics.
      </InsightCallout>
    </div>
  );
}
