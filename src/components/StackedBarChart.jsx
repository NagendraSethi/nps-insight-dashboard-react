
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const StackedBar = ({ promoters, passives, detractors, total }) => {
  const promoterPercent = (promoters / total) * 100;
  const passivePercent = (passives / total) * 100;
  const detractorPercent = (detractors / total) * 100;
  
  return (
    <div className="progress" style={{ height: '10px', borderRadius: '5px' }}>
      <div 
        className="progress-bar bg-success" 
        style={{ width: `${promoterPercent}%`, transition: 'width 0.5s ease-out' }}
      ></div>
      <div 
        className="progress-bar bg-warning" 
        style={{ width: `${passivePercent}%`, transition: 'width 0.5s ease-out' }}
      ></div>
      <div 
        className="progress-bar bg-danger" 
        style={{ width: `${detractorPercent}%`, transition: 'width 0.5s ease-out' }}
      ></div>
    </div>
  );
};

const StackedBarChart = ({ data, title }) => {
  return (
    <div className="card shadow h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <h5 className="card-title fs-6 fw-medium text-dark">{title}</h5>
          <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-secondary ms-2" />
        </div>
        
        <div className="mt-4">
          {data.map((item, index) => {
            const total = item.promoters + item.passives + item.detractors;
            const npsScore = ((item.promoters - item.detractors) / total * 100).toFixed(1);
            return (
              <div key={index} className="mb-4">
                <div className="d-flex justify-content-between small mb-1">
                  <span className="fw-medium">{item.department}</span>
                  <span className={`fw-medium ${parseFloat(npsScore) >= 0 ? 'text-success' : 'text-danger'}`}>
                    {npsScore}
                  </span>
                </div>
                <StackedBar 
                  promoters={item.promoters} 
                  passives={item.passives} 
                  detractors={item.detractors} 
                  total={total} 
                />
                <div className="d-flex justify-content-between small text-secondary mt-1">
                  <span>Promoters: {item.promoters}</span>
                  <span>Passives: {item.passives}</span>
                  <span>Detractors: {item.detractors}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="d-flex justify-content-center mt-4 gap-4">
          <div className="d-flex align-items-center">
            <div className="bg-success me-1 rounded-1" style={{ width: '12px', height: '12px' }}></div>
            <span className="small">Promoters</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="bg-warning me-1 rounded-1" style={{ width: '12px', height: '12px' }}></div>
            <span className="small">Passives</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="bg-danger me-1 rounded-1" style={{ width: '12px', height: '12px' }}></div>
            <span className="small">Detractors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;
