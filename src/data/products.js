// Temporary mock data. Replaced by API calls once the backend is ready — keep
// the shape identical to the Mongo product schema so swapping is a one-line
// change inside the selectors below, not a rewrite of every component.
//
// `stock` is the single source of truth for availability. Nothing stores a
// separate "inStock" boolean, so the two can never disagree.
export const categories = [
    { id: 'smartphones', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
    { id: 'laptops', name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
    { id: 'audio', name: 'Audio Gear', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
    { id: 'televisions', name: 'Televisions', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80' },
    { id: 'refrigerators', name: 'Refrigerators', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80' },
    { id: 'appliances', name: 'Home Appliances', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80' },
];

export const brands = ['Samsung', 'LG Electronics', 'Sony Bravia', 'Panasonic', 'Apple', 'Xiaomi'];

export const technologies = ['OLED', '4K UHD', '8K', '120Hz', 'HDR10+', '5G', 'Inverter'];

// Stock thresholds — one place to tune how urgency is displayed.
export const LOW_STOCK_THRESHOLD = 6;

export const products = [
    {
        _id: 'p1',
        name: 'Titanium X Pro Max',
        category: 'smartphones',
        brand: 'Apple',
        price: 89999,
        oldPrice: 95000,
        rating: 4.8,
        reviews: 214,
        stock: 3,
        soldCount: 37,
        stockTotal: 40,
        createdAt: '2026-07-28',
        specs: ['5G', '256GB'],
        description:
            'Flagship performance with an AI-accelerated chipset, a 200MP cinema-grade sensor and all-day battery life.',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&q=80',
    },
    {
        _id: 'p2',
        name: 'Smart Refrigerator Hub X',
        category: 'refrigerators',
        brand: 'Samsung',
        price: 145000,
        oldPrice: null,
        rating: 4.6,
        reviews: 88,
        stock: 12,
        soldCount: 18,
        stockTotal: 30,
        createdAt: '2026-06-14',
        specs: ['Inverter', '485L'],
        description:
            'Advanced cooling meets heritage design, featuring a built-in touch hub and smart inventory tracking.',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900&q=80',
    },
    {
        _id: 'p3',
        name: 'EliteBook Carbon Edition',
        category: 'laptops',
        brand: 'LG Electronics',
        price: 120500,
        oldPrice: 138000,
        rating: 4.7,
        reviews: 132,
        stock: 5,
        soldCount: 25,
        stockTotal: 30,
        createdAt: '2026-07-02',
        specs: ['M3 Max', '16GB RAM'],
        description:
            'A carbon-fibre ultrabook tuned for developers, with a colour-accurate display and 18-hour battery.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80',
    },
    {
        _id: 'p4',
        name: 'UltraThin OLED 65"',
        category: 'televisions',
        brand: 'LG Electronics',
        price: 219900,
        oldPrice: 249900,
        rating: 4.9,
        reviews: 301,
        stock: 8,
        soldCount: 42,
        stockTotal: 50,
        createdAt: '2026-05-20',
        specs: ['4K UHD', 'OLED', '120Hz'],
        description:
            'Pure blacks and infinite contrast from a self-lit OLED panel with a cinema-grade motion engine.',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=80',
    },
    {
        _id: 'p5',
        name: 'SonicBlast 7.1.2 Soundbar',
        category: 'audio',
        brand: 'Sony Bravia',
        price: 79900,
        oldPrice: 89900,
        rating: 4.5,
        reviews: 64,
        stock: 0,
        soldCount: 60,
        stockTotal: 60,
        createdAt: '2026-04-11',
        specs: ['Dolby Atmos', 'WiFi'],
        description:
            'Immersive spatial audio that wraps around the room, with a wireless subwoofer and auto calibration.',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&q=80',
    },
    {
        _id: 'p6',
        name: 'Galaxy Edge Ultra',
        category: 'smartphones',
        brand: 'Samsung',
        price: 124999,
        oldPrice: null,
        rating: 4.8,
        reviews: 156,
        stock: 24,
        soldCount: 16,
        stockTotal: 40,
        createdAt: '2026-08-01',
        specs: ['5G', '512GB'],
        description:
            'A titanium frame, adaptive 144Hz display and the fastest charging we have ever shipped.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80',
    },
    {
        _id: 'p7',
        name: 'ZenBook Ultra 14',
        category: 'laptops',
        brand: 'Apple',
        price: 89500,
        oldPrice: null,
        rating: 4.7,
        reviews: 198,
        stock: 15,
        soldCount: 35,
        stockTotal: 50,
        createdAt: '2026-07-19',
        specs: ['M3 Max', '16GB RAM'],
        description:
            'A featherweight 14-inch chassis with a colour-calibrated panel built for creators on the move.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80',
    },
    {
        _id: 'p8',
        name: 'SoundForge Elite Wireless',
        category: 'audio',
        brand: 'Sony Bravia',
        price: 18200,
        oldPrice: 21000,
        rating: 4.4,
        reviews: 421,
        stock: 2,
        soldCount: 88,
        stockTotal: 90,
        createdAt: '2026-06-30',
        specs: ['Hi-Res Audio', '40H Battery'],
        description:
            'Reference-grade wireless headphones with adaptive noise cancelling and 40 hours of playback.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    },
    {
        _id: 'p9',
        name: 'Heritage Washer Pro 9KG',
        category: 'appliances',
        brand: 'Panasonic',
        price: 125000,
        oldPrice: null,
        rating: 4.3,
        reviews: 52,
        stock: 0,
        soldCount: 30,
        stockTotal: 30,
        createdAt: '2026-03-08',
        specs: ['Inverter', '9KG'],
        description:
            'A quiet inverter drive with steam-clean cycles and a heritage-inspired brushed steel finish.',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&q=80',
    },
    {
        _id: 'p10',
        name: 'AirPure Smart Purifier',
        category: 'appliances',
        brand: 'Xiaomi',
        price: 24500,
        oldPrice: 29900,
        rating: 4.5,
        reviews: 176,
        stock: 31,
        soldCount: 9,
        stockTotal: 40,
        createdAt: '2026-08-03',
        specs: ['HEPA 13', 'App Control'],
        description:
            'Medical-grade HEPA filtration with real-time air quality reporting straight to your phone.',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
    },
    {
        _id: 'p11',
        name: 'ProCanvas 4K Monitor 32"',
        category: 'televisions',
        brand: 'Samsung',
        price: 68900,
        oldPrice: null,
        rating: 4.6,
        reviews: 94,
        stock: 4,
        soldCount: 26,
        stockTotal: 30,
        createdAt: '2026-07-24',
        specs: ['4K UHD', 'HDR10+'],
        description:
            'A factory-calibrated 32-inch panel with 99% DCI-P3 coverage for colour-critical work.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=80',
    },
    {
        _id: 'p12',
        name: 'Nova Buds Pro 2',
        category: 'audio',
        brand: 'Xiaomi',
        price: 9800,
        oldPrice: 12500,
        rating: 4.2,
        reviews: 512,
        stock: 48,
        soldCount: 120,
        stockTotal: 200,
        createdAt: '2026-08-05',
        specs: ['ANC', '30H Battery'],
        description:
            'Compact earbuds with adaptive noise cancelling and a pocketable wireless charging case.',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80',
    },
    {
        _id: 'p13',
        name: 'Aurora QLED 55" Smart TV',
        category: 'televisions',
        brand: 'Samsung',
        price: 92000,
        oldPrice: 108000,
        rating: 4.6,
        reviews: 143,
        stock: 6,
        soldCount: 34,
        stockTotal: 40,
        createdAt: '2026-07-11',
        specs: ['4K UHD', 'HDR10+', '120Hz'],
        description:
            'Quantum dot colour with a slim bezel and built-in streaming apps tuned for local networks.',
        image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=900&q=80',
    },
    {
        _id: 'p14',
        name: 'FrostLine Inverter AC 1.5 Ton',
        category: 'appliances',
        brand: 'LG Electronics',
        price: 68500,
        oldPrice: 74900,
        rating: 4.5,
        reviews: 267,
        stock: 19,
        soldCount: 61,
        stockTotal: 80,
        createdAt: '2026-06-22',
        specs: ['Inverter', 'Dual Cool'],
        description:
            'Dual-inverter cooling built for Dhaka summers, with a copper condenser and 10-year compressor warranty.',
        image: 'https://images.unsplash.com/photo-1631545806609-9c69bc0dd4b0?w=900&q=80',
    },
    {
        _id: 'p15',
        name: 'Redmi Note Pro 5G',
        category: 'smartphones',
        brand: 'Xiaomi',
        price: 32999,
        oldPrice: 36500,
        rating: 4.4,
        reviews: 689,
        stock: 42,
        soldCount: 158,
        stockTotal: 200,
        createdAt: '2026-07-30',
        specs: ['5G', '128GB'],
        description:
            'A 120Hz AMOLED panel, 5000mAh battery and 67W charging at a mid-range price point.',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80',
    },
    {
        _id: 'p16',
        name: 'StudioBook Creator 16',
        category: 'laptops',
        brand: 'Samsung',
        price: 165000,
        oldPrice: null,
        rating: 4.8,
        reviews: 71,
        stock: 3,
        soldCount: 22,
        stockTotal: 25,
        createdAt: '2026-08-02',
        specs: ['32GB RAM', 'RTX 4060'],
        description:
            'A colour-accurate 16-inch workstation for video and 3D, with a full-size SD reader and quiet thermals.',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&q=80',
    },
    {
        _id: 'p17',
        name: 'PureSteam Microwave Oven 30L',
        category: 'appliances',
        brand: 'Panasonic',
        price: 18900,
        oldPrice: 22000,
        rating: 4.1,
        reviews: 198,
        stock: 27,
        soldCount: 73,
        stockTotal: 100,
        createdAt: '2026-05-30',
        specs: ['30L', 'Convection'],
        description:
            'Convection, grill and steam modes in one cavity, with preset programmes for everyday cooking.',
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=900&q=80',
    },
    {
        _id: 'p18',
        name: 'DeskPro 27" IPS Monitor',
        category: 'televisions',
        brand: 'LG Electronics',
        price: 34500,
        oldPrice: null,
        rating: 4.3,
        reviews: 112,
        stock: 0,
        soldCount: 45,
        stockTotal: 45,
        createdAt: '2026-04-18',
        specs: ['4K UHD', '60Hz'],
        description:
            'A 27-inch IPS panel with USB-C power delivery and a height-adjustable stand for long working days.',
        image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=900&q=80',
    },
];

/* ---------------------------------------------------------------------------
   Selectors — the only place that knows how stock maps to display state.
   Components ask these questions instead of comparing numbers themselves.
--------------------------------------------------------------------------- */

export const isInStock = (product) => product.stock > 0;

export const isLowStock = (product) =>
    product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;

export const isSoldOut = (product) => product.stock === 0;

// Badge is derived, never stored — a sold-out item can't also show "In Stock".
export const getStockBadge = (product) => {
    if (isSoldOut(product)) return { label: 'Sold Out', tone: 'sold' };
    if (isLowStock(product)) return { label: `Only ${product.stock} left`, tone: 'low' };
    return { label: 'In Stock', tone: 'ok' };
};

export const getSoldPercent = (product) => {
    if (!product.stockTotal) return 0;
    return Math.min(100, Math.round((product.soldCount / product.stockTotal) * 100));
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

// Free delivery threshold, mirrored in the navbar strip and product pages.
export const FREE_DELIVERY_THRESHOLD = 5000;

// Stock-driven ordering: available products first, sold-out sink to the end.
// Used by every grid so customers never lead with items they cannot buy.
export const byAvailability = (a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b));

export const getMostPopular = (limit = 8) =>
    [...products].sort((a, b) => byAvailability(a, b) || b.soldCount - a.soldCount).slice(0, limit);

export const getNewest = (limit = 4) =>
    [...products]
        .sort((a, b) => byAvailability(a, b) || new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

// Deal of the day: the discounted item that is closest to selling out, so the
// banner always promotes something with genuine urgency.
export const getDealOfTheDay = () => {
    const discounted = products.filter((product) => product.oldPrice && isInStock(product));
    if (discounted.length === 0) return null;

    return discounted.sort((a, b) => getSoldPercent(b) - getSoldPercent(a))[0];
};

// The product the hero showcases. Picks the best-rated in-stock item so the
// homepage always leads with something buyable and well-reviewed — never a
// sold-out unit. Swaps to an API call later without touching the component.
export const getHeroProduct = () => getHeroProducts(1)[0] ?? null;

// The products the hero rotates through. Best-rated in-stock items only, so
// the homepage never showcases something a customer cannot buy.
export const getHeroProducts = (limit = 3) =>
    products
        .filter(isInStock)
        .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        .slice(0, limit);

// Trust figures shown under the hero. Derived from the catalogue rather than
// invented, so they stay honest as stock changes.
export const getStoreStats = () => {
    const totalReviews = products.reduce((sum, product) => sum + product.reviews, 0);
    const averageRating =
        products.reduce((sum, product) => sum + product.rating, 0) / products.length;

    return {
        productCount: products.filter(isInStock).length,
        brandCount: new Set(products.map((product) => product.brand)).size,
        totalReviews,
        averageRating: averageRating.toFixed(1),
    };
};

export const getRelated = (product, limit = 4) =>
    products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .sort(byAvailability)
        .slice(0, limit);
