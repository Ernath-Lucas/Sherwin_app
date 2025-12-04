import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCookies } from '../context/CookieContext';
import './CookieBanner.css';

const CookieBanner = () => {
  const { t, language } = useLanguage();
  const { showBanner, acceptAll, acceptNecessary, updateConsent, setShowBanner, cookieConsent } = useCookies();
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: cookieConsent?.analytics || false,
    marketing: cookieConsent?.marketing || false
  });

  if (!showBanner) return null;

  const content = {
    en: {
      title: "Cookie Settings",
      description: "We use cookies to improve your experience. You can choose which cookies you accept.",
      necessary: "Necessary Cookies",
      necessaryDesc: "Essential for the website to function properly. Cannot be disabled.",
      analytics: "Analytics Cookies",
      analyticsDesc: "Help us understand how visitors interact with our website.",
      marketing: "Marketing Cookies",
      marketingDesc: "Used to track visitors across websites for marketing purposes.",
      acceptAll: "Accept All",
      acceptNecessary: "Accept Only Necessary",
      savePreferences: "Save My Preferences",
      customize: "Customize"
    },
    fr: {
      title: "Paramètres des Cookies",
      description: "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez choisir les cookies que vous acceptez.",
      necessary: "Cookies Nécessaires",
      necessaryDesc: "Essentiels au fonctionnement du site. Ne peuvent pas être désactivés.",
      analytics: "Cookies Analytiques",
      analyticsDesc: "Nous aident à comprendre comment les visiteurs interagissent avec notre site.",
      marketing: "Cookies Marketing",
      marketingDesc: "Utilisés pour suivre les visiteurs sur les sites web à des fins marketing.",
      acceptAll: "Tout Accepter",
      acceptNecessary: "Accepter Uniquement les Nécessaires",
      savePreferences: "Enregistrer Mes Préférences",
      customize: "Personnaliser"
    }
  };

  const text = content[language];

  const handleSavePreferences = () => {
    updateConsent(preferences);
    setShowSettings(false);
  };

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__overlay" onClick={() => setShowBanner(false)}></div>
      <div className="cookie-banner__content">
        <h2 className="cookie-banner__title">{text.title}</h2>
        <p className="cookie-banner__description">{text.description}</p>

        {showSettings ? (
          <div className="cookie-banner__settings">
            <div className="cookie-banner__option">
              <div className="cookie-banner__option-header">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="cookie-banner__checkbox"
                />
                <div>
                  <h3 className="cookie-banner__option-title">{text.necessary}</h3>
                  <p className="cookie-banner__option-desc">{text.necessaryDesc}</p>
                </div>
              </div>
            </div>

            <div className="cookie-banner__option">
              <div className="cookie-banner__option-header">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="cookie-banner__checkbox"
                />
                <div>
                  <h3 className="cookie-banner__option-title">{text.analytics}</h3>
                  <p className="cookie-banner__option-desc">{text.analyticsDesc}</p>
                </div>
              </div>
            </div>

            <div className="cookie-banner__option">
              <div className="cookie-banner__option-header">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="cookie-banner__checkbox"
                />
                <div>
                  <h3 className="cookie-banner__option-title">{text.marketing}</h3>
                  <p className="cookie-banner__option-desc">{text.marketingDesc}</p>
                </div>
              </div>
            </div>

            <div className="cookie-banner__actions">
              <button onClick={handleSavePreferences} className="cookie-banner__btn cookie-banner__btn--primary">
                {text.savePreferences}
              </button>
            </div>
          </div>
        ) : (
          <div className="cookie-banner__actions">
            <button onClick={() => setShowSettings(true)} className="cookie-banner__btn cookie-banner__btn--secondary">
              {text.customize}
            </button>
            <button onClick={acceptNecessary} className="cookie-banner__btn cookie-banner__btn--secondary">
              {text.acceptNecessary}
            </button>
            <button onClick={acceptAll} className="cookie-banner__btn cookie-banner__btn--primary">
              {text.acceptAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
