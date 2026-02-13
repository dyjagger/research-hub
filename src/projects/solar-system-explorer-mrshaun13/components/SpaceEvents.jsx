import React, { useState } from 'react';
import { spaceEvents } from '../data/skyData';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';
import { spaceEventsQuiz } from '../data/quizData';

const CATEGORY_COLORS = {
  Common: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Seasonal: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  Rare: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Occasional: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Location-dependent': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
};

function EventDetail({ event }) {
  const e = event;
  const cat = CATEGORY_COLORS[e.category] || CATEGORY_COLORS.Common;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/30 flex items-center justify-center text-4xl">
          {e.emoji}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{e.name}</h3>
          {e.realName !== e.name && <p className="text-[10px] text-gray-500">Real name: {e.realName}</p>}
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium border ${cat.bg} ${cat.text} ${cat.border} mt-1 inline-block`}>
            {e.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{e.description}</p>

      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
        <h4 className="text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">👀 How to See It</h4>
        <p className="text-sm text-gray-300">{e.howToSee}</p>
      </div>

      {e.funFacts && (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cool Facts</h4>
          <div className="space-y-2">
            {e.funFacts.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-xs flex-shrink-0 mt-0.5">⭐</span>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {e.vocabulary && (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">📝 Space Vocabulary</h4>
          <div className="space-y-2">
            {e.vocabulary.map((v, i) => (
              <div key={i} className="text-sm">
                <span className="font-bold text-indigo-300">{v.word}:</span>{' '}
                <span className="text-gray-400">{v.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {e.majorShowers && (
        <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">🗓️ Best Meteor Showers of the Year</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-1.5 px-2 text-[10px] text-gray-500 font-bold">Name</th>
                  <th className="text-center py-1.5 px-2 text-[10px] text-gray-500 font-bold">Peak</th>
                  <th className="text-center py-1.5 px-2 text-[10px] text-gray-500 font-bold">Rate</th>
                  <th className="text-left py-1.5 px-2 text-[10px] text-gray-500 font-bold">Caused By</th>
                </tr>
              </thead>
              <tbody>
                {e.majorShowers.map((s, i) => (
                  <tr key={s.name} className={`border-b border-gray-800/50 ${i % 2 === 0 ? 'bg-gray-800/10' : ''}`}>
                    <td className="py-2 px-2 text-xs font-bold text-white">{s.name}</td>
                    <td className="py-2 px-2 text-xs text-gray-300 text-center">{s.peak}</td>
                    <td className="py-2 px-2 text-xs text-indigo-300 text-center font-medium">{s.rate}</td>
                    <td className="py-2 px-2 text-[10px] text-gray-500">{s.parent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{e.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

export default function SpaceEvents() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          💫 Things You Can See in Space!
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          You do not need a spaceship to experience space! Here are amazing things you can see from your own backyard!
        </p>
      </div>

      <InsightCallout variant="info">
        <p className="font-bold">Stargazing Tips!</p>
        <p>To see the best stuff in the night sky: 1) Get away from city lights. 2) Let your eyes adjust to the dark for 15-20 minutes. 3) Bring a blanket and lie on your back. 4) Be patient — the best things take time to spot!</p>
      </InsightCallout>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {spaceEvents.map((e, i) => {
          const isSelected = selected === i;
          const cat = CATEGORY_COLORS[e.category] || CATEGORY_COLORS.Common;
          return (
            <button
              key={e.name}
              onClick={() => setSelected(isSelected ? null : i)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500/40 bg-indigo-500/10 scale-105 shadow-lg'
                  : 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:scale-105'
              }`}
            >
              <span className="text-2xl">{e.emoji}</span>
              <span className={`text-[10px] font-bold text-center leading-tight ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                {e.name}
              </span>
              <span className={`text-[8px] px-1 py-0.5 rounded-full ${cat.text}`}>{e.category}</span>
            </button>
          );
        })}
      </div>

      {selected !== null ? (
        <EventDetail event={spaceEvents[selected]} />
      ) : (
        <div className="text-center py-10 border border-dashed border-gray-800 rounded-xl">
          <span className="text-5xl block mb-3">🌠</span>
          <p className="text-gray-400 text-sm font-medium">Pick a space event above to learn about it!</p>
          <p className="text-gray-600 text-xs mt-1">Find out what shooting stars really are, how to see eclipses, and more!</p>
        </div>
      )}

      <QuizSection questions={spaceEventsQuiz} />
    </div>
  );
}
