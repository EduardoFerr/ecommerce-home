import type { Product } from '../../@types/product.ts';
import { useCart } from '../../hooks/useCart.ts';
import { Badge } from '../atoms/Badge.tsx';
import { ProductImage } from '../atoms/ProductImage.tsx';
import { PriceDisplay } from '../atoms/PriceDisplay.tsx';

interface ProductCardProps {
    product: Product;
}

/**
 * Molecule: ProductCard
 * Componente que exibe as informações do produto e permite a compra.
 * Atualizado para utilizar átomos especializados que otimizam o LCP e CLS.
 * Nota Técnica: Adicionadas extensões explícitas .ts e .tsx para garantir
 * a resolução de módulos no ambiente de compilação.
 */
export const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem } = useCart();

    return (
        <div className="group relative flex flex-col bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Atom: ProductImage - Gere aspect-ratio e fetchpriority para performance */}
            <ProductImage
                src={product.imageUrl}
                alt={product.name}
                isPriority={product.isPriority}
            />

            {product.price.hasDiscount && (
                <div className="absolute top-2 left-2 z-10">
                    <Badge variant="discount">
                        {product.price.discountPercentage}% OFF
                    </Badge>
                </div>
            )}

            {/* Info do Produto */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-medium text-gray-700 h-10 overflow-hidden line-clamp-2">
                    {product.name}
                </h3>

                {/* Atom: PriceDisplay - Centraliza a lógica de formatação e de/por */}
                <PriceDisplay
                    currentPrice={product.price.current}
                    listPrice={product.price.list}
                    hasDiscount={product.price.hasDiscount}
                    className="mt-2"
                />

                {/* Botão de Ação */}
                <button
                    onClick={() => addItem(product)}
                    className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};