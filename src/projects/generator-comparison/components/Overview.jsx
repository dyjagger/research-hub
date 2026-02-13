import React from 'react';
import { Zap, DollarSign, Fuel, Weight, Volume2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, BarChart, Bar, LabelList } from 'recharts';
import { products, BRAND_COLORS, USER_LOAD_PROFILE, SOFT_START_INFO } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const StatCard = ({ icon: Icon, label, value, sub, color = 'text-amber-400' }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

export default function Overview({ onProductSelect }) {
  const triFuel = products.filter(p => p.fuelType === 'Tri-Fuel');
  const dualFuel = products.filter(p => p.fuelType === 'Dual-Fuel');

  // Scatter data: Price vs NG Running Watts (tri-fuel only for main scatter)
  const scatterData = triFuel.map(p => ({
    x: p.price,
    y: p.runningWattsNG,
    name: p.name,
    brand: p.brand,
    id: p.id,
  }));

  // Load profile bar data
  const loadItems = USER_LOAD_PROFILE.winter.items.map(item => ({
    name: item.name,
    running: item.running,
    starting: item.starting,
  })).sort((a, b) => b.running - a.running);

  // Fuel type comparison
  const fuelTypeData = [
    { name: 'Tri-Fuel', count: triFuel.length, avgPrice: Math.round(triFuel.reduce((s, p) => s + p.price, 0) / triFuel.length) },
    { name: 'Dual-Fuel', count: dualFuel.length, avgPrice: Math.round(dualFuel.reduce((s, p) => s + p.price, 0) / dualFuel.length) },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Generator Comparison Overview</h2>
      <p className="text-gray-400 mb-6">Home backup power for Hendersonville, TN — Tri-fuel & dual-fuel portable generators</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Zap} label="Models Compared" value={products.length} sub={`${triFuel.length} tri-fuel, ${dualFuel.length} dual-fuel`} />
        <StatCard icon={DollarSign} label="Price Range" value={`$799–$2,599`} sub="Budget to whole-home" color="text-emerald-400" />
        <StatCard icon={Fuel} label="NG Power Range" value="5.5–10.3 kW" sub="Running watts on natural gas" color="text-blue-400" />
        <StatCard icon={Weight} label="Weight Range" value="192–362 lbs" sub="All portable (technically)" color="text-purple-400" />
      </div>

      {/* User Profile Insight */}
      <InsightCallout variant="recommendation" title="Your Power Profile">
        <strong>Winter:</strong> ~2,460W running (furnace blower, 3 fridges, 3 PCs, networking, TVs). Any generator here handles this.
        <br /><strong>Summer with 3-ton AC:</strong> ~5,960W running + up to 10,500W starting surge.
        With a <strong>$140 soft start kit</strong>, surge drops to ~4,500W — making 8,500W+ generators viable for AC on natural gas.
        <br /><strong>Bottom line:</strong> For NG + AC, you need ≥8,500W on natural gas. Only 4 models qualify.
      </InsightCallout>

      {/* Primary Scatter: Price vs NG Watts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Price vs. Natural Gas Running Watts</h3>
        <p className="text-xs text-gray-400 mb-4">Upper-left = best value (more NG watts per dollar). Only tri-fuel models shown.</p>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="Price"
              tickFormatter={v => `$${v.toLocaleString()}`}
              stroke="#6b7280"
              label={{ value: 'Price ($)', position: 'bottom', offset: 0, fill: '#9ca3af', fontSize: 12 }}
              domain={[600, 2800]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="NG Running Watts"
              tickFormatter={v => `${(v/1000).toFixed(1)}kW`}
              stroke="#6b7280"
              label={{ value: 'NG Running Watts', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }}
              domain={[4000, 11000]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-sm font-semibold text-white">{d.name}</p>
                    <p className="text-xs text-gray-400">Price: ${d.x.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">NG Running: {d.y.toLocaleString()}W</p>
                  </div>
                );
              }}
            />
            {/* Horizontal line at 5960W = summer load */}
            <Scatter data={scatterData} cursor="pointer">
              {scatterData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6b7280'} r={8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {Object.entries(BRAND_COLORS).map(([brand, color]) => {
            if (!triFuel.some(p => p.brand === brand)) return null;
            return (
              <div key={brand} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                {brand}
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="critical" title="The Natural Gas Derating Factor">
        Generators produce <strong>15–27% less power on natural gas</strong> vs gasoline. A "12,000W generator" only makes 8,500–10,260W on NG.
        This is the #1 factor in sizing. Always size based on NG watts if that's your long-term fuel plan.
      </InsightCallout>

      {/* Your Load Profile */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Your Winter Load Profile</h3>
        <p className="text-xs text-gray-400 mb-4">Running watts by device — total: {USER_LOAD_PROFILE.winter.totalRunning.toLocaleString()}W</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={loadItems} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 120 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tickFormatter={v => `${v}W`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={115} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}W`} />} />
            <Bar dataKey="running" fill="#f59e0b" name="Running Watts" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="running" position="right" fill="#9ca3af" fontSize={11} formatter={v => `${v}W`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AC Impact */}
      <InsightCallout variant="warning" title="Summer AC Changes Everything">
        A 3-ton central AC adds ~3,500W running and up to <strong>10,500W starting surge</strong>.
        A <strong>Micro-Air EasyStart soft start kit (~$140)</strong> reduces that surge to ~4,500W.
        Without soft start: you need 13,000W+ peak on NG (only the DuroMax XP15000HXT qualifies).
        With soft start: 8,500W+ running on NG works (4 models qualify).
      </InsightCallout>
    </div>
  );
}
