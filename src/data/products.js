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

export const getRelated = (product, limit = 4) =>
    products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .sort(byAvailability)
        .slice(0, limit);
