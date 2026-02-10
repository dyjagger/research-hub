import React from 'react';
import { Trophy, DollarSign, Wallet, Car, Mountain, Users, Gem } from 'lucide-react';
import { products, awards, buildTiers } from '../data/products';
import InsightCallout from './InsightCallout';

const iconMap = { Trophy, DollarSign, Wallet, Car, Mountain, Users, Gem };

const Recommendations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Recommendations</h2>
        <p className="text-gray-400 text-sm">Curated picks, quick decision guide, and tiered build packages for every budget</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map(award => {
          const Icon = iconMap[award.icon] || Trophy;
          const product = products.find(p => p.id === award.productId);
          if (!product) return null;
          return (
            <div key={award.id} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">{award.title}</p>
                  <p className="text-white font-bold text-lg mt-0.5">{product.name}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300">${product.price.toLocaleString()}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300">{product.weight_lbs} lbs</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300">{product.shellType}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-700/50 text-gray-300">{product.seasons}-season</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">{award.reason}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-green-400 text-xs font-medium mb-1">Pros</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{product.prosText.split(';').slice(0, 2).join('; ')}</p>
                    </div>
                    <div>
                      <p className="text-red-400 text-xs font-medium mb-1">Cons</p>
                      <p className="text-gray-400 text-xs line-clamp-2">{product.consText.split(';').slice(0, 2).join('; ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <InsightCallout variant="critical" title="The #1 Decision Factor">
        After analyzing all 12 tents across 8 specs, 6 features, and 5 use cases, the single most important factor is: <strong>how often will you use it?</strong> If you camp 2-3 times a year, the Smittybilt GEN2 at $1,149 is all you need. If you camp monthly or more, the iKamper BDV Duo's 30-second setup will pay for itself in saved frustration. If you're planning multi-week expeditions, the Skycamp 3.0 Mini or Alu-Cab are worth every penny.
      </InsightCallout>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Quick Decision Guide</h3>
        <div className="space-y-3">
          {[
            { q: 'Budget under $1,500?', a: 'Smittybilt GEN2 Overlander ($1,149) — best value, 3" mattress, proven platform', color: 'text-gray-400' },
            { q: 'Want hardshell under $1,500?', a: 'Topoak Galaxy 1.0 ($1,299) — cheapest hardshell, 1-min setup, 8" closed profile', color: 'text-gray-400' },
            { q: 'Need roof space for bikes/kayaks?', a: 'Thule Tepui Foothill ($2,000) — half-width design, leaves room for cargo', color: 'text-blue-400' },
            { q: 'Want the fastest setup possible?', a: 'iKamper BDV Duo ($2,799) — 30-second hydraulic pop-up, 4-season', color: 'text-amber-400' },
            { q: 'Daily drive with tent mounted?', a: 'Roofnest Falcon 3 EVO ($3,495) — 8" profile, most aerodynamic', color: 'text-purple-400' },
            { q: 'Best all-around, money no object?', a: 'iKamper Skycamp 3.0 Mini ($3,979) — the gold standard, does everything well', color: 'text-emerald-400' },
            { q: 'Camping with family (3+ people)?', a: 'Roofnest Condor Overland ($4,495) — largest hardshell, sleeps 3, flat floor', color: 'text-pink-400' },
            { q: 'Multi-month expedition?', a: 'Alu-Cab Gen 3.1 ($5,500) — expedition-proven, all-aluminum, buy-it-for-life', color: 'text-red-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900/30 rounded-lg p-3">
              <span className="text-white font-medium text-sm min-w-[240px]">{item.q}</span>
              <span className={`text-sm ${item.color}`}>→ {item.a}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Complete Build Packages</h3>
        <p className="text-gray-400 text-xs mb-4">Four complete overlanding setups at different price points — tent + rack + awning + kitchen + power + storage + recovery</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buildTiers.map((b, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                    <p className="text-white font-bold">{b.tier}</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{b.label}</p>
                </div>
                <p className="text-emerald-400 font-bold text-xl">${b.total.toLocaleString()}</p>
              </div>
              <p className="text-gray-400 text-sm mb-3">{b.description}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Tent:</span><span className="text-gray-300">{b.tent.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rack:</span><span className="text-gray-300">{b.rack.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Awning:</span><span className="text-gray-300">{b.awning.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Kitchen:</span><span className="text-gray-300">{b.kitchen.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Power:</span><span className="text-gray-300">{b.power.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Storage:</span><span className="text-gray-300">{b.storage.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Recovery:</span><span className="text-gray-300">{b.recovery.name}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="warning" title="Think Twice: Common Overlanding Mistakes">
        <strong>Don't overbuild before you camp.</strong> Many first-time overlanders spend $15K+ on gear before their first trip, then realize they don't need half of it. Start with the Budget Build ($3,565), do 5-10 trips, then upgrade what actually bothers you. The Jeep Rubicon is already 90% of the vehicle you need — the remaining 10% is about comfort, not capability.
      </InsightCallout>

      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5">
        <h3 className="text-emerald-400 font-bold mb-2">Bottom Line</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          For most Jeep Rubicon owners getting into overlanding, the <strong>Mid-Range Build (~$8,000)</strong> with the <strong>iKamper BDV Duo</strong> is the sweet spot. You get a 4-season hardshell with 30-second setup, a quality rack, 270° awning, ARB fridge, reliable power, and proper recovery gear. It's enough for comfortable multi-day trips without the premium tax of the top-tier options. If budget is tight, the <strong>Budget Build (~$3,500)</strong> with the Smittybilt GEN2 gets you on the trail immediately — upgrade the tent later when you know exactly what you want.
        </p>
      </div>
    </div>
  );
};

export default Recommendations;
