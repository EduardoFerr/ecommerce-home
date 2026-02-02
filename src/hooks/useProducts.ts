import { useState, useEffect, useMemo } from 'react';
import type { Product, CartTotals } from '../@types/product';
import type { ApiResponse } from '../@types/api';
import { ProductService } from '../services/product.service';
import { adaptProducts, adaptTotals } from '../adapters/product.adapter';

export const useProducts = () => {
    const [rawData, setRawData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                setLoading(true);
                const data = await ProductService.getCatalog();
                if (isMounted) {
                    setRawData(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Erro na comunicação com a API');
                    console.error('[useProducts] Fetch Error:', err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const products: Product[] = useMemo(() => {
        if (!rawData?.products) return [];
        return adaptProducts(rawData.products);
    }, [rawData?.products]);

    const totals: CartTotals | null = useMemo(() => {
        if (!rawData?.totals) return null;
        return adaptTotals(rawData.totals);
    }, [rawData?.totals]);

    return { products, totals, loading, error };
};
