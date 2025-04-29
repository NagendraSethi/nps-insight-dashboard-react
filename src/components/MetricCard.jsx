
import React from 'react';

const MetricCard = ({ title, value, subtitle, color = "#0f1b35" }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-6 flex flex-col h-full" style={{ backgroundColor: color }}>
        <div className="text-sm text-gray-200 font-medium">{title}</div>
        <div className="text-4xl font-bold text-white mt-2">{value}</div>
        {subtitle && <div className="text-sm text-gray-200 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
