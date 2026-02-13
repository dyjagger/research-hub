import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter } from 'recharts';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';

const PowerPerformance = () => {
  const byPtw = [...products].sort((a, b) => b.powerToWeight - a.powerToWeight).map(p => ({
    name: p.model,
    powerToWeight: p.powerToWeight,
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
    hp: p.power_hp,
    weight: p.weight_lbs,
    tier: p.tier,
    crankcase: p.crankcase,
  }));

  const byHp = [...products].sort((a, b) => b.power_hp - a.power_hp).map(p => ({
    name: p.model,
    hp: p.power_hp,
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
  }));

  const byWeight = [...products].sort((a, b) => a.weight_lbs - b.weight_lbs).map(p => ({
    name: p.model,
    weight: p.weight_lbs,
    brand: p.brand,
    fill: BRAND_COLORS[p.brand],
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Power & Weight Analysis</h2>
      <p className="text-gray-500 text-sm mb-6">The metric that matters most: how much power per pound of saw you carry</p>

      <InsightCallout variant="critical" title="Power-to-Weight Is the #1 Metric for Chainsaw Buyers">
        A higher HP/lb ratio means less fatigue and faster cuts. Pro saws achieve this with magnesium crankcases (lighter) and better-tuned engines (more power). The MS 261 and 550XP lead at ~0.38 HP/lb. Farm & Ranch saws with polymer cases cluster around 0.27-0.29 HP/lb — <strong>30% worse</strong>.
      </InsightCallout>

      {/* Power-to-Weight Ranking */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">Power-to-Weight Ratio (HP/lb)</h3>
        <p className="text-sm text-gray-500 mb-4">Higher is better — green = magnesium crankcase, gray = polymer</p>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={byPtw} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" domain={[0, 0.45]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 11 }} width={140} />
            <Tooltip content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
                  <p className="font-semibold text-gray-100">{d.name}</p>
                  <p className="text-sm text-orange-400">{d.powerToWeight} HP/lb</p>
                  <p className="text-sm text-gray-400">{d.hp} HP / {d.weight} lbs</p>
                  <p className="text-xs text-gray-500">{d.crankcase} crankcase • {d.tier}</p>
                </div>
              );
            }} />
            <Bar dataKey="powerToWeight" radius={[0, 6, 6, 0]}>
              {byPtw.map((entry, i) => (
                <Cell key={i} fill={entry.crankcase === 'Magnesium' ? '#22c55e' : '#6b7280'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-6 justify-center mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500" /> Magnesium crankcase</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-500" /> Polymer crankcase</div>
        </div>
      </div>

      <InsightCallout variant="highlight" title="The Paradox: Farm & Ranch Saws Are Heavier AND Less Powerful">
        The MS 271 Farm Boss (12.3 lbs, 3.5 HP) and 455 Rancher (12.8 lbs, 3.5 HP) are <em>heavier</em> than the pro-grade MS 261 (10.9 lbs, 4.1 HP). You literally pay more in weight for less power. The polymer crankcase adds weight while the detuned engine delivers less output. Spending $260 more on the MS 261 gets you a saw that's 1.4 lbs lighter AND 0.6 HP more powerful.
      </InsightCallout>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* HP Ranking */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Horsepower Ranking</h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={byHp} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" domain={[0, 5.5]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 10 }} width={130} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} HP`} />} />
              <Bar dataKey="hp" name="Horsepower" radius={[0, 6, 6, 0]}>
                {byHp.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weight Ranking */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Weight Ranking (lighter is better)</h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={byWeight} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
              <XAxis type="number" domain={[0, 15]} stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 10 }} width={130} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} lbs`} />} />
              <Bar dataKey="weight" name="Weight (lbs)" radius={[0, 6, 6, 0]}>
                {byWeight.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PowerPerformance;
