import type { Product, CartTotals } from '../@types/product';
import type { RawProduct, RawTotals } from '../@types/api';

export const adaptProducts = (rawProducts: RawProduct[]): Product[] => {
    return rawProducts.map((product, index) => {
        const current = product.price;
        const list = product.listPrice;

        const uniqueSalt = btoa(`${product.name}-${index}`).substring(0, 8);
        const generatedId = `${uniqueSalt}-${index}`;

        return {
            id: generatedId,
            sku: generatedId,
            name: product.name,
            imageUrl: product.image,
            price: {
                current,
                list,
                hasDiscount: list > current,
                discountPercentage:
                    list > current ? Math.round(((list - current) / list) * 100) : 0,
            },
            isPriority: index,
        };
    });
};

export const adaptTotals = (rawTotals: RawTotals): CartTotals => ({
    subtotal: rawTotals.subtotal,
    shipping: rawTotals.shipping,
    discount: rawTotals.discount,
    total: rawTotals.subtotal + rawTotals.shipping - rawTotals.discount,
});
