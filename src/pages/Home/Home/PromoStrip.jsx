import React from 'react';
import PromoBanner from '../../../components/PromoBanner';
import { getBannersByPlacement } from '../../../data/banners';

// Full-width advertising band between product sections.
const PromoStrip = () => {
    const [strip] = getBannersByPlacement('strip');

    if (!strip) return null;

    return (
        <section>
            <PromoBanner banner={strip} variant="strip" />
        </section>
    );
};

export default PromoStrip;
