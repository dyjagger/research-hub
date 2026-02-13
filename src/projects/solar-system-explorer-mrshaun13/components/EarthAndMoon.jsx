import React, { useState } from 'react';
import { earthRotation, seasons, moonPhases } from '../data/skyData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { earthMoonQuiz } from '../data/quizData';

function DayNightSection() {
  const r = earthRotation;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🌍 {r.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{r.explanation}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {r.diagram.map(d => (
          <div key={d.label} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-3 text-center">
            <span className="text-3xl block">{d.emoji}</span>
            <p className="text-xs font-bold text-white mt-1.5">{d.label}</p>
            <p className="text-[10px] text-indigo-400 font-medium">{d.time}</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-snug">{d.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cool Facts About Earth's Spin</h4>
        <div className="space-y-2">
          {r.keyFacts.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-xs flex-shrink-0 mt-0.5">🌀</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{r.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

function SeasonsSection() {
  const s = seasons;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🌸 {s.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{s.explanation}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {s.seasonCards.map(sc => (
          <div key={sc.name} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-3.5">
            <span className="text-3xl block text-center">{sc.emoji}</span>
            <p className="text-sm font-bold text-white text-center mt-1">{sc.name}</p>
            <p className="text-[10px] text-indigo-400 text-center font-medium">{sc.months}</p>
            <p className="text-[10px] text-gray-400 mt-2 leading-snug">{sc.description}</p>
            <div className="mt-2 pt-2 border-t border-gray-700/30 space-y-1">
              <p className="text-[10px] text-gray-500"><span className="text-gray-400 font-medium">Temp:</span> {sc.temp}</p>
              <p className="text-[10px] text-gray-500"><span className="text-gray-400 font-medium">Sunlight:</span> {sc.sunlight}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Facts About Seasons</h4>
        <div className="space-y-2">
          {s.keyFacts.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-xs flex-shrink-0 mt-0.5">🔆</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Wait, what?!</p>
        <p>Earth is actually <strong>closer</strong> to the Sun in January (winter in the US) than in July (summer)! Seasons are caused by the tilt, not the distance!</p>
      </InsightCallout>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{s.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

function MoonPhasesSection() {
  const m = moonPhases;
  const [selectedPhase, setSelectedPhase] = useState(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">🌙 {m.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{m.explanation}</p>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {m.phases.map((p, i) => {
          const isSelected = selectedPhase === i;
          return (
            <button
              key={p.name}
              onClick={() => setSelectedPhase(isSelected ? null : i)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500/40 bg-indigo-500/10 scale-105'
                  : 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:scale-105'
              }`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-[9px] font-bold text-gray-400 leading-tight text-center">{p.name}</span>
            </button>
          );
        })}
      </div>

      {selectedPhase !== null && (
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{m.phases[selectedPhase].emoji}</span>
            <div>
              <h4 className="text-sm font-bold text-white">{m.phases[selectedPhase].name}</h4>
              <p className="text-[10px] text-indigo-400">Visible: {m.phases[selectedPhase].visible}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300">{m.phases[selectedPhase].description}</p>
        </div>
      )}

      {selectedPhase === null && (
        <div className="text-center py-4 border border-dashed border-gray-800 rounded-xl">
          <p className="text-gray-500 text-xs">👆 Tap a moon phase above to learn about it!</p>
        </div>
      )}

      <InsightCallout variant="info">
        <p className="font-bold">Memory Trick!</p>
        <p>{m.memoryTrick}</p>
      </InsightCallout>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Moon Facts</h4>
        <div className="space-y-2">
          {m.keyFacts.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-xs flex-shrink-0 mt-0.5">🌙</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{m.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

export default function EarthAndMoon() {
  const [tab, setTab] = useState('daynight');

  const tabs = [
    { id: 'daynight', label: 'Day & Night', emoji: '🌅' },
    { id: 'seasons', label: 'Seasons', emoji: '🌸' },
    { id: 'moon', label: 'Moon Phases', emoji: '🌙' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🌍 Earth, Moon & Seasons
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Why do we have day and night? Why do seasons change? What are those shapes the Moon makes? Let's find out!
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              tab === t.id ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      {tab === 'daynight' && <DayNightSection />}
      {tab === 'seasons' && <SeasonsSection />}
      {tab === 'moon' && <MoonPhasesSection />}

      <QuizSection questions={earthMoonQuiz} />
    </div>
  );
}
