import type { ApiResponse } from '../@types/api';

/**
 * Service: ProductService
 * Camada de Infraestrutura (S do SOLID - Single Responsibility).
 * Isola o método de obtenção de dados (Fetch API).
 */
export const ProductService = {
    /**
     * Obtém os dados do catálogo. 
     * Localização: public/data/mock.json
     */
    async getCatalog(): Promise<ApiResponse> {
        const response = await fetch('/data/mock.json');

        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as ApiResponse;
    }
};