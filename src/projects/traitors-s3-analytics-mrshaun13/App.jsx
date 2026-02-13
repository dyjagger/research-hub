import React, { useState, useMemo } from 'react';
import { Crown, Skull, UserX, Shield, Eye, Swords, Users, TrendingUp, BarChart3, Clock, MapPin, Filter, Search, ChevronRight, Flame, Sparkles } from 'lucide-react';
import EpisodeGate from './components/EpisodeGate';
import PlayerCard from './components/PlayerCard';
import PlayerDetail from './components/PlayerDetail';
import GameTimeline from './components/GameTimeline';
import {
  PrizePotChart, PlayerCountChart, SocialGameRanking,
  DeceptionTracker, MissionPerformance, AffiliationPie,
  ShieldLeaderboard,
} from './components/StatsCharts';
import { PLAYERS, EPISODES, SEASON_INFO, ALLIANCES, DECEPTIONS } from './data/gameData';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 size={14} /> },
  { id: 'players', label: 'Players', icon: <Users size={14} /> },
  { id: 'timeline', label: 'Timeline', icon: <Clock size={14} /> },
  { id: 'deception', label: 'Deception', icon: <Swords size={14} /> },
  { id: 'alliances', label: 'Alliances', icon: <Users size={14} /> },
];

const SORT_OPTIONS = [
  { id: 'social', label: 'Social Game' },
  { id: 'survival', label: 'Survival' },
  { id: 'shields', label: 'Shields' },
  { id: 'accuracy', label: 'Vote Accuracy' },
  { id: 'accusations', label: 'Accusations' },
  { id: 'targeted', label: 'Times Targeted' },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'alive', label: 'In Game' },
  { id: 'eliminated', label: 'Eliminated' },
  { id: 'faithful-revealed', label: 'Faithfuls' },
  { id: 'traitor-revealed', label: 'Traitors' },
];

export default function App() {
  const [maxEpisode, setMaxEpisode] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [sortBy, setSortBy] = useState('social');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentEpisode = EPISODES.find(ep => ep.number === maxEpisode);
  const visiblePlayers = useMemo(() => {
    let filtered = PLAYERS.filter(p => p.enteredEpisode <= maxEpisode);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.notability.toLowerCase().includes(q) ||
        p.from.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filterBy === 'alive') {
      filtered = filtered.filter(p => !p.eliminatedEpisode || p.eliminatedEpisode > maxEpisode);
    } else if (filterBy === 'eliminated') {
      filtered = filtered.filter(p => p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode);
    } else if (filterBy === 'faithful-revealed') {
      filtered = filtered.filter(p => {
        const isEliminated = p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode;
        const isWinner = maxEpisode === 11 && p.result === 'Winner';
        return (isEliminated || isWinner) && p.affiliation === 'faithful';
      });
    } else if (filterBy === 'traitor-revealed') {
      filtered = filtered.filter(p => {
        const isEliminated = p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode;
        return isEliminated && p.affiliation === 'traitor';
      });
    }

    const sortFns = {
      social: (a, b) => b.socialGameScore - a.socialGameScore,
      survival: (a, b) => b.stats.episodesSurvived - a.stats.episodesSurvived,
      shields: (a, b) => b.stats.shieldsWon - a.stats.shieldsWon,
      accuracy: (a, b) => {
        const accA = (a.stats.correctVotes + a.stats.incorrectVotes) > 0 ? a.stats.correctVotes / (a.stats.correctVotes + a.stats.incorrectVotes) : 0;
        const accB = (b.stats.correctVotes + b.stats.incorrectVotes) > 0 ? b.stats.correctVotes / (b.stats.correctVotes + b.stats.incorrectVotes) : 0;
        return accB - accA;
      },
      accusations: (a, b) => b.stats.accusationsMade - a.stats.accusationsMade,
      targeted: (a, b) => b.stats.timesTargeted - a.stats.timesTargeted,
    };

    return filtered.sort(sortFns[sortBy] || sortFns.social);
  }, [maxEpisode, sortBy, filterBy, searchQuery]);

  const stats = useMemo(() => {
    const alive = PLAYERS.filter(p => p.enteredEpisode <= maxEpisode && (!p.eliminatedEpisode || p.eliminatedEpisode > maxEpisode));
    const eliminated = PLAYERS.filter(p => p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode);
    const traitorsCaught = eliminated.filter(p => p.affiliation === 'traitor' && p.eliminationType === 'banished').length;
    const faithfulsBanished = eliminated.filter(p => p.affiliation === 'faithful' && p.eliminationType === 'banished').length;
    const faithfulsMurdered = eliminated.filter(p => p.affiliation === 'faithful' && p.eliminationType === 'murdered').length;
    const ep = EPISODES.find(e => e.number === maxEpisode);
    return { alive: alive.length, eliminated: eliminated.length, traitorsCaught, faithfulsBanished, faithfulsMurdered, pot: ep?.totalPot || 0 };
  }, [maxEpisode]);

  const visibleDeceptions = useMemo(() => DECEPTIONS.filter(d => d.episode <= maxEpisode), [maxEpisode]);
  const visibleAlliances = useMemo(() => ALLIANCES.filter(a => a.formedEpisode <= maxEpisode), [maxEpisode]);

  return (
    <div className="h-full bg-stone-950 text-stone-100 overflow-y-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-stone-950 to-amber-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        <div className="relative px-6 pt-6 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame size={20} className="text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">The Traitors Analytics</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-red-400">
                Season 3 — Game Intelligence
              </h1>
              <p className="text-sm text-stone-400 mt-1 max-w-xl">
                {SEASON_INFO.location} • Hosted by {SEASON_INFO.host} • {SEASON_INFO.contestants} contestants • ${SEASON_INFO.totalPrizePot.toLocaleString()} prize
              </p>
            </div>
            <EpisodeGate maxEpisode={maxEpisode} setMaxEpisode={setMaxEpisode} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
            <QuickStat icon={<Users size={14} />} label="Alive" value={stats.alive} color="text-emerald-400" />
            <QuickStat icon={<Skull size={14} />} label="Murdered" value={stats.faithfulsMurdered} color="text-red-400" />
            <QuickStat icon={<UserX size={14} />} label="Banished" value={stats.faithfulsBanished + stats.traitorsCaught} color="text-orange-400" />
            <QuickStat icon={<Shield size={14} />} label="Traitors Caught" value={stats.traitorsCaught} color="text-emerald-400" />
            <QuickStat icon={<Crown size={14} />} label="Prize Pot" value={`$${(stats.pot / 1000).toFixed(1)}k`} color="text-amber-400" />
            <QuickStat icon={<Eye size={14} />} label="Episode" value={`${maxEpisode} / 11`} color="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/50 px-6">
        <div className="flex gap-1 overflow-x-auto py-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600/20 text-red-300 border border-red-700/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Episode Summary */}
            {currentEpisode && currentEpisode.number <= 11 && (
              <div className="bg-gradient-to-r from-stone-900/80 to-stone-900/40 border border-stone-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-amber-400" />
                  <h3 className="text-sm font-bold text-stone-200">Episode {currentEpisode.number}: {currentEpisode.title}</h3>
                </div>
                <p className="text-sm text-stone-400 leading-relaxed">{currentEpisode.summary}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PrizePotChart maxEpisode={maxEpisode} />
              <PlayerCountChart maxEpisode={maxEpisode} />
              <SocialGameRanking maxEpisode={maxEpisode} />
              <AffiliationPie maxEpisode={maxEpisode} />
              <MissionPerformance maxEpisode={maxEpisode} />
              <ShieldLeaderboard maxEpisode={maxEpisode} />
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="space-y-4">
            {/* Player Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-900/60 border border-stone-700/40 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-900/60 border border-stone-700/40 rounded-lg px-3 py-2 text-sm text-stone-300 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>Sort: {opt.label}</option>
                  ))}
                </select>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="bg-stone-900/60 border border-stone-700/40 rounded-lg px-3 py-2 text-sm text-stone-300 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                >
                  {FILTER_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>Filter: {opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-stone-500">{visiblePlayers.length} players shown • Click for detailed breakdown</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visiblePlayers.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  maxEpisode={maxEpisode}
                  onClick={setSelectedPlayer}
                  isSelected={selectedPlayer?.id === player.id}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <GameTimeline maxEpisode={maxEpisode} />
        )}

        {activeTab === 'deception' && (
          <div className="space-y-6">
            <DeceptionTracker maxEpisode={maxEpisode} />

            <div className="bg-stone-900/60 border border-stone-700/30 rounded-xl p-4">
              <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider mb-3">Deception Log</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {visibleDeceptions.map((d, i) => {
                  const player = PLAYERS.find(p => p.id === d.player);
                  const target = d.target ? PLAYERS.find(p => p.id === d.target) : null;
                  const typeColors = {
                    lie: 'border-red-800/40 bg-red-950/20 text-red-300',
                    manipulation: 'border-orange-800/40 bg-orange-950/20 text-orange-300',
                    backstab: 'border-purple-800/40 bg-purple-950/20 text-purple-300',
                    betrayal: 'border-pink-800/40 bg-pink-950/20 text-pink-300',
                    performance: 'border-amber-800/40 bg-amber-950/20 text-amber-300',
                    deflection: 'border-yellow-800/40 bg-yellow-950/20 text-yellow-300',
                    'suspicious-move': 'border-orange-800/40 bg-orange-950/20 text-orange-300',
                    'social-play': 'border-cyan-800/40 bg-cyan-950/20 text-cyan-300',
                    accusation: 'border-red-800/40 bg-red-950/20 text-red-300',
                    exposure: 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300',
                  };
                  return (
                    <div key={i} className={`rounded-lg border p-2.5 ${typeColors[d.type] || 'border-stone-700/30 bg-stone-900/40 text-stone-300'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Ep {d.episode}</span>
                          <span className="text-xs font-semibold">{player?.name || d.player}</span>
                          {target && (
                            <>
                              <ChevronRight size={10} className="opacity-40" />
                              <span className="text-xs opacity-70">{target.name || d.target}</span>
                            </>
                          )}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/20">{d.type}</span>
                      </div>
                      <p className="text-[11px] opacity-80">{d.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alliances' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider">Alliances & Partnerships</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibleAlliances.map((alliance, i) => {
                const isActive = !alliance.dissolvedEpisode || alliance.dissolvedEpisode > maxEpisode;
                const typeColors = {
                  traitor: 'border-red-800/40 bg-red-950/20',
                  social: 'border-blue-800/40 bg-blue-950/20',
                  strategic: 'border-purple-800/40 bg-purple-950/20',
                  endgame: 'border-amber-800/40 bg-amber-950/20',
                };
                const typeBadges = {
                  traitor: 'bg-red-600/60 text-red-200',
                  social: 'bg-blue-600/60 text-blue-200',
                  strategic: 'bg-purple-600/60 text-purple-200',
                  endgame: 'bg-amber-600/60 text-amber-200',
                };
                return (
                  <div key={i} className={`rounded-xl border p-4 ${typeColors[alliance.type]} ${!isActive ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-stone-200">{alliance.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeBadges[alliance.type]}`}>
                          {alliance.type}
                        </span>
                        {isActive ? (
                          <span className="text-[9px] font-bold text-emerald-400 uppercase">Active</span>
                        ) : (
                          <span className="text-[9px] font-bold text-stone-500 uppercase">Dissolved Ep {alliance.dissolvedEpisode}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {alliance.members.map(memberId => {
                        const member = PLAYERS.find(p => p.id === memberId);
                        if (!member || member.enteredEpisode > maxEpisode) return null;
                        const isOut = member.eliminatedEpisode && member.eliminatedEpisode <= maxEpisode;
                        return (
                          <span
                            key={memberId}
                            className={`text-[11px] px-2 py-0.5 rounded-full border ${isOut ? 'border-stone-700/30 bg-stone-800/30 text-stone-500 line-through' : 'border-stone-600/30 bg-stone-800/50 text-stone-300'}`}
                          >
                            {member.name.split(' ')[0]}
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-stone-500 mt-2">Formed Episode {alliance.formedEpisode}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <PlayerDetail
          player={selectedPlayer}
          maxEpisode={maxEpisode}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

function QuickStat({ icon, label, value, color }) {
  return (
    <div className="bg-stone-900/50 border border-stone-800/40 rounded-lg px-3 py-2">
      <div className={`flex items-center gap-1.5 ${color} mb-0.5`}>
        {icon}
        <span className="text-lg font-bold">{value}</span>
      </div>
      <span className="text-[10px] text-stone-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}
