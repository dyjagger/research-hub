import React, { useState } from 'react';
import { LayoutDashboard, Utensils, Soup, Landmark, Flower2, Calendar, BookOpen, ChevronRight } from 'lucide-react';

import Overview from './components/Overview';
import TokyoRamen from './components/TokyoRamen';
import KyotoRamen from './components/KyotoRamen';
import TokyoCulture from './components/TokyoCulture';
import KyotoCulture from './components/KyotoCulture';
import JuneFestivals from './components/JuneFestivals';
import Sources from './components/Sources';

const SECTIONS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, component: Overview },
  { key: 'tokyo-ramen', label: 'Tokyo Ramen', icon: Utensils, component: TokyoRamen },
  { key: 'kyoto-ramen', label: 'Kyoto Ramen', icon: Soup, component: KyotoRamen },
  { key: 'tokyo-culture', label: 'Tokyo Culture', icon: Landmark, component: TokyoCulture },
  { key: 'kyoto-culture', label: 'Kyoto Culture', icon: Flower2, component: KyotoCulture },
  { key: 'june-festivals', label: 'June Festivals', icon: Calendar, component: JuneFestivals },
  { key: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  const ActiveComponent = SECTIONS.find(s => s.key === activeSection)?.component || SECTIONS[0].component;

  return (
    <div className="flex h-full bg-gray-950 text-white">
      {/* Sidebar */}
      <nav className="w-56 flex-shrink-0 border-r border-gray-800 bg-gray-950/50 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-base font-bold text-white mb-0.5">Japan June Local Guide</h1>
          <p className="text-xs text-gray-400 mb-4">Tokyo & Kyoto — Ramen, Culture & Hidden Spots</p>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</h2>
          <ul className="space-y-1">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setActiveSection(s.key)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      activeSection === s.key
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {s.label}
                    {activeSection === s.key && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
