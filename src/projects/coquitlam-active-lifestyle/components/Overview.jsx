import React, { useState } from 'react';
import { Activity, TrendingUp, DollarSign, MapPin, Users, Star, ChevronRight } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { activities, categories } from '../data/researchData';

const ACCENT = 'teal';

const statCards = [
  { label: 'Activities Researched', value: '18', sub: 'across 6 categories', icon: Activity, color: 'teal' },
  { label: 'Avg Monthly Cost', value: '$70', sub: 'range: $0–$225', icon: DollarSign, color: 'emerald' },
  { label: 'Locations Mapped', value: '30+', sub: 'Coquitlam, Burnaby, PoCo', icon: MapPin, color: 'blue' },
  { label: 'Free Activities', value: '5', sub: 'hiking, cycling, outdoor courts', icon: Star, color: 'amber' },
];

const quickPicks = [
  { label: 'Lowest Cost', activity: 'Hiking / Trail Running', reason: 'Completely free. World-class trails.', color: 'emerald' },
  { label: 'Most Fun', activity: 'Brazilian Jiu-Jitsu', reason: 'Fun score 10/10. "Human chess" on the mat.', color: 'rose' },
  { label: 'Most Social', activity: 'Pickleball', reason: 'Social score 10/10. Rotating partners, instant community.', color: 'violet' },
  { label: 'Best for Joints', activity: 'Lap Swimming', reason: 'Zero impact. Hot tub & sauna included.', color: 'cyan' },
  { label: 'Best All-Rounder', activity: 'Rock Climbing', reason: 'Fun 9/10, full-body, low injury risk, beginner-friendly.', color: 'teal' },
  { label: 'Best Team Vibe', activity: 'Urban Rec Leagues', reason: 'Coed leagues with built-in social events.', color: 'blue' },
];

export default function Overview() {
  const [hoveredCat, setHoveredCat] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Active Lifestyle Guide</h1>
        <p className="text-gray-400 text-lg">Coquitlam & Burnaby, BC — 18 fun activities for adults in their 40s</p>
      </div>

      <InsightCallout accent={ACCENT}>
        You asked for exercise that's <strong>fun, not monotonous</strong>. This guide covers 18 activities across 6 categories — every one of them was chosen because it keeps you engaged through skill progression, social connection, or sheer enjoyment rather than rep counting on a treadmill.
      </InsightCallout>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg bg-${card.color}-500/20`}>
                  <Icon className={`w-4 h-4 text-${card.color}-400`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Category Overview */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Activity Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map(cat => {
            const catActivities = activities.filter(a => a.category === cat.id);
            return (
              <div
                key={cat.id}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all cursor-default"
                onMouseEnter={() => setHoveredCat(cat.id)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-semibold text-white">{cat.label}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{catActivities.length} activities</div>
                <div className="space-y-1">
                  {catActivities.map(a => (
                    <div key={a.id} className="text-xs text-gray-300 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                      {a.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Picks */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Picks — Find Your Fit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickPicks.map(pick => (
            <div key={pick.label} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 flex items-start gap-3">
              <div className={`px-2 py-1 rounded-md bg-${pick.color}-500/20 text-${pick.color}-400 text-xs font-semibold whitespace-nowrap`}>
                {pick.label}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{pick.activity}</div>
                <div className="text-xs text-gray-400 mt-0.5">{pick.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Rec Pass Callout */}
      <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-teal-300 mb-2">Pro Tip: City Recreation Passes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-white mb-1">Coquitlam ONE Pass</div>
            <ul className="space-y-1 text-gray-300">
              <li>Single visit: <span className="text-teal-400 font-medium">$6.67</span></li>
              <li>10-visit pass: <span className="text-teal-400 font-medium">$53.40</span></li>
              <li>Monthly continuous: <span className="text-teal-400 font-medium">$43.30/mo</span></li>
              <li>Annual: <span className="text-teal-400 font-medium">$486/year</span></li>
            </ul>
            <p className="text-xs text-gray-500 mt-1">Covers swimming, fitness, skating, gym sports, badminton, pickleball</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-1">Burnaby Be Active Pass</div>
            <ul className="space-y-1 text-gray-300">
              <li>Unlimited access to all fitness classes, pools, skating, gym sports</li>
              <li>Includes yoga, Pilates, Zumba, indoor cycling</li>
              <li>Steam rooms, saunas, and whirlpools included</li>
            </ul>
            <p className="text-xs text-gray-500 mt-1">Monthly and annual options available at any Burnaby recreation facility</p>
          </div>
        </div>
      </div>
    </div>
  );
}
