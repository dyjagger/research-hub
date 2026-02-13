import React from 'react';
import { Lightbulb } from 'lucide-react';

const colorMap = {
  blue: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
  amber: 'border-amber-500/30 bg-amber-500/5 text-amber-300',
  red: 'border-red-500/30 bg-red-500/5 text-red-300',
  green: 'border-green-500/30 bg-green-500/5 text-green-300',
  purple: 'border-purple-500/30 bg-purple-500/5 text-purple-300',
  pink: 'border-pink-500/30 bg-pink-500/5 text-pink-300',
};

export default function InsightCallout({ children, color = 'amber', title = 'Key Insight' }) {
  return (
    <div className={`border rounded-lg p-4 my-4 ${colorMap[color] || colorMap.amber}`}>
      <div className="flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-70" />
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold opacity-60 mb-1">{title}</p>
          <p className="text-sm leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
