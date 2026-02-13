import React, { useState } from 'react';
import { constellations, starTypes } from '../data/skyData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { nightSkyQuiz } from '../data/quizData';

function ConstellationDetail({ c }) {
  return (
    <div className="space-y-3 animate-in fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl">
          {c.emoji}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{c.name}</h3>
          <p className="text-[10px] text-gray-500">{c.otherName}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              {c.bestSeason}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium border ${
              c.difficulty === 'Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {c.difficulty}
            </span>
            <span className="text-[9px] text-gray-600">{c.stars} main stars</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{c.description}</p>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 space-y-3">
        <div>
          <h4 className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">🔭 How to Find It</h4>
          <p className="text-sm text-gray-300">{c.howToFind}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-purple-400 mb-1 flex items-center gap-1.5">📖 The Story</h4>
          <p className="text-sm text-gray-300">{c.mythology}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">⭐ Fun Fact</h4>
          <p className="text-sm text-gray-300">{c.funFact}</p>
        </div>
      </div>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{c.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

function StarTypesSection() {
  const s = starTypes;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-white flex items-center gap-2">✨ {s.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{s.explanation}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {s.types.map(t => (
          <div key={t.name} className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: t.color, boxShadow: `0 0 12px ${t.color}66` }} />
              <span className="text-xs font-bold text-white">{t.name}</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-snug mb-2">{t.description}</p>
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500"><span className="text-gray-400 font-medium">Temp:</span> {t.temp}</p>
              <p className="text-[10px] text-gray-500"><span className="text-gray-400 font-medium">Size:</span> {t.size}</p>
              <p className="text-[10px] text-gray-500"><span className="text-gray-400 font-medium">Lifespan:</span> {t.lifespan}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Amazing Star Facts</h4>
        <div className="space-y-2">
          {s.funFacts.map((f, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-xs flex-shrink-0 mt-0.5">✨</span>
              <p>{f}</p>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Time Travel!</p>
        <p>When you look at the star Betelgeuse in Orion, you are seeing light that left that star about <strong>700 years ago</strong> — before Columbus sailed to America! You are literally looking back in time!</p>
      </InsightCallout>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{s.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

export default function NightSky() {
  const [tab, setTab] = useState('constellations');
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🌟 The Night Sky
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          What can you see when you look up at night? Stars, constellations, and so much more!
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab('constellations')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            tab === 'constellations' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          ⭐ Constellations
        </button>
        <button
          onClick={() => setTab('stars')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            tab === 'stars' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          ✨ Types of Stars
        </button>
      </div>

      {tab === 'constellations' && (
        <div className="space-y-4">
          <InsightCallout variant="info">
            <p className="font-bold">What is a Constellation?</p>
            <p>A constellation is a group of stars that makes a picture or pattern in the sky. Ancient people made up stories about these patterns thousands of years ago! There are 88 official constellations, but here are the ones that are easiest for kids to find.</p>
          </InsightCallout>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {constellations.map((c, i) => {
              const isSelected = selectedConstellation === i;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedConstellation(isSelected ? null : i)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-indigo-500/40 bg-indigo-500/10 scale-105 shadow-lg'
                      : 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className={`text-[10px] font-bold text-center leading-tight ${isSelected ? 'text-white' : 'text-gray-400'}`}>{c.name}</span>
                  <span className="text-[8px] text-gray-600">{c.bestSeason}</span>
                </button>
              );
            })}
          </div>

          {selectedConstellation !== null ? (
            <ConstellationDetail c={constellations[selectedConstellation]} />
          ) : (
            <div className="text-center py-8 border border-dashed border-gray-800 rounded-xl">
              <span className="text-4xl block mb-2">🔭</span>
              <p className="text-gray-400 text-sm font-medium">Pick a constellation above to explore!</p>
              <p className="text-gray-600 text-xs mt-1">Learn how to find it, its story, and a fun fact!</p>
            </div>
          )}
        </div>
      )}

      {tab === 'stars' && <StarTypesSection />}

      <QuizSection questions={nightSkyQuiz} />
    </div>
  );
}
