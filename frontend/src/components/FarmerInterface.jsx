import React, { useState } from 'react';
import FarmerAdvisory from './FarmerAdvisory';

const FarmerInterface = () => {
  const [lang, setLang] = useState('hindi');
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isPlayingIVR, setIsPlayingIVR] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [isBotReplying, setIsBotReplying] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: 'Namaste! Main Kisan Mitra hoon. Aap apne khet ke baare mein sawal pooch sakte hain.', audio: false }
  ]);

  const handleMicClick = () => {
    if (isListening || isBotReplying) return;
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setChatHistory(prev => [...prev, { role: 'user', text: 'Mere cotton ke khet mein agla paani kab dena hai?' }]);
      setIsBotReplying(true);
      setTimeout(() => {
        setIsBotReplying(false);
        setChatHistory(prev => [...prev, { role: 'bot', text: 'Satellite data ke anusaar aapke khet mein nami kam ho rahi hai. Kripya kal dopahar tak 35mm paani dijiye.', audio: true }]);
      }, 2000);
    }, 2000);
  };

  const handleUploadClick = () => {
    if (isUploaded) {
      setIsUploaded(false);
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsUploaded(true);
    }, 1500);
  };

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
          
          <div 
            onClick={handleUploadClick}
            style={{
              border: isUploaded ? 'none' : '2px dashed #444', 
              borderRadius: '8px', 
              padding: isUploaded ? '0' : '30px', 
              textAlign: 'center', 
              cursor: 'pointer', 
              background: isUploaded ? 'transparent' : 'rgba(255,255,255,0.02)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '160px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {isAnalyzing ? (
              <div style={{color: 'var(--accent-light)'}}>
                <div style={{fontSize: '2rem', marginBottom: '10px', animation: 'pulse 1s infinite'}}>🔍</div>
                <div>Running CNN on device...</div>
              </div>
            ) : isUploaded ? (
              <div style={{width: '100%', position: 'relative'}}>
                {/* Mock Field Image */}
                <div style={{
                  width: '100%', height: '160px', 
                  background: 'url(https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)',
                  backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', filter: 'brightness(0.8)'
                }}></div>
                {/* CNN Bounding Boxes Mock */}
                <div style={{position: 'absolute', top: '20px', left: '30px', width: '80px', height: '60px', border: '2px solid #ef4444', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.2)'}}>
                  <div style={{position: 'absolute', top: '-20px', left: '-2px', background: '#ef4444', color: '#fff', fontSize: '0.6rem', padding: '2px 4px', borderRadius: '2px', whiteSpace: 'nowrap'}}>Stress (0.92)</div>
                </div>
                <div style={{position: 'absolute', bottom: '20px', right: '40px', width: '100px', height: '50px', border: '2px solid #10b981', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.2)'}}>
                  <div style={{position: 'absolute', top: '-20px', left: '-2px', background: '#10b981', color: '#fff', fontSize: '0.6rem', padding: '2px 4px', borderRadius: '2px', whiteSpace: 'nowrap'}}>Healthy (0.88)</div>
                </div>
                {/* Overlay Text */}
                <div style={{position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0,0,0,0.7)', padding: '8px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px'}}>
                  <span style={{color: '#ef4444'}}>Validation: Match ✅</span>
                  <span style={{color: 'var(--text-muted)'}}>Click to reset</span>
                </div>
              </div>
            ) : (
              <>
                <div style={{fontSize: '2rem', marginBottom: '10px'}}>📷</div>
                <div style={{color: 'var(--accent-light)', fontWeight: '500'}}>Click or Drop Field Image</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px'}}>Runs on-device lightweight CNN for stress validation</div>
              </>
            )}
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

        {/* Feature 8: Satellite-to-Farmer Voice Bot */}
        <div className="panel" style={{border: '1px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.02)'}}>
          <h2 style={{color: '#8b5cf6'}}>📞 Satellite-to-Farmer Voice Bot (IVR)</h2>
          <p className="info-desc" style={{marginBottom: '15px'}}>Auto-generated local language audio for illiterate farmers.</p>
          <div style={{background: '#111', padding: '15px', borderRadius: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>
                <button 
                  onClick={() => {
                    if (isPlayingIVR) return;
                    setIsPlayingIVR(true);
                    setTimeout(() => setIsPlayingIVR(false), 4000);
                  }}
                  style={{width: '40px', height: '40px', borderRadius: '50%', background: '#8b5cf6', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', animation: isPlayingIVR ? 'pulse 1s infinite' : 'none'}}
                >
                  {isPlayingIVR ? '⏸' : '▶'}
                </button>
                <div style={{flex: 1}}>
                  <div style={{height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden'}}>
                     <div style={{width: isPlayingIVR ? '100%' : '30%', height: '100%', background: '#8b5cf6', transition: isPlayingIVR ? 'width 4s linear' : 'width 0.3s'}}></div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px'}}>
                     <span>{isPlayingIVR ? '0:12' : '0:04'}</span><span>0:12</span>
                  </div>
                </div>
             </div>
             <div style={{marginTop: '10px', fontSize: '0.85rem', color: '#e1e7ef', fontStyle: 'italic', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px'}}>
               "Aapke khet mein aaj madhyam stress hai. Kal dopahar tak 30mm paani dijiye."
             </div>
             <div style={{marginTop: '10px', fontSize: '0.75rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px'}}>
               <span style={{width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block'}}></span>
               Toll-Free IVR System Active
             </div>
          </div>
        </div>
      </div>

      {/* Multilingual Voice Command Chatbot */}
      <div className="panel" style={{border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.02)'}}>
        <h2 style={{color: '#10b981'}}>🎙️ Kisan Mitra Voice Chatbot</h2>
        <p className="info-desc" style={{marginBottom: '15px'}}>Interactive AI assistant that answers field-specific queries using satellite data.</p>
        
        <div style={{background: '#111', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px', minHeight: '250px'}}>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', paddingRight: '5px'}}>
            {chatHistory.map((msg, i) => (
              <div key={i} style={{display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'}}>
                <div style={{
                  maxWidth: '75%', 
                  padding: '10px 15px', 
                  borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  background: msg.role === 'user' ? '#10b981' : '#333',
                  color: '#fff',
                  fontSize: '0.85rem',
                  lineHeight: '1.4'
                }}>
                  {msg.audio && <span style={{marginRight: '8px', color: '#4ade80'}}>🔊</span>}
                  {msg.text}
                </div>
              </div>
            ))}
            {isBotReplying && (
              <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <div style={{padding: '10px 15px', borderRadius: '15px 15px 15px 0', background: '#333', color: 'var(--text-muted)', fontSize: '0.85rem'}}>
                  Processing satellite telemetry...
                </div>
              </div>
            )}
          </div>
          
          <div style={{borderTop: '1px solid #333', paddingTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
            <button 
              onClick={handleMicClick}
              disabled={isListening || isBotReplying}
              style={{
                width: '60px', height: '60px', borderRadius: '50%', 
                background: isListening ? '#ef4444' : '#10b981', 
                color: '#fff', border: 'none', cursor: (isListening || isBotReplying) ? 'not-allowed' : 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
                boxShadow: isListening ? '0 0 15px #ef4444' : '0 4px 6px rgba(0,0,0,0.3)',
                animation: isListening ? 'pulse 1s infinite' : 'none',
                transition: 'all 0.3s'
              }}
            >
              🎤
            </button>
            {isListening && <span style={{position: 'absolute', right: '10%', color: '#ef4444', fontSize: '0.85rem'}}>Listening... (Speak now)</span>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FarmerInterface;
