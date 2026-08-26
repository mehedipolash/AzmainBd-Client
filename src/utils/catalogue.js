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

// How many products the hero carousel will show at most. The card rotates, so
// this is a limit on the strip of thumbnails under it rather than on what fits
// across the page.
export const HERO_LIMIT = 5;

/**
 * The products the hero rotates through.
 *
 * Driven by the `featured` flag the shop owner sets in the admin panel, so the
 * homepage advertises what they chose to advertise. This used to rank by price
 * and sold count, which meant the hero silently re-ordered itself as stock
 * moved and the owner had no way to put a specific product in front.
 *
 * In-stock only regardless of the flag: featuring something nobody can buy is
 * a worse first impression than featuring nothing. When no product is flagged
 * yet — a fresh database, or the client clearing every checkbox — it falls
 * back to the newest in-stock items so the hero is never empty.
 */
export const getHeroProducts = (products = [], limit = HERO_LIMIT) => {
    const available = products.filter(isInStock);

    const flagged = available
        .filter((product) => product.featured)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (flagged.length > 0) return flagged.slice(0, limit);

    return available
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
};

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

/* ---------------------------------------------------------------------------
   One search used by both the navbar's live dropdown and the shop page's live
   filter, so the two always agree on what "matches". A product matches when the
   query appears in its name, brand or category — the three things a shopper
   types. Empty query returns nothing (the caller decides what to show instead).

   Results lead with available stock and, within that, with a name that STARTS
   with the query, so typing "sh" surfaces "Shampoo" ahead of "Herbal Shower".
--------------------------------------------------------------------------- */
export const searchProducts = (products = [], query = '', limit = Infinity) => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    const scored = products
        .map((product) => {
            const name = (product.name ?? '').toLowerCase();
            const brand = (product.brand ?? '').toLowerCase();
            const category = (product.category ?? '').toLowerCase();

            if (!name.includes(term) && !brand.includes(term) && !category.includes(term)) {
                return null;
            }

            // Lower rank sorts first: an exact name start beats a mid-name hit,
            // which beats a brand/category-only hit.
            const rank = name.startsWith(term) ? 0 : name.includes(term) ? 1 : 2;
            return { product, rank };
        })
        .filter(Boolean);

    scored.sort((a, b) => {
        const availability = byAvailability(a.product, b.product);
        if (availability) return availability;
        return a.rank - b.rank;
    });

    const results = scored.map((entry) => entry.product);
    return Number.isFinite(limit) ? results.slice(0, limit) : results;
};
