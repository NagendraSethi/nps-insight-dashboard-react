
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

const StackedBar = ({ promoters, passives, detractors, total, delay }) => {
  const [animatedPromoters, setAnimatedPromoters] = useState(0);
  const [animatedPassives, setAnimatedPassives] = useState(0);
  const [animatedDetractors, setAnimatedDetractors] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPromoters((promoters / total) * 100);
      setAnimatedPassives((passives / total) * 100);
      setAnimatedDetractors((detractors / total) * 100);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [promoters, passives, detractors, total, delay]);
  
  return (
    <div className="progress" style={{ height: '10px', borderRadius: '5px' }}>
      <div 
        className="progress-bar bg-success" 
        style={{ width: `${animatedPromoters}%`, transition: 'width 1s ease-out' }}
      ></div>
      <div 
        className="progress-bar bg-warning" 
        style={{ width: `${animatedPassives}%`, transition: 'width 1s ease-out' }}
      ></div>
      <div 
        className="progress-bar bg-danger" 
        style={{ width: `${animatedDetractors}%`, transition: 'width 1s ease-out' }}
      ></div>
    </div>
  );
};

const StackedBarChart = ({ data, title }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className={`card shadow h-100 ${expanded ? 'expanded-card' : ''} card-animate`}
         style={expanded ? {position: 'fixed', top: '10%', left: '5%', right: '5%', bottom: '10%', zIndex: 1050, maxWidth: '90%', maxHeight: '80vh'} : {}}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center fade-in">
            <h5 className="card-title fs-6 fw-medium text-dark mb-0">{title}</h5>
            <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-secondary ms-2" />
          </div>
          <FontAwesomeIcon 
            icon={expanded ? faCompress : faExpand} 
            size="sm" 
            className="text-secondary cursor-pointer fade-in" 
            onClick={handleExpandClick}
          />
        </div>
        
        <div className="chart-scroll-container" style={expanded ? {maxHeight: 'calc(100% - 120px)', overflowY: 'auto'} : {maxHeight: '300px', overflowY: 'auto'}}>
          {data.map((item, index) => {
            const total = item.promoters + item.passives + item.detractors;
            const npsScore = ((item.promoters - item.detractors) / total * 100).toFixed(1);
            return (
              <div key={index} className="mb-4 fade-in" style={{animationDelay: `${index * 0.1}s`}}>
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
                  delay={300 + (index * 100)}
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
        
        <div className="d-flex justify-content-center mt-4 gap-4 staggered-fade-in">
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
