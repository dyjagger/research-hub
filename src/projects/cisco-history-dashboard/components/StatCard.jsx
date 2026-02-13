import React from 'react';

export default function StatCard({ icon: Icon, label, value, subtext, color = '#049fd9' }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-5 h-5" style={{ color }} />}
        <span className="text-slate-400 text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subtext && <p className="text-slate-500 text-xs mt-1">{subtext}</p>}
    </div>
  );
}
