import React from 'react';
import { TrendingUp, Users, DollarSign, Target, Plane, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { marketOverview, tourismTimeline, luxuryMarketGrowth } from '../data/researchData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const ACCENT = '#f43f5e';

const statCards = [
  { label: 'Luxury Market 2024', value: '$38.7B', sub: '10% CAGR to 2030', icon: DollarSign, color: '#f43f5e' },
  { label: 'Inbound Visitors 2024', value: '36.9M', sub: 'All-time record (+16% vs 2019)', icon: Users, color: '#8b5cf6' },
  { label: 'Total Spending 2024', value: '$53.3B', sub: 'Japan\'s #2 export sector', icon: TrendingUp, color: '#10b981' },
  { label: 'Luxury Per Capita', value: '~$5,500', sub: '3.7x average visitor spend', icon: Star, color: '#f59e0b' },
  { label: 'JTA 2030 Target', value: '60M visitors', sub: '¥15T ($98.7B) spending', icon: Target, color: '#06b6d4' },
  { label: 'Top Luxury Feeders', value: 'US, AU, UK', sub: 'Highest luxury share markets', icon: Plane, color: '#ec4899' },
];

export default function Overview() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Japan DMC & Luxury Tourism Intelligence</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Comprehensive guide for travel specialists — Destination Management Companies, market data, and luxury experience landscape
        </p>
      </div>

      <InsightCallout>
        Japan set an all-time inbound tourism record of 36.9 million visitors in 2024, surpassing the pre-COVID peak by 16%.
        The luxury travel segment is growing at 10% CAGR, projected to reach $68.3B by 2030. For travel agents, this means
        surging demand for high-end DMC services — but choosing the right DMC partner is critical as the market fragments
        between ultra-boutique specialists and large-scale operators.
      </InsightCallout>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md" style={{ backgroundColor: `${card.color}20` }}>
                  <Icon size={14} style={{ color: card.color }} />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">{card.label}</span>
              </div>
              <p className="text-xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Inbound Tourism Timeline */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Japan Inbound Tourism Growth</h3>
        <p className="text-xs text-gray-500 mb-4">Visitor arrivals in millions (2003–2024)</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={tourismTimeline}>
            <defs>
              <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACCENT} stopOpacity={0.3} />
                <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="visitors" stroke={ACCENT} fill="url(#visitorGrad)" strokeWidth={2} name="Visitors (M)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-3">
          {tourismTimeline.filter(d => d.event).map(d => (
            <span key={d.year} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded">
              <span className="text-gray-300 font-medium">{d.year}</span> — {d.event}
            </span>
          ))}
        </div>
      </div>

      {/* Luxury Market Growth */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Japan Luxury Travel Market Size</h3>
        <p className="text-xs text-gray-500 mb-4">USD millions (2020–2030 projected)</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={luxuryMarketGrowth}>
            <defs>
              <linearGradient id="luxGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="year" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#luxGrad)" strokeWidth={2} name="Market Size ($M)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Why DMCs Matter */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Why DMCs Are Essential for Japan Luxury Travel</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="space-y-3">
            <div>
              <p className="text-gray-200 font-medium">Language & Cultural Barrier</p>
              <p className="text-xs">Japan's service culture is uniquely complex. DMCs navigate keigo (honorific language), seasonal etiquette, and unwritten social codes that can make or break a luxury experience.</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium">Access to Exclusive Experiences</p>
              <p className="text-xs">Private geisha dinners, Living National Treasure meetings, after-hours temple access — these require years of relationship-building that only established DMCs possess.</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium">Ryokan & Hotel Relationships</p>
              <p className="text-xs">Top ryokans have limited rooms and often prioritize DMC bookings. During cherry blossom and autumn seasons, DMC relationships are the only way to secure premium properties.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-gray-200 font-medium">Logistics Complexity</p>
              <p className="text-xs">Japan's transport system is world-class but complex. DMCs handle shinkansen reservations, private vehicle routing, domestic flights, and seamless inter-city transfers.</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium">Regional Expertise</p>
              <p className="text-xs">70% of visitors concentrate in Tokyo/Osaka/Kyoto. DMCs unlock Japan's hidden luxury — Setouchi art islands, Tohoku onsen, Kyushu luxury trains, and Hokkaido wilderness lodges.</p>
            </div>
            <div>
              <p className="text-gray-200 font-medium">24/7 On-Ground Support</p>
              <p className="text-xs">Luxury clients expect immediate problem resolution. DMCs provide bilingual concierge, emergency support, and real-time itinerary adjustments that remote agents cannot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
