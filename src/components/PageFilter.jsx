
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

const PageFilter = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
          <div className="font-medium text-gray-800">Page Filters</div>
          <div className="flex flex-wrap gap-2">
            <FilterPill label="All Geos" />
            <FilterPill label="Last 12 Months" />
            <FilterPill label="All Towers" />
          </div>
        </div>
        <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
          <FontAwesomeIcon icon={faTimes} size="sm" className="mr-1" />
          <span className="text-sm">Reset filters</span>
        </div>
      </div>
    </div>
  );
};

const FilterPill = ({ label }) => (
  <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 flex items-center">
    {label}
    <FontAwesomeIcon icon={faTimes} className="ml-2 text-xs cursor-pointer" />
  </div>
);

export default PageFilter;
