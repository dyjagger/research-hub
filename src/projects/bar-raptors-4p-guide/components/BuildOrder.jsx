import React, { useState } from 'react';
import { Clock, Coins, Shield, Plane, Crosshair, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
import InsightCallout from './InsightCallout';
import { teamRoles, economyMilestones } from '../data/researchData';

const ROLE_COLORS = { economy: '#f59e0b', frontline: '#ef4444', antiair: '#3b82f6', heavy: '#a855f7' };
const ROLE_ICONS = { economy: Coins, frontline: Shield, antiair: Plane, heavy: Crosshair };
const PRIORITY_ICONS = { critical: AlertCircle, high: CheckCircle2, medium: Circle };
const PRIORITY_COLORS = { critical: 'text-red-400', high: 'text-amber-400', medium: 'text-gray-500' };

export default function BuildOrder() {
  const [selectedRole, setSelectedRole] = useState('economy');
  const role = teamRoles.find((r) => r.id === selectedRole);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Build Order Timeline</h1>
        <p className="text-gray-400 mt-1 text-sm">Phase-by-phase build order for each player role</p>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-2 flex-wrap">
        {teamRoles.map((r) => {
          const isActive = selectedRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'text-white' : 'text-gray-400 bg-gray-800/40 hover:bg-gray-800/70'
              }`}
              style={isActive ? { backgroundColor: `${r.color}20`, color: r.color } : {}}
            >
              {r.name}
            </button>
          );
        })}
      </div>

      {/* Build Order Steps */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1">{role.name} — Build Order</h2>
        <p className="text-xs text-gray-500 mb-4">Faction: {role.faction}</p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[52px] top-0 bottom-0 w-px" style={{ backgroundColor: `${role.color}30` }} />

          <div className="space-y-1">
            {role.buildOrder.map((step, i) => {
              const PIcon = PRIORITY_ICONS[step.priority] || Circle;
              const pColor = PRIORITY_COLORS[step.priority] || 'text-gray-500';
              return (
                <div key={i} className="flex items-start gap-3 py-2 group">
                  {/* Time */}
                  <div className="w-12 flex-shrink-0 text-right">
                    <span className="text-xs font-mono text-gray-500">{step.time}</span>
                  </div>
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border-2 mt-0.5"
                      style={{
                        borderColor: role.color,
                        backgroundColor: step.priority === 'critical' ? role.color : 'transparent',
                      }}
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 flex items-start gap-2">
                    <span className="text-sm text-gray-200 group-hover:text-white transition-colors">{step.action}</span>
                    <PIcon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${pColor}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 text-red-400" />
            <span className="text-[10px] text-gray-500">Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] text-gray-500">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Circle className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500">Medium</span>
          </div>
        </div>
      </div>

      {/* Economy Milestones Chart */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Economy Growth Milestones</h2>
        <p className="text-xs text-gray-500 mb-4">Target energy and metal production over time (Economy Lead)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={economyMilestones}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis yAxisId="energy" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <YAxis yAxisId="metal" orientation="right" tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area yAxisId="energy" type="monotone" dataKey="energy" name="Energy/sec" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} strokeWidth={2} />
              <Area yAxisId="metal" type="monotone" dataKey="metal" name="Metal/sec" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones Table */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Economy Phase Breakdown</h2>
        <div className="space-y-2">
          {economyMilestones.map((m, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-800/30 rounded-lg p-3">
              <div className="w-16 flex-shrink-0">
                <span className="text-xs font-mono font-bold text-amber-400">{m.time}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-semibold text-white">{m.phase}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">{(m.energy / 1000).toFixed(0)}K E/s</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{m.metal >= 1000 ? `${(m.metal / 1000).toFixed(1)}K` : m.metal} M/s</span>
                </div>
                <p className="text-xs text-gray-400">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InsightCallout color="amber">
        <strong>Key Timing:</strong> The grace period on Epic is only 9 minutes. Your T1 economy must be fully running and initial defenses placed before the first wave hits. The Economy Lead should hit 5K energy/sec by minute 8.
      </InsightCallout>
    </div>
  );
}
