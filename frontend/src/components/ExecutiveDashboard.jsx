import React, { useEffect, useState } from 'react';
import MapVisualization from './MapVisualization';
import IrrigationPanel from './IrrigationPanel';

const ExecutiveDashboard = ({ dateIdx, season }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const farmId = "FARM_0127";

  useEffect(() => {
    fetch(`http://localhost:8000/api/analysis/dashboard/${farmId}?date_idx=${dateIdx}&season=${season}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));
  }, [dateIdx, season]);

  const cropLegends = [
    { color: '#e6f598', label: 'Rice/Wheat' },
    { color: '#fdae61', label: 'Maize/Mustard' },
    { color: '#f46d43', label: 'Cotton' },
    { color: '#d53e4f', label: 'Sugarcane/Gram' },
    { color: '#abdda4', label: 'Soybean/Peas' }
  ];

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

  if (!dashboardData) return <div style={{padding: '20px'}}>Loading dashboard...</div>;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
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
        />
      </div>

      <IrrigationPanel data={dashboardData} />
    </div>
  );
};

export default ExecutiveDashboard;
