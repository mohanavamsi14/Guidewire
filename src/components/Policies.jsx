import React, { useState } from 'react';
import { Shield, Check, Star, Moon, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function Policies() {
  const { user } = useApp();
  const [workingHours, setWorkingHours] = useState(user?.avgHours || 8);
  const [includeNight, setIncludeNight] = useState(false);
  const [activePlan, setActivePlan] = useState('Standard');

  // Dynamic Adaptive Model Pricing
  const baseMulti = workingHours / 8; 
  const nightPremium = includeNight ? 15 : 0; // ₹15 extra for night risk

  const basicPremium = Math.round(49 * baseMulti) + nightPremium;
  const standardPremium = Math.round(79 * baseMulti) + nightPremium;
  const proPremium = Math.round(119 * baseMulti) + nightPremium;

  const handleSelectPlan = (planName) => {
    setActivePlan(planName);
    toast.success(`${planName} Adaptive Policy activated for this billing week.`);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Adaptive Policy Rules</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)' }}>
          Real-time, zero-friction parametric coverage that actively adapts to your working schedule.
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {/* Interactive Adaptive Controls */}
        <div className="glass-card" style={{ background: 'rgba(37, 99, 235, 0.05)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} color="var(--primary)"/> Adaptive Shift Profiling
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
            <span>Working Hours/Day</span>
            <span style={{ color: 'var(--primary)' }}>{workingHours} Hrs</span>
          </div>
          <input 
            type="range" 
            min="4" max="14" step="1" 
            value={workingHours} 
            onChange={(e) => setWorkingHours(e.target.value)} 
            style={{ width: '100%', accentColor: 'var(--primary)', marginBottom: '2rem' }} 
          />

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '1rem', background: 'var(--bg-glass)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Moon size={18} color={includeNight ? 'var(--secondary)' : 'var(--text-muted)'} />
              <div>
                <span style={{ display: 'block', fontWeight: 500, color: 'var(--text-main)' }}>Include Night Shifts</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Adds coverage for 11PM-5AM weather hazards</span>
              </div>
            </div>
            <input type="checkbox" checked={includeNight} onChange={() => setIncludeNight(!includeNight)} style={{ width: '20px', height: '20px', accentColor: 'var(--secondary)' }} />
          </label>
        </div>

        {/* AI Explanation Box (Blueprint) */}
        <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
            <Bot size={18} /> Why This Plan AI Recommendation?
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--primary)' }}>→</span> Your declared zone ({user?.riskZone || 'Mumbai'}) had exactly <strong>5 severe rain disruptions</strong> last week.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--primary)' }}>→</span> Area Average Income Loss stands at <strong>₹450/day</strong> during these events.
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--primary)' }}>→</span> The <strong style={{ color: 'var(--primary)' }}>Standard Plan</strong> is statistically optimized to cover 92% of your specific vulnerability metrics at the lowest premium.
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Tier Plan Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* Basic Plan */}
        <PlanCard 
          title="Basic"
          price={basicPremium}
          hours={Math.round(workingHours * 0.4)}
          features={['Covers up to 40% of Daily Hours', 'Rainfall Triggers Only', 'Standard Geofencing']}
          isActive={activePlan === 'Basic'}
          onSelect={() => handleSelectPlan('Basic')}
        />

        {/* Standard Plan (Recommended) */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#fff', padding: '0.2rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10, whiteSpace: 'nowrap' }}>
            <Star size={12} fill="#fff" /> RECOMMENDED (AI)
          </div>
          <PlanCard 
            title="Standard"
            price={standardPremium}
            hours={Math.round(workingHours * 0.7)}
            features={['Covers up to 70% of Daily Hours', 'Rain & Heatwave Triggers', 'Express Claim Autopilot']}
            isActive={activePlan === 'Standard'}
            onSelect={() => handleSelectPlan('Standard')}
            highlight
          />
        </div>

        {/* Premium Plan */}
        <PlanCard 
          title="Premium"
          price={proPremium}
          hours={workingHours}
          features={['100% Full Shift Coverage', 'All Weather + Social Disruption', 'Zero-Deductible Payouts']}
          isActive={activePlan === 'Premium'}
          onSelect={() => handleSelectPlan('Premium')}
        />
      </div>

    </div>
  );
}

function PlanCard({ title, price, hours, features, isActive, onSelect, highlight }) {
  return (
    <div 
      className="glass-card" 
      style={{ 
        display: 'flex', flexDirection: 'column', height: '100%',
        border: isActive ? (highlight ? '2px solid var(--primary)' : '2px solid var(--accent)') : '1px solid var(--border-color)',
        transform: highlight ? 'scale(1.02)' : 'scale(1)',
        background: isActive ? 'rgba(255,255,255,0.08)' : 'var(--bg-glass)'
      }}
    >
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title} Plan</h3>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: highlight ? 'var(--primary)' : 'var(--text-main)' }}>₹{price}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/ wk</span>
      </div>

      <div style={{ background: 'var(--bg-dark)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Protects exactly </span>
        <strong style={{ color: 'var(--accent)' }}>{hours} hrs/day</strong>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Check size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button 
        className={isActive ? (highlight ? 'btn btn-primary' : 'btn btn-outline') : 'btn btn-outline'} 
        style={{ width: '100%', borderColor: isActive ? 'transparent' : 'var(--border-color)', background: isActive ? (highlight ? 'var(--primary)' : 'rgba(16,185,129,0.2)') : 'transparent' }}
        onClick={onSelect}
      >
        {isActive ? 'Active Plan' : 'Select Plan'}
      </button>
    </div>
  );
}
