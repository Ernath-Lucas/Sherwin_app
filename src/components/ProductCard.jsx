import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(product.allowedQuantities[0] || 1);
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');

  const allowedQty = product.allowedQuantities || [];
  
  useEffect(() => {
    // Reset to first allowed quantity when product changes
    setQuantity(product.allowedQuantities[0] || 1);
    setError('');
  }, [product]);

  const validateQuantity = (value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1) {
      return product.allowedQuantities[0];
    }
    
    if (allowedQty.length > 0 && !allowedQty.includes(num)) {
      setError(`${t('quantityRestriction')} ${allowedQty.join(', ')}.`);
      // Find closest allowed quantity
      const closest = allowedQty.reduce((prev, curr) => 
        Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
      );
      return closest;
    }
    
    setError('');
    return num;
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value);
  };

  const handleQuantityBlur = () => {
    const validated = validateQuantity(quantity);
    setQuantity(validated);
  };

  const incrementQuantity = () => {
    const currentIndex = allowedQty.indexOf(quantity);
    if (currentIndex < allowedQty.length - 1) {
      setQuantity(allowedQty[currentIndex + 1]);
      setError('');
    } else if (allowedQty.length === 0) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    const currentIndex = allowedQty.indexOf(quantity);
    if (currentIndex > 0) {
      setQuantity(allowedQty[currentIndex - 1]);
      setError('');
    } else if (allowedQty.length === 0 && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const validated = validateQuantity(quantity);
    const discountValue = parseFloat(discount) || 0;
    if (!error || allowedQty.includes(validated)) {
      onAddToCart(product, validated, discountValue);
    }
  };

  const getProductName = () => {
    return language === 'fr' ? product.nameFr : product.nameEn;
  };

  const calculatePrice = () => {
    const basePrice = product.price * quantity;
    const discountValue = parseFloat(discount) || 0;
    const discountAmount = (basePrice * discountValue) / 100;
    return basePrice - discountAmount;
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + '€';
  };

  return (
    <div className="product-card">
      <div className="product-card__main">
        <div className="product-card__info">
          <span className="product-card__ref">{product.reference}</span>
          <span className="product-card__name">{getProductName()}</span>
          <span className="product-card__size">{product.size}</span>
        </div>

        <div className="product-card__controls">
          <div className="product-card__quantity">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              min="1"
              className="product-card__quantity-input"
            />
            <div className="product-card__quantity-arrows">
              <button onClick={incrementQuantity} className="product-card__quantity-arrow">
                ∧
              </button>
              <button onClick={decrementQuantity} className="product-card__quantity-arrow">
                ∨
              </button>
            </div>
          </div>

          <div className="product-card__discount">
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="%"
              className="product-card__discount-input"
            />
            <span className="product-card__discount-symbol">%</span>
          </div>

          <span className="product-card__price">{formatPrice(calculatePrice())}</span>

          <button className="product-card__add-btn" onClick={handleAddToCart}>
            {t('addToCart')}
          </button>

          <button className="product-card__add-btn-mobile" onClick={handleAddToCart} aria-label="Add to cart">
            +
          </button>
        </div>
      </div>

      {allowedQty.length > 0 && (
        <div className="product-card__restriction">
          <span className="product-card__restriction-text">
            {t('quantityRestriction')} {allowedQty.join(', ')}.
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
