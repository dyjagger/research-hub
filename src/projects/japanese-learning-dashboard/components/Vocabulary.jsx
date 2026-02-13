import React, { useState } from 'react';
import { Search } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { vocabularyByCategory, commonPhrases } from '../data/vocabulary';

export default function Vocabulary() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('vocab');

  const filteredWords = searchQuery
    ? vocabularyByCategory.flatMap((cat) =>
        cat.words
          .filter(
            (w) =>
              w.japanese.includes(searchQuery) ||
              w.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
              w.english.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((w) => ({ ...w, category: cat.category }))
      )
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Vocabulary & Phrases</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Essential Japanese vocabulary organized by category, plus survival phrases for real-world situations.
          Each word includes hiragana, romaji, English meaning, and usage notes.
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setTab('vocab')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'vocab' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          Vocabulary
        </button>
        <button
          onClick={() => setTab('phrases')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'phrases' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
          }`}
        >
          Common Phrases
        </button>
      </div>

      {tab === 'vocab' && (
        <>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search vocabulary (Japanese, romaji, or English)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
            />
          </div>

          {filteredWords ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">
                {filteredWords.length} result{filteredWords.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h3>
              <div className="space-y-1.5">
                {filteredWords.map((w, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-900/30 border border-gray-800/50 rounded-lg">
                    <span className="text-lg text-white min-w-[100px]">{w.japanese}</span>
                    <span className="text-xs text-emerald-400 font-mono min-w-[100px]">{w.romaji}</span>
                    <span className="text-sm text-gray-300 flex-1">{w.english}</span>
                    <span className="text-[10px] text-gray-600">{w.category}</span>
                  </div>
                ))}
                {filteredWords.length === 0 && (
                  <p className="text-sm text-gray-500 py-4 text-center">No matches found. Try a different search term.</p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-2 flex-wrap">
                {vocabularyByCategory.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === i
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
                    }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-white">{vocabularyByCategory[activeCategory].category}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {vocabularyByCategory[activeCategory].level}
                  </span>
                  <span className="text-xs text-gray-500">{vocabularyByCategory[activeCategory].words.length} words</span>
                </div>
                <div className="space-y-1.5">
                  {vocabularyByCategory[activeCategory].words.map((w, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-900/30 border border-gray-800/50 rounded-lg hover:border-emerald-500/30 transition-colors">
                      <span className="text-lg text-white min-w-[140px]">{w.japanese}</span>
                      <span className="text-xs text-emerald-400 font-mono min-w-[120px]">{w.romaji}</span>
                      <span className="text-sm text-gray-300 flex-1">{w.english}</span>
                      {w.note && <span className="text-[10px] text-gray-500 max-w-[200px]">{w.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {tab === 'phrases' && (
        <div className="space-y-8">
          <InsightCallout color="violet">
            These phrases are organized by situation. Memorize the Survival Phrases first — they'll get
            you through most basic interactions in Japan. Practice saying them out loud to build muscle memory.
          </InsightCallout>

          {commonPhrases.map((section) => (
            <div key={section.category}>
              <h3 className="text-lg font-semibold text-white mb-3">{section.category}</h3>
              <div className="space-y-2">
                {section.phrases.map((p, i) => (
                  <div key={i} className="p-3 bg-gray-900/30 border border-gray-800/50 rounded-lg hover:border-violet-500/30 transition-colors">
                    <p className="text-base text-white mb-1">{p.japanese}</p>
                    <p className="text-xs text-violet-400 font-mono">{p.romaji}</p>
                    <p className="text-sm text-gray-400 mt-1">{p.english}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
