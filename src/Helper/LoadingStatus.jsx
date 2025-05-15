
import React from 'react';

const LoadingStatus = ({ status_message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner-border text-primary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="text-secondary">{status_message}</span>
    </div>
  );
};

export default LoadingStatus;
