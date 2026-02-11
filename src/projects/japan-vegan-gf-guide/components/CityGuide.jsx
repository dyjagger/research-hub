import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MapPin, Star, Utensils, TrendingUp } from 'lucide-react';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';
import { cityStats, restaurants, COLORS } from '../data/researchData';

const cityHighlights = {
  Tokyo: {
    tagline: 'Vegan Paradise — Most Variety, Most English Menus',
    highlights: [
      'Saido — #1 vegan restaurant worldwide (HappyCow)',
      "T's TanTan — vegan ramen inside Tokyo Station",
      "Gluten Free T's Kitchen — dedicated GF + vegan, all Japanese classics made safe",
      'Narisawa — 2 Michelin stars, full vegan tasting menu available',
      'Rizlabo — one of only 2 places in Japan for GF souffle pancakes',
    ],
    bestFor: 'First-time visitors, fine dining, convenience',
    veganEase: 5, gfEase: 4, variety: 5, value: 3, englishFriendly: 5,
  },
  Kyoto: {
    tagline: 'Temple Food Capital — Shojin Ryori Heartland',
    highlights: [
      'Shigetsu — shojin ryori inside Tenryuji Temple with garden views',
      'Kanga-an — evening temple dining with illuminated grounds',
      'Arashiyama-kan — HappyCow #1 Kyoto, sells out daily after 12 sets',
      'Gion Soy Milk Ramen — dedicated GF + vegan ramen',
      'Toshoan — GF souffle pancakes (one of only 2 in Japan)',
    ],
    bestFor: 'Cultural dining, temple food, spiritual experiences',
    veganEase: 4, gfEase: 3, variety: 4, value: 4, englishFriendly: 3,
  },
  Osaka: {
    tagline: "Street Food Heaven — Japan's Kitchen Goes Plant-Based",
    highlights: [
      'Rocca — HappyCow #1 Osaka, incredible value at ¥1,000/set',
      'OKO Okonomiyaki — GF + vegan okonomiyaki AND takoyaki',
      'Komeko Takoyaki — GF rice flour takoyaki',
      'Genji Soba — rare 100% buckwheat (GF) soba',
      'Green Earth — Osaka\'s oldest vegetarian restaurant',
    ],
    bestFor: 'Street food lovers, budget dining, food adventures',
    veganEase: 3, gfEase: 3, variety: 3, value: 5, englishFriendly: 3,
  },
  Nara: {
    tagline: 'Small But Mighty — Dual-Restriction Gems',
    highlights: [
      'Onwa — dedicated GF + vegan, worth planning your visit around',
      'Naramachi Vegan Nabi — GF + vegan, sells GF bento boxes for Nara Park picnics',
      'Tsukihitei — shojin ryori near Todaiji (Great Buddha)',
      'Magosaku — fully vegan in charming Naramachi district',
    ],
    bestFor: 'Day trips, dual-restriction travelers, temple food',
    veganEase: 3, gfEase: 2, variety: 2, value: 4, englishFriendly: 2,
  },
  Hiroshima: {
    tagline: 'Limited But Dedicated — Vegan Okonomiyaki Pioneer',
    highlights: [
      'Vegan Okonomiyaki Kisaku — dedicated vegan Hiroshima-style okonomiyaki',
      'Koguma Okonomiyaki — GF rice flour okonomiyaki (celiac blogger favorite)',
      'Saihoji Café — peaceful vegan cafe near Peace Memorial',
      'Musoshin — rare vegan ramen in Hiroshima',
    ],
    bestFor: 'Okonomiyaki lovers, Peace Memorial visitors',
    veganEase: 2, gfEase: 1, variety: 2, value: 4, englishFriendly: 2,
  },
  Hakone: {
    tagline: 'Very Limited — Rely on Ryokans',
    highlights: [
      'Nukafuku — GF donut stall + GF soy sauce packets (stock up!)',
      'Book a ryokan with advance GF/vegan notice for meals',
      'Pack snacks — options are extremely limited',
    ],
    bestFor: 'Hot springs, ryokan dining (with advance notice)',
    veganEase: 1, gfEase: 1, variety: 1, value: 3, englishFriendly: 1,
  },
};

const CityGuide = () => {
  const [selectedCity, setSelectedCity] = useState('Tokyo');
  const info = cityHighlights[selectedCity];
  const stat = cityStats.find(c => c.city === selectedCity);

  const radarData = [
    { metric: 'Vegan Ease', value: info.veganEase },
    { metric: 'GF Ease', value: info.gfEase },
    { metric: 'Variety', value: info.variety },
    { metric: 'Value', value: info.value },
    { metric: 'English', value: info.englishFriendly },
  ];

  const cityRestaurants = restaurants.filter(r => r.city === selectedCity);
  const topRated = [...cityRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const ratingDistribution = [
    { range: '4.7+', count: cityRestaurants.filter(r => r.rating >= 4.7).length },
    { range: '4.4–4.6', count: cityRestaurants.filter(r => r.rating >= 4.4 && r.rating < 4.7).length },
    { range: '4.0–4.3', count: cityRestaurants.filter(r => r.rating >= 4.0 && r.rating < 4.4).length },
    { range: '<4.0', count: cityRestaurants.filter(r => r.rating < 4.0).length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">City Guide</h2>
        <p className="text-gray-400 mt-1">Detailed breakdown by city — ease of dining, top picks, and local tips</p>
      </div>

      {/* City Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(cityHighlights).map(city => {
          const cs = cityStats.find(c => c.city === city);
          return (
            <button key={city} onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedCity === city
                ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                : 'bg-gray-800/60 text-gray-400 border border-gray-700/40 hover:bg-gray-700/60'}`}>
              <MapPin size={14} />
              {city}
              <span className="text-xs opacity-60">({cs?.veganCount}V / {cs?.gfCount}GF)</span>
            </button>
          );
        })}
      </div>

      {/* City Header */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-100">{selectedCity}</h3>
            <p className="text-green-400 text-sm font-medium mt-1">{info.tagline}</p>
            <p className="text-gray-400 text-sm mt-2">{stat?.description}</p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-green-500/10 rounded-lg px-4 py-2 border border-green-500/20">
              <p className="text-lg font-bold text-green-400">{stat?.veganCount}</p>
              <p className="text-xs text-gray-500">Vegan</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg px-4 py-2 border border-blue-500/20">
              <p className="text-lg font-bold text-blue-400">{stat?.gfCount}</p>
              <p className="text-xs text-gray-500">GF</p>
            </div>
            <div className="bg-purple-500/10 rounded-lg px-4 py-2 border border-purple-500/20">
              <p className="text-lg font-bold text-purple-400">{stat?.bothCount}</p>
              <p className="text-xs text-gray-500">Both</p>
            </div>
            <div className="bg-amber-500/10 rounded-lg px-4 py-2 border border-amber-500/20">
              <p className="text-lg font-bold text-amber-400">{stat?.rating}</p>
              <p className="text-xs text-gray-500">Avg ★</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Best for: <span className="text-gray-300">{info.bestFor}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">City Scorecard</h3>
          <p className="text-xs text-gray-500 mb-3">Rated 1-5 across key traveler dimensions</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar name={selectedCity} dataKey="value" stroke={COLORS.vegan} fill={COLORS.vegan} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution */}
        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Rating Distribution</h3>
          <p className="text-xs text-gray-500 mb-3">How restaurants in {selectedCity} are rated</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ratingDistribution} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis dataKey="range" type="category" tick={{ fill: '#9ca3af', fontSize: 12 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={COLORS.accent1} radius={[0, 4, 4, 0]} name="Restaurants" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Highlights in {selectedCity}</h3>
        <div className="space-y-2">
          {info.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <Star size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Table */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Top Rated in {selectedCity}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-gray-700/50">
                <th className="text-left py-2 pr-4">Restaurant</th>
                <th className="text-left py-2 pr-4">Cuisine</th>
                <th className="text-center py-2 pr-4">Rating</th>
                <th className="text-left py-2 pr-4">Price</th>
                <th className="text-left py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {topRated.map(r => (
                <tr key={r.id} className="border-b border-gray-800/50 hover:bg-gray-700/20">
                  <td className="py-2 pr-4 text-gray-200 font-medium">{r.name}</td>
                  <td className="py-2 pr-4 text-gray-400">{r.cuisine}</td>
                  <td className="py-2 pr-4 text-center">
                    <span className="text-amber-400 font-medium">{r.rating}</span>
                    <span className="text-gray-600 text-xs ml-1">({r.reviewCount})</span>
                  </td>
                  <td className="py-2 pr-4 text-gray-400">{r.priceRange}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-1">
                      {r.isVegan && <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-300">V</span>}
                      {r.isGF && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">GF</span>}
                      {!r.isGF && r.hasGFOptions && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">GF opts</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityGuide;
