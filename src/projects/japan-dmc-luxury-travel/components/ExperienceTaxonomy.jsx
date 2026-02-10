import React, { useState } from 'react';
import { Sparkles, DollarSign, Lock, Building2 } from 'lucide-react';
import { experienceCategories } from '../data/researchData';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const categoryColors = {
  'Cultural Immersion': '#f43f5e',
  'Culinary': '#f59e0b',
  'Adventure & Nature': '#10b981',
  'VIP Transport & Access': '#8b5cf6',
  'Wellness & Relaxation': '#06b6d4',
  'Art & Design': '#ec4899',
};

const exclusivityColors = {
  'Ultra': '#f43f5e',
  'Very High': '#f59e0b',
  'High': '#8b5cf6',
  'Medium': '#6b7280',
};

export default function ExperienceTaxonomy() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('exclusivity');

  const filteredCategories = activeCategory === 'all'
    ? experienceCategories
    : experienceCategories.filter(c => c.category === activeCategory);

  const exclusivityOrder = { 'Ultra': 0, 'Very High': 1, 'High': 2, 'Medium': 3 };

  const allExperiences = filteredCategories.flatMap(c =>
    c.experiences.map(e => ({ ...e, category: c.category }))
  );

  const sortedExperiences = [...allExperiences].sort((a, b) => {
    if (sortBy === 'exclusivity') return (exclusivityOrder[a.exclusivity] || 4) - (exclusivityOrder[b.exclusivity] || 4);
    return 0;
  });

  const totalExperiences = experienceCategories.reduce((sum, c) => sum + c.experiences.length, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Luxury Experience Taxonomy</h2>
        <p className="text-gray-400 text-sm mt-1">
          {totalExperiences} curated luxury experiences across {experienceCategories.length} categories — with pricing, exclusivity ratings, and recommended DMCs
        </p>
      </div>

      <InsightCallout>
        The experiences that differentiate a good Japan trip from an extraordinary one are those rated "Very High" or "Ultra"
        exclusivity — private geisha dinners, Living National Treasure meetings, helicopter Mt. Fuji tours, and after-hours
        temple access. These require DMCs with years of relationship-building. Motenas Japan and Beauty of Japan lead in
        ultra-exclusive access, while Boutique JTB and InsideJapan Tours offer the broadest range across all categories.
      </InsightCallout>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`text-xs px-3 py-1.5 rounded-full transition-all ${
            activeCategory === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-500 hover:text-gray-300 border border-gray-800'
          }`}
        >
          All Categories ({totalExperiences})
        </button>
        {experienceCategories.map((c) => {
          const color = categoryColors[c.category] || '#6b7280';
          return (
            <button
              key={c.category}
              onClick={() => setActiveCategory(activeCategory === c.category ? 'all' : c.category)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                activeCategory === c.category
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300 border-gray-800 bg-gray-900'
              }`}
              style={activeCategory === c.category ? { backgroundColor: `${color}30`, borderColor: color, color } : {}}
            >
              {c.category} ({c.experiences.length})
            </button>
          );
        })}
      </div>

      {/* Exclusivity Legend */}
      <div className="flex gap-4 items-center">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide">Exclusivity:</span>
        {Object.entries(exclusivityColors).map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5 text-[10px]" style={{ color }}>
            <Lock size={9} />{label}
          </span>
        ))}
      </div>

      {/* Experience Cards */}
      <div className="space-y-3">
        {sortedExperiences.map((exp, i) => {
          const catColor = categoryColors[exp.category] || '#6b7280';
          const excColor = exclusivityColors[exp.exclusivity] || '#6b7280';
          return (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${catColor}20`, color: catColor }}
                    >
                      {exp.category}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                      style={{ backgroundColor: `${excColor}15`, color: excColor }}
                    >
                      <Lock size={8} />{exp.exclusivity}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white">{exp.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <DollarSign size={11} className="text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{exp.priceRange}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[10px] uppercase text-gray-500 mb-1.5 tracking-wide flex items-center gap-1">
                  <Building2 size={9} />Recommended DMCs
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.topDMCs.map((dmc) => (
                    <span key={dmc} className="text-[11px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                      {dmc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Summary Heatmap */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Experience Density by Category & Exclusivity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-gray-500 pb-2 pr-4">Category</th>
                {Object.keys(exclusivityColors).map(level => (
                  <th key={level} className="text-center text-gray-500 pb-2 px-3">{level}</th>
                ))}
                <th className="text-center text-gray-500 pb-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {experienceCategories.map((cat) => {
                const counts = {};
                Object.keys(exclusivityColors).forEach(level => {
                  counts[level] = cat.experiences.filter(e => e.exclusivity === level).length;
                });
                return (
                  <tr key={cat.category} className="border-t border-gray-800">
                    <td className="py-2 pr-4 text-gray-300 font-medium">{cat.category}</td>
                    {Object.keys(exclusivityColors).map(level => {
                      const count = counts[level];
                      const color = exclusivityColors[level];
                      return (
                        <td key={level} className="text-center py-2 px-3">
                          {count > 0 ? (
                            <span
                              className="inline-block w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                              style={{ backgroundColor: `${color}25`, color }}
                            >
                              {count}
                            </span>
                          ) : (
                            <span className="text-gray-700">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="text-center py-2 px-3 text-white font-medium">{cat.experiences.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
