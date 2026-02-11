import React, { useState } from 'react';
import { Leaf, Map, Building2, List, ShieldAlert, ChefHat, Lightbulb, BookOpen } from 'lucide-react';
import Overview from './components/Overview';
import InteractiveMap from './components/InteractiveMap';
import CityGuide from './components/CityGuide';
import RestaurantDirectory from './components/RestaurantDirectory';
import FoodSafetyGuide from './components/FoodSafetyGuide';
import CuisineExplorer from './components/CuisineExplorer';
import PracticalTips from './components/PracticalTips';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: Leaf },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'cities', label: 'City Guide', icon: Building2 },
  { id: 'directory', label: 'Restaurant Directory', icon: List },
  { id: 'safety', label: 'Food Safety', icon: ShieldAlert },
  { id: 'cuisine', label: 'Cuisine Explorer', icon: ChefHat },
  { id: 'tips', label: 'Practical Tips', icon: Lightbulb },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

const App = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'map': return <InteractiveMap />;
      case 'cities': return <CityGuide />;
      case 'directory': return <RestaurantDirectory />;
      case 'safety': return <FoodSafetyGuide />;
      case 'cuisine': return <CuisineExplorer />;
      case 'tips': return <PracticalTips />;
      case 'sources': return <Sources />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-full bg-gray-950">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 bg-gray-900/80 border-r border-gray-800/60 flex flex-col">
        <div className="p-4 border-b border-gray-800/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf size={18} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-100 leading-tight">Japan Vegan &</h1>
              <h1 className="text-sm font-bold text-gray-100 leading-tight">Gluten-Free Guide</h1>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-2">46 restaurants · 6 cities · Interactive map</p>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {sections.map(section => (
            <button key={section.id} onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                activeSection === section.id
                  ? 'bg-green-500/15 text-green-300 font-medium'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/40'
              }`}>
              <section.icon size={16} className={activeSection === section.id ? 'text-green-400' : ''} />
              {section.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-800/60">
          <div className="text-[10px] text-gray-600 space-y-0.5">
            <p>Data: Feb 2026</p>
            <p>14 sources · T1-T3 quality</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default App;
