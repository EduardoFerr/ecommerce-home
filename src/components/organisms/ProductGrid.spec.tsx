import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductGrid } from './ProductGrid';
import { CartProvider } from '../../context/CartContext';
import { ProductCard } from '../molecules/ProductCard';

describe('ProductGrid', () => {
    const mockProducts = [
        {
            id: '1',
            sku: 'sku-1',
            name: 'Produto 1',
            imageUrl: 'img1.jpg',
            price: { current: 10, list: 10, hasDiscount: false, discountPercentage: 0 }
        },
        {
            id: '2',
            sku: 'sku-2',
            name: 'Produto 2',
            imageUrl: 'img2.jpg',
            price: { current: 20, list: 20, hasDiscount: false, discountPercentage: 0 }
        }
    ];

    it('deve renderizar a mensagem de carregamento quando isLoading é true', () => {
        render(
            <CartProvider>
                <ProductGrid isLoading={true}>
                    {mockProducts.map(p => (
                        <ProductCard key={p.sku} product={p} />
                    ))}
                </ProductGrid>
            </CartProvider>
        );

        const loadingIndicator =
            screen.queryByRole('status') ||
            screen.queryByText(/carregando/i) ||
            screen.queryByText(/a carregar/i);

        expect(loadingIndicator).toBeInTheDocument();
    });

    it('deve renderizar a lista correta de produtos quando children são passados', () => {
        render(
            <CartProvider>
                <ProductGrid isLoading={false}>
                    {mockProducts.map(p => (
                        <ProductCard key={p.sku} product={p} />
                    ))}
                </ProductGrid>
            </CartProvider>
        );

        // Verifica se todos os produtos foram renderizados
        mockProducts.forEach(p => {
            expect(screen.getByText(p.name)).toBeInTheDocument();
        });

        // Verifica se o número de cards é igual ao número de produtos
        const cards = screen.getAllByText(/Produto [12]/);
        expect(cards).toHaveLength(mockProducts.length);
    });

    it('deve exibir mensagem de lista vazia quando não houver children', () => {
        render(
            <CartProvider>
                <ProductGrid isLoading={false}>
                    {[].map(p => (
                        <ProductCard key={p} product={p} />
                    ))}
                </ProductGrid>
            </CartProvider>
        );

        const emptyMessage = screen.getByText(/nenhum produto encontrado/i);
        expect(emptyMessage).toBeInTheDocument();
    });
});
