import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { grammarLevels, sentenceStructureGuide } from '../data/grammar';

const LEVEL_COLORS = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'ring-emerald-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', ring: 'ring-cyan-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', ring: 'ring-amber-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', ring: 'ring-violet-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', ring: 'ring-rose-500/20' },
};

function GrammarTopic({ topic, color }) {
  const [open, setOpen] = useState(false);
  const c = LEVEL_COLORS[color] || LEVEL_COLORS.emerald;

  return (
    <div className="border border-gray-800/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-800/30 transition-colors"
      >
        {open ? <ChevronDown className={`w-4 h-4 ${c.text} flex-shrink-0`} /> : <ChevronRight className={`w-4 h-4 ${c.text} flex-shrink-0`} />}
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white">{topic.title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{topic.summary}</p>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          {topic.points.map((pt, i) => (
            <div key={i} className={`p-3 rounded-lg ${c.bg} border ${c.border}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-sm font-bold ${c.text}`}>{pt.particle}</span>
                <span className="text-xs text-gray-400">— {pt.role}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white font-medium">{pt.example}</p>
                <p className="text-xs text-gray-400 font-mono">{pt.romaji}</p>
                <p className="text-xs text-gray-300">{pt.english}</p>
                {pt.note && <p className="text-xs text-gray-500 italic mt-1">{pt.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Grammar() {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Grammar Guide</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Japanese grammar organized by JLPT level, from N5 (beginner) to N1 (advanced).
          Each topic includes examples with hiragana, romaji, English translation, and usage notes.
          Click any topic to expand its grammar points.
        </p>
      </div>

      <InsightCallout color="amber">
        Don't try to learn all grammar at once. Focus on one level at a time. Master N5 particles and
        sentence structure first — they appear in every single Japanese sentence. Then move to N4's
        て-form, which unlocks dozens of grammar patterns.
      </InsightCallout>

      <div className="flex gap-2 flex-wrap border-b border-gray-800 pb-2">
        {grammarLevels.map((level, i) => {
          const c = LEVEL_COLORS[level.color];
          return (
            <button
              key={i}
              onClick={() => setActiveLevel(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeLevel === i
                  ? `${c.bg} ${c.text} border ${c.border}`
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {level.level}
            </button>
          );
        })}
      </div>

      <div>
        <div className="mb-4">
          <h3 className={`text-lg font-semibold ${LEVEL_COLORS[grammarLevels[activeLevel].color].text}`}>
            {grammarLevels[activeLevel].level}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{grammarLevels[activeLevel].description}</p>
        </div>
        <div className="space-y-3">
          {grammarLevels[activeLevel].topics.map((topic) => (
            <GrammarTopic key={topic.id} topic={topic} color={grammarLevels[activeLevel].color} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Sentence Structure Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Pattern</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Example</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Romaji</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">English</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Level</th>
              </tr>
            </thead>
            <tbody>
              {sentenceStructureGuide.map((row, i) => {
                const levelColor = {
                  N5: 'text-emerald-400',
                  N4: 'text-cyan-400',
                  N3: 'text-amber-400',
                }[row.level] || 'text-gray-400';
                return (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-3 text-gray-200 font-mono text-xs">{row.pattern}</td>
                    <td className="py-2 px-3 text-white text-xs">{row.example}</td>
                    <td className="py-2 px-3 text-gray-400 text-xs font-mono">{row.romaji}</td>
                    <td className="py-2 px-3 text-gray-300 text-xs">{row.english}</td>
                    <td className={`py-2 px-3 text-xs font-bold ${levelColor}`}>{row.level}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
