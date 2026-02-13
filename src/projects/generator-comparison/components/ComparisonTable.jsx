import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ArrowUpDown } from 'lucide-react';
import { products, BRAND_COLORS, TIER_COLORS, FUEL_TYPE_COLORS } from '../data/products';

const columns = [
  { key: 'name', label: 'Model', sortable: true },
  { key: 'brand', label: 'Brand', sortable: true },
  { key: 'fuelType', label: 'Fuel', sortable: true },
  { key: 'tier', label: 'Tier', sortable: true },
  { key: 'price', label: 'Price', sortable: true, format: v => `$${v.toLocaleString()}` },
  { key: 'runningWattsGas', label: 'Gas (Run)', sortable: true, format: v => v ? `${(v/1000).toFixed(1)}kW` : '—' },
  { key: 'runningWattsNG', label: 'NG (Run)', sortable: true, format: v => v ? `${(v/1000).toFixed(1)}kW` : 'N/A' },
  { key: 'noiseDB', label: 'Noise', sortable: true, format: v => `${v} dB` },
  { key: 'weightLbs', label: 'Weight', sortable: true, format: v => `${v} lbs` },
  { key: 'thd', label: 'THD', sortable: true, format: v => `<${v}%` },
  { key: 'runtimeHrs50', label: 'Runtime', sortable: true, format: v => `${v} hrs` },
  { key: 'warranty_years', label: 'Warranty', sortable: true, format: v => `${v} yr` },
];

export default function ComparisonTable({ onProductSelect }) {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterFuel, setFilterFuel] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), []);
  const tiers = useMemo(() => [...new Set(products.map(p => p.tier))].sort(), []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (filterFuel !== 'all') result = result.filter(p => p.fuelType === filterFuel);
    if (filterTier !== 'all') result = result.filter(p => p.tier === filterTier);
    if (filterBrand !== 'all') result = result.filter(p => p.brand === filterBrand);
    return result;
  }, [filterFuel, filterTier, filterBrand]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortKey], bVal = b[sortKey];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      if (typeof aVal === 'string') return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filtered, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Head-to-Head Comparison</h2>
      <p className="text-gray-400 mb-4">Click any row to expand details. Click column headers to sort.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={filterFuel} onChange={e => setFilterFuel(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5">
          <option value="all">All Fuel Types</option>
          <option value="Tri-Fuel">Tri-Fuel Only</option>
          <option value="Dual-Fuel">Dual-Fuel Only</option>
        </select>
        <select value={filterTier} onChange={e => setFilterTier(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5">
          <option value="all">All Tiers</option>
          {tiers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterBrand} onChange={e => setFilterBrand(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-1.5">
          <option value="all">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <span className="text-xs text-gray-500 self-center ml-2">{sorted.length} of {products.length} models</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900">
              {columns.map(col => (
                <th key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:text-white' : ''}`}>
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                    {col.sortable && sortKey !== col.key && <ArrowUpDown className="w-3 h-3 opacity-30" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <React.Fragment key={p.id}>
                <tr
                  onClick={() => setExpandedRow(expandedRow === p.id ? null : p.id)}
                  className={`border-t border-gray-800 cursor-pointer transition-colors ${expandedRow === p.id ? 'bg-gray-800/50' : 'hover:bg-gray-900/50'}`}>
                  {columns.map(col => {
                    const val = p[col.key];
                    const display = col.format ? col.format(val) : val;
                    let extra = '';
                    if (col.key === 'name') {
                      return (
                        <td key={col.key} className="px-3 py-2.5 font-medium text-white whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                            {display}
                          </div>
                        </td>
                      );
                    }
                    if (col.key === 'fuelType') {
                      return (
                        <td key={col.key} className="px-3 py-2.5 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.fuelType === 'Tri-Fuel' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {display}
                          </span>
                        </td>
                      );
                    }
                    if (col.key === 'tier') {
                      return (
                        <td key={col.key} className="px-3 py-2.5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${TIER_COLORS[p.tier]}20`, color: TIER_COLORS[p.tier] }}>
                            {display}
                          </span>
                        </td>
                      );
                    }
                    if (col.key === 'runningWattsNG' && val === null) {
                      return <td key={col.key} className="px-3 py-2.5 text-gray-600 whitespace-nowrap">N/A</td>;
                    }
                    if (col.key === 'thd') {
                      const color = val <= 5 ? 'text-emerald-400' : val <= 12 ? 'text-amber-400' : 'text-red-400';
                      return <td key={col.key} className={`px-3 py-2.5 whitespace-nowrap ${color}`}>{display}</td>;
                    }
                    return <td key={col.key} className="px-3 py-2.5 text-gray-300 whitespace-nowrap">{display}</td>;
                  })}
                </tr>
                {expandedRow === p.id && (
                  <tr className="bg-gray-800/30">
                    <td colSpan={columns.length} className="px-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Best For</p>
                          <p className="text-sm text-gray-300">{p.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Pros</p>
                          <p className="text-sm text-emerald-400/80">{p.prosText}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Cons</p>
                          <p className="text-sm text-red-400/80">{p.consText}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); onProductSelect(p.id); }}
                          className="px-3 py-1.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Full Details
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
