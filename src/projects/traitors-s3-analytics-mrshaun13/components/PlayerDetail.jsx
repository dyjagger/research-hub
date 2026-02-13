import React from 'react';
import { X, Shield, Skull, UserX, Crown, Target, Eye, MessageCircle, Star, Swords, Users, MapPin, Tv, Calendar, Quote, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PlayerDetail({ player, maxEpisode, onClose }) {
  if (!player) return null;

  const isEliminated = player.eliminatedEpisode && player.eliminatedEpisode <= maxEpisode;
  const showAffiliation = isEliminated || (maxEpisode === 11 && player.result === 'Winner');
  const isTraitor = player.affiliation === 'traitor';
  const accentColor = showAffiliation ? (isTraitor ? 'red' : 'blue') : 'stone';

  const visibleQuotes = player.stats.confessionalQuotes.filter((_, i) => {
    return true;
  });

  const survivalRate = player.stats.episodesSurvived <= maxEpisode
    ? Math.min(player.stats.episodesSurvived, maxEpisode)
    : maxEpisode;
  const voteAccuracy = (player.stats.correctVotes + player.stats.incorrectVotes) > 0
    ? Math.round((player.stats.correctVotes / (player.stats.correctVotes + player.stats.incorrectVotes)) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-${accentColor}-700/40 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 bg-gradient-to-r from-${accentColor}-950/90 to-stone-900/90 backdrop-blur-md border-b border-${accentColor}-700/30 px-6 py-4`}>
          <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-${accentColor}-600 to-${accentColor}-800 flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{player.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-stone-400 flex items-center gap-1"><Tv size={12} /> {player.notability}</span>
                {showAffiliation && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isTraitor ? 'bg-red-600/80 text-red-100' : 'bg-blue-600/80 text-blue-100'}`}>
                    {player.affiliation}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Bio Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoChip icon={<Calendar size={13} />} label="Age" value={player.age} />
            <InfoChip icon={<MapPin size={13} />} label="From" value={player.from.split(',')[0]} />
            <InfoChip icon={<Tv size={13} />} label="Show" value={player.show} />
            <InfoChip icon={<Users size={13} />} label="Category" value={player.category} />
          </div>

          {/* Result */}
          {isEliminated && (
            <div className={`rounded-xl p-3 border ${player.eliminationType === 'murdered' ? 'border-red-800/40 bg-red-950/30' : 'border-orange-800/40 bg-orange-950/30'}`}>
              <div className="flex items-center gap-2">
                {player.eliminationType === 'murdered' ? <Skull size={16} className="text-red-400" /> : <UserX size={16} className="text-orange-400" />}
                <span className="text-sm font-semibold text-stone-200">
                  {player.eliminationType === 'murdered' ? 'Murdered' : 'Banished'} in Episode {player.eliminatedEpisode}
                </span>
              </div>
            </div>
          )}
          {!isEliminated && maxEpisode === 11 && player.result === 'Winner' && (
            <div className="rounded-xl p-3 border border-amber-700/40 bg-amber-950/30">
              <div className="flex items-center gap-2">
                <Crown size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-amber-200">Winner — Split $204,300 four ways</span>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div>
            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp size={14} /> Game Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatBlock label="Social Game Score" value={player.socialGameScore} max={100} color="amber" icon={<Star size={14} />} />
              <StatBlock label="Episodes Survived" value={survivalRate} max={11} color="emerald" icon={<Shield size={14} />} />
              <StatBlock label="Vote Accuracy" value={`${voteAccuracy}%`} max={100} rawValue={voteAccuracy} color="cyan" icon={<Eye size={14} />} />
              <StatBlock label="Shields Won" value={player.stats.shieldsWon} max={4} color="blue" icon={<Shield size={14} />} />
              <StatBlock label="Accusations Made" value={player.stats.accusationsMade} max={8} color="orange" icon={<Target size={14} />} />
              <StatBlock label="Times Targeted" value={player.stats.timesTargeted} max={9} color="red" icon={<AlertTriangle size={14} />} />
              {player.stats.liesTotal !== undefined && (
                <StatBlock label="Lies Told" value={player.stats.liesTotal} max={18} color="red" icon={<MessageCircle size={14} />} />
              )}
              {player.stats.backstabs !== undefined && (
                <StatBlock label="Backstabs" value={player.stats.backstabs} max={3} color="purple" icon={<Swords size={14} />} />
              )}
              {player.stats.manipulations !== undefined && (
                <StatBlock label="Manipulations" value={player.stats.manipulations} max={8} color="rose" icon={<Target size={14} />} />
              )}
            </div>
          </div>

          {/* Alliance Strength */}
          <div>
            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users size={14} /> Social Profile
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-stone-400 mb-1">
                  <span>Alliance Strength</span>
                  <span className="capitalize">{player.stats.allianceStrength}</span>
                </div>
                <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${player.stats.allianceStrength === 'strong' ? 'bg-emerald-500 w-[90%]' : player.stats.allianceStrength === 'medium' ? 'bg-amber-500 w-[55%]' : 'bg-red-500 w-[25%]'}`}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-stone-400 mb-1">
                  <span>Threat Level</span>
                  <span className="capitalize">{player.stats.threatLevel}</span>
                </div>
                <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${player.stats.threatLevel === 'extreme' ? 'bg-red-500 w-[100%]' : player.stats.threatLevel === 'high' ? 'bg-orange-500 w-[75%]' : player.stats.threatLevel === 'medium' ? 'bg-amber-500 w-[50%]' : 'bg-emerald-500 w-[25%]'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quotes */}
          {visibleQuotes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Quote size={14} /> Memorable Quotes
              </h3>
              <div className="space-y-2">
                {visibleQuotes.map((quote, i) => (
                  <div key={i} className="border-l-2 border-amber-600/50 pl-3 py-1">
                    <p className="text-sm text-stone-300 italic">"{quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recruited Traitor Badge */}
          {player.originalAffiliation === 'faithful' && player.recruitedEpisode && player.recruitedEpisode <= maxEpisode && (
            <div className="rounded-xl p-3 border border-purple-800/40 bg-purple-950/30">
              <div className="flex items-center gap-2">
                <Swords size={16} className="text-purple-400" />
                <span className="text-sm text-purple-200">
                  Recruited as Traitor in Episode {player.recruitedEpisode} — originally a Faithful
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon, label, value }) {
  return (
    <div className="bg-stone-800/50 rounded-lg px-3 py-2 border border-stone-700/30">
      <div className="flex items-center gap-1.5 text-stone-500 mb-0.5">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-stone-200 truncate">{value}</p>
    </div>
  );
}

function StatBlock({ label, value, max, color, icon, rawValue }) {
  const numericValue = rawValue !== undefined ? rawValue : (typeof value === 'number' ? value : 0);
  const pct = max > 0 ? Math.min((numericValue / max) * 100, 100) : 0;
  const colorMap = {
    amber: 'bg-amber-500', emerald: 'bg-emerald-500', cyan: 'bg-cyan-500',
    blue: 'bg-blue-500', orange: 'bg-orange-500', red: 'bg-red-500',
    purple: 'bg-purple-500', rose: 'bg-rose-500',
  };
  const textColorMap = {
    amber: 'text-amber-400', emerald: 'text-emerald-400', cyan: 'text-cyan-400',
    blue: 'text-blue-400', orange: 'text-orange-400', red: 'text-red-400',
    purple: 'text-purple-400', rose: 'text-rose-400',
  };

  return (
    <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-700/20">
      <div className="flex items-center justify-between mb-2">
        <span className={`${textColorMap[color]}`}>{icon}</span>
        <span className={`text-lg font-bold ${textColorMap[color]}`}>{value}</span>
      </div>
      <div className="h-1.5 bg-stone-700/50 rounded-full overflow-hidden mb-1.5">
        <div className={`h-full rounded-full ${colorMap[color]} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] text-stone-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
