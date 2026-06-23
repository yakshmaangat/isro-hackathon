import React, { useEffect, useState } from 'react';

const GeospatialTools = () => {
  const [waterStress, setWaterStress] = useState(null);
  const [atmospheric, setAtmospheric] = useState(null);
  const [disease, setDisease] = useState(null);
  const [groundwater, setGroundwater] = useState(null);
  
  const [showSAR, setShowSAR] = useState(false);
  const [isProcessingSAR, setIsProcessingSAR] = useState(false);
  
  const [showWater, setShowWater] = useState(false);
  const [isProcessingWater, setIsProcessingWater] = useState(false);

  const [showAtmos, setShowAtmos] = useState(false);
  const [isProcessingAtmos, setIsProcessingAtmos] = useState(false);

  const [showDisease, setShowDisease] = useState(false);
  const [isProcessingDisease, setIsProcessingDisease] = useState(false);

  const [showGroundwater, setShowGroundwater] = useState(false);
  const [isProcessingGroundwater, setIsProcessingGroundwater] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/analysis/water-stress').then(res => res.json()).then(setWaterStress);
    fetch('http://localhost:8000/api/analysis/atmospheric-river').then(r => r.json()).then(setAtmospheric);
    fetch('http://localhost:8000/api/analysis/disease-propagation').then(r => r.json()).then(setDisease);
    fetch('http://localhost:8000/api/analysis/groundwater-runway').then(r => r.json()).then(setGroundwater);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Feature 2 & 5 Row */}
      <div className="grid-2">
        {/* Feature 2: SAR Coherence for Lodging */}
        <div className="panel" style={{border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.02)'}}>
          <h2 style={{color: '#ef4444'}}>🌪️ SAR Coherence Change (Crop Lodging)</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Interferometric coherence drop flag for physical crop structure damage (invisible to optical).</p>
          
          {!showSAR && !isProcessingSAR && (
             <div style={{height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ef4444', borderRadius: '8px'}}>
               <button 
                 onClick={() => {
                   setIsProcessingSAR(true);
                   setTimeout(() => { setIsProcessingSAR(false); setShowSAR(true); }, 1500);
                 }}
                 style={{padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Run Interferometric Analysis
               </button>
             </div>
          )}

          {isProcessingSAR && (
             <div style={{height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>🛰️</div>
               <div style={{color: '#ef4444', marginTop: '10px'}}>Computing coherence matrix...</div>
             </div>
          )}

          {showSAR && (
            <div style={{height: '180px', background: '#111', borderRadius: '8px', display: 'flex', position: 'relative', overflow: 'hidden'}}>
               <div style={{flex: 1, borderRight: '2px dashed #444', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                 <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Pass 1 (T-12 days)</div>
                 <div style={{fontSize: '1.5rem', color: '#4ade80', fontWeight: 'bold'}}>0.82</div>
                 <div style={{fontSize: '0.7rem'}}>High Coherence</div>
               </div>
               <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)'}}>
                 <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Pass 2 (Current)</div>
                 <div style={{fontSize: '1.5rem', color: '#ef4444', fontWeight: 'bold'}}>0.21</div>
                 <div style={{fontSize: '0.7rem'}}>Coherence Collapse!</div>
               </div>
               <div style={{position: 'absolute', bottom: '10px', left: '0', right: '0', textAlign: 'center', color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold'}}>
                  Flagged: Wind/Rain Lodging Damage
               </div>
            </div>
          )}
        </div>

        {/* Feature 4: Groundwater Depletion Runway */}
        <div className="panel" style={{border: '1px solid #38bdf8', background: 'rgba(56, 189, 248, 0.02)'}}>
          <h2 style={{color: '#38bdf8'}}>🚰 Gravity-Based Groundwater Depletion</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>GRACE-FO satellite mass anomaly tracking translated to irrigation runway.</p>
          
          {!showGroundwater && !isProcessingGroundwater && (
             <div style={{height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #38bdf8', borderRadius: '8px'}}>
               <button 
                 onClick={() => { setIsProcessingGroundwater(true); setTimeout(() => { setIsProcessingGroundwater(false); setShowGroundwater(true); }, 1500); }}
                 style={{padding: '10px 20px', background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Forecast Groundwater Runway
               </button>
             </div>
          )}

          {isProcessingGroundwater && (
             <div style={{height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>📡</div>
               <div style={{color: '#38bdf8', marginTop: '10px'}}>Querying GRACE gravitational anomalies...</div>
             </div>
          )}

          {showGroundwater && groundwater && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div style={{background: '#111', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #38bdf8'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: 'var(--text-muted)'}}>GRACE Anomaly:</span>
                  <span style={{color: '#ef4444', fontWeight: 'bold'}}>{groundwater.grace_anomaly}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: 'var(--text-muted)'}}>Extraction Rate:</span>
                  <span>{groundwater.extraction_rate_m3_day} m³/day</span>
                </div>
                <div style={{textAlign: 'center', marginTop: '15px', padding: '15px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', border: '1px solid #ef4444'}}>
                   <div style={{fontSize: '0.8rem', color: '#ef4444'}}>Aquifer Depletion Horizon</div>
                   <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#ef4444'}}>{groundwater.runway_crop_seasons} Seasons Left</div>
                   <div style={{fontSize: '0.75rem', marginTop: '5px', fontWeight: 'bold'}}>{groundwater.status}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid-2">
        {/* Boundary Delineation */}
        <div className="panel">
          <h2>📐 Field Boundary Auto-Delineation</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>SAR coherence + edge detection mapped over optical imagery.</p>
          <div style={{height: '250px', background: '#222', borderRadius: '8px', position: 'relative', overflow: 'hidden'}}>
            {/* Mock satellite background */}
            <div style={{position: 'absolute', inset: 0, background: 'url(https://via.placeholder.com/400x300/1a1a1a/333333?text=Satellite+Imagery)', backgroundSize: 'cover', filter: 'brightness(0.6)'}}></div>
            {/* Mock boundaries */}
            <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
              <polygon points="50,50 150,40 180,120 40,150" fill="rgba(74, 222, 128, 0.2)" stroke="#4ade80" strokeWidth="2" />
              <polygon points="170,30 280,20 290,100 190,110" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <div style={{position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.75rem'}}>
              <span style={{color: '#4ade80'}}>Solid:</span> Auto-Detected &nbsp;
              <span style={{color: '#38bdf8'}}>Dashed:</span> User Editing
            </div>
          </div>
        </div>

        {/* Micro-Zoning */}
        <div className="panel">
          <h2>🎯 Micro-Zoning (Sub-field)</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Enabling Variable-Rate Irrigation (VRI).</p>
          <div style={{height: '250px', background: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justify: 'center', position: 'relative'}}>
            <div style={{width: '200px', height: '200px', background: 'radial-gradient(circle at 30% 30%, #ef4444 0%, #f59e0b 40%, #10b981 80%)', borderRadius: '10px', transform: 'rotate(15deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}></div>
            <div style={{position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '5px', borderRadius: '4px', fontSize: '0.7rem'}}>
              Red = Dry Corner (Needs +15mm)
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Historical Drought */}
        <div className="panel">
          <h2>🏜️ Historical Drought Index Overlay</h2>
          <p className="info-desc">Standardized Precipitation Index (SPI) context.</p>
          <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #333', paddingBottom: '4px'}}>
              <span>2022</span><span style={{color: '#10b981'}}>+1.2 (Normal)</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #333', paddingBottom: '4px'}}>
              <span>2024</span><span style={{color: '#f59e0b'}}>-1.5 (Moderate)</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
              <span>2026 (Current)</span><span style={{color: '#ef4444', fontWeight: 'bold'}}>-2.4 (Severe)</span>
            </div>
          </div>
        </div>

        {/* 3D Terrain */}
        <div className="panel">
          <h2>🏔️ 3D Terrain + Slope Analysis</h2>
          <p className="info-desc">SRTM DEM overlay for runoff prediction.</p>
          <div style={{display: 'flex', gap: '15px', marginTop: '15px'}}>
            <div style={{flex: 1, background: 'linear-gradient(to right, #0b0f14, #333)', height: '80px', borderRadius: '8px', position: 'relative'}}>
              <div style={{position: 'absolute', bottom: '5px', left: '10px', fontSize: '0.75rem'}}>Low-lying (Water pooling risk)</div>
            </div>
            <div style={{flex: 1, background: 'linear-gradient(to bottom right, #444, #111)', height: '80px', borderRadius: '8px', position: 'relative'}}>
              <div style={{position: 'absolute', top: '5px', right: '10px', fontSize: '0.75rem'}}>Sloped (Runoff risk)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
         {/* Feature 6: Atmospheric River */}
         <div className="panel" style={{border: '1px solid #0ea5e9', background: 'rgba(14, 165, 233, 0.02)'}}>
            <h2 style={{color: '#0ea5e9'}}>🌊 Atmospheric River Interception Alert</h2>
            <p className="info-desc">ERA5 wind/humidity data projecting massive moisture transport bands.</p>

            {!showAtmos && !isProcessingAtmos && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingAtmos(true); setTimeout(() => { setIsProcessingAtmos(false); setShowAtmos(true); }, 2000); }}
                   style={{padding: '12px 24px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Scan Global Moisture Vectors
                 </button>
              </div>
            )}

            {isProcessingAtmos && (
              <div style={{marginTop: '25px', padding: '30px', textAlign: 'center', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>🌎</div>
                 <div style={{color: '#0ea5e9', marginTop: '10px'}}>Simulating planetary jet streams...</div>
              </div>
            )}

            {showAtmos && atmospheric && (
               <div style={{marginTop: '15px'}}>
                  <div style={{height: '100px', background: '#111', borderRadius: '8px', overflow: 'hidden', position: 'relative', border: '1px solid #0ea5e9'}}>
                     <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.5), transparent)', width: '300%', animation: 'slide 3s infinite linear'}}></div>
                     <div style={{position: 'absolute', bottom: '10px', right: '10px', color: '#0ea5e9', fontSize: '0.75rem', fontWeight: 'bold'}}>Moisture Plume Active</div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px'}}>
                     <div>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Plume Identity</div>
                        <div style={{fontWeight: 'bold', color: '#0ea5e9'}}>{atmospheric.river_name}</div>
                     </div>
                     <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Arrival</div>
                        <div style={{fontWeight: 'bold'}}>{atmospheric.arrival_days} Days</div>
                     </div>
                  </div>
                  <div style={{marginTop: '10px', padding: '10px', background: 'rgba(14, 165, 233, 0.1)', borderLeft: '4px solid #0ea5e9', fontSize: '0.85rem'}}>
                     {atmospheric.recommendation} ({atmospheric.expected_precipitation_mm}mm expected)
                  </div>
               </div>
            )}
         </div>

         {/* Feature 10: Disease Vector Propagation */}
         <div className="panel" style={{border: '1px solid #d946ef', background: 'rgba(217, 70, 239, 0.02)'}}>
            <h2 style={{color: '#d946ef'}}>🦠 Cross-Farm Disease Propagation</h2>
            <p className="info-desc">Simulating fungal spore spread based on spectral anomaly origins + ERA5 wind.</p>

            {!showDisease && !isProcessingDisease && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingDisease(true); setTimeout(() => { setIsProcessingDisease(false); setShowDisease(true); }, 2000); }}
                   style={{padding: '12px 24px', background: '#d946ef', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Simulate Pathogen Vector
                 </button>
              </div>
            )}

            {isProcessingDisease && (
              <div style={{marginTop: '25px', padding: '30px', textAlign: 'center', background: 'rgba(217, 70, 239, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>💨</div>
                 <div style={{color: '#d946ef', marginTop: '10px'}}>Calculating spore drift trajectories...</div>
              </div>
            )}

            {showDisease && disease && (
               <div style={{marginTop: '15px'}}>
                  <div style={{height: '100px', background: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid #d946ef'}}>
                     <div style={{position: 'absolute', top: '50%', left: '20%', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px #ef4444'}}></div>
                     <div style={{position: 'absolute', top: '30%', left: '60%', width: '10px', height: '10px', background: '#d946ef', borderRadius: '50%', transform: 'translate(-50%, -50%)', animation: 'pulse 1s infinite'}}></div>
                     <div style={{position: 'absolute', top: '70%', left: '70%', width: '10px', height: '10px', background: '#d946ef', borderRadius: '50%', transform: 'translate(-50%, -50%)', animation: 'pulse 1s infinite'}}></div>
                     <div style={{position: 'absolute', top: '50%', left: '45%', fontSize: '1.2rem'}}>→💨</div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                     <div>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Pathogen</div>
                        <div style={{fontWeight: 'bold', color: '#ef4444'}}>{disease.disease_type}</div>
                     </div>
                     <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Wind Vector</div>
                        <div style={{fontWeight: 'bold', color: '#d946ef'}}>{disease.wind_vector}</div>
                     </div>
                  </div>
                  <div style={{marginTop: '10px', padding: '10px', background: 'rgba(217, 70, 239, 0.1)', borderLeft: '4px solid #d946ef', fontSize: '0.85rem'}}>
                     <strong>Fields at Risk (within {disease.time_to_infection_hours}h):</strong> {disease.fields_at_risk.join(', ')}
                  </div>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default GeospatialTools;
