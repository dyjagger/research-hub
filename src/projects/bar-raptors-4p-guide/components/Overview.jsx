import React from 'react';
import { Shield, Zap, Users, Skull, AlertTriangle } from 'lucide-react';
import InsightCallout from './InsightCallout';
import { difficultySettings, aggroMechanics } from '../data/researchData';

const statCards = [
  { label: 'Game Mode', value: 'Raptors PvE', sub: 'Tower Defense vs AI Waves', icon: Shield, color: 'text-red-400' },
  { label: 'Team Size', value: '4 Players', sub: 'Specialized Roles', icon: Users, color: 'text-emerald-400' },
  { label: 'Difficulty', value: 'Epic / Survival', sub: 'Hardest Settings', icon: Skull, color: 'text-purple-400' },
  { label: 'Win Condition', value: 'Kill the Queen', sub: 'Spawns at 100% Rage', icon: AlertTriangle, color: 'text-amber-400' },
];

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Beyond All Reason — Raptors 4P Guide</h1>
        <p className="text-gray-400 mt-1 text-sm">Optimized 4-player team composition for the hardest difficulty Raptors mode</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</span>
            </div>
            <p className="text-lg font-bold text-white">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* What is Raptors Mode */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">What is Raptors Mode?</h2>
        <div className="text-sm text-gray-300 space-y-2">
          <p>Raptors is BAR's premier PvE game mode — think CoD Zombies meets tower defense at an epic RTS scale. AI-controlled raptor creatures attack in escalating waves, culminating in a massive Raptor Queen boss fight.</p>
          <p>On the hardest difficulties (Epic/Survival), this mode demands tight coordination between all 4 players. Each player must specialize in a distinct role — economy, frontline defense, anti-air, or heavy weapons — to survive the onslaught and ultimately kill the Queen.</p>
          <p>Unlike PvP, <strong className="text-white">you should NOT build mobile combat units</strong> in standard Raptors. This is a purely defensive mode where static turrets, walls, and shields are your army. The only mobile units you need are constructors and T3 experimentals for the queen fight.</p>
        </div>
      </div>

      <InsightCallout color="red">
        <strong>Critical Mechanic:</strong> Raptors target players based on energy production. Higher energy output = more waves directed at you. Fusion reactors draw 4x aggro per energy unit — avoid them! T2 Wind is the meta energy source.
      </InsightCallout>

      {/* Aggro System */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Aggro System — How Raptors Choose Targets
        </h2>
        <p className="text-sm text-gray-400 mb-4">{aggroMechanics.description}</p>
        <div className="space-y-2">
          {aggroMechanics.rules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-800/40 rounded-lg p-3">
              <div className="w-32 flex-shrink-0">
                <span className="text-xs font-semibold text-amber-400">{r.rule}</span>
              </div>
              <div className="flex-1">
                <span className="text-sm text-white font-medium">{r.weight}</span>
                <p className="text-xs text-gray-500 mt-0.5">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Comparison */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Difficulty Settings Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Difficulty</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Grace Period</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Wave Interval</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Queen HP</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Aggro Multi</th>
                <th className="text-left py-2 px-3 text-gray-400 font-medium">Special %</th>
              </tr>
            </thead>
            <tbody>
              {difficultySettings.map((d, i) => {
                const isHardest = d.difficulty === 'Epic' || d.difficulty === 'Survival';
                return (
                  <tr key={i} className={`border-b border-gray-800/50 ${isHardest ? 'bg-red-500/5' : ''}`}>
                    <td className={`py-2 px-3 font-semibold ${isHardest ? 'text-red-400' : 'text-gray-300'}`}>{d.difficulty}</td>
                    <td className="py-2 px-3 text-gray-300">{d.gracePeriod}</td>
                    <td className="py-2 px-3 text-gray-300">{d.waveInterval}</td>
                    <td className="py-2 px-3 text-gray-300">{d.queenHP}</td>
                    <td className="py-2 px-3 text-gray-300">{d.aggroMultiplier}</td>
                    <td className="py-2 px-3 text-gray-300">{d.specialRatio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Note: Wave sizes also have slight RNG (0.5x to 2x), applied independently to timing and size. You can get a double wave that spawns in half the time.</p>
      </div>

      <InsightCallout color="amber">
        On Epic difficulty, you have only 9 minutes of grace period to set up your economy and initial defenses. Every second counts — all 4 players should be building from the moment the game starts.
      </InsightCallout>
    </div>
  );
}
