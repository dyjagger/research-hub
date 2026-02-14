import React from 'react';

export default function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl text-xs">
      {label && <p className="text-gray-400 mb-1.5 font-medium">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-400">{entry.name}:</span>
          <span className="text-white font-semibold">
            {formatter ? formatter(entry.value, entry.name) : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
}
