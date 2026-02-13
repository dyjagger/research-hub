import React from 'react';
import { Flame, Users, Crown, Skull, Shield, Eye, MapPin, Tv } from 'lucide-react';
import { SEASON_INFO, PLAYERS, EPISODES } from '../data/gameData';

export default function Overview() {
  const totalFaithfuls = PLAYERS.filter(p => p.affiliation === 'faithful').length;
  const totalTraitors = PLAYERS.filter(p => p.affiliation === 'traitor').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-950/30 via-stone-900/60 to-amber-950/20 border border-stone-700/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={18} className="text-red-500" />
          <h2 className="text-lg font-black text-stone-100">About This Dashboard</h2>
        </div>
        <p className="text-sm text-stone-400 leading-relaxed">
          An interactive analytics dashboard for <strong className="text-stone-200">The Traitors Season 3 (US)</strong> on Peacock.
          Use the <strong className="text-amber-400">Episode Gate</strong> slider at the top to control spoilers — only data up to your selected episode is shown.
          Explore player profiles, social game scores, deception tracking, alliance maps, and game statistics.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <InfoCard icon={<Tv size={14} />} label="Network" value={SEASON_INFO.network} color="text-cyan-400" />
        <InfoCard icon={<MapPin size={14} />} label="Location" value={SEASON_INFO.location} color="text-emerald-400" />
        <InfoCard icon={<Users size={14} />} label="Contestants" value={SEASON_INFO.contestants} color="text-blue-400" />
        <InfoCard icon={<Crown size={14} />} label="Prize Pot" value={`$${SEASON_INFO.totalPrizePot.toLocaleString()}`} color="text-amber-400" />
        <InfoCard icon={<Skull size={14} />} label="Traitors" value={totalTraitors} color="text-red-400" />
        <InfoCard icon={<Shield size={14} />} label="Faithfuls" value={totalFaithfuls} color="text-emerald-400" />
      </div>

      <div className="bg-stone-900/50 border border-stone-700/30 rounded-xl p-4">
        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">How to Use</h3>
        <ul className="space-y-2 text-sm text-stone-400">
          <li className="flex items-start gap-2">
            <Eye size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <span><strong className="text-stone-200">Episode Gate:</strong> Slide to control how far you've watched — no spoilers beyond your episode.</span>
          </li>
          <li className="flex items-start gap-2">
            <Users size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong className="text-stone-200">Players:</strong> Click any player card for a detailed breakdown of their game stats.</span>
          </li>
          <li className="flex items-start gap-2">
            <Skull size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
            <span><strong className="text-stone-200">Deception:</strong> Track lies, manipulations, and backstabs as the game unfolds.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, color }) {
  return (
    <div className="bg-stone-900/50 border border-stone-800/40 rounded-lg px-3 py-3">
      <div className={`flex items-center gap-1.5 ${color} mb-1`}>
        {icon}
        <span className="text-base font-bold">{value}</span>
      </div>
      <span className="text-[10px] text-stone-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
