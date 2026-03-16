import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, DollarSign, Star, Shield, Heart, ExternalLink, Clock } from 'lucide-react';
import { activities, categories } from '../data/researchData';

const BARRIER_LABELS = { skill: 'Skill Needed', fitness: 'Fitness Level', equipment: 'Equipment', cost: 'Cost Barrier' };

function BarrierDots({ value, max = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < value ? 'bg-teal-400' : 'bg-gray-700'}`} />
      ))}
    </div>
  );
}

function RiskBadge({ level }) {
  const colors = {
    'Very Low': 'bg-emerald-500/20 text-emerald-400',
    'Low': 'bg-green-500/20 text-green-400',
    'Moderate': 'bg-amber-500/20 text-amber-400',
    'High': 'bg-red-500/20 text-red-400',
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[level] || 'bg-gray-700 text-gray-400'}`}>{level}</span>;
}

function ActivityCard({ activity }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categories.find(c => c.id === activity.category);

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start gap-4 text-left hover:bg-gray-800/80 transition-colors cursor-pointer"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat?.color }} />
            <span className="text-xs text-gray-500">{cat?.label}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
          <p className="text-sm text-teal-400 italic mt-0.5">{activity.tagline}</p>
          {/* Quick stats row */}
          <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-gray-300">Fun: <span className="text-white font-semibold">{activity.funScore}/10</span></span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-300">${activity.monthlyCost.min}–${activity.monthlyCost.max}/mo</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs text-gray-300">Injury: </span>
              <RiskBadge level={activity.injuryRisk} />
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs text-gray-300">{activity.caloriesPerHour} cal/hr</span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-700/50 pt-4">
          <p className="text-sm text-gray-300">{activity.description}</p>

          {/* Barrier to Entry */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-400" /> Barrier to Entry
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(activity.barrier).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between bg-gray-900/50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-400">{BARRIER_LABELS[key]}</span>
                  <BarrierDots value={val} />
                </div>
              ))}
            </div>
          </div>

          {/* Costs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Costs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-gray-900/50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500">Startup (one-time)</div>
                <div className="text-sm text-white font-semibold">${activity.startupCost.min}–${activity.startupCost.max}</div>
                <div className="text-xs text-gray-400 mt-0.5">{activity.startupCost.note}</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-500">Monthly (ongoing)</div>
                <div className="text-sm text-white font-semibold">${activity.monthlyCost.min}–${activity.monthlyCost.max}/mo</div>
                <div className="text-xs text-gray-400 mt-0.5">{activity.monthlyCost.note}</div>
              </div>
            </div>
          </div>

          {/* Health & Fitness */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400" /> Health & Fitness
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-gray-900/50 text-xs"><span className="text-gray-500">Cardio:</span> <span className="text-white">{activity.cardio}</span></span>
              <span className="px-2 py-1 rounded bg-gray-900/50 text-xs"><span className="text-gray-500">Strength:</span> <span className="text-white">{activity.strength}</span></span>
              <span className="px-2 py-1 rounded bg-gray-900/50 text-xs"><span className="text-gray-500">Flexibility:</span> <span className="text-white">{activity.flexibility}</span></span>
              <span className="px-2 py-1 rounded bg-gray-900/50 text-xs"><span className="text-gray-500">Calories/hr:</span> <span className="text-white">{activity.caloriesPerHour}</span></span>
              {activity.jointFriendly && (
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-xs text-emerald-400 font-medium">Joint-Friendly</span>
              )}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-400" /> Locations
            </h4>
            <div className="space-y-2">
              {activity.locations.map((loc, i) => (
                <div key={i} className="bg-gray-900/50 rounded-lg px-3 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-semibold text-white">{loc.name}</div>
                    <span className="text-xs text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">{loc.city}</span>
                  </div>
                  {loc.address && <div className="text-xs text-gray-400">{loc.address}</div>}
                  {loc.hours && <div className="text-xs text-gray-500 mt-1"><span className="text-gray-400">Hours:</span> {loc.hours}</div>}
                  {loc.pricing && <div className="text-xs text-gray-500 mt-0.5"><span className="text-emerald-400">$</span> {loc.pricing}</div>}
                  {loc.notes && <div className="text-xs text-gray-400 mt-1 italic">{loc.notes}</div>}
                  {loc.website && (
                    <a href={loc.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 mt-1.5">
                      <ExternalLink className="w-3 h-3" /> Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">How to Get Started</h4>
            <ol className="space-y-1.5">
              {activity.gettingStarted.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="text-teal-400 font-bold text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ActivityExplorer() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('fun');

  const filtered = filterCategory === 'all' ? activities : activities.filter(a => a.category === filterCategory);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'fun') return b.funScore - a.funScore;
    if (sortBy === 'cost') return a.monthlyCost.max - b.monthlyCost.max;
    if (sortBy === 'social') return b.socialScore - a.socialScore;
    if (sortBy === 'calories') return b.caloriesPerHour - a.caloriesPerHour;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Activity Explorer</h2>
        <p className="text-gray-400">Click any activity to expand full details — costs, locations, how to start</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Category:</span>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value="fun">Fun Score</option>
            <option value="cost">Lowest Cost</option>
            <option value="social">Most Social</option>
            <option value="calories">Calories Burned</option>
          </select>
        </div>
        <span className="text-xs text-gray-500 ml-auto">{sorted.length} activities</span>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {sorted.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
