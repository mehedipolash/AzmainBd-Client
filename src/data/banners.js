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
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80',
        align: 'left',
    },
    {
        _id: 'b2',
        placement: 'split',
        eyebrow: 'Hair care',
        title: 'Shampoo, conditioner & treatments',
        ctaLabel: 'Explore hair care',
        ctaPath: '/shop?category=hair-care',
        image: 'https://images.unsplash.com/photo-1626015449072-2a4ba0e6ad06?w=900&q=80',
    },
    {
        _id: 'b3',
        placement: 'split',
        eyebrow: 'Body care',
        title: 'Lotions that actually last',
        ctaLabel: 'Explore body care',
        ctaPath: '/shop?category=body-care',
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=80',
    },
    {
        _id: 'b4',
        placement: 'strip',
        eyebrow: 'Handmade',
        title: 'VICA premium herbal soap',
        body: 'Charcoal lavender, gulab rose and original — made by hand with natural essential oils.',
        ctaLabel: 'Shop herbal soap',
        ctaPath: '/shop?category=herbal-soap',
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=1600&q=80',
    },
];

export const getBannersByPlacement = (placement) =>
    banners.filter((banner) => banner.placement === placement);

export const getHeroBanner = () => banners.find((banner) => banner.placement === 'hero') ?? null;
