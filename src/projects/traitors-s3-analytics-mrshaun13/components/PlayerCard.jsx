import React from 'react';
import { Shield, Skull, UserX, Crown, Swords, Eye, Target, MessageCircle, Star } from 'lucide-react';

const affiliationColors = {
  faithful: { bg: 'from-blue-950/80 to-blue-900/40', border: 'border-blue-700/40', badge: 'bg-blue-600/80 text-blue-100', dot: 'bg-blue-400' },
  traitor: { bg: 'from-red-950/80 to-red-900/40', border: 'border-red-700/40', badge: 'bg-red-600/80 text-red-100', dot: 'bg-red-400' },
};

const resultIcons = {
  Winner: <Crown size={14} className="text-amber-400" />,
  murdered: <Skull size={14} className="text-red-400" />,
  banished: <UserX size={14} className="text-orange-400" />,
};

export default function PlayerCard({ player, maxEpisode, onClick, isSelected }) {
  const isEliminated = player.eliminatedEpisode && player.eliminatedEpisode <= maxEpisode;
  const isRevealed = isEliminated || player.result === 'Winner';
  const showAffiliation = isRevealed;
  const colors = showAffiliation ? affiliationColors[player.affiliation] : { bg: 'from-stone-900/80 to-stone-800/40', border: 'border-stone-600/40', badge: 'bg-stone-600/80 text-stone-200', dot: 'bg-stone-400' };

  const isInGame = !player.eliminatedEpisode || player.eliminatedEpisode > maxEpisode;
  const enteredYet = player.enteredEpisode <= maxEpisode;

  if (!enteredYet) return null;

  return (
    <button
      onClick={() => onClick(player)}
      className={`relative w-full text-left rounded-xl border p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 ${colors.border} bg-gradient-to-br ${colors.bg} ${isSelected ? 'ring-2 ring-amber-400/60 shadow-amber-400/10 shadow-lg' : ''} ${isEliminated ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${colors.dot} ${isInGame ? 'animate-pulse' : ''}`} />
            <h3 className="text-sm font-bold text-stone-100 truncate">{player.name}</h3>
          </div>
          <p className="text-[11px] text-stone-400 truncate">{player.notability}</p>
          <p className="text-[11px] text-stone-500">{player.from}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {showAffiliation && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.badge}`}>
              {player.affiliation}
            </span>
          )}
          {isEliminated && (
            <div className="flex items-center gap-1 text-[10px] text-stone-400">
              {resultIcons[player.eliminationType] || resultIcons.Winner}
              <span>Ep {player.eliminatedEpisode}</span>
            </div>
          )}
          {!isEliminated && maxEpisode === 11 && player.result === 'Winner' && (
            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
              <Crown size={12} />
              <span>Winner</span>
            </div>
          )}
        </div>
      </div>

      {/* Mini stat bar */}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/5">
        <StatMini icon={<Shield size={11} />} value={player.stats.shieldsWon} label="Shields" color="text-cyan-400" />
        <StatMini icon={<Target size={11} />} value={player.stats.accusationsMade} label="Accused" color="text-orange-400" />
        <StatMini icon={<Eye size={11} />} value={player.stats.correctVotes} label="Correct" color="text-emerald-400" />
        {player.stats.liesTotal !== undefined && (
          <StatMini icon={<MessageCircle size={11} />} value={player.stats.liesTotal} label="Lies" color="text-red-400" />
        )}
        <div className="ml-auto">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-amber-400" />
            <span className="text-[11px] font-bold text-amber-300">{player.socialGameScore}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function StatMini({ icon, value, label, color }) {
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      {icon}
      <span className="text-[11px] font-semibold">{value}</span>
    </div>
  );
}
