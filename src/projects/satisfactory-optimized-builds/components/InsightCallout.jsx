import React from 'react';
import { Lightbulb } from 'lucide-react';

const COLORS = {
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  rose: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
  violet: 'bg-violet-500/10 border-violet-500/30 text-violet-300',
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
};

export default function InsightCallout({ children, color = 'amber' }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${COLORS[color] || COLORS.amber}`}>
      <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
