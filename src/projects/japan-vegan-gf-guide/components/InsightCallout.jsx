import React from 'react';
import { Lightbulb } from 'lucide-react';

const colorMap = {
  green: 'border-green-500/40 bg-green-500/10 text-green-300',
  blue: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
  purple: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
  amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  red: 'border-red-500/40 bg-red-500/10 text-red-300',
  cyan: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
};

const InsightCallout = ({ children, color = 'green', title = 'Key Insight' }) => {
  const classes = colorMap[color] || colorMap.green;
  return (
    <div className={`border-l-4 rounded-r-lg px-5 py-4 my-4 ${classes}`}>
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb size={16} className="opacity-80" />
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{title}</span>
      </div>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
};

export default InsightCallout;
