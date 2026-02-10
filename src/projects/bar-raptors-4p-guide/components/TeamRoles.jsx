import React, { useState } from 'react';
import { Coins, Shield, Plane, Crosshair, ChevronRight } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { teamRoles } from '../data/researchData';

const ICONS = { Coins, Shield, Plane, Crosshair };

export default function TeamRoles() {
  const [selectedRole, setSelectedRole] = useState('economy');
  const role = teamRoles.find((r) => r.id === selectedRole);
  const Icon = ICONS[role.icon] || Shield;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Team Roles</h1>
        <p className="text-gray-400 mt-1 text-sm">4-player specialization breakdown — each player owns one role</p>
      </div>

      <InsightCallout color="emerald">
        Every player should help the Economy Lead for the first 2-3 minutes. After that, split into your assigned roles. Communication is key — call out when air waves are incoming or when you need metal overflow.
      </InsightCallout>

      {/* Role Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {teamRoles.map((r) => {
          const RIcon = ICONS[r.icon] || Shield;
          const isActive = selectedRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`p-4 rounded-xl border transition-all duration-150 text-left ${
                isActive
                  ? 'border-opacity-60 bg-opacity-10'
                  : 'border-gray-800 bg-gray-900/40 hover:bg-gray-800/60'
              }`}
              style={isActive ? { borderColor: r.color, backgroundColor: `${r.color}15` } : {}}
            >
              <RIcon className="w-5 h-5 mb-2" style={{ color: r.color }} />
              <p className="text-sm font-semibold text-white">{r.name}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{r.priority}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Role Detail */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${role.color}20` }}>
            <Icon className="w-5 h-5" style={{ color: role.color }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{role.name}</h2>
            <p className="text-xs text-gray-500">Faction: {role.faction}</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-4">{role.summary}</p>

        {/* Responsibilities */}
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Key Responsibilities</h3>
        <div className="space-y-1.5 mb-6">
          {role.responsibilities.map((resp, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: role.color }} />
              <span className="text-sm text-gray-300">{resp}</span>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Target Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(role.keyMetrics).map(([key, value]) => (
            <div key={key} className="bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-sm font-bold text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Synergy */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Team Synergy Map</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-sm text-gray-300"><strong className="text-amber-400">Economy</strong> feeds metal/energy overflow to all 3 other players</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-sm text-gray-300"><strong className="text-red-400">Frontline</strong> protects Economy from ground waves; Con Turrets reclaim raptor corpses for metal</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm text-gray-300"><strong className="text-blue-400">Anti-Air</strong> shields all players from air waves; covers blind spots in frontline AA</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-sm text-gray-300"><strong className="text-purple-400">Heavy Weapons</strong> provides late-game DPS; builds the T3 units that kill the Queen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
