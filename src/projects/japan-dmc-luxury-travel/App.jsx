import React, { useState } from 'react';
import { Globe, Building2, BarChart3, Sparkles, Map, Compass, BookOpen, ChevronRight } from 'lucide-react';
import Overview from './components/Overview';
import DMCDirectory from './components/DMCDirectory';
import MarketIntelligence from './components/MarketIntelligence';
import ExperienceTaxonomy from './components/ExperienceTaxonomy';
import RegionalCoverage from './components/RegionalCoverage';
import SelectionGuide from './components/SelectionGuide';
import Sources from './components/Sources';

const ACCENT = '#f43f5e'; // rose-500

const sections = [
  { id: 'overview', label: 'Overview', icon: Globe },
  { id: 'directory', label: 'DMC Directory', icon: Building2 },
  { id: 'market', label: 'Market Intelligence', icon: BarChart3 },
  { id: 'experiences', label: 'Experience Taxonomy', icon: Sparkles },
  { id: 'regions', label: 'Regional Coverage', icon: Map },
  { id: 'guide', label: 'Selection Guide', icon: Compass },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'directory': return <DMCDirectory />;
      case 'market': return <MarketIntelligence />;
      case 'experiences': return <ExperienceTaxonomy />;
      case 'regions': return <RegionalCoverage />;
      case 'guide': return <SelectionGuide />;
      case 'sources': return <Sources />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <nav className="w-56 shrink-0 border-r border-gray-800 bg-gray-950 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold tracking-wide uppercase" style={{ color: ACCENT }}>
            Japan DMC Intel
          </h2>
          <p className="text-[10px] text-gray-500 mt-0.5">Luxury Travel Specialist Guide</p>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
                  isActive
                    ? 'bg-gray-800/80 text-white border-r-2'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                }`}
                style={isActive ? { borderColor: ACCENT } : {}}
              >
                <Icon size={16} style={isActive ? { color: ACCENT } : {}} />
                <span className="truncate">{s.label}</span>
                {isActive && <ChevronRight size={12} className="ml-auto opacity-50" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}
