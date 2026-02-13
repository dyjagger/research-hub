import React, { useState } from 'react';
import {
  Brain, TrendingUp, ShieldAlert, Layers, Building2, Rocket, BookOpen, ChevronRight,
} from 'lucide-react';
import Overview from './components/Overview';
import GrowthTimelines from './components/GrowthTimelines';
import RealityCheck from './components/RealityCheck';
import ToolDeepDive from './components/ToolDeepDive';
import EnterpriseVsIndividual from './components/EnterpriseVsIndividual';
import FutureProjections from './components/FutureProjections';
import Sources from './components/Sources';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Brain, component: Overview },
  { id: 'growth', label: 'Growth Timelines', icon: TrendingUp, component: GrowthTimelines },
  { id: 'reality', label: 'Reality Check', icon: ShieldAlert, component: RealityCheck },
  { id: 'deepdive', label: 'Tool Deep Dive', icon: Layers, component: ToolDeepDive },
  { id: 'enterprise', label: 'Enterprise vs Individual', icon: Building2, component: EnterpriseVsIndividual },
  { id: 'projections', label: 'Future Projections', icon: Rocket, component: FutureProjections },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Internal Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900/50 border-r border-gray-800 overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white leading-tight">AI Tooling Adoption</h2>
              <p className="text-[9px] text-gray-500">Hype vs Reality Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="p-2 space-y-0.5">
          {SECTIONS.map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <section.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Section Selector */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur border-t border-gray-800 overflow-x-auto">
        <div className="flex px-2 py-2 gap-1">
          {SECTIONS.map(section => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <section.icon className="w-3 h-3" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
