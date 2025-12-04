import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCookies } from '../context/CookieContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const { openSettings } = useCookies();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo-text">SHERWIN-WILLIAMS.</span>
        </div>

        <nav className="footer__nav">
          <Link to="/privacy" onClick={scrollToTop} className="footer__link">{t('privacyPolicy')}</Link>
          <Link to="/terms" onClick={scrollToTop} className="footer__link">{t('termsOfUse')}</Link>
          <button onClick={openSettings} className="footer__link footer__link--button">
            {t('cookieSettings')}
          </button>
        </nav>

        <div className="footer__copyright">
          <span>{t('copyright')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
