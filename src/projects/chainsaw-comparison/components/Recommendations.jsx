import React from 'react';
import { Trophy, Star, DollarSign, Shield, Sparkles, Wrench, Heart, Zap } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const awards = [
  {
    icon: Trophy,
    title: 'Best Overall Value',
    productId: 'echo-cs-590',
    gradient: 'from-amber-600 to-orange-600',
    reason: 'Magnesium crankcase, 4.0 HP, 59.8cc, massive fuel tank, 5-year warranty — all for $480. TechGearLab\'s #1 gas chainsaw. You get pro-grade build quality at a farm & ranch price.',
  },
  {
    icon: Shield,
    title: 'Best "Buy It For Life"',
    productId: 'stihl-ms-261',
    gradient: 'from-blue-600 to-indigo-600',
    reason: 'The gold standard mid-size pro saw. M-Tronic auto-tuning, magnesium crankcase, 4.1 HP at only 10.9 lbs. Widely considered the best all-around chainsaw available. Will last 20+ years with basic maintenance.',
  },
  {
    icon: Zap,
    title: 'Best Power-to-Weight',
    productId: 'husqvarna-550xp-mk2',
    gradient: 'from-purple-600 to-pink-600',
    reason: 'Maximum power in the 50cc class at 4.1 HP and only 10.8 lbs. AutoTune engine management. Full magnesium construction. The lightest and most powerful 50cc saw you can buy.',
  },
  {
    icon: Sparkles,
    title: 'Hidden Gem',
    productId: 'husqvarna-545-mk2',
    gradient: 'from-emerald-600 to-teal-600',
    reason: 'The 550XP detuned slightly — same magnesium crankcase, same pro-grade build, $130 less. Community forums consistently recommend this as the best value in a pro-built saw. 90% of the 550XP for 83% of the price.',
  },
  {
    icon: DollarSign,
    title: 'Best Budget Pro-Build',
    productId: 'echo-cs-490',
    gradient: 'from-green-600 to-emerald-600',
    reason: 'Magnesium crankcase at only $350 — the cheapest pro-grade construction in the comparison. Includes decompression valve and adjustable oiler. 5-year warranty. Unbeatable entry point into quality chainsaws.',
  },
  {
    icon: Wrench,
    title: 'Best for Large Trees',
    productId: 'echo-cs-620p',
    gradient: 'from-red-600 to-rose-600',
    reason: 'Professional-grade 60cc at $580 — handles up to 27" bar. Same power class as the $1,110 Stihl MS 362 at nearly half the price. If you have large hardwoods on your Tennessee property, this is the one.',
  },
];

const quickDecisions = [
  { q: 'Budget under $400?', a: 'Echo CS-490', price: '$350', note: 'Magnesium crankcase + 5yr warranty at the lowest price' },
  { q: 'Best bang for the buck?', a: 'Echo CS-590 Timber Wolf', price: '$480', note: '#1 rated gas saw, pro build, massive fuel tank' },
  { q: 'Buy it for life, 50cc?', a: 'Stihl MS 261 C-M', price: '$760', note: 'M-Tronic, magnesium, best power-to-weight' },
  { q: 'Buy it for life, 60cc?', a: 'Stihl MS 362 C-M', price: '$1,110', note: 'The ultimate — 4.8 HP, 25" bar, M-Tronic' },
  { q: 'Husqvarna fan?', a: 'Husqvarna 545 Mark II', price: '$650', note: 'Pro-grade 550XP build at a lower price' },
  { q: 'Biggest bar possible?', a: 'Echo CS-620P', price: '$580', note: 'Handles up to 27" bar, 4.4 HP' },
];

const purchaseOptions = [
  {
    label: 'Option A: The BIFL Premium',
    total: '$760',
    items: ['Stihl MS 261 C-M ($760)', '+ Extra chain ($25)', '+ Stihl filing kit ($20)'],
    note: 'The saw you\'ll hand down to your kids. M-Tronic means zero carburetor fiddling. Best power-to-weight in 50cc.',
  },
  {
    label: 'Option B: Best Value Powerhouse',
    total: '$530',
    items: ['Echo CS-590 Timber Wolf ($480)', '+ Extra chain ($20)', '+ Filing guide ($15)', '+ Bar oil ($15)'],
    note: 'Pro-grade magnesium build at a farm & ranch price. 5-year warranty. TechGearLab\'s #1 gas saw.',
  },
  {
    label: 'Option C: Two-Saw Strategy',
    total: '$830',
    items: ['Echo CS-490 for limbing/light work ($350)', '+ Echo CS-590 for heavy cutting ($480)'],
    note: 'Light saw for daily property work + heavy saw for storm cleanup and firewood. Same brand = shared knowledge.',
  },
  {
    label: 'Option D: Budget Entry',
    total: '$400',
    items: ['Echo CS-490 ($350)', '+ Extra chain ($20)', '+ Filing guide ($15)', '+ Bar oil ($15)'],
    note: 'Magnesium crankcase and 5-year warranty at the lowest price. Upgrade to a bigger saw later if needed.',
  },
];

const thinkTwice = [
  {
    name: 'Stihl MS 271 Farm Boss',
    reason: 'Worst power-to-weight ratio in the comparison. Polymer crankcase. The MS 261 is lighter AND more powerful for $260 more. The Echo CS-590 is more powerful with a magnesium case for $20 less.',
  },
  {
    name: 'Husqvarna 455 Rancher',
    reason: 'Heavy at 12.8 lbs with only 3.5 HP. Polymer crankcase. The Husqvarna 545 Mark II gives you a magnesium pro saw at only $190 more.',
  },
  {
    name: 'Husqvarna 460 Rancher',
    reason: 'Only 3.6 HP from 60cc — poor power extraction. The Echo CS-590 delivers 4.0 HP from 59.8cc at $50 less with a magnesium crankcase.',
  },
];

const Recommendations = ({ onProductSelect }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Recommendations</h2>
      <p className="text-gray-500 text-sm mb-6">Curated picks based on your buy-it-for-life, gas-powered, Tennessee property owner profile</p>

      <InsightCallout variant="recommendation" title="Bottom Line: For Your Situation">
        You're a buy-it-for-life guy with storm cleanup to do NOW and ongoing property maintenance ahead. The <strong>Stihl MS 261 C-M ($760)</strong> is the perfect match — pro-grade magnesium build, M-Tronic auto-tuning, best power-to-weight in 50cc, and it'll last 20+ years. If you want to save money without sacrificing build quality, the <strong>Echo CS-590 ($480)</strong> is the best value in gas chainsaws, period.
      </InsightCallout>

      {/* Award Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {awards.map((award, i) => {
          const product = products.find(p => p.id === award.productId);
          if (!product) return null;
          const Icon = award.icon;
          return (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors cursor-pointer"
              onClick={() => onProductSelect(award.productId)}>
              <div className={`bg-gradient-to-r ${award.gradient} px-4 py-2 flex items-center gap-2`}>
                <Icon className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">{award.title}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND_COLORS[product.brand] }} />
                    <span className="font-semibold text-gray-100">{product.name}</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">${product.price}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">{product.displacement_cc}cc</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">{product.power_hp} HP</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">{product.weight_lbs} lbs</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${product.crankcase === 'Magnesium' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>{product.crankcase}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">{product.warranty_years}yr warranty</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{award.reason}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Decision Guide */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Decision Guide</h3>
        <div className="space-y-3">
          {quickDecisions.map((qd, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-gray-800/50 last:border-0">
              <span className="text-sm font-medium text-gray-400 sm:w-48 flex-shrink-0">{qd.q}</span>
              <span className="text-sm font-semibold text-orange-400 sm:w-48 flex-shrink-0">{qd.a}</span>
              <span className="text-sm font-bold text-emerald-400 sm:w-16 flex-shrink-0">{qd.price}</span>
              <span className="text-xs text-gray-500">{qd.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Tier Purchase Options */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Purchase Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseOptions.map((opt, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-200">{opt.label}</span>
                <span className="text-lg font-bold text-emerald-400">{opt.total}</span>
              </div>
              <ul className="space-y-1 mb-3">
                {opt.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-400">• {item}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 italic">{opt.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Think Twice */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Think Twice Before Buying</h3>
        <p className="text-sm text-gray-500 mb-4">These saws aren't bad — but better options exist at similar or lower prices.</p>
        <div className="space-y-4">
          {thinkTwice.map((item, i) => (
            <div key={i} className="bg-red-950/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-red-400 mb-1">{item.name}</p>
              <p className="text-sm text-gray-400">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
