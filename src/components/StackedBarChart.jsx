
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const StackedBar = ({ promoters, passives, detractors, total }) => {
  const promoterPercent = (promoters / total) * 100;
  const passivePercent = (passives / total) * 100;
  const detractorPercent = (detractors / total) * 100;
  
  return (
    <div className="progress-bar">
      <div className="progress-segment promoter" style={{ width: `${promoterPercent}%` }}></div>
      <div className="progress-segment passive" style={{ width: `${passivePercent}%` }}></div>
      <div className="progress-segment detractor" style={{ width: `${detractorPercent}%` }}></div>
    </div>
  );
};

const StackedBarChart = ({ data, title }) => {
  return (
    <div className="nps-card h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="card-title">
          {title}
          <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500" />
        </div>
      </div>
      
      <div className="mt-4">
        {data.map((item, index) => {
          const total = item.promoters + item.passives + item.detractors;
          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.department}</span>
              </div>
              <StackedBar 
                promoters={item.promoters} 
                passives={item.passives} 
                detractors={item.detractors} 
                total={total} 
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-6 gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 mr-1 promoter"></div>
          <span className="text-xs">Promoters</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-1 passive"></div>
          <span className="text-xs">Passives</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-1 detractor"></div>
          <span className="text-xs">Detractors</span>
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;
