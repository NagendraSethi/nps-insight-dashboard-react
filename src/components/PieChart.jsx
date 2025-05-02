
import React from 'react';
import { PieChart as ReChartPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow rounded">
        <p className="fw-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PieChart = ({ data, title, infoText, colors }) => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

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
        <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
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
                <tspan x="50%" dy="-5" className="fs-4 fw-bold">{totalCount}</tspan>
                <tspan x="50%" dy="20" className="small text-secondary">Total</tspan>
              </text>
              <Tooltip content={<CustomTooltip />} />
            </ReChartPie>
          </ResponsiveContainer>
        </div>

        <div className="d-flex flex-wrap justify-content-center mt-2 gap-2">
          {data.map((entry, index) => (
            <div key={index} className="d-flex align-items-center mx-2 my-1">
              <div 
                style={{ backgroundColor: colors[index % colors.length] }} 
                className="me-2 rounded-1"
                style={{ width: '12px', height: '12px', backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="small">{entry.name} <span className="text-secondary fw-medium">({Math.round((entry.value / totalCount) * 100)}%)</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
