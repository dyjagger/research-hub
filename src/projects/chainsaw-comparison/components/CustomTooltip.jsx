import React from 'react';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      {label && <p className="text-gray-400 text-sm mb-1 font-medium">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color || '#e5e7eb' }}>
          <span className="font-medium">{entry.name}:</span>{' '}
          {formatter ? formatter(entry.value, entry.name) : entry.value}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
