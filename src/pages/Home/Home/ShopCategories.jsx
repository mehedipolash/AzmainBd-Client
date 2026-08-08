import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../../components/SectionTitle';
import { categories } from '../../../data/products';

const ShopCategories = () => {
    // Three lead categories, matching the demo's showcase row.
    const featured = categories.slice(0, 3);

    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Categories"
                title="Shop by category"
                subtitle="Browse our most requested departments, each stocked with authorised products only."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-aos="fade-up">
                {featured.map((category) => (
                    <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        className="group text-center"
                    >
                        <div className="overflow-hidden bg-base-200">
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                                className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold">{category.name}</h3>

                        <span className="mt-3 inline-block border-b border-primary/40 pb-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase transition-colors group-hover:border-primary">
                            Explore
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ShopCategories;
