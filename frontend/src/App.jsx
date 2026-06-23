import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MapVisualization from './components/MapVisualization';
import IrrigationPanel from './components/IrrigationPanel';

function App() {
  const [farmInfo, setFarmInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const farmId = "FARM_0127";

  useEffect(() => {
    // Fetch Farm Info
    fetch(`http://localhost:8000/api/farm/${farmId}`)
      .then(res => res.json())
      .then(data => setFarmInfo(data))
      .catch(err => console.error("Error fetching farm info:", err));

    // Fetch Dashboard Data
    fetch(`http://localhost:8000/api/analysis/dashboard/${farmId}`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error("Error fetching dashboard data:", err));
  }, []);

  const cropLegends = [
    { color: '#e6f598', label: 'Rice' },
    { color: '#fee08b', label: 'Wheat' },
    { color: '#fdae61', label: 'Maize' },
    { color: '#f46d43', label: 'Cotton' },
    { color: '#d53e4f', label: 'Sugarcane' }
  ];

  const stressLegends = [
    { color: '#1a9850', label: 'No Stress' },
    { color: '#91cf60', label: 'Low Stress' },
    { color: '#d9ef8b', label: 'Moderate Stress' },
    { color: '#fc8d59', label: 'High Stress' },
    { color: '#d73027', label: 'Severe Stress' }
  ];

  const growthLegends = [
    { color: '#c7e9c0', label: 'Germination' },
    { color: '#74c476', label: 'Vegetative' },
    { color: '#41ab5d', label: 'Reproductive' },
    { color: '#238b45', label: 'Maturation' },
    { color: '#005a32', label: 'Harvest Ready' }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar farmInfo={farmInfo} />
      
      <div className="main-content">
        <h1 style={{fontSize: '1.2rem', marginBottom: 0, color: 'var(--accent-light)'}}>
          AI-Driven Automated Crop type, Moisture Stress Detection and irrigation advisory
        </h1>
        
        <div className="top-panels">
          <MapVisualization 
            title="Crop Type Classification" 
            subtitle={dashboardData ? `Overall Accuracy: ${dashboardData.crop_type_accuracy}%` : ''}
            data={dashboardData?.crop_map}
            legends={cropLegends}
          />
          <MapVisualization 
            title="Moisture Stress Map" 
            subtitle="Stress Index (0-1)"
            data={dashboardData?.stress_map}
            legends={stressLegends}
          />
          <MapVisualization 
            title="Stage-wise Phenological Map" 
            data={dashboardData?.growth_map}
            legends={growthLegends}
          />
        </div>

        {dashboardData && <IrrigationPanel data={dashboardData} />}

      </div>
    </div>
  );
}

export default App;
