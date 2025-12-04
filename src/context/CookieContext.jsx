import { createContext, useContext, useState, useEffect } from 'react';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      setCookieConsent(JSON.parse(consent));
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    setCookieConsent(consent);
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    setCookieConsent(consent);
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const updateConsent = (preferences) => {
    const consent = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString()
    };
    setCookieConsent(consent);
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const openSettings = () => {
    setShowBanner(true);
  };

  return (
    <CookieContext.Provider value={{
      cookieConsent,
      showBanner,
      acceptAll,
      acceptNecessary,
      updateConsent,
      openSettings,
      setShowBanner
    }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};
