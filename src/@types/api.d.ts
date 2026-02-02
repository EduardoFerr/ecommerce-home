/**
 * Interfaces que representam o schema bruto (raw) dos JSONs de entrada.
 */

export interface RawProductMock {
  name: string;
  listPrice: number;
  price: number;
  image: string;
}

/**
 * Interface para a segunda estrutura de dados mencionada no desafio
 * (priceSpecification).
 */
export interface RawProductExternal {
  name: string;
  image: string;
  priceSpecification: {
    price: number;
    originalPrice: number;
    percent?: number;
  };
}

export interface RawTotals {
  productsTotal: number;
  shipping: number;
  discount: number;
  subtotal: number;
}

export interface ApiResponse {
  products: (RawProductMock | RawProductExternal)[];
  totals: RawTotals;
}