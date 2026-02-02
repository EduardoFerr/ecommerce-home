import { createContext } from 'react';
import type { CartContextData } from '../@types/cart.d.ts';

export const CartContext = createContext<CartContextData>({} as CartContextData);