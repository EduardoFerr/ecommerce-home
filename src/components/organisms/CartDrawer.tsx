import { useEffect } from "react";
import { useCart } from "../../hooks/useCart.ts";
import { formatCurrency } from "../../utils/currency";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, removeItem, updateQuantity, cartTotal, totalItems } =
        useCart();


    useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.style.overflow = isOpen ? "hidden" : "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay: Otimizado com Backdrop Blur e Hardware Acceleration */}
            <div
                className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 will-change-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-label="Carrinho de Compras"
                className={`fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col will-change-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black tracking-tighter uppercase">
                        Carrinho{" "}
                        <span className="text-gray-400 font-medium ml-1">
                            ({totalItems})
                        </span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors outline-none focus:ring-2 focus:ring-black"
                        aria-label="Fechar carrinho"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold italic">
                                O teu carrinho está vazio
                            </p>
                            <button
                                onClick={onClose}
                                className="text-xs font-bold uppercase underline tracking-widest hover:text-gray-500 transition-colors"
                            >
                                Continuar a comprar
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.sku}
                                className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-300"
                            >
                                <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-100 relative aspect-[3/4]">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col justify-between py-1">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-tight line-clamp-2 leading-relaxed">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm font-black mt-2 text-black">
                                            {formatCurrency(item.price.current)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-gray-200 bg-white">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.sku, item.quantity - 1)
                                                }
                                                className="px-3 py-1 hover:bg-black hover:text-white transition-colors text-xs disabled:opacity-30"
                                                aria-label="Diminuir quantidade"
                                            >
                                                -
                                            </button>
                                            <span
                                                className="px-2 text-xs font-black min-w-[30px] text-center"
                                                aria-live="polite"
                                            >
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.sku, item.quantity + 1)
                                                }
                                                className="px-3 py-1 hover:bg-black hover:text-white transition-colors text-xs"
                                                aria-label="Aumentar quantidade"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.sku)}
                                            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                            <span>Subtotal</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-black tracking-tighter border-t border-gray-200 pt-3">
                            <span>TOTAL</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                    </div>

                    <button
                        disabled={items.length === 0}
                        className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:cursor-not-allowed transform"
                    >
                        Finalizar Compra
                    </button>

                    <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest mt-4">
                        Envio Grátis em encomendas superiores a 100€
                    </p>
                </div>
            </div>
        </>
    );
};
