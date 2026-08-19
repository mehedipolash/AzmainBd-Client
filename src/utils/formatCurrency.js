// Single source of truth for money rendering. Prices are stored as integer
// BDT everywhere so we never do float math on currency.

// Shown wherever a product has no price set. Ordering happens over WhatsApp,
// so "ask us" is a real state for this shop rather than a placeholder — the
// client genuinely quotes some items on request.
export const PRICE_ON_REQUEST = 'Price on request';

/**
 * A missing price is deliberately NOT rendered as "৳ 0" — showing zero for an
 * unpriced item reads as free and is the kind of bug that ends in an argument
 * with a customer.
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === '') {
        return PRICE_ON_REQUEST;
    }

    const value = Number(amount);
    if (!Number.isFinite(value)) return PRICE_ON_REQUEST;

    return `৳ ${value.toLocaleString('en-BD')}`;
};

export const hasPrice = (product) =>
    product?.price !== null && product?.price !== undefined && Number(product.price) > 0;

export const calcDiscount = (price, oldPrice) => {
    if (!price || !oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
};
