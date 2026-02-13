import React from 'react';

export default function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      {label && <p className="text-xs text-gray-400 mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color || '#fff' }}>
          {entry.name}: {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}
