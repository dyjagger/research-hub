import React from 'react';
import { Skull, UserX, Crown, Shield, Zap, AlertTriangle } from 'lucide-react';
import { EPISODES, PLAYERS } from '../data/gameData';

export default function GameTimeline({ maxEpisode }) {
  const visibleEpisodes = EPISODES.filter(ep => ep.number <= maxEpisode && ep.number <= 11);
  const getPlayer = (id) => PLAYERS.find(p => p.id === id);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider">Season Timeline</h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600/60 via-amber-600/40 to-emerald-600/60" />

        <div className="space-y-3">
          {visibleEpisodes.map((ep) => {
            const murdered = ep.murdered ? getPlayer(ep.murdered) : null;
            const banishedIds = Array.isArray(ep.banished) ? ep.banished : (ep.banished ? [ep.banished] : []);
            const banishedPlayers = banishedIds.map(id => getPlayer(id)).filter(Boolean);
            const traitorCaught = ep.traitorsBanished > 0;

            return (
              <div key={ep.number} className="relative pl-12">
                {/* Dot */}
                <div className={`absolute left-3.5 top-3 w-3 h-3 rounded-full border-2 ${traitorCaught ? 'bg-emerald-500 border-emerald-400' : 'bg-stone-700 border-stone-500'}`} />

                <div className={`rounded-xl border p-3 ${traitorCaught ? 'border-emerald-800/40 bg-emerald-950/20' : 'border-stone-700/30 bg-stone-900/40'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-500">EP {ep.number}</span>
                      <span className="text-sm font-semibold text-stone-200">{ep.title}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">{ep.airDate}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {murdered && (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-red-950/50 text-red-300 border border-red-800/30 rounded-full px-2 py-0.5">
                        <Skull size={10} /> {murdered.name}
                      </span>
                    )}
                    {banishedPlayers.map(bp => (
                      <span key={bp.id} className={`inline-flex items-center gap-1 text-[11px] rounded-full px-2 py-0.5 border ${bp.affiliation === 'traitor' ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/30' : 'bg-orange-950/50 text-orange-300 border-orange-800/30'}`}>
                        <UserX size={10} /> {bp.name}
                        {bp.affiliation === 'traitor' && <span className="text-[9px] font-bold ml-1">TRAITOR</span>}
                      </span>
                    ))}
                    {ep.missionMoney > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-amber-950/50 text-amber-300 border border-amber-800/30 rounded-full px-2 py-0.5">
                        <Shield size={10} /> +${ep.missionMoney.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {ep.keyEvents.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {ep.keyEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-400">
                          <EventIcon type={event.type} />
                          <span>{event.description}</span>
                        </div>
                      ))}
                      {ep.keyEvents.length > 3 && (
                        <span className="text-[10px] text-stone-500">+{ep.keyEvents.length - 3} more events</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventIcon({ type }) {
  const iconMap = {
    'twist': <Zap size={10} className="text-purple-400 mt-0.5 shrink-0" />,
    'backstab': <AlertTriangle size={10} className="text-red-400 mt-0.5 shrink-0" />,
    'betrayal': <AlertTriangle size={10} className="text-red-400 mt-0.5 shrink-0" />,
    'correct-read': <Crown size={10} className="text-emerald-400 mt-0.5 shrink-0" />,
    'manipulation': <Zap size={10} className="text-orange-400 mt-0.5 shrink-0" />,
    'power-move': <Crown size={10} className="text-amber-400 mt-0.5 shrink-0" />,
    'iconic-moment': <Crown size={10} className="text-amber-400 mt-0.5 shrink-0" />,
  };
  return iconMap[type] || <Zap size={10} className="text-stone-500 mt-0.5 shrink-0" />;
}
