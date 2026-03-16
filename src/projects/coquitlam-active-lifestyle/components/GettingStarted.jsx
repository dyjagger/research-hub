import React, { useState } from 'react';
import { Rocket, ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { activities, categories } from '../data/researchData';

function StepCard({ activity }) {
  const [expanded, setExpanded] = useState(false);
  const cat = categories.find(c => c.id === activity.category);
  const primaryLoc = activity.locations[0];

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-800/80 transition-colors cursor-pointer"
      >
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat?.color }} />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{activity.name}</h4>
          <p className="text-xs text-gray-500">
            {primaryLoc?.name} — {primaryLoc?.city}
            {activity.startupCost.max === 0 ? ' — Free to start' : ` — $${activity.startupCost.min}–$${activity.startupCost.max} to start`}
          </p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-700/50 pt-3">
          {/* Step-by-step */}
          <ol className="space-y-2.5">
            {activity.gettingStarted.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs text-teal-400 font-bold">{i + 1}</span>
                </div>
                <span className="text-sm text-gray-300 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          {/* Quick Reference */}
          <div className="mt-4 bg-gray-900/50 rounded-lg p-3 space-y-2">
            <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Reference</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">First visit cost:</span>
                <span className="text-white ml-1">${activity.startupCost.min}–${activity.startupCost.max}</span>
              </div>
              <div>
                <span className="text-gray-500">Ongoing:</span>
                <span className="text-white ml-1">
                  {activity.monthlyCost.max === 0 ? 'Free' : `$${activity.monthlyCost.min}–$${activity.monthlyCost.max}/mo`}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Where:</span>
                <span className="text-white ml-1">{primaryLoc?.name}</span>
              </div>
              {primaryLoc?.phone && (
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-white ml-1">{primaryLoc.phone}</span>
                </div>
              )}
            </div>
            {primaryLoc?.website && (
              <a href={primaryLoc.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 mt-1">
                <ExternalLink className="w-3 h-3" /> Visit website to book
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GettingStarted() {
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = filterCategory === 'all' ? activities : activities.filter(a => a.category === filterCategory);

  // Sort by barrier (easiest first)
  const sorted = [...filtered].sort((a, b) => {
    const avgA = Object.values(a.barrier).reduce((x, y) => x + y, 0) / 4;
    const avgB = Object.values(b.barrier).reduce((x, y) => x + y, 0) / 4;
    return avgA - avgB;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Getting Started Guide</h2>
        <p className="text-gray-400">Step-by-step instructions for your first visit to each activity</p>
      </div>

      <InsightCallout accent="teal">
        The hardest part of any new activity is <strong>showing up the first time</strong>. Every guide below tells you exactly what to do, what to bring, and what to expect so there are zero surprises. Activities are sorted easiest-to-start first.
      </InsightCallout>

      {/* This Week Starter Pack */}
      <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-teal-300 mb-3 flex items-center gap-2">
          <Rocket className="w-5 h-5" /> This Week Starter Pack
        </h3>
        <p className="text-sm text-gray-300 mb-4">Want to try something this week? Here are 3 things you can do with zero preparation:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Today</span>
            </div>
            <p className="text-xs text-gray-300"><strong>Hike the Coquitlam Crunch</strong> — drive to Lansdowne Dr, park, walk up. No gear needed beyond shoes and water. 45-90 min round trip.</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Tomorrow</span>
            </div>
            <p className="text-xs text-gray-300"><strong>Drop-in pickleball</strong> at Poirier Forum — check the schedule, pay $6.67, borrow a paddle from a regular. Players love helping newcomers.</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-white">This Weekend</span>
            </div>
            <p className="text-xs text-gray-300"><strong>Try rock climbing</strong> at Climb Base5 — walk in, pay ~$45 (pass + rental), get a 10-min orientation, and start climbing. No appointment needed.</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${filterCategory === 'all' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
        >
          All ({activities.length})
        </button>
        {categories.map(cat => {
          const count = activities.filter(a => a.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${filterCategory === cat.id ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'}`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Step-by-step Cards */}
      <div className="space-y-3">
        {sorted.map(activity => (
          <StepCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* General Tips */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Universal First-Timer Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
          <div className="space-y-2">
            <p><span className="text-teal-400 font-semibold">Arrive 15 min early.</span> Gives you time to park, find the entrance, fill out waivers, and not feel rushed.</p>
            <p><span className="text-teal-400 font-semibold">Say "I'm new."</span> Staff and regulars love helping newcomers. Don't pretend you know what you're doing — asking makes it better.</p>
            <p><span className="text-teal-400 font-semibold">Don't judge by day one.</span> Every activity feels awkward the first time. Commit to trying it 3 times before deciding.</p>
          </div>
          <div className="space-y-2">
            <p><span className="text-teal-400 font-semibold">Bring water and a towel.</span> Applies to basically everything on this list.</p>
            <p><span className="text-teal-400 font-semibold">Wear layers.</span> BC weather changes fast. Indoor activities need breathable clothes; outdoor needs layers.</p>
            <p><span className="text-teal-400 font-semibold">Take a friend.</span> Everything is less intimidating with a buddy. Or don't — solo is fine too, you'll meet people fast.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
