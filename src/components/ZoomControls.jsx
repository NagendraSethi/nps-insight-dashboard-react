
import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div className="zoom-controls d-flex align-items-center">
      <button
        onClick={onZoomOut}
        className="btn btn-sm btn-outline-secondary me-2 d-flex align-items-center justify-content-center"
        aria-label="Zoom out"
        title="Zoom out"
      >
        <ZoomOut size={18} />
      </button>
      <button
        onClick={onZoomIn}
        className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
        aria-label="Zoom in"
        title="Zoom in"
      >
        <ZoomIn size={18} />
      </button>
    </div>
  );
};

export default ZoomControls;
