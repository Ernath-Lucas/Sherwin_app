import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { searchProducts } from '../data/products';
import './CartPage.css';

const CartPage = () => {
  const { t, language } = useLanguage();
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const getProductName = (product) => {
    return language === 'fr' ? product.nameFr : product.nameEn;
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' €';
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      // Could navigate to search or handle inline
      console.log('Search results:', results);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        {/* Desktop Search in Header */}
        <div className="cart-page__header">
          <div className="cart-page__search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder={t('referencePlaceholder')}
              className="cart-page__search-input"
            />
          </div>
        </div>

        <h1 className="cart-page__title">{t('cartTitle')}</h1>

        {cartItems.length === 0 ? (
          <div className="cart-page__empty">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-page__content">
            <div className="cart-page__items">
              {cartItems.map((item, index) => (
                <div 
                  key={item.product.id} 
                  className="cart-page__item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="cart-page__item-info">
                    <span className="cart-page__item-ref">
                      {item.product.reference} : {getProductName(item.product)}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="cart-page__item-size">{item.product.size}</span>
                      {item.discount > 0 && (
                        <span className="cart-page__item-discount">-{item.discount}%</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="cart-page__item-quantity">
                    <span className="cart-page__item-times">x</span>
                    <span className="cart-page__item-qty">{item.quantity}</span>
                  </div>
                  
                  <span className="cart-page__item-equals">=</span>
                  
                  <span className="cart-page__item-price">
                    {formatPrice(
                      item.product.price * item.quantity -
                      (item.product.price * item.quantity * (item.discount || 0) / 100)
                    )}
                  </span>
                  
                  <button 
                    className="cart-page__item-remove"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                  
                  <div className="cart-page__item-divider"></div>
                </div>
              ))}
              
              <div className="cart-page__total">
                <span className="cart-page__total-label">{t('total')}</span>
                <span className="cart-page__total-amount">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-page__actions">
            <button className="cart-page__order-btn">
              {t('order')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
