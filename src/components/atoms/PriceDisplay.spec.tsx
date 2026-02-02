import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PriceDisplay } from './PriceDisplay';

describe('PriceDisplay', () => {
    const mockPrice = {
        current: 80,
        list: 100,
        hasDiscount: true,
        discountPercentage: 20
    };

    it('deve renderizar o preço atual formatado corretamente', () => {
        render(
            <PriceDisplay
                currentPrice={mockPrice.current}
                listPrice={mockPrice.list}
                hasDiscount={mockPrice.hasDiscount}
            />
        );

        expect(screen.getByText(/80/)).toBeInTheDocument();
    });

    it('deve exibir o preço de lista riscado quando houver desconto', () => {
        render(
            <PriceDisplay
                currentPrice={mockPrice.current}
                listPrice={mockPrice.list}
                hasDiscount={mockPrice.hasDiscount}
            />
        );

        const listPrice = screen.getByText(/100/);
        expect(listPrice).toBeInTheDocument();
        expect(listPrice).toHaveClass('line-through');
    });

    it('não deve renderizar o preço de lista se não houver desconto', () => {
        const noDiscountPrice = {
            ...mockPrice,
            hasDiscount: false,
            current: 100
        };

        render(
            <PriceDisplay
                currentPrice={noDiscountPrice.current}
                listPrice={noDiscountPrice.list}
                hasDiscount={noDiscountPrice.hasDiscount}
            />
        );

        const prices = screen.queryAllByText(/100/);
        expect(prices).toHaveLength(1);

        const strikethroughElement = document.querySelector('.line-through');
        expect(strikethroughElement).toBeNull();
    });

    it('deve aceitar e aplicar classes CSS adicionais via props', () => {
        render(
            <PriceDisplay
                currentPrice={mockPrice.current}
                listPrice={mockPrice.list}
                hasDiscount={mockPrice.hasDiscount}
                className="my-custom-style"
            />
        );

        const container = screen.getByTestId('price-display-container');
        expect(container).toHaveClass('my-custom-style');
    });
});
