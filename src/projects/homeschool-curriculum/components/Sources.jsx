import React from 'react';
import { ExternalLink, BookOpen, AlertTriangle } from 'lucide-react';

const sources = [
  { category: 'Curriculum Publishers', items: [
    { name: 'Abeka', url: 'https://www.abeka.com', note: 'Official pricing and program details' },
    { name: 'BJU Press Homeschool', url: 'https://www.bjupresshomeschool.com', note: 'Video course info, Homeschool Hub details' },
    { name: 'Sonlight', url: 'https://www.sonlight.com', note: 'Package pricing, curriculum philosophy' },
    { name: 'Classical Conversations', url: 'https://classicalconversations.com', note: 'Program structure, community model' },
    { name: 'The Good and the Beautiful', url: 'https://www.goodandbeautiful.com', note: 'Free LA downloads, pricing' },
    { name: 'Master Books', url: 'https://www.masterbooks.com', note: 'Course pricing, Charlotte Mason approach' },
    { name: 'Teaching Textbooks', url: 'https://www.teachingtextbooks.com', note: 'Subscription pricing, placement tests' },
    { name: 'Time4Learning', url: 'https://www.time4learning.com', note: 'Monthly pricing, grade access policies' },
    { name: 'Singapore Math', url: 'https://www.singaporemath.com', note: 'Editions, pricing, placement tests' },
    { name: 'Math-U-See', url: 'https://mathusee.com', note: 'Mastery-based levels, manipulatives pricing' },
    { name: 'Apologia', url: 'https://www.apologia.com', note: 'Science curriculum, self-teaching design' },
    { name: 'Beast Academy (AoPS)', url: 'https://beastacademy.com', note: 'Online and print pricing, gifted math focus' },
    { name: 'Simply Charlotte Mason', url: 'https://simplycharlottemason.com', note: 'CM method curriculum guides' },
  ]},
  { category: 'Co-op & Enrichment Programs', items: [
    { name: 'CHET (Center for Homeschool Enrichment & Tutorial)', url: 'https://www.chettn.org', note: 'Class listings, about page, schedule' },
    { name: 'CHET Classes 2025-2026', url: 'https://www.chettn.org/classes/', note: 'Full class catalog by grade' },
    { name: 'Anchored Hendersonville', url: 'https://www.anchoredhendersonville.org', note: 'Enrichment and Tutorial programs' },
    { name: 'Anchored Tutorial Details', url: 'https://www.anchoredhendersonville.org/programs/tutorial', note: 'Curriculum, fees, schedule' },
    { name: 'APEX Christian Academy', url: 'https://www.apexchristianacademy.com', note: 'Hybrid tutorial, Gallatin location' },
    { name: 'Discovery Homeschool Enrichment', url: 'https://discoveryhomeschoolenrichment.squarespace.com', note: 'Nature-based enrichment, Hendersonville' },
    { name: 'Legacy Tutorial', url: 'https://legacytutorial.com', note: 'Thursday tutorial, Hendersonville' },
    { name: 'Aaron Academy', url: 'https://www.aaronacademy.com', note: 'Umbrella school + enrichment, Hendersonville' },
  ]},
  { category: 'Review & Comparison Sites', items: [
    { name: 'Cathy Duffy Reviews', url: 'https://cathyduffyreviews.com', note: 'In-depth curriculum reviews and comparisons' },
    { name: 'TheHomeSchoolMom', url: 'https://www.thehomeschoolmom.com', note: 'TN co-op listings, curriculum reviews' },
    { name: 'How to Homeschool', url: 'https://www.howtohomeschool.com', note: '2025-26 Best Curriculum list' },
    { name: 'MTHEA (Middle TN Home Education Association)', url: 'https://www.mthea.org/sumner-county', note: 'Sumner County co-op directory' },
    { name: 'HSLDA', url: 'https://hslda.org', note: 'Homeschool cost data and legal info' },
    { name: 'Davidson Institute', url: 'https://www.davidsongifted.org', note: 'Gifted homeschool curriculum guidance' },
  ]},
  { category: 'Community Sources', items: [
    { name: 'r/homeschool (Reddit)', url: 'https://www.reddit.com/r/homeschool/', note: 'Parent reviews, gifted child discussions' },
    { name: 'Sonlight Blog', url: 'https://blog.sonlight.com', note: 'Homeschooling gifted students guide' },
    { name: 'The Thrifty Couple — CC Cost Breakdown', url: 'https://thethriftycouple.com/how-much-does-classical-conversations-cost-detailed-fees-and-tuition-breakdown/', note: 'Detailed Classical Conversations pricing' },
    { name: 'WKRN News — CHET Feature', url: 'https://www.wkrn.com/special-reports/chet-program-for-homeschool/', note: 'News feature on CHET program' },
  ]},
];

export default function Sources() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Sources & Methodology</h1>
        <p className="text-gray-400">All data sources used in this research dashboard</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-violet-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-white mb-2">Research Methodology</h3>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li>• <strong className="text-gray-300">Curriculum data</strong> gathered from official publisher websites, verified against third-party review sites</li>
              <li>• <strong className="text-gray-300">Pricing</strong> reflects 2025-2026 published rates; actual costs may vary by grade level and options selected</li>
              <li>• <strong className="text-gray-300">Ratings</strong> are aggregated from Cathy Duffy Reviews, TheHomeSchoolMom, Reddit communities, and publisher testimonials</li>
              <li>• <strong className="text-gray-300">Advanced-Friendly scores</strong> based on: self-pacing capability, grade acceleration support, depth of content, and suitability for gifted learners</li>
              <li>• <strong className="text-gray-300">Co-op program data</strong> from official websites, MTHEA directory, Facebook pages, and community listings</li>
              <li>• <strong className="text-gray-300">Distance/drive times</strong> estimated from 37075 zip code center using standard routing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-400 mb-1">Limitations & Disclaimers</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Pricing may change — always verify on the publisher's website before purchasing</li>
              <li>• Co-op program availability, schedules, and costs change annually — contact programs directly</li>
              <li>• "Advanced-Friendly" ratings are editorial assessments, not standardized scores</li>
              <li>• This research focuses on the Hendersonville/Gallatin/Sumner County area — programs in Nashville proper are not included</li>
              <li>• Some programs (APEX, Discovery) had limited public information — contact them for full details</li>
              <li>• Tennessee homeschool law requires registration through one of three methods — consult Aaron Academy or MTHEA for guidance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Source Lists */}
      {sources.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-bold text-white mb-3">{section.category}</h3>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5">
                <div>
                  <span className="text-sm text-gray-200">{item.name}</span>
                  <span className="text-xs text-gray-500 ml-2">— {item.note}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-violet-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center text-xs text-gray-600 pt-4 border-t border-gray-800">
        Research compiled February 2026 • {sources.reduce((acc, s) => acc + s.items.length, 0)} sources cited
      </div>
    </div>
  );
}
