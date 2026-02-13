import React from 'react';

export default function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-gray-200 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-[11px] text-gray-400">
          <span style={{ color: entry.color }} className="font-medium">{entry.name}:</span>{' '}
          {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          {entry.unit || ''}
        </p>
      ))}
    </div>
  );
}
