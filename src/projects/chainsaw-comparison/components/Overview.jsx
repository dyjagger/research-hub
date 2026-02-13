import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { Axe, DollarSign, Weight, Gauge } from 'lucide-react';
import { products, BRAND_COLORS, TIER_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const Overview = ({ onProductSelect }) => {
  const scatterData = products.map(p => ({
    name: p.name,
    brand: p.brand,
    weight: p.weight_lbs,
    hp: p.power_hp,
    price: p.price,
    tier: p.tier,
    fill: BRAND_COLORS[p.brand],
    id: p.id,
  }));

  const brandCounts = Object.entries(
    products.reduce((acc, p) => { acc[p.brand] = (acc[p.brand] || 0) + 1; return acc; }, {})
  ).map(([brand, count]) => ({ brand, count, fill: BRAND_COLORS[brand] }));

  const tierCounts = Object.entries(
    products.reduce((acc, p) => { acc[p.tier] = (acc[p.tier] || 0) + 1; return acc; }, {})
  ).map(([tier, count]) => ({ tier, count, fill: TIER_COLORS[tier] }));

  const avgPrice = Math.round(products.reduce((s, p) => s + p.price, 0) / products.length);
  const bestPtw = products.reduce((best, p) => p.powerToWeight > best.powerToWeight ? p : best);

  const ScatterTooltipContent = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
        <p className="font-semibold text-gray-100">{d.name}</p>
        <p className="text-sm text-gray-400">{d.tier}</p>
        <p className="text-sm mt-1"><span className="text-orange-400">{d.hp} HP</span> / <span className="text-blue-400">{d.weight} lbs</span></p>
        <p className="text-sm text-emerald-400">${d.price}</p>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Gas Chainsaw Comparison</h2>
      <p className="text-gray-500 text-sm mb-6">12 models across 3 brands — Stihl, Husqvarna, Echo</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Models Compared', value: products.length, icon: Axe, color: 'text-orange-400' },
          { label: 'Price Range', value: `$350–$1,110`, icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Avg Price', value: `$${avgPrice}`, icon: DollarSign, color: 'text-blue-400' },
          { label: 'Best Power/Weight', value: bestPtw.name.replace('Stihl ', '').replace('Husqvarna ', '').replace('Echo ', ''), icon: Gauge, color: 'text-purple-400' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${card.color}`} />
                <span className="text-xs text-gray-500 uppercase tracking-wide">{card.label}</span>
              </div>
              <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      <InsightCallout variant="recommendation" title="Your Profile: Buy-It-For-Life Gas Chainsaw Buyer">
        You're a new Tennessee homeowner with lots of trees and storm cleanup ahead. You prefer gas tools, want premium quality, and are willing to pay more for something that lasts. Your sweet spot is likely a <strong>professional-grade 50cc saw</strong> — powerful enough for storm cleanup and firewood, light enough for all-day use, and built with a magnesium crankcase to last 20+ years.
      </InsightCallout>

      {/* Primary Scatter: HP vs Weight */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Horsepower vs. Weight</h3>
        <p className="text-sm text-gray-500 mb-4">Upper-left = best power-to-weight ratio (more power, less weight)</p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="weight" name="Weight" unit=" lbs" domain={[9, 14.5]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} label={{ value: 'Weight (lbs)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 12 }} />
            <YAxis type="number" dataKey="hp" name="HP" unit=" HP" domain={[2.5, 5.2]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} label={{ value: 'Horsepower (HP)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip content={<ScatterTooltipContent />} />
            <Scatter data={scatterData} cursor="pointer" onClick={(d) => onProductSelect(d.id)}>
              {scatterData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} r={8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex gap-6 justify-center mt-2">
          {Object.entries(BRAND_COLORS).map(([brand, color]) => (
            <div key={brand} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              {brand}
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="highlight" title="Key Finding: The 50cc Sweet Spot">
        The scatter plot reveals a clear cluster of pro-grade 50cc saws (Stihl MS 261, Husqvarna 550XP, Husqvarna 545) in the <strong>upper-left quadrant</strong> — high power, low weight. These saws deliver 3.6–4.1 HP at only 10.8–10.9 lbs. The Farm & Ranch saws (lower-right) are actually <em>heavier</em> with <em>less</em> power due to polymer crankcases.
      </InsightCallout>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Models by Brand</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={brandCounts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis type="category" dataKey="brand" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} width={90} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {brandCounts.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Models by Tier</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tierCounts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis type="category" dataKey="tier" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} width={110} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {tierCounts.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
