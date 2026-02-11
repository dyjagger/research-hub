import React, { useState, useMemo } from 'react';
import { Search, Star, Clock, Globe, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { restaurants, COLORS } from '../data/researchData';

const getTagColor = (tag) => {
  if (tag.includes('Vegan + GF')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  if (tag.includes('100% Vegan')) return 'bg-green-500/20 text-green-300 border-green-500/30';
  if (tag.includes('Vegan')) return 'bg-green-500/10 text-green-400 border-green-500/20';
  if (tag.includes('Dedicated GF')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  if (tag.includes('GF')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  if (tag.includes('Temple')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

const RestaurantDirectory = () => {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [dietFilter, setDietFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [expandedId, setExpandedId] = useState(null);

  const cities = ['All', ...new Set(restaurants.map(r => r.city))];
  const dietOptions = ['All', 'Vegan', 'Gluten-Free', 'Both (V+GF)', 'GF Options'];

  const filtered = useMemo(() => {
    let result = restaurants.filter(r => {
      const matchSearch = search === '' ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
        r.area.toLowerCase().includes(search.toLowerCase());
      const matchCity = cityFilter === 'All' || r.city === cityFilter;
      let matchDiet = true;
      if (dietFilter === 'Vegan') matchDiet = r.isVegan;
      if (dietFilter === 'Gluten-Free') matchDiet = r.isGF;
      if (dietFilter === 'Both (V+GF)') matchDiet = r.isVegan && r.isGF;
      if (dietFilter === 'GF Options') matchDiet = r.hasGFOptions;
      return matchSearch && matchCity && matchDiet;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.priceRange.length - b.priceRange.length;
      return 0;
    });

    return result;
  }, [search, cityFilter, dietFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Restaurant Directory</h2>
        <p className="text-gray-400 mt-1">Search, filter, and explore all {restaurants.length} restaurants</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, cuisine, or area..."
            className="w-full bg-gray-900/60 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-green-500/50" />
        </div>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">City</label>
            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
              className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none">
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dietary</label>
            <select value={dietFilter} onChange={e => setDietFilter(e.target.value)}
              className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none">
              {dietOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Sort By</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-gray-900/60 border border-gray-700/50 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none">
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low-High)</option>
            </select>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Filter size={14} className="text-gray-500" />
            <span className="text-xs text-gray-500">{filtered.length} results</span>
          </div>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="space-y-2">
        {filtered.map(r => (
          <div key={r.id} className="bg-gray-800/40 rounded-xl border border-gray-700/30 overflow-hidden hover:border-gray-600/50 transition-all">
            <div className="p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-100">{r.name}</h3>
                    <div className="flex gap-1">
                      {r.tags.map((tag, i) => (
                        <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getTagColor(tag)}`}>{tag}</span>
                      ))}
                      {r.hasGFOptions && !r.tags.some(t => t.includes('GF')) && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20">GF Options</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{r.area}, {r.city} · {r.cuisine} · {r.priceYen}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-400">{r.rating}</span>
                    <span className="text-xs text-gray-600">({r.reviewCount})</span>
                  </div>
                  <div className="flex gap-1">
                    {r.bookAhead && <Clock size={12} className="text-red-400" title="Book ahead" />}
                    {r.englishMenu && <Globe size={12} className="text-cyan-400" title="English menu" />}
                  </div>
                  {expandedId === r.id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                </div>
              </div>
            </div>

            {expandedId === r.id && (
              <div className="px-4 pb-4 pt-0 border-t border-gray-700/30 space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">{r.description}</p>
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-1">Must Try</p>
                  <p className="text-sm text-gray-300">{r.mustTry}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-1">Reviews</p>
                  {r.reviews.map((rev, i) => (
                    <p key={i} className="text-xs text-gray-500 italic mb-1">{rev}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {r.bookAhead && <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={10} /> Reservation Required</span>}
                  {r.englishMenu && <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Globe size={10} /> English Menu</span>}
                  {r.englishStaff && <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Globe size={10} /> English-Speaking Staff</span>}
                </div>
                <p className="text-xs text-gray-600">Source: {r.source}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No restaurants match your filters</p>
          <p className="text-xs mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDirectory;
