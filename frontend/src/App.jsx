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



  return (
    <div className="dashboard-layout">
      {/* Dynamic Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <strong>ISRO Hackathon</strong><br/>
          Precision Ag Platform
        </div>
        
        <div style={{padding: '15px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--panel-border)'}}>
          <label style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 'bold', display: 'block', marginBottom: '8px'}}>🌿 Season Toggle</label>
          <select 
            value={season} 
            onChange={e => setSeason(e.target.value)}
            style={{
              width: '100%', 
              padding: '12px', 
              background: '#232c38', 
              color: '#fff', 
              border: '1px solid #3b4b5d', 
              borderRadius: '6px', 
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <option value="Kharif">Kharif (Monsoon)</option>
            <option value="Rabi">Rabi (Winter)</option>
            <option value="Zaid">Zaid (Summer)</option>
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


      </div>
      
      {/* Module Renderer */}
      <div className="main-content">
        <div className="module-header">
          <h1 style={{fontSize: '1.2rem', color: 'var(--accent-light)', margin: 0}}>
            {modules.find(m => m.id === activeModule)?.icon} {modules.find(m => m.id === activeModule)?.label}
          </h1>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <div id="google_translate_element"></div>
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
