import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { bankruptcySales } from '../data/limelightData';

const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#64748b'];

export default function Collapse() {
  const pieData = bankruptcySales
    .filter(s => s.price)
    .map(s => ({ name: s.buyer, value: s.price }));

  const totalSales = pieData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">The Collapse</h2>
        <p className="text-slate-400">From Edgio rebrand to Chapter 11 — the final chapter</p>
      </div>

      {/* Collapse Timeline */}
      <div className="bg-slate-800/50 border border-red-500/20 rounded-xl p-5 mb-6">
        <h3 className="text-red-400 font-semibold mb-4">Path to Bankruptcy</h3>
        <div className="space-y-4">
          {[
            { date: 'Jun 2022', event: 'Edgecast acquisition closes ($300M) → rebrand to Edgio', type: 'trigger' },
            { date: 'Early 2023', event: 'Accounting problems discovered → Nasdaq non-compliance', type: 'warning' },
            { date: '2023', event: 'Financial restatements required; auditor change', type: 'warning' },
            { date: '2023-2024', event: 'Integration failures; key engineering talent leaves', type: 'warning' },
            { date: 'Jan 2024', event: 'Todd Hinders named CEO (4th CEO)', type: 'neutral' },
            { date: 'Sep 9, 2024', event: 'Chapter 11 bankruptcy filed in Delaware', type: 'critical' },
            { date: 'Sep 11, 2024', event: 'DIP financing approved ($15.6M from Lynrock Lake)', type: 'neutral' },
            { date: 'Nov 14, 2024', event: 'Auction: assets sold to multiple buyers', type: 'critical' },
            { date: 'Dec 13, 2024', event: 'Akamai sale closes ($125M for customer contracts)', type: 'critical' },
            { date: 'Jan 15, 2025', event: 'Edgio ceases ALL operations — network goes offline', type: 'critical' },
            { date: 'Jun 13, 2025', event: 'Plan confirmed; Liquidating Trust established', type: 'neutral' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                item.type === 'critical' ? 'bg-red-500' :
                item.type === 'warning' ? 'bg-amber-500' :
                item.type === 'trigger' ? 'bg-purple-500' :
                'bg-slate-500'
              }`} />
              <div>
                <span className="text-slate-500 text-xs font-mono">{item.date}</span>
                <p className="text-slate-300 text-sm">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout variant="critical" title="Reported Factors in the Collapse">
        Industry analysts cited multiple converging failures: mismanagement from pre-2020 leadership that set an
        "unrecoverable path," failed integration of the Edgecast acquisition, loss of key engineering talent,
        accounting irregularities requiring restatements, Nasdaq delisting proceedings, and intense competitive
        pressure from Akamai (20% market share), Cloudflare (15%), and hyperscale cloud CDNs.
      </InsightCallout>

      {/* Asset Sales Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4">Asset Sales Breakdown (~${totalSales.toFixed(0)}M total)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `$${value}M`}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatter={(v) => `$${v}M`} />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Asset Sale Details */}
        <div className="space-y-3">
          {bankruptcySales.map((sale, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-white font-semibold text-sm">{sale.buyer}</h4>
                <span className="text-cyan-400 font-medium text-sm">
                  {sale.price ? `$${sale.price}M` : 'Undisclosed'}
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-1">{sale.asset}</p>
              <p className="text-slate-400 text-sm">{sale.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Debt Reduction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-red-400 text-xs font-medium uppercase mb-1">Pre-Bankruptcy Debt</p>
          <p className="text-white text-2xl font-bold">$244.5M</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-emerald-400 text-xs font-medium uppercase mb-1">Post-Plan Debt (Uplynk)</p>
          <p className="text-white text-2xl font-bold">$40M</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <p className="text-amber-400 text-xs font-medium uppercase mb-1">Debt Reduction</p>
          <p className="text-white text-2xl font-bold">84%</p>
        </div>
      </div>

      <InsightCallout variant="info" title="The Sole Survivor: Uplynk">
        The only piece of Edgio that survived as a going concern was Uplynk — the cloud-based streaming platform
        originally acquired as part of the Edgecast deal. Lynrock Lake LP won it with a $51M credit bid and
        emerged with just $40M in debt. Everything else was liquidated.
      </InsightCallout>
    </div>
  );
}
