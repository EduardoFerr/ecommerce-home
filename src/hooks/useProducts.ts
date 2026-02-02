import { useState, useEffect } from 'react';
import type { Product, CartTotals } from '../@types/product';
import { ProductService } from '../services/product.service';
import { adaptProducts, adaptTotals } from '../adapters/product.adapter';

/**
 * Hook: useProducts
 * Agora focado apenas em gestão de ESTADO e CICLO DE VIDA.
 * A lógica de cálculo foi movida para os adapters.
 */
export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totals, setTotals] = useState<CartTotals | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                setLoading(true);
                // O Service apenas busca (I/O)
                const data = await ProductService.getCatalog();

                if (isMounted) {
                    // Os Adapters tratam a lógica de negócio e transformação
                    setProducts(adaptProducts(data.products));
                    setTotals(adaptTotals(data.totals));
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Erro na API');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, []);

    return { products, totals, loading, error };
};