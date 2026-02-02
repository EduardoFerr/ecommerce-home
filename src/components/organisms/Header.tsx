import { useState, useCallback } from 'react';
import { useCart } from '../../hooks/useCart.ts';
import { CartDrawer } from './CartDrawer.tsx';

/**
 * Organism: Header
 * Componente de navegação principal.
 * Otimizado para Core Web Vitals (LCP/CLS) e SOLID.
 * - S: Responsabilidade única de navegação e controle de estado do Drawer.
 * - Performance: Uso de useCallback para evitar re-renders desnecessários.
 */
export const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    // Memorização de funções de controle para estabilidade de referência
    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md transition-all duration-300">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-6">

                    {/* Logo: H1 oculto para SEO, Div visual para branding */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-black tracking-tighter text-black hover:opacity-80 transition-opacity">
                            LA MODA
                        </a>
                    </div>

                    {/* Navegação Desktop: Espaçamento otimizado para evitar CLS em diferentes viewports */}
                    <nav className="hidden space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] md:flex text-black/70">
                        <a href="#" className="transition-colors hover:text-black border-b-2 border-transparent hover:border-black py-1">Novidades</a>
                        <a href="#" className="transition-colors hover:text-black border-b-2 border-transparent hover:border-black py-1">Coleções</a>
                        <a href="#" className="transition-colors hover:text-black font-black text-red-600 py-1">Saldos</a>
                    </nav>

                    {/* Ações Rápidas: Targets de clique otimizados para Mobile (mínimo 44px) */}
                    <div className="flex items-center space-x-2 md:space-x-6">
                        <button
                            aria-label="Pesquisar no catálogo"
                            className="p-2 hover:bg-gray-50 rounded-full transition-all group"
                        >
                            <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button
                            onClick={openCart}
                            aria-label={`Ver carrinho com ${totalItems} itens`}
                            className="relative p-2 hover:bg-gray-50 rounded-full transition-all group"
                        >
                            <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>

                            {/* Contador: Uso de 'animate-bounce' apenas quando muda o valor para feedback visual (INP) */}
                            {totalItems > 0 && (
                                <span
                                    key={totalItems}
                                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-black text-white animate-in zoom-in duration-300"
                                >
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Componente do Carrinho Lateral: Lazy-loaded mentalmente por ser condicional no DOM */}
            <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
        </>
    );
};