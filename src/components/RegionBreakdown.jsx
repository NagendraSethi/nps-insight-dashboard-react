
import React from 'react';

const RegionBar = ({ region, value, total, color }) => {
  const percentage = (value / total) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium">{region}</span>
        <span>{value}</span>
      </div>
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
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
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h4 className="mb-3 text-gray-500 text-xs font-medium">{title}</h4>
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
  );
};

export default RegionBreakdown;
