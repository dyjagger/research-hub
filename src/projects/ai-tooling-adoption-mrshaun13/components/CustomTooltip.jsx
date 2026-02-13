import React from 'react';

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-gray-300 font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || entry.fill }} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color || entry.fill }} />
          <span className="text-gray-400">{entry.name}:</span>
          <span className="font-semibold">{typeof entry.value === 'number' && entry.value > 1000 ? `${(entry.value / 1000).toFixed(1)}K` : entry.value}{entry.unit || ''}</span>
        </p>
      ))}
    </div>
  );
}
