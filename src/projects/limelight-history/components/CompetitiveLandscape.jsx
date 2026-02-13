import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { marketShareData, cdnMarketSize, competitors } from '../data/limelightData';

const COLORS = {
  akamai: '#06b6d4',
  limelight: '#f59e0b',
  edgecast: '#a855f7',
  cloudflare: '#f97316',
  fastly: '#ec4899',
  awsCF: '#10b981',
  other: '#64748b',
};

export default function CompetitiveLandscape() {
  const limelightRevShare = cdnMarketSize.map(m => {
    const ms = marketShareData.find(s => s.year === m.year);
    const share = ms ? ms.limelight : 0;
    return {
      year: m.year,
      marketSize: m.size,
      limelightRev: share > 0 ? ((m.size * share) / 100).toFixed(2) : null,
      limelightShare: share,
    };
  }).filter(d => d.year >= 2007);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Competitive Landscape</h2>
        <p className="text-slate-400">How the CDN market evolved while Limelight stagnated</p>
      </div>

      {/* Market Share Stacked Area */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6">
        <h3 className="text-white font-semibold mb-4">CDN Market Share Evolution (%)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={marketShareData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}%`} />} />
            <Legend />
            <Area type="monotone" dataKey="akamai" stackId="1" stroke={COLORS.akamai} fill={COLORS.akamai} fillOpacity={0.7} name="Akamai" />
            <Area type="monotone" dataKey="limelight" stackId="1" stroke={COLORS.limelight} fill={COLORS.limelight} fillOpacity={0.7} name="Limelight/Edgio" />
            <Area type="monotone" dataKey="edgecast" stackId="1" stroke={COLORS.edgecast} fill={COLORS.edgecast} fillOpacity={0.7} name="Edgecast" />
            <Area type="monotone" dataKey="cloudflare" stackId="1" stroke={COLORS.cloudflare} fill={COLORS.cloudflare} fillOpacity={0.7} name="Cloudflare" />
            <Area type="monotone" dataKey="fastly" stackId="1" stroke={COLORS.fastly} fill={COLORS.fastly} fillOpacity={0.7} name="Fastly" />
            <Area type="monotone" dataKey="awsCF" stackId="1" stroke={COLORS.awsCF} fill={COLORS.awsCF} fillOpacity={0.7} name="AWS CloudFront" />
            <Area type="monotone" dataKey="other" stackId="1" stroke={COLORS.other} fill={COLORS.other} fillOpacity={0.5} name="Other" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout variant="info" title="The Commoditization Squeeze">
        In 2007, Akamai and Limelight together held 77% of the CDN market. By 2024, Akamai held 20% and
        Limelight was gone. Cloudflare's free tier, AWS CloudFront's bundled pricing, and Fastly's edge compute
        disrupted the pure-play CDN model that Limelight was built on.
      </InsightCallout>

      {/* CDN Market Size Growth */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6 mt-6">
        <h3 className="text-white font-semibold mb-4">CDN Market Size vs Limelight's Share</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={limelightRevShare} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}B`} />
            <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} domain={[0, 15]} />
            <Tooltip content={<CustomTooltip formatter={(v, n) => n === 'Limelight Share' ? `${v}%` : `$${v}B`} />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="marketSize" stroke="#06b6d4" strokeWidth={2} name="CDN Market Size" dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="limelightShare" stroke="#f59e0b" strokeWidth={2} name="Limelight Share" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Cards */}
      <h3 className="text-xl font-semibold text-white mb-4 mt-8">Key Competitors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitors.map(c => (
          <div key={c.name} className={`bg-slate-800/50 border rounded-xl p-4 ${
            c.status === 'Defunct' ? 'border-red-500/30' : 'border-slate-700/50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold">{c.name}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                c.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                c.status === 'Acquired' ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>{c.status}</span>
            </div>
            <p className="text-slate-500 text-xs mb-2">Founded {c.founded}</p>
            {c.revenue2024 && (
              <p className="text-cyan-400 text-sm font-medium mb-2">2024 Revenue: ${(c.revenue2024 / 1000).toFixed(1)}B</p>
            )}
            <p className="text-slate-400 text-sm">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
