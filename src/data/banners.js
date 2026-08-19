// Campaign banners — the marketing copy and imagery around the catalogue.
// These are data rather than markup so the client can eventually edit them
// from the admin panel without a code change. `placement` decides which slot
// renders each one.
//
// Nothing here invents a discount or a guarantee the shop does not offer:
// the client sets one price per product and takes orders on WhatsApp.
export const banners = [
    {
        _id: 'b1',
        placement: 'hero',
        eyebrow: 'House of global brands',
        title: 'Genuine brands. Real products. Delivered in Dhaka.',
        body: 'OGX, NIVEA, Pantene, L’Oréal, Sensodyne and more — imported direct and sold from our Gulshan showroom. Message us on WhatsApp and we will pack your order today.',
        ctaLabel: 'Browse the shop',
        ctaPath: '/shop',
        image: '/banners/hero.jpg',
        align: 'left',
    },
    {
        _id: 'b2',
        placement: 'split',
        eyebrow: 'Hair care',
        title: 'Shampoo, conditioner & treatments',
        ctaLabel: 'Explore hair care',
        ctaPath: '/shop?category=hair-care',
        image: '/products/ogx-strength-length-keratin-oil-shampoo.jpg',
    },
    {
        _id: 'b3',
        placement: 'split',
        eyebrow: 'Body care',
        title: 'Lotions that actually last',
        ctaLabel: 'Explore body care',
        ctaPath: '/shop?category=body-care',
        image: '/products/nivea-cocoa-nourish-body-lotion.jpg',
    },
    {
        _id: 'b4',
        placement: 'strip',
        eyebrow: 'Handmade',
        title: 'VICA premium herbal soap',
        body: 'Charcoal lavender, gulab rose and original — made by hand with natural essential oils.',
        ctaLabel: 'Shop herbal soap',
        ctaPath: '/shop?category=herbal-soap',
        image: '/products/vica-premium-herbal-soap.jpg',
    },
];

export const getBannersByPlacement = (placement) =>
    banners.filter((banner) => banner.placement === placement);

export const getHeroBanner = () => banners.find((banner) => banner.placement === 'hero') ?? null;
