import React from 'react';

const IrrigationPanel = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="bottom-panel">
      <h2>IRRIGATION RECOMMENDATIONS</h2>
      <div className="irrigation-grid">
        <div className="info-card">
          <div className="info-title">Recommended Action</div>
          <div className="info-value blue" style={{fontSize: '0.9rem', alignItems: 'flex-start'}}>
            <span style={{fontSize: '1.5rem', marginRight: '5px'}}>💧</span>
            <div>
              {data.irrigation_recommended_action}
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-title">Irrigation Depth (mm)</div>
          <div className="info-value">
            <span style={{fontSize: '1.5rem', color: '#38bdf8'}}>⚗️</span>
            {data.irrigation_depth_mm}
          </div>
        </div>

        <div className="info-card">
          <div className="info-title">Total Irrigation Volume</div>
          <div className="info-value blue">
            <span style={{fontSize: '1.5rem'}}>🚰</span>
            {data.total_irrigation_volume_m3}
          </div>
          <div className="info-desc">(~3%)</div>
        </div>

        <div className="info-card span-2" style={{gridColumn: '1 / span 3'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '40px', width: '100%'}}>
             <div>
               <div className="info-title">Estimated Duration</div>
               <div className="info-value">
                 <span style={{fontSize: '1.5rem', color: '#38bdf8'}}>⏱️</span>
                 {data.estimated_duration_hours}
               </div>
             </div>
             
             <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="info-title" style={{textAlign: 'center'}}>Irrigation Map (mm)</div>
                {/* Mini map placeholder */}
                <div style={{width: 150, height: 80, display: 'flex', gap: 2, background: '#1a1a1a', padding: 5, borderRadius: 8}}>
                  <div style={{flex: 1, background: '#08519c'}}></div>
                  <div style={{flex: 1, background: '#3182bd'}}></div>
                  <div style={{flex: 1, background: '#6baed6'}}></div>
                  <div style={{flex: 1, background: '#bdd7e7'}}></div>
                </div>
             </div>
          </div>
        </div>

        <div className="info-card" style={{gridColumn: '4', gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div className="info-title">Water Balance (Field Level)</div>
          <div className="water-balance">
            <div className="gauge">
              <div className="gauge-value">{data.water_balance}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IrrigationPanel;
