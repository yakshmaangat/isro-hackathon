import React, { useEffect, useState } from 'react';
import DistrictSummary from './DistrictSummary';

const PolicyIntegration = () => {
  const [illegalCrops, setIllegalCrops] = useState([]);
  const [fpoSummary, setFpoSummary] = useState(null);
  const [dark, setDark] = useState([]);
  const [triage, setTriage] = useState(null);

  const [showIllegal, setShowIllegal] = useState(false);
  const [isProcessingIllegal, setIsProcessingIllegal] = useState(false);

  const [showFPO, setShowFPO] = useState(false);
  const [isProcessingFPO, setIsProcessingFPO] = useState(false);

  const [showDark, setShowDark] = useState(false);
  const [isProcessingDark, setIsProcessingDark] = useState(false);

  const [showTriage, setShowTriage] = useState(false);
  const [isProcessingTriage, setIsProcessingTriage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/analysis/illegal-crops').then(r => r.json()).then(setIllegalCrops);
    fetch('http://localhost:8000/api/analysis/fpo-summary').then(r => r.json()).then(setFpoSummary);
    fetch('http://localhost:8000/api/analysis/dark-fields').then(r => r.json()).then(setDark);
    fetch('http://localhost:8000/api/analysis/humanitarian-triage').then(r => r.json()).then(setTriage);
  }, []);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Reusing the District Summary we built earlier */}
      <DistrictSummary />

      <div className="grid-2">
        {/* Feature 4: Illegal Crop Detection Layer */}
        <div className="panel" style={{border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.02)'}}>
          <h2 style={{color: '#ef4444'}}>🚨 Illegal Crop / Fraud Detection</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>AI Classification vs District Sown Area Declarations.</p>
          
          {!showIllegal && !isProcessingIllegal && (
            <div style={{textAlign: 'center', padding: '20px', border: '1px dashed #ef4444', borderRadius: '8px'}}>
               <button 
                 onClick={() => {
                   setIsProcessingIllegal(true);
                   setTimeout(() => { setIsProcessingIllegal(false); setShowIllegal(true); }, 1500);
                 }}
                 style={{padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Cross-Reference Declarations
               </button>
            </div>
          )}

          {isProcessingIllegal && (
            <div style={{textAlign: 'center', padding: '30px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>🔍</div>
               <div style={{color: '#ef4444', marginTop: '10px'}}>Validating with District API...</div>
            </div>
          )}

          {showIllegal && (
            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem'}}>
              <thead>
                <tr style={{borderBottom: '1px solid #444', color: 'var(--text-muted)'}}>
                  <th style={{textAlign: 'left', padding: '8px 4px'}}>Field ID</th>
                  <th style={{padding: '8px 4px'}}>Declared</th>
                  <th style={{padding: '8px 4px'}}>AI Detected</th>
                  <th style={{padding: '8px 4px'}}>Flag</th>
                </tr>
              </thead>
              <tbody>
                {illegalCrops.map((ic, i) => (
                  <tr key={i} style={{background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid #444'}}>
                    <td style={{padding: '10px 4px', fontWeight: 'bold'}}>{ic.field_id}</td>
                    <td style={{padding: '10px 4px', textAlign: 'center'}}>{ic.declared_crop}</td>
                    <td style={{padding: '10px 4px', textAlign: 'center', color: '#f59e0b', fontWeight: 'bold'}}>{ic.detected_crop}</td>
                    <td style={{padding: '10px 4px', textAlign: 'center', color: '#ef4444', fontWeight: 'bold'}}>{ic.flag_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Feature 10: Multi-Farm Cooperative View */}
        <div className="panel" style={{border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.02)'}}>
          <h2 style={{color: '#3b82f6'}}>🤝 Multi-Farm FPO Cooperative View</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Staggered group irrigation schedules for limited canal flows.</p>
          
          {!showFPO && !isProcessingFPO && (
            <div style={{textAlign: 'center', padding: '20px', border: '1px dashed #3b82f6', borderRadius: '8px'}}>
               <button 
                 onClick={() => {
                   setIsProcessingFPO(true);
                   setTimeout(() => { setIsProcessingFPO(false); setShowFPO(true); }, 2000);
                 }}
                 style={{padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
               >
                 Generate Staggered Schedule
               </button>
            </div>
          )}

          {isProcessingFPO && (
            <div style={{textAlign: 'center', padding: '30px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px'}}>
               <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>⚙️</div>
               <div style={{color: '#3b82f6', marginTop: '10px'}}>Balancing canal flow limits & calculating water demand...</div>
            </div>
          )}

          {showFPO && fpoSummary && (
            <div style={{background: '#111', padding: '15px', borderRadius: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #333'}}>
                <div>
                  <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Farmer Producer Org</div>
                  <div style={{fontWeight: 'bold', color: '#3b82f6'}}>{fpoSummary.fpo_name}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Total Farmers</div>
                  <div style={{fontWeight: 'bold'}}>{fpoSummary.total_farmers}</div>
                </div>
              </div>
              <div style={{marginBottom: '15px'}}>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>Collective Water Demand</div>
                <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981'}}>{fpoSummary.collective_water_demand_m3.toLocaleString()} m³</div>
              </div>
              <div>
                <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '5px'}}>Optimized Staggered Schedule (Canal Limits)</div>
                <ul style={{margin: 0, paddingLeft: '20px', fontSize: '0.85rem'}}>
                  {fpoSummary.optimal_staggered_schedule.map((sch, i) => (
                    <li key={i} style={{marginBottom: '4px'}}>{sch}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid-2">
        {/* PM-FASAL Integration Mock */}
        <div className="panel">
          <h2>📑 PM-FASAL Insurance Integration</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Automated damage assessment workflow.</p>
          <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '15px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: 'var(--text-muted)'}}>Claim ID:</span>
              <strong>CLM-2026-992A</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{color: 'var(--text-muted)'}}>Farmer ID:</span>
              <strong>FARM_0127 (Ramesh Kumar)</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
              <span style={{color: 'var(--text-muted)'}}>Satellite Stress Severity:</span>
              <strong style={{color: '#ef4444'}}>Severe (82%)</strong>
            </div>
            <button style={{width: '100%', padding: '10px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
              Auto-Approve Preliminary Claim
            </button>
            <div style={{textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px'}}>
              Linked directly to PM Fasal Bima Yojana API
            </div>
          </div>
        </div>

        {/* Bhuvan Export */}
        <div className="panel" style={{display: 'flex', flexDirection: 'column'}}>
          <h2>🌐 ISRO Bhuvan Geoportal Export</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>WMS-compatible layer export for national infrastructure.</p>
          
          <div style={{flex: 1, border: '1px solid #333', borderRadius: '8px', background: 'url(https://bhuvan-app1.nrsc.gov.in/bhuvan2d/bhuvan/images/bhuvan_logo.png) no-repeat center', backgroundSize: 'contain', backgroundColor: '#fff', padding: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
            <button style={{background: '#1a56db', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.3)'}}>
              Export WMS Layer to Bhuvan
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
         {/* Feature 11: The Invisible Farm */}
         <div className="panel" style={{border: '1px solid #64748b', background: 'rgba(100, 116, 139, 0.02)'}}>
            <h2 style={{color: '#94a3b8'}}>🕵️ The "Invisible Farm" (Dark Fields)</h2>
            <p className="info-desc">Isolating un-registered farms using optical/radar vs PM-KISAN database.</p>

            {!showDark && !isProcessingDark && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingDark(true); setTimeout(() => { setIsProcessingDark(false); setShowDark(true); }, 2000); }}
                   style={{padding: '10px 20px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Scan for Shadow Farms
                 </button>
              </div>
            )}

            {isProcessingDark && (
              <div style={{marginTop: '25px', padding: '20px', textAlign: 'center', background: 'rgba(100, 116, 139, 0.05)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'spin 2s linear infinite'}}>📡</div>
                 <div style={{color: '#94a3b8', marginTop: '10px'}}>Cross-referencing spectral geometries with land registries...</div>
              </div>
            )}

            {showDark && (
               <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {dark.map((d, i) => (
                     <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', borderLeft: '4px solid #64748b'}}>
                        <div>
                           <div style={{fontSize: '0.8rem', fontWeight: 'bold'}}>{d.crop_type} ({d.estimated_area_ha} ha)</div>
                           <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>{d.coordinates.join(', ')}</div>
                        </div>
                        <div style={{textAlign: 'right', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold'}}>{d.status}</div>
                     </div>
                  ))}
                  <div style={{marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center'}}>
                     These farmers are excluded from institutional credit and aid.
                  </div>
               </div>
            )}
         </div>

         {/* Feature 12: Humanitarian Triage Card */}
         <div className="panel" style={{border: '2px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)'}}>
            <h2 style={{color: '#ef4444'}}>🏥 Humanitarian Triage Response</h2>
            <p className="info-desc">Synthesis of 100% crop loss + zero groundwater + poverty index.</p>

            {!showTriage && !isProcessingTriage && (
              <div style={{marginTop: '25px', textAlign: 'center'}}>
                 <button 
                   onClick={() => { setIsProcessingTriage(true); setTimeout(() => { setIsProcessingTriage(false); setShowTriage(true); }, 2500); }}
                   style={{padding: '12px 24px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'}}
                 >
                   Run Nationwide Triage Engine
                 </button>
              </div>
            )}

            {isProcessingTriage && (
              <div style={{marginTop: '25px', padding: '30px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px'}}>
                 <div style={{fontSize: '2rem', animation: 'pulse 0.5s infinite'}}>🚨</div>
                 <div style={{color: '#ef4444', marginTop: '10px'}}>Correlating absolute failure zones...</div>
              </div>
            )}

            {showTriage && triage && (
               <div style={{marginTop: '15px'}}>
                  <div style={{background: '#451a1a', padding: '15px', borderRadius: '8px', borderLeft: '6px solid #ef4444', boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}}>
                     <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #7f1d1d'}}>
                        <div>
                           <div style={{fontSize: '0.7rem', color: '#fca5a5'}}>Urgent Case</div>
                           <div style={{fontWeight: 'bold', color: '#fff'}}>{triage.farmer_id}</div>
                        </div>
                        <div style={{textAlign: 'right'}}>
                           <div style={{fontSize: '0.7rem', color: '#fca5a5'}}>Vulnerability Score</div>
                           <div style={{fontWeight: 'bold', color: '#ef4444', fontSize: '1.2rem'}}>{(triage.vulnerability_score*100).toFixed(0)} / 100</div>
                        </div>
                     </div>
                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px'}}>
                        <span style={{color: '#fca5a5'}}>Groundwater Runway</span><strong style={{color: '#ef4444'}}>{triage.groundwater_runway} Seasons Left</strong>
                     </div>
                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '10px'}}>
                        <span style={{color: '#fca5a5'}}>100% Crop Loss</span><strong style={{color: '#ef4444'}}>Verified (SAR + Optical)</strong>
                     </div>
                     <div style={{background: '#7f1d1d', color: '#fff', padding: '10px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem'}}>
                        {triage.triage_action}
                     </div>
                     <div style={{marginTop: '10px', fontSize: '0.75rem', color: '#fca5a5', lineHeight: '1.4'}}>
                        {triage.details}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default PolicyIntegration;
