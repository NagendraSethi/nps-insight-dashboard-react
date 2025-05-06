
import React, { useState } from 'react';
import { BarChart as RechartsBC, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ZoomControls from './ZoomControls';

const BarChart = ({ data, title, infoText, layout = 'vertical', colors = ['#8884d8'] }) => {
  const [scale, setScale] = useState(1);
  
  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };
  
  const baseHeight = 300;
  const height = baseHeight * scale;

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
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBC data={data} layout={layout} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={layout === 'vertical' ? null : 'name'} type={layout === 'vertical' ? 'number' : 'category'} />
              <YAxis dataKey={layout === 'vertical' ? 'name' : null} type={layout === 'vertical' ? 'category' : 'number'} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={colors[0]} label={layout === 'vertical' ? { position: 'right' } : { position: 'top' }} />
            </RechartsBC>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
