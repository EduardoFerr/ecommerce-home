import { describe, it, expect } from 'vitest';
import { adaptProducts } from './product.adapter';

/**
 * Este é um teste unitário puro. 
 * Não precisa de browser, não precisa de React. 
 * É ultra-rápido e testa a lógica matemática do teu app.
 */
describe('Product Adapter', () => {

    it('deve calcular a percentagem de desconto corretamente', () => {
        // 1. Preparação (Mock dos dados que viriam da API)
        const mockRawProducts = [
            {
                name: 'T-Shirt La Moda',
                listPrice: 100, // Preço original
                price: 80,      // Preço com desconto
                image: 'tshirt.jpg'
            }
        ];

        // 2. Execução
        const result = adaptProducts(mockRawProducts);

        // 3. Verificação
        // (100 - 80) / 100 * 100 = 20%
        expect(result[0].price.discountPercentage).toBe(20);
        expect(result[0].price.hasDiscount).toBe(true);
    });

    it('deve identificar quando um produto não tem desconto', () => {
        const mockRawProducts = [
            {
                name: 'Sapato Luxo',
                listPrice: 200,
                price: 200,
                image: 'sapato.jpg'
            }
        ];

        const result = adaptProducts(mockRawProducts);

        expect(result[0].price.discountPercentage).toBe(0);
        expect(result[0].price.hasDiscount).toBe(false);
    });
});