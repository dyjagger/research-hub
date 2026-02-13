import React from 'react';
import InsightCallout from './InsightCallout';

const legalTimeline = [
  { year: 2006, month: 'Jun', event: 'Akamai & MIT sue Limelight', outcome: null, side: 'akamai', detail: 'Alleged infringement of US Patent 6,108,703 — CDN content delivery method' },
  { year: 2007, month: 'Dec', event: 'Level 3 Communications sues Limelight', outcome: null, side: 'level3', detail: 'Separate patent infringement claim' },
  { year: 2008, month: 'Feb', event: 'Jury finds Limelight infringed ($40M+)', outcome: 'loss', side: 'akamai', detail: 'Boston jury verdict — but the key question: who performs the "tagging" step?' },
  { year: 2009, month: 'Jan', event: 'Jury rules Limelight did NOT infringe Level 3', outcome: 'win', side: 'level3', detail: 'Complete victory in Level 3 case' },
  { year: 2009, month: 'Apr', event: 'District Court overturns Akamai jury verdict', outcome: 'win', side: 'akamai', detail: 'Judge rules no direct infringement — customers did the tagging, not Limelight' },
  { year: 2010, month: 'Dec', event: 'Federal Circuit affirms — Limelight wins', outcome: 'win', side: 'akamai', detail: 'Panel agrees: no single party performed all patent steps' },
  { year: 2011, month: 'Apr', event: 'Federal Circuit grants en banc rehearing', outcome: null, side: 'akamai', detail: 'Full court to reconsider: what happens when separate entities each perform separate steps?' },
  { year: 2012, month: 'Aug', event: 'Federal Circuit reverses — new "induced infringement" theory', outcome: 'loss', side: 'akamai', detail: 'Slim majority creates new legal theory; remands for new trial' },
  { year: 2012, month: 'Dec', event: 'Limelight petitions Supreme Court', outcome: null, side: 'akamai', detail: 'Asks SCOTUS to review the induced infringement standard' },
  { year: 2014, month: 'Jun', event: 'Supreme Court unanimously rules FOR Limelight', outcome: 'win', side: 'akamai', detail: '"Induced infringement cannot occur without direct infringement" — landmark patent law decision' },
  { year: 2015, month: 'May', event: 'Federal Circuit again finds Limelight not liable (2-1)', outcome: 'win', side: 'akamai', detail: 'On remand, expanded vicarious liability standard but still ruled for Limelight' },
  { year: 2015, month: 'Aug', event: 'Federal Circuit en banc reverses AGAIN — Limelight liable', outcome: 'loss', side: 'akamai', detail: 'New broader standard: conditioning participation on performing patent steps = liability' },
  { year: 2016, month: 'Jul', event: 'Final settlement: Limelight pays $51M to Akamai', outcome: 'loss', side: 'akamai', detail: '10-year legal saga ends. Reflected in Q2 2016 earnings.' },
];

export default function PatentWars() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">The Patent Wars</h2>
        <p className="text-slate-400">A decade-long legal battle that reached the Supreme Court</p>
      </div>

      <InsightCallout variant="highlight" title="Landmark Patent Law Case">
        <em>Limelight Networks v. Akamai Technologies</em> (572 U.S. 915) became one of the most important patent
        law cases of the decade. The Supreme Court's unanimous 2014 ruling established that "induced infringement
        cannot occur without direct infringement" — a principle that reshaped how divided method patents are
        enforced across the tech industry.
      </InsightCallout>

      {/* The Patent at Issue */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 mb-6 mt-6">
        <h3 className="text-white font-semibold mb-3">The Patent at Issue</h3>
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
          <p className="text-cyan-400 text-sm font-mono mb-2">US Patent 6,108,703 — "Content Delivery Method"</p>
          <p className="text-slate-300 text-sm mb-3">
            Invented by MIT's Tom Leighton and Danny Lewin (Akamai co-founders). Claims a method of delivering
            web content via CDN where content providers <span className="text-amber-400 font-medium">"tag"</span> embedded
            objects so requests resolve to CDN servers instead of origin servers.
          </p>
          <p className="text-slate-400 text-sm">
            <span className="text-amber-400 font-medium">The key question:</span> Limelight performed most steps of the patent,
            but required its <em>customers</em> to do the "tagging" step. Is that infringement when no single entity
            performs ALL steps?
          </p>
        </div>
      </div>

      {/* Legal Timeline */}
      <div className="relative mt-6">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />
        <div className="space-y-3">
          {legalTimeline.map((item, i) => {
            const dotColor = item.outcome === 'win' ? '#10b981' :
                            item.outcome === 'loss' ? '#ef4444' : '#64748b';
            return (
              <div key={i} className="relative pl-14">
                <div
                  className="absolute left-4 top-3 w-5 h-5 rounded-full border-2 border-slate-900 z-10"
                  style={{ backgroundColor: dotColor }}
                />
                <div className={`bg-slate-800/50 border rounded-lg p-4 ${
                  item.outcome === 'win' ? 'border-emerald-500/20' :
                  item.outcome === 'loss' ? 'border-red-500/20' :
                  'border-slate-700/50'
                }`}>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-slate-500 text-xs font-mono">{item.year} {item.month}</span>
                    {item.outcome && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.outcome === 'win'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {item.outcome === 'win' ? 'Limelight Win' : 'Limelight Loss'}
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.side === 'akamai' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'
                    }`}>
                      vs {item.side === 'akamai' ? 'Akamai/MIT' : 'Level 3'}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm">{item.event}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <p className="text-emerald-400 text-3xl font-bold">5</p>
          <p className="text-emerald-400 text-sm">Limelight Wins</p>
          <p className="text-slate-500 text-xs mt-1">Including Supreme Court</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <p className="text-red-400 text-3xl font-bold">3</p>
          <p className="text-red-400 text-sm">Limelight Losses</p>
          <p className="text-slate-500 text-xs mt-1">Including final $51M settlement</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
          <p className="text-amber-400 text-3xl font-bold">10 yrs</p>
          <p className="text-amber-400 text-sm">Total Duration</p>
          <p className="text-slate-500 text-xs mt-1">June 2006 → July 2016</p>
        </div>
      </div>

      <InsightCallout variant="warning" title="The Ironic Ending">
        After a decade of patent warfare, Limelight ultimately paid Akamai $51M in 2016. Eight years later,
        when Limelight (now Edgio) went bankrupt, Akamai bought its customer contracts for $125M — acquiring
        the very customers it had spent a decade trying to prove Limelight was illegally serving.
      </InsightCallout>
    </div>
  );
}
