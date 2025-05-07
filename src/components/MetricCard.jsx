
import React, { useState, useEffect } from 'react';
import MetaInfoHoverCard from './MetaInfoHoverCard';

const MetricCard = ({ title, value, subtitle, color = "#0f1b35", metaInfo }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Parse the value to a number if it's not already
    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    const targetValue = isNaN(numericValue) ? 0 : numericValue;
    
    // If it's not a number we can animate (like NPS score with decimal), just set it directly
    if (isNaN(targetValue) || targetValue.toString().includes('.')) {
      setDisplayValue(value);
      setAnimationComplete(true);
      return;
    }
    
    // For numeric values, animate the counting
    let start = 0;
    const duration = 1000; // ms
    const interval = 20; // ms
    const increment = (targetValue / (duration / interval));
    let timer;
    
    const updateCounter = () => {
      start += increment;
      setDisplayValue(Math.floor(start));
      
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
        setAnimationComplete(true);
      }
    };
    
    timer = setInterval(updateCounter, interval);
    
    return () => clearInterval(timer);
  }, [value]);

  const cardTitle = metaInfo ? (
    <MetaInfoHoverCard 
      title={metaInfo.title || title} 
      description={metaInfo.description || ""}
    >
      {title}
    </MetaInfoHoverCard>
  ) : (
    title
  );

  return (
    <div className="card h-100 shadow metric-card-hover card-animate">
      <div className="card-body d-flex flex-column" style={{ backgroundColor: color }}>
        <div className="text-light fw-medium small fade-in">{cardTitle}</div>
        <div className={`fs-1 fw-bold text-white mt-2 ${animationComplete ? 'animate-count' : ''}`}>
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        {subtitle && <div className="text-light small mt-1 fade-in">{subtitle}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
