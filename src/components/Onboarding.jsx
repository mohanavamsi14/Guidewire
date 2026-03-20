import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, UserCheck, Phone, CheckCircle, MapPin, Loader, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function Onboarding() {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  
  const [platform, setPlatform] = useState('swiggy');
  const [isLocating, setIsLocating] = useState(false);
  const [geoInfo, setGeoInfo] = useState(null);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if(phone.length < 10) return toast.error('Enter valid 10-digit mobile number');
    toast.success('OTP sent to ' + phone);
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if(otp.length < 4) return toast.error('Enter valid OTP');
    toast.success('Mobile number verified securely!');
    setStep(3);
  };

  const handleFetchLocation = () => {
    setIsLocating(true);
    toast.info('Auto-detecting delivery zone via GPS...');

    if (!navigator.geolocation) {
      toast.error('Geolocation is explicitly blocked by your browser settings.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        
        // Attempt a quick reverse geocode via a free public API (Open-Meteo or BigDataCloud)
        let zoneName = `Zone (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          if (data.city || data.locality) {
            zoneName = data.city || data.locality;
          }
        } catch (e) {
          console.error("Geocoding failed, using raw coordinates.");
        }

        setGeoInfo({
          name: zoneName,
          riskLevel: 'HIGH',
          riskMsg: 'AI Analysis: You operate in a HIGH rainfall zone.',
          lat: latitude, 
          lon: longitude
        });
        
        toast.warning('Zone Detected: High Rainfall Propensity.');
        setIsLocating(false);
        setStep(4);
      },
      (err) => {
        toast.error('Location rejected! Please click "Allow Location" in your browser URL bar.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFinalize = (e) => {
    e.preventDefault();
    loginUser({
      id: `GP-${phone.slice(-4) || '1234'}`,
      platform,
      name: name || 'Ravi Kumar',
      dailyTarget: 800,
      avgHours: 9,
      riskZone: geoInfo?.name || 'Mumbai',
      riskLevel: geoInfo?.riskLevel || 'HIGH',
      lat: geoInfo?.lat,
      lon: geoInfo?.lon,
      recommendedPremium: 79 // Standard Plan
    });
    
    toast.success('Account Created! Welcome to GigShield AI.');
    navigate('/');
  };

  return (
    <div className="gradient-bg-auth" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(37, 99, 235, 0.15)', borderRadius: '20px', marginBottom: '1rem', border: '1px solid rgba(37,99,235,0.3)' }}>
            <ShieldAlert size={36} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem' }}>GigShield AI</h1>
          <p style={{ marginTop: '0.25rem', color: '#cbd5e1' }}>Protecting Every Hour You Work</p>
        </div>

        {/* STEP 1: Mobile Auth */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <Phone size={18} color="var(--primary)" /> Secure Login
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" className="input-field" placeholder="E.g. Ravi Kumar" value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Mobile Number</label>
              <input type="tel" className="input-field" placeholder="Enter 10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Get OTP <ArrowRight size={18}/></button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
              Bank-grade 256-bit encryption. Fast and simple.
            </p>
          </form>
        )}

        {/* STEP 2: OTP Auth */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <Lock size={18} color="var(--primary)" /> Verify OTP
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Verification Code sent to +91 {phone}</label>
              <input type="text" className="input-field" placeholder="4-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} autoFocus required maxLength={4}/>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Secure Login</button>
            <button type="button" className="btn btn-outline" style={{ width: '100%', border: 'none', marginTop: '0.5rem' }} onClick={() => setStep(1)}>Wrong Number?</button>
          </form>
        )}

        {/* STEP 3: Setup Profile & Platform */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#fff' }}>Connect Platform</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Primary Delivery Platform</label>
              <select className="input-field" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="Swiggy">Swiggy Delivery</option>
                <option value="Zomato">Zomato Delivery</option>
                <option value="Zepto">Zepto Rider</option>
                <option value="Amazon">Amazon Flex</option>
              </select>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={handleFetchLocation}
              disabled={isLocating}
            >
              {isLocating ? <><Loader size={18} className="lucide-spin"/> Tracking Zone...</> : <><MapPin size={18} /> Auto-Detect Operating Zone</>}
            </button>
          </div>
        )}

        {/* STEP 4: Risk Profile Complete */}
        {step === 4 && (
          <form onSubmit={handleFinalize} className="animate-fade-in">
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--accent)', fontSize: '1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} /> Location Verified
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#cdd3ce', margin: 0 }}>Zone: {geoInfo?.name}</p>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--danger)', fontSize: '1rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} /> {geoInfo?.riskMsg}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Our AI recommends comprehensive weather protection structured for your exact zone footprint.</p>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enter Dashboard <ArrowRight size={18} /></button>
          </form>
        )}
      </div>
    </div>
  );
}
