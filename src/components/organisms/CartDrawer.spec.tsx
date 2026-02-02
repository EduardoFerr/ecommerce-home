import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartDrawer } from './CartDrawer';
import { CartProvider } from '../../context/CartContext';
import * as cartHooks from '../../hooks/useCart';

// Mock do hook useCart para isolar o estado do carrinho durante os testes.
// Isto permite-nos injetar estados específicos (vazio, com itens) sem depender da lógica real.
vi.mock('../../hooks/useCart', async () => {
    const actual = await vi.importActual('../../hooks/useCart');
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

describe('CartDrawer', () => {
    const mockItems = [
        {
            id: '1',
            sku: 'item-1',
            name: 'Produto A',
            quantity: 2,
            imageUrl: 'thumb1.jpg',
            price: { current: 50, list: 50, hasDiscount: false, discountPercentage: 0 }
        }
    ];

    beforeEach(() => {
        // Limpamos os mocks antes de cada teste para garantir isolamento.
        vi.clearAllMocks();
    });

    it('deve exibir mensagem de carrinho vazio quando não houver itens', () => {
        // Configuramos o mock para retornar um estado de carrinho vazio.
        (cartHooks.useCart as any).mockReturnValue({
            items: [],
            cartTotal: 0,
            totalItems: 0,
        });

        render(
            <CartProvider>
                <CartDrawer isOpen={true} onClose={vi.fn()} />
            </CartProvider>
        );

        // Ajustado para o texto PT-PT que está no componente real
        expect(screen.getByText(/o teu carrinho está vazio/i)).toBeInTheDocument();
    });

    it('deve renderizar a lista de produtos e o total corretamente', () => {
        // Configuramos o mock para retornar um carrinho com produtos.
        (cartHooks.useCart as any).mockReturnValue({
            items: mockItems,
            cartTotal: 100,
            totalItems: 2,
        });

        render(
            <CartProvider>
                <CartDrawer isOpen={true} onClose={vi.fn()} />
            </CartProvider>
        );

        expect(screen.getByText('Produto A')).toBeInTheDocument();
        
        // Usamos getAllByText porque o valor aparece no Subtotal e no Total na implementação real.
        const priceElements = screen.getAllByText(/100,00/);
        expect(priceElements.length).toBeGreaterThanOrEqual(1);

        // Verifica a quantidade do item.
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('deve chamar a função onClose ao clicar no botão de fechar', async () => {
        const mockOnClose = vi.fn();
        (cartHooks.useCart as any).mockReturnValue({
            items: mockItems,
            cartTotal: 100,
            totalItems: 2,
        });

        const user = userEvent.setup();
        render(
            <CartProvider>
                <CartDrawer isOpen={true} onClose={mockOnClose} />
            </CartProvider>
        );

        // Procura pelo aria-label que está no teu código: "Fechar carrinho"
        const closeButton = screen.getByLabelText(/fechar carrinho/i);
        await user.click(closeButton);

        // Valida se a prop onClose foi executada corretamente.
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});