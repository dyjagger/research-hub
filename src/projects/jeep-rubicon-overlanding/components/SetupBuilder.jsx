import React, { useState } from 'react';
import { LayoutGrid, Umbrella, ChefHat, Zap, Package, Shield, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { gearCategories } from '../data/products';
import InsightCallout from './InsightCallout';

const iconMap = { LayoutGrid, Umbrella, ChefHat, Zap, Package, Shield };

const SetupBuilder = () => {
  const [expandedCat, setExpandedCat] = useState('roof-rack');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Complete Setup Builder</h2>
        <p className="text-gray-400 text-sm">Beyond the rooftop tent — every gear category you need for a complete Jeep Rubicon overlanding rig</p>
      </div>

      <InsightCallout variant="recommendation" title="Build Order Recommendation">
        Install in this order: <strong>1) Roof Rack</strong> (foundation for everything) → <strong>2) RTT</strong> (main investment) → <strong>3) Awning</strong> (living space) → <strong>4) Recovery Gear</strong> (safety first) → <strong>5) Power</strong> (enables fridge & devices) → <strong>6) Kitchen</strong> (comfort) → <strong>7) Storage</strong> (organization). Don't try to buy everything at once — build over 3-6 months.
      </InsightCallout>

      <div className="space-y-3">
        {gearCategories.map(cat => {
          const Icon = iconMap[cat.icon] || Package;
          const isExpanded = expandedCat === cat.id;
          return (
            <div key={cat.id} className="bg-gray-800/40 border border-gray-700/50 rounded-xl overflow-hidden">
              <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-800/60 transition-colors" onClick={() => setExpandedCat(isExpanded ? null : cat.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{cat.name}</p>
                    <p className="text-gray-500 text-xs">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{cat.items.length} options</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-5 pb-4 space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-white font-medium text-sm">{item.name}</p>
                            {i === 0 && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">Top Pick</span>}
                          </div>
                          <p className="text-gray-500 text-xs mb-2">{item.bestFor}</p>
                          <p className="text-gray-400 text-xs">{item.notes}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-emerald-400 font-bold">${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1 justify-end">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-amber-400 text-xs">{item.rating}</span>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{item.weight} lbs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <InsightCallout variant="warning" title="Weight Budget Warning">
        The Jeep Wrangler Rubicon JL has a payload capacity of approximately <strong>1,000–1,200 lbs</strong> (varies by configuration). A fully loaded overlanding setup (RTT + rack + gear + passengers) can easily exceed this. Prioritize lightweight options and weigh your complete setup before hitting the trail. A 150 lb RTT + 45 lb rack + 200 lbs of gear + 2 passengers = ~800 lbs minimum.
      </InsightCallout>
    </div>
  );
};

export default SetupBuilder;
