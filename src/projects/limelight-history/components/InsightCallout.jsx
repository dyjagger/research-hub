import React from 'react';
import { Info, AlertTriangle, Star, AlertCircle, Lightbulb } from 'lucide-react';

const variants = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', Icon: Info },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', Icon: AlertTriangle },
  recommendation: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', Icon: Star },
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', Icon: AlertCircle },
  highlight: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', Icon: Lightbulb },
};

export default function InsightCallout({ variant = 'info', title, children }) {
  const v = variants[variant] || variants.info;
  const { Icon } = v;
  return (
    <div className={`${v.bg} ${v.border} border rounded-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${v.text} flex-shrink-0 mt-0.5`} />
        <div>
          {title && <p className={`font-semibold ${v.text} mb-1`}>{title}</p>}
          <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
