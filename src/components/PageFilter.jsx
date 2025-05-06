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
  const [userTagFilter, setUserTagFilter] = useState("All User Types");
  const [surveyTagFilter, setSurveyTagFilter] = useState("All Survey Tags");
  
  const [geoOptions] = useState(["All Geos", "NA", "EMEA", "APAC", "LATAM"]);
  const [timeOptions] = useState(["Last 12 Months", "Last 6 Months", "Last 3 Months", "Last Month"]);
  const [towerOptions] = useState(["All Towers", "CHI", "LYC", "PTP", "EMED", "LIVE NA", "DTR", "ECM", "CRE", "SCM"]);
  const [userTagOptions] = useState(["All User Types", "Manager", "End User", "Senior Stakeholder", "Other"]);
  const [surveyTagOptions] = useState(["All Survey Tags", "Strategic", "Operational", "Technical", "Project-based"]);
  
  // Track if dropdown menus are open
  const [geoOpen, setGeoOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [towerOpen, setTowerOpen] = useState(false);
  const [userTagOpen, setUserTagOpen] = useState(false);
  const [surveyTagOpen, setSurveyTagOpen] = useState(false);
  
  const handleFilterChange = (type, value) => {
    let newFilters = { 
      geo: geoFilter, 
      time: timeFilter, 
      tower: towerFilter,
      userTag: userTagFilter,
      surveyTag: surveyTagFilter
    };
    
    if (type === "geo") {
      setGeoFilter(value);
      newFilters.geo = value;
    } else if (type === "time") {
      setTimeFilter(value);
      newFilters.time = value;
    } else if (type === "tower") {
      setTowerFilter(value);
      newFilters.tower = value;
    } else if (type === "userTag") {
      setUserTagFilter(value);
      newFilters.userTag = value;
    } else if (type === "surveyTag") {
      setSurveyTagFilter(value);
      newFilters.surveyTag = value;
    }
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
    
    // Close all dropdowns after selection
    setGeoOpen(false);
    setTimeOpen(false);
    setTowerOpen(false);
    setUserTagOpen(false);
    setSurveyTagOpen(false);
  };
  
  const resetFilters = () => {
    setGeoFilter("All Geos");
    setTimeFilter("Last 12 Months");
    setTowerFilter("All Towers");
    setUserTagFilter("All User Types");
    setSurveyTagFilter("All Survey Tags");
    
    if (onFilterChange) {
      onFilterChange({ 
        geo: "All Geos", 
        time: "Last 12 Months", 
        tower: "All Towers",
        userTag: "All User Types",
        surveyTag: "All Survey Tags"
      });
    }
  };
  
  // Handler for dropdown toggle - closes other dropdowns when one is opened
  const handleToggleDropdown = (dropdownName) => {
    // Close all dropdowns first
    setGeoOpen(false);
    setTimeOpen(false);
    setTowerOpen(false);
    setUserTagOpen(false);
    setSurveyTagOpen(false);
    
    // Then open the selected one
    switch(dropdownName) {
      case 'geo':
        setGeoOpen(prev => !prev);
        break;
      case 'time':
        setTimeOpen(prev => !prev);
        break;
      case 'tower':
        setTowerOpen(prev => !prev);
        break;
      case 'userTag':
        setUserTagOpen(prev => !prev);
        break;
      case 'surveyTag':
        setSurveyTagOpen(prev => !prev);
        break;
      default:
        break;
    }
  };
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setGeoOpen(false);
      setTimeOpen(false);
      setTowerOpen(false);
      setUserTagOpen(false);
      setSurveyTagOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Prevent dropdown closing when clicking inside dropdown
  const handleDropdownClick = (e) => {
    e.stopPropagation();
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
              <div className="dropdown me-2" onClick={handleDropdownClick}>
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => handleToggleDropdown('geo')}
                  aria-expanded={geoOpen}
                >
                  Geo: {geoFilter}
                </button>
                <ul className={`dropdown-menu ${geoOpen ? 'show' : ''}`}>
                  {geoOptions.map(option => (
                    <li key={option}>
                      <button 
                        className={`dropdown-item ${option === geoFilter ? 'active' : ''}`}
                        onClick={() => handleFilterChange("geo", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Time Filter Dropdown */}
              <div className="dropdown me-2" onClick={handleDropdownClick}>
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => handleToggleDropdown('time')}
                  aria-expanded={timeOpen}
                >
                  Time: {timeFilter}
                </button>
                <ul className={`dropdown-menu ${timeOpen ? 'show' : ''}`}>
                  {timeOptions.map(option => (
                    <li key={option}>
                      <button 
                        className={`dropdown-item ${option === timeFilter ? 'active' : ''}`}
                        onClick={() => handleFilterChange("time", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tower Filter Dropdown */}
              <div className="dropdown me-2" onClick={handleDropdownClick}>
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => handleToggleDropdown('tower')}
                  aria-expanded={towerOpen}
                >
                  Tower: {towerFilter}
                </button>
                <ul className={`dropdown-menu ${towerOpen ? 'show' : ''}`}>
                  {towerOptions.map(option => (
                    <li key={option}>
                      <button 
                        className={`dropdown-item ${option === towerFilter ? 'active' : ''}`}
                        onClick={() => handleFilterChange("tower", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* User Tag Filter Dropdown */}
              <div className="dropdown me-2" onClick={handleDropdownClick}>
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => handleToggleDropdown('userTag')}
                  aria-expanded={userTagOpen}
                >
                  User Type: {userTagFilter}
                </button>
                <ul className={`dropdown-menu ${userTagOpen ? 'show' : ''}`}>
                  {userTagOptions.map(option => (
                    <li key={option}>
                      <button 
                        className={`dropdown-item ${option === userTagFilter ? 'active' : ''}`}
                        onClick={() => handleFilterChange("userTag", option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Survey Tag Filter Dropdown */}
              <div className="dropdown me-2" onClick={handleDropdownClick}>
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  onClick={() => handleToggleDropdown('surveyTag')}
                  aria-expanded={surveyTagOpen}
                >
                  Survey Tag: {surveyTagFilter}
                </button>
                <ul className={`dropdown-menu ${surveyTagOpen ? 'show' : ''}`}>
                  {surveyTagOptions.map(option => (
                    <li key={option}>
                      <button 
                        className={`dropdown-item ${option === surveyTagFilter ? 'active' : ''}`}
                        onClick={() => handleFilterChange("surveyTag", option)}
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
            {userTagFilter !== "All User Types" && (
              <FilterPill 
                label={`User Type: ${userTagFilter}`} 
                value="userTag"
                onRemove={() => handleFilterChange("userTag", "All User Types")} 
              />
            )}
            {surveyTagFilter !== "All Survey Tags" && (
              <FilterPill 
                label={`Survey Tag: ${surveyTagFilter}`} 
                value="surveyTag"
                onRemove={() => handleFilterChange("surveyTag", "All Survey Tags")} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFilter;
