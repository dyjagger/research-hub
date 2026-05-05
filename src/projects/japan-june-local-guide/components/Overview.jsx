import React from 'react';
import { MapPin, Utensils, Landmark, Calendar, CloudRain, Users, Star } from 'lucide-react';
import InsightCallout from '../../../components/InsightCallout';
import { tokyoRamen, kyotoRamen, tokyoCulture, kyotoCulture, juneFestivals, juneContext } from '../data/researchData';

const ACCENT = 'rose';

const statCards = [
  { label: 'Ramen Shops', value: String(tokyoRamen.length + kyotoRamen.length), sub: 'handpicked local favorites', icon: Utensils, color: 'amber' },
  { label: 'Cultural Experiences', value: String(tokyoCulture.length + kyotoCulture.length), sub: 'workshops, walks, temples', icon: Landmark, color: 'rose' },
  { label: 'June Festivals', value: String(juneFestivals.length), sub: 'neighborhood matsuri & rituals', icon: Calendar, color: 'violet' },
  { label: 'Very Low Tourist Spots', value: String(
    [...tokyoRamen, ...kyotoRamen, ...tokyoCulture, ...kyotoCulture, ...juneFestivals].filter(x => x.touristDensity === 'very-low').length
  ), sub: 'almost no foreigners', icon: Users, color: 'emerald' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Japan June Local Guide</h1>
        <p className="text-gray-400 text-lg">Tokyo & Kyoto — Ramen, Culture & Hidden Spots Away from Tourist Crowds</p>
      </div>

      <InsightCallout color={ACCENT}>
        June is Japan's rainy season (<strong>tsuyu 梅雨</strong>) — and that's actually your advantage. Tourist numbers drop significantly, 
        locals reclaim their favorite spots, and the rain creates atmospheric beauty at temples and in narrow backstreets. 
        Every recommendation below was chosen specifically because <strong>foreign tourists rarely find these places</strong>.
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

      {/* June Weather Context */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <CloudRain className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-300">June Weather & Why It's Perfect</h3>
        </div>
        <p className="text-sm text-gray-300 mb-3">{juneContext.weather.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {juneContext.weather.tips.map((tip, i) => (
            <div key={i} className="text-xs text-gray-400 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Highlights */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">June Seasonal Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {juneContext.seasonal.map(item => (
            <div key={item.item} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="text-sm font-semibold text-white mb-1">{item.item}</div>
              <div className="text-xs text-gray-400">{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Crowd Avoidance Strategy */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-emerald-300">{juneContext.crowdStrategy.title}</h3>
        </div>
        <div className="space-y-2">
          {juneContext.crowdStrategy.tips.map((tip, i) => (
            <div key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
