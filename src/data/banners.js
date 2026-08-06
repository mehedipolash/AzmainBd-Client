// Advertising banners. These are campaign slots the client will eventually
// edit from an admin panel, so each one is data — never hardcoded into a
// component. `placement` decides which slot renders it.
export const banners = [
    {
        _id: 'b1',
        placement: 'hero',
        eyebrow: 'Authorised retailer',
        title: 'Real warranties. Sealed boxes. Next-day Dhaka.',
        body: 'Flagship phones, laptops and home appliances sourced direct from the brand — never grey imports, never refurbished stock sold as new.',
        ctaLabel: 'Shop the collection',
        ctaPath: '/shop',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80',
        align: 'left',
    },
    {
        _id: 'b2',
        placement: 'split',
        eyebrow: 'Audio',
        title: 'Sound, uncompromised',
        ctaLabel: 'Explore audio',
        ctaPath: '/shop?category=audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
    },
    {
        _id: 'b3',
        placement: 'split',
        eyebrow: 'Home',
        title: 'Appliances built to last',
        ctaLabel: 'Explore appliances',
        ctaPath: '/shop?category=appliances',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80',
    },
    {
        _id: 'b4',
        placement: 'strip',
        eyebrow: 'Limited offer',
        title: 'Up to 25% off selected laptops',
        body: 'Official warranty and 0% EMI available on every purchase this month.',
        ctaLabel: 'Shop laptops',
        ctaPath: '/shop?category=laptops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80',
    },
];

export const getBannersByPlacement = (placement) =>
    banners.filter((banner) => banner.placement === placement);

export const getHeroBanner = () => banners.find((banner) => banner.placement === 'hero') ?? null;
