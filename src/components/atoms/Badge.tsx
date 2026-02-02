import { memo, type ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'discount' | 'new';
    className?: string;
}

export const Badge = memo(({
    children,
    variant = 'discount',
    className = ""
}: BadgeProps) => {
    const variants = {
        discount: 'bg-black text-white',
        new: 'bg-gray-100 text-black border border-black'
    };

    return (
        <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
});