import React, { useState } from 'react';
import { milestones, ERAS } from '../data/limelightData';

const CATEGORY_COLORS = {
  Company: '#06b6d4',
  Financial: '#10b981',
  Legal: '#f59e0b',
  Client: '#8b5cf6',
  Acquisition: '#ec4899',
};

export default function Timeline() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...Object.keys(CATEGORY_COLORS)];

  const filtered = filter === 'all'
    ? milestones
    : milestones.filter(m => m.category === filter);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Major Events Timeline</h2>
        <p className="text-slate-400">{milestones.length} key milestones across 23 years</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === cat
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat === 'all' ? `All (${milestones.length})` : `${cat} (${milestones.filter(m => m.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />
        <div className="space-y-4">
          {filtered.map((m, i) => {
            const color = CATEGORY_COLORS[m.category] || '#64748b';
            const eraEntry = Object.entries(ERAS).find(([, era]) => {
              const [start, end] = era.years.split('-').map(Number);
              return m.year >= start && m.year <= end;
            });
            const eraColor = eraEntry ? eraEntry[1].color : '#64748b';

            return (
              <div key={i} className="relative pl-14">
                {/* Dot */}
                <div
                  className="absolute left-4 top-3 w-5 h-5 rounded-full border-2 border-slate-900 z-10"
                  style={{ backgroundColor: color }}
                />
                {/* Card */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-slate-500 text-xs font-mono">
                      {m.year}{m.month ? `-${String(m.month).padStart(2, '0')}` : ''}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {m.category}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm">{m.event}</p>
                  {m.detail && (
                    <p className="text-slate-400 text-xs mt-1">{m.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
