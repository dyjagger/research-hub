import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Clock, Shield, Award, Skull, BookOpen,
} from 'lucide-react';
import Overview from './components/Overview';
import TeamRoles from './components/TeamRoles';
import BuildOrder from './components/BuildOrder';
import DefenseLayout from './components/DefenseLayout';
import UnitTierList from './components/UnitTierList';
import WaveGuide from './components/WaveGuide';
import QueenKill from './components/QueenKill';
import Sources from './components/Sources';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: Overview },
  { id: 'roles', label: 'Team Roles', icon: Users, component: TeamRoles },
  { id: 'buildorder', label: 'Build Order', icon: Clock, component: BuildOrder },
  { id: 'defense', label: 'Defense Layout', icon: Shield, component: DefenseLayout },
  { id: 'waves', label: 'Wave Guide', icon: Award, component: WaveGuide },
  { id: 'tierlist', label: 'Unit Tier List', icon: Award, component: UnitTierList },
  { id: 'queen', label: 'Queen Kill', icon: Skull, component: QueenKill },
  { id: 'sources', label: 'Sources', icon: BookOpen, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const ActiveComponent = SECTIONS.find((s) => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Internal Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900/50 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-white tracking-tight">Beyond All Reason</h2>
          <p className="text-[10px] text-gray-500 mt-0.5">Raptors 4P Optimized Guide</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-red-500/10 text-red-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <section.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-red-400' : 'text-gray-500'}`} />
                <span className="truncate text-[13px] font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800 text-[10px] text-gray-600">
          <p>BAR · Raptors PvE · Epic Difficulty</p>
          <p className="mt-0.5">Data: 16 sources · 4 roles · 8 sections</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
