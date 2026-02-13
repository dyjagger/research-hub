import React from 'react';

const VARIANTS = {
  fun: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: '🎉', text: 'text-purple-300' },
  wow: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '🤯', text: 'text-amber-300' },
  cool: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: '❄️', text: 'text-cyan-300' },
  hot: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🔥', text: 'text-red-300' },
  joke: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: '😂', text: 'text-emerald-300' },
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: '💡', text: 'text-blue-300' },
};

export default function InsightCallout({ children, variant = 'fun', className = '' }) {
  const v = VARIANTS[variant] || VARIANTS.fun;
  return (
    <div className={`rounded-xl border ${v.bg} ${v.border} px-4 py-3 ${className}`}>
      <div className={`flex items-start gap-2.5 ${v.text} text-sm leading-relaxed`}>
        <span className="text-lg flex-shrink-0 mt-0.5">{v.icon}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
