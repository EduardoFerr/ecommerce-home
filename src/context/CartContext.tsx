import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import { CartContext } from './CartContext.definition.ts';
import type { Product } from '../@types/product.ts';
import type { CartItem } from '../@types/cart.d.ts';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
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

    useEffect(() => {
        localStorage.setItem('@LaModa:cart', JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems(currentItems => {
            const isItemInCart = currentItems.find(item => item.sku === product.sku);

            if (isItemInCart) {
                return currentItems.map(item =>
                    item.sku === product.sku
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((productId: string | number) => {
        setItems(currentItems => currentItems.filter(item => item.sku !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.sku === productId ? { ...item, quantity } : item
            )
        );
    }, [removeItem]);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = useMemo(() => 
        items.reduce((acc, item) => acc + item.quantity, 0), 
    [items]);

    const cartTotal = useMemo(() => 
        items.reduce((acc, item) => acc + (item.price.current * item.quantity), 0), 
    [items]);

    const contextValue = useMemo(() => ({
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal
    }), [items, addItem, removeItem, updateQuantity, clearCart, totalItems, cartTotal]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};