import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getRelatedProducts } from '../data/products';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, product }) => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [relatedQuantities, setRelatedQuantities] = useState({});

  if (!isOpen || !product) return null;

  const relatedProducts = getRelatedProducts(product.relatedProducts || []);

  const handleQuantityChange = (productRef, value) => {
    setRelatedQuantities(prev => ({
      ...prev,
      [productRef]: parseInt(value) || 1
    }));
  };

  const handleAddRelated = (relatedProduct) => {
    const qty = relatedQuantities[relatedProduct.reference] || 1;
    addToCart(relatedProduct, qty);
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getProductName = (prod) => {
    return language === 'fr' ? prod.nameFr : prod.nameEn;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          <h2 className="modal__title">{t('modalTitle')}</h2>
          
          {relatedProducts.length > 0 && (
            <div className="modal__related">
              <h3 className="modal__related-title">{t('oftenOrderedWith')}</h3>
              
              <div className="modal__related-list">
                {relatedProducts.map((related) => (
                  <div key={related.id} className="modal__related-item">
                    <div className="modal__related-info">
                      <span className="modal__related-ref">{related.reference}</span>
                      <span className="modal__related-name">{getProductName(related)}</span>
                    </div>
                    
                    <div className="modal__related-actions">
                      <div className="modal__quantity-control">
                        <input
                          type="number"
                          min="1"
                          value={relatedQuantities[related.reference] || 1}
                          onChange={(e) => handleQuantityChange(related.reference, e.target.value)}
                          className="modal__quantity-input"
                        />
                        <div className="modal__quantity-arrows">
                          <button 
                            onClick={() => handleQuantityChange(related.reference, (relatedQuantities[related.reference] || 1) + 1)}
                            className="modal__quantity-arrow"
                          >
                            ∧
                          </button>
                          <button 
                            onClick={() => handleQuantityChange(related.reference, Math.max(1, (relatedQuantities[related.reference] || 1) - 1))}
                            className="modal__quantity-arrow"
                          >
                            ∨
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="modal__add-btn"
                        onClick={() => handleAddRelated(related)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="modal__actions">
            <button className="modal__btn modal__btn--cancel" onClick={onClose}>
              {t('cancel')}
            </button>
            <button className="modal__btn modal__btn--confirm" onClick={handleConfirm}>
              {t('confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
