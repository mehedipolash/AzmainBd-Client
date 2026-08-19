import React from 'react';
import { Link } from 'react-router';
import SectionTitle from '../../../components/SectionTitle';
import UseCatalogue from '../../../Hooks/UseCatalogue';
import { resolveImageUrl } from '../../../utils/imageUrl';

const ShopCategories = () => {
    const { categories, loading } = UseCatalogue();

    // Three lead categories from the live list, so a category the owner adds
    // in the admin panel can appear here without a code change.
    const featured = categories.slice(0, 3);

    if (loading || featured.length === 0) return null;

    return (
        <section className="container-px section-y">
            <SectionTitle
                eyebrow="Categories"
                title="Shop by category"
                subtitle="Browse our departments, each stocked with genuine branded products only."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-aos="fade-up">
                {featured.map((category) => (
                    <Link
                        key={category.slug}
                        to={`/shop?category=${category.slug}`}
                        className="group text-center"
                    >
                        <div className="overflow-hidden bg-base-200">
                            <img
                                src={resolveImageUrl(category.image)}
                                alt={category.name}
                                loading="lazy"
                                className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold">{category.name}</h3>

                        {/* Live count, so the row never promises stock that is
                            not there. */}
                        {category.inStockCount > 0 && (
                            <p className="mt-1 text-[12px] text-base-content/50">
                                {category.inStockCount}{' '}
                                {category.inStockCount === 1 ? 'product' : 'products'}
                            </p>
                        )}

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
