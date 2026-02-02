import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductCard } from './ProductCard';
import { CartProvider } from '../../context/CartContext';
import * as cartHooks from '../../hooks/useCart';

// Mock do hook useCart para observar se a função addItem é chamada
// O mock isola o comportamento do componente da implementação real do contexto
vi.mock('../../hooks/useCart', async () => {
    const actual = await vi.importActual('../../hooks/useCart');
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

describe('ProductCard', () => {
    const mockProduct = {
        id: '1',
        sku: 'vestido-midi-01',
        name: 'Vestido Midi Floral',
        imageUrl: 'vestido.jpg',
        price: {
            current: 120,
            list: 150,
            hasDiscount: true,
            discountPercentage: 20,
        },
    };

    const mockAddItem = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        // Configura o retorno do mock antes de cada teste
        (cartHooks.useCart as any).mockReturnValue({
            addItem: mockAddItem,
        });
    });

    it('deve renderizar as informações do produto corretamente', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        expect(screen.getByText('Vestido Midi Floral')).toBeInTheDocument();
        // Verifica se o preço atual formatado aparece na UI
        expect(screen.getByText(/120/)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'vestido.jpg');
    });

    it('deve exibir o badge de desconto quando o produto tiver desconto', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        // O badge deve mostrar a percentagem de desconto
        expect(screen.getByText(/20% OFF/i)).toBeInTheDocument();
    });

    it('deve chamar a função addItem ao clicar no botão de compra', async () => {
        const user = userEvent.setup();
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        // Seleciona o botão diretamente pelo data-testid
        const buyButton = screen.getByTestId('buy-button');
        await user.click(buyButton);

        // Confirma que a função addItem foi chamada
        expect(mockAddItem).toHaveBeenCalledTimes(1);
        expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
    });

});