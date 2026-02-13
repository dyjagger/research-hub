import React from 'react';
import { Info, AlertTriangle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const variants = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: Info },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: AlertTriangle },
  recommendation: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: CheckCircle },
  critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: AlertCircle },
  highlight: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', icon: Sparkles },
};

export default function InsightCallout({ variant = 'info', title, children }) {
  const v = variants[variant] || variants.info;
  const Icon = v.icon;
  return (
    <div className={`${v.bg} ${v.border} border rounded-xl p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${v.text} mt-0.5 flex-shrink-0`} />
        <div>
          {title && <p className={`font-semibold ${v.text} mb-1`}>{title}</p>}
          <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
