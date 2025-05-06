
import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow-lg rounded">
        <p className="fw-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChart = ({ data, title, infoText }) => {
  return (
    <div className="card shadow h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <h5 className="card-title fs-6 fw-medium text-dark">{title}</h5>
          <FontAwesomeIcon 
            icon={faInfoCircle} 
            size="sm" 
            className="text-secondary ms-2 cursor-help" 
            title={infoText} 
          />
        </div>
        <div style={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart 
              data={data} 
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.3 }} />
              <Bar 
                dataKey="value" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]}
              />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
