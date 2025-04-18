import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);  // Store completed orders

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order) => {
    setOrders([...orders, order]);
    clearCart();  // Clear cart after order is placed
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart, orders, addOrder }}>
      {children}
    </CartContext.Provider>
  );
};
