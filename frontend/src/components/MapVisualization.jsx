import React from 'react';

const MapVisualization = ({ title, subtitle, data, legends }) => {
  return (
    <div className="map-panel">
      <div className="map-header">
        <span>{title}</span>
        {subtitle && <span>{subtitle}</span>}
      </div>
      
      <div className="map-container">
        {legends && (
          <div className="legend">
            {legends.map((l, i) => (
              <div key={i} className="legend-item">
                <div className="legend-color" style={{backgroundColor: l.color}}></div>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        )}

        {data && data.features ? (
          <div className="field-grid">
            {data.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="field-cell"
                style={{ backgroundColor: feature.properties.color }}
              >
                <div className="field-tooltip">{feature.properties.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    </div>
  );
};

export default MapVisualization;
