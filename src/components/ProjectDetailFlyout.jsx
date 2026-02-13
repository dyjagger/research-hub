import React, { useState, useEffect } from 'react';
import {
  X, Clock, Search, BookOpen, BarChart3, FileText, Database, Package,
  Zap, GraduationCap, Brain, Eye, Timer, ChevronDown, ChevronUp,
  Sparkles, Activity, Target, Gauge, Type, Focus,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import {
  computeDerivedMetrics, DERIVED_METRIC_META, PHASE_COLORS, PHASE_LABELS, PHASE_ORDER,
  getPhaseTimingData, getProductionHoursData, getConsumptionData, getBuildProfileData,
  BLOOMS_LABELS, BLOOMS_COLORS, formatDuration, formatHours,
} from './telemetryUtils';

const LENS_BADGES = {
  standard: { label: 'Research', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  product: { label: 'Product Compare', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
};

const EFFICIENCY_ICONS = {
  buildEfficiency: Activity,
  researchDensity: Target,
  sourceEfficiency: BookOpen,
  valuePerMinute: Zap,
  textToVisualRatio: Type,
  phaseConcentration: Focus,
};

function Section({ title, children, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, className = '' }) {
  return (
    <div className={`p-3 rounded-lg border border-gray-700/50 bg-gray-800/30 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm font-semibold text-gray-200">{value}</div>
      {sub && <div className="text-[10px] text-gray-600 mt-0.5">{sub}</div>}
    </div>
  );
}

function PhaseTimeline({ phaseTiming, durationMinutes }) {
  const data = getPhaseTimingData(phaseTiming);
  const total = durationMinutes || data.reduce((s, d) => s + d.minutes, 0);
  return (
    <div className="space-y-2">
      <div className="flex h-8 rounded-lg overflow-hidden border border-gray-700/50">
        {data.map(d => {
          const pct = total > 0 ? (d.minutes / total) * 100 : 0;
          if (pct < 1) return null;
          return (
            <div
              key={d.phase}
              className="relative group flex items-center justify-center text-[9px] font-bold text-white/90 transition-all hover:brightness-110"
              style={{ width: `${pct}%`, backgroundColor: d.color, minWidth: pct > 3 ? undefined : '12px' }}
              title={`${d.label}: ${d.minutes}m (${pct.toFixed(0)}%)`}
            >
              {pct > 8 && <span>{d.label}</span>}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {data.filter(d => d.minutes > 0).map(d => (
          <div key={d.phase} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] text-gray-500">{d.label} {d.minutes}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildProfileRadar({ telemetry, allProjects }) {
  const data = getBuildProfileData(telemetry, allProjects);
  if (data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 10 }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return (
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-xs font-medium text-white">{d.metric}</p>
                <p className="text-[11px] text-gray-400">{d.raw} ({d.value}% of max)</p>
              </div>
            );
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

function HoursSavedChart({ hoursSaved }) {
  const data = getProductionHoursData(hoursSaved);
  if (data.length === 0) return null;
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
        <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
        <YAxis type="category" dataKey="label" tick={{ fill: '#9ca3af', fontSize: 10 }} width={110} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-xs text-white">{payload[0].payload.label}: <strong>{payload[0].value}h</strong></p>
              </div>
            );
          }}
        />
        <Bar dataKey="hours" radius={[0, 4, 4, 0]} fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ConsumptionBar({ consumptionTime }) {
  const data = getConsumptionData(consumptionTime);
  if (data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.minutes, 0);
  return (
    <div className="space-y-2">
      <div className="flex h-6 rounded-lg overflow-hidden border border-gray-700/50">
        {data.map(d => {
          const pct = total > 0 ? (d.minutes / total) * 100 : 0;
          return (
            <div
              key={d.key}
              className="flex items-center justify-center text-[9px] font-medium text-white/80"
              style={{ width: `${pct}%`, backgroundColor: d.color, minWidth: '20px' }}
              title={`${d.label}: ${d.minutes.toFixed(1)}m`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {data.map(d => (
          <div key={d.key} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] text-gray-500">{d.label} {d.minutes.toFixed(1)}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentAnalysis({ contentAnalysis }) {
  const ca = contentAnalysis;
  if (!ca) return null;
  const bloomColor = BLOOMS_COLORS[ca.bloomsLevel] || '#9ca3af';
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/30">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Reading Level</span>
          </div>
          <div className="text-sm font-semibold text-gray-200">{ca.fleschKincaidLabel || `Grade ${ca.fleschKincaidGrade}`}</div>
          <div className="text-[10px] text-gray-600">FK {ca.fleschKincaidGrade}</div>
        </div>
        <div className="p-3 rounded-lg border border-gray-700/50 bg-gray-800/30">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-3.5 h-3.5" style={{ color: bloomColor }} />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Cognitive Depth</span>
          </div>
          <div className="text-sm font-semibold" style={{ color: bloomColor }}>{ca.bloomsLabel}</div>
          {ca.bloomsRange && <div className="text-[10px] text-gray-600">{ca.bloomsRange}</div>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={FileText} label="Words" value={(ca.totalWords || 0).toLocaleString()} sub={ca.totalSentences ? `${ca.totalSentences} sentences` : null} />
        <StatCard icon={Eye} label="Consumption" value={null} />
      </div>
      {ca.readabilityNote && (
        <p className="text-[11px] text-gray-500 italic leading-relaxed">{ca.readabilityNote}</p>
      )}
    </div>
  );
}

function EfficiencyScores({ telemetry }) {
  const derived = computeDerivedMetrics(telemetry);
  if (!derived) return null;
  return (
    <div className="grid grid-cols-2 gap-2">
      {DERIVED_METRIC_META.map(m => {
        const Icon = EFFICIENCY_ICONS[m.key] || Gauge;
        const val = derived[m.key];
        return (
          <div key={m.key} className="p-2.5 rounded-lg border border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className="w-3 h-3 text-indigo-400" />
              <span className="text-[10px] text-gray-500">{m.label}</span>
            </div>
            <div className="text-sm font-semibold text-gray-200">{val != null ? val : '—'}</div>
            <div className="text-[9px] text-gray-600">{m.unit}</div>
          </div>
        );
      })}
    </div>
  );
}

function DataQuality({ telemetry }) {
  const dist = telemetry?.dataQualityDistribution;
  const diversity = telemetry?.sourceDiversityScore;
  if (!dist && diversity == null) return null;

  const tiers = dist ? [
    { key: 't1', label: 'T1 Gold', count: dist.t1 || 0, color: '#22c55e' },
    { key: 't2', label: 'T2 Silver', count: dist.t2 || 0, color: '#60a5fa' },
    { key: 't3', label: 'T3 Bronze', count: dist.t3 || 0, color: '#fb923c' },
    { key: 't4', label: 'T4 Estimate', count: dist.t4 || 0, color: '#ef4444' },
  ] : [];
  const total = tiers.reduce((s, t) => s + t.count, 0);

  return (
    <div className="space-y-3">
      {tiers.length > 0 && total > 0 && (
        <>
          <div className="flex h-5 rounded-lg overflow-hidden border border-gray-700/50">
            {tiers.map(t => {
              const pct = (t.count / total) * 100;
              if (pct < 1) return null;
              return (
                <div
                  key={t.key}
                  className="flex items-center justify-center text-[8px] font-bold text-white/80"
                  style={{ width: `${pct}%`, backgroundColor: t.color }}
                  title={`${t.label}: ${t.count} (${pct.toFixed(0)}%)`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tiers.filter(t => t.count > 0).map(t => (
              <div key={t.key} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-[10px] text-gray-500">{t.label}: {t.count}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {diversity != null && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Source Diversity:</span>
          <span className="text-xs font-semibold text-gray-300">{(diversity * 100).toFixed(0)}%</span>
          <span className="text-[10px] text-gray-600">unique domains / total sources</span>
        </div>
      )}
    </div>
  );
}

function ResearchPlan({ plan }) {
  const [expanded, setExpanded] = useState(false);
  if (!plan) return null;
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {expanded ? 'Collapse' : 'Expand'} Research Plan
      </button>
      {expanded && (
        <pre className="mt-2 p-3 rounded-lg border border-gray-700/50 bg-gray-800/30 text-[11px] text-gray-400 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {plan}
        </pre>
      )}
    </div>
  );
}

export default function ProjectDetailFlyout({ project, allProjects, onClose }) {
  const t = project?.telemetry;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  const badge = LENS_BADGES[project.lens] || LENS_BADGES.standard;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-gray-950 border-l border-gray-800 shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur border-b border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-white truncate">{project.title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{project.subtitle}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0 ml-3">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
              {badge.label}
            </span>
            {t?.skillVersion && <span className="text-[10px] text-gray-600">v{t.skillVersion}</span>}
            {t?.model && <span className="text-[10px] text-gray-600">{t.model}</span>}
            {project.createdAt && <span className="text-[10px] text-gray-600">{new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
            {t?.includedSetup && (
              <span className="inline-flex items-center px-1.5 py-0 rounded text-[9px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">setup</span>
            )}
          </div>
          {t?.userPrompt && (
            <p className="text-[11px] text-gray-500 mt-2 italic leading-relaxed line-clamp-3">"{t.userPrompt}"</p>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-8">
          {/* Quick stats row */}
          {t && (
            <div className="grid grid-cols-3 gap-2">
              <StatCard icon={Timer} label="Build Time" value={formatDuration(t.durationMinutes)} />
              <StatCard icon={Zap} label="Hours Saved" value={formatHours(t.hoursSaved?.totalHoursSaved)} sub={t.hoursSaved?.equivalentLabel} />
              <StatCard icon={Eye} label="Read Time" value={t.consumptionTime?.estimatedLabel || formatDuration(t.consumptionTime?.estimatedMinutes)} />
            </div>
          )}

          {/* Phase Timeline */}
          {t?.phaseTiming && (
            <Section title="Phase Timeline">
              <PhaseTimeline phaseTiming={t.phaseTiming} durationMinutes={t.durationMinutes} />
            </Section>
          )}

          {/* Build Profile Radar */}
          {t && (
            <Section title="Build Profile">
              <div className="p-3 rounded-xl border border-gray-700/50 bg-gray-800/20">
                <BuildProfileRadar telemetry={t} allProjects={allProjects} />
              </div>
            </Section>
          )}

          {/* Hours Saved Breakdown */}
          {t?.hoursSaved?.productionHours && (
            <Section title="Hours Saved by Output Format">
              <div className="p-3 rounded-xl border border-gray-700/50 bg-gray-800/20">
                <HoursSavedChart hoursSaved={t.hoursSaved} />
              </div>
              {t.hoursSaved.researchHours && (
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <Search className="w-3 h-3" />
                  <span>Research alone: <strong className="text-gray-400">{t.hoursSaved.researchHours}h</strong></span>
                </div>
              )}
            </Section>
          )}

          {/* Content Analysis */}
          {t?.contentAnalysis && (
            <Section title="Content Analysis">
              <ContentAnalysis contentAnalysis={t.contentAnalysis} />
            </Section>
          )}

          {/* Consumption Breakdown */}
          {t?.consumptionTime && (
            <Section title="Consumption Breakdown">
              <ConsumptionBar consumptionTime={t.consumptionTime} />
            </Section>
          )}

          {/* Efficiency Scores */}
          {t && (
            <Section title="Efficiency Metrics">
              <EfficiencyScores telemetry={t} />
            </Section>
          )}

          {/* Data Quality */}
          {(t?.dataQualityDistribution || t?.sourceDiversityScore != null) && (
            <Section title="Data Quality">
              <DataQuality telemetry={t} />
            </Section>
          )}

          {/* Build Stats Grid */}
          {t && (
            <Section title="Build Stats">
              <div className="grid grid-cols-3 gap-2">
                <StatCard icon={Search} label="Searches" value={t.searchesPerformed} />
                <StatCard icon={BookOpen} label="Sources" value={t.sourcesCount} />
                <StatCard icon={BarChart3} label="Charts" value={t.chartsBuilt} />
                <StatCard icon={FileText} label="Sections" value={t.sectionsBuilt} />
                <StatCard icon={Database} label="Data Points" value={(t.dataPointsCollected || 0).toLocaleString()} />
                <StatCard icon={FileText} label="Files" value={t.filesGenerated} />
                {t.productsCompared && <StatCard icon={Package} label="Products" value={t.productsCompared} />}
              </div>
            </Section>
          )}

          {/* Research Plan */}
          {t?.researchPlan && (
            <Section title="Research Plan">
              <ResearchPlan plan={t.researchPlan} />
            </Section>
          )}
        </div>
      </div>
    </>
  );
}
