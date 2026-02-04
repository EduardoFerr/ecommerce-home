// src/services/product.service.ts
import type { ApiResponse } from '../@types/api';
import { httpClient, type HttpClient } from './api.client';

class ProductService {
    private cachedCatalog: ApiResponse | null = null;
    private fetchPromise: Promise<ApiResponse> | null = null;
    private client: HttpClient;

    constructor(client: HttpClient = httpClient) {
        this.client = client;
    }

    async getCatalog(): Promise<ApiResponse> {
        if (this.cachedCatalog) return this.cachedCatalog;
        if (this.fetchPromise) return this.fetchPromise;

        this.fetchPromise = this.client.get<ApiResponse>('/data/mock.json')
            .then((data) => {
                this.cachedCatalog = data;
                return data;
            })
            .finally(() => {
                this.fetchPromise = null;
            });

        return this.fetchPromise;
    }
}

export const productService = new ProductService();