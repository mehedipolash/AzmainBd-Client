// Temporary mock data. Replaced by API calls once the backend is ready —
// keep the shape identical to the Mongo product schema so swapping is a
// one-line change inside the hooks, not a rewrite of every component.
export const categories = [
    { id: "smartphones", name: "Smartphones", icon: "phone" },
    { id: "laptops", name: "Laptops", icon: "laptop" },
    { id: "refrigerators", name: "Refrigerators", icon: "fridge" },
    { id: "televisions", name: "Televisions", icon: "tv" },
    { id: "audio", name: "Audio Gear", icon: "audio" },
    { id: "appliances", name: "Home Appliances", icon: "appliance" },
];

export const brands = ["Samsung", "LG Electronics", "Sony Bravia", "Panasonic", "Apple", "Xiaomi"];

export const technologies = ["OLED", "4K UHD", "8K", "120Hz", "HDR10+", "5G", "Inverter"];

export const products = [
    {
        _id: "p1",
        name: "Latest Mobile Phone Pro Max",
        category: "smartphones",
        brand: "Apple",
        price: 89999,
        oldPrice: 95000,
        badge: "HOT",
        rating: 4.8,
        reviews: 214,
        inStock: true,
        specs: ["5G", "256GB"],
        description:
            "Flagship performance with an AI-accelerated chipset, a 200MP cinema-grade sensor and all-day battery.",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    },
    {
        _id: "p2",
        name: "Smart Refrigerator Hub X",
        category: "refrigerators",
        brand: "Samsung",
        price: 145000,
        oldPrice: null,
        badge: "PREMIUM",
        rating: 4.6,
        reviews: 88,
        inStock: true,
        specs: ["Inverter", "485L"],
        description:
            "Advanced cooling meets heritage design, featuring a built-in touch hub and smart inventory tracking.",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    },
    {
        _id: "p3",
        name: "EliteBook Carbon Edition",
        category: "laptops",
        brand: "LG Electronics",
        price: 120500,
        oldPrice: null,
        badge: "SALE",
        rating: 4.7,
        reviews: 132,
        inStock: true,
        specs: ["M3 Max", "16GB RAM"],
        description:
            "A carbon-fibre ultrabook tuned for developers, with a colour-accurate display and 18-hour battery.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    },
    {
        _id: "p4",
        name: "UltraThin OLED Television 65\"",
        category: "televisions",
        brand: "LG Electronics",
        price: 219900,
        oldPrice: 249900,
        badge: "FEATURED",
        rating: 4.9,
        reviews: 301,
        inStock: true,
        specs: ["4K UHD", "OLED", "120Hz"],
        description:
            "Pure blacks and infinite contrast with our self-lit OLED panel and a cinema-grade motion engine.",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    },
    {
        _id: "p5",
        name: "SonicBlast 7.1.2 Soundbar",
        category: "audio",
        brand: "Sony Bravia",
        price: 79900,
        oldPrice: 89900,
        badge: null,
        rating: 4.5,
        reviews: 64,
        inStock: true,
        specs: ["Dolby Atmos", "WiFi"],
        description:
            "Immersive spatial audio that wraps around you, with wireless subwoofer and room calibration.",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    },
    {
        _id: "p6",
        name: "Titanium X Pro OLED",
        category: "smartphones",
        brand: "Samsung",
        price: 124999,
        oldPrice: null,
        badge: "NEW",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        specs: ["5G", "256GB"],
        description:
            "A titanium frame, adaptive 144Hz OLED and the fastest charging we have ever shipped.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    },
    {
        _id: "p7",
        name: "ZenBook Ultra 14",
        category: "laptops",
        brand: "Apple",
        price: 89500,
        oldPrice: null,
        badge: "BEST SELLER",
        rating: 4.7,
        reviews: 198,
        inStock: true,
        specs: ["M3 Max", "16GB RAM"],
        description:
            "A featherweight 14-inch chassis with a colour-calibrated panel built for creators on the move.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    },
    {
        _id: "p8",
        name: "SoundForge Elite Wireless",
        category: "audio",
        brand: "Sony Bravia",
        price: 18200,
        oldPrice: 21000,
        badge: null,
        rating: 4.4,
        reviews: 421,
        inStock: true,
        specs: ["Hi-Res Audio", "40H Battery"],
        description:
            "Reference-grade wireless headphones with adaptive noise cancelling and 40 hours of playback.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    },
    {
        _id: "p9",
        name: "Heritage Series Washer Pro",
        category: "appliances",
        brand: "Panasonic",
        price: 125000,
        oldPrice: null,
        badge: null,
        rating: 4.3,
        reviews: 52,
        inStock: false,
        specs: ["Inverter", "9KG"],
        description:
            "A quiet inverter drive with steam-clean cycles and heritage-inspired brushed steel finish.",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    },
];

export const deals = [
    { _id: "d1", productId: "p1", discount: 30 },
    { _id: "d2", productId: "p2", discount: 25 },
    { _id: "d3", productId: "p8", discount: 40 },
    { _id: "d4", productId: "p4", discount: 15 },
];

export const heroTags = [
    "5G Connectivity",
    "Inverter Technology",
    "8K Display",
    "Gaming Rigs",
    "Smart Home Hubs",
];
