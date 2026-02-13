import React from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, Info, Star } from 'lucide-react';

const variants = {
  info: { bg: 'bg-blue-900/40', border: 'border-blue-500/50', icon: Info, iconColor: 'text-blue-400' },
  warning: { bg: 'bg-amber-900/40', border: 'border-amber-500/50', icon: AlertTriangle, iconColor: 'text-amber-400' },
  recommendation: { bg: 'bg-emerald-900/40', border: 'border-emerald-500/50', icon: TrendingUp, iconColor: 'text-emerald-400' },
  highlight: { bg: 'bg-purple-900/40', border: 'border-purple-500/50', icon: Star, iconColor: 'text-purple-400' },
  insight: { bg: 'bg-cyan-900/40', border: 'border-cyan-500/50', icon: Lightbulb, iconColor: 'text-cyan-400' },
};

export default function InsightCallout({ variant = 'insight', title, children }) {
  const v = variants[variant] || variants.insight;
  const Icon = v.icon;

  return (
    <div className={`${v.bg} ${v.border} border rounded-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`${v.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
        <div>
          {title && <p className={`${v.iconColor} font-semibold text-sm mb-1`}>{title}</p>}
          <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
