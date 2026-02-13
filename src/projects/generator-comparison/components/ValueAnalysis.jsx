import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, Legend } from 'recharts';
import { products, BRAND_COLORS, TCO_ASSUMPTIONS } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

export default function ValueAnalysis() {
  const triFuel = products.filter(p => p.fuelType === 'Tri-Fuel');

  // Price comparison sorted
  const priceData = [...products]
    .sort((a, b) => a.price - b.price)
    .map(p => ({ name: p.model, brand: p.brand, price: p.price, fuelType: p.fuelType }));

  // Watts per dollar (NG) — tri-fuel only
  const wattsPerDollarNG = triFuel
    .sort((a, b) => b.wattsPerDollarNG - a.wattsPerDollarNG)
    .map(p => ({ name: p.model, brand: p.brand, value: p.wattsPerDollarNG }));

  // Watts per dollar (Gas) — all
  const wattsPerDollarGas = [...products]
    .sort((a, b) => b.wattsPerDollarGas - a.wattsPerDollarGas)
    .map(p => ({ name: p.model, brand: p.brand, value: p.wattsPerDollarGas, fuelType: p.fuelType }));

  // Price vs Gas Running Watts scatter (all models)
  const valueScatter = products.map(p => ({
    x: p.price,
    y: p.runningWattsGas,
    name: p.name,
    brand: p.brand,
    fuelType: p.fuelType,
  }));

  // 5-Year TCO estimate
  const tco = TCO_ASSUMPTIONS;
  const tcoData = products
    .filter(p => p.fuelType === 'Tri-Fuel')
    .map(p => {
      const annualFuelGas = tco.totalRuntimeHoursPerYear * p.fuelConsumptionGPH * tco.gasolinePricePerGallon;
      const annualFuelNG = tco.totalRuntimeHoursPerYear * tco.ngThermsPerHour8kW * tco.naturalGasPricePerTherm;
      const annualMaint = tco.annualMaintenanceCost;
      const fiveYearGas = p.price + (annualFuelGas + annualMaint) * tco.yearsCalculated;
      const fiveYearNG = p.price + (annualFuelNG + annualMaint) * tco.yearsCalculated;
      return {
        name: p.model,
        brand: p.brand,
        purchase: p.price,
        fuelGas5yr: Math.round(annualFuelGas * tco.yearsCalculated),
        fuelNG5yr: Math.round(annualFuelNG * tco.yearsCalculated),
        maintenance5yr: Math.round(annualMaint * tco.yearsCalculated),
        totalGas: Math.round(fiveYearGas),
        totalNG: Math.round(fiveYearNG),
      };
    })
    .sort((a, b) => a.totalNG - b.totalNG);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Value & Cost Analysis</h2>
      <p className="text-gray-400 mb-6">Price comparisons, watts-per-dollar, and 5-year total cost of ownership</p>

      {/* Price Comparison */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Price Comparison — All Models</h3>
        <p className="text-xs text-gray-400 mb-4">Sorted lowest to highest. Green border = tri-fuel.</p>
        <ResponsiveContainer width="100%" height={Math.max(280, products.length * 32)}>
          <BarChart data={priceData} layout="vertical" margin={{ top: 5, right: 50, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tickFormatter={v => `$${v.toLocaleString()}`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v.toLocaleString()}`} />} />
            <Bar dataKey="price" name="Price" radius={[0, 4, 4, 0]}>
              {priceData.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6b7280'} stroke={entry.fuelType === 'Tri-Fuel' ? '#10b981' : 'transparent'} strokeWidth={2} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Value Scatter */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Price vs. Gas Running Watts</h3>
        <p className="text-xs text-gray-400 mb-4">Upper-left quadrant = best value. Circles = tri-fuel, squares would be dual-fuel.</p>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="x" name="Price" tickFormatter={v => `$${v.toLocaleString()}`} stroke="#6b7280"
              label={{ value: 'Price ($)', position: 'bottom', offset: 0, fill: '#9ca3af', fontSize: 12 }} />
            <YAxis type="number" dataKey="y" name="Gas Running Watts" tickFormatter={v => `${(v/1000).toFixed(0)}kW`} stroke="#6b7280"
              label={{ value: 'Gas Running Watts', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0]?.payload;
              return (
                <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                  <p className="text-sm font-semibold text-white">{d.name}</p>
                  <p className="text-xs text-gray-400">Price: ${d.x.toLocaleString()} | Gas: {d.y.toLocaleString()}W</p>
                  <p className="text-xs text-gray-400">{d.fuelType}</p>
                </div>
              );
            }} />
            <Scatter data={valueScatter} cursor="pointer">
              {valueScatter.map((entry, i) => (
                <Cell key={i} fill={BRAND_COLORS[entry.brand] || '#6b7280'} r={entry.fuelType === 'Tri-Fuel' ? 8 : 6} opacity={entry.fuelType === 'Tri-Fuel' ? 1 : 0.6} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="highlight" title="The Value Sweet Spot">
        The <strong>DuroMax XP13000HXT at $1,399</strong> delivers 6.08 NG watts per dollar — the best value among generators that can run your AC on natural gas.
        The Westinghouse WGen9500TFc at $899 has a higher watts-per-dollar ratio (8.34), but can't run AC on NG.
      </InsightCallout>

      {/* Watts Per Dollar NG */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">NG Watts Per Dollar (Tri-Fuel Only)</h3>
        <p className="text-xs text-gray-400 mb-4">Higher = more natural gas watts for your money. This is the metric that matters for your NG plan.</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={wattsPerDollarNG} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v.toFixed(2)} W/$`} />} />
            <Bar dataKey="value" name="NG Watts per $" radius={[0, 4, 4, 0]}>
              {wattsPerDollarNG.map((entry, i) => (
                <Cell key={i} fill={entry.value >= 6 ? '#10b981' : entry.value >= 4 ? '#f59e0b' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 5-Year TCO */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">5-Year Total Cost of Ownership (Tri-Fuel, on NG)</h3>
        <p className="text-xs text-gray-400 mb-4">
          Assumes {tco.outagesPerYear} outages/year × {tco.avgOutageHoursPerEvent}hr avg = {tco.totalRuntimeHoursPerYear} hrs/year.
          NG at ${tco.naturalGasPricePerTherm}/therm. Maintenance ~${tco.annualMaintenanceCost}/yr.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={tcoData} layout="vertical" margin={{ top: 5, right: 40, bottom: 5, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#6b7280" tickFormatter={v => `$${v.toLocaleString()}`} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" width={95} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `$${v.toLocaleString()}`} />} />
            <Legend />
            <Bar dataKey="purchase" name="Purchase Price" stackId="a" fill="#6366f1" />
            <Bar dataKey="fuelNG5yr" name="NG Fuel (5yr)" stackId="a" fill="#10b981" />
            <Bar dataKey="maintenance5yr" name="Maintenance (5yr)" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="info" title="Natural Gas is Dirt Cheap to Run">
        At ~$1.10/therm, running a generator on natural gas costs roughly <strong>$1.30/hour</strong> — compared to $3.50+/hour on gasoline.
        Over 5 years of typical outage use (~480 hours), that's <strong>~$1,050 saved in fuel</strong> vs gasoline.
        Plus, NG never goes stale and you never have to store it.
      </InsightCallout>
    </div>
  );
}
