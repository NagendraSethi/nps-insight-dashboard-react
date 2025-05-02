
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const FilterPill = ({ label }) => (
  <div className="badge bg-light text-dark d-inline-flex align-items-center me-2 py-2 px-3">
    {label}
    <FontAwesomeIcon icon={faTimes} className="ms-2 small cursor-pointer" />
  </div>
);

const PageFilter = () => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
            <FontAwesomeIcon icon={faFilter} className="text-secondary" />
            <div className="fw-medium text-dark">Page Filters</div>
            <div className="d-flex flex-wrap gap-2">
              <FilterPill label="All Geos" />
              <FilterPill label="Last 12 Months" />
              <FilterPill label="All Towers" />
            </div>
          </div>
          <div className="d-flex align-items-center text-primary cursor-pointer">
            <FontAwesomeIcon icon={faTimes} size="sm" className="me-1" />
            <span className="small">Reset filters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFilter;
