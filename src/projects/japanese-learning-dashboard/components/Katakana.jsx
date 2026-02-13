import React, { useState } from 'react';
import InsightCallout from './InsightCallout';
import { katakanaChart, dakutenKatakana, specialKatakana, katakanaLoanwords } from '../data/katakana';

function KanaGrid({ data }) {
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
                  className="w-16 h-16 bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-default group"
                >
                  <span className="text-xl text-white group-hover:text-cyan-300 transition-colors">{ch.kana}</span>
                  <span className="text-[10px] text-gray-500 group-hover:text-cyan-400 transition-colors">{ch.romaji}</span>
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

export default function Katakana() {
  const [tab, setTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic (46)' },
    { id: 'dakuten', label: 'Dakuten (25)' },
    { id: 'special', label: 'Special Combos' },
    { id: 'loanwords', label: 'Common Loanwords' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">カタカナ — Katakana</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Katakana is used for foreign loanwords, foreign names, onomatopoeia, scientific terms, and emphasis.
          It has the same sounds as hiragana but with different, more angular character shapes.
        </p>
      </div>

      <InsightCallout color="cyan">
        Katakana is everywhere in modern Japanese — restaurant menus, product names, technology terms, and
        foreign words. Since many loanwords come from English, you can often guess the meaning by sounding
        out the katakana. コンピューター (konpyuutaa) = computer, レストラン (resutoran) = restaurant.
      </InsightCallout>

      <div className="flex gap-2 border-b border-gray-800 pb-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'basic' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Basic Katakana Chart</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-3 mb-3 ml-[88px]">
              {['a', 'i', 'u', 'e', 'o'].map((v) => (
                <div key={v} className="w-16 text-center text-xs text-gray-500 font-medium">{v}</div>
              ))}
            </div>
            <KanaGrid data={katakanaChart} />
          </div>
          <div className="mt-6 bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Katakana vs Hiragana</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>- Same sounds, different shapes — katakana characters are more angular and sharp</li>
              <li>- Commonly confused pairs: シ (shi) vs ツ (tsu), ソ (so) vs ン (n), ノ (no) vs メ (me)</li>
              <li>- The long vowel mark ー extends the previous vowel: コーヒー (koohii = coffee)</li>
              <li>- Small ッ (tsu) doubles the next consonant: ベッド (beddo = bed)</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'dakuten' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Dakuten (゛) & Handakuten (゜)</h3>
          <p className="text-sm text-gray-400 mb-4">
            Same voicing rules as hiragana: K→G, S→Z, T→D, H→B (dakuten) and H→P (handakuten).
          </p>
          <div className="overflow-x-auto">
            <KanaGrid data={dakutenKatakana} />
          </div>
        </div>
      )}

      {tab === 'special' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Special Katakana Combinations</h3>
          <p className="text-sm text-gray-400 mb-4">
            These combinations were created to represent sounds from foreign languages that don't exist
            in native Japanese. They're essential for reading modern katakana words.
          </p>
          <div className="space-y-2">
            {specialKatakana.map((item) => (
              <div key={item.kana} className="flex items-center gap-4 p-3 bg-gray-900/30 border border-gray-800/50 rounded-lg hover:border-cyan-500/30 transition-colors">
                <span className="text-2xl text-white w-12 text-center flex-shrink-0">{item.kana}</span>
                <span className="text-sm text-cyan-400 w-12 flex-shrink-0 font-mono">{item.romaji}</span>
                <span className="text-xs text-gray-400">{item.usage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'loanwords' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Common Katakana Loanwords</h3>
          <p className="text-sm text-gray-400 mb-4">
            Practice reading katakana with these common English-origin words. Sound them out — you'll
            recognize most of them!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {katakanaLoanwords.map((word) => (
              <div key={word.japanese} className="flex items-center gap-3 p-3 bg-gray-900/30 border border-gray-800/50 rounded-lg hover:border-cyan-500/30 transition-colors">
                <span className="text-lg text-white flex-shrink-0 min-w-[120px]">{word.japanese}</span>
                <div className="min-w-0">
                  <span className="text-xs text-cyan-400 font-mono">{word.romaji}</span>
                  <span className="text-xs text-gray-500 ml-2">= {word.english}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
