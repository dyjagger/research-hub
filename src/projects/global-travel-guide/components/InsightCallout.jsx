import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightCallout({ color = '#06b6d4', children }) {
  return (
    <div
      className="rounded-xl border px-5 py-4 my-4 flex items-start gap-3"
      style={{ borderColor: `${color}33`, backgroundColor: `${color}0d` }}
    >
      <Lightbulb size={18} className="mt-0.5 shrink-0" style={{ color }} />
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  );
}
