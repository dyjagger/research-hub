import React from 'react';

const VARIANTS = {
  insight: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', icon: '💡', label: 'INSIGHT' },
  story: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: '📖', label: 'THE STORY' },
  technical: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: '⚙️', label: 'TECHNICAL' },
  highlight: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '⭐', label: 'HIGHLIGHT' },
  security: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: '🔒', label: 'SECURITY' },
};

export default function InsightCallout({ variant = 'insight', title, children }) {
  const v = VARIANTS[variant] || VARIANTS.insight;
  return (
    <div className={`${v.bg} border ${v.border} rounded-xl p-5 my-6`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{v.icon}</span>
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{title || v.label}</span>
      </div>
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}
