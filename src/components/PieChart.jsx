
import React from 'react';
import { PieChart as ReChartPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-lg rounded">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PieChart = ({ data, title, infoText, colors }) => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="nps-card h-full">
      <div className="card-title">
        {title}
        <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500" />
      </div>
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReChartPie data={data} innerRadius={70} outerRadius={100}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={70}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-10" className="text-2xl font-bold">{totalCount}</tspan>
            </text>
            <Tooltip content={<CustomTooltip />} />
          </ReChartPie>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div style={{ backgroundColor: colors[index % colors.length] }} className="w-3 h-3 mr-2"></div>
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
