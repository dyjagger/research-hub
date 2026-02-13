import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceArea
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { marketCapData } from '../data/ciscoData';

export default function MarketValuation() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Market Valuation</h2>
      <p className="text-slate-400 mb-6">
        The dramatic arc from IPO to dot-com peak to 25-year recovery
      </p>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Market Capitalization ($B) — 1996 to 2026</h3>
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={marketCapData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}B`} />
            <Tooltip
              content={
                <CustomTooltip
                  formatter={(val, name) => {
                    const point = marketCapData.find(d => d.marketCap === val);
                    const note = point?.note ? ` (${point.note})` : '';
                    return `$${val.toFixed(1)}B${note}`;
                  }}
                />
              }
            />
            <defs>
              <linearGradient id="mcapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <ReferenceArea x1={1998} x2={2001} fill="#ef4444" fillOpacity={0.08} label={{ value: 'Dot-com Bubble', fill: '#ef4444', fontSize: 11, position: 'insideTop' }} />
            <ReferenceArea x1={2007} x2={2009} fill="#f59e0b" fillOpacity={0.08} label={{ value: 'Financial Crisis', fill: '#f59e0b', fontSize: 11, position: 'insideTop' }} />
            <Area
              type="monotone"
              dataKey="marketCap"
              name="Market Cap"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#mcapGrad)"
              dot={{ r: 3, fill: '#8b5cf6' }}
            />
            <ReferenceLine y={355.12} stroke="#ef4444" strokeDasharray="8 4" label={{ value: '1999 Peak: $355B', fill: '#ef4444', fontSize: 11, position: 'right' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-1">Dot-Com Peak (Mar 2000)</p>
          <p className="text-3xl font-bold text-red-400">~$555B</p>
          <p className="text-slate-500 text-xs mt-1">Most valuable company in the world</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-1">Post-Crash Low (2002)</p>
          <p className="text-3xl font-bold text-amber-400">$95B</p>
          <p className="text-slate-500 text-xs mt-1">-83% from peak</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm mb-1">Current (Feb 2026)</p>
          <p className="text-3xl font-bold text-purple-400">$343B</p>
          <p className="text-slate-500 text-xs mt-1">Record stock price finally surpassed Dec 2025</p>
        </div>
      </div>

      <InsightCallout variant="warning" title="The 25-Year Recovery">
        Cisco's stock took <strong>25 years</strong> to recover its dot-com era highs. During that same period,
        the S&P 500 rose ~350%. This is often cited as the ultimate cautionary tale about buying at bubble
        valuations — even for fundamentally strong companies. Cisco's revenue grew from $18.9B (2000) to
        $56.7B (2025), but the stock barely kept pace with inflation until the AI-driven rally of 2024-2025.
      </InsightCallout>

      <InsightCallout variant="insight" title="Why It Took So Long">
        At the 2000 peak, Cisco traded at ~150x earnings — an extreme valuation. Even though the company
        tripled its revenue over the next 25 years, the stock had to "grow into" that valuation. The
        lesson: a great company at a terrible price can still be a terrible investment for decades.
      </InsightCallout>
    </div>
  );
}
