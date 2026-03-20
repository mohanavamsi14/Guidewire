import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, LogOut, Wallet, FileText, Settings, Globe, Moon, Sun, WifiOff, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function Layout() {
  const { user, logoutUser, theme, toggleTheme, lang, toggleLang, isOffline, setIsOffline, t } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.info(t('Securely logged out of the platform.', 'आप सुरक्षित रूप से लॉग आउट हो गए हैं।'));
    navigate('/onboarding');
  };

  const navLinkStyle = ({ isActive }) => (
    `nav-link ${isActive ? 'active' : ''}`
  );
  
  const bottomLinkStyle = ({ isActive }) => (
    `bottom-nav-link ${isActive ? 'active' : ''}`
  );

  return (
    <div className={`app-layout ${isOffline ? 'offline-blur' : ''}`}>
      
      {/* Offline/Lite Banner Modal */}
      {isOffline && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: 'var(--warning)', color: '#000', padding: '0.75rem', textAlign: 'center', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(234, 179, 8, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <WifiOff size={18} /> Slow Network Detected. Switching to Lite Mode.
          </div>
          <button onClick={() => setIsOffline(false)} style={{ background: '#000', color: '#fff', border: 'none', padding: '0.3rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Restore Connection (Demo)</button>
        </div>
      )}

      {/* Laptop Left Sidebar Navigation */}
      <aside className="sidebar glass-panel">
        <div className="logo-container">
          <div className="logo-icon">
             <ShieldAlert size={24} color={theme === 'light' ? 'var(--primary)' : '#f97316'} />
          </div>
          <h1>{t('Gig', 'गिग')}<span>Shield</span></h1>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={navLinkStyle} end>
            <LayoutDashboard size={20} />
            <span>{t('Overview', 'अवलोकन')}</span>
          </NavLink>
          
          <NavLink to="/claims" className={navLinkStyle}>
            <ShieldAlert size={20} />
            <span>{t('Disruptions (Live)', 'बाधाएं')}</span>
          </NavLink>

          <NavLink to="/policies" className={navLinkStyle}>
            <FileText size={20} />
            <span>{t('Adaptive Policy', 'नीति')}</span>
          </NavLink>

          <NavLink to="/settings" className={navLinkStyle}>
            <Settings size={20} />
            <span>{t('Profile', 'प्रोफ़ाइल')}</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{user?.name?.charAt(0) || 'R'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.platform} Partner</span>
            </div>
          </div>
          <button className="btn-icon" onClick={handleLogout} title={t('Logout', 'लॉग आउट')}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar glass-panel-soft">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="zone-indicator">
              <span className={`live-dot ${isOffline ? 'offline' : ''}`} style={isOffline ? { background: 'var(--text-muted)', boxShadow: 'none' } : {}}></span>
              {t('Zone', 'ज़ोन')}: {user?.riskZone || 'Location'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-glass)' }}>
              {theme === 'dark' ? <Sun size={16} color="var(--warning)" /> : <Moon size={16} color="var(--primary)" />}
            </button>

            {/* Language Selection Globe */}
            <div 
              style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-glass)', borderRadius: '99px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }} 
              onClick={() => {
                const nextLang = lang === 'en' ? 'hi' : (lang === 'hi' ? 'te' : 'en');
                toggleLang(nextLang);
                if (nextLang === 'en') toast.info('Language: English');
                else if (nextLang === 'hi') toast.success('भाषा: हिंदी');
                else toast.info('Language: Telugu (Simulated)');
              }}
            >
              <Globe size={14} color={lang !== 'en' ? 'var(--primary)' : 'var(--text-muted)'} />
              <span style={{ fontSize: '0.8rem', color: lang !== 'en' ? 'var(--primary)' : 'var(--text-muted)' }}>
                {lang === 'en' ? 'EN' : (lang === 'hi' ? 'HI' : 'TE')}
              </span>
            </div>
            
            <div className="wallet-indicator">
              <Wallet size={16} />
              <span>{t('Cover', 'कवर')}: ₹{user?.dailyTarget * 5 || 4000}</span>
            </div>
            
            <button onClick={() => setIsOffline(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>
               Lost connection?
            </button>

          </div>
        </header>

        <div className="content-scroll">
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        <NavLink to="/" className={bottomLinkStyle} end>
          <LayoutDashboard size={22} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/policies" className={bottomLinkStyle}>
          <FileText size={22} />
          <span>Policy</span>
        </NavLink>
        <NavLink to="/claims" className={bottomLinkStyle}>
          <ShieldAlert size={22} />
          <span>Claims</span>
        </NavLink>
        <NavLink to="/settings" className={bottomLinkStyle}>
          <Settings size={22} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <style>{`.offline-blur main { filter: grayscale(100%) opacity(0.8); pointer-events: none; transition: 0.3s; }`}</style>
    </div>
  );
}
