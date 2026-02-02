/**
 * Utilitário para formatação de moeda seguindo o padrão brasileiro (BRL).
 * Utiliza Intl.NumberFormat para performance e suporte nativo a i18n.
 */

const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const formatCurrency = (value: number): string => {
    if (isNaN(value)) return BRL_FORMATTER.format(0);
    return BRL_FORMATTER.format(value);
};

