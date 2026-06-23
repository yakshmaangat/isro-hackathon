import React, { useEffect, useState } from 'react';

const FarmerAdvisory = ({ farmId, lang = 'hindi' }) => {
  const [advisory, setAdvisory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/advisory/${farmId}?lang=${lang}`)
      .then(res => res.json())
      .then(data => setAdvisory(data));
  }, [farmId, lang]);

  if (!advisory) return <div>Loading advisory...</div>;

  return (
    <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '8px', padding: '15px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{width: '40px', height: '40px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>📱</div>
          <div>
            <div style={{fontWeight: 'bold', color: 'var(--text-main)'}}>WhatsApp Alert</div>
            <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Auto-dispatched via PM-KISAN</div>
          </div>
        </div>
      </div>

      <div style={{background: '#122a22', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #25D366', fontFamily: 'sans-serif'}}>
        <p style={{fontSize: '1rem', color: '#fff', marginBottom: '10px', lineHeight: '1.6'}}>
          {lang === 'hindi' ? advisory.sms_hindi : lang === 'marathi' ? "शेतकरी मित्रा, तुमच्या शेतात पाण्याची तीव्र कमतरता आहे. कृपया पुढील 24 तासांत 35-45 मिमी सिंचन करा." : advisory.sms_english}
        </p>
      </div>

      <div style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--panel-border)', paddingTop: '15px'}}>
        <div>
          <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Projected Yield Impact</div>
          <div style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444'}}>
            {advisory.yield_forecast_deviation_pct}% Deviation
          </div>
        </div>
        <button className="action-btn" style={{margin: 0}}>Send via Twilio SMS</button>
      </div>
    </div>
  );
};

export default FarmerAdvisory;
