import React, { useEffect, useState } from 'react';

const DistrictSummary = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/analysis/district')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div>Loading district data...</div>;

  return (
    <div className="panel district-panel">
      <h2>District-Level Aggregation View</h2>
      <h3 style={{color: 'var(--accent-light)', marginBottom: '15px'}}>{data.district_name}</h3>
      
      <div className="metrics-row" style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <div className="info-card" style={{flex: 1}}>
          <div className="info-title">Total Area Monitored</div>
          <div className="info-value">{data.total_area_ha.toLocaleString()} ha</div>
        </div>
        <div className="info-card" style={{flex: 1, borderColor: '#ef4444'}}>
          <div className="info-title">Severe Stress Area</div>
          <div className="info-value" style={{color: '#ef4444'}}>{data.severe_stress_ha.toLocaleString()} ha</div>
        </div>
        <div className="info-card" style={{flex: 1, borderColor: '#38bdf8'}}>
          <div className="info-title">Estimated Water Deficit</div>
          <div className="info-value blue">{data.water_deficit_m3.toLocaleString()} m³</div>
        </div>
      </div>

      <div className="info-card">
        <div className="info-title">Prioritized Intervention Blocks</div>
        <ul style={{marginLeft: '20px', marginTop: '10px', color: 'var(--text-main)'}}>
          {data.prioritized_interventions.map((block, i) => (
            <li key={i} style={{marginBottom: '5px', color: block.includes('High') ? '#ef4444' : 'inherit'}}>{block}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DistrictSummary;
