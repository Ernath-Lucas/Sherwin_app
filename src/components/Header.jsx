import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { getCartCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  const cartCount = getCartCount();

  return (
    <header className="header">
      <div className="header__container">
        <Link to={isAuthenticated ? "/home" : "/"} className="header__logo">
          <img
            src="/src/public/sw-logo-header-up.png"
            alt="Sherwin-Williams"
            className="header__logo-img"
          />
        </Link>

        <div className="header__right">
          <div className="header__languages">
            <button
              className={`header__lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-label="English"
            >
              <span className="header__flag header__flag--uk"></span>
            </button>
            <button
              className={`header__lang-btn ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
              aria-label="Français"
            >
              <span className="header__flag header__flag--fr"></span>
            </button>
          </div>

          {!isLoginPage && isAuthenticated && (
            <>
              <button className="header__icon-btn header__user-btn" onClick={logout} aria-label="User account">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              
              <Link to="/cart" className="header__icon-btn header__cart-btn" aria-label="Shopping cart">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="header__cart-badge">{cartCount > 99 ? '99' : cartCount}</span>
                )}
              </Link>

              <button 
                className="header__mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <span className={`header__hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__mobile-nav">
            <Link to="/home" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart ({cartCount})</Link>
            <button onClick={() => { logout(); setMobileMenuOpen(false); }}>Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
