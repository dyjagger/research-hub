import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ComposedChart, Line
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { employeeData, revenuePerEmployee } from '../data/ciscoData';

const growthData = employeeData.slice(1).map((e, i) => ({
  year: e.year,
  growth: (((e.employees - employeeData[i].employees) / employeeData[i].employees) * 100).toFixed(1),
  employees: e.employees,
}));

export default function Workforce() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">Workforce</h2>
      <p className="text-slate-400 mb-6">
        Employee growth from 4,000 to 90,000+ — and the layoffs along the way
      </p>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Employee Count (1995–2025)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={employeeData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              content={
                <CustomTooltip
                  formatter={(val) => `${val.toLocaleString()} employees`}
                />
              }
            />
            <defs>
              <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="employees"
              name="Employees"
              stroke="#f59e0b"
              strokeWidth={2.5}
              fill="url(#empGrad)"
              dot={{ r: 3, fill: '#f59e0b' }}
            />
            <ReferenceLine x={2001} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Dot-com layoffs', fill: '#ef4444', fontSize: 11 }} />
            <ReferenceLine x={2011} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '2011 restructuring', fill: '#ef4444', fontSize: 11 }} />
            <ReferenceLine x={2014} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '6,000 cut', fill: '#ef4444', fontSize: 10 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">YoY Employee Growth (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={growthData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip formatter={(val) => `${val}%`} />} />
              <ReferenceLine y={0} stroke="#64748b" />
              <Bar dataKey="growth" name="Growth" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue per Employee ($K)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={revenuePerEmployee} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(val, name) =>
                      name === 'Rev/Employee'
                        ? `$${(val / 1000).toFixed(0)}K`
                        : val.toLocaleString()
                    }
                  />
                }
              />
              <Bar dataKey="revenuePerEmployee" name="Rev/Employee" fill="#049fd9" radius={[2, 2, 0, 0]} opacity={0.7} />
              <Line type="monotone" dataKey="revenuePerEmployee" name="Trend" stroke="#10b981" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <InsightCallout variant="insight" title="The 1996 & 2000 Hiring Surges">
        Cisco's headcount grew <strong>115%</strong> in 1996 (from 4,086 to 8,782) and <strong>62%</strong> in
        2000 (from 21,000 to 34,000). These explosive hiring periods coincided with the internet boom and
        Cisco's aggressive acquisition strategy — many employees came through acquired companies.
      </InsightCallout>

      <InsightCallout variant="warning" title="Major Layoff Events">
        <strong>2001-2003:</strong> Post dot-com, headcount dropped from 38,000 to 34,000.
        <strong> 2011:</strong> ~10,000 jobs cut (14% of workforce) in major restructuring.
        <strong> 2014:</strong> Another 6,000 cut (8% of workforce).
        <strong> 2025:</strong> 4,200 reduction (-4.65%) as part of post-Splunk integration.
      </InsightCallout>
    </div>
  );
}
