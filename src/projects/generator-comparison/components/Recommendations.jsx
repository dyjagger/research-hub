import React from 'react';
import { Trophy, Star, DollarSign, Zap, Shield, Lightbulb, AlertTriangle, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import InsightCallout from './InsightCallout';

const awards = [
  {
    icon: Trophy,
    title: 'Best Overall Value',
    color: 'from-amber-500/20 to-amber-600/10',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    productId: 'duromax-xp13000hxt',
    reason: 'Half the price of 15kW models, 8,500W on NG handles AC with soft start, remote start, CO Alert, 5-year warranty. The sweet spot.',
  },
  {
    icon: Star,
    title: 'Best Premium / No Compromises',
    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    productId: 'duromax-xp15000hxt',
    reason: '10,260W on NG — the only portable that can start a 3-ton AC on natural gas WITHOUT a soft start. Runs everything, period.',
  },
  {
    icon: DollarSign,
    title: 'Best Budget Tri-Fuel',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    productId: 'westinghouse-wgen9500tfc',
    reason: '$899 for native NG support, 7,500W on NG covers winter essentials with headroom, best fuel efficiency, 12hr runtime.',
  },
  {
    icon: Shield,
    title: 'Best for Clean Power (Electronics)',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    productId: 'genmax-gm10500ietc',
    reason: 'Only tri-fuel inverter generator. <3% THD is safe for gaming PCs, networking gear, and all sensitive electronics. 64 dB quiet.',
  },
  {
    icon: Zap,
    title: 'Best "AC on NG" Value',
    color: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
    productId: 'westinghouse-wgen10500tfc',
    reason: '8,500W on NG at $1,237 — cheapest generator that can run your 3-ton AC on natural gas with a soft start kit.',
  },
  {
    icon: Lightbulb,
    title: 'Hidden Gem',
    color: 'from-cyan-500/20 to-cyan-600/10',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    productId: 'firman-t07573',
    reason: 'Includes L14-30 power cord ($50-100 value). Popular on Reddit for NG home backup. 5,500W on NG handles winter easily. Available at Lowes.',
  },
];

const quickDecisions = [
  { q: 'Want to run AC on natural gas?', a: 'DuroMax XP13000HXT ($1,399) + soft start ($140) = $1,539 total', productId: 'duromax-xp13000hxt' },
  { q: 'Want AC on NG with NO soft start needed?', a: 'DuroMax XP15000HXT ($2,599) — the only option', productId: 'duromax-xp15000hxt' },
  { q: 'Winter essentials only, lowest cost?', a: 'Firman T07571 ($799) — cheapest tri-fuel, includes NG support', productId: 'firman-t07571' },
  { q: 'Need clean power for gaming PC + networking?', a: 'GENMAX GM10500iETC ($2,500) — only tri-fuel inverter (<3% THD)', productId: 'genmax-gm10500ietc' },
  { q: 'Best balance of price, power, and features?', a: 'DuroMax XP13000HXT ($1,399) — best watts-per-dollar with NG', productId: 'duromax-xp13000hxt' },
  { q: 'Don\'t need NG right now, just want max power?', a: 'Westinghouse WGen12000DF ($1,399) — 12,000W gas, proven model', productId: 'westinghouse-wgen12000df' },
];

const purchaseOptions = [
  {
    label: 'Option A: Full Summer Coverage',
    desc: 'Run AC + everything on natural gas',
    items: [
      { name: 'DuroMax XP13000HXT', price: 1399 },
      { name: 'Micro-Air EasyStart 368 (soft start)', price: 140 },
      { name: 'Manual Transfer Switch 50A + Install', price: 1000 },
    ],
    total: 2539,
    color: 'border-amber-500/30',
  },
  {
    label: 'Option B: Premium No-Compromise',
    desc: 'AC on NG without soft start, max headroom',
    items: [
      { name: 'DuroMax XP15000HXT', price: 2599 },
      { name: 'Manual Transfer Switch 50A + Install', price: 1000 },
    ],
    total: 3599,
    color: 'border-purple-500/30',
  },
  {
    label: 'Option C: Budget Winter + Gas Summer',
    desc: 'NG for winter, gasoline for summer AC',
    items: [
      { name: 'Westinghouse WGen9500TFc', price: 899 },
      { name: 'Interlock Kit + Install', price: 350 },
    ],
    total: 1249,
    color: 'border-emerald-500/30',
  },
  {
    label: 'Option D: Ultra-Budget Winter Only',
    desc: 'Cheapest path to NG backup for essentials',
    items: [
      { name: 'Firman T07571', price: 799 },
      { name: 'Interlock Kit + Install', price: 350 },
    ],
    total: 1149,
    color: 'border-gray-500/30',
  },
];

const thinkTwice = [
  {
    productId: 'champion-201161',
    reason: 'Same price as DuroMax XP15000HXT ($2,599) but 20% THD is terrible for your computers and networking gear. No remote start. Shorter warranty (3yr vs 5yr). The DuroMax is better in almost every way.',
  },
  {
    productId: 'genmax-gm10500ietc',
    reason: 'Clean power is great, but $2,500 for only 6,800W on NG means winter essentials only — no AC. You could buy the DuroMax XP13000HXT ($1,399) + a good UPS ($200) for your electronics and have $900 left over with MORE power.',
  },
  {
    productId: 'westinghouse-wgen14500df',
    reason: 'Massive power on gas, but no native NG support. At $1,799, you\'re paying more than the DuroMax XP13000HXT ($1,399) which HAS native NG. Aftermarket NG conversion kits void the warranty.',
  },
];

export default function Recommendations({ onProductSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Recommendations</h2>
      <p className="text-gray-400 mb-6">Curated picks based on your specific needs in Hendersonville, TN</p>

      {/* Award Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {awards.map(award => {
          const p = products.find(pr => pr.id === award.productId);
          if (!p) return null;
          const Icon = award.icon;
          return (
            <div key={award.title}
              className={`bg-gradient-to-br ${award.color} ${award.border} border rounded-xl p-4 cursor-pointer hover:scale-[1.01] transition-transform`}
              onClick={() => onProductSelect(award.productId)}>
              <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 ${award.iconColor} flex-shrink-0`} />
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${award.iconColor} uppercase tracking-wide`}>{award.title}</p>
                  <p className="text-lg font-bold text-white mt-0.5">{p.name}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-gray-300">${p.price.toLocaleString()}</span>
                    {p.runningWattsNG && <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-emerald-400">{(p.runningWattsNG/1000).toFixed(1)}kW NG</span>}
                    <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-gray-300">{p.fuelType}</span>
                    <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-gray-300">&lt;{p.thd}% THD</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{award.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Decision Guide */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Decision Guide</h3>
        <div className="space-y-3">
          {quickDecisions.map((qd, i) => (
            <div key={i} className="flex items-start gap-3 cursor-pointer hover:bg-gray-800/30 rounded-lg p-2 -mx-2 transition-colors"
              onClick={() => onProductSelect(qd.productId)}>
              <ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{qd.q}</p>
                <p className="text-sm text-gray-400">{qd.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Tier Purchase Options */}
      <h3 className="text-lg font-semibold text-white mb-3">Complete Purchase Options (Generator + Transfer Switch)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {purchaseOptions.map(opt => (
          <div key={opt.label} className={`bg-gray-900 ${opt.color} border rounded-xl p-4`}>
            <p className="text-sm font-bold text-white">{opt.label}</p>
            <p className="text-xs text-gray-400 mb-3">{opt.desc}</p>
            <div className="space-y-1.5">
              {opt.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-gray-400">${item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between">
              <span className="text-sm font-semibold text-white">Total</span>
              <span className="text-lg font-bold text-amber-400">${opt.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <InsightCallout variant="recommendation" title="My Pick for You">
        <strong>Option A: DuroMax XP13000HXT + Soft Start + 50A Transfer Switch = ~$2,539</strong>
        <br />This gives you: native natural gas support, enough power for AC in summer (with soft start), all your winter essentials with massive headroom,
        remote start, CO Alert, 5-year warranty, and a proper transfer switch for safe whole-home connection.
        It's $1,060 less than Option B with 95% of the capability.
      </InsightCallout>

      {/* Think Twice */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Think Twice About These
        </h3>
        <p className="text-xs text-gray-400 mb-4">Not bad generators — just not the best fit for YOUR specific needs.</p>
        <div className="space-y-3">
          {thinkTwice.map(tt => {
            const p = products.find(pr => pr.id === tt.productId);
            if (!p) return null;
            return (
              <div key={tt.productId} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                <p className="text-sm font-medium text-white">{p.name} — ${p.price.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-1">{tt.reason}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
