import React from 'react';

export default function StatCard({ label, value, sub, icon: Icon, color = 'cyan' }) {
  const colors = {
    cyan: 'text-cyan-400 bg-cyan-500/10',
    red: 'text-red-400 bg-red-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    green: 'text-emerald-400 bg-emerald-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
  };
  const c = colors[color] || colors.cyan;
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className={`p-2 rounded-lg ${c}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}
