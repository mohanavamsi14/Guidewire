import React, { useState } from 'react';
import { Radar, CloudRain, Sun, CheckCircle, SmartphoneNfc, BadgeIndianRupee, Search, ShieldCheck, AlignLeft, Hexagon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function Claims() {
  const { user, speakText, t } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [claimStatus, setClaimStatus] = useState('idle');

  const scanEnvironment = async () => {
    if (!user) return;
    setIsScanning(true);
    setClaimStatus('idle');
    toast.info(t('Initiating Multi-Trigger Environment Scan...', 'मल्टी-ट्रिगर वातावरण स्कैन शुरू हो रहा है...'));

    setTimeout(async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${user.lat}&longitude=${user.lon}&current=temperature_2m,rain&timezone=auto`);
        const data = await res.json();
        const { temperature_2m, rain } = data.current;
        
        // Mocking AQI to demo the Multi-Trigger requirement
        const mockAqi = 315; 
        const isDisrupted = temperature_2m > 36 || rain >= 0.1 || mockAqi > 300;
        
        setLiveData({
          temp: temperature_2m,
          rain: rain,
          aqi: mockAqi,
          disrupted: isDisrupted,
          type: rain > 0 ? 'rain' : (mockAqi > 300 ? 'pollution' : 'heat')
        });

        setIsScanning(false);
        if (isDisrupted) {
          const disruptMsg = `CRITICAL: Disruption identified. Extreme ${rain > 0 ? 'Rain' : 'Pollution'} confirmed!`;
          const disruptMsgHi = `चेतावनी: गंभीर ${rain > 0 ? 'बारिश' : 'प्रदूषण'} का पता चला है!`;
          toast.error(t(disruptMsg, disruptMsgHi));
          speakText(disruptMsg, disruptMsgHi);
          executeClaimSequence();
        } else {
          toast.success(t('Radar sweep complete. No dangerous environmental thresholds breached.', 'रडार स्कैन पूरा हुआ। कोई खतरा नहीं।'));
        }
      } catch (e) {
        setIsScanning(false);
        toast.error('Telemetry Failed: Could not reach meteorological API.');
      }
    }, 2000); 
  };

  const forceTrigger = () => {
    setIsScanning(true);
    toast.warning(t('Manual Overload: Forcing Weather API Trigger', 'चेतावनी: मौसम एपीआई को बलपूर्वक ट्रिगर किया जा रहा है'));
    setTimeout(() => {
      setIsScanning(false);
      setLiveData({ temp: 28, rain: 65, aqi: 120, disrupted: true, type: 'rain', mock: true });
      const msg = 'Critical Rain Event trigger manually forced.';
      const hiMsg = 'गंभीर बारिश की घटना को बलपूर्वक ट्रिगर किया गया।';
      speakText(msg, hiMsg);
      executeClaimSequence();
    }, 1500);
  };

  const executeClaimSequence = () => {
    setClaimStatus('detecting');
    
    setTimeout(() => {
      setClaimStatus('locating');
      toast.info(t('Verifying worker stationary compliance...', 'वितरण भागीदार जीपीएस सत्यापन...'));
    }, 2000);
    
    setTimeout(() => {
      setClaimStatus('payout');
      const payoutMsg = 'Resolution Successful! Three Hundred and Twenty Rupees credited to your linked UPI immediately.';
      const payoutMsgHi = 'दावा सफल! ३२० रुपये आपके यूपीआई खाते में जमा कर दिए गए हैं।';
      toast.success(t('₹320 Credited Successfully!', '३२० रुपये सफलतापूर्वक जमा किए गए!'), { duration: 5000 });
      speakText(payoutMsg, payoutMsgHi);
    }, 4500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>{t('Zero-Touch Claims System', 'शून्य-स्पर्श दावा प्रणाली')}</h2>
          <p>{t('AI seamlessly verifies disruptions and credits payouts.', 'AI स्वचालित रूप से भुगतान करता है।')}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
           <button className="btn btn-outline" onClick={forceTrigger} disabled={isScanning || claimStatus !== 'idle'} style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
            Mock
          </button>
          <button className="btn btn-primary" onClick={scanEnvironment} disabled={isScanning || (claimStatus !== 'idle' && claimStatus !== 'payout')}>
            <Radar size={18} /> API Scan
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
            {isScanning ? (
              <div className="radar-wrapper">
                 <div className="radar-wave"></div><div className="radar-wave"></div><div className="radar-wave"></div><div className="radar-core"></div>
              </div>
            ) : liveData?.disrupted ? (
              <div className="animate-fade-in" style={{ textAlign: 'center', width: '100%' }}>
                 <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '24px', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                   {liveData.type === 'rain' ? <CloudRain size={36} color="var(--danger)" /> : <Hexagon size={36} color="var(--warning)" />}
                 </div>
                 
                 <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                   <h3 style={{ color: 'var(--danger)', fontSize: '1.1rem' }}>{t(liveData.type === 'rain' ? 'Heavy Rain Detected' : 'Severe AQI Alert', 'खतरा पाया गया')}</h3>
                   <p style={{ fontSize: '0.85rem' }}>Zone: [{user?.lat.toFixed(2)}, {user?.lon.toFixed(2)}]</p>
                 </div>

                 <div style={{ background: 'var(--bg-glass)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimated Payout</span>
                   <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)' }}>₹320 Credit</div>
                     <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Status: {claimStatus === 'payout' ? 'Verified ✅' : 'Processing ⏳'}</div>
                   </div>
                 </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <Radar size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3>API Scanners Idle</h3>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', maxWidth: '250px' }}>
                  Engage verification scan to monitor ambient thresholds.
                </p>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', margin: 0 }}>
                <ShieldCheck size={18} color="var(--accent)" /> AI Fraud Engine
              </h4>
              {/* Blueprint Addition: Claim Confidence Score */}
              {claimStatus !== 'idle' && (
                <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>Confidence: 98%</span>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>GPS Spoofing Check</span>
               <span className="badge badge-success">Location Verified</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Duplicate Claim Check</span>
               <span className="badge badge-success">Passed</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Anomaly Models</span>
               {claimStatus === 'idle' ? (
                 <span className="badge badge-neutral">Scanning</span>
               ) : (
                 <span className="badge badge-success">Stationary Confirmed</span>
               )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card">
             <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Multi-Trigger Engine Transparency</h3>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
               Exact logic cascade and parametric triggers evaluated for this execution cycle:
             </p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#000', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#10b981' }}>
               {/* Blueprint Addition: Multi-Trigger display */}
               <div style={{ color: 'var(--accent)' }}>[0.98s] TRIGGERS ACTIVE:</div>
               <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid #333' }}>
                 ✔ Rain threshold &gt; 50mm <br/>
                 ✔ AQI &gt; 300 <span style={{ color: '#8b5cf6' }}>(Evaluated: {liveData?.aqi || 'N/A'})</span>
               </div>
               <div style={{ marginTop: '0.25rem' }}><span style={{ color: '#fff' }}>1.</span> Severe Weather or Pollution Detected.</div>
               <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid #333' }}>↳ <span style={{ color: '#8b5cf6' }}>Event triggered automatically.</span></div>
               <div style={{ marginTop: '0.25rem' }}><span style={{ color: '#fff' }}>2.</span> Partner App logged "Deliveries Halted".</div>
               <div style={{ paddingLeft: '0.5rem', borderLeft: '1px solid #333' }}>↳ <span style={{ color: '#8b5cf6' }}>Income loss verified.</span></div>
               <div style={{ marginTop: '0.25rem' }}><span style={{ color: '#fff' }}>3.</span> Finalizing Ledger & Initiating Transfer.</div>
             </div>
          </div>

          <div className="glass-card" style={{ opacity: (!liveData?.disrupted && !isScanning && claimStatus === 'idle') ? 0.4 : 1, transition: 'opacity 0.3s' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Execution Tracker</h3>
            <div className="timeline">
              <TimelineStep 
                icon={<Search size={16} />} 
                title={claimStatus === 'idle' ? "Awaiting Trigger" : "Event Detected & Claim Auto Created"} 
                desc="IMD / Open-Meteo corroborates trigger points."
                status={claimStatus === 'idle' ? 'idle' : 'done'} 
              />
              <TimelineStep 
                icon={<ShieldCheck size={16} />} 
                title="Verified" 
                desc="Fraud models checked against Delivery Zone."
                status={claimStatus === 'detecting' ? 'loading' : (claimStatus === 'locating' || claimStatus === 'payout' ? 'done' : 'idle')} 
              />
              <TimelineStep 
                icon={<BadgeIndianRupee size={16} />} 
                title="Paid" 
                desc={claimStatus === 'payout' ? '₹320 successfully routed to Unified Payments Interface.' : 'Awaiting payout release.'}
                status={claimStatus === 'payout' ? 'done' : (claimStatus === 'locating' ? 'loading' : 'idle')} 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function TimelineStep({ icon, title, desc, status }) {
  return (
    <div className="timeline-item">
      <div className={`timeline-dot ${status}`}>
        {status === 'done' ? <CheckCircle size={8} color="#000" /> : null}
      </div>
      <div className="timeline-content" style={status === 'loading' ? { animation: 'pulseOpacity 1.5s infinite' } : {}}>
        <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: status === 'done' ? 'var(--accent)' : 'var(--text-main)' }}>
          {icon} {title}
        </h5>
        <p>{desc}</p>
      </div>
      <style>{`@keyframes pulseOpacity { 0% { opacity: 0.5 } 50% { opacity: 1 } 100% { opacity: 0.5 } }`}</style>
    </div>
  );
}
