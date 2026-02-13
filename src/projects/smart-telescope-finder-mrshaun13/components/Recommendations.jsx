import React from 'react';
import { Trophy, Star, Gem, Eye, Backpack, Zap, Target } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { products, BRAND_COLORS } from '../data/products';

const awards = [
  {
    icon: Trophy,
    title: 'Best Overall for Your Use Case',
    productId: 'zwo-seestar-s30-pro',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-700',
    reason: 'The S30 Pro nails your exact requirements: 4K dual cameras, Scenery Mode for the Nashville skyline, excellent ZWO app for phone control, and at $599 it won\'t break the bank. The upgraded IMX585 sensor is a massive leap in image quality. Cast your phone to the TV and you\'re set.',
  },
  {
    icon: Star,
    title: 'Best Premium / No Compromises',
    productId: 'celestron-origin-mk2',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-700',
    reason: 'If money is no object, the Origin Mark II is in a class by itself. Its 152mm RASA optics produce images nothing else can touch. It has land-based viewing mode, multi-user simultaneous viewing, and built-in TV casting. At 35 lbs it\'s a permanent porch fixture — which is exactly what you want.',
  },
  {
    icon: Gem,
    title: 'Best Budget Value',
    productId: 'zwo-seestar-s30',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-700',
    reason: 'At $349 (on sale from $399), the S30 is the cheapest way into smart telescopes. Scenery Mode works for daytime viewing, the ZWO app is best-in-class, and the massive community means endless tutorials. Perfect if you want to try this hobby without a big commitment.',
  },
  {
    icon: Eye,
    title: 'Best for Terrestrial Viewing',
    productId: 'dwarflab-dwarf-3',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-700',
    reason: 'The DWARF 3\'s dedicated VIS filter (430-650nm) is specifically engineered for daytime terrestrial photography. No other scope has a purpose-built filter for this. Combined with 8MP resolution, bird tracking mode, and the longest battery (10,000mAh), it\'s the terrestrial viewing champion.',
  },
  {
    icon: Backpack,
    title: 'Most Portable',
    productId: 'dwarflab-dwarf-mini',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-700',
    reason: 'At 1.85 lbs, the DWARF Mini is lighter than most water bottles. Take it camping, traveling, or just move it between your porch and backyard. Dual camera, EQ mode, and built-in filters — all in a package you can literally pocket.',
  },
  {
    icon: Target,
    title: 'Best Aperture Value',
    productId: 'zwo-seestar-s50',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-700',
    reason: 'The S50 packs 50mm of aperture — the most light-gathering power under $600. Its 250mm focal length also gives the most terrestrial zoom in the budget tier. PCMag Editors\' Choice winner with the most proven firmware and largest community.',
  },
];

const purchaseOptions = [
  {
    label: 'Option A: Premium Porch Observatory',
    price: '$4,299',
    product: 'Celestron Origin Mark II',
    description: 'The ultimate permanent porch setup. 152mm RASA optics, land-based viewing, multi-user TV casting. Set it up once and never move it. Best astronomy images by far, plus terrestrial viewing of Nashville.',
    color: 'border-purple-600 bg-purple-950/30',
  },
  {
    label: 'Option B: Best Value Dual-Use',
    price: '$599',
    product: 'ZWO Seestar S30 Pro',
    description: 'The sweet spot. 4K dual cameras, Scenery Mode for skyline viewing, Milky Way panoramas, excellent app. Lightweight enough to bring inside when not in use. Our top pick for your specific use case.',
    color: 'border-amber-600 bg-amber-950/30',
  },
  {
    label: 'Option C: Terrestrial Champion',
    price: '$549',
    product: 'Dwarflab DWARF 3',
    description: 'If Nashville skyline viewing is your #1 priority, the DWARF 3\'s dedicated VIS filter is purpose-built for it. Also great for bird watching, wildlife, and nighttime astronomy. Tripod + carry case included.',
    color: 'border-cyan-600 bg-cyan-950/30',
  },
  {
    label: 'Option D: Budget Starter',
    price: '$349',
    product: 'ZWO Seestar S30',
    description: 'Dip your toes in for under $350. Scenery Mode, dual cameras, best app in the business. If you love it, upgrade to the S30 Pro later. If not, you\'re only out $349.',
    color: 'border-emerald-600 bg-emerald-950/30',
  },
];

const Recommendations = ({ onSelectProduct }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Recommendations</h2>
        <p className="text-gray-400 mt-1">Curated picks for your porch → phone → TV setup</p>
      </div>

      <InsightCallout variant="critical" title="The Bottom Line">
        For your specific use case — porch-mounted, phone-controlled, live to TV, dual-use stargazing + Nashville skyline — the <strong>ZWO Seestar S30 Pro ($599)</strong> is the best overall choice.
        It checks every box: 4K cameras, Scenery Mode, excellent app, lightweight, and great value.
        If you want the absolute best images and don't mind the weight/price, the <strong>Celestron Origin Mark II ($4,299)</strong> is unmatched.
      </InsightCallout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((award, i) => {
          const p = products.find(x => x.id === award.productId);
          if (!p) return null;
          const Icon = award.icon;
          return (
            <div key={i} className={`${award.bg} border rounded-xl p-4 hover:bg-opacity-20 transition-colors`}>
              <div className="flex items-start gap-3">
                <Icon className={`${award.color} w-6 h-6 flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className={`${award.color} text-xs font-bold uppercase tracking-wide`}>{award.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                    <p className="text-white font-semibold">{p.name}</p>
                    <span className="text-emerald-400 text-sm font-medium">${p.price.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] bg-gray-700/60 text-gray-300 px-1.5 py-0.5 rounded">{p.aperture_mm}mm</span>
                    <span className="text-[10px] bg-gray-700/60 text-gray-300 px-1.5 py-0.5 rounded">{p.resolution_mp}MP</span>
                    <span className="text-[10px] bg-gray-700/60 text-gray-300 px-1.5 py-0.5 rounded">{p.weight_lbs} lbs</span>
                    {p.terrestrial_viewing && (
                      <span className="text-[10px] bg-emerald-900/40 text-emerald-400 px-1.5 py-0.5 rounded">✅ Terrestrial</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed">{award.reason}</p>
                  <button
                    onClick={() => onSelectProduct?.(p.id)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 underline"
                  >
                    View full details →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Quick Decision Guide</h3>
        <div className="space-y-2">
          {[
            { q: 'Budget under $400?', a: 'Seestar S30 ($349) — best app, Scenery Mode, huge community' },
            { q: 'Want the best value with 4K?', a: 'Seestar S30 Pro ($599) — 4K dual cameras, Milky Way mode, Scenery Mode' },
            { q: 'Terrestrial viewing is #1 priority?', a: 'DWARF 3 ($549) — dedicated VIS filter, bird tracking, 8MP' },
            { q: 'Want the most light-gathering under $600?', a: 'Seestar S50 ($549) — 50mm aperture, 250mm zoom, Scenery Mode' },
            { q: 'Ultra-portable for travel too?', a: 'DWARF Mini ($399) — 1.85 lbs, fits in a pocket' },
            { q: 'Money is no object, want the best?', a: 'Celestron Origin Mark II ($4,299) — 152mm RASA, land-based mode, TV casting' },
            { q: 'Only care about astronomy, not terrestrial?', a: 'Unistellar Odyssey ($2,299) — 85mm mirror, no collimation, easy setup' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-gray-800/30 rounded-lg px-4 py-2">
              <span className="text-cyan-400 font-bold text-sm flex-shrink-0">Q:</span>
              <div>
                <p className="text-gray-300 text-sm font-medium">{item.q}</p>
                <p className="text-gray-400 text-xs mt-0.5">→ {item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Purchase Options by Budget</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseOptions.map((opt, i) => (
            <div key={i} className={`${opt.color} border rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold text-sm">{opt.label}</p>
                <span className="text-emerald-400 font-bold">{opt.price}</span>
              </div>
              <p className="text-cyan-300 text-xs font-medium mb-1">{opt.product}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{opt.description}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="warning" title="Think Twice About...">
        <strong>Unistellar eVscope 2 ($4,999)</strong> — Most expensive, oldest design (2022), requires manual collimation, NO terrestrial mode, and Telescopic Watch gave it a "Not Recommended" rating. The Celestron Origin Mark II does more for $700 less.<br /><br />
        <strong>Vaonis Vespera Pro ($2,990)</strong> — Beautiful 12.5MP images, but same 50mm aperture as the $549 Seestar S50. No terrestrial mode. You're paying $2,440 more for resolution and build quality, not capability.<br /><br />
        <strong>Any Unistellar model for YOUR use case</strong> — None of them have terrestrial viewing. If you want to see the Nashville skyline, Unistellar is off the table.
      </InsightCallout>
    </div>
  );
};

export default Recommendations;
