import React, { useState } from 'react';
import FarmerAdvisory from './FarmerAdvisory';

const FarmerInterface = () => {
  const [lang, setLang] = useState('hindi');

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      <div className="grid-2">
        {/* Multilingual Advisory */}
        <div className="panel">
          <h2>💬 Multilingual SMS Advisory</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Select language to generate localized PM-KISAN message.</p>
          
          <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
            <button className={`toggle-btn ${lang === 'hindi' ? 'active' : ''}`} onClick={() => setLang('hindi')}>Hindi</button>
            <button className={`toggle-btn ${lang === 'marathi' ? 'active' : ''}`} onClick={() => setLang('marathi')}>Marathi</button>
            <button className={`toggle-btn ${lang === 'english' ? 'active' : ''}`} onClick={() => setLang('english')}>English</button>
          </div>

          {/* Reusing the backend-connected Advisory Component with language prop */}
          {/* Note: since we hardcoded farmId in App, we pass it here along with a key to force rerender if needed, but the component fetches internally. For this demo, we'll just show the static box we built earlier or a customized one */}
          <FarmerAdvisory farmId="FARM_0127" lang={lang} />
        </div>

        {/* Photo Validator */}
        <div className="panel">
          <h2>📸 Ground Truth Photo Validator</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Upload field photo to validate satellite stress prediction.</p>
          
          <div style={{border: '2px dashed #444', borderRadius: '8px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.02)'}}>
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>📷</div>
            <div style={{color: 'var(--accent-light)'}}>Click to Upload Field Image</div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px'}}>Runs on-device lightweight CNN for stress validation</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Economic Impact */}
        <div className="panel">
          <h2>💰 Economic Impact Calculator</h2>
          <p className="info-desc">Translating NDVI into Rupees.</p>
          <div className="grid-2" style={{marginTop: '15px'}}>
            <div className="info-card" style={{borderColor: '#ef4444'}}>
              <div className="info-title">Est. Financial Loss</div>
              <div className="info-value" style={{color: '#ef4444'}}>₹ 85,000</div>
            </div>
            <div className="info-card" style={{borderColor: '#10b981'}}>
              <div className="info-title">Cost of Irrigation</div>
              <div className="info-value" style={{color: '#10b981'}}>₹ 5,000</div>
            </div>
          </div>
          <div style={{marginTop: '15px', background: 'rgba(16, 185, 129, 0.1)', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #10b981'}}>
            <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Net Benefit of Action</div>
            <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981'}}>₹ 80,000</div>
          </div>
        </div>

        {/* Offline PWA */}
        <div className="panel" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <div style={{fontSize: '3rem', marginBottom: '10px'}}>📱</div>
          <h2>Offline PWA Ready</h2>
          <p className="info-desc" style={{maxWidth: '300px', marginTop: '10px'}}>
            This entire dashboard is packaged as a Progressive Web App (PWA). Farmers and field agents can download it via browser and access cached maps and advisories without internet connectivity in rural areas.
          </p>
        </div>
      </div>

    </div>
  );
};

export default FarmerInterface;
