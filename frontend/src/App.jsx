import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MapVisualization from './components/MapVisualization';
import IrrigationPanel from './components/IrrigationPanel';
import DistrictSummary from './components/DistrictSummary';
import ModelInsights from './components/ModelInsights';
import FarmerAdvisory from './components/FarmerAdvisory';

function App() {
  const [farmInfo, setFarmInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [dateIdx, setDateIdx] = useState(4); // 4 = Current, 0 = 4 weeks ago
  const [activeTab, setActiveTab] = useState('field');

  const farmId = "FARM_0127";

  useEffect(() => {
    fetch(`http://localhost:8000/api/farm/${farmId}`)
      .then(res => res.json())
      .then(data => setFarmInfo(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/api/analysis/dashboard/${farmId}?date_idx=${dateIdx}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));
  }, [dateIdx]);

  const cropLegends = [
    { color: '#e6f598', label: 'Rice' },
    { color: '#fee08b', label: 'Wheat' },
    { color: '#fdae61', label: 'Maize' },
    { color: '#f46d43', label: 'Cotton' },
    { color: '#d53e4f', label: 'Sugarcane' }
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

  const growthLegends = [
    { color: '#c7e9c0', label: 'Germination' },
    { color: '#74c476', label: 'Vegetative' },
    { color: '#41ab5d', label: 'Reproductive' },
    { color: '#238b45', label: 'Maturation' },
    { color: '#005a32', label: 'Harvest Ready' }
  ];

  const dates = ["24 May (T-4)", "31 May (T-3)", "07 Jun (T-2)", "14 Jun (T-1)", "21 Jun (Current)"];

  return (
    <div className="dashboard-layout">
      <Sidebar farmInfo={farmInfo} />
      
      <div className="main-content">
        <div className="header-top">
          <h1 style={{fontSize: '1.2rem', marginBottom: 0, color: 'var(--accent-light)'}}>
            AI-Driven Automated Crop type & Moisture Stress Detection
          </h1>
          
          <div className="timeline-scrubber">
            <label>Multi-temporal Change Detection:</label>
            <input 
              type="range" 
              min="0" max="4" step="1" 
              value={dateIdx} 
              onChange={(e) => setDateIdx(parseInt(e.target.value))} 
            />
            <span>{dates[dateIdx]}</span>
          </div>
        </div>

        <div className="tabs">
          <div className={`tab ${activeTab === 'field' ? 'active' : ''}`} onClick={() => setActiveTab('field')}>Field Level</div>
          <div className={`tab ${activeTab === 'district' ? 'active' : ''}`} onClick={() => setActiveTab('district')}>District Level</div>
          <div className={`tab ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>Model Insights</div>
        </div>
        
        {activeTab === 'field' && (
          <>
            <div className="top-panels" style={{minHeight: '350px'}}>
              <MapVisualization 
                title="Crop Type Classification" 
                subtitle={dashboardData ? `Accuracy: ${dashboardData.crop_type_accuracy}%` : ''}
                data={dashboardData?.crop_map}
                altData={dashboardData?.confidence_map}
                legends={cropLegends}
                altLegends={confidenceLegends}
                toggleLabel="Confidence"
              />
              <MapVisualization 
                title="Optical vs SAR Fusion" 
                subtitle="Cloud Removal Demo"
                data={dashboardData?.cloudy_optical_map}
                altData={dashboardData?.crop_map}
                legends={cropLegends}
                isCloudToggle={true}
                toggleLabel="SAR Fused"
              />
              <MapVisualization 
                title="Moisture Stress Map" 
                subtitle="Stress Index (0-1)"
                data={dashboardData?.stress_map}
                legends={stressLegends}
              />
            </div>

            <div className="top-panels" style={{marginTop: '20px', minHeight: '300px'}}>
              <MapVisualization 
                title="Stage-wise Phenological Map" 
                subtitle="Phenology Calendar Overlay"
                data={dashboardData?.growth_map}
                legends={growthLegends}
              />
              <div style={{flex: 2}}>
                {dashboardData && <FarmerAdvisory farmId={farmId} />}
              </div>
            </div>

            {dashboardData && <IrrigationPanel data={dashboardData} />}
          </>
        )}

        {activeTab === 'district' && <DistrictSummary />}
        
        {activeTab === 'insights' && <ModelInsights />}

      </div>
    </div>
  );
}

export default App;
