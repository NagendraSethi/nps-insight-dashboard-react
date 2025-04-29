
import React from 'react';
import { PieChart as ReChartPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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

const PieChart = ({ data, title, infoText, colors }) => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="nps-card card-hover-effect">
      <div className="card-title">
        {title}
        <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500 cursor-help" title={infoText} />
      </div>
      <div className="flex items-center justify-center" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReChartPie data={data}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={55}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke="white"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-5" className="text-xl font-bold fill-gray-800">{totalCount}</tspan>
              <tspan x="50%" dy="20" className="text-xs fill-gray-500">Total</tspan>
            </text>
            <Tooltip content={<CustomTooltip />} />
          </ReChartPie>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center mt-2 gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div 
              style={{ backgroundColor: colors[index % colors.length] }} 
              className="w-3 h-3 mr-2 rounded-sm"
            ></div>
            <span className="text-sm">{entry.name} <span className="text-gray-500 font-medium">({Math.round((entry.value / totalCount) * 100)}%)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
