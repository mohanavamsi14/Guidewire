import React from 'react';
import { ShieldCheck, CalendarRange, AlertTriangle, CloudRain, Shield, Activity, FileText, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user, t } = useApp();
  const navigate = useNavigate();

  // Mock data for graphs
  const hoursData = [
    { label: 'Mon', target: 8, actual: 5.5, lost: 2.5 },
    { label: 'Tue', target: 8, actual: 8, lost: 0 },
    { label: 'Wed', target: 8, actual: 7, lost: 1 },
    { label: 'Thu', target: 8, actual: 3, lost: 5 },
    { label: 'Fri', target: 8, actual: 8, lost: 0 },
  ];

  const totalProtected = user?.dailyTarget * 5; 

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {/* 1. Top Priority Block (Blueprint Request) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.75rem' }}>{t(`Good evening, ${user?.name || 'Ravi'}!`, `शुभ संध्या, ${user?.name || 'रवि'}!`)}</h2>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <span className="badge badge-neutral">{user?.platform || 'Swiggy'} Partner</span> 
            {t('Operating in', 'में काम कर रहे हैं')} {user?.riskZone || 'Mumbai'}
          </p>
        </div>

        {/* Top Priority Block: High Risk Today */}
        <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div className="live-dot" style={{ background: 'var(--danger)', boxShadow: '0 0 8px var(--danger)' }}></div>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>HIGH RISK TODAY</h3>
          </div>
          <p style={{ color: 'var(--danger)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
            Heavy Rain in Your Area (IMD Red Alert)
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Your Geofence risk implies a 70% probability of delivery suspension.</p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        
        {/* Earnings Protection Card */}
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', border: '1px solid rgba(37,99,235,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-main)', alignItems: 'center' }}>
              <ShieldCheck size={20} color="var(--primary)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>You are Protected</h4>
            </div>
            <div className="badge badge-success" style={{ background: 'var(--accent)', color: '#000', border: 'none' }}>Active</div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            ₹{totalProtected.toLocaleString()}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ₹320/hour covered. Valid for {(user?.avgHours || 8) * 5} hours this week.
          </p>
        </div>

        {/* Active Policy Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-muted)', alignItems: 'center' }}>
            <CalendarRange size={18} />
            <h4 style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>[ Active Policy ]</h4>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plan Active</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Standard Plan</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Validity</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Valid till Sunday</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Daily Target Coverage</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{user?.dailyTarget || 800}/day</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Left Column -> Risk + Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--secondary)" /> Weekly Hours Trend
            </h3>
            
            <div style={{ minHeight: '180px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hoursData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="label" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }} />
                  <Area type="step" dataKey="actual" stroke="#10b981" fill="transparent" strokeWidth={2} name="Hours Worked" />
                  <Area type="monotone" dataKey="target" stroke="#2563eb" fillOpacity={1} fill="url(#colorTarget)" name="Protected Cap" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Blueprint Addition: Predictive Insights Box */}
          <div className="glass-card" style={{ background: 'rgba(234, 179, 8, 0.05)', borderLeft: '4px solid var(--warning)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
              <TrendingUp size={18} /> Predictive AI Insights
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(234, 179, 8, 0.2)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Next Week Risk:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--danger)' }}>HIGH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expected Disruptions:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>3 days (Rain + AQI)</span>
            </div>
          </div>

        </div>

        {/* Right Column -> Live Events + Payouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--primary)" /> Live Events
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CloudRain size={16} color="var(--danger)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Rain Detected (45mm)</span>
                </div>
                <span className="badge badge-danger">High Risk</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={16} color="var(--secondary)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Claim Auto Initiated</span>
                </div>
                <span className="badge badge-neutral" style={{ color: 'var(--secondary)' }}>Active</span>
              </div>
            </div>
          </div>
          
          {/* Blueprint Addition: Payout History Simulation UI */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              Payout History (Simulation)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                 <div>
                   <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent)' }}>₹320 Credited</div>
                   <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Time: Instant | Mode: UPI</div>
                 </div>
                 <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.2rem' }}>Today</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                 <div>
                   <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent)' }}>₹450 Credited</div>
                   <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Status: Settled</div>
                 </div>
                 <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.2rem' }}>Last Wed</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
