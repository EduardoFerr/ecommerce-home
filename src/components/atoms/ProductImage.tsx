interface ProductImageProps {
    src: string;
    alt: string;
    isPriority?: boolean;
    className?: string;
}

/**
 * Atom: ProductImage
 * Implementa estratégias de Core Web Vitals (LCP).
 * - aspect-ratio fixo para evitar CLS.
 * - fetchpriority="high" para imagens acima da dobra.
 */
export const ProductImage = ({
    src,
    alt,
    isPriority = false,
    className = ""
}: ProductImageProps) => {
    return (
        <div className={`relative overflow-hidden bg-lamoda-light aspect-product ${className}`}>
            <img
                src={src}
                alt={alt}
                loading={isPriority ? "eager" : "lazy"}
                fetchPriority={isPriority ? "high" : "low"}
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
};