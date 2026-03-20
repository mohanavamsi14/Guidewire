import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gigUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Global App States
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    localStorage.setItem('gigUser', JSON.stringify(user));
  }, [user]);

  // Network Listeners for Offline Mode Support
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme Applier
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('gigUser');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  // Voice Alert Core System
  const speakText = (text, hiText) => {
    if (!('speechSynthesis' in window)) return;
    
    const isHindi = lang === 'hi';
    const utterance = new SpeechSynthesisUtterance(isHindi && hiText ? hiText : text);
    
    // Try to find a Hindi voice if needed
    if (isHindi) {
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('in'));
      if (hindiVoice) utterance.voice = hindiVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Dictionary for basic translations
  const t = (enString, hiString) => {
    return lang === 'hi' ? hiString : enString;
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      loginUser, 
      logoutUser,
      theme,
      toggleTheme,
      lang,
      toggleLang,
      t,
      isOffline,
      setIsOffline,
      speakText
    }}>
      {children}
    </AppContext.Provider>
  );
};
