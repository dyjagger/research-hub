import React, { useState, useEffect, useCallback } from 'react';
import Overview from './components/Overview';
import PlanetExplorer from './components/PlanetExplorer';
import SizeShowdown from './components/SizeShowdown';
import HotAndCold from './components/HotAndCold';
import GravityPlayground from './components/GravityPlayground';
import RaceToSun from './components/RaceToSun';
import EarthAndMoon from './components/EarthAndMoon';
import NightSky from './components/NightSky';
import SpaceEvents from './components/SpaceEvents';
import SpaceRecords from './components/SpaceRecords';
import SpaceTimeline from './components/SpaceTimeline';
import SpaceGame from './components/SpaceGame';
import SpaceExperiments from './components/SpaceExperiments';
import Sources from './components/Sources';
import ProgressTracker from './components/ProgressTracker';

const sections = [
  { id: 'overview', label: 'Mission Control', emoji: '🚀', component: Overview, group: 'Explore' },
  { id: 'explorer', label: 'Planet Explorer', emoji: '🪐', component: PlanetExplorer, group: 'Explore' },
  { id: 'records', label: 'Space Records', emoji: '🏅', component: SpaceRecords, group: 'Explore' },
  { id: 'size', label: 'Size Showdown', emoji: '📏', component: SizeShowdown, group: 'Compare' },
  { id: 'temperature', label: 'Hot & Cold', emoji: '🌡️', component: HotAndCold, group: 'Compare' },
  { id: 'gravity', label: 'Gravity Playground', emoji: '⚖️', component: GravityPlayground, group: 'Compare' },
  { id: 'distance', label: 'Race to the Sun', emoji: '🏃', component: RaceToSun, group: 'Compare' },
  { id: 'earthmoon', label: 'Earth, Moon & Seasons', emoji: '🌍', component: EarthAndMoon, group: 'Experience' },
  { id: 'nightsky', label: 'The Night Sky', emoji: '🌟', component: NightSky, group: 'Experience' },
  { id: 'spaceevents', label: 'Space Events', emoji: '💫', component: SpaceEvents, group: 'Experience' },
  { id: 'timeline', label: 'Space Timeline', emoji: '🕰️', component: SpaceTimeline, group: 'Experience' },
  { id: 'game', label: 'Trivia Game', emoji: '🎮', component: SpaceGame, group: 'Play & Learn' },
  { id: 'experiments', label: 'Space Lab', emoji: '🔬', component: SpaceExperiments, group: 'Play & Learn', excludeFromProgress: true },
  { id: 'sources', label: 'Space Library', emoji: '📚', component: Sources, group: 'Reference' },
];

const trackableSections = sections.filter(s => !s.excludeFromProgress);

export default function SolarSystemExplorer() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visitedSections, setVisitedSections] = useState(['overview']);

  const handleSectionChange = useCallback((id) => {
    setActiveSection(id);
    setVisitedSections(prev => {
      const section = sections.find(s => s.id === id);
      if (section?.excludeFromProgress) return prev;
      return prev.includes(id) ? prev : [...prev, id];
    });
  }, []);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Internal sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-56' : 'w-14'} flex-shrink-0 bg-gray-900/80 border-r border-gray-800/50 flex flex-col transition-all duration-200`}
      >
        {/* Project header */}
        <div className="p-3 border-b border-gray-800/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌌</span>
              <div className="min-w-0">
                <h1 className="text-xs font-black text-white tracking-tight truncate leading-tight">Solar System</h1>
                <p className="text-[9px] text-indigo-400 truncate">Space Explorer for Kids!</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="text-xl">🌌</span>
            </div>
          )}
        </div>

        {/* Progress tracker (sidebar open) */}
        {sidebarOpen && (
          <div className="px-2 pt-2">
            <ProgressTracker
              visitedSections={visitedSections}
              totalSections={trackableSections.length}
            />
          </div>
        )}

        {/* Section nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
          {sections.map((s, i) => {
            const isActive = activeSection === s.id;
            const isVisited = visitedSections.includes(s.id);
            const prevGroup = i > 0 ? sections[i - 1].group : null;
            const showGroupLabel = s.group !== prevGroup;
            return (
              <React.Fragment key={s.id}>
                {showGroupLabel && sidebarOpen && (
                  <p className={`text-[9px] font-bold text-gray-600 uppercase tracking-widest px-2.5 ${i > 0 ? 'pt-3' : 'pt-1'} pb-1`}>
                    {s.group}
                  </p>
                )}
                {showGroupLabel && !sidebarOpen && i > 0 && (
                  <div className="border-t border-gray-800/40 my-1.5 mx-2" />
                )}
                <button
                  onClick={() => handleSectionChange(s.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-300 font-bold'
                      : isVisited
                        ? 'text-gray-300 hover:text-gray-200 hover:bg-gray-800/50'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                  title={s.label}
                >
                  <span className="text-base flex-shrink-0">{s.emoji}</span>
                  {sidebarOpen && (
                    <>
                      <span className="truncate flex-1">{s.label}</span>
                      {isVisited && !isActive && !s.excludeFromProgress && (
                        <span className="text-[8px] text-emerald-500 flex-shrink-0">✓</span>
                      )}
                    </>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 border-t border-gray-800/50 text-gray-600 hover:text-gray-400 transition-colors text-xs text-center"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
