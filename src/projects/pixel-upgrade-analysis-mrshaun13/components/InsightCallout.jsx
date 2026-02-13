import React from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, DollarSign, Zap } from 'lucide-react';

const VARIANTS = {
  insight: { icon: Lightbulb, bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', iconColor: 'text-blue-400' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', iconColor: 'text-amber-400' },
  positive: { icon: TrendingUp, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', iconColor: 'text-emerald-400' },
  cost: { icon: DollarSign, bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', iconColor: 'text-violet-400' },
  verdict: { icon: Zap, bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', iconColor: 'text-rose-400' },
};

export default function InsightCallout({ variant = 'insight', title, children }) {
  const v = VARIANTS[variant] || VARIANTS.insight;
  const Icon = v.icon;
  return (
    <div className={`${v.bg} border ${v.border} rounded-xl p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${v.iconColor} flex-shrink-0 mt-0.5`} />
        <div>
          {title && <h4 className={`text-sm font-semibold ${v.text} mb-1`}>{title}</h4>}
          <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
