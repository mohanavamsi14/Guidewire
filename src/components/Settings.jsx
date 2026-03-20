import React, { useState } from 'react';
import { Settings2, Bell, Smartphone, Globe, Download, Save, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export default function Settings() {
  const { user } = useApp();
  const [upi, setUpi] = useState('rahul.k@okhdfc');
  const [whatsapp, setWhatsapp] = useState(true);
  const [sms, setSms] = useState(false);
  const [lang, setLang] = useState('en');

  const handleSave = () => {
    toast.success('Preferences updated successfully!');
  };

  const handleDownloadInvoice = () => {
    toast.message('Generating PDF...', {
      description: 'Your weekly premium invoice is downloading.'
    });
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3rem', maxWidth: '800px' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings2 size={24} /> Platform Configuration
        </h2>
        <p>Manage your real-time alerts, localization, and linked payout architecture.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Payout Configuration */}
        <div className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <CreditCard size={18} color="var(--accent)" /> Direct Payout Link (UPI)
          </h3>
          <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Parametric disbursements (lost income) are automatically forwarded to this VPA.
          </p>
          <input 
            type="text" 
            className="input-field" 
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* Real-time Alerts */}
        <div className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Bell size={18} color="var(--primary)" /> Real-Time Disruption Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={whatsapp} onChange={() => setWhatsapp(!whatsapp)} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              <div>
                <span style={{ display: 'block' }}>WhatsApp Radar Ping</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Urgent zone shutdown alerts directly to WhatsApp.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={sms} onChange={() => setSms(!sms)} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
              <div>
                <span style={{ display: 'block' }}>SMS Fallback</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Text messages if app server experiences a total crash.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Localization Support */}
        <div className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Globe size={18} color="#8b5cf6" /> Regional Localization
          </h3>
          <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Switch interface language to match your native operational preference.
          </p>
          <select 
            className="input-field" 
            value={lang} 
            onChange={(e) => {
              setLang(e.target.value);
              toast.info(`Language framework switched to ${e.target.options[e.target.selectedIndex].text}`);
            }}
            style={{ maxWidth: '300px' }}
          >
            <option value="en">English (Default)</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>

        {/* Invoice Management */}
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Policy Deductions History</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Generate PDF of all your weekly premium deductions for tax/expense purposes.</p>
          </div>
          <button className="btn btn-outline" onClick={handleDownloadInvoice}>
            <Download size={16} /> Get Invoice
          </button>
        </div>

      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} /> Sync Configuration Data
        </button>
      </div>

    </div>
  );
}
