import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightCallout({ children, color = '#f43f5e' }) {
  return (
    <div
      className="rounded-lg px-4 py-3 my-4 flex items-start gap-3"
      style={{ backgroundColor: `${color}15`, borderLeft: `3px solid ${color}` }}
    >
      <Lightbulb size={16} className="mt-0.5 shrink-0" style={{ color }} />
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  );
}
