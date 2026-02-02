import type { ReactNode } from 'react';

interface ProductGridProps {
    /** Itens a serem renderizados (Inversão de Dependência) */
    children: ReactNode;
    /** Estado de carregamento vindo do hook/parent */
    isLoading?: boolean;
    /** Erro vindo do hook/parent */
    error?: string | null;
}

/**
 * Organism: ProductGrid
 * Responsável por gerir o layout da grelha de produtos e os estados de interface.
 * Implementa o padrão de composição para manter o baixo acoplamento com as moléculas.
 */
export const ProductGrid = ({
    children,
    isLoading,
    error
}: ProductGridProps) => {

    // Estado de Carregamento (Skeleton ou Spinner)
    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center" aria-live="polite">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-lamoda-black border-t-transparent"></div>
            </div>
        );
    }

    // Estado de Erro
    if (error) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center px-4">
                <p className="text-red-500 font-medium">Erro ao carregar catálogo: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-lamoda-black px-6 py-2 text-white font-bold text-xs hover:bg-opacity-90 transition-all uppercase tracking-widest"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    // Renderização da Grelha
    return (
        <section className="mx-auto max-w-7xl px-4 py-8">
            {/* Grid responsiva: 2 colunas em mobile, 3 em tablet, 4 em desktop */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {children}
            </div>
        </section>
    );
};