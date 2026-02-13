import React from 'react';
import { GitBranch, Shield, CheckCircle, XCircle, ArrowRight, Globe, Lock, Eye } from 'lucide-react';
import { contributionFlow } from '../data/showcaseData';
import InsightCallout from './InsightCallout';

function ArchitectureDiagram() {
  return (
    <div className="p-5 rounded-xl border border-gray-700/50 bg-gray-800/20 overflow-x-auto">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-4 font-semibold">Contribution Architecture</p>
      <div className="min-w-[600px] space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/5 text-center">
            <div className="text-xs font-semibold text-indigo-400">User's Personal Hub</div>
            <div className="text-[10px] text-gray-500 mt-0.5">~/git/personal-research-hub/</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-4 h-4 text-gray-500" />
            <span className="text-[9px] text-gray-600">git push</span>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-center">
            <div className="text-xs font-semibold text-emerald-400">Personal GitHub Repo</div>
            <div className="text-[10px] text-gray-500 mt-0.5">mrshaun13/personal-research-hub</div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-amber-500/30" />
              <span className="text-[9px] text-amber-400">GitHub API</span>
              <span className="text-[9px] text-gray-600">(blobs → tree → commit → ref)</span>
              <div className="w-px h-6 bg-amber-500/30" />
            </div>
          </div>
          <div className="flex-1" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 text-center">
            <div className="text-xs font-semibold text-amber-400">Public Library</div>
            <div className="text-[10px] text-gray-500 mt-0.5">mrshaun13/research-hub</div>
            <div className="text-[10px] text-amber-500/70 mt-0.5">→ agent-contributions branch</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="w-4 h-4 text-gray-500" />
            <span className="text-[9px] text-gray-600">triggers</span>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-rose-500/30 bg-rose-500/5 text-center">
            <div className="text-xs font-semibold text-rose-400">GitHub Action</div>
            <div className="text-[10px] text-gray-500 mt-1 space-y-0.5">
              <div>• Detect new projects</div>
              <div>• Validate structure & telemetry</div>
              <div>• Build test (vite build)</div>
              <div>• Auto-merge → main <em>or</em> Issue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentFlowSteps() {
  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <GitBranch className="w-4 h-4 text-amber-400" />
        Agent-Side: GitHub REST API Flow
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        The AI agent pushes contributions directly via the GitHub API — no local clone of the library needed.
        This works because the personal hub and public library are completely separate git repos.
      </p>
      <div className="space-y-2">
        {contributionFlow.agentSteps.map((s) => (
          <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
            <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] font-bold text-amber-400 flex-shrink-0">
              {s.step}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-200">{s.action}</div>
              <code className="text-[10px] text-gray-500 font-mono break-all">{s.api}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServerFlowSteps() {
  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        Server-Side: Automated Validation & Merge
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        When a push lands on <code className="text-amber-400">agent-contributions</code>, a GitHub Action runs automatically.
        Zero human intervention required for valid contributions.
      </p>
      <div className="space-y-2">
        {contributionFlow.serverSteps.map((s) => (
          <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-400 flex-shrink-0">
              {s.step}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-200">{s.action}</div>
              <p className="text-[11px] text-gray-500">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityModel() {
  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4 text-rose-400" />
        Security Model
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        Four layers of protection ensure only valid, substantive research enters the public library.
      </p>
      <div className="space-y-2">
        {contributionFlow.securityLayers.map((s) => (
          <div key={s.layer} className="flex items-start gap-3 p-3 rounded-lg border border-gray-700/50 bg-gray-800/20">
            <Lock className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-200">{s.layer}</div>
              <p className="text-[11px] text-gray-500">{s.protection}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValidationChecks() {
  const checks = [
    { category: 'Structure', items: ['App.jsx exists', 'components/ with Overview.jsx + Sources.jsx', 'data/ with substantial files (>200 bytes)'] },
    { category: 'Registry', items: ['All required fields present', 'Valid kebab-case slug', 'Valid lens type', 'ISO 8601 timestamps', 'Query ≥15 chars'] },
    { category: 'Telemetry', items: ['All 13+ required fields', 'Phase timing (all 8 phases)', 'Content analysis (FK grade, Bloom\'s, word count)', 'Hours saved with formulas', 'Consumption time estimates'] },
    { category: 'Content Quality', items: ['React imports present', 'JSX return statements', 'Chart/visualization library usage', 'ES module data exports', 'Total data >1KB'] },
    { category: 'Thresholds', items: ['≥3 searches performed', '≥3 sources cited', '≥3 sections built', '≥1 chart', '≥10 data points', '≥500 words'] },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-3">Validation Script Checks</h3>
      <p className="text-xs text-gray-400 mb-3">
        The <code className="text-cyan-400">validate-research-project.mjs</code> script runs 40+ individual checks
        across 5 categories. It outputs a markdown report with pass/fail/warning for each check.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {checks.map((cat) => (
          <div key={cat.category} className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <h4 className="text-sm font-semibold text-rose-400 mb-2">{cat.category}</h4>
            <div className="space-y-1">
              {cat.items.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisibilityTiers() {
  const tiers = [
    { name: 'Local', icon: Lock, color: '#6b7280', description: 'Machine-only. Stored in src/local-projects/, gitignored. Never leaves this computer.', badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
    { name: 'Personal', icon: Eye, color: '#8b5cf6', description: 'Synced via git to your personal repo. Available on all your machines. Not shared publicly.', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
    { name: 'Public', icon: Globe, color: '#10b981', description: 'Shared to the community library. Visible to anyone browsing the public hub. Validated before acceptance.', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-white mb-3">Visibility Tiers</h3>
      <p className="text-xs text-gray-400 mb-3">
        Every project has a visibility level that controls where it lives and who can see it.
        Default is "personal" — public sharing is always opt-in.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="p-4 rounded-xl border border-gray-700/50 bg-gray-800/20">
            <div className="flex items-center gap-2 mb-2">
              <tier.icon className="w-4 h-4" style={{ color: tier.color }} />
              <span className="text-sm font-semibold text-white">{tier.name}</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResearchHub() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">The Centralized Research Hub</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          All research lives in one application — a single <code className="text-cyan-400">npm run dev</code> serves
          every dashboard. The hub supports personal research, cross-machine sync via git, and optional
          public sharing to a community library with automated validation.
        </p>
      </div>

      <InsightCallout variant="story" title="THE HUB ADVANTAGE">
        Without the hub, each research project would be a standalone Vite app: separate <code className="text-cyan-400">npm install</code>,
        separate dev server, separate port. With 5+ projects, that's 5 terminal windows and 5 ports.
        The hub consolidates everything: <strong>one install, one server, one port</strong>. New research appears
        instantly via Vite HMR. The sidebar shows all projects — personal and community — in one unified view.
      </InsightCallout>

      <VisibilityTiers />

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Public Library & Community Sharing</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          The public library is a separate git repo that anyone can browse. Contributing is optional and
          uses a zero-effort flow: the AI agent pushes via the GitHub API, a GitHub Action validates
          the contribution, and valid research is auto-merged to main without any human review.
        </p>
      </div>

      <ArchitectureDiagram />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AgentFlowSteps />
        <ServerFlowSteps />
      </div>

      <SecurityModel />

      <InsightCallout variant="security" title="KEY DESIGN DECISION">
        The personal hub and public library are <strong>completely separate git repositories</strong> with independent
        histories. Contributions can't use <code className="text-cyan-400">git push</code> across repos. Instead, the agent
        uses the GitHub REST API (Git Data endpoints) to create blobs, trees, and commits directly on the
        library's <code className="text-amber-400">agent-contributions</code> branch. This works with any PAT that has
        Contents:write permission — no local clone of the library is needed for contributing.
      </InsightCallout>

      <ValidationChecks />

      <InsightCallout variant="technical" title="GITHUB ACTIONS WORKAROUND">
        Branch protection on <code className="text-cyan-400">main</code> uses GitHub's newer Repository Rulesets, which
        don't support adding <code className="text-gray-400">github-actions[bot]</code> as a bypass actor. The workaround:
        store an admin PAT as a repo secret (<code className="text-amber-400">ADMIN_PAT</code>) and use it for the merge
        step. The PAT is invisible to contributors — it only executes after all validation checks pass.
      </InsightCallout>
    </div>
  );
}
