import { useState, useCallback, lazy, Suspense } from 'react';
import { useCart } from '../../hooks/useCart.ts';
import { formatCurrency } from '../../utils/currency';


const CartDrawer = lazy(() => import('./CartDrawer.tsx').then(module => ({ default: module.CartDrawer })));


export const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { totalItems, cartTotal } = useCart();

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    return (
        <>
            <header className="w-full bg-white py-8 border-b border-gray-100 sticky top-0 z-50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

                    <div className="flex items-center">
                        <a href="/" className="text-3xl font-black tracking-tighter text-black uppercase italic">
                            STORE<span className="font-light">_WIRE</span>
                        </a>
                    </div>

                    <button
                        onClick={openCart}
                        className="flex items-center gap-3 bg-[#E5E5E5] px-5 py-3 transition-all hover:bg-black hover:text-white group"
                        aria-label="Ver carrinho"
                    >
                        <div className="p-1">
                            <svg className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            CART: {totalItems} {totalItems > 1 ? 'ITEMS' : 'ITEM'} - {formatCurrency(cartTotal)}
                        </span>
                    </button>
                </div>
            </header>

            <Suspense fallback={null}>
                {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={closeCart} />}
            </Suspense>
        </>
    );
};