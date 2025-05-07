
import React, { useState, useEffect } from 'react';

const MetricCard = ({ title, value, subtitle, color = "#0f1b35" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  
  // Colors to cycle through
  const colors = [
    "#0f1b35", // original dark blue
    "#3B82F6", // blue
    "#10B981", // green
    "#F59E0B", // yellow
    "#EF4444", // red
    "#8B5CF6"  // purple
  ];
  
  // Color cycling animation effect
  useEffect(() => {
    // Skip color cycling if a specific color was provided
    if (color !== "#0f1b35") {
      setCurrentColor(color);
      return;
    }
    
    const colorIndex = colors.findIndex(c => c === currentColor);
    
    const interval = setInterval(() => {
      // Go to next color, or back to first if at the end
      const nextIndex = (colorIndex + 1) % colors.length;
      setCurrentColor(colors[nextIndex]);
    }, 5000); // Change color every 5 seconds
    
    return () => clearInterval(interval);
  }, [currentColor, color]);
  
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

  return (
    <div className="card h-100 shadow metric-card-hover card-animate">
      <div 
        className="card-body d-flex flex-column color-transition" 
        style={{ backgroundColor: currentColor }}
      >
        <div className="text-light fw-medium small fade-in">{title}</div>
        <div className={`fs-1 fw-bold text-white mt-2 ${animationComplete ? 'animate-count' : ''}`}>
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </div>
        {subtitle && <div className="text-light small mt-1 fade-in">{subtitle}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
