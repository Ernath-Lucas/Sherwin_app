import { useLanguage } from '../context/LanguageContext';
import { useCookies } from '../context/CookieContext';
import './CookieButton.css';

const CookieButton = () => {
  const { language } = useLanguage();
  const { openSettings, cookieConsent } = useCookies();

  // Only show button if user has made a choice
  if (!cookieConsent) return null;

  const text = {
    en: "Cookie Settings",
    fr: "Paramètres des cookies"
  };

  return (
    <button
      onClick={openSettings}
      className="cookie-button"
      aria-label={text[language]}
      title={text[language]}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
      <span className="cookie-button__text">{text[language]}</span>
    </button>
  );
};

export default CookieButton;
