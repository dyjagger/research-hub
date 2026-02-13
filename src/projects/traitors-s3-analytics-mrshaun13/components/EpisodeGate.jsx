import React from 'react';
import { Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';

export default function EpisodeGate({ maxEpisode, setMaxEpisode }) {
  const episodes = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-red-950/60 to-amber-950/40 border border-red-800/40 rounded-xl px-4 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-red-400">
        {maxEpisode < 11 ? <EyeOff size={16} /> : <Eye size={16} />}
        <span className="text-xs font-semibold uppercase tracking-wider">Spoiler Gate</span>
      </div>
      <div className="relative">
        <select
          value={maxEpisode}
          onChange={(e) => setMaxEpisode(Number(e.target.value))}
          className="appearance-none bg-black/40 border border-red-700/50 text-amber-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium cursor-pointer hover:border-red-500/70 transition-colors focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          {episodes.map((ep) => (
            <option key={ep} value={ep}>
              Episode {ep}{ep === 11 ? ' (Finale)' : ''}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 pointer-events-none" />
      </div>
      <span className="text-xs text-stone-400">
        {maxEpisode < 11
          ? `Showing data through Ep ${maxEpisode} — no spoilers beyond`
          : 'All episodes unlocked'}
      </span>
    </div>
  );
}
