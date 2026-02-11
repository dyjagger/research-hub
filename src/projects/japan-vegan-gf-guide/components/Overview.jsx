import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Utensils, MapPin, Leaf, Wheat } from 'lucide-react';
import InsightCallout from './InsightCallout';
import CustomTooltip from './CustomTooltip';
import { cityStats, marketStats, restaurants, COLORS } from '../data/researchData';

const Overview = () => {
  const totalRestaurants = restaurants.length;
  const veganOnly = restaurants.filter(r => r.isVegan && !r.isGF).length;
  const gfOnly = restaurants.filter(r => r.isGF && !r.isVegan).length;
  const bothCount = restaurants.filter(r => r.isVegan && r.isGF).length;
  const withGFOptions = restaurants.filter(r => r.hasGFOptions).length;
  const avgRating = (restaurants.reduce((s, r) => s + r.rating, 0) / totalRestaurants).toFixed(1);

  const pieData = [
    { name: '100% Vegan', value: restaurants.filter(r => r.isVegan && !r.isGF).length },
    { name: 'Dedicated GF', value: restaurants.filter(r => r.isGF && !r.isVegan).length },
    { name: 'Both (V+GF)', value: bothCount },
    { name: 'Options Only', value: restaurants.filter(r => !r.isVegan && !r.isGF).length },
  ];
  const pieColors = [COLORS.vegan, COLORS.glutenFree, COLORS.both, COLORS.gfOptions];

  const cityChartData = cityStats.map(c => ({
    city: c.city,
    Vegan: c.veganCount,
    'Gluten-Free': c.gfCount,
    'Both (V+GF)': c.bothCount,
  }));

  const statCards = [
    { label: 'Restaurants Mapped', value: totalRestaurants, icon: Utensils, color: 'text-green-400' },
    { label: 'Cities Covered', value: 6, icon: MapPin, color: 'text-blue-400' },
    { label: 'Avg Rating', value: `${avgRating} ★`, icon: TrendingUp, color: 'text-amber-400' },
    { label: 'With GF Options', value: withGFOptions, icon: Wheat, color: 'text-purple-400' },
    { label: 'Market Size (2024)', value: `$${marketStats.veganMarketSize2024}B`, icon: Leaf, color: 'text-emerald-400' },
    { label: 'Growth Rate', value: `${marketStats.cagr}% CAGR`, icon: TrendingUp, color: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Overview</h2>
        <p className="text-gray-400 mt-1">Japan's vegan and gluten-free dining landscape at a glance</p>
      </div>

      <InsightCallout color="green">
        Japan's vegan food market reached <strong>$1.2 billion in 2024</strong> and is projected to hit <strong>$2.7 billion by 2033</strong> (9.7% CAGR). 
        The Osaka-Kansai Expo 2025 is accelerating plant-based innovation, and traditional Buddhist temple food (shojin ryori) is gaining international recognition as one of the world's oldest vegan cuisines.
      </InsightCallout>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((s, i) => (
          <div key={i} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/40">
            <s.icon size={18} className={`${s.color} mb-2`} />
            <p className="text-xl font-bold text-gray-100">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* City Comparison Bar Chart */}
        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Restaurant Count by City</h3>
          <p className="text-xs text-gray-500 mb-4">Vegan, gluten-free, and dual-restriction restaurants per city</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="city" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Vegan" fill={COLORS.vegan} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Gluten-Free" fill={COLORS.glutenFree} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Both (V+GF)" fill={COLORS.both} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dietary Breakdown Pie */}
        <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Restaurant Dietary Breakdown</h3>
          <p className="text-xs text-gray-500 mb-4">Distribution of restaurants by primary dietary category</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}
                labelLine={{ stroke: '#6b7280' }}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={pieColors[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Growth Drivers */}
      <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/30">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Market Growth Drivers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {marketStats.growthDrivers.map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <TrendingUp size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="purple">
        Tokyo leads with <strong>50+ vegan restaurants</strong> and <strong>20+ dedicated GF restaurants</strong>, making it the easiest city in Japan for dietary-restricted travelers. 
        Kyoto is the spiritual home of vegan dining through centuries-old shojin ryori (Buddhist temple cuisine), while Osaka's street food scene is rapidly adapting with GF takoyaki and okonomiyaki options.
      </InsightCallout>
    </div>
  );
};

export default Overview;
