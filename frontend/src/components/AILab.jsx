import React, { useEffect, useState } from 'react';
import ModelInsights from './ModelInsights';

const AILab = () => {
  const [models, setModels] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/ml/comparison').then(r => r.json()).then(setModels);
    fetch('http://localhost:8000/api/ml/active-learning').then(r => r.json()).then(setQueue);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      <div className="grid-2">
        {/* Model Comparison Panel */}
        <div className="panel">
          <h2>🧠 Model Comparison Panel</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Accuracy metrics across architectures.</p>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem'}}>
            <thead>
              <tr style={{borderBottom: '1px solid var(--panel-border)', color: 'var(--text-muted)'}}>
                <th style={{textAlign: 'left', padding: '10px 5px'}}>Architecture</th>
                <th style={{padding: '10px 5px'}}>Accuracy</th>
                <th style={{padding: '10px 5px'}}>F1 Score</th>
                <th style={{padding: '10px 5px'}}>Inference (ms)</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={i} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <td style={{padding: '10px 5px', fontWeight: 'bold'}}>{m.model_name}</td>
                  <td style={{padding: '10px 5px', textAlign: 'center', color: m.accuracy > 90 ? '#10b981' : '#f59e0b'}}>{m.accuracy}%</td>
                  <td style={{padding: '10px 5px', textAlign: 'center'}}>{m.f1_score}</td>
                  <td style={{padding: '10px 5px', textAlign: 'center'}}>{m.inference_time_ms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Learning Queue */}
        <div className="panel">
          <h2>🎯 Active Learning Queue</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Needs ground truth validation.</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {queue.map((q, i) => (
              <div key={i} className="info-card" style={{borderLeft: '4px solid #ef4444'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                  <strong style={{color: '#fff'}}>{q.field_id}</strong>
                  <span style={{color: '#ef4444', fontSize: '0.8rem'}}>Conf: {q.confidence_score * 100}%</span>
                </div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Reason: {q.reason}</div>
                <div style={{fontSize: '0.75rem', marginTop: '5px'}}>Lat/Lon: {q.coordinates.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <ModelInsights />
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="panel">
            <h2>🌍 Transfer Learning Tracker</h2>
            <p className="info-desc">Sentinel-2 weights ➔ LISS-IV & MODIS Generalization</p>
            <div style={{marginTop: '15px', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={{flex: 1, textAlign: 'center'}}>
                <div style={{fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold'}}>88.4%</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>LISS-IV Acc</div>
              </div>
              <div style={{flex: 1, textAlign: 'center'}}>
                <div style={{fontSize: '1.2rem', color: '#f59e0b', fontWeight: 'bold'}}>76.2%</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>MODIS Acc</div>
              </div>
            </div>
          </div>
          
          <div className="panel">
            <h2>🚨 Anomaly Detection Layer</h2>
            <p className="info-desc">Statistical outliers bypassing standard stress models.</p>
            <div style={{background: '#451a1a', padding: '10px', borderRadius: '4px', marginTop: '10px', border: '1px solid #7f1d1d', color: '#fca5a5', fontSize: '0.8rem'}}>
              ⚠️ field_0_4: Sudden NDVI drop (-0.4) within 48h. Possible pest attack or flooding.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AILab;
