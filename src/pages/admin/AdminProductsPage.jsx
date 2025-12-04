import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { searchProducts } from '../../data/products';
import Modal from '../../components/Modal';
import './AdminProductsPage.css';

const AdminProductsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Add product state
  const [addProductName, setAddProductName] = useState('');
  const [addReference, setAddReference] = useState('');
  const [addPrice, setAddPrice] = useState('');

  // Patch product state
  const [searchRef, setSearchRef] = useState('');
  const [patchProductName, setPatchProductName] = useState('');
  const [patchReference, setPatchReference] = useState('');
  const [patchPrice, setPatchPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Delete product state
  const [deleteSearchRef, setDeleteSearchRef] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (addProductName && addReference && addPrice) {
      // In production, this would call an API
      console.log('Adding product:', { 
        name: addProductName, 
        reference: addReference, 
        price: parseFloat(addPrice) 
      });
      alert(`Product ${addProductName} (${addReference}) would be added`);
      setAddProductName('');
      setAddReference('');
      setAddPrice('');
    }
  };

  const handleSearchProduct = () => {
    if (searchRef.trim()) {
      const results = searchProducts(searchRef);
      if (results.length > 0) {
        const product = results[0];
        setSelectedProduct(product);
        setPatchProductName(product.nameEn);
        setPatchReference(product.reference);
        setPatchPrice(product.price.toString());
      } else {
        setSelectedProduct(null);
        setPatchProductName('');
        setPatchReference('');
        setPatchPrice('');
        alert('Product not found');
      }
    }
  };

  const handlePatchProduct = (e) => {
    e.preventDefault();
    if (selectedProduct && patchProductName && patchReference && patchPrice) {
      // In production, this would call an API
      console.log('Patching product:', {
        id: selectedProduct.id,
        name: patchProductName,
        reference: patchReference,
        price: parseFloat(patchPrice)
      });
      alert(`Product ${patchProductName} would be updated`);
    }
  };

  const handleSearchDeleteProduct = () => {
    if (deleteSearchRef.trim()) {
      const results = searchProducts(deleteSearchRef);
      if (results.length > 0) {
        const product = results[0];
        setProductToDelete(product);
        setShowDeleteModal(true);
      } else {
        alert('Product not found');
      }
    }
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // In production, this would call an API
      console.log('Deleting product:', productToDelete);
      setDeleteSearchRef('');
      setProductToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <main className="admin-products">
      <div className="admin-products__container">
        <button onClick={() => navigate('/admin')} className="admin-products__back-btn">
          ← {t('back')}
        </button>
        <h1 className="admin-products__title">{t('adminProductTitle')}</h1>
        
        {/* Add Product Section */}
        <section className="admin-products__section">
          <h2 className="admin-products__section-title">{t('addProduct')}</h2>
          
          <div className="admin-products__form">
            <div className="admin-products__field">
              <label className="admin-products__label">{t('productName')}</label>
              <input
                type="text"
                value={addProductName}
                onChange={(e) => setAddProductName(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <div className="admin-products__field">
              <label className="admin-products__label">{t('reference')}</label>
              <input
                type="text"
                value={addReference}
                onChange={(e) => setAddReference(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <div className="admin-products__field">
              <label className="admin-products__label">{t('price')}</label>
              <input
                type="number"
                step="0.01"
                value={addPrice}
                onChange={(e) => setAddPrice(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <button 
              onClick={handleAddProduct}
              className="admin-products__btn"
            >
              {t('validate')}
            </button>
          </div>
        </section>
        
        {/* Patch Product Section */}
        <section className="admin-products__section">
          <h2 className="admin-products__section-title">{t('patchProduct')}</h2>
          
          <div className="admin-products__search">
            <svg 
              className="admin-products__search-icon" 
              width="20" 
              height="20" 
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
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchProduct()}
              placeholder={t('productReferencePlaceholder')}
              className="admin-products__search-input"
            />
          </div>
          
          <div className="admin-products__form">
            <div className="admin-products__field">
              <label className="admin-products__label">{t('productName')}</label>
              <input
                type="text"
                value={patchProductName}
                onChange={(e) => setPatchProductName(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <div className="admin-products__field">
              <label className="admin-products__label">{t('reference')}</label>
              <input
                type="text"
                value={patchReference}
                onChange={(e) => setPatchReference(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <div className="admin-products__field">
              <label className="admin-products__label">{t('price')}</label>
              <input
                type="number"
                step="0.01"
                value={patchPrice}
                onChange={(e) => setPatchPrice(e.target.value)}
                className="admin-products__input"
              />
            </div>
            
            <button 
              onClick={handlePatchProduct}
              className="admin-products__btn"
              disabled={!selectedProduct}
            >
              {t('validate')}
            </button>
          </div>
        </section>

        {/* Delete Product Section */}
        <section className="admin-products__section">
          <h2 className="admin-products__section-title">{t('deleteProduct')}</h2>

          <div className="admin-products__search">
            <svg
              className="admin-products__search-icon"
              width="20"
              height="20"
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
              value={deleteSearchRef}
              onChange={(e) => setDeleteSearchRef(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchDeleteProduct()}
              placeholder={t('productReferencePlaceholder')}
              className="admin-products__search-input"
            />
          </div>

          <button
            onClick={handleSearchDeleteProduct}
            className="admin-products__btn admin-products__btn--delete"
            disabled={!deleteSearchRef.trim()}
          >
            {t('delete')}
          </button>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={cancelDelete}>
        <div className="admin-products__modal">
          <h2 className="admin-products__modal-title">{t('confirmDelete')}</h2>
          <p className="admin-products__modal-text">
            {t('deleteProductConfirm')} <strong>{productToDelete?.nameEn}</strong> ({productToDelete?.reference})?
          </p>
          <div className="admin-products__modal-actions">
            <button onClick={cancelDelete} className="admin-products__modal-btn admin-products__modal-btn--cancel">
              {t('cancel')}
            </button>
            <button onClick={confirmDelete} className="admin-products__modal-btn admin-products__modal-btn--confirm">
              {t('delete')}
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default AdminProductsPage;
