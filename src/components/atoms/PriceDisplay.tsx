import { formatCurrency } from '../../utils/currency';
import { memo } from 'react';

interface PriceDisplayProps {
    currentPrice: number;
    listPrice: number;
    hasDiscount: boolean;
    className?: string;
}

export const PriceDisplay = memo(({
    currentPrice,
    listPrice,
    hasDiscount,
    className = ""
}: PriceDisplayProps) => {

    return (
        <div 
            data-testid="price-display-container"
            className={`flex flex-col ${className}`}>
            {hasDiscount && (
                <del className="text-xs text-gray-600 line-through">
                    {formatCurrency(listPrice)}
                </del>
            )}
            <ins className="text-sm font-bold text-black no-underline">
                {formatCurrency(currentPrice)}
            </ins>
        </div>
    );
});