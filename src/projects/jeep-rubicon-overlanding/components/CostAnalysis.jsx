import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, ScatterChart, Scatter } from 'recharts';
import { products, buildTiers, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const CostAnalysis = () => {
  const [selectedTier, setSelectedTier] = useState(null);

  const priceData = [...products].sort((a, b) => a.price - b.price).map(p => ({
    name: p.name.replace(p.brand + ' ', ''),
    fullName: p.name,
    price: p.price,
    brand: p.brand,
    tier: p.tier,
  }));

  const valueData = products.map(p => ({
    name: p.name,
    price: p.price,
    area: p.sleepArea_sqft,
    pricePerSqft: p.pricePerSqft,
    brand: p.brand,
    tier: p.tier,
  }));

  const buildData = buildTiers.map(b => ({
    name: b.tier,
    tent: b.tent.price,
    rack: b.rack.price,
    awning: b.awning.price,
    kitchen: b.kitchen.price,
    power: b.power.price,
    storage: b.storage.price,
    recovery: b.recovery.price,
    total: b.total,
  }));

  const catColors = {
    tent: '#ef4444',
    rack: '#f59e0b',
    awning: '#10b981',
    kitchen: '#3b82f6',
    power: '#8b5cf6',
    storage: '#ec4899',
    recovery: '#6b7280',
  };

  const catLabels = {
    tent: 'Rooftop Tent',
    rack: 'Roof Rack',
    awning: 'Awning',
    kitchen: 'Kitchen',
    power: 'Power System',
    storage: 'Storage',
    recovery: 'Recovery',
  };

  const ValueTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white font-semibold text-sm">{d.name}</p>
        <p className="text-emerald-400 text-sm">${d.price.toLocaleString()}</p>
        <p className="text-blue-400 text-sm">{d.area} sq ft</p>
        <p className="text-amber-400 text-sm">${d.pricePerSqft.toFixed(0)}/sq ft</p>
      </div>
    );
  };

  const detail = selectedTier !== null ? buildTiers[selectedTier] : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Cost Analysis</h2>
        <p className="text-gray-400 text-sm">RTT pricing breakdown and complete overlanding build costs at every budget level</p>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">RTT Price Comparison</h3>
        <p className="text-gray-400 text-xs mb-4">All 12 rooftop tents sorted by price, colored by brand</p>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={priceData} layout="vertical" margin={{ left: 5, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#9ca3af" fontSize={12} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} />
            <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} width={140} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v.toLocaleString()}`} />} />
            <Bar dataKey="price" radius={[0, 6, 6, 0]}>
              {priceData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Price vs. Sleeping Area — Value Map</h3>
        <p className="text-gray-400 text-xs mb-4">Lower-right = more space for less money (best value). Upper-left = premium price for less space.</p>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="area" name="Sleeping Area" stroke="#9ca3af" fontSize={12} label={{ value: 'Sleeping Area (sq ft)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 12 }} />
            <YAxis type="number" dataKey="price" name="Price" stroke="#9ca3af" fontSize={12} tickFormatter={v => `$${(v / 1000).toFixed(1)}k`} label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip content={<ValueTooltip />} />
            <Scatter data={valueData} fill="#3b82f6">
              {valueData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6366f1'} r={7} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="warning" title="The Value Paradox">
        The cheapest tent to <strong>buy</strong> (Smittybilt at $1,149) has the <strong>best</strong> price-per-sqft at $32/sqft. But the cheapest tent to <strong>live with</strong> might be the iKamper BDV Duo — its 30-second setup saves you 5+ minutes every camp/break, which over 100 nights equals 8+ hours of your life. Time has value too.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Complete Build Cost by Tier</h3>
        <p className="text-gray-400 text-xs mb-4">Total cost of a complete overlanding setup — tent + rack + awning + kitchen + power + storage + recovery</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={buildData} margin={{ left: 5, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} />
            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v.toLocaleString()}`} />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {Object.entries(catColors).map(([key, color]) => (
              <Bar key={key} dataKey={key} stackId="a" fill={color} name={catLabels[key]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {buildTiers.map((b, i) => (
          <button key={i} onClick={() => setSelectedTier(selectedTier === i ? null : i)} className={`text-left bg-gray-800/40 border rounded-xl p-4 transition-all hover:bg-gray-800/60 ${selectedTier === i ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-gray-700/50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
              <p className="text-white font-semibold text-sm">{b.tier}</p>
            </div>
            <p className="text-emerald-400 font-bold text-lg">${b.total.toLocaleString()}</p>
            <p className="text-gray-500 text-xs mt-1">{b.label}</p>
            <p className="text-gray-400 text-xs mt-2">{b.description}</p>
          </button>
        ))}
      </div>

      {detail && (
        <div className="bg-gray-800/40 border border-emerald-500/30 rounded-xl p-5">
          <h3 className="text-emerald-400 font-semibold mb-3">{detail.tier} — Component Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Tent', ...detail.tent },
              { label: 'Rack', ...detail.rack },
              { label: 'Awning', ...detail.awning },
              { label: 'Kitchen', ...detail.kitchen },
              { label: 'Power', ...detail.power },
              { label: 'Storage', ...detail.storage },
              { label: 'Recovery', ...detail.recovery },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-900/50 rounded-lg px-3 py-2">
                <div>
                  <span className="text-gray-500 text-xs">{item.label}</span>
                  <p className="text-gray-300 text-sm">{item.name}</p>
                </div>
                <span className="text-emerald-400 font-medium text-sm">${item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700/50 flex justify-between items-center">
            <span className="text-white font-semibold">Total</span>
            <span className="text-emerald-400 font-bold text-xl">${detail.total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostAnalysis;
