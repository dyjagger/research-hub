import React, { useState } from 'react';
import {
  LayoutDashboard, DollarSign, Globe, Clock, Scale,
  ShoppingCart, Skull, BookOpen, ChevronLeft, ChevronRight
} from 'lucide-react';
import Overview from './components/Overview';
import FinancialJourney from './components/FinancialJourney';
import CompetitiveLandscape from './components/CompetitiveLandscape';
import Timeline from './components/Timeline';
import PatentWars from './components/PatentWars';
import Acquisitions from './components/Acquisitions';
import Collapse from './components/Collapse';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: Overview },
  { id: 'financial', label: 'Financial Journey', icon: DollarSign, component: FinancialJourney },
  { id: 'competitive', label: 'Competitive Landscape', icon: Globe, component: CompetitiveLandscape },
  { id: 'timeline', label: 'Events Timeline', icon: Clock, component: Timeline },
  { id: 'patents', label: 'The Patent Wars', icon: Scale, component: PatentWars },
  { id: 'acquisitions', label: 'Acquisitions', icon: ShoppingCart, component: Acquisitions },
  { id: 'collapse', label: 'The Collapse', icon: Skull, component: Collapse },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } flex-shrink-0 bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          {sidebarOpen ? (
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                <span className="text-cyan-400">Limelight</span> Networks
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">Rise & Fall of a CDN Pioneer</p>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-cyan-400 font-bold text-lg">L</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {sections.map(section => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={section.label}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {sidebarOpen && <span>{section.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 border-t border-slate-800 text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
