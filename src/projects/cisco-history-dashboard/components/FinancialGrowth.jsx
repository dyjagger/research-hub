import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend, ComposedChart, Line
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { revenueData, netIncomeData, ERAS } from '../data/ciscoData';

const combinedData = revenueData.map(r => {
  const ni = netIncomeData.find(n => n.year === r.year);
  return { ...r, netIncome: ni?.netIncome || null };
});

export default function FinancialGrowth() {
  const [showNetIncome, setShowNetIncome] = useState(true);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Financial Growth</h2>
      <p className="text-slate-400 mb-6">
        Revenue and profitability trajectory from startup to $57B enterprise
      </p>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setShowNetIncome(!showNetIncome)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            showNetIncome
              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
              : 'bg-slate-700/50 text-slate-400 border border-slate-600'
          }`}
        >
          {showNetIncome ? 'Hide' : 'Show'} Net Income
        </button>
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Annual Revenue & Net Income ($B)</h3>
        <ResponsiveContainer width="100%" height={420}>
          <ComposedChart data={combinedData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `$${v}B`} />
            <Tooltip
              content={
                <CustomTooltip
                  formatter={(val, name) =>
                    name === 'Revenue' || name === 'Net Income'
                      ? `$${val?.toFixed(2)}B`
                      : val
                  }
                />
              }
            />
            <Legend />
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#049fd9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#049fd9" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#049fd9"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
            />
            {showNetIncome && (
              <Line
                type="monotone"
                dataKey="netIncome"
                name="Net Income"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, fill: '#10b981' }}
                connectNulls
              />
            )}
            <ReferenceLine x={2001} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Dot-com crash', fill: '#ef4444', fontSize: 11 }} />
            <ReferenceLine x={2009} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Financial crisis', fill: '#f59e0b', fontSize: 11 }} />
            <ReferenceLine x={2020} stroke="#8b5cf6" strokeDasharray="5 5" label={{ value: 'COVID-19', fill: '#8b5cf6', fontSize: 11 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InsightCallout variant="insight" title="Explosive Early Growth">
          Cisco grew from $69M revenue in 1990 to $18.9B in 2000 — a <strong>274x increase</strong> in
          just 10 years. This was one of the fastest revenue growth stories in tech history.
        </InsightCallout>
        <InsightCallout variant="warning" title="FY2018 Net Income Anomaly">
          Net income dropped to just $110M in FY2018 due to a one-time $11.1B tax charge from the
          U.S. Tax Cuts and Jobs Act (repatriation of overseas earnings). Underlying operations remained healthy.
        </InsightCallout>
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Year-over-Year Revenue Growth (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={revenueData.slice(1).map((r, i) => ({
              year: r.year,
              growth: ((r.revenue - revenueData[i].revenue) / revenueData[i].revenue * 100).toFixed(1),
            }))}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} />
            <Tooltip
              content={<CustomTooltip formatter={(val) => `${val}%`} />}
            />
            <ReferenceLine y={0} stroke="#64748b" />
            <Bar
              dataKey="growth"
              name="Revenue Growth"
              fill="#049fd9"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
