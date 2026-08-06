import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../data/products';

const TrendingNow = () => {
    // Highest-rated items stand in for a real popularity ranking.
    const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Popular right now"
                title="Trending Now"
                actionLabel="View All"
                actionPath="/shop"
            />

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {trending.map((product) => (
                    <ProductCard key={product._id} product={product} variant="compact" />
                ))}
            </div>
        </section>
    );
};

export default TrendingNow;
