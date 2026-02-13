import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown, ExternalLink } from 'lucide-react';
import { products, BRAND_COLORS, TIER_COLORS } from '../data/products';

const ComparisonTable = ({ onProductSelect }) => {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterTier, setFilterTier] = useState('All');

  const brands = ['All', ...new Set(products.map(p => p.brand))];
  const tiers = ['All', ...new Set(products.map(p => p.tier))];

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (filterBrand !== 'All') list = list.filter(p => p.brand === filterBrand);
    if (filterTier !== 'All') list = list.filter(p => p.tier === filterTier);
    list.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return list;
  }, [filterBrand, filterTier, sortKey, sortDir]);

  const columns = [
    { key: 'name', label: 'Model', sortable: true },
    { key: 'tier', label: 'Tier', sortable: true },
    { key: 'price', label: 'Price', sortable: true, fmt: v => `$${v}` },
    { key: 'displacement_cc', label: 'cc', sortable: true, fmt: v => `${v}` },
    { key: 'power_hp', label: 'HP', sortable: true, fmt: v => `${v}` },
    { key: 'weight_lbs', label: 'Weight', sortable: true, fmt: v => `${v} lbs` },
    { key: 'powerToWeight', label: 'HP/lb', sortable: true, fmt: v => v?.toFixed(3) },
    { key: 'bar_default', label: 'Bar', sortable: true, fmt: v => `${v}"` },
    { key: 'crankcase', label: 'Crankcase', sortable: true },
    { key: 'warranty_years', label: 'Warranty', sortable: true, fmt: v => `${v}yr` },
  ];

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 text-gray-600" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-orange-400" /> : <ChevronDown className="w-3 h-3 text-orange-400" />;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-100 mb-1">Head-to-Head Comparison</h2>
      <p className="text-gray-500 text-sm mb-4">Click any column header to sort. Click a row to expand details.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Brand:</span>
          {brands.map(b => (
            <button key={b} onClick={() => setFilterBrand(b)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterBrand === b ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'}`}>
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Tier:</span>
          {tiers.map(t => (
            <button key={t} onClick={() => setFilterTier(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTier === t ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'}`}>
              {t}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-600 self-center ml-2">{filtered.length} models</span>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {columns.map(col => (
                  <th key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:text-gray-300' : ''}`}>
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && <SortIcon col={col.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <React.Fragment key={p.id}>
                  <tr
                    onClick={() => setExpandedRow(expandedRow === p.id ? null : p.id)}
                    className={`border-b border-gray-800/50 cursor-pointer transition-colors ${expandedRow === p.id ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'}`}>
                    {columns.map(col => {
                      let val = p[col.key];
                      let display = col.fmt ? col.fmt(val) : val;
                      if (col.key === 'name') {
                        return (
                          <td key={col.key} className="px-3 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                              <span className="font-medium text-gray-200">{display}</span>
                            </div>
                          </td>
                        );
                      }
                      if (col.key === 'tier') {
                        return (
                          <td key={col.key} className="px-3 py-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: TIER_COLORS[val] + '20', color: TIER_COLORS[val] }}>{val}</span>
                          </td>
                        );
                      }
                      if (col.key === 'crankcase') {
                        return (
                          <td key={col.key} className="px-3 py-3 whitespace-nowrap">
                            <span className={`text-xs font-medium ${val === 'Magnesium' ? 'text-emerald-400' : 'text-gray-500'}`}>{val}</span>
                          </td>
                        );
                      }
                      if (col.key === 'powerToWeight') {
                        const ptw = val;
                        return (
                          <td key={col.key} className="px-3 py-3 whitespace-nowrap">
                            <span className={`font-medium ${ptw >= 0.37 ? 'text-emerald-400' : ptw >= 0.3 ? 'text-amber-400' : 'text-red-400'}`}>{display}</span>
                          </td>
                        );
                      }
                      return (
                        <td key={col.key} className="px-3 py-3 whitespace-nowrap text-gray-300">{display}</td>
                      );
                    })}
                  </tr>
                  {expandedRow === p.id && (
                    <tr className="bg-gray-800/30">
                      <td colSpan={columns.length} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase mb-1">Best For</p>
                            <p className="text-sm text-gray-300">{p.bestFor}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase mb-1">Pros</p>
                            <p className="text-sm text-gray-300">{p.prosText}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase mb-1">Cons</p>
                            <p className="text-sm text-gray-300">{p.consText}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onProductSelect(p.id); }}
                          className="mt-3 flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors">
                          View full details <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
