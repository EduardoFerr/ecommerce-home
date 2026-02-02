import { useState, useEffect, type ReactNode } from 'react';
import { CartContext } from './CartContext.definition';
import type { Product } from '../@types/product.ts';
import type { CartItem } from '../@types/cart.d.ts';

/**
 * Provider: CartProvider
 * Responsável por gerir o estado e as regras de negócio do carrinho.
 * Este ficheiro exporta APENAS o componente para garantir compatibilidade com Fast Refresh.
 * * Revisão Sénior:
 * 1. Implementação de Lazy Initializer para performance.
 * 2. Sincronização robusta com LocalStorage via useEffect.
 * 3. Lógica de agregação de itens baseada em SKU.
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Verificação de ambiente SSR (Segurança para execução em Node/Next/Vite)
        if (typeof window === 'undefined') return [];

        const savedCart = localStorage.getItem('@LaModa:cart');
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (e) {
                console.error("Erro ao carregar o carrinho do LocalStorage", e);
                return [];
            }
        }
        return [];
    });

    // Persistência automática do estado do carrinho
    useEffect(() => {
        localStorage.setItem('@LaModa:cart', JSON.stringify(items));
    }, [items]);

    // Adiciona um item ou incrementa a quantidade se já existir
    const addItem = (product: Product) => {
        setItems(currentItems => {
            const isAlreadyInCart = currentItems.find(item => item.sku === product.sku);

            if (isAlreadyInCart) {
                return currentItems.map(item =>
                    item.sku === product.sku
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    // Remove um item completamente pelo SKU
    const removeItem = (productId: string | number) => {
        setItems(currentItems => currentItems.filter(item => item.sku !== productId));
    };

    // Atualiza a quantidade, removendo o item se chegar a zero
    const updateQuantity = (productId: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.sku === productId ? { ...item, quantity } : item
            )
        );
    };

    // Limpa todo o estado do carrinho
    const clearCart = () => setItems([]);

    // Cálculos derivados (Memoization implícita por renderização)
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const cartTotal = items.reduce((acc, item) => acc + (item.price.current * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};