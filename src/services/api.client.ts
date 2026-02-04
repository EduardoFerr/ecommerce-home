export interface HttpClient {
    get<T>(url: string): Promise<T>;
}

export const httpClient: HttpClient = {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json() as Promise<T>;
    }
};