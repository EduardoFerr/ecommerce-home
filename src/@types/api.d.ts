/**
 * Interfaces que representam o schema bruto (raw) dos JSONs de entrada.
 */


export interface RawProduct {
  name: string;
  listPrice: number;
  price: number;
  image: string;
}

export interface RawTotals {
  productsTotal: number;
  shipping: number;
  discount: number;
  subtotal: number;
}

export interface ApiResponse {
  products: RawProduct[];
  totals: RawTotals;
}