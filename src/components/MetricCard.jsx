
import React from 'react';

const MetricCard = ({ title, value, subtitle, color = "#0f1b35" }) => {
  return (
    <div className="nps-summary-card" style={{ backgroundColor: color }}>
      <div className="mb-6">
        <div className="text-sm text-gray-300">{title}</div>
        <div className="text-4xl font-bold">{value}</div>
        {subtitle && <div className="text-sm text-gray-300">{subtitle}</div>}
      </div>
      <div className="vertical-divider"></div>
    </div>
  );
};

export default MetricCard;
