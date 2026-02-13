import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import {
  hypeVsReality, sentimentData, trustData,
  agentAdoptionBreakdown, toolFrustrations,
} from '../data/researchData';

const TRUST_COLORS = ['#10b981', '#34d399', '#6b7280', '#f59e0b', '#ef4444'];
const trustPieData = [
  { name: 'Highly Trust', value: trustData.highlyTrust, color: TRUST_COLORS[0] },
  { name: 'Somewhat Trust', value: trustData.somewhatTrust, color: TRUST_COLORS[1] },
  { name: 'Neutral', value: trustData.neutral, color: TRUST_COLORS[2] },
  { name: 'Somewhat Distrust', value: trustData.somewhatDistrust, color: TRUST_COLORS[3] },
  { name: 'Highly Distrust', value: trustData.highlyDistrust, color: TRUST_COLORS[4] },
];

export default function RealityCheck() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Adoption Reality Check</h1>
        <p className="text-gray-400 text-sm">The numbers behind the hype — sentiment, trust, actual usage vs marketing claims.</p>
      </div>

      {/* Hype vs Reality Cards */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Hype vs Reality Scorecard</h2>
        <div className="space-y-2">
          {hypeVsReality.map((item, i) => {
            const gap = item.hypeScore - item.realityScore;
            return (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-blue-400 font-medium">📣 {item.claim}</p>
                    <p className="text-sm text-red-400 mt-1">📊 {item.reality}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-gray-500">Hype Gap</div>
                    <div className={`text-lg font-bold ${gap > 50 ? 'text-red-400' : gap > 20 ? 'text-amber-400' : 'text-green-400'}`}>
                      {gap > 0 ? '+' : ''}{gap.toFixed(0)}pts
                    </div>
                  </div>
                </div>
                {/* Gap bar */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-blue-400 w-12">Hype</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${item.hypeScore}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 w-8">{item.hypeScore}%</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] text-red-400 w-12">Reality</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: `${Math.max(item.realityScore, 1)}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 w-8">{item.realityScore < 1 ? '<1' : item.realityScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InsightCallout color="red" title="The Adoption Paradox">
        The biggest gap is in autonomous agents: 85% hype score vs 0.2% reality. Marketing says agents will 
        write all code — Jellyfish data from 20M pull requests shows they're involved in less than 0.2% of PRs. 
        The tools are being adopted, but the "autonomous" part is almost entirely aspirational.
      </InsightCallout>

      {/* Sentiment Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Sentiment Trend (2023→2025)</h3>
          <p className="text-xs text-gray-500 mb-4">Favorable view of AI tools is declining even as adoption rises</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="favorable" fill="#10b981" name="Favorable" radius={[3, 3, 0, 0]} />
              <Bar dataKey="neutral" fill="#6b7280" name="Neutral" radius={[3, 3, 0, 0]} />
              <Bar dataKey="unfavorable" fill="#ef4444" name="Unfavorable" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trust Distribution */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Trust in AI Output Accuracy</h3>
          <p className="text-xs text-gray-500 mb-4">46% distrust, only 3% highly trust — {trustData.source}</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={trustPieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {trustPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Adoption Breakdown */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-1">AI Agent Adoption Status (Stack Overflow 2025)</h3>
        <p className="text-xs text-gray-500 mb-4">52% don't use agents or stick to simpler tools — agents are NOT yet mainstream</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={agentAdoptionBreakdown} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} unit="%" />
            <YAxis type="category" dataKey="status" tick={{ fill: '#9ca3af', fontSize: 10 }} width={180} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" name="% of Developers" radius={[0, 4, 4, 0]}>
              {agentAdoptionBreakdown.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Frustrations */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Top Developer Frustrations with AI Tools</h3>
        <p className="text-xs text-gray-500 mb-4">The #1 frustration: "almost right, but not quite" — cited by 66% of developers</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={toolFrustrations} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} unit="%" />
            <YAxis type="category" dataKey="frustration" tick={{ fill: '#9ca3af', fontSize: 9 }} width={220} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" fill="#f59e0b" name="% of Developers" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InsightCallout color="amber">
        72% of professional developers say "vibe coding" is NOT part of their work. The biggest frustration 
        (66%) is AI solutions that are "almost right, but not quite" — which then creates the second biggest 
        frustration: debugging AI-generated code takes MORE time (45%). The tools help, but they're not magic.
      </InsightCallout>
    </div>
  );
}
