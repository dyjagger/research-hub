import React from 'react';
import { ExternalLink, Github, FileText, BookOpen } from 'lucide-react';
import { skillMeta } from '../data/showcaseData';

function SourceLink({ icon: Icon, title, url, description }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/20 hover:bg-gray-800/40 hover:border-gray-600 transition-all group"
    >
      <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-200 group-hover:text-white flex items-center gap-1.5">
          {title}
          <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-gray-400" />
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </a>
  );
}

export default function Sources() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Sources & References</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          This showcase is built using real data from the research-visualizer skill and its associated repositories.
          All telemetry data comes from actual research projects built with the skill.
        </p>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-3">Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SourceLink
            icon={Github}
            title="research-visualizer"
            url={skillMeta.repoUrl}
            description="The skill definition — SKILL.md, reference docs, scaffold templates, and architecture documentation."
          />
          <SourceLink
            icon={Github}
            title="personal-research-hub"
            url={skillMeta.hubRepoUrl}
            description="Personal Research Hub — the web application hosting all research dashboards including this showcase."
          />
          <SourceLink
            icon={Github}
            title="research-hub (Public Library)"
            url={skillMeta.libraryRepoUrl}
            description="Community Research Hub — public library with automated validation, contribution workflow, and GitHub Actions."
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-3">Key Reference Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SourceLink
            icon={FileText}
            title="SKILL.md"
            url={`${skillMeta.repoUrl}/blob/main/SKILL.md`}
            description="Complete skill definition — 8-phase pipeline, product lens, hub integration, telemetry schema."
          />
          <SourceLink
            icon={FileText}
            title="hub-architecture.md"
            url={`${skillMeta.repoUrl}/blob/main/references/hub-architecture.md`}
            description="Hub architecture — config schema, directory structure, git sync, community library, security model."
          />
          <SourceLink
            icon={FileText}
            title="hub-scaffold-templates.md"
            url={`${skillMeta.repoUrl}/blob/main/references/hub-scaffold-templates.md`}
            description="Verbatim scaffold templates — App.jsx, HubHome.jsx, package.json, Vite config, and all hub infrastructure."
          />
          <SourceLink
            icon={FileText}
            title="product-comparison-template.md"
            url={`${skillMeta.repoUrl}/blob/main/references/product-comparison-template.md`}
            description="Product lens template — lifecycle classification, section selection, component patterns, data schemas."
          />
          <SourceLink
            icon={FileText}
            title="process-contributions.yml"
            url={`${skillMeta.libraryRepoUrl}/blob/main/.github/workflows/process-contributions.yml`}
            description="GitHub Action workflow — automated validation, build test, and auto-merge for community contributions."
          />
          <SourceLink
            icon={FileText}
            title="validate-research-project.mjs"
            url={`${skillMeta.libraryRepoUrl}/blob/main/.github/scripts/validate-research-project.mjs`}
            description="Validation script — 40+ checks across structure, registry, telemetry, content quality, and product lens."
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-3">Data Sources</h3>
        <div className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
          <p className="text-sm text-gray-400 leading-relaxed">
            All telemetry data in this showcase comes from <strong className="text-white">real research projects</strong> built
            with the research-visualizer skill between February 10-12, 2026. The 5 projects analyzed are:
          </p>
          <div className="mt-3 space-y-1.5">
            {[
              'AI Developer Tooling Adoption — standard research lens, v5.1',
              'Pixel 9 Pro Upgrade Analysis — product lens, v5.1',
              'Career Pivot Explorer — standard research lens, v6.1',
              'Solar System Explorer — standard research lens (educational), v6.1',
              'The Traitors S3 Analytics — standard research lens (entertainment), v6.2',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <BookOpen className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-gray-700/50 bg-gray-800/20">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Methodology & Limitations</h3>
        <div className="space-y-2 text-xs text-gray-500 leading-relaxed">
          <p>
            <strong className="text-gray-400">Hours saved estimates</strong> use deterministic formulas based on build metrics
            (sections, charts, files, sources, data points). These estimate equivalent manual effort, not actual time saved —
            the real value depends on the researcher's skill level and the topic's complexity.
          </p>
          <p>
            <strong className="text-gray-400">Content analysis</strong> (Flesch-Kincaid, Bloom's Taxonomy) is computed by
            analyzing all text content in the built dashboard. FK grade uses the standard formula; Bloom's level is assigned
            based on the dominant content type across all sections.
          </p>
          <p>
            <strong className="text-gray-400">Screenshots</strong> in the Project Gallery section are placeholders.
            Real rendered screenshots can be added by placing PNG files in the project's assets/ directory.
          </p>
        </div>
      </div>
    </div>
  );
}
