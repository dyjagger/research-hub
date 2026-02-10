import React from 'react';

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-gray-300 font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-400">{entry.name}:</span>
          <span className="text-white font-medium">
            {typeof entry.value === 'number'
              ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 1 })
              : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}
