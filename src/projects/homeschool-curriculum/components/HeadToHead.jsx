import React from 'react';
import { MapPin, Clock, DollarSign, Users, Check, X, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import InsightCallout from './InsightCallout';

const chet = {
  name: 'CHET',
  fullName: 'Center for Homeschool Enrichment & Tutorial',
  website: 'https://www.chettn.org',
  address: '106 Gallatin Pike N, Madison, TN 37115',
  distance: '~18 miles / ~25 min from 37075',
  founded: 2003,
  grades: 'PreK–12',
  days: 'Tuesday & Thursday',
  hours: '8:30 AM – 3:00 PM',
  weeks: 30,
  dropOff: true,
  youChoose: true,
  model: 'À la carte elective classes — you build your own schedule',
  classCount: '50+ classes per semester',
  costRange: '$800–$2,500/year',
  costNotes: 'Per-class pricing. More classes = higher cost. Varies by semester.',
  faith: 'Christian (Non-denominational)',
  accentColor: 'blue',
};

const anchored = {
  name: 'Anchored Enrichment',
  fullName: 'Anchored Enrichment at Long Hollow Church',
  website: 'https://www.anchoredhendersonville.org',
  address: '3031 Long Hollow Pike, Hendersonville, TN 37075',
  distance: 'IN YOUR ZIP CODE — ~5-10 min',
  founded: null,
  grades: 'K–6 (Enrichment) / 7–12 (Tutorial)',
  days: 'Tuesday & Thursday',
  hours: '9:00 AM – 2:00 PM',
  weeks: 30,
  dropOff: true,
  youChoose: true,
  youChooseNote: 'Enrichment (K-6): YES. Tutorial (7-12): NO — they provide curriculum.',
  model: 'Enrichment classes for K-6; Structured tutorial for 7-12',
  classCount: 'Smaller class menu — enrichment focused',
  costRange: '$400–$1,675/year',
  costNotes: 'Enrichment: $400–$1,000. Tutorial: $175 registration + $500/class × 3 = ~$1,675.',
  faith: 'Christian (Non-denominational)',
  accentColor: 'emerald',
};

const comparisonRows = [
  { label: 'Location', chet: chet.address, anchored: anchored.address, icon: MapPin },
  { label: 'Drive from 37075', chet: '~25 min', anchored: '~5-10 min', winner: 'anchored', icon: MapPin },
  { label: 'Founded', chet: '2003', anchored: 'Newer program', winner: 'chet', icon: Calendar },
  { label: 'Grade Range', chet: 'PreK–12', anchored: 'K–6 (Enrichment) / 7–12 (Tutorial)', winner: 'chet', icon: Users },
  { label: 'Days', chet: 'Tues & Thurs', anchored: 'Tues & Thurs', winner: null, icon: Calendar },
  { label: 'Hours', chet: '8:30 AM – 3:00 PM', anchored: '9:00 AM – 2:00 PM', winner: 'chet', icon: Clock },
  { label: 'Drop-Off', chet: '✓ Yes', anchored: '✓ Yes', winner: null, icon: Users },
  { label: 'You Choose Curriculum', chet: '✓ Always', anchored: '✓ Enrichment / ✗ Tutorial', winner: 'chet', icon: BookOpen },
  { label: 'Class Variety', chet: '50+ classes (huge menu)', anchored: 'Smaller enrichment menu', winner: 'chet', icon: BookOpen },
  { label: 'Core Academics Available', chet: '✓ Math, Science, English (2-day)', anchored: '✗ Enrichment only (K-6)', winner: 'chet', icon: BookOpen },
  { label: 'Annual Cost', chet: '$800–$2,500', anchored: '$400–$1,675', winner: 'anchored', icon: DollarSign },
  { label: 'Class Size', chet: 'Small (low ratios)', anchored: 'Small', winner: null, icon: Users },
  { label: 'Social Events', chet: 'Showcases, events, field trips', anchored: 'Recess, lunch, community', winner: 'chet', icon: Users },
];

export default function HeadToHead() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">CHET vs. Anchored — Head-to-Head</h1>
        <p className="text-gray-400">Side-by-side comparison of the two programs you're most interested in</p>
      </div>

      <InsightCallout variant="insight" title="These Programs Are Complementary, Not Competing">
        CHET and Anchored serve different needs. <strong className="text-white">CHET</strong> is the powerhouse with 50+ elective classes and core academics across all grades.
        <strong className="text-white"> Anchored Enrichment</strong> is the convenient local option for elementary enrichment.
        Many families use <strong className="text-white">both</strong> — or start with Anchored for younger kids and transition to CHET as they grow.
      </InsightCallout>

      {/* Side-by-Side Headers */}
      <div className="grid grid-cols-3 gap-4">
        <div />
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-blue-400">{chet.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{chet.fullName}</p>
          <a href={chet.website} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2">
            <ExternalLink className="w-3 h-3" /> Website
          </a>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold text-emerald-400">{anchored.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{anchored.fullName}</p>
          <a href={anchored.website} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 mt-2">
            <ExternalLink className="w-3 h-3" /> Website
          </a>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {comparisonRows.map((row, i) => {
              const Icon = row.icon;
              return (
                <tr key={i} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-3 px-4 w-1/4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{row.label}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 w-5/12 text-center ${row.winner === 'chet' ? 'bg-blue-500/5' : ''}`}>
                    <span className={row.winner === 'chet' ? 'text-blue-400 font-medium' : 'text-gray-300'}>
                      {row.chet}
                    </span>
                    {row.winner === 'chet' && <span className="ml-2 text-xs text-blue-500">★</span>}
                  </td>
                  <td className={`py-3 px-4 w-5/12 text-center ${row.winner === 'anchored' ? 'bg-emerald-500/5' : ''}`}>
                    <span className={row.winner === 'anchored' ? 'text-emerald-400 font-medium' : 'text-gray-300'}>
                      {row.anchored}
                    </span>
                    {row.winner === 'anchored' && <span className="ml-2 text-xs text-emerald-500">★</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CHET Class Highlights */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-400 mb-3">CHET Class Highlights (2025-2026)</h3>
        <p className="text-sm text-gray-400 mb-3">A sample of the 50+ classes available — organized by category</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">🎨 Arts & Music</h4>
            <ul className="text-xs text-gray-400 space-y-0.5">
              <li>Art I & II • Watercolor • Art Café</li>
              <li>Band • Choir • Rock Band</li>
              <li>Music Theory • Clogging • Dance</li>
              <li>Drama • Acting for Camera</li>
              <li>Photography (Beginner & Advanced)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">🔬 Academics (2-day)</h4>
            <ul className="text-xs text-gray-400 space-y-0.5">
              <li>Chemistry • Biology II • Forensics</li>
              <li>Algebra I & II • Geometry</li>
              <li>Spanish I & II • English/Writing</li>
              <li>American History • Government/Econ</li>
              <li>ACT Prep • Speech/Debate</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">🛠️ Skills & Life</h4>
            <ul className="text-xs text-gray-400 space-y-0.5">
              <li>Culinary Arts • Desserts & Pastries</li>
              <li>Shop Class • Maker's Lab</li>
              <li>Archery • PE/Fitness</li>
              <li>Computer Skills I & II</li>
              <li>Personal Finance (Dave Ramsey)</li>
              <li>ASL I & II • Robotics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Choose CHET If...</h3>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />You want maximum class variety and choice</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />You need core academics (math, science, English)</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />You want a well-established program (since 2003)</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />You don't mind the 25-min drive to Madison</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />Jameson is interested in unique electives (archery, robotics, culinary)</li>
          </ul>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
          <h3 className="text-lg font-bold text-emerald-400 mb-2">Choose Anchored If...</h3>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />Proximity matters — it's right in 37075</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />Jameson is elementary age (K-6 enrichment)</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />You want affordable enrichment + socialization</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />You want to keep core academics fully in your control at home</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />You attend or are connected to Long Hollow Church</li>
          </ul>
        </div>
      </div>

      <InsightCallout variant="tip" title="Pro Tip: You Can Do Both">
        Some families send their kids to <strong className="text-white">Anchored on one day</strong> and <strong className="text-white">CHET on another</strong>.
        Since both meet Tues/Thurs, you could do Anchored on Tuesday and CHET on Thursday (or vice versa).
        This gives Jameson local socialization AND access to CHET's unique electives.
      </InsightCallout>
    </div>
  );
}
