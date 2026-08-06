// Single source of truth for money rendering. Prices are stored as integer
// BDT everywhere so we never do float math on currency.
export const formatCurrency = (amount) => {
    return `৳ ${Number(amount).toLocaleString("en-BD")}`;
};

export const calcDiscount = (price, oldPrice) => {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
};
