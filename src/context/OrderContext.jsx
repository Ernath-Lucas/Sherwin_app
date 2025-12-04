import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = (userEmail, userName, cartItems) => {
    const newOrder = {
      id: Date.now(),
      userEmail,
      userName,
      items: cartItems.map(item => ({
        reference: item.product.reference,
        name: item.product.nameEn,
        nameFr: item.product.nameFr,
        size: '1L', // Default size
        quantity: item.quantity,
        unitPrice: item.product.price,
        discount: item.discount || 0,
        totalPrice: (item.product.price * item.quantity * (1 - (item.discount || 0) / 100))
      })),
      total: cartItems.reduce((total, item) => {
        const basePrice = item.product.price * item.quantity;
        const discountAmount = (basePrice * (item.discount || 0)) / 100;
        return total + (basePrice - discountAmount);
      }, 0),
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const removeOrderItem = (orderId, itemIndex) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const newItems = order.items.filter((_, idx) => idx !== itemIndex);
        const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
        return { ...order, items: newItems, total: newTotal };
      }
      return order;
    }));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      removeOrderItem,
      deleteOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
