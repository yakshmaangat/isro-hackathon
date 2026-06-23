import React, { useState } from 'react';

const MapVisualization = ({ title, subtitle, data, altData, legends, altLegends, toggleLabel, isCloudToggle }) => {
  const [showAlt, setShowAlt] = useState(false);

  const activeData = showAlt && altData ? altData : data;
  const activeLegends = showAlt && altLegends ? altLegends : legends;

  return (
    <div className="map-panel">
      <div className="map-header" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <span>{title}</span>
          {subtitle && <span style={{fontSize: '0.8rem', color: 'var(--accent-light)'}}>{subtitle}</span>}
        </div>
        
        {toggleLabel && (
          <div className="toggle-container" onClick={() => setShowAlt(!showAlt)}>
            <div className={`toggle-btn ${!showAlt ? 'active' : ''}`}>{isCloudToggle ? 'Raw Optical' : 'Classification'}</div>
            <div className={`toggle-btn ${showAlt ? 'active' : ''}`}>{toggleLabel}</div>
          </div>
        )}
      </div>
      
      <div className="map-container">
        {activeLegends && (
          <div className="legend">
            {activeLegends.map((l, i) => (
              <div key={i} className="legend-item">
                <div className="legend-color" style={{backgroundColor: l.color}}></div>
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeData && activeData.features ? (
          <div className={`field-grid ${isCloudToggle && !showAlt ? 'cloudy-filter' : ''}`}>
            {activeData.features.map((feature, idx) => (
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
