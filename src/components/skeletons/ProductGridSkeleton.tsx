interface ProductGridSkeletonProps {
    items?: number;
}

export const ProductGridSkeleton = ({ items = 8 }: ProductGridSkeletonProps) => {
    return (
        <section
            className="mx-auto max-w-7xl px-4 py-8"
            aria-busy="true"
            aria-live="polite"
            role="status"
        >
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16 animate-pulse">
                {Array.from({ length: items }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
};

export const ProductCardSkeleton = () => (
    <article className="flex flex-col space-y-3 relative animate-pulse" aria-hidden="true">
        {/* Imagem */}
        <div className="aspect-[3/4] w-full bg-gray-200 border border-gray-300" />
        {/* Preço */}
        <div className="pt-2 border-t border-gray-100">
            <div className="h-8 w-24 bg-gray-200" />
        </div>
        {/* Textos */}
        <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200" />
            <div className="h-3 w-1/2 bg-gray-100" />
        </div>
        {/* Botão */}
        <div className="h-8 w-28 bg-gray-200" />
    </article>
);

export const HeaderSkeleton = () => (
    <header className="w-full bg-white py-8 border-b border-gray-100 sticky top-0 z-50" aria-hidden="true">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 animate-pulse">
            <div className="h-8 w-40 bg-gray-200" />
            <div className="flex items-center gap-3 bg-gray-200 px-5 py-3">
                <div className="h-5 w-5 bg-gray-300" />
                <div className="h-3 w-40 bg-gray-300" />
            </div>
        </div>
    </header>
);

export const FooterSkeleton = () => (
    <footer className="border-t border-gray-100 bg-white py-12" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0 animate-pulse">
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <div className="h-5 w-28 bg-gray-200" />
                    <div className="h-3 w-40 bg-gray-100" />
                </div>
                <div className="flex space-x-6">
                    <div className="h-3 w-20 bg-gray-200" />
                    <div className="h-3 w-16 bg-gray-200" />
                    <div className="h-3 w-14 bg-gray-200" />
                </div>
                <div className="h-3 w-56 bg-gray-100" />
            </div>
        </div>
    </footer>
);
