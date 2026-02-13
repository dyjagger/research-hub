import React from 'react';
import { BookOpen, Languages, GraduationCap, Clock, Target, TrendingUp } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { jlptComparison } from '../data/courses';

const stats = [
  { label: 'Writing Systems', value: '2', detail: 'Hiragana + Katakana (46 each)', icon: Languages, color: 'text-rose-400' },
  { label: 'JLPT Levels', value: '5', detail: 'N5 (beginner) → N1 (advanced)', icon: GraduationCap, color: 'text-violet-400' },
  { label: 'Grammar Points', value: '800+', detail: 'Across all JLPT levels', icon: BookOpen, color: 'text-cyan-400' },
  { label: 'To Fluency', value: '~2,200 hrs', detail: 'FSI Category IV language', icon: Clock, color: 'text-amber-400' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Japanese Learning Dashboard</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
          A comprehensive, structured guide to learning Japanese from absolute beginner to advanced fluency.
          This dashboard covers hiragana, katakana, grammar across all JLPT levels, vocabulary by category,
          verb conjugation reference, common phrases, and an interactive sentence translator that teaches
          you the grammar and structure behind every translation.
        </p>
      </div>

      <InsightCallout color="rose">
        Japanese uses three writing systems: Hiragana (native words), Katakana (foreign/loan words), and Kanji (Chinese characters).
        This dashboard focuses on Hiragana and Katakana with Romaji — the two phonetic alphabets that form the foundation
        of all Japanese reading and writing. Master these first, and everything else becomes easier.
      </InsightCallout>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">At a Glance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">JLPT Level Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Level</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Vocabulary</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Grammar</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Reading</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Study Hours</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {jlptComparison.map((row) => {
                const levelColors = {
                  N5: 'text-emerald-400',
                  N4: 'text-cyan-400',
                  N3: 'text-amber-400',
                  N2: 'text-violet-400',
                  N1: 'text-rose-400',
                };
                return (
                  <tr key={row.level} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className={`py-2 px-3 font-bold ${levelColors[row.level]}`}>{row.level}</td>
                    <td className="py-2 px-3 text-gray-300">{row.vocab}</td>
                    <td className="py-2 px-3 text-gray-300">{row.grammar}</td>
                    <td className="py-2 px-3 text-gray-400 text-xs">{row.reading}</td>
                    <td className="py-2 px-3 text-gray-300">{row.studyHours}</td>
                    <td className="py-2 px-3 text-gray-400">{row.passRate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">How to Use This Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Target, title: 'Hiragana & Katakana', desc: 'Start here. Interactive charts with romaji for both writing systems, including dakuten and combination characters.', color: 'text-rose-400' },
            { icon: BookOpen, title: 'Grammar Guide', desc: 'Structured from N5 (beginner) to N1 (advanced) with examples, romaji, and explanations for every grammar point.', color: 'text-cyan-400' },
            { icon: Languages, title: 'Vocabulary & Phrases', desc: 'Organized by category (greetings, food, travel, etc.) with survival phrases for real-world situations.', color: 'text-emerald-400' },
            { icon: TrendingUp, title: 'Verb Reference', desc: 'Complete conjugation tables for all three verb groups with te-form rules and quick-reference charts.', color: 'text-amber-400' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Key Concepts Before You Start</h3>
        <div className="space-y-3 text-sm text-gray-400">
          <p>
            <strong className="text-gray-200">Word Order:</strong> Japanese is SOV (Subject-Object-Verb).
            "I eat sushi" becomes "わたし は すし を たべます" (I + [topic] + sushi + [object] + eat).
            The verb <em>always</em> comes last.
          </p>
          <p>
            <strong className="text-gray-200">Particles:</strong> Small words (は, が, を, に, で) after nouns
            that mark their grammatical role. They're the glue of Japanese sentences.
          </p>
          <p>
            <strong className="text-gray-200">Politeness:</strong> Japanese has built-in politeness levels.
            です/ます forms are polite (use with strangers). Dictionary form is casual (friends).
            Keigo is honorific (business).
          </p>
          <p>
            <strong className="text-gray-200">No Articles or Plurals:</strong> Japanese has no "the/a/an" and
            nouns don't change for plural. ねこ = cat or cats. Context tells you which.
          </p>
        </div>
      </div>
    </div>
  );
}
