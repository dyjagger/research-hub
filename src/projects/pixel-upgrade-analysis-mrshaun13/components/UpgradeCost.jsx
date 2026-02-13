import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { DollarSign, TrendingDown, Tag } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { costAnalysis } from '../data/researchData';

const SCENARIO_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#22d3ee'];

export default function UpgradeCost() {
  const { pixel9ProResaleValue, pixel10ProPricing, pixel10Pricing, netUpgradeCosts } = costAnalysis;

  const chartData = netUpgradeCosts.map((s, i) => ({
    name: s.label,
    net: s.net,
    cost: s.cost,
    tradeIn: s.tradeIn,
    fill: SCENARIO_COLORS[i],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Upgrade Cost Analysis</h2>
        <p className="text-gray-400 text-sm">Real-world pricing as of February 2026. What does it actually cost you to upgrade?</p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Your Pixel 9 Pro Value</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Swappa Low</span>
              <span className="text-gray-300">${pixel9ProResaleValue.low}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average</span>
              <span className="text-emerald-400 font-semibold">${pixel9ProResaleValue.avg}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">High</span>
              <span className="text-gray-300">${pixel9ProResaleValue.high}</span>
            </div>
            <p className="text-[10px] text-gray-600 pt-1">{pixel9ProResaleValue.source}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Pixel 10 Pro Pricing</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">MSRP (128GB)</span>
              <span className="text-gray-500 line-through">${pixel10ProPricing.msrp128}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current Sale</span>
              <span className="text-amber-400">${pixel10ProPricing.currentSale128}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Best Deal (Amazon)</span>
              <span className="text-emerald-400 font-semibold">${pixel10ProPricing.amazonDeal128}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Lowest Seen</span>
              <span className="text-cyan-400">${pixel10ProPricing.lowestSeen128}</span>
            </div>
            <p className="text-[10px] text-gray-600 pt-1">{pixel10ProPricing.source}</p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Pixel 10 Standard</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">MSRP (128GB)</span>
              <span className="text-gray-500 line-through">${pixel10Pricing.msrp128}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current Street</span>
              <span className="text-emerald-400 font-semibold">${pixel10Pricing.currentStreet}</span>
            </div>
            <p className="text-[10px] text-gray-600 pt-2">
              ⚠️ Significant camera downgrade vs your 9 Pro
            </p>
            <p className="text-[10px] text-gray-600">{pixel10Pricing.source}</p>
          </div>
        </div>
      </div>

      {/* Net Cost Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Net Upgrade Cost After Selling Your Pixel 9 Pro (~$455)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} width={110} />
            <Tooltip content={<CustomTooltip formatter={v => `$${v}`} />} />
            <ReferenceLine x={0} stroke="#4b5563" />
            <Bar dataKey="net" name="Net Cost" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Scenario</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Phone Cost</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Trade-In</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Net Cost</th>
            </tr>
          </thead>
          <tbody>
            {netUpgradeCosts.map((s, i) => (
              <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-3 px-4 text-gray-300">{s.scenario}</td>
                <td className="py-3 px-4 text-right text-gray-400">{s.cost > 0 ? `$${s.cost}` : '—'}</td>
                <td className="py-3 px-4 text-right text-gray-400">{s.tradeIn > 0 ? `-$${s.tradeIn}` : '—'}</td>
                <td className={`py-3 px-4 text-right font-semibold ${s.net === 0 ? 'text-emerald-400' : s.net < 200 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {s.net === 0 ? 'FREE' : `$${s.net}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightCallout variant="cost" title="The Math">
        At the best current deal (~$650), upgrading costs you about <strong>$195 out of pocket</strong> after selling your 9 Pro.
        At MSRP, it's <strong>$544</strong> — for the same cameras, same design, and incremental improvements.
        Your Pixel 9 Pro's resale value will drop ~$50-100 over the next year, so waiting doesn't cost much.
      </InsightCallout>
    </div>
  );
}
