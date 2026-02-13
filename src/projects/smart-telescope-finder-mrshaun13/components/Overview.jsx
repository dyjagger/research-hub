import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Legend } from 'recharts';
import { Telescope, DollarSign, Eye, Zap } from 'lucide-react';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';
import { products, BRAND_COLORS, TIER_COLORS } from '../data/products';

const StatCard = ({ icon: Icon, label, value, sub, color = 'text-cyan-400' }) => (
  <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
  </div>
);

const Overview = () => {
  const terrestrialCount = products.filter(p => p.terrestrial_viewing).length;
  const brands = [...new Set(products.map(p => p.brand))];
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  const scatterData = products.map(p => ({
    name: p.name,
    brand: p.brand,
    price: p.price,
    aperture: p.aperture_mm,
    terrestrial: p.terrestrial_viewing,
    tier: p.tier,
  }));

  const tierCounts = Object.entries(
    products.reduce((acc, p) => { acc[p.tier] = (acc[p.tier] || 0) + 1; return acc; }, {})
  ).map(([tier, count]) => ({ tier, count }));

  const brandCounts = brands.map(b => ({
    brand: b,
    count: products.filter(p => p.brand === b).length,
    fill: BRAND_COLORS[b],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <p className="text-gray-400 mt-1">Smart telescopes for porch stargazing & Nashville skyline viewing</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Telescope} label="Models Compared" value={products.length} sub={`${brands.length} brands`} />
        <StatCard icon={DollarSign} label="Price Range" value={`$${minPrice}–$${maxPrice.toLocaleString()}`} sub="Budget to Premium" color="text-emerald-400" />
        <StatCard icon={Eye} label="Terrestrial Capable" value={`${terrestrialCount} of ${products.length}`} sub="Can view Nashville skyline" color="text-amber-400" />
        <StatCard icon={Zap} label="Aperture Range" value="24–152mm" sub="Light-gathering power" color="text-purple-400" />
      </div>

      <InsightCallout variant="recommendation" title="Your Use Case: Porch → Phone → TV">
        You want a smart telescope that sits on your porch, is controlled from your phone, and streams live to your TV via screen casting.
        <strong> Only {terrestrialCount} of {products.length} models</strong> support terrestrial/daytime viewing for your Nashville skyline goal.
        The Unistellar and Vaonis lines are astronomy-only — a critical distinction most buyers miss.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-1">Price vs Aperture — The Value Map</h3>
        <p className="text-gray-400 text-xs mb-4">Upper-left = best value (more aperture per dollar). Outlined dots = terrestrial capable.</p>
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="price"
              type="number"
              name="Price"
              domain={[200, 5200]}
              tickFormatter={v => `$${v.toLocaleString()}`}
              stroke="#9ca3af"
              fontSize={11}
              label={{ value: 'Price (USD)', position: 'bottom', offset: 5, fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis
              dataKey="aperture"
              type="number"
              name="Aperture"
              domain={[0, 170]}
              stroke="#9ca3af"
              fontSize={11}
              label={{ value: 'Aperture (mm)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af', fontSize: 11 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-sm">
                    <p className="text-white font-semibold">{d.name}</p>
                    <p className="text-gray-400 text-xs">{d.brand} · {d.tier}</p>
                    <p className="text-cyan-400 text-xs mt-1">${d.price.toLocaleString()} · {d.aperture}mm</p>
                    <p className={`text-xs mt-1 ${d.terrestrial ? 'text-emerald-400' : 'text-red-400'}`}>
                      {d.terrestrial ? '✅ Terrestrial viewing' : '❌ No terrestrial mode'}
                    </p>
                  </div>
                );
              }}
            />
            <Scatter data={scatterData}>
              {scatterData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={BRAND_COLORS[entry.brand]}
                  stroke={entry.terrestrial ? '#10b981' : '#6b7280'}
                  strokeWidth={entry.terrestrial ? 3 : 1}
                  r={entry.terrestrial ? 8 : 6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3 justify-center">
          {Object.entries(BRAND_COLORS).map(([brand, color]) => (
            <div key={brand} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              {brand}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-transparent" />
            Terrestrial capable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Models by Tier</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={tierCounts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} />
              <YAxis dataKey="tier" type="category" stroke="#9ca3af" fontSize={11} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Models" radius={[0, 4, 4, 0]}>
                {tierCounts.map((entry, i) => (
                  <Cell key={i} fill={TIER_COLORS[entry.tier] || '#6b7280'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Models by Brand</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={brandCounts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={11} />
              <YAxis dataKey="brand" type="category" stroke="#9ca3af" fontSize={11} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Models" radius={[0, 4, 4, 0]}>
                {brandCounts.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout variant="critical" title="The #1 Thing Most Buyers Miss">
        Smart telescopes are NOT traditional telescopes. You never look through an eyepiece (except the Unistellar Odyssey Pro and eVscope 2).
        Instead, the image builds on your phone over time via "live stacking." For terrestrial viewing, the image is near-real-time — perfect for watching the Nashville skyline.
        Every model here connects via WiFi to your phone, and you can cast your phone screen to your TV using Chromecast, AirPlay, or screen mirroring.
      </InsightCallout>
    </div>
  );
};

export default Overview;
