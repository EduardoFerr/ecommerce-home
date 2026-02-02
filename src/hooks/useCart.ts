import { useContext } from 'react';
import { CartContext } from '../context/CartContext.definition';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }

  return context;
};
