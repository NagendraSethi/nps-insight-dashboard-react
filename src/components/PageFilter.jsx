
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const FilterPill = ({ label, onRemove, value }) => (
  <div className="badge bg-light text-dark d-inline-flex align-items-center me-2 py-2 px-3">
    {label}
    <FontAwesomeIcon 
      icon={faTimes} 
      className="ms-2 small cursor-pointer" 
      onClick={() => onRemove(value)}
    />
  </div>
);

const PageFilter = ({ onFilterChange }) => {
  const [geoFilter, setGeoFilter] = useState("All Geos");
  const [timeFilter, setTimeFilter] = useState("Last 12 Months");
  const [towerFilter, setTowerFilter] = useState("All Towers");
  const [geoOptions] = useState(["All Geos", "NA", "EMEA", "APAC", "LATAM"]);
  const [timeOptions] = useState(["Last 12 Months", "Last 6 Months", "Last 3 Months", "Last Month"]);
  const [towerOptions] = useState(["All Towers", "CHI", "LYC", "PTP", "EMED", "LIVE NA", "DTR", "ECM", "CRE", "SCM"]);
  
  // Track if dropdown menus are open
  const [geoOpen, setGeoOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [towerOpen, setTowerOpen] = useState(false);
  
  const handleFilterChange = (type, value) => {
    let newFilters = {};
    
    if (type === "geo") {
      setGeoFilter(value);
      newFilters = { geo: value, time: timeFilter, tower: towerFilter };
    } else if (type === "time") {
      setTimeFilter(value);
      newFilters = { geo: geoFilter, time: value, tower: towerFilter };
    } else if (type === "tower") {
      setTowerFilter(value);
      newFilters = { geo: geoFilter, time: timeFilter, tower: value };
    }
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
    
    // Close the dropdown after selection
    setGeoOpen(false);
    setTimeOpen(false);
    setTowerOpen(false);
  };
  
  const resetFilters = () => {
    setGeoFilter("All Geos");
    setTimeFilter("Last 12 Months");
    setTowerFilter("All Towers");
    
    if (onFilterChange) {
      onFilterChange({ geo: "All Geos", time: "Last 12 Months", tower: "All Towers" });
    }
  };
  
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
            <FontAwesomeIcon icon={faFilter} className="text-secondary" />
            <div className="fw-medium text-dark">Page Filters</div>
            <div className="d-flex flex-wrap gap-2">
              {/* Geo Filter Dropdown */}
              <div className="dropdown me-2">
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => setGeoOpen(!geoOpen)}
                  aria-expanded={geoOpen}
                >
                  Geo: {geoFilter}
                </button>
                <ul className={`dropdown-menu ${geoOpen ? 'show' : ''}`}>
                  {geoOptions.map(option => (
                    <li key={option}>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleFilterChange("geo", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Time Filter Dropdown */}
              <div className="dropdown me-2">
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => setTimeOpen(!timeOpen)}
                  aria-expanded={timeOpen}
                >
                  Time: {timeFilter}
                </button>
                <ul className={`dropdown-menu ${timeOpen ? 'show' : ''}`}>
                  {timeOptions.map(option => (
                    <li key={option}>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleFilterChange("time", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tower Filter Dropdown */}
              <div className="dropdown me-2">
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => setTowerOpen(!towerOpen)}
                  aria-expanded={towerOpen}
                >
                  Tower: {towerFilter}
                </button>
                <ul className={`dropdown-menu ${towerOpen ? 'show' : ''}`}>
                  {towerOptions.map(option => (
                    <li key={option}>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleFilterChange("tower", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div 
            className="d-flex align-items-center text-primary cursor-pointer" 
            onClick={resetFilters}
          >
            <FontAwesomeIcon icon={faTimes} size="sm" className="me-1" />
            <span className="small">Reset filters</span>
          </div>
        </div>
        <div className="mt-2">
          <small className="text-muted">Active filters:</small>
          <div className="d-flex flex-wrap mt-2">
            {geoFilter !== "All Geos" && (
              <FilterPill 
                label={`Geo: ${geoFilter}`} 
                value="geo"
                onRemove={() => handleFilterChange("geo", "All Geos")} 
              />
            )}
            {timeFilter !== "Last 12 Months" && (
              <FilterPill 
                label={`Time: ${timeFilter}`} 
                value="time"
                onRemove={() => handleFilterChange("time", "Last 12 Months")} 
              />
            )}
            {towerFilter !== "All Towers" && (
              <FilterPill 
                label={`Tower: ${towerFilter}`} 
                value="tower"
                onRemove={() => handleFilterChange("tower", "All Towers")} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFilter;
