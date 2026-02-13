import React from 'react';
import { Lightbulb, AlertTriangle, Star, Info } from 'lucide-react';

const variants = {
  insight: { icon: Lightbulb, bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', iconColor: 'text-amber-400' },
  warning: { icon: AlertTriangle, bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', iconColor: 'text-red-400' },
  tip: { icon: Star, bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', iconColor: 'text-emerald-400' },
  info: { icon: Info, bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', iconColor: 'text-blue-400' },
};

export default function InsightCallout({ variant = 'insight', title, children }) {
  const v = variants[variant] || variants.insight;
  const Icon = v.icon;
  return (
    <div className={`${v.bg} ${v.border} border rounded-xl p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${v.iconColor} mt-0.5 flex-shrink-0`} />
        <div>
          {title && <p className={`font-semibold ${v.text} mb-1`}>{title}</p>}
          <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
