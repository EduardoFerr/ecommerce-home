import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CartProvider } from './CartContext';
import { useCart } from '../hooks/useCart';

// Constante para manter a chave sincronizada com o Provider
const STORAGE_KEY = '@LaModa:cart';

/**

Mock do LocalStorage para isolamento total dos testes.
*/
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});


const TestComponent = () => {
    const { addItem, removeItem, clearCart, totalItems } = useCart();

    return (
        <div>
            <div data-testid="cart-count">{totalItems}</div>
            <button onClick={() => addItem({
                id: '1',
                sku: 'sku-1',
                name: 'T-Shirt',
                price: { current: 100, list: 100, hasDiscount: false, discountPercentage: 0 },
                imageUrl: 'img.jpg'
            })}>
                Adicionar Item
            </button>
            <button onClick={() => removeItem('sku-1')}>Remover Item</button>
            <button onClick={clearCart}>Limpar Tudo</button>
        </div>
    );
};

describe('CartContext (Integração)', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        window.localStorage.clear();
    });

    it('deve iniciar com o carrinho vazio', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });

    it('deve adicionar um produto ao carrinho e persistir no localStorage', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: /adicionar item/i });
        await user.click(addButton);

        // Valida a UI
        await waitFor(() => {
            expect(screen.getByTestId('cart-count').textContent).toBe('1');
        });

        await waitFor(() => {
            expect(window.localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, expect.stringContaining('T-Shirt'));
            const savedCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            expect(savedCart.length).toBe(1);
        });
    });

    it('deve remover um produto do carrinho', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: /adicionar item/i });
        const removeButton = screen.getByRole('button', { name: /remover item/i });

        await user.click(addButton);
        await waitFor(() => expect(screen.getByTestId('cart-count').textContent).toBe('1'));

        await user.click(removeButton);

        await waitFor(() => {
            expect(screen.getByTestId('cart-count').textContent).toBe('0');
        });

        expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('deve limpar todo o carrinho', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: /adicionar item/i });
        const clearButton = screen.getByRole('button', { name: /limpar tudo/i });

        await user.click(addButton);
        await waitFor(() => expect(screen.getByTestId('cart-count').textContent).toBe('1'));

        await user.click(clearButton);

        await waitFor(() => {
            expect(screen.getByTestId('cart-count').textContent).toBe('0');
        });

        const finalCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
        expect(finalCart).toHaveLength(0);
    });


});