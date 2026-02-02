import { useContext } from 'react';
import { CartContext } from '../context/CartContext.definition';

/**
 * Hook: useCart
 * Encapsula o acesso ao contexto do carrinho.
 * Separado do Provider para garantir compatibilidade com Fast Refresh 
 * e melhor organização de código.
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }

  return context;
};
