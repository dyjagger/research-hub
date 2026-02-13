import React from 'react';
import { User, ArrowRight } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { leadershipTimeline } from '../data/ciscoData';

const eraColors = {
  'Founding': '#6366f1',
  'Internet Boom → Cloud': '#049fd9',
  'Cloud → AI': '#10b981',
};

export default function Leadership() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Leadership & Eras</h2>
      <p className="text-slate-400 mb-6">
        Four CEOs across four decades — each defining a distinct strategic era
      </p>

      <div className="space-y-6 mb-8">
        {leadershipTimeline.map((leader, i) => {
          const color = eraColors[leader.era] || '#64748b';
          const duration = leader.end - leader.start;
          return (
            <div
              key={i}
              className="bg-slate-800/50 border rounded-xl p-6 relative overflow-hidden"
              style={{ borderColor: color + '50' }}
            >
              <div
                className="absolute top-0 left-0 h-full w-1"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: color + '25' }}
                >
                  <User className="w-7 h-7" style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: color + '30', color }}
                    >
                      {leader.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                    <span>{leader.start}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{leader.end === 2026 ? 'Present' : leader.end}</span>
                    <span className="text-slate-600">·</span>
                    <span>{duration} years</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-2">{leader.description}</p>

                  {leader.name === 'John Chambers' && (
                    <div className="mt-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <p className="text-slate-400 text-xs font-medium mb-1">Key Achievements</p>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• Grew revenue from $2B to $49B (24x increase)</li>
                        <li>• Oversaw 180+ acquisitions including WebEx, Scientific Atlanta, Sourcefire</li>
                        <li>• Navigated dot-com crash — stock fell 80% but company survived and thrived</li>
                        <li>• Cisco added to DJIA (2009), became household brand</li>
                        <li>• Longest-serving CEO: 20 years (1995–2015)</li>
                      </ul>
                    </div>
                  )}

                  {leader.name === 'Chuck Robbins' && (
                    <div className="mt-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <p className="text-slate-400 text-xs font-medium mb-1">Key Achievements</p>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• Pivoted Cisco to software and subscription revenue model</li>
                        <li>• Acquired Splunk for $28B — largest deal in company history</li>
                        <li>• Led Webex transformation during COVID-19 (600M+ monthly meeting participants)</li>
                        <li>• Launched Silicon One custom chip architecture</li>
                        <li>• Stock finally surpassed dot-com era record (Dec 2025)</li>
                        <li>• Driving AI strategy: NeuralFabric, EzDubs, Hypershield, AI Defense</li>
                      </ul>
                    </div>
                  )}

                  {leader.name === 'John Morgridge' && (
                    <div className="mt-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <p className="text-slate-400 text-xs font-medium mb-1">Key Achievements</p>
                      <ul className="text-slate-300 text-xs space-y-1">
                        <li>• Led Cisco through IPO in 1990 ($224M market cap)</li>
                        <li>• Grew revenue from ~$5M to $2B</li>
                        <li>• Established Cisco as the dominant router company</li>
                        <li>• Built the sales and operational foundation for rapid growth</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Strategic Pivots by Era</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/40 border border-indigo-500/30 rounded-xl p-5">
          <h4 className="text-indigo-400 font-semibold mb-2">1984–1995: The Router Company</h4>
          <p className="text-slate-300 text-sm">
            Cisco's identity was built on multi-protocol routers. The AGS router (1986) and Cisco 2500 Series (1993)
            became the backbone of enterprise networking. Strategy: build the best routers and let the internet do the rest.
          </p>
        </div>
        <div className="bg-slate-800/40 border border-cyan-500/30 rounded-xl p-5">
          <h4 className="text-cyan-400 font-semibold mb-2">1996–2000: Acquire Everything</h4>
          <p className="text-slate-300 text-sm">
            Cisco used its soaring stock price as currency to acquire 60+ companies in 5 years. Strategy: if you can't
            build it fast enough, buy it. This era gave Cisco switching (Crescendo), optical (Cerent), VoIP, and wireless.
          </p>
        </div>
        <div className="bg-slate-800/40 border border-amber-500/30 rounded-xl p-5">
          <h4 className="text-amber-400 font-semibold mb-2">2001–2009: Diversify & Recover</h4>
          <p className="text-slate-300 text-sm">
            Post-crash, Cisco diversified into security (IronPort), video (TelePresence, Tandberg), consumer (Linksys),
            and VoIP. Strategy: become a platform company, not just a router company.
          </p>
        </div>
        <div className="bg-slate-800/40 border border-emerald-500/30 rounded-xl p-5">
          <h4 className="text-emerald-400 font-semibold mb-2">2010–2019: Cloud & Software Shift</h4>
          <p className="text-slate-300 text-sm">
            Under Robbins, Cisco pivoted to recurring software revenue. Key moves: Meraki (cloud networking),
            AppDynamics (APM), Duo Security (zero-trust), and exiting consumer business. Strategy: subscription-first.
          </p>
        </div>
        <div className="bg-slate-800/40 border border-purple-500/30 rounded-xl p-5 md:col-span-2">
          <h4 className="text-purple-400 font-semibold mb-2">2020–Present: AI & Observability</h4>
          <p className="text-slate-300 text-sm">
            The Splunk acquisition ($28B) and AI investments (NeuralFabric, Hypershield, AI Defense, EzDubs) signal
            Cisco's bet on data-driven networking and AI-powered security. Webex became a COVID-era lifeline.
            Strategy: own the full stack from network to observability to AI-powered security.
          </p>
        </div>
      </div>

      <InsightCallout variant="insight" title="The Founders">
        Leonard Bosack and Sandy Lerner founded Cisco in 1984 while working at Stanford University. They adapted
        Stanford's multi-protocol router technology into a commercial product. Sandy Lerner was fired in August 1990
        (just 6 months after the IPO), and Bosack resigned in protest. They donated $170M of their Cisco stock
        proceeds to charity. The name "Cisco" comes from San Francisco, and the logo represents the Golden Gate Bridge.
      </InsightCallout>
    </div>
  );
}
