import type { Product } from '../../@types/product';
import { Badge } from '../atoms/Badge';
import { ProductImage } from '../atoms/ProductImage';
import { PriceDisplay } from '../atoms/PriceDisplay';

interface ProductCardProps {
    /** Objeto de produto normalizado pelo adapter */
    product: Product;
}

/**
 * Molecule: ProductCard
 * Orquestra diversos átomos para exibir as informações do produto.
 * Implementa comportamentos de hover e estados visuais consistentes.
 * * Nota: Removemos as extensões .tsx dos imports para garantir compatibilidade
 * com o bundler do ambiente, mantendo apenas a referência de tipo para o domínio.
 */
export const ProductCard = ({ product }: ProductCardProps) => {
    const { name, imageUrl, price, isPriority } = product;

    return (
        <article className="group relative flex flex-col bg-white p-2 transition-all duration-300 hover:shadow-lg">
            {/* Contentor da Imagem com Selo de Desconto */}
            <div className="relative mb-3">
                <ProductImage
                    src={imageUrl}
                    alt={name}
                    isPriority={isPriority}
                />

                {price.hasDiscount && (
                    <Badge className="absolute top-2 left-2 z-10">
                        -{price.discountPercentage}%
                    </Badge>
                )}
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-1 flex-col justify-between space-y-2 px-1">
                <h3 className="line-clamp-2 text-sm font-medium text-black uppercase tracking-tight">
                    {name}
                </h3>

                <PriceDisplay
                    currentPrice={price.current}
                    listPrice={price.list}
                    hasDiscount={price.hasDiscount}
                />
            </div>

            {/* Botão de Ação (Visível no Hover) */}
            <button
                className="mt-4 w-full bg-black py-3 text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100"
                aria-label={`Adicionar ${name} ao carrinho`}
            >
                ADICIONAR AO CARRINHO
            </button>
        </article>
    );
};