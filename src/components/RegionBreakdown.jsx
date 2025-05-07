
import React from 'react';

const RegionBar = ({ region, value, total, color }) => {
  const percentage = (value / total) * 100;
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small mb-1">
        <span className="fw-medium">{region}</span>
        <span>{value}</span>
      </div>
      <div className="bg-light rounded overflow-hidden" style={{ height: '8px' }}>
        <div 
          className="rounded h-100 transition-all"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
            transition: 'width 0.5s ease-out'
          }}
        ></div>
      </div>
    </div>
  );
};

const RegionBreakdown = ({ data, title, total }) => {
  // Colors for different regions
  const colors = {
    NA: "#3B82F6", // Blue
    EMEA: "#10B981", // Green
    APAC: "#F59E0B", // Yellow
    LATAM: "#EF4444" // Red
  };

  return (
    <div className="card shadow h-100">
      <div className="card-body">
        <h6 className="mb-3 text-muted small fw-medium">{title}</h6>
        {Object.keys(data).map(region => (
          <RegionBar 
            key={region}
            region={region} 
            value={data[region]} 
            total={total} 
            color={colors[region]}
          />
        ))}
      </div>
    </div>
  );
};

export default RegionBreakdown;
