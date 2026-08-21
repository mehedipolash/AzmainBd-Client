export const SITE_NAME = "Azmain BD Int";

export const SITE_TAGLINE = "House Of Global Brand";

export const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Categories", path: "/categories" },
    { label: "Deals", path: "/deals" },
    // The showroom is the client's main sales channel, so the way to reach
    // them belongs in the header rather than only at the foot of the page.
    { label: "Contact", path: "/contact" },
];

// Shop links mirror the real category slugs seeded in the database. If a
// category is renamed in the admin panel, update the slug here too — these are
// static because a footer that waits on a fetch shifts layout on every page.
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
            { label: "Hair Care", path: "/shop?category=hair-care" },
            { label: "Body Care", path: "/shop?category=body-care" },
            { label: "Skin Care", path: "/shop?category=skin-care" },
            { label: "Herbal Soap", path: "/shop?category=herbal-soap" },
            { label: "Oral Care", path: "/shop?category=oral-care" },
        ],
    },
];

export const SORT_OPTIONS = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];
