import React from 'react';

const Sidebar = ({ farmInfo }) => {
  if (!farmInfo) return <div className="sidebar">Loading...</div>;

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
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>({farmInfo.optical_image_status})</div>
          </div>
        </div>
        <div className="image-status-box" style={{marginTop: 10}}>
          <div style={{width: 40, height: 40, backgroundColor: '#444', borderRadius: 4}}></div>
          <div>
            <div>Microwave Image</div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>({farmInfo.microwave_image_status})</div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h3>2. AI ANALYSIS</h3>
        <div className="menu-item">Preprocessing</div>
        <div className="menu-item">Feature Extraction</div>
        <div className="menu-item active">Crop Classification Model</div>
        <div className="menu-item active">Moisture Stress Model</div>
        <div className="menu-item active">Growth Stage Estimation</div>
        <div className="menu-item">Irrigation Recommendation Model</div>
      </div>

      <div className="menu-section">
        <h3>3. OUTPUTS</h3>
        <div className="menu-item active">Crop Map</div>
        <div className="menu-item active">Stress Index Map</div>
        <div className="menu-item active">Irrigation Map</div>
      </div>
    </div>
  );
};

export default Sidebar;
