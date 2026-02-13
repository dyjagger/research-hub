import React from 'react';
import { TrendingUp, Users, Zap, AlertTriangle, Brain, Server } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { toolCategories, developerAdoptionRates } from '../data/researchData';

const stats = [
  { label: 'Developer AI Adoption', value: '84%', sub: 'using or planning (2025)', icon: Users, color: 'text-blue-400' },
  { label: 'MCP SDK Downloads', value: '97M/mo', sub: 'from 100K in 12 months', icon: Server, color: 'text-amber-400' },
  { label: 'Copilot Users', value: '20M', sub: 'all-time (Jul 2025)', icon: Brain, color: 'text-green-400' },
  { label: 'Cursor ARR', value: '$500M', sub: '$1M → $500M in 18 months', icon: TrendingUp, color: 'text-purple-400' },
  { label: 'Autonomous Agent PRs', value: '<0.2%', sub: 'of all PRs (Jellyfish)', icon: Zap, color: 'text-red-400' },
  { label: 'Sentiment Decline', value: '77→60%', sub: 'favorable view (2023→2025)', icon: AlertTriangle, color: 'text-orange-400' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          AI Developer Tooling Adoption
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          A data-driven analysis of the "game-changing" AI tools reshaping software engineering — 
          AI coding assistants, autonomous agents, MCP servers, AGENTS.md, and skills/workflows. 
          Separating the signal from the noise in the fastest-moving space in tech.
        </p>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{stat.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <InsightCallout color="amber">
        The adoption paradox: headline numbers are massive and climbing fast, but underneath there's a significant 
        trust gap, declining sentiment, and real-world data showing autonomous agents barely touch production code. 
        The tools are everywhere — but the revolution is still in its early innings.
      </InsightCallout>

      {/* Tool Categories */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Five Categories of "Game-Changing" AI Dev Tools</h2>
        <div className="space-y-2">
          {toolCategories.map((cat) => (
            <div key={cat.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-3 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <div>
                <p className="text-sm font-medium text-white">{cat.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {cat.examples.map((ex) => (
                    <span key={ex} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adoption Rate Trend */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Developer AI Adoption Trajectory</h2>
        <div className="flex items-end gap-4 sm:gap-8">
          {developerAdoptionRates.map((d) => (
            <div key={d.year} className="flex-1 text-center">
              <div className="relative mx-auto w-full max-w-[100px]">
                <div className="bg-gray-800 rounded-lg overflow-hidden" style={{ height: '120px' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-b-lg transition-all"
                    style={{
                      height: `${(d.usingAI / 100) * 120}px`,
                      background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
                    }}
                  />
                </div>
                <p className="text-lg font-bold text-white mt-2">{d.usingAI}%</p>
                <p className="text-xs text-gray-500">{d.year}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">Source: Stack Overflow Developer Survey (2023-2025)</p>
      </div>
    </div>
  );
}
