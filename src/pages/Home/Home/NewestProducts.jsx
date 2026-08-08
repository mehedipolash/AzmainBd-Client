import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import ProductCard from '../../../components/ProductCard';
import { getNewest } from '../../../data/products';

const NewestProducts = () => {
    const newest = getNewest(4);

    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Just arrived"
                title="Newest products"
                subtitle="Fresh stock, added to the store this month."
            />

            <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8" data-aos="fade-up">
                {newest.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default NewestProducts;
