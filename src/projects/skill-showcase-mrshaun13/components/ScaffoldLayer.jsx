import React, { useState } from 'react';
import { ChevronRight, FolderOpen, FileCode, Layers } from 'lucide-react';
import { scaffoldEvolution } from '../data/showcaseData';
import InsightCallout from './InsightCallout';

function StageCard({ stage, index, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/5'
          : 'border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: stage.color + '20', color: stage.color }}
        >
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-200">{stage.label}</div>
          <div className="text-[10px] text-gray-500">{stage.stage}</div>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-indigo-400 rotate-90' : 'text-gray-600'}`} />
      </div>
    </button>
  );
}

function FileTree({ files, color }) {
  if (!files || files.length === 0) return null;
  return (
    <div className="mt-3 p-3 rounded-lg bg-gray-900/50 border border-gray-700/30">
      <div className="flex items-center gap-1.5 mb-2">
        <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Files Involved</span>
      </div>
      <div className="space-y-1">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <FileCode className="w-3 h-3 flex-shrink-0" style={{ color }} />
            <code className="text-[11px] text-gray-400 font-mono">{f}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvolutionTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-emerald-500/50" />
      {scaffoldEvolution.map((stage, i) => (
        <div key={i} className="relative pl-12 pb-8 last:pb-0">
          <div
            className="absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[8px] font-bold"
            style={{ borderColor: stage.color, color: stage.color, backgroundColor: stage.color + '15' }}
          >
            {i + 1}
          </div>
          <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold" style={{ color: stage.color }}>{stage.stage}</span>
              <span className="text-gray-600">·</span>
              <span className="text-sm font-semibold text-gray-200">{stage.label}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{stage.description}</p>
            {stage.example && (
              <pre className="mt-3 p-3 rounded-lg bg-gray-900/60 border border-gray-700/30 text-[11px] text-gray-400 font-mono whitespace-pre-wrap overflow-x-auto">
                {stage.example}
              </pre>
            )}
            <FileTree files={stage.files} color={stage.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfigLayers() {
  const layers = [
    {
      name: 'Pointer Config',
      location: '~/.codeium/windsurf/skills/research-visualizer/config.json',
      scope: 'Machine-local',
      purpose: 'Contains ONLY personalHubPath. Installation detection marker. Never committed.',
      color: '#f59e0b',
    },
    {
      name: 'Portable Config',
      location: '<hubPath>/hub-config.json',
      scope: 'Git-synced',
      purpose: 'Everything else: port, gitRepo, libraries, projects, telemetry. Syncs across machines via git.',
      color: '#8b5cf6',
    },
    {
      name: 'Machine Config',
      location: '<hubPath>/.local-config.json',
      scope: 'Gitignored',
      purpose: 'Machine-specific library paths for Vite aliases. Created during setup, read by vite.config.js.',
      color: '#06b6d4',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-white flex items-center gap-2">
        <Layers className="w-4 h-4 text-indigo-400" />
        Two-Layer Config Architecture
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed">
        The skill uses a layered config to make the entire setup portable. Clone the hub repo on a new machine,
        point the skill at it, and all your research, settings, and library connections are instantly available.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {layers.map((layer) => (
          <div key={layer.name} className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
              <span className="text-sm font-semibold text-white">{layer.name}</span>
            </div>
            <code className="text-[10px] text-gray-500 font-mono block mb-2 break-all">{layer.location}</code>
            <span className="inline-block text-[9px] font-medium px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: layer.color + '15', color: layer.color, border: `1px solid ${layer.color}30` }}>
              {layer.scope}
            </span>
            <p className="text-xs text-gray-400 leading-relaxed">{layer.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectStructure() {
  const tree = [
    { indent: 0, name: '<hubPath>/', type: 'dir', note: 'e.g., ~/git/personal-research-hub/' },
    { indent: 1, name: 'package.json', type: 'file', note: 'React + Recharts + Tailwind + Lucide' },
    { indent: 1, name: 'vite.config.js', type: 'file', note: 'Reads .local-config.json for library aliases' },
    { indent: 1, name: 'hub-config.json', type: 'file', note: 'Portable config — projects, libraries, telemetry' },
    { indent: 1, name: 'src/', type: 'dir', note: '' },
    { indent: 2, name: 'App.jsx', type: 'file', note: 'Hub shell: two-section sidebar + project routing' },
    { indent: 2, name: 'components/', type: 'dir', note: '' },
    { indent: 3, name: 'HubHome.jsx', type: 'file', note: 'Landing page with project cards + public library' },
    { indent: 2, name: 'projects/', type: 'dir', note: 'All research projects live here' },
    { indent: 3, name: 'index.js', type: 'file', note: 'Project registry: imports + metadata + telemetry' },
    { indent: 3, name: '<slug>/', type: 'dir', note: 'One directory per research project' },
    { indent: 4, name: 'App.jsx', type: 'file', note: 'Project\'s own App with internal sidebar nav' },
    { indent: 4, name: 'components/', type: 'dir', note: 'Overview.jsx, Sources.jsx, section components' },
    { indent: 4, name: 'data/', type: 'dir', note: 'researchData.js — all data as ES module exports' },
    { indent: 2, name: 'local-projects/', type: 'dir', note: 'Machine-local projects (gitignored)' },
  ];

  return (
    <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
      <h3 className="text-sm font-semibold text-white mb-3">Hub Directory Structure</h3>
      <div className="font-mono text-[11px] space-y-0.5">
        {tree.map((item, i) => (
          <div key={i} className="flex items-center gap-2" style={{ paddingLeft: `${item.indent * 16}px` }}>
            <span className={item.type === 'dir' ? 'text-blue-400' : 'text-gray-400'}>
              {item.type === 'dir' ? '📁' : '📄'}
            </span>
            <span className={item.type === 'dir' ? 'text-blue-300' : 'text-gray-300'}>{item.name}</span>
            {item.note && <span className="text-gray-600 text-[10px]">— {item.note}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScaffoldLayer() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">The Scaffold Layer</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          The Research Hub starts as a scaffold — a set of verbatim templates that create a complete web application.
          Each research project then builds into this scaffold, adding its own components, data, and registry entry.
          The scaffold never changes; the projects accumulate.
        </p>
      </div>

      <InsightCallout variant="technical" title="SCAFFOLD PHILOSOPHY">
        The hub scaffold is designed to be <strong>written once and never modified</strong>. When the skill creates
        a new research project, it only touches three things: (1) creates a new directory under <code className="text-cyan-400">src/projects/</code>,
        (2) adds an entry to <code className="text-cyan-400">index.js</code>, and (3) updates <code className="text-cyan-400">hub-config.json</code>.
        The App.jsx, HubHome.jsx, and all hub infrastructure remain untouched. This means the 50th project
        installs exactly as cleanly as the 1st.
      </InsightCallout>

      <ConfigLayers />

      <div>
        <h3 className="text-base font-semibold text-white mb-4">From Prompt to Dashboard — The Evolution</h3>
        <EvolutionTimeline />
      </div>

      <ProjectStructure />

      <InsightCallout variant="story" title="THE KEY INSIGHT">
        The scaffold layer solves a real problem: without it, every research project would be a standalone Vite app
        requiring its own <code className="text-cyan-400">npm install</code>, its own dev server, its own port. With 5+ projects,
        that's unmanageable. The hub consolidates everything into one app, one install, one port. New research
        appears instantly via Vite HMR — no restart needed.
      </InsightCallout>
    </div>
  );
}
