import React from 'react';
import { Building2, DollarSign, Users, TrendingUp, Calendar, ShoppingCart } from 'lucide-react';
import StatCard from './StatCard';
import InsightCallout from './InsightCallout';
import { ERAS, milestones } from '../data/ciscoData';

export default function Overview() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Cisco Systems: 40 Years of Innovation</h2>
      <p className="text-slate-400 mb-6">
        From a Stanford University project in 1984 to a $340B+ tech conglomerate powering the world's networks
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard icon={Calendar} label="Founded" value="1984" subtext="San Francisco, CA" color="#6366f1" />
        <StatCard icon={DollarSign} label="Revenue (FY2025)" value="$56.7B" subtext="+5.3% YoY" color="#10b981" />
        <StatCard icon={TrendingUp} label="Market Cap" value="$343B" subtext="Feb 2026" color="#049fd9" />
        <StatCard icon={Users} label="Employees" value="86,200" subtext="FY2025" color="#f59e0b" />
        <StatCard icon={ShoppingCart} label="Acquisitions" value="218+" subtext="Since 1993" color="#8b5cf6" />
        <StatCard icon={Building2} label="HQ" value="San Jose" subtext="California, USA" color="#ec4899" />
      </div>

      <InsightCallout variant="highlight" title="The Dot-Com Record">
        In March 2000, Cisco briefly became the most valuable company in the world at ~$555B market cap,
        surpassing Microsoft. It took <strong>25 years</strong> — until December 2025 — for the stock to
        finally surpass its dot-com era record high.
      </InsightCallout>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Company Eras</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {Object.entries(ERAS).map(([name, era]) => (
          <div
            key={name}
            className="rounded-lg p-4 border"
            style={{ borderColor: era.color + '60', backgroundColor: era.color + '15' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: era.color }} />
              <span className="text-white font-semibold text-sm">{name}</span>
            </div>
            <p className="text-slate-400 text-xs mb-1">{era.years}</p>
            <p className="text-slate-300 text-xs">{era.description}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Key Milestones Timeline</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700" />
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {milestones.map((m, i) => {
            const catColors = {
              Company: '#6366f1',
              Product: '#049fd9',
              Financial: '#10b981',
              Acquisition: '#f59e0b',
              Innovation: '#8b5cf6',
            };
            const color = catColors[m.category] || '#64748b';
            return (
              <div key={i} className="flex items-start gap-4 ml-1">
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {String(m.year).slice(-2)}
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-semibold text-sm">{m.year}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: color + '30', color }}
                    >
                      {m.category}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{m.event}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
