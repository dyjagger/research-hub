import React from 'react';
import { Lightbulb } from 'lucide-react';

const COLORS = {
  amber: 'bg-amber-500/5 border-amber-500/20 text-amber-300',
  emerald: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300',
  rose: 'bg-rose-500/5 border-rose-500/20 text-rose-300',
  violet: 'bg-violet-500/5 border-violet-500/20 text-violet-300',
  cyan: 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300',
  blue: 'bg-blue-500/5 border-blue-500/20 text-blue-300',
};

export default function InsightCallout({ children, color = 'amber' }) {
  const c = COLORS[color] || COLORS.amber;
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${c}`}>
      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-70" />
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );
}
