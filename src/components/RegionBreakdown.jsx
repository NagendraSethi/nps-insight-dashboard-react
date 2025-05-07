
import React, { useState, useEffect } from 'react';

const RegionBar = ({ region, value, total, color }) => {
  const [percentage, setPercentage] = useState(0);
  const [currentColor, setCurrentColor] = useState(color);
  
  // Generate a slightly different shade of the original color
  const getShiftedColor = (baseColor) => {
    // Simple color shifting - could be improved with proper HSL conversion
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);
    
    // Shift the color slightly
    const shiftedR = Math.min(255, Math.max(0, r + Math.floor(Math.random() * 40) - 20));
    const shiftedG = Math.min(255, Math.max(0, g + Math.floor(Math.random() * 40) - 20));
    const shiftedB = Math.min(255, Math.max(0, b + Math.floor(Math.random() * 40) - 20));
    
    return `#${shiftedR.toString(16).padStart(2, '0')}${shiftedG.toString(16).padStart(2, '0')}${shiftedB.toString(16).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Delay the animation slightly for a staggered effect
    const timer = setTimeout(() => {
      setPercentage((value / total) * 100);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value, total]);
  
  // Color shifting effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(getShiftedColor(color));
    }, 4000); // Shift color every 4 seconds
    
    return () => clearInterval(interval);
  }, [color]);

  return (
    <div className="mb-3 fade-in">
      <div className="d-flex justify-content-between small mb-1">
        <span className="fw-medium">{region}</span>
        <span>{value}</span>
      </div>
      <div className="bg-light rounded overflow-hidden" style={{ height: '8px' }}>
        <div 
          className="rounded h-100 region-bar-animate color-transition"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: currentColor,
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
