
import React, { useState, useEffect } from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import MetaInfoHoverCard from './MetaInfoHoverCard';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border shadow-lg rounded animate-fade-in">
        <p className="fw-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChart = ({ data, title, infoText, metaInfo }) => {
  const [animatedData, setAnimatedData] = useState([]);
  
  // Animate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [data]);

  const cardTitle = (
    <div className="d-flex align-items-center mb-3">
      <h5 className="card-title fs-6 fw-medium text-dark fade-in mb-0">
        {metaInfo ? (
          <MetaInfoHoverCard
            title={metaInfo.title || title}
            description={metaInfo.description || infoText}
          >
            {title}
          </MetaInfoHoverCard>
        ) : (
          <>
            {title}
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              size="sm" 
              className="text-secondary ms-2 cursor-help fade-in" 
              title={infoText} 
            />
          </>
        )}
      </h5>
    </div>
  );

  return (
    <div className="card shadow h-100 card-animate">
      <div className="card-body">
        {cardTitle}
        <div style={{ height: 250 }} className="fade-in">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart 
              data={animatedData} 
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barSize={40}
              animationDuration={1000}
              animationEasing="ease-out"
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
                animationBegin={100}
                animationDuration={1500}
                isAnimationActive={true}
              />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
