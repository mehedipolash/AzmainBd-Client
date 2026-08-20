import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
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
                        className="group flex flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]"
                    >
                        {/* Square, matching the product cards. A 4:5 box left a
                            band of empty white under every one of these
                            square-ish packshots. */}
                        <div className="relative overflow-hidden bg-linear-to-b from-white to-base-200/70">
                            <img
                                src={resolveImageUrl(category.image)}
                                alt={category.name}
                                loading="lazy"
                                className="aspect-square w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Live count, so the row never promises stock that
                                is not there.

                                A filled pill on the image rather than a caption
                                below it: at 12px and 50% opacity this was the
                                faintest text on the page, and it is the one
                                thing on the card a shopper actually wants. */}
                            {category.inStockCount > 0 && (
                                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-semibold text-primary-content shadow-md">
                                    <span className="font-display text-[15px] leading-none">
                                        {category.inStockCount}
                                    </span>
                                    {category.inStockCount === 1 ? 'product' : 'products'}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col items-center border-t border-base-300 p-5">
                            <h3 className="font-display text-[22px] font-semibold transition-colors group-hover:text-primary">
                                {category.name}
                            </h3>

                            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[12px] font-bold tracking-[0.16em] text-accent uppercase transition-all group-hover:gap-3">
                                Explore
                                <FaArrowRight className="text-[10px]" aria-hidden="true" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ShopCategories;
