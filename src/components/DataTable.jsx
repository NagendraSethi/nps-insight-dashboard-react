
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

const ProgressBar = ({ segments }) => {
  return (
    <div className="progress" style={{ height: '8px', borderRadius: '5px' }}>
      {segments.map((segment, index) => (
        <div 
          key={index} 
          className={`progress-bar ${segment.class}`}
          style={{ width: `${segment.percentage}%` }}
        />
      ))}
    </div>
  );
};

const DataTable = ({ title, columns, data, showProgressBar = false }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className={`card shadow h-100 ${expanded ? 'expanded-card' : ''}`} 
         style={expanded ? {position: 'fixed', top: '10%', left: '5%', right: '5%', bottom: '10%', zIndex: 1050, maxWidth: '90%', maxHeight: '80vh'} : {}}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <h5 className="card-title fs-6 fw-medium text-dark mb-0">{title}</h5>
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              size="sm" 
              className="text-secondary ms-2" 
            />
          </div>
          <FontAwesomeIcon 
            icon={expanded ? faCompress : faExpand} 
            size="sm" 
            className="text-secondary cursor-pointer" 
            onClick={toggleExpand}
          />
        </div>
        
        <div className="table-responsive border rounded" style={expanded ? {maxHeight: 'calc(100% - 70px)'} : {maxHeight: '300px'}}>
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column, index) => (
                  <th 
                    key={index} 
                    className="py-2 small fw-medium text-secondary text-start position-sticky bg-light top-0"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-bottom">
                  {columns.map((column, colIndex) => {
                    if (column.key === 'progress') {
                      return (
                        <td key={colIndex} className="py-2">
                          {showProgressBar && <ProgressBar segments={row.segments} />}
                        </td>
                      );
                    }
                    
                    return (
                      <td key={colIndex} className="py-2 small">
                        {column.format 
                          ? column.format(row[column.key], row) 
                          : row[column.key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="text-center py-4 text-secondary">No data available</div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
