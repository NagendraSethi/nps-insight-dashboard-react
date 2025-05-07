
import React, { useState, useEffect } from 'react';

const RegionBar = ({ region, value, total, color }) => {
  const [percentage, setPercentage] = useState(0);
  
  useEffect(() => {
    // Delay the animation slightly for a staggered effect
    const timer = setTimeout(() => {
      setPercentage((value / total) * 100);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value, total]);

  return (
    <div className="mb-3 fade-in">
      <div className="d-flex justify-content-between small mb-1">
        <span className="fw-medium">{region}</span>
        <span>{value}</span>
      </div>
      <div className="bg-light rounded overflow-hidden" style={{ height: '8px' }}>
        <div 
          className="rounded h-100 region-bar-animate"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
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
    <div className="card shadow h-100 card-animate">
      <div className="card-body">
        <h6 className="mb-3 text-muted small fw-medium fade-in">{title}</h6>
        <div className="staggered-fade-in">
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
    </div>
  );
};

export default RegionBreakdown;
