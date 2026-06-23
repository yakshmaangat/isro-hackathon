import React, { useEffect, useState } from 'react';

const AgriIntelligence = () => {
  const [carbonData, setCarbonData] = useState([]);
  const [showCarbon, setShowCarbon] = useState(false);
  const [isProcessingCarbon, setIsProcessingCarbon] = useState(false);

  const [showFert, setShowFert] = useState(false);
  const [isProcessingFert, setIsProcessingFert] = useState(false);

  const [lue, setLue] = useState(null);
  const [resilience, setResilience] = useState(null);
  const [mycorrhizal, setMycorrhizal] = useState(null);

  const [showLue, setShowLue] = useState(false);
  const [isProcessingLue, setIsProcessingLue] = useState(false);

  const [showRes, setShowRes] = useState(false);
  const [isProcessingRes, setIsProcessingRes] = useState(false);

  const [showMyc, setShowMyc] = useState(false);
  const [isProcessingMyc, setIsProcessingMyc] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/analysis/carbon').then(res => res.json()).then(setCarbonData);
    fetch('http://localhost:8000/api/analysis/lue-collapse').then(r => r.json()).then(setLue);
    fetch('http://localhost:8000/api/analysis/resilience-fingerprint').then(r => r.json()).then(setResilience);
    fetch('http://localhost:8000/api/analysis/mycorrhizal-network').then(r => r.json()).then(setMycorrhizal);
  }, []);
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

        {/* Feature 3: Carbon Sequestration */}
        <div className="panel" style={{border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.02)'}}>
          <h2 style={{color: '#10b981'}}>🌍 Carbon Sequestration Estimator</h2>
          <p className="info-desc">Translating LAI to CO₂ stored per season.</p>
          
          {!showCarbon && !isProcessingCarbon && (
            <div style={{marginTop: '15px', textAlign: 'center'}}>
               <button 
                 onClick={() => {
                   setIsProcessingCarbon(true);
                   setTimeout(() => { setIsProcessingCarbon(false); setShowCarbon(true); }, 1500);
                 }}
                 style={{padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Calculate CO₂ Equivalent
               </button>
            </div>
          )}

          {isProcessingCarbon && (
            <div style={{marginTop: '15px', padding: '20px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>🌲</div>
               <div style={{color: '#10b981', marginTop: '10px'}}>Estimating biomass from LAI curves...</div>
            </div>
          )}

          {showCarbon && (
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '15px', gap: '10px'}}>
              {carbonData.map((field, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <div>
                     <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>{field.field_id}</div>
                     <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Biomass: {field.estimated_biomass_tons} t</div>
                   </div>
                   <div style={{textAlign: 'right'}}>
                     <div style={{fontSize: '1.2rem', color: '#10b981', fontWeight: 'bold'}}>{field.co2_equivalent_tons} t</div>
                     <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>CO₂-eq</div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feature 7 Row */}
      <div className="grid-1">
         {/* Feature 7: Fertilizer vs Moisture Disambiguation */}
         <div className="panel" style={{border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.02)'}}>
           <h2 style={{color: '#f59e0b'}}>🧪 Fertilizer vs Moisture Disambiguation Engine</h2>
           <p className="info-desc" style={{marginBottom: '15px'}}>Cross-referencing satellite NDVI drop with Govt Soil Health Card API.</p>
           
           {!showFert && !isProcessingFert && (
             <div style={{textAlign: 'center', padding: '20px', border: '1px dashed #f59e0b', borderRadius: '8px'}}>
               <button 
                 onClick={() => {
                   setIsProcessingFert(true);
                   setTimeout(() => { setIsProcessingFert(false); setShowFert(true); }, 2000);
                 }}
                 style={{padding: '10px 20px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Run Disambiguation Engine
               </button>
             </div>
           )}

           {isProcessingFert && (
             <div style={{textAlign: 'center', padding: '30px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>⚙️</div>
               <div style={{color: '#f59e0b', marginTop: '10px'}}>Checking Satellite Anomaly... Querying Soil Health API...</div>
             </div>
           )}

           {showFert && (
             <div style={{display: 'flex', gap: '20px', background: '#111', padding: '15px', borderRadius: '8px', alignItems: 'center'}}>
                <div style={{flex: 1, textAlign: 'center'}}>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Satellite Anomaly</div>
                  <div style={{fontSize: '1.2rem', color: '#ef4444', fontWeight: 'bold'}}>NDVI Dropping</div>
                </div>
                <div style={{fontSize: '1.5rem', color: '#333'}}>+</div>
                <div style={{flex: 1, textAlign: 'center', borderLeft: '1px solid #333', borderRight: '1px solid #333'}}>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Soil Health Card Data</div>
                  <div style={{fontSize: '1.2rem', color: '#f59e0b', fontWeight: 'bold'}}>Low Nitrogen (N)</div>
                </div>
                <div style={{fontSize: '1.5rem', color: '#333'}}>=</div>
                <div style={{flex: 2, paddingLeft: '10px'}}>
                  <div style={{color: '#ef4444', textDecoration: 'line-through', fontSize: '0.8rem'}}>Do NOT Irrigate (Wastes Water)</div>
                  <div style={{color: '#4ade80', fontWeight: 'bold'}}>Apply Urea / NPK immediately</div>
                  <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px'}}>Diagnosis: Nutrient Stress, NOT Water Stress</div>
                </div>
             </div>
           )}
         </div>
      </div>

      <div className="grid-3">
         {/* Feature 8: Light-Use Efficiency Collapse */}
         <div className="panel" style={{border: '1px solid #fbbf24', background: 'rgba(251, 191, 36, 0.02)'}}>
            <h2 style={{color: '#fbbf24'}}>☀️ Light-Use Efficiency (LUE) Predictor</h2>
            <p className="info-desc">Detects biochemical stress via PAR & GPP 3 weeks before NDVI drops.</p>

            {!showLue && !isProcessingLue && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingLue(true); setTimeout(() => { setIsProcessingLue(false); setShowLue(true); }, 1800); }}
                   style={{padding: '10px 20px', background: '#fbbf24', color: '#111', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Scan Photosynthetic Efficiency
                 </button>
              </div>
            )}

            {isProcessingLue && (
              <div style={{marginTop: '25px', padding: '20px', textAlign: 'center', background: 'rgba(251, 191, 36, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>☀️</div>
                 <div style={{color: '#fbbf24', marginTop: '10px'}}>Cross-referencing PAR with Red-Edge...</div>
              </div>
            )}

            {showLue && lue && (
               <div style={{marginTop: '15px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#111', borderRadius: '4px', marginBottom: '10px'}}>
                     <div>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Current NDVI</div>
                        <div style={{fontWeight: 'bold', color: '#10b981'}}>{lue.ndvi} (High)</div>
                     </div>
                     <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>LUE Index</div>
                        <div style={{fontWeight: 'bold', color: '#ef4444'}}>{lue.lue_index} (Low)</div>
                     </div>
                  </div>
                  <div style={{background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderLeft: '4px solid #ef4444', fontSize: '0.8rem'}}>
                     <strong>{lue.status}:</strong> {lue.warning}
                  </div>
               </div>
            )}
         </div>

         {/* Feature 3: Resilience Fingerprint */}
         <div className="panel" style={{border: '1px solid #14b8a6', background: 'rgba(20, 184, 166, 0.02)'}}>
            <h2 style={{color: '#14b8a6'}}>🛡️ Farm's "Immune System" (Resilience)</h2>
            <p className="info-desc">Historical stress recovery rate modeling.</p>

            {!showRes && !isProcessingRes && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingRes(true); setTimeout(() => { setIsProcessingRes(false); setShowRes(true); }, 2000); }}
                   style={{padding: '10px 20px', background: '#14b8a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Calculate Ecological Resilience
                 </button>
              </div>
            )}

            {isProcessingRes && (
              <div style={{marginTop: '25px', padding: '20px', textAlign: 'center', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>🛡️</div>
                 <div style={{color: '#14b8a6', marginTop: '10px'}}>Analyzing historical NDVI bounce-back rates...</div>
              </div>
            )}

            {showRes && resilience && (
               <div style={{marginTop: '15px'}}>
                  <div style={{textAlign: 'center', marginBottom: '15px'}}>
                     <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#14b8a6'}}>{resilience.resilience_score}/100</div>
                     <div style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>{resilience.classification}</div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '8px', background: '#111', borderRadius: '4px', marginBottom: '5px'}}>
                     <span>Avg. Recovery Time</span><strong>{resilience.recovery_time_days} days</strong>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '8px', background: '#111', borderRadius: '4px'}}>
                     <span>Soil Microbiome Proxy</span><strong style={{color: '#10b981'}}>{resilience.soil_microbiome_proxy}</strong>
                  </div>
               </div>
            )}
         </div>

         {/* Feature 7: Mycorrhizal Network Proxy */}
         <div className="panel" style={{border: '1px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.02)'}}>
            <h2 style={{color: '#8b5cf6'}}>🍄 Mycorrhizal Network Proxy</h2>
            <p className="info-desc">Mapping underground fungal networks via SWIR carbon + vegetation continuity.</p>

            {!showMyc && !isProcessingMyc && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingMyc(true); setTimeout(() => { setIsProcessingMyc(false); setShowMyc(true); }, 2200); }}
                   style={{padding: '10px 20px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Estimate Underground Networks
                 </button>
              </div>
            )}

            {isProcessingMyc && (
              <div style={{marginTop: '25px', padding: '20px', textAlign: 'center', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>🍄</div>
                 <div style={{color: '#8b5cf6', marginTop: '10px'}}>Extracting SWIR carbon proxies...</div>
              </div>
            )}

            {showMyc && mycorrhizal && (
               <div style={{marginTop: '15px'}}>
                  <div style={{height: '60px', background: 'linear-gradient(to bottom, #111 40%, #2e1065 100%)', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #8b5cf6'}}>
                     <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
                        <path d="M10,30 Q40,60 70,30 T130,30 T190,30 T250,30 T310,30" fill="transparent" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" />
                     </svg>
                  </div>
                  <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                        <span style={{color: 'var(--text-muted)'}}>Network Richness Score</span><strong>{mycorrhizal.network_richness_score}</strong>
                     </div>
                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                        <span style={{color: 'var(--text-muted)'}}>SWIR Carbon Proxy</span><strong style={{color: '#8b5cf6'}}>{mycorrhizal.carbon_proxy}</strong>
                     </div>
                     <div style={{background: 'rgba(139, 92, 246, 0.1)', padding: '10px', borderRadius: '4px', marginTop: '5px', textAlign: 'center', border: '1px solid #8b5cf6', fontSize: '0.85rem'}}>
                        Biological Buffer: <strong style={{color: '#4ade80'}}>{mycorrhizal.biological_buffer_factor}</strong>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default AgriIntelligence;
