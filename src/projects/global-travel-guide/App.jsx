import React, { useState } from 'react';
import {
  Globe, MapPin, Hotel, UtensilsCrossed, Compass, Music, Wallet, Shield, BookOpen,
  ChevronRight,
} from 'lucide-react';
import Overview from './components/Overview';
import TopDestinations from './components/TopDestinations';
import HotelGuide from './components/HotelGuide';
import FoodCulinary from './components/FoodCulinary';
import Activities from './components/Activities';
import Nightlife from './components/Nightlife';
import TravelBudget from './components/TravelBudget';
import Safety from './components/Safety';
import Sources from './components/Sources';

const ACCENT = '#06b6d4';

const sections = [
  { id: 'overview', label: 'Overview', icon: Globe, color: 'text-cyan-400' },
  { id: 'destinations', label: 'Top Destinations', icon: MapPin, color: 'text-blue-400' },
  { id: 'hotels', label: 'Hotel Guide', icon: Hotel, color: 'text-amber-400' },
  { id: 'food', label: 'Food & Culinary', icon: UtensilsCrossed, color: 'text-rose-400' },
  { id: 'activities', label: 'Activities & Attractions', icon: Compass, color: 'text-emerald-400' },
  { id: 'nightlife', label: 'Nightlife & Entertainment', icon: Music, color: 'text-violet-400' },
  { id: 'budget', label: 'Travel Budget', icon: Wallet, color: 'text-green-400' },
  { id: 'safety', label: 'Travel Safety', icon: Shield, color: 'text-teal-400' },
  { id: 'sources', label: 'Sources', icon: BookOpen, color: 'text-gray-400' },
];

const sectionComponents = {
  overview: Overview,
  destinations: TopDestinations,
  hotels: HotelGuide,
  food: FoodCulinary,
  activities: Activities,
  nightlife: Nightlife,
  budget: TravelBudget,
  safety: Safety,
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
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Travel Guide</h1>
              <p className="text-[10px] text-gray-500">Global Vacationer Intel</p>
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
                    ? 'bg-cyan-500/10 text-cyan-300'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <s.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? s.color : 'text-gray-500 group-hover:text-gray-400'}`} />
                <span className="truncate font-medium">{s.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-cyan-500/50" />}
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
