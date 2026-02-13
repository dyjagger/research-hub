import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { PLAYERS, PRIZE_POT, PLAYER_COUNT, MISSIONS, DECEPTIONS } from '../data/gameData';

const COLORS = ['#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="font-semibold text-stone-200 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === 'number' && p.value > 999 ? `$${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
};

export function PrizePotChart({ maxEpisode }) {
  const data = PRIZE_POT.filter(d => d.episode <= maxEpisode);
  return (
    <ChartCard title="Prize Pot Growth" subtitle="Cumulative prize money per episode">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="episode" tick={{ fill: '#78716c', fontSize: 11 }} tickFormatter={v => `Ep ${v}`} />
          <YAxis tick={{ fill: '#78716c', fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="amount" stroke="#f59e0b" fill="url(#potGrad)" strokeWidth={2} name="Prize Pot" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function PlayerCountChart({ maxEpisode }) {
  const data = PLAYER_COUNT.filter(d => d.episode <= maxEpisode);
  return (
    <ChartCard title="Player Count" subtitle="Faithfuls vs Traitors remaining">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="faithGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="traitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="episode" tick={{ fill: '#78716c', fontSize: 11 }} tickFormatter={v => `Ep ${v}`} />
          <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="faithfuls" stroke="#3b82f6" fill="url(#faithGrad)" strokeWidth={2} name="Faithfuls" />
          <Area type="monotone" dataKey="traitors" stroke="#ef4444" fill="url(#traitGrad)" strokeWidth={2} name="Traitors" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SocialGameRanking({ maxEpisode }) {
  const activePlayers = PLAYERS
    .filter(p => p.enteredEpisode <= maxEpisode)
    .sort((a, b) => b.socialGameScore - a.socialGameScore)
    .slice(0, 10);

  const data = activePlayers.map(p => ({
    name: p.name.split(' ')[0],
    score: p.socialGameScore,
    isTraitor: p.affiliation === 'traitor' && (p.eliminatedEpisode ? p.eliminatedEpisode <= maxEpisode : maxEpisode === 11),
    isEliminated: p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode,
  }));

  return (
    <ChartCard title="Social Game Rankings" subtitle="Top 10 players by social game score">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#78716c', fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#a8a29e', fontSize: 11 }} width={70} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" name="Social Score" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.isTraitor ? '#ef4444' : entry.isEliminated ? '#78716c' : '#f59e0b'} fillOpacity={entry.isEliminated ? 0.5 : 0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function DeceptionTracker({ maxEpisode }) {
  const visibleDeceptions = DECEPTIONS.filter(d => d.episode <= maxEpisode);
  const playerDeceptions = {};
  visibleDeceptions.forEach(d => {
    if (!playerDeceptions[d.player]) playerDeceptions[d.player] = { lies: 0, manipulations: 0, backstabs: 0, betrayals: 0 };
    if (d.type === 'lie' || d.type === 'performance') playerDeceptions[d.player].lies++;
    if (d.type === 'manipulation' || d.type === 'deflection') playerDeceptions[d.player].manipulations++;
    if (d.type === 'backstab') playerDeceptions[d.player].backstabs++;
    if (d.type === 'betrayal') playerDeceptions[d.player].betrayals++;
  });

  const data = Object.entries(playerDeceptions)
    .map(([id, counts]) => {
      const p = PLAYERS.find(pl => pl.id === id);
      return { name: p ? p.name.split(' ')[0] : id, ...counts, total: counts.lies + counts.manipulations + counts.backstabs + counts.betrayals };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);

  return (
    <ChartCard title="Deception Tracker" subtitle="Lies, manipulations, backstabs & betrayals">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: '#a8a29e', fontSize: 10 }} />
          <YAxis tick={{ fill: '#78716c', fontSize: 11 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="lies" stackId="a" fill="#ef4444" name="Lies" radius={[0, 0, 0, 0]} />
          <Bar dataKey="manipulations" stackId="a" fill="#f97316" name="Manipulations" />
          <Bar dataKey="backstabs" stackId="a" fill="#8b5cf6" name="Backstabs" />
          <Bar dataKey="betrayals" stackId="a" fill="#ec4899" name="Betrayals" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function MissionPerformance({ maxEpisode }) {
  const data = MISSIONS.filter(m => m.episode <= maxEpisode).map(m => ({
    name: `Ep ${m.episode}`,
    available: m.moneyAvailable,
    earned: m.moneyEarned,
    efficiency: m.moneyAvailable > 0 ? Math.round((m.moneyEarned / m.moneyAvailable) * 100) : 0,
  }));

  return (
    <ChartCard title="Mission Performance" subtitle="Money available vs earned per episode">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: '#a8a29e', fontSize: 10 }} />
          <YAxis tick={{ fill: '#78716c', fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="available" fill="#374151" name="Available" radius={[4, 4, 0, 0]} />
          <Bar dataKey="earned" fill="#10b981" name="Earned" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AffiliationPie({ maxEpisode }) {
  const eliminated = PLAYERS.filter(p => p.eliminatedEpisode && p.eliminatedEpisode <= maxEpisode);
  const faithfulsBanished = eliminated.filter(p => p.affiliation === 'faithful' && p.eliminationType === 'banished').length;
  const faithfulsMurdered = eliminated.filter(p => p.affiliation === 'faithful' && p.eliminationType === 'murdered').length;
  const traitorsBanished = eliminated.filter(p => p.affiliation === 'traitor' && p.eliminationType === 'banished').length;

  const data = [
    { name: 'Faithfuls Banished', value: faithfulsBanished, color: '#f97316' },
    { name: 'Faithfuls Murdered', value: faithfulsMurdered, color: '#ef4444' },
    { name: 'Traitors Banished', value: traitorsBanished, color: '#10b981' },
  ].filter(d => d.value > 0);

  return (
    <ChartCard title="Elimination Breakdown" subtitle="How players left the game">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span>{d.name}: {d.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function ShieldLeaderboard({ maxEpisode }) {
  const shieldCounts = {};
  PLAYERS.forEach(p => {
    if (p.enteredEpisode <= maxEpisode) {
      shieldCounts[p.id] = { name: p.name.split(' ')[0], shields: p.stats.shieldsWon };
    }
  });

  const data = Object.values(shieldCounts)
    .filter(d => d.shields > 0)
    .sort((a, b) => b.shields - a.shields)
    .slice(0, 8);

  return (
    <ChartCard title="Shield Leaderboard" subtitle="Most shields earned">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fill: '#78716c', fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#a8a29e', fontSize: 11 }} width={70} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="shields" fill="#06b6d4" name="Shields" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-stone-900/60 border border-stone-700/30 rounded-xl p-4">
      <div className="mb-3">
        <h4 className="text-sm font-bold text-stone-200">{title}</h4>
        {subtitle && <p className="text-[11px] text-stone-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
