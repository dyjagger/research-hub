import React from 'react';
import { Building2, DollarSign, Globe, Calendar, Skull, Scale } from 'lucide-react';
import StatCard from './StatCard';
import InsightCallout from './InsightCallout';
import { revenueData, ERAS, milestones, networkScale } from '../data/limelightData';

export default function Overview() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          The Rise & Fall of <span className="text-cyan-400">Limelight Networks</span>
        </h2>
        <p className="text-slate-400 text-lg">
          From CDN pioneer to bankruptcy — 23 years of content delivery history (2001–2025)
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Founded" value="2001" sub="Tempe, Arizona" icon={Building2} color="cyan" />
        <StatCard label="IPO" value="$240M" sub="June 2007 @ $15/share" icon={DollarSign} color="green" />
        <StatCard label="Peak Revenue" value="$370M" sub="2023 TTM (as Edgio)" icon={DollarSign} color="purple" />
        <StatCard label="Peak Network" value="300 PoPs" sub="275+ Tbps capacity" icon={Globe} color="blue" />
        <StatCard label="Patent War" value="$51M" sub="10-year Akamai lawsuit" icon={Scale} color="amber" />
        <StatCard label="Shutdown" value="Jan 2025" sub="Chapter 11 bankruptcy" icon={Skull} color="red" />
      </div>

      <InsightCallout variant="highlight" title="The Limelight Paradox">
        Limelight Networks streamed the Olympics, the Super Bowl, and a presidential inauguration — yet never
        turned a consistent profit. While the CDN market grew from $1.5B to $26B during its lifetime, Limelight's
        market share shrank from 12% to near zero. The company that helped build the streaming era couldn't
        survive it.
      </InsightCallout>

      {/* Era Timeline */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Company Eras</h3>
        <div className="space-y-3">
          {Object.entries(ERAS).map(([name, era]) => (
            <div key={name} className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: era.color }} />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{name}</span>
                  <span className="text-slate-500 text-xs">{era.years}</span>
                </div>
                <p className="text-slate-400 text-sm">{era.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Numbers */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-3">By the Numbers</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Years in operation</span><span className="text-white font-medium">23 years</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Total acquisitions</span><span className="text-white font-medium">7 companies</span></div>
            <div className="flex justify-between"><span className="text-slate-400">IPO price → final price</span><span className="text-white font-medium">$15.00 → $0.02</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Peak employees</span><span className="text-white font-medium">~610</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Major clients served</span><span className="text-white font-medium">935+ globally</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Bankruptcy debt</span><span className="text-white font-medium">$244.5M</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Asset sale total</span><span className="text-white font-medium">~$185M</span></div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-3">Notable Streams & Events</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">2008 Beijing Olympics</span><span className="text-white font-medium">50M visitors, 70M streams</span></div>
            <div className="flex justify-between"><span className="text-slate-400">2009 Obama Inauguration</span><span className="text-white font-medium">9M simultaneous streams</span></div>
            <div className="flex justify-between"><span className="text-slate-400">2008 Disney Camp Rock</span><span className="text-white font-medium">863K plays in 24hrs</span></div>
            <div className="flex justify-between"><span className="text-slate-400">2008 Oprah webcast</span><span className="text-white font-medium">800K+ users (server crash)</span></div>
            <div className="flex justify-between"><span className="text-slate-400">2012 Summer Games</span><span className="text-white font-medium">Multiple broadcasters</span></div>
            <div className="flex justify-between"><span className="text-slate-400">2017 Super Bowl</span><span className="text-white font-medium">1 of 3 CDN providers</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
