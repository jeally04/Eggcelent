import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadCart();
    loadOrders();
  }, []);

  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem('@eggcelent_cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  };

  const loadOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem('@eggcelent_orders');
      if (stored) setOrders(JSON.parse(stored));
    } catch (e) {
      console.error('Error loading orders:', e);
    }
  };

  const saveCart = async (items) => {
    try {
      await AsyncStorage.setItem('@eggcelent_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== productId);
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    AsyncStorage.removeItem('@eggcelent_cart');
  };

  const placeOrder = async (deliveryInfo) => {
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: cartTotal,
      status: 'confirmed',
      deliveryInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    await AsyncStorage.setItem('@eggcelent_orders', JSON.stringify(updatedOrders));
    clearCart();
    return order;
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isInCart = (productId) => cartItems.some(item => item.id === productId);

  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};

export default CartContext;
