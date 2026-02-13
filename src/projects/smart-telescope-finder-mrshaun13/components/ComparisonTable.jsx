import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Check, X, ArrowUpDown } from 'lucide-react';
import { products, BRAND_COLORS } from '../data/products';

const ComparisonTable = ({ onSelectProduct }) => {
  const [sortKey, setSortKey] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [filterTier, setFilterTier] = useState('All');
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterTerrestrial, setFilterTerrestrial] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const tiers = ['All', ...new Set(products.map(p => p.tier))];
  const brands = ['All', ...new Set(products.map(p => p.brand))];

  const sorted = useMemo(() => {
    let filtered = [...products];
    if (filterTier !== 'All') filtered = filtered.filter(p => p.tier === filterTier);
    if (filterBrand !== 'All') filtered = filtered.filter(p => p.brand === filterBrand);
    if (filterTerrestrial) filtered = filtered.filter(p => p.terrestrial_viewing);
    filtered.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return filtered;
  }, [sortKey, sortDir, filterTier, filterBrand, filterTerrestrial]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortHeader = ({ label, field, className = '' }) => (
    <th
      className={`px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white select-none ${className}`}
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3" />
        {sortKey === field && <span className="text-cyan-400">{sortDir === 'asc' ? '↑' : '↓'}</span>}
      </div>
    </th>
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Spec Comparison</h2>
        <p className="text-gray-400 mt-1">Click any column to sort. Click a row to expand details.</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filterTier}
          onChange={e => setFilterTier(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-cyan-500 focus:border-cyan-500"
        >
          {tiers.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tiers' : t}</option>)}
        </select>
        <select
          value={filterBrand}
          onChange={e => setFilterBrand(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-cyan-500 focus:border-cyan-500"
        >
          {brands.map(b => <option key={b} value={b}>{b === 'All' ? 'All Brands' : b}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={filterTerrestrial}
            onChange={e => setFilterTerrestrial(e.target.checked)}
            className="rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500"
          />
          Terrestrial only
        </label>
        <span className="text-xs text-gray-500 ml-auto">{sorted.length} models shown</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800/80">
            <tr>
              <SortHeader label="Model" field="name" className="sticky left-0 bg-gray-800/80 z-10" />
              <SortHeader label="Brand" field="brand" />
              <SortHeader label="Tier" field="tier" />
              <SortHeader label="Price" field="price" />
              <SortHeader label="Aperture" field="aperture_mm" />
              <SortHeader label="Focal" field="focal_length_mm" />
              <SortHeader label="MP" field="resolution_mp" />
              <SortHeader label="Weight" field="weight_lbs" />
              <SortHeader label="Battery" field="battery_life_hrs" />
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Terrestrial</th>
              <SortHeader label="$/mm" field="pricePerAperture" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sorted.map(p => (
              <React.Fragment key={p.id}>
                <tr
                  className={`hover:bg-gray-800/60 cursor-pointer transition-colors ${expandedId === p.id ? 'bg-gray-800/40' : ''}`}
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                >
                  <td className="px-3 py-3 font-medium text-white sticky left-0 bg-gray-900/90 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: BRAND_COLORS[p.brand] }} />
                      {p.name}
                      {expandedId === p.id ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-gray-300">{p.brand}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.tier === 'Budget' ? 'bg-gray-700 text-gray-300' :
                      p.tier === 'Mid-Range' ? 'bg-amber-900/50 text-amber-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>{p.tier}</span>
                  </td>
                  <td className="px-3 py-3 text-emerald-400 font-medium">${p.price.toLocaleString()}</td>
                  <td className="px-3 py-3 text-gray-300">{p.aperture_mm}mm</td>
                  <td className="px-3 py-3 text-gray-300">{p.focal_length_mm}mm</td>
                  <td className="px-3 py-3 text-gray-300">{p.resolution_mp}</td>
                  <td className="px-3 py-3 text-gray-300">{p.weight_lbs} lbs</td>
                  <td className="px-3 py-3 text-gray-300">{p.battery_life_hrs}h</td>
                  <td className="px-3 py-3">
                    {p.terrestrial_viewing
                      ? <Check className="w-4 h-4 text-emerald-400" />
                      : <X className="w-4 h-4 text-red-400" />}
                  </td>
                  <td className="px-3 py-3 text-gray-300">${p.pricePerAperture.toFixed(0)}</td>
                </tr>
                {expandedId === p.id && (
                  <tr className="bg-gray-800/30">
                    <td colSpan={11} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Best For</p>
                          <p className="text-sm text-gray-300">{p.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Pros</p>
                          <p className="text-sm text-emerald-300">{p.prosText}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Cons</p>
                          <p className="text-sm text-red-300">{p.consText}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <p className="text-xs text-gray-400">
                          Sensor: <span className="text-gray-300">{p.sensor}</span> · FOV: <span className="text-gray-300">{p.fov_deg}°</span> · Storage: <span className="text-gray-300">{p.storage_gb}GB</span>
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectProduct?.(p.id); }}
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          Full Details <ExternalLink className="w-3 h-3" />
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
};

export default ComparisonTable;
