import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { marketProjections, futureProjections } from '../data/researchData';

const confidenceColors = { high: 'text-green-400 bg-green-500/10', medium: 'text-amber-400 bg-amber-500/10', low: 'text-red-400 bg-red-500/10' };

export default function FutureProjections() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Future Projections</h1>
        <p className="text-gray-400 text-sm">Market forecasts, analyst predictions, and risk factors through 2030+.</p>
      </div>

      {/* Market Size Projections Chart */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Market Size Projections ($B)</h3>
        <p className="text-xs text-gray-500 mb-4">AI coding tools, agentic AI, and MCP ecosystem — projected through 2030</p>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={marketProjections.filter(d => d.year <= 2030)}>
            <defs>
              <linearGradient id="codingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="agenticGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mcpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="B" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Area type="monotone" dataKey="aiCodingTools" stroke="#3b82f6" fill="url(#codingGrad)" strokeWidth={2} name="AI Coding Tools" connectNulls />
            <Area type="monotone" dataKey="agenticAI" stroke="#8b5cf6" fill="url(#agenticGrad)" strokeWidth={2} name="Agentic AI" connectNulls />
            <Area type="monotone" dataKey="mcpEcosystem" stroke="#f59e0b" fill="url(#mcpGrad)" strokeWidth={2} name="MCP Ecosystem" connectNulls />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-gray-600 mt-2">Sources: Verified Market Research, Arcade.dev, Guptadeepak MCP Report. T2-T3 estimates for 2026+ projections.</p>
      </div>

      <InsightCallout color="purple">
        Agentic AI is projected to overtake AI coding tools in market size by ~2029, growing at 43.8% CAGR 
        to reach $199B by 2034. But Gartner warns that 40% of agentic AI projects will be cancelled by 2027 
        due to escalating costs, unclear business value, or inadequate risk controls.
      </InsightCallout>

      {/* Per-Category Projections */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Category-by-Category Outlook</h2>
        <div className="space-y-3">
          {futureProjections.map((proj, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">{proj.category}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${confidenceColors[proj.confidence]}`}>
                  {proj.confidence} confidence
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Now (2025)</p>
                  <p className="text-xs text-gray-300">{proj.current2025}</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-amber-500 font-medium mb-1">2027 Projection</p>
                  <p className="text-xs text-gray-300">{proj.projection2027}</p>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wider text-purple-500 font-medium mb-1">2030 Projection</p>
                  <p className="text-xs text-gray-300">{proj.projection2030}</p>
                </div>
              </div>
              {/* Risk Factors */}
              <div className="flex flex-wrap gap-1.5">
                {proj.riskFactors.map((risk, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    ⚠ {risk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Forecast Numbers */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Headline Forecast Numbers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'AI Coding Tools by 2034', value: '$99B', sub: '23.2% CAGR', color: 'text-blue-400' },
            { label: 'Agentic AI by 2034', value: '$199B', sub: '43.8% CAGR', color: 'text-purple-400' },
            { label: 'Agentic pilots by 2027', value: '50%', sub: 'Up from 25% in 2025', color: 'text-amber-400' },
            { label: 'Customer service by 2028', value: '68%', sub: 'Handled by agentic AI', color: 'text-green-400' },
            { label: 'GDP impact by 2030', value: '$2.6-4.4T', sub: 'Annual contribution', color: 'text-cyan-400' },
            { label: 'Project cancellations', value: '40%', sub: 'By 2027 (Gartner)', color: 'text-red-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 bg-gray-800/30 rounded-lg">
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-gray-500 mt-1">{stat.label}</p>
              <p className="text-[9px] text-gray-600">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="amber">
        The projections paint a picture of massive growth with significant turbulence. The tools that survive 
        will be the ones that solve the trust problem — right now, 46% of developers distrust AI output accuracy. 
        MCP has the highest confidence rating because it's an infrastructure layer, not a productivity claim. 
        Skills/workflows have the lowest because no standard has emerged yet.
      </InsightCallout>
    </div>
  );
}
