import React, { useState, useMemo } from 'react';
import { ArrowRight, BookOpen, AlertTriangle, Sparkles } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { dictionary, grammarNotes } from '../data/translator';

function tokenize(sentence) {
  return sentence
    .toLowerCase()
    .replace(/[.,!?;:'"()]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function translateSentence(sentence) {
  const tokens = tokenize(sentence);
  if (tokens.length === 0) return null;

  const wordResults = [];
  const unknownWords = [];
  const particles = [];
  const grammarTips = new Set();
  const skipArticles = new Set(['the', 'a', 'an']);

  let hasSubject = false;
  let hasObject = false;
  let hasVerb = false;
  let hasLocation = false;
  let hasTime = false;
  let hasDirection = false;

  const multiWordLookup = {};
  for (let i = 0; i < tokens.length - 1; i++) {
    const twoWord = tokens[i] + ' ' + tokens[i + 1];
    if (dictionary[twoWord]) {
      multiWordLookup[i] = { entry: dictionary[twoWord], span: 2, original: twoWord };
    }
  }

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];

    if (multiWordLookup[i]) {
      const { entry, span, original } = multiWordLookup[i];
      wordResults.push({ english: original, ...entry });
      i += span;
      continue;
    }

    if (skipArticles.has(token)) {
      grammarTips.add('noArticles');
      wordResults.push({ english: token, japanese: '', romaji: '', pos: 'article', note: 'No articles in Japanese — omitted.' });
      i++;
      continue;
    }

    const entry = dictionary[token];
    if (entry) {
      wordResults.push({ english: token, ...entry });

      if (entry.pos === 'pronoun' && !hasSubject) {
        hasSubject = true;
        particles.push({ word: entry.japanese, particle: 'は', role: 'topic marker' });
        grammarTips.add('particles');
      }

      if (entry.pos?.startsWith('verb') || entry.pos === 'verb') {
        hasVerb = true;
      }

      if (entry.pos === 'noun' && hasSubject && !hasVerb) {
        if (['to', 'at', 'in'].includes(tokens[i - 1])) {
          if (tokens[i - 1] === 'to') {
            hasDirection = true;
            particles.push({ word: entry.japanese, particle: 'に', role: 'direction' });
          } else {
            hasLocation = true;
            particles.push({ word: entry.japanese, particle: 'で', role: 'location of action' });
          }
        } else {
          hasObject = true;
          particles.push({ word: entry.japanese, particle: 'を', role: 'object marker' });
        }
      }
    } else {
      unknownWords.push(token);
      wordResults.push({ english: token, japanese: '?', romaji: '?', pos: 'unknown', note: 'Not in dictionary' });
    }
    i++;
  }

  grammarTips.add('sovOrder');
  grammarTips.add('politeness');
  if (tokens.some(t => ['not', "don't", "doesn't", "didn't", "won't", "can't", "isn't", "aren't"].includes(t))) {
    grammarTips.add('negation');
  }

  const subjectWords = wordResults.filter(w => w.pos === 'pronoun').map(w => w.japanese + ' は');
  const objectWords = wordResults.filter(w => w.pos === 'noun' && w.japanese).map(w => w.japanese + ' を');
  const verbWords = wordResults.filter(w => w.pos?.startsWith('verb') && w.japanese).map(w => {
    if (w.pos === 'verb-ru') return w.japanese.replace(/る$/, 'ます');
    if (w.pos === 'verb-u') {
      const base = w.japanese;
      const lastChar = base[base.length - 1];
      const uToI = { 'く': 'き', 'す': 'し', 'つ': 'ち', 'ぬ': 'に', 'む': 'み', 'る': 'り', 'う': 'い', 'ぶ': 'び', 'ぐ': 'ぎ' };
      if (uToI[lastChar]) return base.slice(0, -1) + uToI[lastChar] + 'ます';
      return base;
    }
    if (w.pos === 'verb-irr') {
      if (w.japanese === 'する' || w.japanese.endsWith('する')) return w.japanese.replace(/する$/, 'します');
      if (w.japanese === 'くる') return 'きます';
      return w.japanese;
    }
    return w.japanese;
  });
  const adjWords = wordResults.filter(w => w.pos?.startsWith('adj') && w.japanese).map(w => w.japanese);
  const copulaWords = wordResults.filter(w => w.pos === 'copula').map(w => w.japanese);
  const otherWords = wordResults.filter(w =>
    w.pos !== 'pronoun' && !w.pos?.startsWith('verb') && w.pos !== 'noun' &&
    !w.pos?.startsWith('adj') && w.pos !== 'copula' && w.pos !== 'article' &&
    w.pos !== 'particle' && w.pos !== 'conjunction' && w.pos !== 'unknown' &&
    w.japanese
  ).map(w => w.japanese);

  let japaneseParts = [];
  let romajiParts = [];

  if (subjectWords.length > 0) {
    japaneseParts.push(...subjectWords);
  }
  if (otherWords.length > 0) japaneseParts.push(...otherWords);
  if (objectWords.length > 0) japaneseParts.push(...objectWords);
  if (adjWords.length > 0) {
    japaneseParts.push(...adjWords);
    if (copulaWords.length > 0 || verbWords.length === 0) {
      japaneseParts.push('です');
    }
  }
  if (verbWords.length > 0) japaneseParts.push(...verbWords);
  else if (copulaWords.length > 0 && adjWords.length === 0) {
    const nounsBefore = wordResults.filter(w => w.pos === 'noun' && w.japanese);
    if (nounsBefore.length > 0 && subjectWords.length > 0) {
      japaneseParts = [subjectWords[0], nounsBefore[0].japanese, 'です'];
    } else {
      japaneseParts.push('です');
    }
  }

  const japaneseStr = japaneseParts.join(' ');

  return {
    original: sentence,
    japanese: japaneseStr || wordResults.filter(w => w.japanese).map(w => w.japanese).join(' '),
    wordBreakdown: wordResults,
    particles,
    grammarTips: [...grammarTips],
    unknownWords,
    structure: {
      subject: subjectWords.join(', ') || '(omitted)',
      object: objectWords.join(', ') || '(none)',
      verb: verbWords.join(', ') || '(none)',
    },
  };
}

const EXAMPLE_SENTENCES = [
  'I eat sushi',
  'I go to school',
  'She is a student',
  'I want to study Japanese',
  'The weather is good today',
  'I read a book at the library',
  'He is my friend',
  'I drink coffee every morning',
  'This is delicious',
  'I like music',
];

export default function Translator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleTranslate = () => {
    if (!input.trim()) return;
    const r = translateSentence(input.trim());
    setResult(r);
  };

  const handleExample = (sentence) => {
    setInput(sentence);
    setResult(translateSentence(sentence));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Sentence Translator & Analyzer</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Type an English sentence and get a Japanese translation with a complete breakdown of the
          grammar, vocabulary, sentence structure, and particles used. Learn <em>why</em> the translation
          works the way it does.
        </p>
      </div>

      <InsightCallout color="blue">
        This translator uses a built-in dictionary to teach you sentence construction. It works best with
        simple, direct sentences (subject + verb + object). Complex sentences, idioms, and figurative
        language may not translate accurately — but the word-by-word breakdown is always educational.
      </InsightCallout>

      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
            placeholder="Type an English sentence... (e.g., 'I eat sushi')"
            className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
          />
          <button
            onClick={handleTranslate}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Translate
          </button>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="text-[10px] text-gray-500">Try:</span>
          {EXAMPLE_SENTENCES.map((s) => (
            <button
              key={s}
              onClick={() => handleExample(s)}
              className="text-[10px] px-2 py-1 rounded bg-gray-800/50 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-gray-900/30 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-400">English:</span>
              <span className="text-sm text-gray-200">{result.original}</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-2xl text-white font-medium">{result.japanese}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Word-by-Word Breakdown
            </h3>
            <div className="space-y-2">
              {result.wordBreakdown.map((w, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-lg border ${
                  w.pos === 'unknown' ? 'bg-amber-500/5 border-amber-500/20' :
                  w.pos === 'article' ? 'bg-gray-800/30 border-gray-800/50 opacity-60' :
                  'bg-gray-900/30 border-gray-800/50'
                }`}>
                  <span className="text-sm text-gray-300 min-w-[80px] font-medium">{w.english}</span>
                  <ArrowRight className="w-3 h-3 text-gray-600 flex-shrink-0" />
                  <span className="text-lg text-white min-w-[80px]">{w.japanese || '—'}</span>
                  <span className="text-xs text-blue-400 font-mono min-w-[80px]">{w.romaji || '—'}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                    w.pos?.startsWith('verb') ? 'bg-cyan-500/10 text-cyan-400' :
                    w.pos === 'noun' ? 'bg-emerald-500/10 text-emerald-400' :
                    w.pos?.startsWith('adj') ? 'bg-violet-500/10 text-violet-400' :
                    w.pos === 'pronoun' ? 'bg-rose-500/10 text-rose-400' :
                    w.pos === 'particle' ? 'bg-amber-500/10 text-amber-400' :
                    w.pos === 'article' ? 'bg-gray-700/50 text-gray-500' :
                    'bg-gray-700/50 text-gray-400'
                  }`}>
                    {w.pos}
                  </span>
                  {w.note && <span className="text-[10px] text-gray-500 flex-1">{w.note}</span>}
                </div>
              ))}
            </div>
          </div>

          {result.particles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Particles Used</h3>
              <div className="flex gap-3 flex-wrap">
                {result.particles.map((p, i) => (
                  <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-lg text-white">{p.word} <span className="text-amber-400 font-bold">{p.particle}</span></p>
                    <p className="text-[10px] text-amber-300 mt-1">{p.particle} = {p.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Sentence Structure (SOV)</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] text-rose-400 uppercase tracking-wider mb-1">Subject</p>
                <p className="text-sm text-white">{result.structure.subject}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider mb-1">Object</p>
                <p className="text-sm text-white">{result.structure.object}</p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">Verb</p>
                <p className="text-sm text-white">{result.structure.verb}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Japanese word order: Subject は + Object を + Verb (verb always last)
            </p>
          </div>

          {result.grammarTips.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Grammar Notes</h3>
              <div className="space-y-2">
                {result.grammarTips.map((tip) => {
                  const note = grammarNotes[tip];
                  if (!note) return null;
                  return (
                    <div key={tip} className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">{note.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{note.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {result.unknownWords.length > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-amber-400">Words Not in Dictionary</h4>
              </div>
              <p className="text-xs text-gray-400">
                The following words were not found: <strong className="text-gray-300">{result.unknownWords.join(', ')}</strong>.
                The translator works best with common vocabulary. Try simpler words or check the Vocabulary section.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
