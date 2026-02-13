import React, { useState } from 'react';
import InsightCallout from './InsightCallout';
import { verbGroups, teFormRules, conjugationTable } from '../data/verbs';

const GROUP_COLORS = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export default function Verbs() {
  const [tab, setTab] = useState('groups');
  const [activeGroup, setActiveGroup] = useState(0);

  const tabs = [
    { id: 'groups', label: 'Verb Groups' },
    { id: 'teform', label: 'Te-Form Rules' },
    { id: 'conjugation', label: 'Full Conjugation' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Verb Quick Reference</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          Japanese verbs are divided into three groups with different conjugation rules.
          This reference covers the most common verbs, te-form rules, and a complete conjugation table.
        </p>
      </div>

      <InsightCallout color="cyan">
        The て-form (te-form) is the single most important conjugation to master. It's used for requests
        (～てください), progressive tense (～ている), connecting actions, permissions, prohibitions, and
        dozens more patterns. Learn the te-form rules by heart — they unlock most of N4 grammar.
      </InsightCallout>

      <div className="flex gap-2 border-b border-gray-800 pb-2">
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

      {tab === 'groups' && (
        <>
          <div className="flex gap-2">
            {verbGroups.map((g, i) => {
              const c = GROUP_COLORS[g.color];
              return (
                <button
                  key={i}
                  onClick={() => setActiveGroup(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeGroup === i
                      ? `${c.bg} ${c.text} border ${c.border}`
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
                  }`}
                >
                  {g.group}
                </button>
              );
            })}
          </div>

          <div>
            <div className="mb-4">
              <h3 className={`text-lg font-semibold ${GROUP_COLORS[verbGroups[activeGroup].color].text}`}>
                {verbGroups[activeGroup].group}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{verbGroups[activeGroup].description}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">Dictionary</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">Romaji</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">English</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">ます</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">て-form</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">ない</th>
                    <th className="text-left py-2 px-3 text-gray-400 font-medium">た (past)</th>
                  </tr>
                </thead>
                <tbody>
                  {verbGroups[activeGroup].verbs.map((v) => (
                    <tr key={v.dictionary} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="py-2 px-3 text-white font-medium">{v.dictionary}</td>
                      <td className="py-2 px-3 text-gray-400 font-mono text-xs">{v.romaji}</td>
                      <td className="py-2 px-3 text-gray-300 text-xs">{v.english}</td>
                      <td className="py-2 px-3 text-emerald-400 text-xs">{v.masu}</td>
                      <td className="py-2 px-3 text-cyan-400 text-xs">{v.te}</td>
                      <td className="py-2 px-3 text-rose-400 text-xs">{v.nai}</td>
                      <td className="py-2 px-3 text-amber-400 text-xs">{v.ta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {verbGroups[activeGroup].verbs.some((v) => v.note) && (
              <div className="mt-4 bg-gray-900/30 border border-gray-800/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Notes</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  {verbGroups[activeGroup].verbs.filter((v) => v.note).map((v) => (
                    <li key={v.dictionary}>- <strong className="text-gray-300">{v.dictionary}</strong>: {v.note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'teform' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">て-Form Conjugation Rules</h3>
          <p className="text-sm text-gray-400 mb-4">
            The te-form changes depend on the verb's dictionary form ending. Memorize these patterns —
            they apply to hundreds of verbs.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Ending</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">て-Form Rule</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Examples</th>
                  <th className="text-left py-2 px-3 text-gray-400 font-medium">Group</th>
                </tr>
              </thead>
              <tbody>
                {teFormRules.map((rule, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-3 text-white font-mono">{rule.ending}</td>
                    <td className="py-2 px-3 text-cyan-400 font-bold">{rule.teForm}</td>
                    <td className="py-2 px-3 text-gray-300 text-xs">{rule.example}</td>
                    <td className="py-2 px-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        rule.group === 'Group 1' ? 'bg-cyan-500/10 text-cyan-400' :
                        rule.group === 'Group 2' ? 'bg-emerald-500/10 text-emerald-400' :
                        rule.group === 'Group 3' ? 'bg-rose-500/10 text-rose-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {rule.group}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Mnemonic: "Te-Form Song"</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Many learners memorize te-form rules to the tune of a song. The key groups:<br />
              <strong className="text-gray-300">う・つ・る → って</strong> (u/tsu/ru → tte)<br />
              <strong className="text-gray-300">む・ぶ・ぬ → んで</strong> (mu/bu/nu → nde)<br />
              <strong className="text-gray-300">く → いて, ぐ → いで</strong> (ku → ite, gu → ide)<br />
              <strong className="text-gray-300">す → して</strong> (su → shite)<br />
              Exception: いく → いって (iku → itte)
            </p>
          </div>
        </div>
      )}

      {tab === 'conjugation' && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Complete Conjugation Table</h3>
          <p className="text-sm text-gray-400 mb-4">
            All major verb forms for representative verbs from each group.
          </p>

          <div className="space-y-6">
            {conjugationTable.examples.map((verb) => (
              <div key={verb.verb} className="border border-gray-800/50 rounded-xl overflow-hidden">
                <div className="p-3 bg-gray-900/50 border-b border-gray-800/50 flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{verb.verb}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    verb.group === 'Group 1' ? 'bg-cyan-500/10 text-cyan-400' :
                    verb.group === 'Group 2' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    {verb.group}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-5 gap-px bg-gray-800/30 p-2">
                    {conjugationTable.forms.map((form, i) => (
                      <div key={form} className="p-2 bg-gray-950 rounded text-center">
                        <p className="text-[10px] text-gray-500 mb-1">{form}</p>
                        <p className="text-sm text-white">{verb.conjugations[i]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
