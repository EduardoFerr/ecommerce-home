/**
 * Interface de Domínio Única do Produto.
 * * Por que esta estrutura é 'Senior Level'?
 * 1. Separação de Preços: Agrupamos dados financeiros para facilitar formatação e lógica de 'De/Por'.
 * 2. Identificadores Distintos: Mantemos 'id' para o React (DOM) e 'sku' para o Negócio (Carrinho/Stock).
 * 3. SEO & Performance: Já prevemos campos que ajudam no Core Web Vitals (como a flag de prioridade).
 */

export interface ProductPrice {
    current: number;          // O preço que o cliente vai pagar agora
    list: number;             // O preço original (preço de tabela)
    hasDiscount: boolean;     // Flag para facilitar a renderização de badges de oferta
    discountPercentage: number; // Valor calculado para evitar lógica pesada no componente
}

export interface Product {
    id: string;               // UUID ou Hash para chaves únicas no React (key={product.id})
    sku: string;              // Identificador comercial (essencial para integração com carrinho)
    name: string;             // Nome comercial do produto
    imageUrl: string;         // URL da imagem já normalizada

    price: ProductPrice;      // Objeto de preço estruturado

    /**
     * Metadado para Core Web Vitals (Performance)
     * Se true, o componente deve renderizar a imagem com:
     * fetchpriority="high" e loading="eager"
     */
    isPriority?: boolean;
}

/**
 * Totais do Carrinho/Checkout.
 * Estrutura comum em gateways de pagamento e plataformas como VTEX.
 */
export interface CartTotals {
    subtotal: number;         // Soma bruta dos produtos
    discount: number;         // Total de deduções (cupões, promoções)
    shipping: number;         // Custo de entrega
    total: number;            // Valor líquido final (o que é cobrado no cartão)
}