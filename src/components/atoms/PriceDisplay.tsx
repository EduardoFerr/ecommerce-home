import { formatCurrency } from '../../utils/currency';

interface PriceDisplayProps {
    /** Preço atual com desconto aplicado */
    currentPrice: number;
    /** Preço original de tabela */
    listPrice: number;
    /** Flag que indica se o produto possui uma promoção ativa */
    hasDiscount: boolean;
    /** Classes CSS adicionais para customização */
    className?: string;
}

/**
 * Atom: PriceDisplay
 * Responsável por renderizar o preço com a lógica de 'De/Por'.
 * Focado em acessibilidade usando as tags semânticas <ins> e <del>.
 */
export const PriceDisplay = ({
    currentPrice,
    listPrice,
    hasDiscount,
    className = ""
}: PriceDisplayProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {hasDiscount && (
                <del className="text-sm text-gray-500 line-through">
                    {formatCurrency(listPrice)}
                </del>
            )}
            <ins className="text-lg font-bold text-black no-underline">
                {formatCurrency(currentPrice)}
            </ins>
        </div>
    );
};