import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { getCartCount } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to={isAuthenticated ? (isAdmin ? "/admin" : "/home") : "/"} className="header__logo">
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
              {/* Admin: Show orders icon */}
              {isAdmin && isAdminPage && (
                <Link to="/admin/orders" className="header__icon-btn header__orders-btn" aria-label="Orders">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </Link>
              )}

              {/* User: Show user and cart icons */}
              {!isAdmin && (
                <>
                  <button className="header__icon-btn header__user-btn" onClick={handleLogout} aria-label="User account">
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
                </>
              )}

              {/* Admin: Show logout button */}
              {isAdmin && (
                <button className="header__icon-btn header__logout-btn" onClick={handleLogout} aria-label="Logout">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              )}

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
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)}>Users</Link>
                <Link to="/admin/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                <Link to="/admin/orders" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
              </>
            ) : (
              <>
                <Link to="/home" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart ({cartCount})</Link>
              </>
            )}
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
