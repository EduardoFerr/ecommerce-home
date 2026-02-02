import { memo } from 'react';
interface ProductImageProps {
    width?: string;
    height?: string;
    src?: string;
    alt: string;
    isPriority?: number;
    className?: string;
}

export const ProductImage = memo(({
    width="150",
    height="200",
    src,
    alt,
    isPriority=10,
    className = ""
}: ProductImageProps) => {
    return (
        <div className={`relative overflow-hidden bg-lamoda-light aspect-product ${className}`}>
            <img
                width={width}
                height={height}
                src={src ?? "/images/placeholder.webp"}
                alt={alt}
                decoding={isPriority > 0 ? "sync" : "async"}
                loading={isPriority < 4? "eager" : "lazy"}
                fetchPriority={isPriority < 4 ? "high" : "low"}
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
        </div>
    );
});