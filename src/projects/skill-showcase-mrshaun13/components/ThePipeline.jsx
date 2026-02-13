import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { pipelinePhases, realProjectTelemetry } from '../data/showcaseData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

function PhaseCard({ phase, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-150 ${
        isSelected
          ? 'border-indigo-500/50 bg-indigo-500/10'
          : 'border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ backgroundColor: phase.color + '30', color: phase.color }}
        >
          {phase.number}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-200 truncate">{phase.name}</div>
          <div className="text-[10px] text-gray-500 truncate">{phase.shortName}</div>
        </div>
      </div>
    </button>
  );
}

function PipelineDiagram() {
  return (
    <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20 overflow-x-auto">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 font-semibold">Pipeline Flow</p>
      <div className="flex items-center gap-1 min-w-[600px]">
        {pipelinePhases.map((phase, i) => (
          <React.Fragment key={phase.id}>
            <div
              className="flex-1 py-2 px-2 rounded-lg text-center text-[10px] font-bold tracking-wide"
              style={{ backgroundColor: phase.color + '20', color: phase.color, border: `1px solid ${phase.color}40` }}
            >
              {phase.shortName}
            </div>
            {i < pipelinePhases.length - 1 && (
              <span className="text-gray-600 text-xs flex-shrink-0">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2 min-w-[600px]">
        <div className="flex-1 text-center">
          <span className="text-[9px] text-gray-600">↓ no hub?</span>
          <div className="text-[9px] text-indigo-400 mt-0.5">SETUP</div>
        </div>
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1 text-center">
          <span className="text-[9px] text-gray-600">↓ product?</span>
          <div className="text-[9px] text-amber-400 mt-0.5">CLASSIFY</div>
        </div>
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1" />
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1 text-center">
          <span className="text-[9px] text-gray-600">↓ checkpoint</span>
          <div className="text-[9px] text-emerald-400 mt-0.5">USER OK?</div>
        </div>
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1" />
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1" />
        <span className="text-transparent text-xs flex-shrink-0">→</span>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default function ThePipeline() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const phase = pipelinePhases[selectedPhase];

  const phaseTimingData = realProjectTelemetry.map((p) => ({
    name: p.shortName,
    ...p.phaseTiming,
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">The 8-Phase Pipeline</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Every research project flows through the same pipeline, but the pipeline adapts to each topic.
          The Product/Purchase lens triggers a specialized branch. The only required user interaction is a
          single checkpoint after Phase 3.
        </p>
      </div>

      <PipelineDiagram />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          {pipelinePhases.map((p, i) => (
            <PhaseCard
              key={p.id}
              phase={p}
              isSelected={selectedPhase === i}
              onClick={() => setSelectedPhase(i)}
            />
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="p-5 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: phase.color + '20', color: phase.color }}
              >
                {phase.number}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Phase {phase.number}: {phase.name}</h3>
                <p className="text-xs text-gray-500">{phase.description}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {phase.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: phase.color + '20', color: phase.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-3">Phase Timing Across Real Projects</h3>
        <p className="text-xs text-gray-500 mb-4">
          How each project spent its build time across the 8 phases. Notice how the Solar System Explorer
          spent most of its time in Build (160 min) due to its 14 sections and 22 interactive components.
        </p>
        <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={phaseTimingData} layout="vertical" margin={{ left: 80, right: 20, top: 10, bottom: 10 }}>
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#374151' }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip formatter={(v) => `${v} min`} />} />
              {pipelinePhases.map((p) => (
                <Bar key={p.id} dataKey={p.id} stackId="a" fill={p.color} name={p.name} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {pipelinePhases.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
                <span className="text-[10px] text-gray-500">{p.shortName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InsightCallout variant="insight">
        The pipeline is designed so that <strong>visualization decisions happen in Phase 5</strong> (Analyze) — after
        the data is gathered, not before. This means the same pipeline can produce a radar chart for career skill
        matching, a spoiler-gated episode timeline for TV analytics, or a product spec comparison table, all
        driven by the shape of the data rather than a fixed template.
      </InsightCallout>
    </div>
  );
}
