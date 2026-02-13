import React, { useState } from 'react';
import { GraduationCap, BarChart3, Table2, DollarSign, Users, GitCompare, Award, BookOpen } from 'lucide-react';
import { curricula } from './data/curricula';
import { programs } from './data/programs';
import Overview from './components/Overview';
import CurriculumComparison from './components/CurriculumComparison';
import CostAnalysis from './components/CostAnalysis';
import CoopPrograms from './components/CoopPrograms';
import HeadToHead from './components/HeadToHead';
import Recommendations from './components/Recommendations';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: GraduationCap },
  { id: 'curricula', label: 'Curriculum Comparison', icon: Table2 },
  { id: 'cost', label: 'Cost Analysis', icon: DollarSign },
  { id: 'coops', label: 'Co-op Programs', icon: Users },
  { id: 'headtohead', label: 'CHET vs Anchored', icon: GitCompare },
  { id: 'recommendations', label: 'Recommendations', icon: Award },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

const coopCount = programs.filter(p => p.youChooseCurriculum).length;
const nearbyCount = programs.filter(p => p.distanceFromZip?.includes('zip') || p.driveTime?.includes('5')).length;

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'curricula': return <CurriculumComparison />;
      case 'cost': return <CostAnalysis />;
      case 'coops': return <CoopPrograms />;
      case 'headtohead': return <HeadToHead />;
      case 'recommendations': return <Recommendations />;
      case 'sources': return <Sources />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 min-w-[256px] bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-violet-400" />
            <h1 className="text-lg font-bold text-white">Homeschool Guide</h1>
          </div>
          <p className="text-xs text-gray-400">Curriculum & Co-op Research</p>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === id
                  ? 'bg-violet-500/20 text-violet-400 border-l-2 border-violet-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Curricula compared</span>
            <span className="text-gray-300 font-medium">{curricula.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Co-op programs</span>
            <span className="text-gray-300 font-medium">{programs.length}</span>
          </div>
          <div className="flex justify-between">
            <span>You-choose-curriculum</span>
            <span className="text-emerald-400 font-medium">{coopCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Near 37075</span>
            <span className="text-violet-400 font-medium">{nearbyCount}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800 text-gray-600">
            Data: Feb 2026
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
