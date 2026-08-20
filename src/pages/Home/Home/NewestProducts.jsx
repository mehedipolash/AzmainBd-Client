import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import ProductCard from '../../../components/ProductCard';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import { getNewest } from '../../../utils/catalogue';

const NewestProducts = () => {
    const { products, loading } = UseCatalogue();

    const newest = getNewest(products, 4);

    // Renders nothing rather than an empty grid while the catalogue loads —
    // MostPopular above already shows the loading state for this stretch of
    // the page, and two spinners stacked reads as a broken page.
    if (loading || newest.length === 0) return null;

    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Just arrived"
                title="Newest products"
                subtitle="Fresh stock, added to the store this month."
            />

            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                data-aos="fade-up"
            >
                {newest.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default NewestProducts;
