
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import MetaInfoHoverCard from './MetaInfoHoverCard';

const ProgressBar = ({ segments }) => {
  return (
    <div className="progress" style={{ height: '8px', borderRadius: '5px' }}>
      {segments.map((segment, index) => (
        <div 
          key={index} 
          className={`progress-bar ${segment.class} animate-progress`}
          style={{ width: `${segment.percentage}%` }}
        />
      ))}
    </div>
  );
};

const DataTable = ({ title, columns, data, showProgressBar = false, metaInfo }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const cardTitle = (
    <div className="d-flex align-items-center fade-in">
      <h5 className="card-title fs-6 fw-medium text-dark mb-0">
        {metaInfo ? (
          <MetaInfoHoverCard
            title={metaInfo.title || title}
            description={metaInfo.description || ""}
          >
            {title}
          </MetaInfoHoverCard>
        ) : (
          <>
            {title}
            <FontAwesomeIcon 
              icon={faInfoCircle} 
              size="sm" 
              className="text-secondary ms-2" 
            />
          </>
        )}
      </h5>
    </div>
  );
  
  return (
    <div className={`card shadow h-100 ${expanded ? 'expanded-card' : ''} card-animate`}
         style={expanded ? {position: 'fixed', top: '10%', left: '5%', right: '5%', bottom: '10%', zIndex: 1050, maxWidth: '90%', maxHeight: '80vh'} : {}}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {cardTitle}
          <FontAwesomeIcon 
            icon={expanded ? faCompress : faExpand} 
            size="sm" 
            className="text-secondary cursor-pointer fade-in" 
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
            <tbody className="table-animate">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-bottom table-hover-row">
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
          <div className="text-center py-4 text-secondary fade-in">No data available</div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
