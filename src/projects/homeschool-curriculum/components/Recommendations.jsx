import React from 'react';
import { Award, Star, Zap, DollarSign, BookOpen, Brain, ExternalLink } from 'lucide-react';
import InsightCallout from './InsightCallout';

const recommendations = [
  {
    tier: 'top-pick',
    title: 'The Eclectic Power Build',
    subtitle: 'Best overall for an advanced learner like Jameson',
    icon: Award,
    color: 'amber',
    cost: '~$700–$900/year',
    description: 'Mix the best curriculum per subject. This is what experienced homeschool families of gifted kids overwhelmingly recommend.',
    subjects: [
      { subject: 'Math', pick: 'Beast Academy (grades 1-5) → Singapore Math (grades 1-8) → Art of Problem Solving (middle school+)', why: 'Designed for gifted math students. Deep problem-solving, not just speed. Jameson can work at his actual math level, not his age.', cost: '$96–$150/yr', link: 'https://beastacademy.com' },
      { subject: 'Language Arts', pick: 'Sonlight or The Good and the Beautiful', why: 'Sonlight for literature-rich, globally-minded education. TGTB if budget matters (Language Arts is FREE as PDF).', cost: 'FREE–$500/yr', link: 'https://www.sonlight.com' },
      { subject: 'Science', pick: 'Apologia', why: 'Gold standard for homeschool science. Written directly to the student — self-teaching design perfect for advanced independent learners.', cost: '$50–$85/course', link: 'https://www.apologia.com' },
      { subject: 'History', pick: 'Sonlight or The Good and the Beautiful', why: 'Sonlight\'s literature-based approach makes history come alive. TGTB is beautiful and affordable.', cost: '$48–$500/yr', link: 'https://www.sonlight.com' },
    ],
  },
  {
    tier: 'runner-up',
    title: 'The All-in-One Rigorous Build',
    subtitle: 'Best if you want one publisher for everything',
    icon: BookOpen,
    color: 'violet',
    cost: '~$800–$1,100/year',
    description: 'BJU Press with online video courses. Self-paced, critical thinking focus, college-prep rigor. Jameson can work above grade level easily.',
    subjects: [
      { subject: 'All Subjects', pick: 'BJU Press Online Video', why: 'Excellent video teachers, Homeschool Hub platform, self-paced. Strong across all subjects. Critical thinking emphasis challenges gifted kids.', cost: '$800–$1,100/yr', link: 'https://www.bjupresshomeschool.com' },
      { subject: 'Math Supplement', pick: 'Beast Academy (optional)', why: 'If Jameson needs more math challenge beyond BJU, add Beast Academy for deeper problem-solving.', cost: '+$96/yr', link: 'https://beastacademy.com' },
    ],
  },
  {
    tier: 'budget',
    title: 'The Budget Champion Build',
    subtitle: 'Best if cost is a major factor',
    icon: DollarSign,
    color: 'emerald',
    cost: '~$200–$350/year',
    description: 'The Good and the Beautiful for core subjects + Beast Academy for advanced math. Beautiful, gentle, and incredibly affordable.',
    subjects: [
      { subject: 'Language Arts', pick: 'The Good and the Beautiful', why: 'FREE as PDF download. Beautiful design, Charlotte Mason inspired, open-and-go lessons.', cost: 'FREE', link: 'https://www.goodandbeautiful.com' },
      { subject: 'Math', pick: 'Beast Academy Online', why: 'TGTB math may not challenge Jameson enough. Beast Academy fills the gap for advanced math.', cost: '$96/yr', link: 'https://beastacademy.com' },
      { subject: 'Science', pick: 'The Good and the Beautiful', why: 'Affordable science units with hands-on activities.', cost: '$28–$38/unit', link: 'https://www.goodandbeautiful.com' },
      { subject: 'History', pick: 'The Good and the Beautiful', why: 'Beautiful history courses at $48–$58/year.', cost: '$48–$58/yr', link: 'https://www.goodandbeautiful.com' },
    ],
  },
];

const coopRecommendation = {
  primary: {
    name: 'CHET',
    why: 'Maximum flexibility, huge class variety, you choose your own curriculum, PreK-12 coverage. The 25-min drive is worth it for the quality and selection.',
    link: 'https://www.chettn.org',
  },
  secondary: {
    name: 'Anchored Enrichment',
    why: 'Right in 37075, affordable, great for elementary socialization. Use alongside CHET or as your primary if proximity matters most.',
    link: 'https://www.anchoredhendersonville.org',
  },
  backup: {
    name: 'APEX Christian Academy',
    why: 'Close to 37075 (Gallatin), meets Mondays (different day!), K-12, sports program. Good option if CHET days don\'t work or you want a Monday program.',
    link: 'https://www.apexchristianacademy.com',
  },
};

export default function Recommendations() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Recommendations for Jameson</h1>
        <p className="text-gray-400">Personalized picks based on his advanced learning needs and your situation</p>
      </div>

      <InsightCallout variant="insight" title="The Key Advantage You're Gaining">
        By moving from Three Oaks' age-based, curriculum-provided model to a choose-your-own approach,
        Jameson can now work at <strong className="text-white">his actual ability level in each subject independently</strong>.
        If he's 2 grades ahead in math but on-level in writing, you can set each subject to the right level. This is the #1 benefit of homeschooling an advanced child.
      </InsightCallout>

      {/* Curriculum Recommendations */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-violet-400" />
          Curriculum Recommendations
        </h2>

        {recommendations.map((rec, idx) => (
          <div key={idx} className={`bg-gray-900 border rounded-xl overflow-hidden ${
            rec.tier === 'top-pick' ? 'border-amber-500/40' :
            rec.tier === 'runner-up' ? 'border-violet-500/30' :
            'border-emerald-500/30'
          }`}>
            {rec.tier === 'top-pick' && (
              <div className="bg-amber-500/10 px-4 py-1.5 text-center">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">⭐ Top Recommendation</span>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <rec.icon className={`w-5 h-5 text-${rec.color}-400`} />
                    <h3 className="text-lg font-bold text-white">{rec.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{rec.subtitle}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${rec.color}-500/20 text-${rec.color}-400`}>
                  {rec.cost}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-4">{rec.description}</p>

              <div className="space-y-3">
                {rec.subjects.map((s, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-200">{s.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{s.cost}</span>
                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 text-gray-600 hover:text-violet-400" />
                        </a>
                      </div>
                    </div>
                    <p className={`text-sm font-medium text-${rec.color}-400 mb-0.5`}>{s.pick}</p>
                    <p className="text-xs text-gray-400">{s.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Co-op Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          Co-op / Enrichment Recommendations
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400 font-bold uppercase">Primary Pick</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{coopRecommendation.primary.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{coopRecommendation.primary.why}</p>
            <a href={coopRecommendation.primary.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              <ExternalLink className="w-3 h-3" /> Visit Website
            </a>
          </div>

          <div className="bg-gray-900 border border-emerald-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-bold uppercase">Local Option</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{coopRecommendation.secondary.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{coopRecommendation.secondary.why}</p>
            <a href={coopRecommendation.secondary.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">
              <ExternalLink className="w-3 h-3" /> Visit Website
            </a>
          </div>

          <div className="bg-gray-900 border border-amber-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-400 font-bold uppercase">Monday Alternative</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{coopRecommendation.backup.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{coopRecommendation.backup.why}</p>
            <a href={coopRecommendation.backup.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300">
              <ExternalLink className="w-3 h-3" /> Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Sample Weekly Schedule */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-400" />
          Sample Weekly Schedule for Jameson
        </h3>
        <div className="grid grid-cols-5 gap-2 text-sm">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <div key={day} className="text-center">
              <p className="font-medium text-gray-300 mb-2 pb-2 border-b border-gray-800">{day}</p>
              {day === 'Monday' && (
                <div className="space-y-1.5">
                  <div className="bg-violet-500/10 rounded-lg p-2 text-xs text-violet-300">Beast Academy Math (1hr)</div>
                  <div className="bg-blue-500/10 rounded-lg p-2 text-xs text-blue-300">Apologia Science (1hr)</div>
                  <div className="bg-emerald-500/10 rounded-lg p-2 text-xs text-emerald-300">Sonlight Reading (1hr)</div>
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Free play / outside</div>
                </div>
              )}
              {day === 'Tuesday' && (
                <div className="space-y-1.5">
                  <div className="bg-amber-500/10 rounded-lg p-2 text-xs text-amber-300">CHET or Anchored (drop-off)</div>
                  <div className="bg-amber-500/10 rounded-lg p-2 text-xs text-amber-300">Elective classes all day</div>
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Socialization + enrichment</div>
                </div>
              )}
              {day === 'Wednesday' && (
                <div className="space-y-1.5">
                  <div className="bg-violet-500/10 rounded-lg p-2 text-xs text-violet-300">Beast Academy Math (1hr)</div>
                  <div className="bg-blue-500/10 rounded-lg p-2 text-xs text-blue-300">Apologia Science (1hr)</div>
                  <div className="bg-rose-500/10 rounded-lg p-2 text-xs text-rose-300">TGTB Language Arts (45min)</div>
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Nature walk / PE</div>
                </div>
              )}
              {day === 'Thursday' && (
                <div className="space-y-1.5">
                  <div className="bg-amber-500/10 rounded-lg p-2 text-xs text-amber-300">CHET or Anchored (drop-off)</div>
                  <div className="bg-amber-500/10 rounded-lg p-2 text-xs text-amber-300">Elective classes all day</div>
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Socialization + enrichment</div>
                </div>
              )}
              {day === 'Friday' && (
                <div className="space-y-1.5">
                  <div className="bg-violet-500/10 rounded-lg p-2 text-xs text-violet-300">Beast Academy Math (1hr)</div>
                  <div className="bg-emerald-500/10 rounded-lg p-2 text-xs text-emerald-300">Sonlight History (1hr)</div>
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Field trip / library / free</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center">
          This is just a sample — adjust based on Jameson's energy, interests, and the co-op schedule you choose.
          Most homeschool families find 2-3 hours of focused academics per day is plenty for elementary students.
        </p>
      </div>

      <InsightCallout variant="info" title="Next Steps">
        <ol className="list-decimal list-inside space-y-1">
          <li>Schedule a tour at <strong className="text-white">CHET</strong> (615-739-0940) and attend an <strong className="text-white">Anchored</strong> info meeting</li>
          <li>Take placement tests for your chosen curricula (Beast Academy, Singapore Math, etc.)</li>
          <li>Order curriculum for the subjects you'll teach at home</li>
          <li>Register with an umbrella school if needed (Aaron Academy is right in Hendersonville)</li>
          <li>Build Jameson's weekly schedule around the co-op days</li>
        </ol>
      </InsightCallout>
    </div>
  );
}
