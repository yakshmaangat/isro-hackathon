import React from 'react';

const AgriIntelligence = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      <div className="grid-2">
        {/* Crop Calendar */}
        <div className="panel">
          <h2>📅 Crop Calendar & Alert Engine</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Phenological window stress overlays.</p>
          <div style={{padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>
              <span>Sowing</span><span>Vegetative</span><span style={{color: '#ef4444', fontWeight: 'bold'}}>Flowering</span><span>Maturation</span>
            </div>
            <div style={{display: 'flex', height: '10px', borderRadius: '5px', overflow: 'hidden'}}>
              <div style={{flex: 1, background: '#10b981'}}></div>
              <div style={{flex: 2, background: '#f59e0b'}}></div>
              <div style={{flex: 1, background: '#ef4444', border: '1px solid #fff'}}></div>
              <div style={{flex: 1.5, background: '#38bdf8'}}></div>
            </div>
            <div style={{marginTop: '15px', color: '#fca5a5', fontSize: '0.85rem', background: '#451a1a', padding: '10px', borderRadius: '4px'}}>
              <strong>CRITICAL RISK:</strong> Moderate stress detected during Cotton Flowering stage. Yield impact amplified.
            </div>
          </div>
        </div>

        {/* ET Estimation */}
        <div className="panel">
          <h2>💧 Evapotranspiration (ET)</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>FAO-56 Penman-Monteith surface energy balance.</p>
          <div className="grid-2">
            <div className="info-card">
              <div className="info-title">Actual ET (ETa)</div>
              <div className="info-value">4.2 mm/day</div>
            </div>
            <div className="info-card">
              <div className="info-title">Potential ET (ETp)</div>
              <div className="info-value">6.8 mm/day</div>
            </div>
          </div>
          <div style={{marginTop: '15px', fontSize: '0.8rem', textAlign: 'center'}}>
            ETa / ETp Ratio: <strong style={{color: '#f59e0b'}}>0.61 (Deficit)</strong>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {/* Soil Moisture */}
        <div className="panel">
          <h2>🌱 Soil Moisture Profile</h2>
          <p className="info-desc">SAR C-band Dielectric Model (0-30cm)</p>
          <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem'}}>
              <div style={{width: '40px'}}>0-10cm</div>
              <div style={{flex: 1, height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '20%', height: '100%', background: '#ef4444', borderRadius: '4px'}}></div></div>
              <div style={{width: '30px'}}>12%</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem'}}>
              <div style={{width: '40px'}}>10-20cm</div>
              <div style={{flex: 1, height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '45%', height: '100%', background: '#f59e0b', borderRadius: '4px'}}></div></div>
              <div style={{width: '30px'}}>25%</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem'}}>
              <div style={{width: '40px'}}>20-30cm</div>
              <div style={{flex: 1, height: '8px', background: '#333', borderRadius: '4px'}}><div style={{width: '70%', height: '100%', background: '#10b981', borderRadius: '4px'}}></div></div>
              <div style={{width: '30px'}}>38%</div>
            </div>
          </div>
        </div>

        {/* Yield Prediction */}
        <div className="panel">
          <h2>🌾 Yield Prediction</h2>
          <p className="info-desc">Projected range based on stress history.</p>
          <div style={{marginTop: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-light)'}}>3.2 - 3.8</div>
            <div style={{color: 'var(--text-muted)'}}>Tons / Hectare</div>
            
            <div style={{marginTop: '20px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px'}}>
              Scenario: Irrigate today ➔ <strong style={{color: '#10b981'}}>+0.4 t/ha</strong>
            </div>
          </div>
        </div>

        {/* Inter-field */}
        <div className="panel">
          <h2>⚖️ Inter-field Comparison</h2>
          <p className="info-desc">Benchmarking against neighbors.</p>
          <div style={{display: 'flex', marginTop: '15px', gap: '10px'}}>
            <div style={{flex: 1, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '10px', borderRadius: '4px', textAlign: 'center'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Your Field</div>
              <div style={{color: '#ef4444', marginTop: '5px'}}>0.82 Stress</div>
            </div>
            <div style={{flex: 1, background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '10px', borderRadius: '4px', textAlign: 'center'}}>
              <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Neighbor</div>
              <div style={{color: '#10b981', marginTop: '5px'}}>0.34 Stress</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AgriIntelligence;
