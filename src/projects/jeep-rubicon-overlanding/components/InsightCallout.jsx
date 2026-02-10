import React from 'react';
import { Info, AlertTriangle, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const variants = {
  info: { bg: 'bg-blue-950/50', border: 'border-blue-500/30', icon: Info, iconColor: 'text-blue-400', titleColor: 'text-blue-300' },
  warning: { bg: 'bg-amber-950/50', border: 'border-amber-500/30', icon: AlertTriangle, iconColor: 'text-amber-400', titleColor: 'text-amber-300' },
  recommendation: { bg: 'bg-emerald-950/50', border: 'border-emerald-500/30', icon: CheckCircle, iconColor: 'text-emerald-400', titleColor: 'text-emerald-300' },
  critical: { bg: 'bg-red-950/50', border: 'border-red-500/30', icon: AlertCircle, iconColor: 'text-red-400', titleColor: 'text-red-300' },
  highlight: { bg: 'bg-purple-950/50', border: 'border-purple-500/30', icon: Sparkles, iconColor: 'text-purple-400', titleColor: 'text-purple-300' },
};

const InsightCallout = ({ variant = 'info', title, children }) => {
  const v = variants[variant] || variants.info;
  const Icon = v.icon;
  return (
    <div className={`${v.bg} ${v.border} border rounded-xl p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`${v.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
        <div>
          {title && <p className={`${v.titleColor} font-semibold text-sm mb-1`}>{title}</p>}
          <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InsightCallout;
