import React from 'react';

export default function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      {label && <p className="text-xs text-gray-400 mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color || '#e5e7eb' }}>
          <span className="font-medium">{entry.name}: </span>
          {formatter ? formatter(entry.value, entry.name) : (typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value)}
        </p>
      ))}
    </div>
  );
}
