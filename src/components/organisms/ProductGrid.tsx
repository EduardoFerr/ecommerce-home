import { type ReactNode, useCallback, Children } from "react";
import { ProductGridSkeleton } from "../skeletons/ProductGridSkeleton";

interface ProductGridProps {
    children: ReactNode;
    isLoading?: boolean;
    error?: string | null;
}

export function ProductGrid({ children, isLoading, error }: ProductGridProps) {
    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);
    // Verifica se não há filhos válidos para exibir a mensagem de lista vazia
    const hasChildren = Children.count(children) > 0;

    if (error) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center px-4">
                <p className="text-red-500 font-medium italic uppercase text-xs tracking-widest">
                    Erro no carregamento: {error}
                </p>
                <button
                    onClick={handleRetry}
                    className="bg-black px-6 py-2 text-white font-bold text-[10px] hover:bg-opacity-80 transition-all uppercase tracking-[0.2em]"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            {isLoading ? (
                <ProductGridSkeleton items={8} />
            ) : (
                <>
                    {!hasChildren ? (
                        <div className="flex min-h-[200px] items-center justify-center">
                            <p className="text-gray-500 uppercase text-xs tracking-widest">
                                Nenhum produto encontrado.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16 transition-opacity duration-300">
                            {children}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
