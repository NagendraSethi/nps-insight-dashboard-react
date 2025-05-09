import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import SelectAsyncPaginate from './selectPaginate';

const PageFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    geo: "All Geos",
    time: "Last 12 Months",
    tower: "All Towers"
  });
  
  const geoOptions = [
    { value: "All Geos", label: "All Geos" },
    { value: "NA", label: "North America" },
    { value: "EMEA", label: "Europe, Middle East & Africa" },
    { value: "APAC", label: "Asia Pacific" },
    { value: "LATAM", label: "Latin America" }
  ];
  
  const timeOptions = [
    { value: "Last 12 Months", label: "Last 12 Months" },
    { value: "Last 6 Months", label: "Last 6 Months" },
    { value: "Last 3 Months", label: "Last 3 Months" },
    { value: "Current Month", label: "Current Month" }
  ];
  
  const towerOptions = [
    { value: "All Towers", label: "All Towers" },
    { value: "Security", label: "Security" },
    { value: "Network", label: "Network" },
    { value: "Data Center", label: "Data Center" },
    { value: "Service Desk", label: "Service Desk" },
    { value: "Field Services", label: "Field Services" }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-column flex-md-row gap-3 mb-3">
            <div className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-secondary" />
              <div className="fw-medium text-dark">Filters</div>
            </div>
            
            <div className="d-flex flex-wrap gap-2">
              <div>
                <select 
                  className="form-select" 
                  value={filters.geo}
                  onChange={(e) => handleFilterChange('geo', e.target.value)}
                >
                  {geoOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select 
                  className="form-select" 
                  value={filters.time}
                  onChange={(e) => handleFilterChange('time', e.target.value)}
                >
                  {timeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select 
                  className="form-select" 
                  value={filters.tower}
                  onChange={(e) => handleFilterChange('tower', e.target.value)}
                >
                  {towerOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div
            className="d-flex align-items-center text-danger cursor-pointer"
            role="button"
            tabIndex="0"
            onClick={() => {
              const resetFilters = {
                geo: "All Geos",
                time: "Last 12 Months",
                tower: "All Towers"
              };
              setFilters(resetFilters);
              onFilterChange(resetFilters);
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="sm" className="me-1" />
            <span className="small">Reset filters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFilter;
