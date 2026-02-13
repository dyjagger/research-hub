// AI Developer Tooling Adoption — Research Data
// Sources: Stack Overflow 2025, GitHub Octoverse, Jellyfish, Sacra, McKinsey, PwC, Gartner, Pento MCP Review

// ─── TOOL CATEGORY DEFINITIONS ───
export const toolCategories = [
  {
    id: 'coding-assistants',
    name: 'AI Coding Assistants',
    shortName: 'Copilots',
    description: 'Autocomplete + chat-in-IDE tools (GitHub Copilot, Cursor, Windsurf, Tabnine)',
    color: '#3b82f6',
    examples: ['GitHub Copilot', 'Cursor', 'Windsurf', 'Tabnine'],
  },
  {
    id: 'agentic-coding',
    name: 'Agentic Coding',
    shortName: 'Agents',
    description: 'Autonomous multi-step coding agents (Devin, Claude Code, Copilot Agent Mode, Codex)',
    color: '#8b5cf6',
    examples: ['Devin', 'Claude Code', 'Copilot Agent Mode', 'OpenAI Codex'],
  },
  {
    id: 'mcp-servers',
    name: 'MCP Servers',
    shortName: 'MCP',
    description: 'Model Context Protocol — standardized tool integration for AI agents',
    color: '#f59e0b',
    examples: ['GitHub MCP', 'Figma MCP', 'Slack MCP', 'Playwright MCP'],
  },
  {
    id: 'agent-instructions',
    name: 'Agent Instruction Files',
    shortName: 'AGENTS.md',
    description: 'Standardized guidance files for coding agents (AGENTS.md, .cursorrules, CLAUDE.md)',
    color: '#10b981',
    examples: ['AGENTS.md', '.cursorrules', 'CLAUDE.md', '.github/copilot-instructions.md'],
  },
  {
    id: 'skills-workflows',
    name: 'Skills & Workflows',
    shortName: 'Skills',
    description: 'Reusable procedural knowledge for agents (Windsurf Skills, custom workflows)',
    color: '#ec4899',
    examples: ['Windsurf Skills', 'Claude Code Skills', 'Custom Workflows'],
  },
];

// ─── TIMELINE DATA ───
export const timelineEras = [
  { id: 'pre-copilot', label: 'Pre-Copilot', range: 'Before Jun 2022', color: '#6b7280' },
  { id: 'copilot-era', label: 'Copilot Era', range: 'Jun 2022 – Nov 2023', color: '#3b82f6' },
  { id: 'chat-augmented', label: 'Chat-Augmented', range: 'Nov 2023 – Oct 2024', color: '#8b5cf6' },
  { id: 'agentic-explosion', label: 'Agentic Explosion', range: 'Nov 2024 – Present', color: '#f59e0b' },
];

export const timelineMilestones = [
  { date: '2021-06', event: 'GitHub Copilot Technical Preview', era: 'pre-copilot', category: 'coding-assistants' },
  { date: '2022-06', event: 'GitHub Copilot GA ($10/mo)', era: 'copilot-era', category: 'coding-assistants' },
  { date: '2023-03', event: 'GPT-4 launches, ChatGPT plugins', era: 'copilot-era', category: 'coding-assistants' },
  { date: '2023-11', event: 'ChatGPT turns 1 year old, Cursor launches', era: 'chat-augmented', category: 'coding-assistants' },
  { date: '2024-03', event: 'Devin announced — first "AI software engineer"', era: 'chat-augmented', category: 'agentic-coding' },
  { date: '2024-06', event: 'Cursor $60M Series A at $400M valuation', era: 'chat-augmented', category: 'coding-assistants' },
  { date: '2024-08', event: 'Cursor $105M Series B at $2.5B valuation', era: 'chat-augmented', category: 'coding-assistants' },
  { date: '2024-11', event: 'Anthropic launches MCP (open standard)', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2024-11', event: 'Windsurf Editor launches (Codeium)', era: 'agentic-explosion', category: 'coding-assistants' },
  { date: '2024-12', event: 'Zed, Replit, Codeium announce MCP integration', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2025-02', event: 'Claude Code launches', era: 'agentic-explosion', category: 'agentic-coding' },
  { date: '2025-03', event: 'OpenAI adopts MCP across ChatGPT & Agents SDK', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2025-04', event: 'Google DeepMind confirms MCP in Gemini', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2025-05', event: 'VS Code native MCP support in Copilot Agent Mode', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2025-05', event: 'Cursor hits $500M ARR', era: 'agentic-explosion', category: 'coding-assistants' },
  { date: '2025-07', event: 'GitHub Copilot crosses 20M all-time users', era: 'agentic-explosion', category: 'coding-assistants' },
  { date: '2025-08', event: 'OpenAI releases AGENTS.md standard', era: 'agentic-explosion', category: 'agent-instructions' },
  { date: '2025-12', event: 'MCP donated to Linux Foundation (AAIF)', era: 'agentic-explosion', category: 'mcp-servers' },
  { date: '2025-12', event: 'AGENTS.md adopted by 60,000+ projects', era: 'agentic-explosion', category: 'agent-instructions' },
];

// ─── COPILOT USER GROWTH ───
export const copilotUserGrowth = [
  { date: '2022-06', users: 0.4, label: 'GA Launch' },
  { date: '2022-12', users: 1.0, label: null },
  { date: '2023-06', users: 1.5, label: null },
  { date: '2023-12', users: 3.0, label: null },
  { date: '2024-02', users: 3.7, label: '1.3M paid' },
  { date: '2024-06', users: 5.0, label: null },
  { date: '2024-12', users: 12.0, label: null },
  { date: '2025-01', users: 15.0, label: '400% YoY' },
  { date: '2025-04', users: 15.0, label: null },
  { date: '2025-07', users: 20.0, label: '20M all-time' },
];

// ─── CURSOR REVENUE GROWTH ───
export const cursorRevenueGrowth = [
  { date: '2023-01', arr: 1, label: '$1M ARR' },
  { date: '2024-01', arr: 10, label: null },
  { date: '2024-06', arr: 30, label: null },
  { date: '2024-09', arr: 65, label: null },
  { date: '2024-12', arr: 100, label: '$100M ARR' },
  { date: '2025-02', arr: 100, label: '9,900% YoY' },
  { date: '2025-03', arr: 200, label: '$200M ARR' },
  { date: '2025-04', arr: 300, label: null },
  { date: '2025-05', arr: 500, label: '$500M ARR' },
];

// ─── MCP ECOSYSTEM GROWTH ───
export const mcpEcosystemGrowth = [
  { date: '2024-11', servers: 100, clients: 10, sdkDownloads: 0.1, label: 'MCP Launch' },
  { date: '2025-01', servers: 500, clients: 30, sdkDownloads: 0.5, label: null },
  { date: '2025-03', servers: 2000, clients: 80, sdkDownloads: 4, label: 'OpenAI adopts' },
  { date: '2025-05', servers: 4000, clients: 150, sdkDownloads: 8, label: 'VS Code native' },
  { date: '2025-07', servers: 4500, clients: 200, sdkDownloads: 30, label: null },
  { date: '2025-10', servers: 5500, clients: 250, sdkDownloads: 60, label: '5,500 servers' },
  { date: '2025-12', servers: 5800, clients: 300, sdkDownloads: 97, label: 'Linux Foundation' },
];

// ─── AGENTS.MD ADOPTION ───
export const agentsMdAdoption = [
  { date: '2025-08', projects: 0, label: 'Released by OpenAI' },
  { date: '2025-09', projects: 5000, label: null },
  { date: '2025-10', projects: 15000, label: null },
  { date: '2025-11', projects: 35000, label: null },
  { date: '2025-12', projects: 60000, label: '60K+ projects' },
];

// ─── DEVELOPER SURVEY ADOPTION RATES ───
export const developerAdoptionRates = [
  { year: 2023, usingAI: 44, planningToUse: 26, notUsing: 30, source: 'Stack Overflow 2023' },
  { year: 2024, usingAI: 62, planningToUse: 14, notUsing: 24, source: 'Stack Overflow 2024' },
  { year: 2025, usingAI: 76, planningToUse: 8, notUsing: 16, source: 'Stack Overflow 2025' },
];

// ─── SENTIMENT & TRUST (THE REALITY CHECK) ───
export const sentimentData = [
  { year: 2023, favorable: 77, neutral: 13, unfavorable: 10, source: 'Stack Overflow' },
  { year: 2024, favorable: 72, neutral: 15, unfavorable: 13, source: 'Stack Overflow' },
  { year: 2025, favorable: 60, neutral: 18, unfavorable: 22, source: 'Stack Overflow' },
];

export const trustData = {
  highlyTrust: 3,
  somewhatTrust: 30,
  neutral: 21,
  somewhatDistrust: 27,
  highlyDistrust: 19,
  source: 'Stack Overflow 2025 (33K respondents)',
};

// ─── HYPE VS REALITY METRICS ───
export const hypeVsReality = [
  {
    claim: '84% of developers using or planning to use AI tools',
    reality: 'But positive sentiment DROPPED from 77% → 60% (2023→2025)',
    category: 'sentiment',
    hypeScore: 84,
    realityScore: 60,
  },
  {
    claim: '97% of enterprise devs have used AI coding tools',
    reality: 'Only 3% highly trust the output; 46% actively distrust it',
    category: 'trust',
    hypeScore: 97,
    realityScore: 33,
  },
  {
    claim: 'AI agents are transforming development',
    reality: '52% don\'t use agents or stick to simpler tools; 38% have no plans to adopt',
    category: 'agents',
    hypeScore: 79,
    realityScore: 48,
  },
  {
    claim: '"Vibe coding" is the future of development',
    reality: '72% of professional developers say vibe coding is NOT part of their work',
    category: 'vibe-coding',
    hypeScore: 70,
    realityScore: 28,
  },
  {
    claim: 'Autonomous agents will write all code',
    reality: '<0.2% of PRs from fully autonomous agents (Jellyfish, 20M PRs)',
    category: 'autonomous',
    hypeScore: 85,
    realityScore: 0.2,
  },
  {
    claim: 'AI makes developers significantly faster',
    reality: 'Experienced devs 19% SLOWER in controlled trial; 41% more bugs with Copilot',
    category: 'productivity',
    hypeScore: 55,
    realityScore: 26,
  },
  {
    claim: '79% of orgs have implemented AI agents',
    reality: 'Gartner: 40% of agentic AI projects will be CANCELLED by 2027',
    category: 'enterprise',
    hypeScore: 79,
    realityScore: 48,
  },
];

// ─── AI AGENT ADOPTION (SO 2025) ───
export const agentAdoptionBreakdown = [
  { status: 'Using agents actively', percentage: 25, color: '#8b5cf6' },
  { status: 'Experimenting with agents', percentage: 23, color: '#a78bfa' },
  { status: 'Using simpler AI tools only', percentage: 14, color: '#3b82f6' },
  { status: 'No plans to adopt agents', percentage: 38, color: '#6b7280' },
];

// ─── PRODUCTIVITY IMPACT DATA ───
export const productivityStudies = [
  {
    study: 'GitHub/Accenture',
    metric: 'Task completion speed',
    improvement: 55,
    direction: 'faster',
    sampleSize: 'Enterprise devs',
    tier: 'T1',
  },
  {
    study: 'Opsera',
    metric: 'PR open time',
    improvement: 75,
    direction: 'faster',
    sampleSize: 'Teams using Copilot',
    tier: 'T1',
  },
  {
    study: 'Jellyfish',
    metric: 'PR throughput (0→100% adoption)',
    improvement: 100,
    direction: 'increase',
    sampleSize: '20M PRs, 1K companies',
    tier: 'T1',
  },
  {
    study: 'Academic RCT',
    metric: 'Experienced dev speed (familiar repos)',
    improvement: -19,
    direction: 'slower',
    sampleSize: 'Open-source devs',
    tier: 'T1',
  },
  {
    study: 'Uplevel',
    metric: 'Bug introduction rate',
    improvement: 41,
    direction: 'more bugs',
    sampleSize: 'Copilot users',
    tier: 'T1',
  },
  {
    study: 'Uplevel',
    metric: 'Tasks completed',
    improvement: 26,
    direction: 'more tasks',
    sampleSize: 'Copilot users',
    tier: 'T1',
  },
  {
    study: 'Jellyfish',
    metric: 'Centralized arch productivity gain',
    improvement: 300,
    direction: 'increase (4x)',
    sampleSize: 'Companies by arch type',
    tier: 'T1',
  },
  {
    study: 'Jellyfish',
    metric: 'Distributed arch productivity gain',
    improvement: -5,
    direction: 'slight negative',
    sampleSize: 'Companies by arch type',
    tier: 'T1',
  },
];

// ─── MARKET SIZE PROJECTIONS ───
export const marketProjections = [
  { year: 2022, aiCodingTools: 0.026, agenticAI: null, mcpEcosystem: null },
  { year: 2023, aiCodingTools: 5, agenticAI: 2.0, mcpEcosystem: null },
  { year: 2024, aiCodingTools: 15, agenticAI: 5.25, mcpEcosystem: 1.2 },
  { year: 2025, aiCodingTools: 30, agenticAI: 7.92, mcpEcosystem: 4.5 },
  { year: 2026, aiCodingTools: 40, agenticAI: 12, mcpEcosystem: 8 },
  { year: 2027, aiCodingTools: 52, agenticAI: 18, mcpEcosystem: 14 },
  { year: 2028, aiCodingTools: 62, agenticAI: 28, mcpEcosystem: 22 },
  { year: 2029, aiCodingTools: 75, agenticAI: 42, mcpEcosystem: 32 },
  { year: 2030, aiCodingTools: 88, agenticAI: 65, mcpEcosystem: 45 },
  { year: 2034, aiCodingTools: 99, agenticAI: 199, mcpEcosystem: null },
];

// ─── ENTERPRISE VS INDIVIDUAL ADOPTION ───
export const enterpriseVsIndividual = [
  {
    segment: 'Fortune 100',
    copilotAdoption: 90,
    agentExperimentation: 62,
    mcpDeployment: 45,
    source: 'GitHub, McKinsey',
  },
  {
    segment: 'Fortune 500',
    copilotAdoption: 78,
    agentExperimentation: 50,
    mcpDeployment: 30,
    source: 'GitHub, PwC',
  },
  {
    segment: 'Mid-Market',
    copilotAdoption: 60,
    agentExperimentation: 35,
    mcpDeployment: 20,
    source: 'Industry estimates',
  },
  {
    segment: 'Startups / SMB',
    copilotAdoption: 55,
    agentExperimentation: 45,
    mcpDeployment: 35,
    source: 'Industry estimates',
  },
  {
    segment: 'Individual Devs',
    copilotAdoption: 76,
    agentExperimentation: 25,
    mcpDeployment: 15,
    source: 'Stack Overflow 2025',
  },
];

// ─── TOOL FRUSTRATIONS ───
export const toolFrustrations = [
  { frustration: 'Solutions almost right, but not quite', percentage: 66 },
  { frustration: 'Debugging AI code more time-consuming', percentage: 45 },
  { frustration: 'AI doesn\'t understand project context', percentage: 38 },
  { frustration: 'Security/privacy concerns', percentage: 35 },
  { frustration: 'Inconsistent quality across languages', percentage: 28 },
  { frustration: 'Too expensive for the value', percentage: 18 },
];

// ─── FUTURE PROJECTIONS BY TOOL CATEGORY ───
export const futureProjections = [
  {
    category: 'AI Coding Assistants',
    current2025: '76% developer adoption, $30B market',
    projection2027: '90%+ adoption, near-universal in enterprise',
    projection2030: '$88-99B market, embedded in every IDE',
    confidence: 'high',
    riskFactors: ['Sentiment decline may slow growth', 'Quality plateau concerns'],
  },
  {
    category: 'Agentic Coding',
    current2025: '<0.2% of PRs, 25% actively using agents',
    projection2027: '50% launching pilots (Gartner), but 40% project cancellations',
    projection2030: '$65B agentic AI market, but human oversight remains critical',
    confidence: 'medium',
    riskFactors: ['Trust deficit', 'Accuracy concerns', '40% cancellation prediction'],
  },
  {
    category: 'MCP Servers',
    current2025: '97M SDK downloads/mo, 5,800+ servers, Linux Foundation governance',
    projection2027: 'De facto standard for AI-tool integration, 90%+ of AI apps',
    projection2030: 'Critical infrastructure layer, comparable to HTTP/REST',
    confidence: 'high',
    riskFactors: ['Security gaps still being addressed', 'Competing standards possible'],
  },
  {
    category: 'Agent Instruction Files',
    current2025: '60,000+ projects with AGENTS.md (4 months since release)',
    projection2027: 'Standard practice in most repos, like README.md',
    projection2030: 'Universal — every project ships with agent instructions',
    confidence: 'high',
    riskFactors: ['Format fragmentation (multiple competing standards)', 'Maintenance burden'],
  },
  {
    category: 'Skills & Workflows',
    current2025: 'Emerging — Windsurf Skills, Claude Code skills, early adopters',
    projection2027: 'Marketplace/registry model, shareable skill libraries',
    projection2030: 'Standard part of development workflow, like package managers',
    confidence: 'medium',
    riskFactors: ['No dominant standard yet', 'Vendor lock-in risk', 'Quality control challenges'],
  },
];

// ─── MCP TOP SERVERS BY SEARCH VOLUME ───
export const mcpTopServers = [
  { name: 'Playwright MCP', searches: 35000, remote: false },
  { name: 'Figma MCP', searches: 23000, remote: true },
  { name: 'GitHub MCP', searches: 17000, remote: true },
  { name: 'Context7', searches: 13000, remote: true },
  { name: 'Cursor MCP', searches: 12000, remote: true },
  { name: 'Supabase MCP', searches: 11000, remote: true },
  { name: 'Notion MCP', searches: 9500, remote: true },
  { name: 'n8n MCP', searches: 9200, remote: false },
  { name: 'Zapier MCP', searches: 6700, remote: true },
  { name: 'Jira MCP', searches: 6100, remote: true },
];

// ─── CODE GENERATION STATS ───
export const codeGenerationStats = [
  { metric: 'Code written by AI (Copilot active users)', value: 46, unit: '%' },
  { metric: 'Code written by AI at launch (2022)', value: 27, unit: '%' },
  { metric: 'GitHub code that is AI-generated (2025)', value: 41, unit: '%' },
  { metric: 'Code suggestion acceptance rate', value: 30, unit: '%' },
  { metric: 'Code retention rate (accepted → kept)', value: 88, unit: '%' },
  { metric: 'Java AI code generation rate', value: 61, unit: '%' },
  { metric: 'Python AI code generation rate', value: 40, unit: '%' },
  { metric: 'JS/TS AI code generation rate', value: 33, unit: '%' },
];

// ─── SOURCES ───
export const sources = [
  { id: 1, title: 'Stack Overflow 2025 Developer Survey', url: 'https://survey.stackoverflow.co/2025/ai', tier: 'T1', type: 'Survey', respondents: '33,662' },
  { id: 2, title: 'Jellyfish Engineering Productivity Report', url: 'https://jellyfish.co/blog/ai-tool-adoption-agent-usage-engineering-productivity/', tier: 'T1', type: 'Data Analysis', respondents: '20M PRs, 200K devs' },
  { id: 3, title: 'GitHub Copilot Statistics 2026', url: 'https://www.aboutchromebooks.com/github-copilot-statistics/', tier: 'T1', type: 'Market Data', respondents: null },
  { id: 4, title: 'Sacra — Cursor Revenue Analysis', url: 'https://sacra.com/c/cursor/', tier: 'T1', type: 'Financial Analysis', respondents: null },
  { id: 5, title: 'MCP Enterprise Adoption Guide (Guptadeepak)', url: 'https://guptadeepak.com/the-complete-guide-to-model-context-protocol-mcp-enterprise-adoption-market-trends-and-implementation-strategies/', tier: 'T1', type: 'Research Report', respondents: null },
  { id: 6, title: 'Pento — A Year of MCP Review', url: 'https://www.pento.ai/blog/a-year-of-mcp-2025-review', tier: 'T2', type: 'Industry Analysis', respondents: null },
  { id: 7, title: 'MCP Adoption Statistics (MCP Manager)', url: 'https://mcpmanager.ai/blog/mcp-adoption-statistics/', tier: 'T2', type: 'Market Analysis', respondents: null },
  { id: 8, title: 'Arcade.dev — Agentic Framework Adoption Trends', url: 'https://blog.arcade.dev/agentic-framework-adoption-trends', tier: 'T2', type: 'Market Report', respondents: null },
  { id: 9, title: 'McKinsey — State of AI 2025', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', tier: 'T1', type: 'Survey', respondents: 'Global executives' },
  { id: 10, title: 'AI for Code — 17 Key Statistics 2025', url: 'https://aiforcode.io/stats', tier: 'T2', type: 'Aggregated Stats', respondents: null },
  { id: 11, title: 'OpenAI — Agentic AI Foundation Announcement', url: 'https://openai.com/index/agentic-ai-foundation/', tier: 'T1', type: 'Press Release', respondents: null },
  { id: 12, title: 'Linux Foundation — AAIF Formation', url: 'https://www.prnewswire.com/news-releases/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation-aaif-302636897.html', tier: 'T1', type: 'Press Release', respondents: null },
  { id: 13, title: 'Forbes — 11 Agentic AI Predictions 2026', url: 'https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/', tier: 'T2', type: 'Analysis', respondents: null },
  { id: 14, title: 'Futurum — Was 2025 the Year of Agentic AI?', url: 'https://futurumgroup.com/insights/was-2025-really-the-year-of-agentic-ai-or-just-more-agentic-hype/', tier: 'T2', type: 'Analysis', respondents: null },
  { id: 15, title: 'Deloitte — Agentic Reality Check', url: 'https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html', tier: 'T1', type: 'Research Report', respondents: null },
];
