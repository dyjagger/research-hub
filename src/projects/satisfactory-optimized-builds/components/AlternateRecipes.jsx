import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { alternateRecipes, altRecipeImpact, recipePairings } from '../data/researchData';

const TIER_COLORS = {
  S: '#f59e0b',
  A: '#22c55e',
  B: '#3b82f6',
  C: '#a78bfa',
  D: '#f97316',
  F: '#ef4444',
};

const TIER_LABELS = {
  S: 'Most Recommended',
  A: 'Very Highly Recommended',
  B: 'Highly Recommended',
  C: 'Sometimes Recommended',
  D: 'Rarely Recommended',
  F: 'Not Recommended',
};

const CATEGORY_COLORS = {
  Oil: '#1e1b4b',
  Power: '#fbbf24',
  Aluminum: '#dc2626',
  Frames: '#6366f1',
  Plates: '#94a3b8',
  Motors: '#f97316',
  Electronics: '#06b6d4',
  Ingots: '#a78bfa',
  Fasteners: '#64748b',
  Pipes: '#60a5fa',
  Building: '#78716c',
};

export default function AlternateRecipes() {
  const [activeTier, setActiveTier] = useState('all');

  const allRecipes = Object.entries(alternateRecipes).flatMap(([tier, recipes]) =>
    recipes.map((r) => ({ ...r, tier }))
  );

  const filtered = activeTier === 'all' ? allRecipes : allRecipes.filter((r) => r.tier === activeTier);

  const impactData = [
    { metric: 'Power (MW)', without: altRecipeImpact.withoutAlts.power, with: altRecipeImpact.withAlts.power },
    { metric: 'Items/min', without: altRecipeImpact.withoutAlts.itemsPerMin, with: altRecipeImpact.withAlts.itemsPerMin },
    { metric: 'Buildings', without: altRecipeImpact.withoutAlts.buildings, with: altRecipeImpact.withAlts.buildings },
    { metric: 'Raw Resources', without: altRecipeImpact.withoutAlts.rawResources, with: altRecipeImpact.withAlts.rawResources },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Alternate Recipe Rankings</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Rankings based on wrigh516's linear programming optimization model for Satisfactory 1.0.
          Each recipe is scored by its impact on the full production chain when producing Final
          Project Assembly parts — accounting for power, buildings, items moved, and raw resources.
        </p>
      </div>

      <InsightCallout color="amber">
        The S-tier recipes are dominated by oil processing optimizations. Heavy Oil Residue alone
        unlocks the 3:1 oil-to-product ratio that cascades savings through the entire production
        chain. Prioritize Hard Drive hunting for these recipes first.
      </InsightCallout>

      {/* Before/After Comparison */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Before vs After Alternate Recipes</h3>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="metric" tick={{ fill: '#d1d5db', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="without" name="Default Recipes" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Bar dataKey="with" name="Optimized Alts" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tier Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500">Filter:</span>
        <button
          onClick={() => setActiveTier('all')}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTier === 'all'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
          }`}
        >
          All ({allRecipes.length})
        </button>
        {Object.keys(alternateRecipes).map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeTier === tier
                ? 'border'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
            }`}
            style={activeTier === tier ? { backgroundColor: TIER_COLORS[tier] + '20', color: TIER_COLORS[tier], borderColor: TIER_COLORS[tier] + '50' } : {}}
          >
            {tier} ({alternateRecipes[tier].length})
          </button>
        ))}
      </div>

      {/* Recipe Score Chart */}
      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Recipe Scores (Higher = More Impactful)</h3>
        <ResponsiveContainer width="100%" height={Math.max(300, filtered.length * 32)}>
          <BarChart data={filtered} layout="vertical" margin={{ left: 160, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#d1d5db', fontSize: 11 }} width={155} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" name="Score" radius={[0, 4, 4, 0]}>
              {filtered.map((entry, i) => (
                <Cell key={i} fill={TIER_COLORS[entry.tier]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tier Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Tier Breakdown</h3>
        <div className="space-y-4">
          {Object.entries(alternateRecipes).map(([tier, recipes]) => (
            <div key={tier} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-lg font-bold px-3 py-0.5 rounded-lg"
                  style={{ backgroundColor: TIER_COLORS[tier] + '20', color: TIER_COLORS[tier] }}
                >
                  {tier}
                </span>
                <span className="text-sm text-gray-400">{TIER_LABELS[tier]}</span>
                <span className="text-xs text-gray-600">({recipes.length} recipes)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipes.map((r) => (
                  <div key={r.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-800/30">
                    <div>
                      <span className="text-sm text-gray-200 font-medium">{r.name}</span>
                      <span className="text-xs text-gray-500 ml-2 px-1.5 py-0.5 rounded bg-gray-700/50">{r.category}</span>
                    </div>
                    <span className="text-xs text-gray-400">{r.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Pairings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recommended Recipe Pairings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipePairings.map((p) => (
            <div key={p.name} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-white mb-2">{p.name}</h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.recipes.map((r) => (
                  <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {r}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-1">{p.benefit}</p>
              <p className="text-xs text-emerald-400 font-medium">{p.savings}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
