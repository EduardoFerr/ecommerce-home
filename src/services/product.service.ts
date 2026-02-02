import type { ApiResponse } from '../@types/api';

let cachedCatalog: ApiResponse | null = null;
let fetchPromise: Promise<ApiResponse> | null = null;


export const ProductService = {
    async getCatalog(): Promise<ApiResponse> {
        if (cachedCatalog) return cachedCatalog;
        if (fetchPromise) return fetchPromise;

        fetchPromise = fetch('/data/mock.json')
            .then(async (response) => {
                if (!response.ok) throw new Error(`Erro na rede: ${response.status}`);
                const data = (await response.json()) as ApiResponse;
                cachedCatalog = data;       // salva no cache
                return data;
            })
            .finally(() => {
                fetchPromise = null;        // libera a promise
            });

        return fetchPromise;
    },
};
