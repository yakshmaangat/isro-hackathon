import React, { useEffect, useState } from 'react';

const DataPipeline = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/pipeline/schedule')
      .then(res => res.json())
      .then(d => setSchedules(d));
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      <div className="grid-2">
        {/* Satellite Scheduler */}
        <div className="panel">
          <h2>🛰️ Real-time Satellite Pass Scheduler</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Predicting overpasses and forecasting cloud cover.</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {schedules.map((s, i) => (
              <div key={i} className="info-card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: 'bold', color: 'var(--text-main)'}}>{s.satellite}</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Next Pass: {s.next_pass}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{color: 'var(--accent-light)', fontWeight: 'bold'}}>{s.countdown}</div>
                  <div style={{fontSize: '0.8rem', color: s.cloud_cover_forecast > 50 ? '#ef4444' : '#10b981'}}>
                    Cloud Forecast: {s.cloud_cover_forecast}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atmospheric Correction */}
        <div className="panel">
          <h2>☁️ Atmospheric Correction Visualizer</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Top-of-Atmosphere (TOA) vs Surface Reflectance (SR).</p>
          
          <div style={{height: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '15px', position: 'relative'}}>
            {/* Mock Chart */}
            <div style={{position: 'absolute', bottom: '20px', left: '20px', right: '20px', height: '100px', display: 'flex', alignItems: 'flex-end', gap: '10px'}}>
              {[1,2,3,4,5,6].map(b => (
                <div key={b} style={{flex: 1, display: 'flex', gap: '2px', alignItems: 'flex-end', height: '100%'}}>
                  <div style={{flex: 1, height: `${Math.random() * 60 + 20}%`, background: '#ef4444'}}></div>
                  <div style={{flex: 1, height: `${Math.random() * 40 + 10}%`, background: '#10b981'}}></div>
                </div>
              ))}
            </div>
            <div style={{position: 'absolute', top: '10px', right: '10px', fontSize: '0.75rem', display: 'flex', gap: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div style={{width: '10px', height: '10px', background: '#ef4444'}}></div> TOA</div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><div style={{width: '10px', height: '10px', background: '#10b981'}}></div> SR</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Spectral Signature Library */}
        <div className="panel">
          <h2>📊 Spectral Signature Library</h2>
          <p className="info-desc">Interactive reference library of crop signatures (B2 - B12).</p>
          <div style={{height: '150px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'}}>
            [ Interactive D3/Chart.js Line Plot Area ]
          </div>
        </div>

        {/* Band Explorer */}
        <div className="panel">
          <h2>🔍 Band Combination Explorer</h2>
          <p className="info-desc">NDVI, NDWI, NDRE, SAVI, EVI, LSWI multi-view.</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px'}}>
            {['NDVI', 'NDWI', 'NDRE', 'SAVI', 'EVI', 'LSWI'].map(idx => (
              <div key={idx} className="info-card" style={{padding: '10px', textAlign: 'center'}}>
                <div style={{width: '100%', height: '50px', background: `linear-gradient(${Math.random()*360}deg, #10b981, #0b0f14)`, borderRadius: '4px', marginBottom: '5px'}}></div>
                <div style={{fontSize: '0.75rem', fontWeight: 'bold'}}>{idx}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DataPipeline;
