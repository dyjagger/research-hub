import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter } from 'recharts';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const ValueAnalysis = () => {
  const byPrice = [...products].sort((a, b) => a.price - b.price).map(p => ({
    name: p.model,
    price: p.price,
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
    tier: p.tier,
    crankcase: p.crankcase,
  }));

  const byPricePerHp = [...products].sort((a, b) => a.pricePerHp - b.pricePerHp).map(p => ({
    name: p.model,
    pricePerHp: Number(p.pricePerHp),
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
    crankcase: p.crankcase,
    hp: p.power_hp,
    price: p.price,
  }));

  const scatterData = products.map(p => ({
    name: p.model,
    price: p.price,
    hp: p.power_hp,
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
    crankcase: p.crankcase,
    tier: p.tier,
    id: p.id,
  }));

  const tcoData = [...products].sort((a, b) => {
    const aTco = a.price + (a.warranty_years <= 2 ? 350 : 250);
    const bTco = b.price + (b.warranty_years <= 2 ? 350 : 250);
    return aTco - bTco;
  }).map(p => {
    const annualFuel = p.displacement_cc > 55 ? 45 : 30;
    const annualMaint = p.crankcase === 'Magnesium' ? 25 : 35;
    const annualChain = 30;
    const fiveYearOp = (annualFuel + annualMaint + annualChain) * 5;
    return {
      name: p.model,
      purchase: p.price,
      fuelOil: annualFuel * 5,
      maintenance: annualMaint * 5,
      chains: annualChain * 5,
      total: p.price + fiveYearOp,
      brand: p.brand,
      warranty: p.warranty_years,
    };
  }).sort((a, b) => a.total - b.total);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Value Analysis</h2>
      <p className="text-gray-500 text-sm mb-6">Price, cost per horsepower, and 5-year total cost of ownership</p>

      <InsightCallout variant="warning" title="The Value Paradox: Cheapest to Buy ≠ Cheapest to Own">
        The Echo CS-590 at $480 gives you a magnesium crankcase and 4.0 HP — features that cost $760-$1,110 in Stihl pro saws. Meanwhile, the $500 Stihl MS 271 has a polymer crankcase and only 3.5 HP. <strong>Spending $20 less on the MS 271 gets you a significantly worse saw.</strong> The Echo also comes with a 5-year warranty vs Stihl's 2-year.
      </InsightCallout>

      {/* Price vs HP Scatter */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Price vs. Horsepower</h3>
        <p className="text-sm text-gray-500 mb-4">Upper-left = best value (more power, less money)</p>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="price" name="Price" domain={[300, 1200]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} label={{ value: 'Price ($)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 12 }} tickFormatter={v => `$${v}`} />
            <YAxis type="number" dataKey="hp" name="HP" domain={[2.5, 5.2]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} label={{ value: 'Horsepower (HP)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                  <p className="font-semibold text-gray-100">{d.name}</p>
                  <p className="text-sm text-emerald-400">${d.price}</p>
                  <p className="text-sm text-orange-400">{d.hp} HP</p>
                  <p className="text-xs text-gray-500">{d.crankcase} • {d.tier}</p>
                </div>
              );
            }} />
            <Scatter data={scatterData}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Price Ranking */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Price Ranking (low to high)</h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={byPrice} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" domain={[0, 1200]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 10 }} width={130} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                    <p className="font-semibold text-gray-100">{d.name}</p>
                    <p className="text-sm text-emerald-400">${d.price}</p>
                    <p className="text-xs text-gray-500">{d.crankcase} • {d.tier}</p>
                  </div>
                );
              }} />
              <Bar dataKey="price" radius={[0, 6, 6, 0]}>
                {byPrice.map((entry, i) => (
                  <Cell key={i} fill={entry.crankcase === 'Magnesium' ? '#22c55e' : '#6b7280'} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 justify-center mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500" /> Magnesium</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-500" /> Polymer</div>
          </div>
        </div>

        {/* Price per HP */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Price per Horsepower ($/HP) — lower is better</h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={byPricePerHp} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" domain={[0, 250]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 10 }} width={130} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                    <p className="font-semibold text-gray-100">{d.name}</p>
                    <p className="text-sm text-emerald-400">${d.pricePerHp}/HP</p>
                    <p className="text-sm text-gray-400">${d.price} / {d.hp} HP</p>
                    <p className="text-xs text-gray-500">{d.crankcase} crankcase</p>
                  </div>
                );
              }} />
              <Bar dataKey="pricePerHp" radius={[0, 6, 6, 0]}>
                {byPricePerHp.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5-Year TCO */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Estimated 5-Year Total Cost of Ownership</h3>
        <p className="text-sm text-gray-500 mb-4">Purchase price + fuel/oil + maintenance + replacement chains (assumes ~20 hrs/year use)</p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={tcoData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" domain={[0, 1600]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={v => `$${v}`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 10 }} width={130} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0]?.payload;
              return (
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                  <p className="font-semibold text-gray-100">{d?.name}</p>
                  <p className="text-sm text-blue-400">Purchase: ${d?.purchase}</p>
                  <p className="text-sm text-amber-400">Fuel & Oil: ${d?.fuelOil}</p>
                  <p className="text-sm text-orange-400">Maintenance: ${d?.maintenance}</p>
                  <p className="text-sm text-red-400">Chains: ${d?.chains}</p>
                  <p className="text-sm font-bold text-gray-100 mt-1 border-t border-gray-700 pt-1">5-Year Total: ${d?.total}</p>
                  <p className="text-xs text-gray-500">{d?.warranty}yr warranty</p>
                </div>
              );
            }} />
            <Bar dataKey="purchase" name="Purchase" stackId="tco" fill="#3b82f6" />
            <Bar dataKey="fuelOil" name="Fuel & Oil" stackId="tco" fill="#f59e0b" />
            <Bar dataKey="maintenance" name="Maintenance" stackId="tco" fill="#f97316" />
            <Bar dataKey="chains" name="Chains" stackId="tco" fill="#ef4444" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 justify-center mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500" /> Purchase</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500" /> Fuel & Oil</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-orange-500" /> Maintenance</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500" /> Chains</div>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center italic">Estimates based on ~20 hours/year use, current fuel/oil prices, and typical maintenance schedules. Magnesium saws have lower maintenance costs.</p>
      </div>
    </div>
  );
};

export default ValueAnalysis;
