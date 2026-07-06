import React from 'react';
import { AlertTriangle, CheckCircle, Info, Star } from 'lucide-react';

const styles = {
  info: { shell: 'border-sky-700/50 bg-sky-950/40', icon: 'text-sky-300', Icon: Info },
  warning: { shell: 'border-amber-700/50 bg-amber-950/40', icon: 'text-amber-300', Icon: AlertTriangle },
  recommendation: { shell: 'border-emerald-700/50 bg-emerald-950/40', icon: 'text-emerald-300', Icon: CheckCircle },
  highlight: { shell: 'border-fuchsia-700/50 bg-fuchsia-950/35', icon: 'text-fuchsia-300', Icon: Star },
};

export default function InsightCallout({ variant = 'info', title, children }) {
  const style = styles[variant] || styles.info;
  const Icon = style.Icon;

  return (
    <div className={`rounded-lg border ${style.shell} p-4`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 ${style.icon}`} />
        <div>
          {title && <p className="mb-1 text-sm font-semibold text-white">{title}</p>}
          <div className="text-sm leading-6 text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
}
