import React from 'react';

const GeospatialTools = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
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

    </div>
  );
};

export default GeospatialTools;
