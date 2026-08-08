export const SITE_NAME = "Azmain BD Int";

export const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Categories", path: "/categories" },
    { label: "Deals", path: "/deals" },
];

export const FOOTER_LINKS = [
    {
        title: "Company",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Return Policy", path: "/return-policy" },
            { label: "Disclaimer", path: "/disclaimer" },
            { label: "Contact", path: "/contact" },
        ],
    },
    {
        title: "Shop",
        links: [
            { label: "Laptops", path: "/shop?category=laptops" },
            { label: "Smartphones", path: "/shop?category=smartphones" },
            { label: "Appliances", path: "/shop?category=appliances" },
            { label: "Audio Gear", path: "/shop?category=audio" },
        ],
    },
];

export const SORT_OPTIONS = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
];
