
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExpand } from '@fortawesome/free-solid-svg-icons';

const ProgressBar = ({ segments }) => {
  return (
    <div className="progress-bar">
      {segments.map((segment, index) => (
        <div 
          key={index} 
          className={`progress-segment ${segment.class}`}
          style={{ width: `${segment.percentage}%` }}
        />
      ))}
    </div>
  );
};

const DataTable = ({ title, columns, data, showProgressBar = false }) => {
  return (
    <div className="nps-card h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="card-title">
          {title}
          <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500" />
        </div>
        <FontAwesomeIcon icon={faExpand} size="sm" className="text-gray-500 cursor-pointer" />
      </div>
      
      <div className="table-container">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column, index) => (
                <th key={index} className="pb-2 text-xs font-medium text-gray-600">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((column, colIndex) => {
                  if (column.key === 'progress') {
                    return (
                      <td key={colIndex} className="py-2">
                        {showProgressBar && (
                          <ProgressBar segments={row.segments} />
                        )}
                      </td>
                    );
                  }
                  
                  return (
                    <td key={colIndex} className="py-2 text-sm">
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
    </div>
  );
};

export default DataTable;
