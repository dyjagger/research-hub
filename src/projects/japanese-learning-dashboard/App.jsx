import React, { useState } from 'react';
import {
  LayoutDashboard, Languages, Type, BookOpen, MessageSquare,
  GraduationCap, Route, FileText, Sparkles,
} from 'lucide-react';
import Overview from './components/Overview';
import Hiragana from './components/Hiragana';
import Katakana from './components/Katakana';
import Grammar from './components/Grammar';
import Vocabulary from './components/Vocabulary';
import Verbs from './components/Verbs';
import Translator from './components/Translator';
import Courses from './components/Courses';
import Sources from './components/Sources';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, component: Overview },
  { id: 'hiragana', label: 'Hiragana', icon: Type, component: Hiragana },
  { id: 'katakana', label: 'Katakana', icon: Languages, component: Katakana },
  { id: 'grammar', label: 'Grammar Guide', icon: BookOpen, component: Grammar },
  { id: 'vocabulary', label: 'Vocabulary', icon: MessageSquare, component: Vocabulary },
  { id: 'verbs', label: 'Verb Reference', icon: Sparkles, component: Verbs },
  { id: 'translator', label: 'Translator', icon: GraduationCap, component: Translator },
  { id: 'courses', label: 'Learning Path', icon: Route, component: Courses },
  { id: 'sources', label: 'Sources', icon: FileText, component: Sources },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const ActiveComponent = SECTIONS.find((s) => s.id === activeSection)?.component || Overview;

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      <aside className="w-56 flex-shrink-0 bg-gray-900/50 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-white tracking-tight">にほんご</h2>
          <p className="text-[10px] text-gray-500 mt-0.5">Japanese Learning Dashboard</p>
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
                    ? 'bg-rose-500/10 text-rose-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <section.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-rose-400' : 'text-gray-500'}`} />
                <span className="truncate text-[13px] font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800 text-[10px] text-gray-600">
          <p>JLPT N5 → N1 · Beginner → Advanced</p>
          <p className="mt-0.5">12 sources · 9 sections · 800+ items</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
