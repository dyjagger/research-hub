import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown, ExternalLink, Check, X } from 'lucide-react';
import { products, BRAND_COLORS, TIER_COLORS, SHELL_COLORS } from '../data/products';
import InsightCallout from './InsightCallout';

const ComparisonTable = ({ onSelectProduct }) => {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);
  const [filterTier, setFilterTier] = useState('All');
  const [filterShell, setFilterShell] = useState('All');

  const tiers = ['All', ...new Set(products.map(p => p.tier))];
  const shells = ['All', ...new Set(products.map(p => p.shellType))];

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (filterTier !== 'All') list = list.filter(p => p.tier === filterTier);
    if (filterShell !== 'All') list = list.filter(p => p.shellType === filterShell);
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return list;
  }, [sortKey, sortDir, filterTier, filterShell]);

  const SortHeader = ({ label, dataKey, className = '' }) => (
    <th className={`px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors ${className}`} onClick={() => handleSort(dataKey)}>
      <div className="flex items-center gap-1">
        {label}
        {sortKey === dataKey ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Rooftop Tent Comparison</h2>
        <p className="text-gray-400 text-sm">Head-to-head specs for all {products.length} rooftop tents — click any row to expand details</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">Tier:</span>
          {tiers.map(t => (
            <button key={t} onClick={() => setFilterTier(t)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTier === t ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">Shell:</span>
          {shells.map(s => (
            <button key={s} onClick={() => setFilterShell(s)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterShell === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700/50">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80">
            <tr>
              <SortHeader label="Tent" dataKey="name" className="sticky left-0 bg-gray-800/80 z-10 min-w-[180px]" />
              <SortHeader label="Tier" dataKey="tier" />
              <SortHeader label="Shell" dataKey="shellType" />
              <SortHeader label="Price" dataKey="price" />
              <SortHeader label="Weight" dataKey="weight_lbs" />
              <SortHeader label="Sleep Area" dataKey="sleepArea_sqft" />
              <SortHeader label="Setup" dataKey="setupTime_min" />
              <SortHeader label="Height" dataKey="peakHeight_in" />
              <SortHeader label="Closed" dataKey="closedHeight_in" />
              <SortHeader label="Seasons" dataKey="seasons" />
              <SortHeader label="$/sqft" dataKey="pricePerSqft" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(p => (
              <React.Fragment key={p.id}>
                <tr className="hover:bg-gray-800/40 cursor-pointer transition-colors" onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                  <td className="px-3 py-3 sticky left-0 bg-gray-950/90 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] || '#6b7280' }} />
                      <div>
                        <p className="text-white font-medium text-sm">{p.name}</p>
                        <p className="text-gray-500 text-xs">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${TIER_COLORS[p.tier.toLowerCase()]}20`, color: TIER_COLORS[p.tier.toLowerCase()] }}>{p.tier}</span></td>
                  <td className="px-3 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${SHELL_COLORS[p.shellType.toLowerCase()]}20`, color: SHELL_COLORS[p.shellType.toLowerCase()] }}>{p.shellType}</span></td>
                  <td className="px-3 py-3 text-emerald-400 font-medium">${p.price.toLocaleString()}</td>
                  <td className="px-3 py-3 text-gray-300">{p.weight_lbs} lbs</td>
                  <td className="px-3 py-3 text-gray-300">{p.sleepArea_sqft} ft²</td>
                  <td className="px-3 py-3 text-gray-300">{p.setupTime_min < 1 ? `${p.setupTime_min * 60}s` : `${p.setupTime_min}m`}</td>
                  <td className="px-3 py-3 text-gray-300">{p.peakHeight_in}"</td>
                  <td className="px-3 py-3 text-gray-300">{p.closedHeight_in}"</td>
                  <td className="px-3 py-3 text-gray-300">{p.seasons}-season</td>
                  <td className="px-3 py-3 text-gray-300">${p.pricePerSqft.toFixed(0)}</td>
                </tr>
                {expandedId === p.id && (
                  <tr>
                    <td colSpan={11} className="px-4 py-4 bg-gray-800/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-emerald-400 text-xs font-semibold uppercase mb-1">Best For</p>
                          <p className="text-gray-300 text-sm">{p.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-green-400 text-xs font-semibold uppercase mb-1">Pros</p>
                          <p className="text-gray-300 text-sm">{p.prosText}</p>
                        </div>
                        <div>
                          <p className="text-red-400 text-xs font-semibold uppercase mb-1">Cons</p>
                          <p className="text-gray-300 text-sm">{p.consText}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Mattress: {p.mattressThickness_in}" thick</span>
                        <span>Fabric: {p.fabricWeight_d}D</span>
                        <span>Capacity: {p.staticCapacity_lbs} lbs static</span>
                        <span>Windows: {p.windows}</span>
                        <span>Warranty: {p.warrantyYears}yr</span>
                        <span>Made in: {p.madeIn}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-3 italic">{p.verdict}</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <InsightCallout variant="info" title="How to Read This Table">
        <strong>$/sqft</strong> = price per square foot of sleeping area — lower is better value. <strong>Closed height</strong> matters for garage clearance and aerodynamics. <strong>Setup time</strong> ranges from 30 seconds (hydraulic hardshells) to 5 minutes (manual softshells). Click any row to see pros, cons, and the full verdict.
      </InsightCallout>
    </div>
  );
};

export default ComparisonTable;
