import React from 'react';
import Banner from './Banner';
import ShopCategories from './ShopCategories';
import MostPopular from './MostPopular';
import SplitBanners from './SplitBanners';
import DealOfTheDay from './DealOfTheDay';
import NewestProducts from './NewestProducts';
import PromoStrip from './PromoStrip';
import AboutStore from './AboutStore';
import Testimonial from './Testimonial';
import Benefits from './Benefits';

const Home = () => {
    return (
        <div>
            <Banner />
            <ShopCategories />
            <MostPopular />
            <SplitBanners />
            <DealOfTheDay />
            <NewestProducts />
            <PromoStrip />
            <AboutStore />
            <Testimonial />
            <Benefits />
        </div>
    );
};

export default Home;
