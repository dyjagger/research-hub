import React, { useState } from 'react';
import { Tent, BarChart3, Wrench, DollarSign, Grid3X3, Target, Award, BookOpen, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import SetupBuilder from './components/SetupBuilder';
import CostAnalysis from './components/CostAnalysis';
import FeaturesMatrix from './components/FeaturesMatrix';
import UseCaseFit from './components/UseCaseFit';
import Recommendations from './components/Recommendations';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: BarChart3, component: Overview },
  { id: 'comparison', label: 'RTT Comparison', icon: Tent, component: ComparisonTable },
  { id: 'setup', label: 'Setup Builder', icon: Wrench, component: SetupBuilder },
  { id: 'cost', label: 'Cost Analysis', icon: DollarSign, component: CostAnalysis },
  { id: 'features', label: 'Features Matrix', icon: Grid3X3, component: FeaturesMatrix },
  { id: 'usecase', label: 'Use Case Fit', icon: Target, component: UseCaseFit },
  { id: 'recommendations', label: 'Recommendations', icon: Award, component: Recommendations },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

const App = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarCollapsed ? 'w-16' : 'w-64'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-auto
        bg-gray-900/95 backdrop-blur border-r border-gray-800 
        flex flex-col transition-all duration-200
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-sm truncate">Jeep Rubicon</h1>
              <p className="text-emerald-400 text-xs truncate">Overlanding Setup Guide</p>
            </div>
          )}
          <button onClick={() => { setSidebarCollapsed(!sidebarCollapsed); setMobileMenuOpen(false); }} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors hidden lg:block">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors lg:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {sections.map(section => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => { setActiveSection(section.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                title={sidebarCollapsed ? section.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{section.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
            <p>12 RTTs · 10 brands</p>
            <p>6 gear categories</p>
            <p className="mt-1">Data: Feb 2025</p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400">
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white font-bold text-sm">Jeep Rubicon Overlanding</h1>
            <p className="text-gray-500 text-xs">{sections.find(s => s.id === activeSection)?.label}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default App;
