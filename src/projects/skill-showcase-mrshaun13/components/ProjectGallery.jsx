import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projectShowcases } from '../data/showcaseData';
import InsightCallout from './InsightCallout';

const ACCENT_COLORS = {
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', gradient: 'from-red-900/40 to-red-950/20' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-900/40 to-blue-950/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', gradient: 'from-violet-900/40 to-violet-950/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', gradient: 'from-amber-900/40 to-amber-950/20' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', gradient: 'from-indigo-900/40 to-indigo-950/20' },
};

function ScreenshotPlaceholder({ project, isExpanded }) {
  const accent = ACCENT_COLORS[project.accentColor] || ACCENT_COLORS.indigo;
  return (
    <div className={`relative rounded-xl border ${accent.border} bg-gradient-to-br ${accent.gradient} overflow-hidden ${isExpanded ? 'aspect-[16/10]' : 'aspect-video'}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${accent.text}`}>
          📸 Screenshot
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-md">
          {project.screenshotAlt}
        </p>
        <p className="text-[10px] text-gray-600 mt-3">
          assets/{project.screenshotFile}
        </p>
      </div>
      <div className="absolute top-3 right-3">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
          {project.category}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, isSelected, onClick }) {
  const accent = ACCENT_COLORS[project.accentColor] || ACCENT_COLORS.indigo;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        isSelected
          ? `${accent.bg} ${accent.border} shadow-lg`
          : 'bg-gray-800/20 border-gray-700/50 hover:bg-gray-800/40 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className={`font-semibold text-sm ${isSelected ? accent.text : 'text-gray-200'}`}>
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{project.subtitle}</p>
        </div>
        <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${isSelected ? `${accent.text} translate-x-0.5` : 'text-gray-600'}`} />
      </div>
      {isSelected && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.lens && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
              {project.lens}
            </span>
          )}
          {project.fkGrade && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
              {project.fkGrade}
            </span>
          )}
          {project.bloomsLabel && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
              {project.bloomsLabel}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default function ProjectGallery() {
  const [selected, setSelected] = useState(0);
  const project = projectShowcases[selected];
  const accent = ACCENT_COLORS[project.accentColor] || ACCENT_COLORS.indigo;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Project Gallery</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          The same skill produces radically different dashboards depending on the topic. From TV show analytics
          to kids' educational content to product purchase decisions — each project adapts its structure,
          reading level, visualization choices, and interaction patterns to match the subject matter.
        </p>
      </div>

      <InsightCallout variant="highlight" title="STYLE DIVERSITY">
        These five projects span <strong>3rd grade to 11th grade</strong> reading levels, use Bloom's Taxonomy
        levels from <strong>Apply to Evaluate</strong>, and include everything from spoiler-gated episode
        progression to at-home science experiments to purchase links with live pricing. The skill doesn't
        have a fixed template — it discovers what each topic needs and builds accordingly.
      </InsightCallout>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {projectShowcases.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              isSelected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <ScreenshotPlaceholder project={project} isExpanded />

          <div className={`p-5 rounded-xl border ${accent.border} ${accent.bg}`}>
            <h3 className={`font-semibold text-base ${accent.text} mb-1`}>{project.title}</h3>
            <p className="text-xs text-gray-400 mb-4">{project.style}</p>

            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-xs mt-0.5 ${accent.text}`}>▸</span>
                  <span className="text-sm text-gray-300">{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-700/30">
              {project.lens && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${accent.border} ${accent.text}`}>
                  {project.lens === 'product' ? 'Product Compare' : 'Research'}
                </span>
              )}
              {project.fkGrade && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-600 text-gray-400">
                  📖 {project.fkGrade}
                </span>
              )}
              {project.bloomsLabel && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-600 text-gray-400">
                  🧠 {project.bloomsLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
