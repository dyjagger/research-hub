import React, { useState } from 'react';
import {
  Sparkles, Images, GitBranch, Layers, BarChart3, Globe, BookOpen,
  ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';
import Overview from './components/Overview';
import ProjectGallery from './components/ProjectGallery';
import ThePipeline from './components/ThePipeline';
import ScaffoldLayer from './components/ScaffoldLayer';
import Telemetry from './components/Telemetry';
import ResearchHub from './components/ResearchHub';
import Sources from './components/Sources';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Sparkles, component: Overview },
  { id: 'gallery', label: 'Project Gallery', icon: Images, component: ProjectGallery },
  { id: 'pipeline', label: 'The Pipeline', icon: GitBranch, component: ThePipeline },
  { id: 'scaffold', label: 'Scaffold Layer', icon: Layers, component: ScaffoldLayer },
  { id: 'telemetry', label: 'Telemetry', icon: BarChart3, component: Telemetry },
  { id: 'hub', label: 'Research Hub', icon: Globe, component: ResearchHub },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = SECTIONS.find((s) => s.id === activeSection)?.component || Overview;

  const handleSectionClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      <button
        className="lg:hidden fixed top-16 left-4 z-50 bg-gray-800/90 backdrop-blur p-2 rounded-lg border border-gray-700 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-4 h-4 text-gray-300" /> : <Menu className="w-4 h-4 text-gray-300" />}
      </button>

      <aside
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-56' : 'w-14'}
          fixed lg:static inset-y-0 left-0 z-40
          bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          flex flex-col transition-all duration-300
        `}
      >
        <div className="p-3 border-b border-gray-800 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs font-bold text-white tracking-tight truncate">Research Visualizer</h1>
                <p className="text-[9px] text-gray-500 truncate">Skill Showcase</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
                title={section.label}
              >
                <section.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-400'}`} />
                {sidebarOpen && (
                  <span className="text-[13px] font-medium truncate">{section.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-2.5 border-t border-gray-800 text-gray-500 hover:text-gray-300 transition-colors items-center justify-center flex-shrink-0"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-8 lg:px-10 lg:py-10">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
