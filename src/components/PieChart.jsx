
import React, { useState } from 'react';
import { PieChart as RechartsPC, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ZoomControls from './ZoomControls';

const PieChart = ({ data, title, infoText, colors }) => {
  const [scale, setScale] = useState(1);
  
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };
  
  const baseSize = 300;
  const width = baseSize * scale;
  const height = baseSize * scale;
  
  const renderLabel = ({ name, value, percent }) => {
    return `${name}: ${value} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0 me-2">{title}</h5>
            {infoText && (
              <div className="cursor-help" title={infoText}>
                <FontAwesomeIcon icon={faInfoCircle} className="text-muted" />
              </div>
            )}
          </div>
          <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>
        <div className="d-flex justify-content-center">
          <RechartsPC width={width} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderLabel}
              outerRadius={width * 0.3}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </RechartsPC>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
