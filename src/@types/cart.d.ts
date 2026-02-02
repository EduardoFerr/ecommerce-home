import { Product } from './product';

/**
 * Interface que representa um item dentro do carrinho.
 * Estende o produto original mas foca na quantidade.
 */
export interface CartItem extends Product {
    quantity: number;
}

/**
 * Definição do estado global do carrinho.
 */
export interface CartContextData {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: number | string) => void;
    updateQuantity: (productId: number | string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    cartTotal: number;
}