import React, { useState, useEffect } from 'react';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import DataPipeline from './components/DataPipeline';
import AILab from './components/AILab';
import AgriIntelligence from './components/AgriIntelligence';
import GeospatialTools from './components/GeospatialTools';
import FarmerInterface from './components/FarmerInterface';
import PolicyIntegration from './components/PolicyIntegration';

function App() {
  const [activeModule, setActiveModule] = useState('executive');
  const [season, setSeason] = useState('Kharif');
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [dateIdx, setDateIdx] = useState(4); // Timeline state lifted to App

  const modules = [
    { id: 'executive', icon: '🏠', label: 'Executive Dashboard' },
    { id: 'pipeline', icon: '🛰️', label: 'Data Pipeline' },
    { id: 'ailab', icon: '🤖', label: 'AI/ML Lab' },
    { id: 'agri', icon: '🌾', label: 'Agri Intelligence' },
    { id: 'geo', icon: '📡', label: 'Geospatial Tools' },
    { id: 'farmer', icon: '👨‍🌾', label: 'Farmer Interface' },
    { id: 'policy', icon: '🏛️', label: 'Policy & Integration' },
  ];

  // The 30-Second Hackathon Winning Demo Engine
  useEffect(() => {
    if (!isDemoRunning) return;
    
    // Jump to dashboard
    setActiveModule('executive');

    const steps = [
      { t: 0, act: () => setDateIdx(1), log: 'Simulating historical satellite pass...' },
      { t: 3000, act: () => setDateIdx(2), log: 'Processing SAR + Optical...' },
      { t: 6000, act: () => setDateIdx(3), log: 'Classification running...' },
      { t: 9000, act: () => setDateIdx(4), log: 'Current Day: Stress Detected!' },
      { t: 12000, act: () => setActiveModule('geo'), log: 'Analyzing Terrain & Boundaries...' },
      { t: 15000, act: () => setActiveModule('ailab'), log: 'Validating Model Confidence...' },
      { t: 18000, act: () => setActiveModule('agri'), log: 'Checking Crop Phenology & ET...' },
      { t: 21000, act: () => setActiveModule('farmer'), log: 'Generating Multilingual SMS & Yield Impact...' },
      { t: 25000, act: () => setActiveModule('policy'), log: 'Aggregating District Data & PM-FASAL Trigger...' },
      { t: 29000, act: () => { setIsDemoRunning(false); setActiveModule('executive'); }, log: 'Demo Complete.' }
    ];

    const timeouts = steps.map(step => 
      setTimeout(() => {
        step.act();
      }, step.t)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isDemoRunning]);

  return (
    <div className="dashboard-layout">
      {/* Dynamic Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <strong>ISRO Hackathon</strong><br/>
          Precision Ag Platform
        </div>
        
        <div style={{padding: '10px'}}>
          <label style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Season Toggle</label>
          <select 
            value={season} 
            onChange={e => setSeason(e.target.value)}
            style={{width: '100%', padding: '5px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '5px'}}
          >
            <option value="Kharif">Kharif (Monsoon)</option>
            <option value="Rabi">Rabi (Winter)</option>
          </select>
        </div>

        <div style={{marginTop: '10px'}}>
          {modules.map(mod => (
            <div 
              key={mod.id} 
              className={`nav-item ${activeModule === mod.id ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
            >
              <span style={{fontSize: '1.2rem'}}>{mod.icon}</span> {mod.label}
            </div>
          ))}
        </div>

        <div style={{marginTop: 'auto', padding: '10px', textAlign: 'center'}}>
          <button 
            className={`demo-btn ${isDemoRunning ? 'running' : ''}`}
            onClick={() => setIsDemoRunning(!isDemoRunning)}
          >
            {isDemoRunning ? 'Stop Demo' : '▶ 30-Sec Pitch Demo'}
          </button>
        </div>
      </div>
      
      {/* Module Renderer */}
      <div className="main-content">
        <div className="module-header">
          <h1 style={{fontSize: '1.2rem', color: 'var(--accent-light)', margin: 0}}>
            {modules.find(m => m.id === activeModule)?.icon} {modules.find(m => m.id === activeModule)?.label}
          </h1>
          {activeModule === 'executive' && (
            <div className="timeline-scrubber">
              <label>Temporal Scrubber:</label>
              <input 
                type="range" min="0" max="4" step="1" 
                value={dateIdx} 
                onChange={(e) => setDateIdx(parseInt(e.target.value))} 
              />
              <span>Date: T-{4-dateIdx} weeks</span>
            </div>
          )}
        </div>

        {activeModule === 'executive' && <ExecutiveDashboard dateIdx={dateIdx} season={season} />}
        {activeModule === 'pipeline' && <DataPipeline />}
        {activeModule === 'ailab' && <AILab />}
        {activeModule === 'agri' && <AgriIntelligence />}
        {activeModule === 'geo' && <GeospatialTools />}
        {activeModule === 'farmer' && <FarmerInterface />}
        {activeModule === 'policy' && <PolicyIntegration />}
      </div>
    </div>
  );
}

export default App;
