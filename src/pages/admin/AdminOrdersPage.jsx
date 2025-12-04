import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useOrders } from '../../context/OrderContext';
import './AdminOrdersPage.css';

const AdminOrdersPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { orders, removeOrderItem } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders, selectedOrder]);

  const handleRemoveItem = (orderId, itemIndex) => {
    removeOrderItem(orderId, itemIndex);

    if (selectedOrder?.id === orderId) {
      const updatedOrder = orders.find(o => o.id === orderId);
      if (updatedOrder) {
        const newItems = updatedOrder.items.filter((_, idx) => idx !== itemIndex);
        const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
        setSelectedOrder({ ...updatedOrder, items: newItems, total: newTotal });
      }
    }
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace('.', ',') + ' €';
  };

  const getProductName = (item) => {
    return language === 'fr' ? (item.nameFr || item.name) : (item.name || item.nameEn);
  };

  return (
    <main className="admin-orders">
      <div className="admin-orders__container">
        <button onClick={() => navigate('/admin')} className="admin-orders__back-btn">
          ← {t('back')}
        </button>
        <h1 className="admin-orders__title">{t('adminOrdersTitle')}</h1>

        {orders.length === 0 ? (
          <div className="admin-orders__empty">
            <p>{t('noOrders')}</p>
          </div>
        ) : selectedOrder && (
          <div className="admin-orders__order">
            <h2 className="admin-orders__order-title">
              {selectedOrder.userName} {t('cart')} :
            </h2>

            <div className="admin-orders__items">
              {selectedOrder.items.map((item, index) => (
                <div
                  key={`${item.reference}-${index}`}
                  className="admin-orders__item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="admin-orders__item-info">
                    <span className="admin-orders__item-ref">
                      {item.reference} : {getProductName(item)}
                    </span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="admin-orders__item-size">{item.size}</span>
                      {item.discount > 0 && (
                        <span className="admin-orders__item-discount">-{item.discount}%</span>
                      )}
                    </div>
                  </div>

                  <div className="admin-orders__item-quantity">
                    <span className="admin-orders__item-times">x</span>
                    <span className="admin-orders__item-qty">{item.quantity}</span>
                  </div>

                  <span className="admin-orders__item-equals">=</span>

                  <span className="admin-orders__item-price">
                    {formatPrice(item.totalPrice)}
                  </span>
                  
                  <button 
                    className="admin-orders__item-remove"
                    onClick={() => handleRemoveItem(selectedOrder.id, index)}
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                  
                  <div className="admin-orders__item-divider"></div>
                </div>
              ))}
              
              <div className="admin-orders__total">
                <span className="admin-orders__total-label">{t('total')}</span>
                <span className="admin-orders__total-amount">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Order selector for demo */}
        <div className="admin-orders__selector">
          <p className="admin-orders__selector-label">Select order to view:</p>
          <div className="admin-orders__selector-buttons">
            {orders.map(order => (
              <button
                key={order.id}
                className={`admin-orders__selector-btn ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                {order.userName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminOrdersPage;
