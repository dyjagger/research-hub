import React from 'react';

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 shadow-xl text-sm">
      {label && <p className="text-gray-300 font-medium mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || '#e5e7eb' }} className="text-xs">
          <span className="font-medium">{entry.name}:</span>{' '}
          {formatter ? formatter(entry.value, entry.name) : entry.value}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
