import type { Product, CartTotals } from '../@types/product';
import type { RawProductMock, RawProductExternal, RawTotals } from '../@types/api';

/**
 * Adapter: adaptProducts
 * Transforma os dados brutos da API para o domínio da aplicação.
 * Respeita o 'S' do SOLID ao isolar a transformação.
 */
export const adaptProducts = (
    rawProducts: (RawProductMock | RawProductExternal)[]
): Product[] => {
    return rawProducts.map((raw, index) => {
        const isExternal = 'priceSpecification' in raw;
        const current = isExternal 
            ? (raw as RawProductExternal).priceSpecification.price 
            : (raw as RawProductMock).price;
        
        const list = isExternal 
            ? (raw as RawProductExternal).priceSpecification.originalPrice 
            : (raw as RawProductMock).listPrice;

        const generatedId = btoa(raw.name + raw.image).substring(0, 12);

        return {
            id: generatedId,
            sku: generatedId,
            name: raw.name,
            imageUrl: raw.image,
            price: {
                current,
                list,
                hasDiscount: list > current,
                discountPercentage: list > current ? Math.round(((list - current) / list) * 100) : 0
            },
            isPriority: index === 0 // SEO/LCP Hint
        };
    });
};

/**
 * Adapter: adaptTotals
 * Calcula o total líquido. 
 * Remove a lógica de negócio do Hook de UI (SOLID - S).
 */
export const adaptTotals = (rawTotals: RawTotals): CartTotals => {
    return {
        subtotal: rawTotals.subtotal,
        shipping: rawTotals.shipping,
        discount: rawTotals.discount,
        total: rawTotals.subtotal + rawTotals.shipping - rawTotals.discount
    };
};