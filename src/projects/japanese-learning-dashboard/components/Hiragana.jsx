import React, { useState } from 'react';
import InsightCallout from './InsightCallout';
import { hiraganaChart, dakutenHiragana, comboHiragana } from '../data/hiragana';

function KanaGrid({ data, columns = 5 }) {
  return (
    <div className="space-y-2">
      {data.map((row) => (
        <div key={row.group} className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 w-20 flex-shrink-0 text-right font-medium">{row.group}</span>
          <div className="flex gap-1.5 flex-wrap">
            {row.chars.map((ch, i) => (
              ch.kana ? (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col items-center justify-center hover:border-rose-500/50 hover:bg-rose-500/5 transition-all cursor-default group"
                >
                  <span className="text-xl text-white group-hover:text-rose-300 transition-colors">{ch.kana}</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-rose-400 transition-colors">{ch.romaji}</span>
                </div>
              ) : (
                <div key={i} className="w-16 h-16" />
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComboGrid({ data }) {
  return (
    <div className="space-y-2">
      {data.map((row) => (
        <div key={row.group} className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 w-20 flex-shrink-0 text-right font-medium">{row.group}</span>
          <div className="flex gap-1.5 flex-wrap">
            {row.chars.map((ch, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col items-center justify-center hover:border-violet-500/50 hover:bg-violet-500/5 transition-all cursor-default group"
              >
                <span className="text-lg text-white group-hover:text-violet-300 transition-colors">{ch.kana}</span>
                <span className="text-[10px] text-gray-500 group-hover:text-violet-400 transition-colors">{ch.romaji}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hiragana() {
  const [tab, setTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic (46)' },
    { id: 'dakuten', label: 'Dakuten (25)' },
    { id: 'combos', label: 'Combos (33)' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">ひらがな — Hiragana</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Hiragana is the primary Japanese writing system for native words, grammar particles, and verb endings.
          It's the first thing every learner should master. Each character represents one syllable (mora).
        </p>
      </div>

      <InsightCallout color="rose">
        Hiragana has 46 basic characters, 25 dakuten/handakuten variations (voiced sounds), and 33 combination
        characters — totaling 104 sounds. Most learners can memorize all basic hiragana in 1-2 weeks with
        daily practice. Write each character by hand at least 10 times to build muscle memory.
      </InsightCallout>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basic' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Basic Hiragana Chart</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-3 mb-3 ml-[88px]">
              {['a', 'i', 'u', 'e', 'o'].map((v) => (
                <div key={v} className="w-16 text-center text-xs text-gray-500 font-medium">{v}</div>
              ))}
            </div>
            <KanaGrid data={hiraganaChart} />
          </div>
          <div className="mt-6 bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Tips for Learning</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>- Start with the vowels (あいうえお) — they're the foundation of every row</li>
              <li>- Learn one row per day (K-row, S-row, etc.) and review previous rows</li>
              <li>- は is pronounced "wa" when used as a topic particle, but "ha" otherwise</li>
              <li>- を is almost always the object particle, pronounced "o" (not "wo")</li>
              <li>- ん (n) is the only consonant that can stand alone</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'dakuten' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Dakuten (゛) & Handakuten (゜)</h3>
          <p className="text-sm text-gray-400 mb-4">
            Adding two small marks (゛ dakuten) or a small circle (゜ handakuten) to basic characters
            creates voiced or semi-voiced sounds. K→G, S→Z, T→D, H→B (dakuten) and H→P (handakuten).
          </p>
          <div className="overflow-x-auto">
            <KanaGrid data={dakutenHiragana} />
          </div>
          <div className="mt-6 bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Notes</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>- じ (ji) and ぢ (ji) sound the same — じ is far more common</li>
              <li>- ず (zu) and づ (zu) sound the same — ず is far more common</li>
              <li>- The P-row (ぱ行) uses handakuten (゜) instead of dakuten (゛)</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'combos' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Combination Characters (拗音 youon)</h3>
          <p className="text-sm text-gray-400 mb-4">
            Formed by combining a consonant character with a small や (ya), ゆ (yu), or よ (yo).
            The small character merges with the previous sound into a single syllable.
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-3 mb-3 ml-[88px]">
              {['ya', 'yu', 'yo'].map((v) => (
                <div key={v} className="w-16 text-center text-xs text-gray-500 font-medium">{v}</div>
              ))}
            </div>
            <ComboGrid data={comboHiragana} />
          </div>
          <div className="mt-6 bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Rule</h4>
            <p className="text-xs text-gray-400">
              The second character (や/ゆ/よ) must be written <strong className="text-gray-200">small</strong> (ゃ/ゅ/ょ).
              Full-size would be two separate syllables: きや (ki-ya) vs きゃ (kya).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
