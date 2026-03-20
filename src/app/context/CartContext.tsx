'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCart, CartItemInput } from '@/app/actions/cart';
import { useAuth } from '@/app/context/AuthContext';

interface CartContextType {
  cartItems: CartItemInput[];
  cartCount: number;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Re-fetch cart if user session changes

  const refreshCart = async () => {
    setIsLoading(true);
    try {
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]); // Whenever user login/logout happens, cart will refresh

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, refreshCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
