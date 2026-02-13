import React from 'react';
import { BookOpen, DollarSign, Zap, Users, MapPin, Star } from 'lucide-react';
import { curricula } from '../data/curricula';
import { programs } from '../data/programs';
import InsightCallout from './InsightCallout';

const statCards = [
  { label: 'Curricula Compared', value: curricula.length, icon: BookOpen, color: 'text-violet-400' },
  { label: 'Co-op Programs', value: programs.length, icon: Users, color: 'text-emerald-400' },
  { label: 'Price Range', value: '$0–$2,000+', icon: DollarSign, color: 'text-amber-400' },
  { label: 'Near 37075', value: programs.filter(p => p.driveTime?.includes('5')).length, icon: MapPin, color: 'text-rose-400' },
];

const topPicks = [
  { label: 'Best for Advanced Math', pick: 'Beast Academy → Singapore Math', reason: 'Designed for gifted math students. Deep problem-solving, not just speed.' },
  { label: 'Best All-in-One (Rigorous)', pick: 'BJU Press', reason: 'Self-paced video, critical thinking focus, college-prep rigor. Advanced kids thrive.' },
  { label: 'Best Budget All-in-One', pick: 'The Good and the Beautiful', reason: 'Language Arts is FREE. Math $38–$48/level. Beautiful design.' },
  { label: 'Best for Book Lovers', pick: 'Sonlight', reason: 'Literature-rich, multi-age, global perspective. Advanced readers can level up easily.' },
  { label: 'Best Co-op (Variety)', pick: 'CHET', reason: '25+ elective classes, drop-off, PreK-12. À la carte — you build the schedule.' },
  { label: 'Best Co-op (Closest)', pick: 'Anchored Enrichment', reason: 'Right in 37075 at Long Hollow Church. K-6 enrichment, affordable, drop-off.' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Homeschool Curriculum & Co-op Guide</h1>
        <p className="text-gray-400 text-lg">For Jameson — an advanced learner in Hendersonville, TN (37075)</p>
      </div>

      <InsightCallout variant="insight" title="Why This Research Matters">
        You're moving from Three Oaks Academy's age-based, curriculum-provided model to a co-op where <strong className="text-white">you choose the curriculum</strong>.
        This is a huge advantage for Jameson — he can work ahead in subjects where he's advanced, use grade-level materials where appropriate,
        and mix-and-match the best curriculum per subject. This dashboard helps you compare your options.
      </InsightCallout>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <InsightCallout variant="tip" title="The Eclectic Approach — Best for Advanced Learners">
        Most experienced homeschool families of advanced kids use an <strong className="text-white">eclectic approach</strong>: pick the BEST curriculum for each subject from different publishers.
        For example: <strong className="text-white">Beast Academy</strong> for math, <strong className="text-white">Sonlight</strong> for literature/history,
        <strong className="text-white"> Apologia</strong> for science. This lets Jameson work at his actual level in each subject independently.
      </InsightCallout>

      {/* Quick Picks */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          Quick Picks for Your Situation
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {topPicks.map(({ label, pick, reason }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-lg font-bold text-violet-400 mb-1">{pick}</p>
              <p className="text-sm text-gray-400">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Three Oaks Comparison */}
      <InsightCallout variant="warning" title="⚠️ Watch Out: Some Programs Still Provide Curriculum">
        Not all co-ops let you choose your own curriculum. <strong className="text-white">Anchored Tutorial</strong> and <strong className="text-white">Legacy Tutorial</strong> provide
        the curriculum (just like Three Oaks). If Jameson's advancement is the priority, make sure you pick a program where
        <strong className="text-white"> YOU control the curriculum</strong>. CHET, Anchored Enrichment, APEX, Discovery, and Aaron Academy all let you choose.
      </InsightCallout>

      {/* How to Read This Dashboard */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3">How to Use This Dashboard</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <p className="font-medium text-gray-200 mb-1">📚 Curriculum Comparison</p>
            <p>Compare 13 curricula side-by-side on cost, approach, grade acceleration, and parent involvement.</p>
          </div>
          <div>
            <p className="font-medium text-gray-200 mb-1">📊 Cost Analysis</p>
            <p>Visual breakdown of annual costs — from free to $2,000+. See where the value is.</p>
          </div>
          <div>
            <p className="font-medium text-gray-200 mb-1">🏫 Co-op Programs</p>
            <p>7 programs near 37075 compared on distance, cost, flexibility, and grade coverage.</p>
          </div>
          <div>
            <p className="font-medium text-gray-200 mb-1">⭐ Recommendations</p>
            <p>Personalized picks for Jameson based on his advanced learning needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
