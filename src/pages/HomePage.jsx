import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pendingQuantity, setPendingQuantity] = useState(1);
  const [pendingDiscount, setPendingDiscount] = useState(0);

  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleAddToCart = (product, quantity, discount) => {
    setSelectedProduct(product);
    setPendingQuantity(quantity);
    setPendingDiscount(discount);

    // Check if product has related products
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      setModalOpen(true);
    } else {
      // Add directly if no related products
      addToCart(product, quantity, discount);
    }
  };

  const handleConfirmAdd = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, pendingQuantity, pendingDiscount);
    }
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main className="home-page">
      <div className="home-page__container">
        <h1 className="home-page__title">{t('homeTitle')}</h1>
        
        <div className="home-page__search-wrapper">
          <div className="home-page__search">
            <svg 
              className="home-page__search-icon" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="home-page__search-input"
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="home-page__results">
            <div className="home-page__results-divider"></div>
            {searchResults.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
                {index < searchResults.length - 1 && (
                  <div className="home-page__results-divider"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAdd}
        product={selectedProduct}
      />
    </main>
  );
};

export default HomePage;
