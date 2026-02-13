import React from 'react';
import { Zap, Search, BookOpen, BarChart3, Database, FileText, Clock, Sparkles, Brain } from 'lucide-react';
import { skillMeta, aggregateStats, lensTypes } from '../data/showcaseData';
import InsightCallout from './InsightCallout';

function StatCard({ icon: Icon, value, label, highlight }) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl border ${highlight ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-gray-800/30 border-gray-700/50'}`}>
      <Icon className={`w-5 h-5 mb-2 ${highlight ? 'text-emerald-400' : 'text-indigo-400'}`} />
      <span className={`text-2xl font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
      <span className="text-[11px] text-gray-500 mt-1 text-center">{label}</span>
    </div>
  );
}

export default function Overview() {
  const s = aggregateStats;
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{skillMeta.name}</h1>
            <p className="text-xs text-gray-500">v{skillMeta.version} · by {skillMeta.author}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-3xl">
          {skillMeta.description} This showcase uses <strong className="text-white">real telemetry data</strong> from {s.totalProjects} projects
          built with the skill to demonstrate its capabilities, architecture, and the diversity of dashboards it produces.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard icon={Zap} value={`${s.totalHoursSaved.toFixed(0)}h`} label="Hours Saved" highlight />
        <StatCard icon={Clock} value={`${Math.round(s.totalBuildMinutes / 60)}h ${s.totalBuildMinutes % 60}m`} label="Total AI Build Time" />
        <StatCard icon={Search} value={s.totalSearches} label="Web Searches" />
        <StatCard icon={BookOpen} value={s.totalSources} label="Sources Cited" />
        <StatCard icon={BarChart3} value={s.totalCharts} label="Charts Built" />
        <StatCard icon={Database} value={s.totalDataPoints.toLocaleString()} label="Data Points" />
        <StatCard icon={FileText} value={s.totalFiles} label="Files Generated" />
        <StatCard icon={Brain} value={s.fkRange} label="FK Grade Range" />
        <StatCard icon={Sparkles} value={s.totalSections} label="Sections Built" />
        <StatCard icon={FileText} value={s.totalWords.toLocaleString()} label="Total Words" />
      </div>

      <InsightCallout variant="story" title="THE PITCH">
        You give it a topic in plain English — <em>"Help me pick a chainsaw for property maintenance"</em> or{' '}
        <em>"Build a solar system explorer for my 7-year-old"</em> — and it autonomously researches, discovers dimensions
        you didn't think to ask for, gathers data from dozens of sources, selects the right visualizations, and delivers
        a fully interactive React dashboard. Across {s.totalProjects} projects, it has saved an estimated{' '}
        <strong className="text-emerald-400">{s.totalHoursSaved.toFixed(0)} hours</strong> of manual research and development work.
      </InsightCallout>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Research Lenses</h2>
        <p className="text-sm text-gray-400 mb-4">
          The skill classifies every topic into one or more research lenses that drive which dimensions, metrics, and dashboard sections get built.
          Most topics combine 2-3 lenses. The Product/Purchase lens is special — it activates an entirely different template.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lensTypes.map((lens) => (
            <div key={lens.key} className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lens.color }} />
                <span className="text-sm font-semibold text-white">{lens.name}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{lens.description}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="technical" title="HOW IT WORKS">
        The skill runs an 8-phase pipeline: <strong>Environment Check → Interpret → Survey → Discover → Research → Analyze → Build → Present</strong>.
        The only required user interaction is a lightweight checkpoint after Phase 3 (Discover) where the agent presents its research plan.
        Everything else — from subgroup discovery to chart selection to telemetry computation — is fully autonomous.
      </InsightCallout>
    </div>
  );
}
