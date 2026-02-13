import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import {
  copilotUserGrowth, cursorRevenueGrowth, mcpEcosystemGrowth,
  agentsMdAdoption, timelineMilestones, timelineEras,
} from '../data/researchData';

const TABS = [
  { id: 'copilot', label: 'Copilot Users' },
  { id: 'cursor', label: 'Cursor Revenue' },
  { id: 'mcp', label: 'MCP Ecosystem' },
  { id: 'agentsmd', label: 'AGENTS.md' },
  { id: 'timeline', label: 'Key Milestones' },
];

export default function GrowthTimelines() {
  const [activeTab, setActiveTab] = useState('copilot');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Growth Timelines</h1>
        <p className="text-gray-400 text-sm">User counts, revenue curves, and ecosystem expansion — the raw growth data behind each tool category.</p>
      </div>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Copilot Users */}
      {activeTab === 'copilot' && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">GitHub Copilot — All-Time Users (Millions)</h3>
            <p className="text-xs text-gray-500 mb-4">From 400K at GA launch to 20M in 3 years — 400% YoY growth in 2024-2025</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={copilotUserGrowth}>
                <defs>
                  <linearGradient id="copilotGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="M" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="url(#copilotGrad)" strokeWidth={2} name="Users (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <InsightCallout color="blue">
            Copilot added 5M users in just 3 months (Apr→Jul 2025). 90% of Fortune 100 companies now use it. 
            Microsoft says Copilot is now a larger business than all of GitHub was when acquired for $7.5B in 2018.
          </InsightCallout>
        </div>
      )}

      {/* Cursor Revenue */}
      {activeTab === 'cursor' && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">Cursor — Annual Recurring Revenue ($M)</h3>
            <p className="text-xs text-gray-500 mb-4">Fastest-growing SaaS company ever: $1M → $500M ARR in 18 months (9,900% YoY)</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cursorRevenueGrowth}>
                <defs>
                  <linearGradient id="cursorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} unit="M" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="arr" stroke="#8b5cf6" fill="url(#cursorGrad)" strokeWidth={2} name="ARR ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <InsightCallout color="purple">
            Cursor's growth is unprecedented in SaaS history. It went from $1M to $100M ARR in 12 months, then 
            doubled to $200M in 2 more months, and hit $500M by May 2025. Valued at $9.9B after Series C.
          </InsightCallout>
        </div>
      )}

      {/* MCP Ecosystem */}
      {activeTab === 'mcp' && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">MCP Ecosystem Growth</h3>
            <p className="text-xs text-gray-500 mb-4">From zero to 97M monthly SDK downloads in 13 months — the fastest protocol adoption in AI history</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mcpEcosystemGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 10 }} unit="M" />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line yAxisId="left" type="monotone" dataKey="servers" stroke="#f59e0b" strokeWidth={2} name="Servers" dot={{ r: 3 }} />
                <Line yAxisId="left" type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={2} name="Clients" dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="sdkDownloads" stroke="#ec4899" strokeWidth={2} name="SDK Downloads (M/mo)" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <InsightCallout color="amber">
            MCP went from "another standard that would die in committee" to the de facto protocol for AI-tool 
            integration in 12 months. OpenAI, Google, Microsoft, and AWS all adopted it. In Dec 2025, it was 
            donated to the Linux Foundation — the same body that governs Kubernetes and Node.js.
          </InsightCallout>
        </div>
      )}

      {/* AGENTS.md */}
      {activeTab === 'agentsmd' && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-1">AGENTS.md — Project Adoption</h3>
            <p className="text-xs text-gray-500 mb-4">Released Aug 2025, adopted by 60,000+ open-source projects in 4 months</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentsMdAdoption}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="projects" fill="#10b981" radius={[4, 4, 0, 0]} name="Projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <InsightCallout color="green">
            AGENTS.md was contributed by OpenAI to the Agentic AI Foundation alongside MCP. It's becoming the 
            "README for agents" — a simple markdown file that tells coding agents how to work with your project. 
            Also in this space: .cursorrules, CLAUDE.md, .github/copilot-instructions.md.
          </InsightCallout>
        </div>
      )}

      {/* Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-white mb-3">Key Milestones Timeline</h3>
            <div className="flex gap-2 mb-4 flex-wrap">
              {timelineEras.map((era) => (
                <span key={era.id} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: era.color + '60', color: era.color }}>
                  {era.label} ({era.range})
                </span>
              ))}
            </div>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2">
              {timelineMilestones.map((m, i) => {
                const era = timelineEras.find(e => e.id === m.era);
                const cat = toolCategories.find(c => c.id === m.category);
                return (
                  <div key={i} className="flex items-start gap-3 py-1.5 border-b border-gray-800/50 last:border-0">
                    <span className="text-[10px] text-gray-600 font-mono w-16 flex-shrink-0 pt-0.5">{m.date}</span>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: era?.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300">{m.event}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ backgroundColor: cat?.color + '20', color: cat?.color }}>
                        {cat?.shortName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <InsightCallout color="blue">
            The "Agentic Explosion" era (Nov 2024–present) packed more transformative launches into 14 months 
            than the previous 2 years combined. MCP, AGENTS.md, Claude Code, Copilot Agent Mode, and the 
            Linux Foundation governance all happened in this window.
          </InsightCallout>
        </div>
      )}
    </div>
  );
}
