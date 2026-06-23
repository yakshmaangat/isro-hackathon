import React from 'react';

const Sidebar = ({ farmInfo }) => {
  if (!farmInfo) return <div className="sidebar">Loading...</div>;

  const handleExport = (type) => {
    alert(`Exporting ${type} pipeline initiated...`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Farm ID: <strong>{farmInfo.farm_id}</strong><br/>
        Date: {farmInfo.date}
      </div>

      <div className="inputs-section menu-section">
        <div className="image-status-box">
          <div style={{width: 40, height: 40, backgroundColor: '#2e8b57', borderRadius: 4}}></div>
          <div>
            <div>Optical Image</div>
            <div style={{fontSize: '0.70rem', color: 'var(--text-muted)'}}>{farmInfo.optical_image_status}</div>
          </div>
        </div>
        <div className="image-status-box" style={{marginTop: 10}}>
          <div style={{width: 40, height: 40, backgroundColor: '#444', borderRadius: 4}}></div>
          <div>
            <div>Microwave Image</div>
            <div style={{fontSize: '0.70rem', color: 'var(--text-muted)'}}>{farmInfo.microwave_image_status}</div>
          </div>
        </div>
        <div className="image-status-box" style={{marginTop: 10, border: '1px dashed var(--accent)'}}>
          <div style={{width: 40, height: 40, backgroundColor: '#0ea5e9', borderRadius: 4}}></div>
          <div>
            <div>NISAR Data Hub</div>
            <div style={{fontSize: '0.70rem', color: 'var(--accent)'}}>{farmInfo.nisar_image_status}</div>
          </div>
        </div>
      </div>

      <div className="menu-section" style={{marginTop: 'auto'}}>
        <h3>4. INTEGRATION & EXPORT</h3>
        <div className="action-btn" onClick={() => handleExport('GeoTIFF')}>⬇ Export GeoTIFF</div>
        <div className="action-btn" onClick={() => handleExport('PDF Report')}>📄 PDF Summary Report</div>
        <div className="action-btn" style={{borderColor: '#f59e0b', color: '#f59e0b'}} onClick={() => handleExport('Bhuvan Sync')}>🌐 Sync with Bhuvan</div>
        <div className="action-btn" style={{borderColor: '#10b981', color: '#10b981'}} onClick={() => handleExport('PM-FASAL')}>✅ Push to PM-FASAL</div>
      </div>
    </div>
  );
};

export default Sidebar;
