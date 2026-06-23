import React, { useEffect, useState } from 'react';
import ModelInsights from './ModelInsights';

const AILab = () => {
  const [models, setModels] = useState([]);
  const [queue, setQueue] = useState([]);
  const [phenology, setPhenology] = useState(null);
  const [acoustics, setAcoustics] = useState(null);
  const [quantum, setQuantum] = useState(null);
  const [epigenetic, setEpigenetic] = useState([]);
  
  const [showPheno, setShowPheno] = useState(false);
  const [isProcessingPheno, setIsProcessingPheno] = useState(false);

  const [showAcoustics, setShowAcoustics] = useState(false);
  const [isProcessingAcoustics, setIsProcessingAcoustics] = useState(false);

  const [showQuantum, setShowQuantum] = useState(false);
  const [isProcessingQuantum, setIsProcessingQuantum] = useState(false);

  const [showEpigenetic, setShowEpigenetic] = useState(false);
  const [isProcessingEpigenetic, setIsProcessingEpigenetic] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/ml/comparison').then(r => r.json()).then(setModels);
    fetch('http://localhost:8000/api/ml/active-learning').then(r => r.json()).then(setQueue);
    fetch('http://localhost:8000/api/ml/phenology').then(r => r.json()).then(setPhenology);
    fetch('http://localhost:8000/api/analysis/microwave-acoustics').then(r => r.json()).then(setAcoustics);
    fetch('http://localhost:8000/api/analysis/quantum-unmixing').then(r => r.json()).then(setQuantum);
    fetch('http://localhost:8000/api/analysis/epigenetic-memory').then(r => r.json()).then(setEpigenetic);
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
          {/* Feature 6: Phenology Fingerprinting */}
          <div className="panel" style={{border: '1px solid #a855f7', background: 'rgba(168, 85, 247, 0.02)'}}>
            <h2 style={{color: '#a855f7'}}>🧬 Phenology Fingerprinting</h2>
            <p className="info-desc">Time-series LAI curve shape-matching for variety-level classification.</p>
            
            {!showPheno && !isProcessingPheno && (
              <div style={{marginTop: '15px', textAlign: 'center'}}>
                 <button 
                   onClick={() => {
                     setIsProcessingPheno(true);
                     setTimeout(() => { setIsProcessingPheno(false); setShowPheno(true); }, 2000);
                   }}
                   style={{padding: '10px 20px', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Extract LAI Curve & Match Variety
                 </button>
              </div>
            )}

            {isProcessingPheno && (
              <div style={{marginTop: '15px', padding: '20px', textAlign: 'center', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>🧬</div>
                 <div style={{color: '#a855f7', marginTop: '10px'}}>Extracting Time-Series... Matching shape fingerprint...</div>
              </div>
            )}

            {showPheno && phenology && (
              <div style={{marginTop: '15px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                   <div>
                     <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Crop Type</div>
                     <div style={{fontWeight: 'bold'}}>{phenology.crop_type}</div>
                   </div>
                   <div style={{textAlign: 'right'}}>
                     <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Predicted Variety</div>
                     <div style={{fontWeight: 'bold', color: '#a855f7'}}>{phenology.predicted_variety}</div>
                   </div>
                </div>
                {/* Mock Chart */}
                <div style={{height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px', borderBottom: '1px solid #444', paddingBottom: '5px'}}>
                  {phenology.lai_curve.map((val, idx) => (
                    <div key={idx} style={{flex: 1, background: '#a855f7', height: `${(val / 4.0) * 100}%`, borderRadius: '2px 2px 0 0', opacity: 0.8}}></div>
                  ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '5px'}}>
                  <span>Sowing</span><span>Heading</span><span>Harvest</span>
                </div>
                <div style={{textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', color: '#10b981'}}>
                  Variety Confidence: {(phenology.confidence * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
          
          {/* Feature 5: Epigenetic Stress Memory */}
          <div className="panel" style={{border: '1px solid #14b8a6', background: 'rgba(20, 184, 166, 0.02)'}}>
            <h2 style={{color: '#14b8a6'}}>🧬 Epigenetic Stress Memory Mapping</h2>
            <p className="info-desc">Transgenerational stress adaptation based on historical survival curves.</p>

            {!showEpigenetic && !isProcessingEpigenetic && (
              <div style={{marginTop: '15px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingEpigenetic(true); setTimeout(() => { setIsProcessingEpigenetic(false); setShowEpigenetic(true); }, 1500); }}
                   style={{padding: '10px 20px', background: '#14b8a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Map Adaptation Zones
                 </button>
              </div>
            )}
            
            {isProcessingEpigenetic && (
              <div style={{marginTop: '15px', padding: '20px', textAlign: 'center', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>🌱</div>
                 <div style={{color: '#14b8a6', marginTop: '10px'}}>Correlating generational stress survival...</div>
              </div>
            )}

            {showEpigenetic && (
              <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                 {epigenetic.map((epi, i) => (
                    <div key={i} style={{background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${epi.epigenetic_adaptation_score > 0.5 ? '#14b8a6' : '#ef4444'}`}}>
                       <div>
                         <div style={{fontWeight: 'bold'}}>{epi.field_id}</div>
                         <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Historical Stresses: {epi.historical_stress_events}</div>
                       </div>
                       <div style={{textAlign: 'right'}}>
                         <div style={{color: epi.epigenetic_adaptation_score > 0.5 ? '#14b8a6' : '#ef4444', fontWeight: 'bold'}}>{epi.status}</div>
                         <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Adaptation: {(epi.epigenetic_adaptation_score*100).toFixed(0)}%</div>
                       </div>
                    </div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand New Row for Acoustic and Quantum */}
      <div className="grid-2">
         {/* Feature 1: Microwave Acoustics */}
         <div className="panel" style={{border: '1px solid #f43f5e', background: 'rgba(244, 63, 94, 0.02)'}}>
            <h2 style={{color: '#f43f5e'}}>🔊 Crop "Distress Scream" Detection (Microwave Acoustics)</h2>
            <p className="info-desc">Detecting xylem cavitation via C-band SAR FFT waveforms (14 days before visible stress).</p>
            
            {!showAcoustics && !isProcessingAcoustics && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingAcoustics(true); setTimeout(() => { setIsProcessingAcoustics(false); setShowAcoustics(true); }, 2000); }}
                   style={{padding: '12px 24px', background: '#f43f5e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Run FFT Acoustic Extraction
                 </button>
              </div>
            )}

            {isProcessingAcoustics && (
              <div style={{marginTop: '25px', padding: '30px', textAlign: 'center', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'spin 0.5s linear infinite'}}>📡</div>
                 <div style={{color: '#f43f5e', marginTop: '10px'}}>Decomposing SAR backscatter into acoustic proxies...</div>
              </div>
            )}

            {showAcoustics && acoustics && (
               <div style={{marginTop: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'flex-end', gap: '2px', height: '100px', borderBottom: '1px solid #444', paddingBottom: '10px'}}>
                     {acoustics.cavitation_events.map((val, idx) => (
                        <div key={idx} style={{flex: 1, background: '#f43f5e', height: `${Math.min(100, (val/1000)*100)}%`, borderRadius: '2px 2px 0 0', transition: 'height 0.5s'}}></div>
                     ))}
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px'}}>
                     <span>T-30 Days</span><span>T-15 Days</span><span>Current</span>
                  </div>
                  <div style={{marginTop: '15px', padding: '10px', background: 'rgba(244, 63, 94, 0.1)', borderRadius: '4px', borderLeft: '4px solid #f43f5e', fontSize: '0.85rem'}}>
                     <strong>Actionable Intelligence:</strong> {acoustics.recommendation}
                  </div>
               </div>
            )}
         </div>

         {/* Feature 2: Quantum-Inspired Spectral Unmixing */}
         <div className="panel" style={{border: '1px solid #6366f1', background: 'rgba(99, 102, 241, 0.02)'}}>
            <h2 style={{color: '#6366f1'}}>⚛️ Quantum-Inspired Spectral Unmixing</h2>
            <p className="info-desc">Simulated annealing to resolve 10m pixels into 2m sub-pixel virtual super-resolution.</p>
            
            {!showQuantum && !isProcessingQuantum && (
              <div style={{marginTop: '25px', textAlign: 'center', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #6366f1', borderRadius: '8px'}}>
                 <button 
                   onClick={() => { setIsProcessingQuantum(true); setTimeout(() => { setIsProcessingQuantum(false); setShowQuantum(true); }, 2500); }}
                   style={{padding: '12px 24px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Initialize Quantum Annealer
                 </button>
              </div>
            )}

            {isProcessingQuantum && (
              <div style={{marginTop: '25px', padding: '30px', textAlign: 'center', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 0.5s infinite'}}>⚛️</div>
                 <div style={{color: '#6366f1', marginTop: '10px'}}>Minimizing energy landscape across 10,000 pixels...</div>
              </div>
            )}

            {showQuantum && quantum && (
               <div style={{marginTop: '20px'}}>
                  <div style={{display: 'flex', gap: '20px', alignItems: 'center', background: '#111', padding: '15px', borderRadius: '8px'}}>
                     <div style={{flex: 1, textAlign: 'center'}}>
                        <div style={{width: '60px', height: '60px', background: '#4b5563', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 'bold'}}>10m</div>
                        <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px'}}>Raw Sentinel-2</div>
                     </div>
                     <div style={{fontSize: '1.5rem', color: '#6366f1'}}>→</div>
                     <div style={{flex: 1}}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', width: '60px', height: '60px', margin: '0 auto'}}>
                           {Array.from({length: 25}).map((_, i) => (
                              <div key={i} style={{background: i % 4 == 0 ? '#8b5cf6' : (i % 7 == 0 ? '#10b981' : '#6366f1')}}></div>
                           ))}
                        </div>
                        <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px', textAlign: 'center'}}>2m Effective</div>
                     </div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                     <div style={{fontSize: '0.85rem'}}><span style={{color: 'var(--text-muted)'}}>Target Purity:</span> <strong style={{color: '#6366f1'}}>{(quantum.cotton_purity*100).toFixed(1)}% Cotton</strong></div>
                     <div style={{fontSize: '0.85rem'}}><span style={{color: 'var(--text-muted)'}}>Optimization Energy:</span> <strong>{quantum.optimization_energy}</strong></div>
                  </div>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default AILab;
