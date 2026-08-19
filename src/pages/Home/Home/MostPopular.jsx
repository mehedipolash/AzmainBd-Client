import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../../components/SectionTitle';
import ProductCard from '../../../components/ProductCard';
import Loader from '../../../components/Loader';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import { getMostPopular } from '../../../utils/catalogue';

const MostPopular = () => {
    const { products, loading } = UseCatalogue();

    // Ranked by units sold, with sold-out items pushed to the end so the grid
    // always leads with something the customer can actually buy.
    const popular = getMostPopular(products, 8);

    if (loading) return <Loader />;
    if (popular.length === 0) return null;

    return (
        <section className="bg-base-200">
            <div className="container-px section-y">
                <SectionTitle
                    eyebrow="Best sellers"
                    title="Most popular"
                    subtitle="The products our customers reach for most this season."
                />

                <div
                    className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-8"
                    data-aos="fade-up"
                >
                    {popular.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/shop" className="btn-shop-outline">
                        View all products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MostPopular;
