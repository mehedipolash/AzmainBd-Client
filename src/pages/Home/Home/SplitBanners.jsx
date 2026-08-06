import React from 'react';
import PromoBanner from '../../../components/PromoBanner';
import { getBannersByPlacement } from '../../../data/banners';

// Two half-width advertising tiles. Content comes from the banner data file so
// the client can swap campaigns without touching components.
const SplitBanners = () => {
    const splitBanners = getBannersByPlacement('split');

    if (splitBanners.length === 0) return null;

    return (
        <section className="container-px pb-12 sm:pb-16 lg:pb-20">
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {splitBanners.map((banner) => (
                    <PromoBanner key={banner._id} banner={banner} variant="split" />
                ))}
            </div>
        </section>
    );
};

export default SplitBanners;
