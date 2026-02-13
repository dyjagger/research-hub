import React, { useState, Suspense } from 'react';
import {
  Search, ChevronLeft, ChevronRight, Home, Menu, X,
  Microscope, FlaskConical,
} from 'lucide-react';
import { projectRegistry, projectComponents } from './projects';
import HubHome from './components/HubHome';

const ICON_MAP = {
  Building2: () => import('lucide-react').then(m => m.Building2),
  Axe: () => import('lucide-react').then(m => m.Axe),
};

function ProjectIcon({ iconName, className }) {
  const icons = {
    Building2: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
      </svg>
    ),
    Axe: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z"/>
      </svg>
    ),
  };
  const Icon = icons[iconName] || FlaskConical;
  return <Icon className={className} />;
}

const ACCENT_COLORS = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500', ring: 'ring-cyan-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500', ring: 'ring-orange-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500', ring: 'ring-violet-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500', ring: 'ring-emerald-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500', ring: 'ring-rose-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500', ring: 'ring-blue-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500', ring: 'ring-amber-500/20' },
};

function getAccent(color) {
  return ACCENT_COLORS[color] || ACCENT_COLORS.cyan;
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedProjects = [...projectRegistry].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredProjects = searchQuery
    ? sortedProjects.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.query && p.query.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sortedProjects;

  const handleProjectClick = (slug) => {
    setActiveProject(slug);
    setMobileMenuOpen(false);
    setSearchQuery('');
  };

  const handleHomeClick = () => {
    setActiveProject(null);
    setMobileMenuOpen(false);
    setSearchQuery('');
  };

  const ActiveProjectComponent = activeProject ? projectComponents[activeProject] : null;
  const activeProjectMeta = activeProject
    ? projectRegistry.find(p => p.slug === activeProject)
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800/90 backdrop-blur p-2 rounded-lg border border-gray-700 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-300" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-72' : 'w-16'}
          fixed lg:static inset-y-0 left-0 z-40
          bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          flex flex-col transition-all duration-300
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Microscope className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white tracking-tight truncate">
                  Research Hub
                </h1>
                <p className="text-[10px] text-gray-500 truncate">
                  {projectRegistry.length} project{projectRegistry.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Microscope className="w-4.5 h-4.5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Home button */}
        <div className="px-2 pt-3 flex-shrink-0">
          <button
            onClick={handleHomeClick}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              !activeProject
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
            title="Home"
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Home</span>}
          </button>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="px-3 pt-3 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Divider + label */}
        {sidebarOpen && (
          <div className="px-4 pt-4 pb-1 flex-shrink-0">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Projects
            </span>
          </div>
        )}

        {/* Project list */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto space-y-0.5">
          {filteredProjects.map((project) => {
            const isActive = activeProject === project.slug;
            const accent = getAccent(project.accentColor);
            return (
              <button
                key={project.slug}
                onClick={() => handleProjectClick(project.slug)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  isActive
                    ? `${accent.bg} ${accent.text}`
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
                title={project.title}
              >
                <div className={`flex-shrink-0 ${isActive ? accent.text : 'text-gray-500 group-hover:text-gray-400'}`}>
                  <ProjectIcon iconName={project.icon} className="w-4 h-4" />
                </div>
                {sidebarOpen && (
                  <div className="min-w-0 text-left">
                    <div className="truncate font-medium text-[13px] leading-tight">
                      {project.title}
                    </div>
                    <div className="truncate text-[10px] text-gray-500 mt-0.5">
                      {formatDate(project.createdAt)}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
          {filteredProjects.length === 0 && sidebarOpen && (
            <div className="px-3 py-6 text-center text-xs text-gray-600">
              No projects found
            </div>
          )}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-3 border-t border-gray-800 text-gray-500 hover:text-gray-300 transition-colors items-center justify-center flex-shrink-0"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={`flex-1 ${activeProject ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {activeProject && ActiveProjectComponent ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-500">Loading {activeProjectMeta?.title || 'project'}...</p>
                </div>
              </div>
            }
          >
            <ActiveProjectComponent />
          </Suspense>
        ) : (
          <HubHome
            projects={sortedProjects}
            onProjectClick={handleProjectClick}
            getAccent={getAccent}
            formatDate={formatDate}
            ProjectIcon={ProjectIcon}
          />
        )}
      </main>
    </div>
  );
}
