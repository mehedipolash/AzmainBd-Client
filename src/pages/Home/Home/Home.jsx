import React from 'react';
import Banner from './Banner';
import ShopCategories from './ShopCategories';
import FeaturedProducts from './FeaturedProducts';
import TrendingNow from './TrendingNow';
import WhyChooseUs from './WhyChooseUs';
import AuthorizedBrands from './AuthorizedBrands';
import NewsletterCta from './NewsletterCta';

const Home = () => {
    return (
        <div>
            <Banner />
            <ShopCategories />
            <FeaturedProducts />
            <TrendingNow />
            <WhyChooseUs />
            <AuthorizedBrands />
            <NewsletterCta />
        </div>
    );
};

export default Home;
