
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ZoomControls from './ZoomControls';

const StackedBarChart = ({ data, title }) => {
  const [scale, setScale] = useState(1);
  
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };
  
  const baseHeight = 300;
  const height = baseHeight * scale;
  
  // Generate random colors for the stacked bars
  const generateColors = (count) => {
    const colorSet = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return colorSet.slice(0, count);
  };

  // Extract keys for the stacked bars (excluding 'name')
  const keys = Object.keys(data[0]).filter(key => key !== 'name');
  const colors = generateColors(keys.length);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{title}</h5>
          <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </div>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {keys.map((key, index) => (
                <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;
