import React from 'react';
import { Check, X } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const features = [
  { key: 'electricStart', label: 'Electric Start', desc: 'Push-button start with battery' },
  { key: 'remoteStart', label: 'Remote Start', desc: 'Key fob wireless start from distance' },
  { key: 'coSensor', label: 'CO Sensor', desc: 'Auto-shutdown on carbon monoxide detection' },
  { key: 'gfciOutlets', label: 'GFCI Outlets', desc: 'Ground fault protection on 120V outlets' },
  { key: 'transferSwitchReady', label: 'Transfer Switch Ready', desc: 'L14-30R or 14-50R outlet for panel connection' },
  { key: 'outlet50A', label: '50A Outlet (14-50R)', desc: 'High-amperage outlet for whole-home or RV' },
  { key: 'outlet30A_L1430R', label: '30A Twist-Lock (L14-30R)', desc: 'Standard transfer switch connection' },
  { key: 'outlet30A_L530R', label: '30A RV (L5-30R)', desc: 'RV-ready outlet' },
  { key: 'inverter', label: 'Inverter', desc: 'Clean sine wave power (<5% THD)' },
  { key: 'parallelCapable', label: 'Parallel Capable', desc: 'Can link two units for more power' },
  { key: 'efi', label: 'EFI Engine', desc: 'Electronic fuel injection for efficiency' },
];

export default function FeaturesMatrix() {
  const sorted = [...products].sort((a, b) => {
    const scoreA = features.reduce((s, f) => s + (a[f.key] ? 1 : 0), 0);
    const scoreB = features.reduce((s, f) => s + (b[f.key] ? 1 : 0), 0);
    return scoreB - scoreA;
  });

  const scores = sorted.map(p => ({
    name: p.model,
    brand: p.brand,
    score: features.reduce((s, f) => s + (p[f.key] ? 1 : 0), 0),
    total: features.length,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Features Matrix</h2>
      <p className="text-gray-400 mb-6">Boolean feature comparison across all models</p>

      {/* Feature Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {features.map(f => (
          <div key={f.key} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
            <p className="text-sm font-medium text-white">{f.label}</p>
            <p className="text-xs text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>

      <InsightCallout variant="info" title="Why THD Matters for Your Setup">
        With 3 computers (including a gaming PC) and networking gear (Orbi + Meraki), you need <strong>clean power</strong>.
        THD above 5% can cause issues with sensitive electronics. Only <strong>inverter generators</strong> (GENMAX, DuroMax XP9500iH) guarantee &lt;5% THD.
        Open-frame generators with 12-23% THD should be paired with a <strong>UPS/battery backup</strong> for your computers.
      </InsightCallout>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase sticky left-0 bg-gray-900 z-10 min-w-[140px]">Model</th>
              {features.map(f => (
                <th key={f.key} className="px-2 py-2.5 text-center text-xs font-medium text-gray-400 uppercase whitespace-nowrap">{f.label}</th>
              ))}
              <th className="px-3 py-2.5 text-center text-xs font-medium text-gray-400 uppercase">Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => {
              const score = features.reduce((s, f) => s + (p[f.key] ? 1 : 0), 0);
              const scoreColor = score >= 8 ? 'text-emerald-400' : score >= 6 ? 'text-amber-400' : 'text-gray-400';
              return (
                <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                  <td className="px-3 py-2 font-medium text-white sticky left-0 bg-gray-950 z-10 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                      {p.model}
                    </div>
                  </td>
                  {features.map(f => (
                    <td key={f.key} className="px-2 py-2 text-center">
                      {p[f.key] ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-gray-700 mx-auto" />
                      )}
                    </td>
                  ))}
                  <td className={`px-3 py-2 text-center font-bold ${scoreColor}`}>{score}/{features.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Feature Score Ranking */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Feature Score Ranking</h3>
        <div className="space-y-3">
          {scores.map(s => (
            <div key={s.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[s.brand] }} />
              <span className="text-sm text-gray-300 w-32 flex-shrink-0">{s.name}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${s.score >= 8 ? 'bg-emerald-500' : s.score >= 6 ? 'bg-amber-500' : 'bg-gray-600'}`}
                  style={{ width: `${(s.score / s.total) * 100}%` }}
                />
              </div>
              <span className={`text-sm font-medium w-12 text-right ${s.score >= 8 ? 'text-emerald-400' : s.score >= 6 ? 'text-amber-400' : 'text-gray-400'}`}>
                {s.score}/{s.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="warning" title="Transfer Switch: You'll Need One">
        Since you don't have a transfer switch, budget <strong>$350-$1,000</strong> for one plus installation.
        Cheapest: <strong>Interlock kit (~$100 + $250 install)</strong> — uses your existing breaker panel.
        Best for you: <strong>Manual transfer switch 50A (~$400 + $600 install)</strong> — lets you select which circuits to power.
        Westinghouse models have a unique <strong>ST Switch ($250, no electrician)</strong> option, but it's 120V only.
      </InsightCallout>
    </div>
  );
}
