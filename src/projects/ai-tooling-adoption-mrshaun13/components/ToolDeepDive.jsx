import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import {
  toolCategories, codeGenerationStats, mcpTopServers, productivityStudies,
} from '../data/researchData';

const TOOL_TABS = toolCategories.map(c => ({ id: c.id, label: c.shortName, color: c.color }));

const toolDetails = {
  'coding-assistants': {
    title: 'AI Coding Assistants',
    keyStats: [
      { label: 'GitHub Copilot Users', value: '20M all-time', sub: '1.3M paid, 42% market share' },
      { label: 'Cursor ARR', value: '$500M', sub: 'Fastest SaaS growth ever' },
      { label: 'Windsurf (Codeium)', value: '$1.25B valuation', sub: 'Acquired by Cognition Jul 2025' },
      { label: 'Code Written by AI', value: '46%', sub: 'Among active Copilot users' },
    ],
    maturity: 85,
    adoption: 76,
    trustLevel: 33,
    futureConfidence: 90,
  },
  'agentic-coding': {
    title: 'Agentic Coding',
    keyStats: [
      { label: 'Agent Users (SO 2025)', value: '25%', sub: 'Actively using agents at work' },
      { label: 'Autonomous Agent PRs', value: '<0.2%', sub: 'Of all PRs (Jellyfish, 20M PRs)' },
      { label: 'Devin Funding', value: '$196M', sub: 'First "AI software engineer"' },
      { label: 'Agent Orchestration', value: 'Ollama 51%', sub: 'LangChain 33% (SO 2025)' },
    ],
    maturity: 25,
    adoption: 25,
    trustLevel: 15,
    futureConfidence: 70,
  },
  'mcp-servers': {
    title: 'MCP Servers',
    keyStats: [
      { label: 'SDK Downloads', value: '97M/mo', sub: 'Python + TypeScript combined' },
      { label: 'MCP Servers', value: '5,800+', sub: '10,000+ published total' },
      { label: 'MCP Clients', value: '300+', sub: 'Claude, ChatGPT, Cursor, VS Code, Gemini' },
      { label: 'Governance', value: 'Linux Foundation', sub: 'AAIF — Dec 2025' },
    ],
    maturity: 50,
    adoption: 40,
    trustLevel: 45,
    futureConfidence: 95,
  },
  'agent-instructions': {
    title: 'Agent Instruction Files',
    keyStats: [
      { label: 'AGENTS.md Projects', value: '60,000+', sub: '4 months since release (Aug 2025)' },
      { label: 'Formats', value: '5+', sub: 'AGENTS.md, .cursorrules, CLAUDE.md, copilot-instructions' },
      { label: 'Governance', value: 'Linux Foundation', sub: 'Contributed by OpenAI to AAIF' },
      { label: 'Adoption Rate', value: '~15K/mo', sub: 'New projects adding AGENTS.md' },
    ],
    maturity: 35,
    adoption: 20,
    trustLevel: 60,
    futureConfidence: 85,
  },
  'skills-workflows': {
    title: 'Skills & Workflows',
    keyStats: [
      { label: 'Status', value: 'Emerging', sub: 'No dominant standard yet' },
      { label: 'Windsurf Skills', value: 'Active', sub: 'Reusable agent procedures' },
      { label: 'Claude Code Skills', value: 'Active', sub: 'Folder-based skill discovery' },
      { label: 'Standardization', value: 'None', sub: 'Vendor-specific implementations' },
    ],
    maturity: 15,
    adoption: 5,
    trustLevel: 50,
    futureConfidence: 65,
  },
};

export default function ToolDeepDive() {
  const [activeTool, setActiveTool] = useState('coding-assistants');
  const detail = toolDetails[activeTool];

  const radarData = [
    { axis: 'Maturity', value: detail.maturity },
    { axis: 'Adoption', value: detail.adoption },
    { axis: 'Trust', value: detail.trustLevel },
    { axis: 'Future Confidence', value: detail.futureConfidence },
  ];

  const cat = toolCategories.find(c => c.id === activeTool);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Tool-by-Tool Deep Dive</h1>
        <p className="text-gray-400 text-sm">Key metrics, maturity assessment, and adoption data for each tool category.</p>
      </div>

      {/* Tool Selector */}
      <div className="flex flex-wrap gap-1.5">
        {TOOL_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTool(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activeTool === tab.id
                ? 'border-opacity-50 bg-opacity-15'
                : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'
            }`}
            style={activeTool === tab.id ? { borderColor: tab.color + '80', backgroundColor: tab.color + '15', color: tab.color } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tool Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Key Stats */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-3" style={{ color: cat?.color }}>{detail.title}</h3>
          <div className="space-y-3">
            {detail.keyStats.map((stat, i) => (
              <div key={i} className="flex items-start justify-between border-b border-gray-800/50 pb-2 last:border-0">
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-[10px] text-gray-600">{stat.sub}</p>
                </div>
                <p className="text-sm font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Maturity Assessment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 9 }} />
              <Radar name={detail.title} dataKey="value" stroke={cat?.color} fill={cat?.color} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Productivity Studies (shown for coding-assistants) */}
      {activeTool === 'coding-assistants' && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Productivity Studies — Mixed Results</h3>
          <p className="text-xs text-gray-500 mb-4">Not all studies agree — some show massive gains, others show slowdowns and more bugs</p>
          <div className="space-y-2">
            {productivityStudies.map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-800/50 last:border-0">
                <div className={`w-16 text-right text-sm font-bold ${s.improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {s.improvement > 0 ? '+' : ''}{s.improvement}%
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-300">{s.metric}</p>
                  <p className="text-[10px] text-gray-600">{s.study} — {s.sampleSize}</p>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                  s.direction.includes('faster') || s.direction.includes('increase') || s.direction.includes('more tasks')
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {s.direction}
                </span>
              </div>
            ))}
          </div>
          <InsightCallout color="amber">
            Code architecture matters enormously: Jellyfish found companies with centralized (monolithic) architectures 
            see 4x productivity gains from AI tools, while distributed architectures see a slight negative impact. 
            The tool isn't the only variable — your codebase structure determines the outcome.
          </InsightCallout>
        </div>
      )}

      {/* MCP Top Servers (shown for mcp-servers) */}
      {activeTool === 'mcp-servers' && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Top 10 Most-Searched MCP Servers</h3>
          <p className="text-xs text-gray-500 mb-4">180,000+ combined monthly searches — 80% offer remote deployment</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mcpTopServers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="searches" fill="#f59e0b" name="Monthly Searches" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Code Generation Stats (shown for coding-assistants) */}
      {activeTool === 'coding-assistants' && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Code Generation Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {codeGenerationStats.map((stat, i) => (
              <div key={i} className="text-center p-3 bg-gray-800/30 rounded-lg">
                <p className="text-xl font-bold text-blue-400">{stat.value}{stat.unit}</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">{stat.metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
