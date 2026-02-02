import { memo } from 'react';
import type { Product } from '../../@types/product.ts';
import { useCart } from '../../hooks/useCart.ts';
import { ProductImage } from '../atoms/ProductImage.tsx';
import { PriceDisplay } from '../atoms/PriceDisplay.tsx';
import { Badge } from '../atoms/Badge.tsx';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
    const { addItem } = useCart();

    const discount = product.price.list && product.price.list > product.price.current
        ? Math.round(((product.price.list - product.price.current) / product.price.list) * 100)
        : null;

    return (
        <article className="flex flex-col space-y-3 bg-white relative">
            {/* 1. Imagem com Badge de Desconto */}
            <div className="relative">
                <ProductImage
                    src={product.imageUrl}
                    alt={product.name}
                    isPriority={product.isPriority}
                    width="150"
                    height="200"
                />
                {discount && (
                    <div className="absolute top-2 left-2">
                        <Badge variant="discount">
                            {discount}% OFF
                        </Badge>
                    </div>
                )}
            </div>

            {/* 2. Preço com contraste suficiente */}
            <div className="pt-2 border-t border-gray-100">
                <PriceDisplay
                    currentPrice={product.price.current}
                    listPrice={product.price.list}
                    hasDiscount={product.price.hasDiscount}
                    className="mt-2 text-gray-700" // Ajuste contraste
                />
            </div>

            {/* 3 & 4. Textos */}
            <div className="flex flex-col space-y-1">
                <h2 className="text-sm font-bold text-black uppercase tracking-wider">
                    {product.name}
                </h2>
                <p className="text-[10px] text-gray-700 uppercase leading-tight font-medium">
                    Consetetur sadipscing tsed diam nonumy eirmod.
                </p>
            </div>

            {/* 5. Botão "Add to Cart" */}
            <button
                onClick={() => addItem(product)}
                type="button"
                className="flex items-center w-fit bg-[#E5E5E5] hover:bg-[#D4D4D4] transition-colors group"
                data-testid="buy-button"
            >
                <div className="p-2 border-r border-gray-300/50">
                    <svg 
                        className="w-4 h-4 text-gray-700 group-hover:text-black" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-700">
                    Add to Cart
                </span>
            </button>
        </article>
    );
});
