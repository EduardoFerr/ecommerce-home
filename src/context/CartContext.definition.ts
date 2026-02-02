import { createContext } from 'react';
import type { CartContextData } from '../@types/cart.d.ts';

/**
 * Context: CartContext
 * Definição isolada do contexto para evitar dependências circulares.
 * Permite que o bundler trate este ficheiro como puramente lógico (sem componentes),
 * o que resolve os erros de Fast Refresh no Provider.
 */
export const CartContext = createContext<CartContextData>({} as CartContextData);