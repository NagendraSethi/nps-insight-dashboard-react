
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
    <div className="nps-card">
      <div className="flex justify-between items-center mb-4">
        <div className="card-title">
          {title}
          <FontAwesomeIcon icon={faInfoCircle} size="sm" className="text-gray-500" />
        </div>
        <FontAwesomeIcon 
          icon={faExpand} 
          size="sm" 
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" 
        />
      </div>
      
      <div className="table-container rounded-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider text-left border-b"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((column, colIndex) => {
                  if (column.key === 'progress') {
                    return (
                      <td key={colIndex} className="py-3 px-4">
                        {showProgressBar && (
                          <ProgressBar segments={row.segments} />
                        )}
                      </td>
                    );
                  }
                  
                  return (
                    <td key={colIndex} className="py-3 px-4 text-sm">
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
        <div className="text-center py-8 text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default DataTable;
