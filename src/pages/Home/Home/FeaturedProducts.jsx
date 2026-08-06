import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../data/products';

const FeaturedProducts = () => {
    const featured = products.filter((product) => product.badge).slice(0, 3);

    return (
        <section className="tint-1 border-y border-base-300">
            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Hand picked"
                    title="Featured Products"
                    actionLabel="View All"
                    actionPath="/shop"
                />

                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {featured.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
