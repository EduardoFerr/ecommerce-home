interface BadgeProps {
    children: React.ReactNode;
    variant?: 'discount' | 'new';
    className?: string;
}

/**
 * Atom: Badge
 * Elemento visual para destacar informações como percentual de desconto.
 */
export const Badge = ({
    children,
    variant = 'discount',
    className = ""
}: BadgeProps) => {
    const variants = {
        discount: 'bg-lamoda-black text-white',
        new: 'bg-lamoda-light text-lamoda-black border border-lamoda-black'
    };

    return (
        <span className={`
      inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider
      ${variants[variant]} 
      ${className}
    `}>
            {children}
        </span>
    );
};