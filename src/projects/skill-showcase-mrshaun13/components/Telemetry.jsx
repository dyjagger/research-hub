import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, ZAxis, CartesianGrid,
} from 'recharts';
import { realProjectTelemetry, telemetryFields, hoursSavedFormulas, consumptionFormulas, aggregateStats } from '../data/showcaseData';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';

const PROJECT_COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#3b82f6', '#ef4444'];

function TelemetryFieldsTable() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-white">What Gets Collected</h3>
      <p className="text-xs text-gray-400 leading-relaxed">
        Every field is computed in Phase 7 after the dashboard is built. Nothing is estimated upfront — all
        telemetry reflects the actual build. The full schema has 30+ fields across 6 categories.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {telemetryFields.map((cat) => (
          <div key={cat.category} className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <h4 className="text-sm font-semibold text-indigo-400 mb-2">{cat.category}</h4>
            <div className="space-y-1">
              {cat.fields.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-indigo-500 text-[10px] mt-0.5">▸</span>
                  <code className="text-[11px] text-gray-400 font-mono">{f}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HoursSavedChart() {
  const data = realProjectTelemetry.map((p, i) => ({
    name: p.shortName,
    hours: p.totalHoursSaved,
    fill: PROJECT_COLORS[i],
  }));

  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-1">Hours Saved Per Project</h3>
      <p className="text-xs text-gray-500 mb-3">
        Estimated equivalent manual effort (research + interactive dashboard production).
        Total across all projects: <strong className="text-emerald-400">{aggregateStats.totalHoursSaved.toFixed(0)}h</strong>.
      </p>
      <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={{ stroke: '#374151' }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={{ stroke: '#374151' }} />
            <Tooltip content={<CustomTooltip formatter={(v) => `${v}h saved`} />} />
            <Bar dataKey="hours" name="Hours Saved" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ContentAnalysisChart() {
  const data = realProjectTelemetry.map((p, i) => ({
    name: p.shortName,
    fkGrade: p.fkGrade,
    bloomsLevel: p.bloomsLevel,
    words: p.totalWords,
    consumption: p.consumptionMinutes,
    fill: PROJECT_COLORS[i],
  }));

  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-1">Content Analysis: Reading Level vs Cognitive Depth</h3>
      <p className="text-xs text-gray-500 mb-3">
        Each project targets a different audience. The Solar System Explorer writes at 3rd grade for a 7-year-old;
        the AI Tooling dashboard writes at 11th grade for developers. Bubble size = word count.
      </p>
      <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              type="number"
              dataKey="fkGrade"
              name="FK Grade"
              domain={[2, 12]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={{ stroke: '#374151' }}
              label={{ value: 'Flesch-Kincaid Grade Level', position: 'bottom', offset: 0, fill: '#6b7280', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="bloomsLevel"
              name="Bloom's Level"
              domain={[1, 6]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={{ stroke: '#374151' }}
              ticks={[1, 2, 3, 4, 5, 6]}
              label={{ value: "Bloom's Taxonomy", angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="words" range={[200, 800]} name="Words" />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-sm font-medium text-white">{d.name}</p>
                    <p className="text-xs text-gray-400">FK Grade: {d.fkGrade}</p>
                    <p className="text-xs text-gray-400">Bloom's: {d.bloomsLevel} ({realProjectTelemetry.find(p => p.shortName === d.name)?.bloomsLabel})</p>
                    <p className="text-xs text-gray-400">Words: {d.words.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Read time: ~{d.consumption} min</p>
                  </div>
                );
              }}
            />
            <Scatter data={data}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} fillOpacity={0.8} stroke={entry.fill} strokeWidth={1} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {realProjectTelemetry.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PROJECT_COLORS[i] }} />
              <span className="text-[10px] text-gray-500">{p.shortName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuildMetricsRadar() {
  const maxVals = {
    searches: Math.max(...realProjectTelemetry.map(p => p.searchesPerformed)),
    sources: Math.max(...realProjectTelemetry.map(p => p.sourcesCount)),
    sections: Math.max(...realProjectTelemetry.map(p => p.sectionsBuilt)),
    charts: Math.max(...realProjectTelemetry.map(p => p.chartsBuilt)),
    files: Math.max(...realProjectTelemetry.map(p => p.filesGenerated)),
    dataPoints: Math.max(...realProjectTelemetry.map(p => p.dataPointsCollected)),
  };

  const data = [
    { metric: 'Searches', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.searchesPerformed / maxVals.searches) * 100)])) },
    { metric: 'Sources', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.sourcesCount / maxVals.sources) * 100)])) },
    { metric: 'Sections', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.sectionsBuilt / maxVals.sections) * 100)])) },
    { metric: 'Charts', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.chartsBuilt / maxVals.charts) * 100)])) },
    { metric: 'Files', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.filesGenerated / maxVals.files) * 100)])) },
    { metric: 'Data Pts', ...Object.fromEntries(realProjectTelemetry.map(p => [p.shortName, Math.round((p.dataPointsCollected / maxVals.dataPoints) * 100)])) },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-1">Build Metrics Comparison</h3>
      <p className="text-xs text-gray-500 mb-3">
        Normalized to percentage of max across all projects. Shows how each project's build profile differs.
      </p>
      <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            {realProjectTelemetry.map((p, i) => (
              <Radar
                key={p.shortName}
                name={p.shortName}
                dataKey={p.shortName}
                stroke={PROJECT_COLORS[i]}
                fill={PROJECT_COLORS[i]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {realProjectTelemetry.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PROJECT_COLORS[i] }} />
              <span className="text-[10px] text-gray-500">{p.shortName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormulasSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-base font-semibold text-white mb-3">Hours Saved Formulas</h3>
        <p className="text-xs text-gray-400 mb-3">
          Estimates the equivalent manual effort across 7 output formats. The total uses research + interactive dashboard.
        </p>
        <div className="space-y-2">
          {hoursSavedFormulas.map((f) => (
            <div key={f.name} className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
              <div className="text-xs font-semibold text-indigo-400 mb-1">{f.name}</div>
              <code className="text-[11px] text-gray-400 font-mono">{f.formula}</code>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-white mb-3">Consumption Time Formulas</h3>
        <p className="text-xs text-gray-400 mb-3">
          Estimates how long a human reader would need to fully consume the dashboard content.
        </p>
        <div className="space-y-2">
          {consumptionFormulas.map((f) => (
            <div key={f.name} className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
              <div className="text-xs font-semibold text-emerald-400 mb-1">{f.name}</div>
              <code className="text-[11px] text-gray-400 font-mono">{f.formula}</code>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-base font-semibold text-white mb-3">Content Analysis</h3>
          <p className="text-xs text-gray-400 mb-3">
            Readability and cognitive depth are measured after the dashboard is built.
          </p>
          <div className="space-y-2">
            <div className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
              <div className="text-xs font-semibold text-amber-400 mb-1">Flesch-Kincaid Grade</div>
              <code className="text-[11px] text-gray-400 font-mono">0.39 × (words/sentences) + 11.8 × (syllables/words) − 15.59</code>
            </div>
            <div className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
              <div className="text-xs font-semibold text-amber-400 mb-1">Bloom's Taxonomy Level</div>
              <p className="text-[11px] text-gray-400">
                Assigned based on dominant content type: data tables → Remember (1), comparative charts → Analyze (4),
                recommendations → Evaluate (5). The level covering &gt;50% of content wins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Telemetry() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Telemetry & Analytics</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Every research project automatically collects detailed telemetry about its creation. This data powers
          the project cards in the hub, enables cross-project comparisons, and provides transparency about
          how the AI spent its time and what it produced.
        </p>
      </div>

      <InsightCallout variant="insight" title="WHY TELEMETRY MATTERS">
        Telemetry isn't just metadata — it's <strong>accountability</strong>. Every project card shows exactly how many
        searches were performed, how many sources were cited, what reading level the content targets, and how long
        a human would need to consume it. When a project claims "~2.5 weeks of manual work saved," the formula
        is transparent and based on real build metrics, not marketing estimates.
      </InsightCallout>

      <TelemetryFieldsTable />
      <HoursSavedChart />
      <ContentAnalysisChart />
      <BuildMetricsRadar />
      <FormulasSection />

      <InsightCallout variant="highlight">
        The telemetry is also used for <strong>validation</strong> when sharing to the public library. The server-side
        validation script checks that telemetry fields are present, values are in sane ranges, and the content
        analysis shows real substance (minimum 500 words, 3+ sources, 3+ searches). This prevents empty or
        placeholder projects from being accepted.
      </InsightCallout>
    </div>
  );
}
