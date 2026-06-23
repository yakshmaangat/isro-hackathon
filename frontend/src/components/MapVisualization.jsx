import React, { useState } from 'react';

const MapVisualization = ({ title, subtitle, data, altData, legends, altLegends, toggleLabel, isCloudToggle, loadingText="Processing spatial data..." }) => {
  const [showAlt, setShowAlt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = (newState) => {
    if (newState === showAlt) return;
    if (newState) {
      setIsProcessing(true);
      setTimeout(() => {
        setShowAlt(true);
        setIsProcessing(false);
      }, 1500);
    } else {
      setShowAlt(false);
    }
  };

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
          <div className="toggle-container">
            <div className={`toggle-btn ${!showAlt && !isProcessing ? 'active' : ''}`} onClick={() => handleToggle(false)}>{isCloudToggle ? 'Raw Optical' : 'Default Map'}</div>
            <div className={`toggle-btn ${showAlt && !isProcessing ? 'active' : ''}`} onClick={() => handleToggle(true)}>{toggleLabel}</div>
          </div>
        )}
      </div>
      
      <div className="map-container" style={{position: 'relative'}}>
        {isProcessing && (
          <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '4px'}}>
            <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>⚙️</div>
            <div style={{color: 'var(--accent-light)', marginTop: '10px'}}>{loadingText}</div>
          </div>
        )}
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
