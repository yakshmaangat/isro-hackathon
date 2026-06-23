import React, { useEffect, useState } from 'react';
import DistrictSummary from './DistrictSummary';

const PolicyIntegration = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Reusing the District Summary we built earlier */}
      <DistrictSummary />

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

    </div>
  );
};

export default PolicyIntegration;
