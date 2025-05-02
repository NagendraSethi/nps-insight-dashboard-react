
import React from 'react';

const MetricCard = ({ title, value, subtitle, color = "#0f1b35" }) => {
  return (
    <div className="card h-100 shadow">
      <div className="card-body d-flex flex-column" style={{ backgroundColor: color }}>
        <div className="text-light fw-medium small">{title}</div>
        <div className="fs-1 fw-bold text-white mt-2">{value}</div>
        {subtitle && <div className="text-light small mt-1">{subtitle}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
