import React from 'react';
import { Tent, DollarSign, Weight, Timer } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Legend } from 'recharts';
import { products, TIER_COLORS, SHELL_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-gray-400 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
  </div>
);

const Overview = () => {
  const priceRange = `$${Math.min(...products.map(p => p.price)).toLocaleString()} – $${Math.max(...products.map(p => p.price)).toLocaleString()}`;
  const brands = [...new Set(products.map(p => p.brand))].length;
  const avgWeight = Math.round(products.reduce((s, p) => s + p.weight_lbs, 0) / products.length);

  const scatterData = products.map(p => ({
    name: p.name,
    price: p.price,
    weight: p.weight_lbs,
    area: p.sleepArea_sqft,
    tier: p.tier,
    shell: p.shellType,
    brand: p.brand,
  }));

  const shellDistribution = Object.entries(
    products.reduce((acc, p) => { acc[p.shellType] = (acc[p.shellType] || 0) + 1; return acc; }, {})
  ).map(([name, count]) => ({ name, count }));

  const tierDistribution = Object.entries(
    products.reduce((acc, p) => { acc[p.tier] = (acc[p.tier] || 0) + 1; return acc; }, {})
  ).map(([name, count]) => ({ name, count }));

  const ScatterTooltipContent = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white font-semibold text-sm">{d.name}</p>
        <p className="text-gray-300 text-xs">{d.brand} · {d.shell} · {d.tier}</p>
        <p className="text-emerald-400 text-sm mt-1">${d.price.toLocaleString()}</p>
        <p className="text-blue-400 text-sm">{d.weight} lbs</p>
        <p className="text-amber-400 text-sm">{d.area} sq ft sleeping</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
        <p className="text-gray-400 text-sm">Jeep Wrangler Rubicon rooftop tent camping setup for overlanding — market landscape & key metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Tent} label="RTTs Compared" value={products.length} sub="Across 3 tiers" color="text-emerald-400" />
        <StatCard icon={DollarSign} label="Price Range" value={priceRange} sub={`${brands} brands`} color="text-amber-400" />
        <StatCard icon={Weight} label="Avg Weight" value={`${avgWeight} lbs`} sub="Range: 104–200 lbs" color="text-blue-400" />
        <StatCard icon={Timer} label="Fastest Setup" value="30 sec" sub="iKamper BDV Duo" color="text-purple-400" />
      </div>

      <InsightCallout variant="recommendation" title="Your Setup Profile">
        As a Jeep Wrangler Rubicon owner looking to build an overlanding tent camping rig, your Jeep's roof can handle any RTT on this list (dynamic load rating ~200 lbs with proper rack). The Rubicon's factory rock rails, locking diffs, and disconnecting sway bar make it the ideal overlanding platform. Focus on: <strong>weight management</strong> (Rubicon payload ~1,000 lbs), <strong>aerodynamics</strong> for highway driving, and <strong>setup speed</strong> for multi-stop trips.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Price vs. Weight — The Core Tradeoff</h3>
        <p className="text-gray-400 text-xs mb-4">Each dot is a rooftop tent. Upper-left = lighter & cheaper (best value zone). Dot size = sleeping area.</p>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="price" name="Price" tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} stroke="#9ca3af" fontSize={12} label={{ value: 'Price ($)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 12 }} />
            <YAxis type="number" dataKey="weight" name="Weight" stroke="#9ca3af" fontSize={12} label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip content={<ScatterTooltipContent />} />
            <Scatter data={scatterData} fill="#3b82f6">
              {scatterData.map((entry, i) => (
                <Cell key={i} fill={SHELL_COLORS[entry.shell.toLowerCase()] || '#6366f1'} r={Math.max(6, entry.area / 4)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex gap-4 justify-center mt-2">
          {Object.entries(SHELL_COLORS).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: v }} />
              <span className="text-gray-400 text-xs capitalize">{k}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-3 text-sm">Shell Type Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={shellDistribution} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={80} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} models`} />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {shellDistribution.map((entry, i) => (
                  <Cell key={i} fill={SHELL_COLORS[entry.name.toLowerCase()] || '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-3 text-sm">Price Tier Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tierDistribution} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} width={80} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} models`} />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {tierDistribution.map((entry, i) => (
                  <Cell key={i} fill={TIER_COLORS[entry.name.toLowerCase()] || '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout variant="highlight" title="Key Finding: The $2,800 Inflection Point">
        Below $2,800, you're choosing between budget softshells and one budget hardshell. Above $2,800, every option is a hardshell with 4-season capability, sub-60-second setup, and premium materials. The iKamper BDV Duo at $2,799 sits right at this inflection point — it's the cheapest tent with premium-tier features.
      </InsightCallout>
    </div>
  );
};

export default Overview;
