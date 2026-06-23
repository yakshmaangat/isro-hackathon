import React, { useEffect, useState } from 'react';

const FarmerAdvisory = ({ farmId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/advisory/${farmId}`)
      .then(res => res.json())
      .then(d => setData(d));
  }, [farmId]);

  if (!data) return <div>Loading advisory...</div>;

  return (
    <div className="panel advisory-panel" style={{display: 'flex', gap: '20px'}}>
      
      <div className="info-card" style={{flex: 1, backgroundColor: '#0b1610', borderColor: '#10b981'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
          <div style={{background: '#10b981', padding: '5px 10px', borderRadius: '20px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold'}}>SMS / WhatsApp Output</div>
          <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Farmer ID: FRM_9921</div>
        </div>
        
        <div style={{background: '#e0f2fe', color: '#0f172a', padding: '15px', borderRadius: '12px 12px 12px 0', fontSize: '1rem', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'}}>
          {data.sms_hindi}
        </div>
        <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic'}}>
          Translation: {data.sms_english}
        </div>
      </div>

      <div className="info-card" style={{flex: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div className="info-title">Yield Forecast Deviation</div>
        <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: data.yield_forecast_deviation_pct < 0 ? '#ef4444' : '#10b981', marginTop: '10px'}}>
          {data.yield_forecast_deviation_pct}%
        </div>
        <div className="info-desc">From district average</div>
      </div>

    </div>
  );
};

export default FarmerAdvisory;
