
import React from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow-lg rounded">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChart = ({ data, title, infoText }) => {
  return (
    <div className="nps-card h-full card-hover-effect">
      <div className="card-title">
        {title}
        <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500 cursor-help" title={infoText} />
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
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
  );
};

export default BarChart;
