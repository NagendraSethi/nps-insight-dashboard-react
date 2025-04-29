
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const PageFilter = () => {
  return (
    <div className="header-bar">
      <div className="filter-bar">
        <div className="font-medium">Page Filters</div>
        <FontAwesomeIcon icon={faFilter} />
        <div className="reset-filter">
          <FontAwesomeIcon icon={faTimes} size="sm" />
          <span>Reset filters</span>
        </div>
      </div>
    </div>
  );
};

export default PageFilter;
