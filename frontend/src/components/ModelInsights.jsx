import React, { useEffect, useState } from 'react';

const ModelInsights = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/analysis/explainability')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div>Loading insights...</div>;

  return (
    <div className="panel insights-panel" style={{display: 'flex', gap: '20px'}}>
      
      <div style={{flex: 1}} className="info-card">
        <h2>Model Explainability (Feature Importance)</h2>
        <p className="info-desc" style={{marginBottom: '15px'}}>Top spectral bands contributing to the classification model.</p>
        
        <div className="bar-chart" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {data.features.map((f, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <div style={{width: '120px', fontSize: '0.8rem', color: 'var(--text-muted)'}}>{f.feature}</div>
              <div style={{flex: 1, height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden'}}>
                <div style={{width: `${f.importance * 100}%`, height: '100%', background: 'var(--accent-light)'}}></div>
              </div>
              <div style={{width: '40px', fontSize: '0.8rem', textAlign: 'right'}}>{(f.importance * 100).toFixed(0)}%</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{flex: 1}} className="info-card">
        <h2>Alert Threshold Configuration</h2>
        <p className="info-desc" style={{marginBottom: '15px'}}>Set custom stress thresholds for real-time alerting.</p>
        
        <div style={{marginBottom: '15px'}}>
          <label style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Alert me if field crosses Stress Index:</label>
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" style={{width: '100%', marginTop: '10px'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)'}}>
            <span>0.0 (No Stress)</span>
            <span>0.7 (High)</span>
            <span>1.0 (Severe)</span>
          </div>
        </div>

        <div style={{background: '#0b0f14', padding: '10px', borderRadius: '4px', height: '100px', overflowY: 'auto', fontSize: '0.8rem', border: '1px solid #333'}}>
          <div style={{color: '#ef4444', marginBottom: '5px'}}>[LIVE] ⚠️ field_4_2 crossed threshold 0.7</div>
          <div style={{color: '#f59e0b', marginBottom: '5px'}}>[LIVE] ⚠️ field_1_3 crossed threshold 0.7</div>
        </div>
      </div>

    </div>
  );
};

export default ModelInsights;
