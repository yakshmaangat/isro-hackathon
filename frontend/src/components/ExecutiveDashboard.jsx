import React, { useEffect, useState } from 'react';
import MapVisualization from './MapVisualization';
import IrrigationPanel from './IrrigationPanel';

const ExecutiveDashboard = ({ dateIdx, season }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [isHistorical, setIsHistorical] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const farmId = "FARM_0127";

  useEffect(() => {
    fetch(`http://localhost:8000/api/analysis/dashboard/${farmId}?date_idx=${dateIdx}&season=${season}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));
      
    fetch('http://localhost:8000/api/analysis/counterfactual')
      .then(res => res.json())
      .then(data => setHistoricalData(data));
  }, [dateIdx, season]);

  let cropLegends = [];
  if (season === "Kharif") {
    cropLegends = [
      { color: '#e6f598', label: 'Rice' },
      { color: '#fdae61', label: 'Maize' },
      { color: '#f46d43', label: 'Cotton' },
      { color: '#d53e4f', label: 'Groundnut' },
      { color: '#abdda4', label: 'Soybean' }
    ];
  } else if (season === "Rabi") {
    cropLegends = [
      { color: '#fee08b', label: 'Wheat' },
      { color: '#ffffbf', label: 'Mustard' },
      { color: '#d53e4f', label: 'Gram' },
      { color: '#e6f598', label: 'Barley' },
      { color: '#abdda4', label: 'Peas' }
    ];
  } else {
    cropLegends = [
      { color: '#f46d43', label: 'Watermelon' },
      { color: '#fdae61', label: 'Muskmelon' },
      { color: '#abdda4', label: 'Cucumber' },
      { color: '#c7e9c0', label: 'Bitter Gourd' },
      { color: '#d53e4f', label: 'Moong' }
    ];
  }

  const confidenceLegends = [
    { color: '#1a9850', label: 'High (>85%)' },
    { color: '#f59e0b', label: 'Med (70-85%)' },
    { color: '#ef4444', label: 'Low (<70%)' }
  ];

  const stressLegends = [
    { color: '#1a9850', label: 'No Stress' },
    { color: '#91cf60', label: 'Low Stress' },
    { color: '#d9ef8b', label: 'Moderate Stress' },
    { color: '#fc8d59', label: 'High Stress' },
    { color: '#d73027', label: 'Severe Stress' }
  ];

  const predictiveLegends = [
    { color: '#1a9850', label: 'Clear' },
    { color: '#f59e0b', label: 'Warning (7-Day)' }
  ];

  if (!dashboardData) return <div style={{padding: '20px'}}>Loading dashboard...</div>;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      
      {/* Feature 9: Historical Counterfactual Simulator */}
      <div style={{background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h3 style={{color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '1.2rem'}}>⏳</span> Historical Counterfactual Simulator
          </h3>
          <p style={{margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
            Validate predictive models against known past drought events.
          </p>
        </div>
        <button 
          onClick={() => {
            if (isHistorical) {
              setIsHistorical(false);
              return;
            }
            setIsSimulating(true);
            setTimeout(() => {
              setIsSimulating(false);
              setIsHistorical(true);
            }, 1500);
          }}
          disabled={isSimulating}
          style={{padding: '8px 16px', background: isHistorical ? '#ef4444' : '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px', cursor: isSimulating ? 'not-allowed' : 'pointer', fontWeight: 'bold'}}
        >
          {isSimulating ? 'Running Inference...' : isHistorical ? 'Exit Archival Mode' : 'Simulate 2023 Drought'}
        </button>
      </div>

      {isSimulating && (
        <div style={{background: 'rgba(56, 189, 248, 0.05)', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <div style={{fontSize: '2rem', animation: 'pulse 1s infinite'}}>⏳</div>
          <div style={{color: '#38bdf8', marginTop: '10px'}}>Fetching archival Sentinel data & running models...</div>
        </div>
      )}

      {isHistorical && !isSimulating && historicalData && (
        <div style={{display: 'flex', gap: '20px', background: 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
          <div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Event Simulated</div>
            <div style={{fontWeight: 'bold', color: '#ef4444'}}>{historicalData.event_name}</div>
          </div>
          <div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Early Warning Advantage</div>
            <div style={{fontWeight: 'bold'}}>{historicalData.stress_flagged_days_early} Days Earlier</div>
          </div>
          <div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Estimated Yield Saved</div>
            <div style={{fontWeight: 'bold', color: '#10b981'}}>+{historicalData.yield_saved_pct}%</div>
          </div>
          <div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Area Protected</div>
            <div style={{fontWeight: 'bold'}}>{historicalData.hectares_protected} Hectares</div>
          </div>
        </div>
      )}

      {/* Executive KPIs */}
      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="info-card" style={{ borderLeft: '4px solid var(--accent-light)' }}>
          <div className="info-title">Model Accuracy</div>
          <div className="info-value">{dashboardData.crop_type_accuracy}%</div>
          <div className="info-desc" style={{ color: 'var(--accent-light)' }}>+1.2% from last week</div>
        </div>
        <div className="info-card" style={{ borderLeft: '4px solid #38bdf8' }}>
          <div className="info-title">Total Area Monitored</div>
          <div className="info-value">1,240 Ha</div>
          <div className="info-desc" style={{ color: '#38bdf8' }}>100% Coverage</div>
        </div>
        <div className="info-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="info-title">Severe Stress Fields</div>
          <div className="info-value">14</div>
          <div className="info-desc" style={{ color: '#ef4444' }}>Critical attention required</div>
        </div>
        <div className="info-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="info-title">Yield Forecast</div>
          <div className="info-value">-4.2%</div>
          <div className="info-desc" style={{ color: '#f59e0b' }}>Est. deviation from avg</div>
        </div>
      </div>

      <div className="top-panels">
        <MapVisualization 
          title="Crop Type Classification" 
          subtitle={`Accuracy: ${dashboardData.crop_type_accuracy}%`}
          data={dashboardData.crop_map}
          altData={dashboardData.confidence_map}
          legends={cropLegends}
          altLegends={confidenceLegends}
          toggleLabel="Confidence Map"
        />
        <MapVisualization 
          title="Optical vs SAR Fusion" 
          subtitle="Cloud Removal Demo"
          data={dashboardData.cloudy_optical_map}
          altData={dashboardData.crop_map}
          legends={cropLegends}
          isCloudToggle={true}
          toggleLabel="SAR Fused (Clear)"
        />
        <MapVisualization 
          title="Moisture Stress Map" 
          subtitle="Stress Index (0-1)"
          data={dashboardData.stress_map}
          legends={stressLegends}
          altData={dashboardData.predictive_stress_map}
          altLegends={predictiveLegends}
          toggleLabel="7-Day Forecast"
          loadingText="Aggregating IMD Forecasts & SAR Trends..."
        />
      </div>

      <IrrigationPanel data={dashboardData} />
    </div>
  );
};

export default ExecutiveDashboard;
