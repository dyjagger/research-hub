import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-gray-300 text-sm font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color || entry.fill }}>
          <span className="font-medium">{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
