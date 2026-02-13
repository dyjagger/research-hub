import React, { useState } from 'react';
import {
  Coffee, Zap, Globe, BarChart3, Award, FlaskConical, BookOpen,
  ChevronRight, Leaf,
} from 'lucide-react';
import Overview from './components/Overview';
import CaffeineAnalysis from './components/CaffeineAnalysis';
import FlavorProfiles from './components/FlavorProfiles';
import Varieties from './components/Varieties';
import RareCoffees from './components/RareCoffees';
import GlobalProduction from './components/GlobalProduction';
import Processing from './components/Processing';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: Coffee, color: 'text-amber-400' },
  { id: 'caffeine', label: 'Caffeine & Alertness', icon: Zap, color: 'text-yellow-400' },
  { id: 'flavor', label: 'Flavor Profiles', icon: FlaskConical, color: 'text-rose-400' },
  { id: 'varieties', label: 'Arabica Varieties', icon: Leaf, color: 'text-emerald-400' },
  { id: 'rare', label: 'Rare & Expensive', icon: Award, color: 'text-violet-400' },
  { id: 'production', label: 'Global Production', icon: Globe, color: 'text-cyan-400' },
  { id: 'processing', label: 'Processing Methods', icon: BarChart3, color: 'text-orange-400' },
  { id: 'sources', label: 'Sources', icon: BookOpen, color: 'text-gray-400' },
];

const sectionComponents = {
  overview: Overview,
  caffeine: CaffeineAnalysis,
  flavor: FlavorProfiles,
  varieties: Varieties,
  rare: RareCoffees,
  production: GlobalProduction,
  processing: Processing,
  sources: Sources,
};

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900/80 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Coffee className="w-4.5 h-4.5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Coffee Beans</h1>
              <p className="text-[10px] text-gray-500">Deep Dive</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <s.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? s.color : 'text-gray-500 group-hover:text-gray-400'}`} />
                <span className="truncate font-medium">{s.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-amber-500/50" />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}
