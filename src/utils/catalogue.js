/* ---------------------------------------------------------------------------
   Catalogue selectors.

   These are the only place that knows how stock maps to display state, so a
   component asks a question ("is this sold out?") instead of comparing numbers
   itself and getting the threshold subtly wrong somewhere.

   Every selector takes the product list as an argument rather than importing
   it. Products now come from the API, which means they arrive asynchronously
   and change while the app is running — a module-level array could only ever
   hold a stale copy.
--------------------------------------------------------------------------- */

// One place to tune how urgency is displayed.
export const LOW_STOCK_THRESHOLD = 6;

// Free delivery threshold, mirrored in the navbar strip and product pages.
export const FREE_DELIVERY_THRESHOLD = 5000;

export const isInStock = (product) => product?.stock > 0;

export const isLowStock = (product) =>
    product?.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;

export const isSoldOut = (product) => product?.stock === 0;

// Badge is derived, never stored — a sold-out item can't also show "In Stock".
export const getStockBadge = (product) => {
    if (isSoldOut(product)) return { label: 'Sold Out', tone: 'sold' };
    if (isLowStock(product)) return { label: `Only ${product.stock} left`, tone: 'low' };
    return { label: 'In Stock', tone: 'ok' };
};

// Delivery promise, derived from availability. Real shops quote a date, not a
// vague "ships soon" — and an out-of-stock item must never promise one.
export const getDeliveryEstimate = (product) => {
    if (isSoldOut(product)) return null;

    const days = isLowStock(product) ? 3 : 2;
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
};

// Stock-driven ordering: available products first, sold-out sink to the end.
// Used by every grid so customers never lead with items they cannot buy.
export const byAvailability = (a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b));

export const getMostPopular = (products = [], limit = 8) =>
    [...products]
        .sort((a, b) => byAvailability(a, b) || (b.soldCount ?? 0) - (a.soldCount ?? 0))
        .slice(0, limit);

export const getNewest = (products = [], limit = 4) =>
    [...products]
        .sort((a, b) => byAvailability(a, b) || new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

/**
 * Deal of the day: the discounted item closest to selling out, so the banner
 * always promotes something with genuine urgency.
 *
 * Falls back to the lowest-stock in-stock item when nothing is discounted —
 * which is the normal case for this shop, since the client sets a single price
 * per product rather than running strike-through offers.
 */
export const getDealOfTheDay = (products = []) => {
    const available = products.filter(isInStock);
    if (available.length === 0) return null;

    const discounted = available.filter((product) => product.oldPrice);

    if (discounted.length > 0) {
        return discounted.sort((a, b) => a.stock - b.stock)[0];
    }

    return available.sort((a, b) => a.stock - b.stock)[0];
};

/**
 * The products the hero rotates through. In-stock only, so the homepage never
 * showcases something a customer cannot buy. Ordering prefers items that are
 * actually priced — a hero slide reading "Price on request" is a weaker first
 * impression than one showing a number.
 */
export const getHeroProducts = (products = [], limit = 3) =>
    products
        .filter(isInStock)
        .sort(
            (a, b) =>
                Number(Boolean(b.price)) - Number(Boolean(a.price)) ||
                (b.soldCount ?? 0) - (a.soldCount ?? 0) ||
                new Date(b.createdAt) - new Date(a.createdAt),
        )
        .slice(0, limit);

export const getHeroProduct = (products = []) => getHeroProducts(products, 1)[0] ?? null;

/**
 * Trust figures shown under the hero. Derived from the catalogue rather than
 * invented, so they stay honest as stock changes.
 *
 * Ratings and review counts are deliberately absent: this shop has no review
 * system, and printing a fabricated "4.8 from 214 reviews" on a real client's
 * site is a claim they cannot stand behind.
 */
export const getStoreStats = (products = [], categories = []) => ({
    productCount: products.filter(isInStock).length,
    brandCount: new Set(products.map((product) => product.brand).filter(Boolean)).size,
    categoryCount: categories.length,
});

export const getRelated = (product, products = [], limit = 4) =>
    products
        .filter((item) => item.category === product?.category && item._id !== product?._id)
        .sort(byAvailability)
        .slice(0, limit);

// Brands present in the catalogue, for the shop filter sidebar.
export const getBrands = (products = []) =>
    [...new Set(products.map((product) => product.brand).filter(Boolean))].sort();
